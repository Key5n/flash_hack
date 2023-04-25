import { z } from 'zod';
import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

const bodySchema = z
  .object({
    page_id: z.string(),
    properties: z.object({
      Checkbox: z.object({
        checkbox: z.boolean(),
      }),
    }),
  })
  .array();

type Body = z.infer<typeof bodySchema>;

interface ExtendedNextApiRequest extends NextApiRequest {
  body: Body;
}

export default async function handler(req: ExtendedNextApiRequest, res: NextApiResponse) {
  const { method } = req;

  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  // type Param = InstanceType<typeof Client>['pages'];
  // type P = Param['update'];
  // type a = Parameters<P>;

  const databaseId = process.env.NOTION_DATABASE_ID;
  if (typeof databaseId === 'undefined') {
    throw new Error('Notion database id not defined');
  }

  switch (method) {
    case 'GET': {
      (async () => {
        const myPage = await notion.databases.query({
          database_id: databaseId,
        });
        const results = myPage.results;
        const values = results.map((item) => {
          let isChecked;
          let name;
          if ('properties' in item) {
            if (item.properties.Checkbox.type === 'checkbox') {
              isChecked = item.properties.Checkbox.checkbox;
            }
            if (item.properties.Name.type === 'title') {
              name = item.properties.Name.title[0].plain_text;
            }
          }
          return {
            page_id: item.id,
            checkbox: isChecked,
            name: name,
          };
        });

        res.status(200).json({
          values,
        });
      })();
    }
    case 'POST': {
      const body = bodySchema.parse(req.body);
      console.log(body);
      body.forEach((item) => {
        notion.pages.update({
          page_id: item.page_id,
          properties: item.properties,
        });
      });
      (async () => {
        const myPage = await notion.databases.query({
          database_id: databaseId,
        });
        console.log(myPage);
        res.status(200).json({
          myPage,
        });
      })();
      break;
    }
    default: {
      res.status(400).json({ message: 'default' });
      break;
    }
  }
}

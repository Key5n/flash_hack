import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  req.method;
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  const databaseId = process.env.NOTION_DATABASE_ID;
  if (typeof databaseId === 'undefined') {
    throw new Error('Notion database id not defined');
  }
  notion.pages.update({
    page_id: '6960ffd1-630c-4925-b0c4-a5f197821b68',
    properties: {
      Checkbox: {
        checkbox: true,
        type: 'checkbox',
      },
    },
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
  // switch (req.method) {
  //   case 'GET': {
  //     (async () => {
  //       const myPage = await notion.databases.query({
  //         database_id: databaseId,
  //       });
  //       console.log(myPage);
  //       res.status(200).json({
  //         myPage,
  //       });
  //     })();
  //     break;
  //   }
  //   case 'POST': {
  //     notion.pages.update({
  //       page_id: '6960ffd1-630c-4925-b0c4-a5f197821b68',
  //       properties: {
  //         checkbox: true,
  //       },
  //     });
  //     break;
  //   }
  //   default: {
  //     notion.pages.update({
  //       page_id: '6960ffd1-630c-4925-b0c4-a5f197821b68',
  //       properties: {
  //         checkbox: true,
  //       },
  //     });
  //     break;
  //   }
  // }
}

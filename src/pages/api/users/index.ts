import { Client } from '@notionhq/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  });
  (async () => {
    const listUserResponse = await notion.users.list({});
    console.log(listUserResponse);
    return res.status(200).json({
      list: listUserResponse,
    });
  })();
}

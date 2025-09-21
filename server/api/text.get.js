import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const database_id = process.env.NOTION_TEXTS_DATABASE_ID;

let payload = {};

async function getTexts() {
  const data = await notion.databases.query({
    database_id: database_id,
  });
  return data;
}

getTexts().then((data) => {
  data.results.map((v) => {
    let key = v["properties"]["名前"]["title"].length > 1 ? v["properties"]["名前"]["title"].reduce((acc, cur) => acc["plain_text"] + cur["plain_text"]) : v["properties"]["名前"]["title"][0]["plain_text"];
    payload[key] = v["properties"]["テキスト"]["rich_text"][0]["plain_text"];
  });
});

export default defineEventHandler(() => payload);
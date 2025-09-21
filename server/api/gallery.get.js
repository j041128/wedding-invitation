import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const database_id = process.env.NOTION_DATABASE_ID;

let payload = {};

async function getImages() {
  const data = await notion.databases.query({
    database_id: database_id,
  });
  return data;
}

getImages().then((data) => {
  data.results.map((v) => {
    payload[v["properties"]["名前"]["title"][0]["plain_text"]] = v["properties"]["ファイル&メディア"]["files"][0]["file"]["url"];
  });
});

export default defineEventHandler(() => payload);
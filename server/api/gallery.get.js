import { list } from '@vercel/blob';

let payload = {};

async function getImages() {
  const { blobs } = await list();
  return blobs;
}

getImages().then((data) => {

  data.map((v) => {
    payload[v["pathname"]] = v["url"];
  });
});

export default defineEventHandler(() => payload);
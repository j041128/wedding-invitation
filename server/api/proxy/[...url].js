export default defineEventHandler(async (event) => {
  const url = getRouterParam(event, 'url');
  const body = await readBody(event)

  if(!url) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No URL provided',
    });
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Accept-Encoding': 'identity'
    },
    body: body
  });
  return res;
});
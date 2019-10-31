import fetch from 'node-fetch';

const BASE_URL = 'databaseScript.php';

async function post(url: string, body: any) {
  let data;

  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (response.status > 201) {
      console.error(`Invalid response status ${response.status}.`);
      throw response;
    }

    data = await response.json();

    return data;
  } catch (err) {
    console.error('An error ocurred while fetching data', err, data);
    return; // nothing
  }
}


export const executeScript = async (data: any, method: string) => {
  const body = {
    method,
    ...data
  }

  const response = await post(BASE_URL, body);

  return response;
}
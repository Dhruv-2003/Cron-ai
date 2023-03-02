import { NextApiRequest, NextApiResponse } from 'next';
import { ChatGPTUnofficialProxyAPI } from 'chatgpt';

const ACCESS_TOEKN: any = process.env.NEXT_PUBLIC_OPENAI_ACCESS_TOKEN;
const BASE_PROMPT = 'Define the CRON Expression for a Job that runs ';

async function generate(request: NextApiRequest, response: NextApiResponse) {
  // console.log(ACCESS_TOEKN);
  if (!ACCESS_TOEKN) {
    console.log('NO ACCESS TOKEN FOUND');
    return response.status(400).send('NO TOKEN FOUND');
  }

  if (request.method != 'POST')
    return response.status(405).send('Method Not Allowed');

  if (!request.body.userInput) {
    return response.status(400).json({ message: 'Input required' });
  }

  const chatGPTApi = new ChatGPTUnofficialProxyAPI({
    accessToken: ACCESS_TOEKN,
  });

  const userInput = request.body.userInput;
  console.log(userInput);
  const prompt = `${BASE_PROMPT}${userInput}`;
  console.log(prompt);

  const apiResponse = await chatGPTApi.sendMessage(prompt);
  console.log(apiResponse.text);

  if (apiResponse == null)
    return response.status(204).json({ output: 'No Output' });

  response.status(200).json({
    output: apiResponse.text,
  });
}

export default generate;

import { Configuration, OpenAIApi } from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const API_KEY: any = process.env.NEXT_PUBLIC_OPENAI_API_KEY;

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 'Define the CRON Expression for a Job that runs ';

async function generate(request: NextApiRequest, response: NextApiResponse) {
  console.log(API_KEY);
  if (!API_KEY) {
    console.log('NO ACCESS TOKEN FOUND');
    return response.status(400).send('NO TOKEN FOUND');
  }

  if (request.method != 'POST')
    return response.status(405).send('Method Not Allowed');

  if (!request.body.userInput) {
    return response.status(400).json({ output: 'Input required' });
  }

  console.log(`${basePromptPrefix}${request.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-002',
    prompt: `${basePromptPrefix}${request.body.userInput}`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  console.log(basePromptOutput);

  if (basePromptOutput == null)
    return response.status(204).json({ output: 'No Output' });

  response.status(200).json({
    output: basePromptOutput,
  });
}

export default generate;

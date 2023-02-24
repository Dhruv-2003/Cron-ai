import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';
import { useState } from 'react';
import { ChatGPTAPI, ChatGPTUnofficialProxyAPI } from 'chatgpt';

/**
 * SVGR Support
 * Caveat: No React Props Type.
 *
 * You can override the next-env if the type is important to you
 * @see https://stackoverflow.com/questions/68103844/how-to-override-next-js-svg-module-declaration
 */

// !STARTERCONF -> Select !STARTERCONF and CMD + SHIFT + F
// Before you begin editing, follow all comments with `STARTERCONF`,
// to customize the default configuration.

export default function HomePage() {
  const [userInput, setUserInput] = useState<string>('');
  const [response, setResponse] = useState<string>();

  const ACCESS_TOEKN: any = process.env.NEXT_PUBLIC_OPENAI_ACCESS_TOKEN;
  const API_KEY: any = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
  const generateResponse = async () => {
    try {
      console.log('Generating response ....');
      const response = await fetch('./api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      console.log(response.statusText);
      const data = await response.json();
      const { output } = data;
      setResponse(output.text);
      console.log(output.text);

      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const generateChatGPTResponse = async () => {
    try {
      if (!ACCESS_TOEKN) {
        console.log('NO ACCESS TOKEN FOUND');
        return;
      }

      const api = new ChatGPTUnofficialProxyAPI({
        accessToken: ACCESS_TOEKN,
      });

      const res = await api.sendMessage(
        'Define the CRON Expression for a job that runs every 15 mins on alternate days of the month only in november and december'
      );
      console.log(res);
      console.log(res.text);
      setResponse(res.text);
    } catch (error) {
      console.log(error);
    }
  };

  const generateChatGPTApi = async () => {
    try {
      if (!API_KEY) {
        console.log('NO API KEY FOUND');
        return;
      }

      const api = new ChatGPTAPI({
        apiKey: API_KEY,
      });

      const res = await api.sendMessage(
        'Define the CRON Expression for a job that runs every 15 mins on alternate days of the month only in november and december'
      );
      console.log(res);
      console.log(res.text);
      setResponse(res.text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-black bg-page-gradient'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1 className='mt-4 font-light text-white sm:text-2xl md:text-4xl'>
              How do I write this damn{' '}
              <span className='font-medium text-[#FF90E8]'>
                {' '}
                cron expression
              </span>
            </h1>
            <p className='sm:text-md my-10 font-extralight text-[#d9d9d9] md:text-lg'>
              Vercel released Cron Jobs recently and to help my fellow devs out
              I built this tiny free tool
            </p>
            <div className='mt-10 h-full w-full gap-6 sm:flex'>
              <div className='sm:w-1/2'>
                <div className='mb-4 h-fit min-h-[300px] w-full rounded-md bg-[#161616] p-8 shadow '>
                  <textarea
                    className='focus:ring-none mb-4 h-full min-h-[300px] w-full resize-none flex-wrap rounded-lg border-none bg-transparent px-4 text-lg font-extralight text-white focus:border-none focus:outline-none focus:ring-transparent active:outline-none'
                    placeholder='every 15 mins on alternate days of the month only in november and december'
                    onChange={(e) => setUserInput(e.target.value)}
                  />
                </div>
                {/* <div
                  className='w-full p-4 bg-white rounded-lg'
                  onClick={() => generateChatGPTResponse()}
                >
                  Write the damn expression
                </div> */}
                <button
                  className='w-full rounded-lg bg-white p-4'
                  onClick={() => generateChatGPTApi()}
                >
                  Write the damn expression
                </button>
              </div>
              <div className='sm:w-1/2'>
                <div className='mt-10 flex h-full min-h-[300px] w-full items-center justify-center rounded-md bg-[#161616] p-8 shadow sm:mt-0'>
                  <div className='text-lg font-extralight text-white'>
                    {response ? response : 'No Output'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import * as React from 'react';
import { useState } from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(response).then(() => {
      setCopied(true);
    });
  };

  const generateViaChatGPTOfficicalAPI = async () => {
    try {
      console.log('Generating response ....');
      const response = await fetch('./api/chatGpt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      console.log(response.statusText);
      const data = await response.json();
      const { output, id } = data;

      console.log(output, id);
      const formattedOutput = output.split('"')[1];
      console.log(formattedOutput);
      setResponse(formattedOutput);
    } catch (err) {
      console.log(err);
    }
  };

  const generateResponseViaChatGPT = async () => {
    try {
      setLoading(true);
      const response = await fetch('./api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      const data = await response.json();
      const { output } = data;
      const formattedOutput = output.split('```')[1];
      setResponse(formattedOutput);
    } catch (err) {
      console.log(err);
    }
  };

  const generateResponseViaOpenAI = async () => {
    try {
      console.log('Generating response ....');
      const response = await fetch('./api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput }),
      });
      console.log(response.statusText);
      const data = await response.json();
      const { output } = data;

      console.log(output);
      const formattedOutput = output.text;
      console.log(formattedOutput);
      setResponse(formattedOutput);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Layout>
      <Seo />

      <main>
        <section className='no-scrollbar bg-black bg-page-gradient'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <h1 className='mt-4 font-light text-white sm:text-2xl md:text-4xl'>
              How do I write this damn{' '}
              <span className='font-medium text-[#FF90E8]'>
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
                <button
                  className='w-full rounded-lg bg-white p-4'
                  onClick={() => generateViaChatGPTOfficicalAPI()}
                >
                  {loading ? 'Loading...' : 'Write the damn expression'}
                </button>
              </div>
              <div className='sm:w-1/2'>
                <div className='mt-10 flex h-full min-h-[300px] w-full items-center justify-center rounded-md bg-[#161616] p-8 shadow sm:mt-0'>
                  {loading ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-10 w-10 animate-spin text-[#FF90E8]'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99'
                      />
                    </svg>
                  ) : (
                    <div className='text-lg font-extralight text-white'>
                      {response || 'No Output'}
                    </div>
                  )}
                  {response && !loading && (
                    <button
                      className={`ml-4 rounded-md bg-[#FF90E8] py-1 px-2 text-black transition ease-linear hover:opacity-80 ${
                        copied ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      onClick={handleCopyClick}
                      disabled={copied}
                    >
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ArrowLink from '@/components/links/ArrowLink';
import ButtonLink from '@/components/links/ButtonLink';
import UnderlineLink from '@/components/links/UnderlineLink';
import UnstyledLink from '@/components/links/UnstyledLink';
import Seo from '@/components/Seo';

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
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-black bg-page-gradient'>
          <div className='relative flex flex-col items-center justify-center min-h-screen py-12 text-center layout'>
            <h1 className='mt-4 font-light text-white sm:text-2xl md:text-5xl'>
              How do i write this damn{' '}
              <span className='text-[#FF90E8]'> cron expression</span>
            </h1>
            <p className='my-10 font-extralight text-[#d9d9d9] sm:text-lg md:text-2xl'>
              Vercel released Cron Jobs recently and to help my fellow devs out
              i built this tiny free tool
            </p>
            <div className='w-full h-full gap-6 mt-10 sm:flex'>
              <div className='sm:w-1/2'>
                <div className='mb-4 h-fit min-h-[300px] w-full rounded-md bg-[#161616] p-8 shadow '>
                  <input
                    className='w-full h-12 px-4 mb-4 text-lg text-white break-words bg-transparent rounded-lg font-extralight focus:outline-none'
                    placeholder='every 15 mins on alternate days of the month only in November and december'
                  />
                </div>
                <div className='w-full p-4 bg-white rounded-lg'>
                  Write the damn expression
                </div>
              </div>
              <div className='sm:w-1/2'>
                <div className='mt-10 flex h-full min-h-[300px] w-full items-center justify-center rounded-md bg-[#161616] p-8 shadow sm:mt-0'>
                  <div className='text-lg text-white font-extralight'>
                    Response
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

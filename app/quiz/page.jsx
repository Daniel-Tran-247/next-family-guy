/**
Renders a Next.js page component that displays a quiz introduction with an image and a link to start the quiz.
@component
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { endpoint } from '@/utils/endpoint'
import { TbArrowBigRightFilled } from 'react-icons/tb'

export async function getRandomQuizQuestion () {
  const res = await fetch(`${endpoint}/quiz/random`)
  
  if(!res.ok) {
    throw new Error('Failed to fetch random quiz question')
  }

  return res.json()
}


export default async function Page() {
  const data = await getRandomQuizQuestion()
  
  return (
    <main className='w-full bg-black h-screen'>
      <Container 
      className='bg-black flex flex-col items-center gap-5 md:flex-row-reverse md:justify-between'>
        <div className="relative overflow-hidden rounded-2xl mt-14">
          <div className="md:w-[24rem]">
            <Image src="/wallpaper.jpg" alt="" width={700} height={700} />
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent md:bg-gradient-to-r"></div>
        </div>
        <div className="flex flex-col gap-5 md:w-[50%]">
          <h1 className='text-2xl font-semibold text-gray-200'>Family Guy Quiz</h1>
          <p className='leading-6 text-sm text-slate-300'>Take this quiz to find out how much you know
          about the hit animated sitcom Family Guy.
          Test your knowledge of the characters, the espisodes,
          and the show&apos;s many pop culture references.</p>
          <Link href=""
          className="flex gap-2 items-center px-5 py-4
          font-semibold text-orange-500 rounded-md outline
          transition-colors duration-600 hover:bg-orange-950" >
            <TbArrowBigRightFilled className='text-lg' />
            Take a Quiz Now!
          </Link>
        </div>
      </Container>

    </main>
  )
}

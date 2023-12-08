/**
Renders a Next.js page component that displays detailed information about a character, including their name, occupations, description, images, skills, and famous quotes.
@component
@param {Object} props - The component props.
@param {Object} props.params - The parameters passed to the page component.
@param {string} props.params.slug - The slug of the character.
@returns {JSX.Element} The rendered page component.
*/

import { Container } from '@/components'
import Image from 'next/image'
import { endpoint } from '@/utils/endpoint'
import { getAllCharacters } from '@/lib/characters'

export async function generateStaticParams() {
  const { characters } = await getAllCharacters()
  // Return an arrray of objects respresenting the dynamic paths you want to pre-render
  return characters.map(character => ({slug: character.slug}))
  // return an array with objects like {params: {slug: 'character-1'}, {slug: 'character-2}}
  // So later on we can use params.slug to get the slug of the character
}

export async function getCharacterBySlug(slug) {
  const res = await fetch(`${endpoint}/characters/${slug}`)
  
  if(!res.ok) {
    throw new Error('Failed to fetch character data')
  }

  return res.json()
}


export default async function Page({ params }) {
  const { character, character_qoutes } = await getCharacterBySlug(params.slug) 
  console.log(character_qoutes)
  return (
    <Container className="flex flex-col gap-5 py-5" as="main">
      <div className='flex flex-col gap-2'>
        <h1 className="text-2xl font-semibold capitalize">{character.name}</h1>
        <ul className="flex gap-1 text-sm">
          {character.occupations.map(occupation => (
            <li className="p-2 text-gray-300 bg-gray-800 rounded-md" key={occupation}>{occupation}</li>
          ))}
        </ul>
      </div>
      <p className="text-sm leading-6">{character.description}</p>
      <ul className='grid gap-2 sm:grid-cols-2'>
        {character.images.map(image => (
          <li key={image} className='relative flex overflow-hidden bg-gray-900 rounded-xl'>
            <Image src={image} alt="" width={760} height={435}
              className="transition-all duration-500 hover:scale-110 hover:rotate-2"
            />
          </li>
        ))}
      </ul>
      {character.skills && (
        <>
          <h2 className="text-xl font-bold">Power and Skills</h2>
          <ul className="flex flex-wrap gap-1">
            {character.skills.map(skill => (
             <li key={skill}
             className="text-orange-400 rounded-full bg-orange-950
             px-2 py-1 flex justify-center flex-grow-1">
                {skill}
             </li> 
            ))}
          </ul>
        </>
      )}
      {character_qoutes && (
        <>
          <h2 className="text-xl font-bold">Famous Qoutes</h2>
          <ul className="grid gap-5">
            {character_qoutes.map((qoute, idx) => (
              <li key={qoute.idx}
              className="text-gray-400 border-l-4 border-green-400 rounded-md p-2 italic">
                {qoute.qoute}
              </li>
          ))}
          </ul>
        </>
      )}
    </Container>
  )
}

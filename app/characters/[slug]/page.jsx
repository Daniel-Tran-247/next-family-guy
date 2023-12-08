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
  
  return (
    <Container className="flex flex-col gap-5 py-5 bg-black" as="main">
      <div className='flex flex-col gap-2'>

      </div>
    </Container>
  )
}

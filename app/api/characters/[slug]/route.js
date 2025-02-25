/**
 * Retrieves a character and their associated quotes based on the provided slug.
 *
 * @param {Object} req - The request object.
 * @param {Object} params - The route parameters.
 * @param {string} params.slug - The slug of the character.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing the character and their quotes, or an error response.
 */

import characters from '@/data/characters.json'
import qoutes from '@/data/qoutes.json'
import { NextResponse } from 'next/server'

export async function GET(req, {params}) {
  try {
    const character = characters.data.find(character => character.slug === params.slug)

    if (!character) {
      return new NextResponse('not found', {status: 404})
    }

    const character_qoutes = qoutes.data.filter(qoute => qoute.character_id === character.id) 

    return NextResponse.json({character, character_qoutes: character_qoutes.length > 0 ? character_qoutes : null})
  }

  catch (error) {
    return new NextResponse('internal server error', {status: 500})
  }

}

import { endpoint } from '@/utils/endpoint'


export async function getCharacterBySlug() {}

export async function getAllCharacters() {
    const res = await fetch(`${endpoint}/characters`)
    
    if(!res.ok) {
      throw new Error("Failed to fetch characters")
    }
  
    return res.json()
  }
  
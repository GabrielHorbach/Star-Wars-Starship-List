import api from './api'
import { removeDuplicatesFromArray, sortArray } from '../utils'

async function getStarshipsFromApi(url) {
  const { data } = await api.get(url)
  return data
}

async function getAllStarships(starships = [], url = '/starships') {
  const { results, next } = await getStarshipsFromApi(url)
  starships.push(...results)

  if (next) await getAllStarships(starships, next)
  return starships
}

export async function getManufacturersAndStarships() {
  const allStarships = await getAllStarships()
  const allManufacturers = allStarships.map(({ manufacturer }) => manufacturer)

  const noDuplicates = removeDuplicatesFromArray(allManufacturers)
  const sorted = sortArray(noDuplicates)

  return {
    starships: allStarships,
    manufacturers: sorted
  }
}

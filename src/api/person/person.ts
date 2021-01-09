import axios from 'axios'

const makeRequest = async (url: string, token: string) => {
  try {
    const data = await axios.get(url + token)
    return data
  } catch (e) {
    return e
  }
}

const request = makeRequest.bind(null, 'https://randomuser.me/')

export const getRandomPersons = async (value: string) => {
  return await request(`api?results=${value}`)
}

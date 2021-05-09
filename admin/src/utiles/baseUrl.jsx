import { create } from 'apisauce'
export const api = create({
  baseURL: 'http://localhost:3000',
  headers: { Accept: 'application/vnd.github.v3+json' ,'Content-Type':'application/json'},
  })

import {api} from './baseUrl';

  const getCourses =async ()=>{
   return await api.get('/course') 
}

const postBooking =async (data)=>{
   return await api.post('/booking',data) 
}
export const repository= {
   getCourses,
   postBooking
}
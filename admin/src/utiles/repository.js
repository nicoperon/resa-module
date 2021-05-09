import {api} from './baseUrl';

  const bookings =async ()=>{
   return await api.get('/booking') 
}
  const courses =async ()=>{
   return await api.get('/course') 
}
  const deletecourses =async (id)=>{
   return await api.delete('/course/'+id) 
}
  const updateCourse =async (data,id)=>{
   return await api.post('/course/update/'+id,data) 
}
  const createCourse =async (data)=>{
   return await api.post('/course/',data) 
}
  const login =async (data)=>{
   return await api.post('/user/login',data) 
}

export const repository= {
   
   bookings,
   courses,
   deletecourses,
   updateCourse,
   createCourse,
   login
   }
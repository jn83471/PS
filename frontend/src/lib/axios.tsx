import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use(config=>{
    const token:string =localStorage.getItem('AUTH_TOKEN')
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }
    return config
})
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Manejar el 401 (ej. redirigir al login)
      console.log('No autorizado');
    }
    // ¡IMPORTANTE! Re-lanzar para que llegue al catch del llamado original
    return Promise.reject(error); 
  }
);

export default api
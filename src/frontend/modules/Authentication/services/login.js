import api from './apiIEC';


export const login = async(email, password) => {
  try{
    const response = await api.post('Login/Login', {email, password});
    return response.data
  }catch(error){
    console.error("Erro no login", error.response ? error.response.data : error.message);
    throw error; 
  }
}
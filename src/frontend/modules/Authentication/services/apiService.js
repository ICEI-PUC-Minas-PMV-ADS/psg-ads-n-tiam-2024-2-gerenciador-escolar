import api from './apiIEC';


export const auth = async (data) => {
    try {
      console.log(data)
      const response = await api.post('User/CreateUser', data);
      return response.data;
    } catch (error) {
      console.error("Erro no cadastro", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const login = async (email, password) => {
    try {
      const response = await api.post('Login/Login', { email, password });
      return response.data;
    } catch (error) {
      console.error("Erro no login", error.response ? error.response.data : error.message);
      throw error;
    }
  };
  
  export const session = async () => {
    try {
      const response = await api.get('Login/GetSession');
      return response.data;
    } catch (error) {
      console.error("Erro na sessão", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const logout = async () => {
    try {
      const response = await api.post('Login/Logout'); 
      return response.data;
    } catch (error) {
      console.error("Falha ao realizar logout", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const getClasses = async () => {
    try {
      const response = await api.get('Class/GetClasses'); 
      return response.data;
    } catch (error) {
      console.error("Falha ao realizar logout", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const getStudents = async (className) => {
    try {
      const response = await api.get('Class/GetStudents', {
        params: { className }
      });
      return response.data;
    } catch (error) {
      console.error("Falha ao recuperar alunos", error.response ? error.response.data : error.message);
      throw error;
    }
  };
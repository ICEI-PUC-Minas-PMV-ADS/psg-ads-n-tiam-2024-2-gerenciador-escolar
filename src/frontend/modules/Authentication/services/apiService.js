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

  export const getGrades = async (className, studentName, subject) => {
    try {
      const response = await api.get('Grade/GetStudentGrade', {
        params: { 
          className,
          studentName,
          subject
         }
      });
      return response.data;
    } catch (error) {
      console.error("Falha ao recuperar alunos", error.response ? error.response.data : error.message);
      throw error;
    }
  };

  export const submitGrades = async (className, studentName, subject, grade ) => {
    try {
        const response = await api.put('Grade/SubmitGrade', null, {
            params: {
                className,
                studentName,
                subject,
                grade
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao enviar a nota", error.response ? error.response.data : error.message);
        throw error;
    }
};

export const registerAttendance = async (data) => {
  try {
      const response = await api.post('Attendance/RegisterAttendance', data) 
      return response.data;
  } catch (error) {
      console.error("Erro ao enviar a nota", error.response ? error.response.data : error.message);
      throw error;
  }
};

export const getReport = async (studentName, className) => {
  try {
    const response = await api.get('Grade/Report', {
      params: { 
        studentName,
        className
       }
    });
    return response.data;
  } catch (error) {
    console.error("Falha ao recuperar relatórios", error.response ? error.response.data : error.message);
    throw error;
  }

export const createClass = async (data) => {
  try {
      const response = await api.post('Class/CreateClass', data) 
      return response.data;
  } catch (error) {
      console.error("Erro ao criar a turma", error.response ? error.response.data : error.message);
      throw error;
  }
};

export const deleteClass = async (id) => {
  try {
      const response = await api.delete(`Class/DeleteClass/${id}`) 
      return response.data;
  } catch (error) {
    console.error("Erro ao excluir a turma", error.response ? error.response.data : error.message);
    throw error;
  }
};

export const insertStudent = async (className, studentName) => {
  try {
      const response = await api.put('Class/InsertStudent', null, {
          params: {
              className,
              studentName,
          }
      });
      return response.data;
  } catch (error) {
      console.error("Erro ao inserir aluno", error.response ? error.response.data : error.message);
      throw error;
  }
};
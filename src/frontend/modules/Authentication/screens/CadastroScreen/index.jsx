import React, { useRef, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from 'react-native-picker-select'
import { styles} from "./styles";
import { useForm } from "react-hook-form";
import { Input } from "../../components/InputCadastro/index";
import { Button } from "../../components/ButtonCadastro/index";
import Logo from "../../../../assets/images/Logo.png";
import { auth } from "../../services/apiService";


export default function FormCadastro() {
  const navigation = useNavigation();
  const [userType, setUserType] = useState("Student"); 
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function handleNextStep(data) {
    try {
      const userData = {
        name: data.name,
        email: data.email,
        password: data.Password,
        userType: userType,
        className: ''
      };

      console.log("nome", data.name);
      console.log("email", data.email);
      console.log("senha", data.Password);      
      console.log("userType", data.userType);


      const response = await auth(
        userData
    );
      console.log(data);
      navigation.replace("Turma");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data.message || "Erro desconhecido";

        if (status === 400) {
          Alert.alert("Erro de Validação", message);
        } else if (status == 409) {
          Alert.alert("Erro de Validação", message);
        } else if ((status = 403)) {
          Alert.alert("Erro de permissão", message);
        } else if (status === 500) {
          Alert.alert("Erro no Servidor", message);
        } else {
          Alert.alert("Erro", message);
        }
      } else {
        Alert.alert(
          "Erro",
          "Não foi possível conectar ao servidor. Verifique sua conexão com a internet."
        );
      }
      console.error("Erro no cadastro:", error);
    }
  }

  function validationPassword(ConfirmPassword) {
    const { Password } = getValues();
    return Password === ConfirmPassword || "As senhas devem ser iguais.";
  }

  const emailRef = useRef(null);
  const senhaRef = useRef(null);
  const confirmSenhaRef = useRef(null);

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} />
      <Text style={styles.title}>Cadastro</Text>
      <Input
        icon="user"
        error={errors.name?.message}
        formProps={{
          name: "name",
          control,
          rules: {
            required: "Nome é obrigatório",
          },
        }}
        inputProps={{
          placeholder: "Nome",
          returnKeyType: "next",
          onSubmitEditing: () => emailRef.current?.focus(),
        }}
      />
      <Input
        ref={emailRef}
        icon="mail"
        error={errors.email?.message}
        formProps={{
          name: "email",
          control,
          rules: {
            required: "Email é obrigatório",
            pattern: {
              value: /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/,
              message: "Email inválido",
            },
          },
        }}
        inputProps={{
          placeholder: "Email",
          returnKeyType: "next",
          onSubmitEditing: () => senhaRef.current?.focus(),
        }}
      />
      <Input
        ref={senhaRef}
        icon="eye-off"
        error={errors.Password?.message}
        isPassword={true}
        formProps={{
          name: "Password",
          control,
          rules: {
            required: "Senha é obrigatório",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,}$/,
              message: `A senha deve ter pelo menos:
                                        \nUma letra maiúscula (ex.: A, B, C, ...)
                                        \nUma letra minúscula (ex.: a, b, c, ...)
                                        \nUm número (ex.: 1, 2, 3, ...)
                                        \nUm caractere especial (ex.: @, #, $, ...)
                                        \nDeve ter no mínimo 6 caracteres.`,
            },
          },
        }}
        inputProps={{
          placeholder: "Senha",
          returnKeyType: "next",
          secureTextEntry: true,
          onSubmitEditing: () => confirmSenhaRef.current?.focus(),
        }}
      />

      <Input
        ref={confirmSenhaRef}
        icon="eye-off"
        error={errors.ConfirmPassword?.message}
        isPassword={true}
        formProps={{
          name: "ConfirmPassword",
          control,
          rules: {
            required: "Confirme a senha",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{6,}$/,
              message: `A senha deve ter pelo menos:
                                        \nUma letra maiúscula (ex.: A, B, C, ...)
                                        \nUma letra minúscula (ex.: a, b, c, ...)
                                        \nUm número (ex.: 1, 2, 3, ...)
                                        \nUm caractere especial (ex.: @, #, $, ...)
                                        \nDeve ter no mínimo 6 caracteres.`,
            },
            validate: validationPassword,
          },
        }}
        inputProps={{
          placeholder: "Confirme a senha",
          secureTextEntry: true,
        }}
      />
      <RNPickerSelect
        style={styles.input}
        onValueChange={(value) => setUserType(value)}
        items={[
          { label: 'Student', value: 'Student' },
          { label: 'Teacher', value: 'Teacher' },
          { label: 'Secretary', value: 'Secretary' },
        ]}
        value={userType} 
        placeholder={{ label: "Selecione o tipo de usuário", value: null }}
      />
      <Button title="Cadastrar" onPress={handleSubmit(handleNextStep)} />
    </View>
  );
}

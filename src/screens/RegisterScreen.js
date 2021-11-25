import React from "react"
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Alert, Image } from "react-native";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

import { TextInputMask } from 'react-native-masked-text'
import { Icon } from 'react-native-elements'

import HeaderComponent from "../components/Header"
import ButtonComponent from "../components/Button";
import { postUser } from "../services/post";
import Loading from "../components/Loading";
import { deleteUser } from "../services/delete";
import { updateUser } from "../services/put";

// import ImagePicker from 'react-native-image-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const RegisterSchema = Yup.object().shape({
  codigo: Yup.string()
    .min(4, 'Mínimo 4 caracteres')
    .max(6, 'Maxímo 6 caracteres')
    .required('Código é obrigatório'),
  nome: Yup.string()
    .required('Nome é obrigatório'),
  dataNascimento: Yup.string()
    .required('Data de nascimento é obrigatório'),
});

// CAIXA DE OPCOES DA FOTO
const opcoes = {
  title: 'Selecionar Foto',
  tintColor: 'black',
  takePhotoButtonTitle: 'Câmera',
  chooseFromLibraryButtonTitle: "Galeria de fotos",
  cancelButtonTitle: 'Cancelar',
  //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }], //botao personalizado
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
  includeBase64: true
};

const RegisterScreen = ({ navigation, route }) => {

  const { size, object } = route.params;

  const [loading, setLoading] = React.useState(false)
  const [foto, setFoto] = React.useState("")

  const saveUser = (values) => {
    setLoading(true)
    
    const response = postUser(values, size, foto)

    if(response === 201) {
      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Cadastro realizado com sucesso!!",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]

      )
    } else {

      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Não foi possivel salvar o seu item.",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]
  
      )
    }

  }

  const removeUser = () => {
    const response = deleteUser(object)

    if(response === 200) {
      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Item removido com sucesso!!",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]

      )
    } else {
      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Não foi possivel remover este item.",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]
      )
    }
  }

  const update = (values) => {

    const response = updateUser(values, foto)

    if(response === 200) {
      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Item atualizado com sucesso!!",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]

      )
    } else {
      setLoading(false)
      Alert.alert(
        "DevelApp",
        "Não foi possivel atualizar este item.",
        [
          { text: "OK", onPress: () => navigation.navigate("Home") }
        ]
      )
    }
  }

  const TirarFoto = async () => {
    const result = await launchCamera(opcoes)
    const data = result.assets[0].base64
    const image = 'data:image/png;base64,'+data
    setFoto(image)
  }

  const renderFoto = () => {
    return (
      foto !== "" ?
            <View 
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 20 
              }}
            >
              <Image 
                style={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: 200/2,
                }} 
                source={{ 
                  uri: foto
                }} 
              />
            </View>
            :
            <View />
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <HeaderComponent title={'Register'} icon={'arrow-left'} onPress={() => navigation.goBack()} />
      <Formik
        enableReinitialize={true}
        initialValues={
          object !== undefined ? object : {
          codigo: '',
          nome: '',
          dataNascimento: '',
        }}
        validationSchema={RegisterSchema}
        onSubmit={values => {
          object !== undefined ? 
            update(values, size) 
          : 
            saveUser(values, size)
        }}
      >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={{ flex: 1, justifyContent: "space-between",}}>
          <View>
            <TextInputMask
              type={'custom'}
              placeholder="Código"
              placeholderTextColor="#909090"
              options={{ mask: '********************************************************'}}
              style={{
                height: 45,
                fontSize: 20,
                margin: 10,
                paddingLeft: 10,
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 5,
                color: "#909090"
              }}
              onChangeText={handleChange('codigo')}
              onBlur={handleBlur('codigo')}
              value={values.codigo}
            />
              {errors.codigo && touched.codigo ? (
              <Text style={{ marginLeft: 10, color: "#ef6666" }}>{errors.codigo}</Text>
            ) : null}

              <TextInputMask
                type={'custom'}
                placeholder="Nome"
                placeholderTextColor="#909090"
                options={{ mask: '********************************************************'}}
                style={{
                  height: 45,
                  fontSize: 20,
                  margin: 10,
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  color: "#909090"
                }}
                onChangeText={handleChange('nome')}
                onBlur={handleBlur('nome')}
                value={values.nome}
              />
              {errors.nome && touched.nome ? (
              <Text style={{ marginLeft: 10, color: "#ef6666" }}>{errors.nome}</Text>
            ) : null}

              <TextInputMask
                type={'datetime'}
                placeholder="Data de Nascimento"
                placeholderTextColor="#909090"
                options={{ format: 'DD/MM/YYYY'}}
                style={{
                  height: 45,
                  fontSize: 20,
                  margin: 10,
                  paddingLeft: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  borderRadius: 5,
                  color: "#909090"
                }}
                onChangeText={handleChange('dataNascimento')}
                onBlur={handleBlur('dataNascimento')}
                value={values.dataNascimento}
              />
              {errors.dataNascimento && touched.dataNascimento ? (
              <Text style={{ marginLeft: 10, color: "#ef6666" }}>{errors.dataNascimento}</Text>
            ) : null}
            <TouchableOpacity onPress={TirarFoto} style={{ backgroundColor: "#3aacff", justifyContent: "center", height: 40, margin: 10, borderRadius: 5 }}>
              <Icon name={"camera"} type='simple-line-icon' color='#FFF'  />
            </TouchableOpacity>
          </View>

          { renderFoto() }

          {
            loading ?
              <Loading loading={loading} />
            :
              object !== undefined ?
                <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                  <ButtonComponent 
                    color={"#FF6347"}
                    width={"45%"}
                    title={"Excluir"}
                    onPress={removeUser}
                  />

                  <ButtonComponent 
                    color={"#3aacff"}
                    width={"45%"}
                    title={"Atualizar"}
                    onPress={handleSubmit}
                  />
                </View>
              :
                <ButtonComponent 
                  color={"#3aacff"}
                  title={"Salvar"}
                  onPress={handleSubmit}
                />
          }

        </View>
      )}
    </Formik>
    </View>
  )
} 

export default RegisterScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});


import React from 'react';
import { ScrollView, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ButtonComponent from '../components/Button';
import HeaderComponent from '../components/Header';
import ListComponent from '../components/List';

import { getDatabase, ref, set, onValue } from "firebase/database";
import Loading from '../components/Loading';

const HomeScreen = ({ navigation }) => {

  const [ users, setUsers ] = React.useState([])
  const [ amount, setAmount ] = React.useState(0)
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    getAll()
  },[])

  const getAll = () => {

    setLoading(true)
    
    const db = getDatabase();

    const starCountRef = ref(db, 'users');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const size = snapshot.size

      if(data !== null) {
        const listUsers = data.map((user, index) => ({
          id: index,
          codigo: user.codigo,
          dataNascimento: user.dataNascimento,
          nome: user.nome,
          foto: user.foto,
        }))
  
        setUsers(listUsers)
        setAmount(size)
  
        setLoading(false)
      }

    });
  } 

  return (
    <SafeAreaProvider style={{ flex: 1, backgroundColor: "#FFF", justifyContent: 'center' }}>
      <HeaderComponent title={'Devel App'} />

      <Text style={{ textAlign: "center", color: "#000", fontSize: 25, margin: 10 }}>Itens Cadastrados</Text>

      <ScrollView contentInsetAdjustmentBehavior="automatic">
        {
          users.length > 0 ? 
            <ListComponent list={users} navigation={navigation} /> 
          : 
            <Loading loading={loading} />
        }

      </ScrollView>
      <ButtonComponent 
        color={"#3aacff"}
        title="Cadastrar"
        onPress={() => navigation.navigate("Register", { size: amount })}
      />

    </SafeAreaProvider>
  );
}
export default HomeScreen;

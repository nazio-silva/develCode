import { getDatabase, ref, set, push, onValue } from "firebase/database";
const db = getDatabase();
const usersRef = ref(db, 'users')

export const postUser = (values, size, foto) => {

  const key = size + 1

  const {codigo, nome, dataNascimento} = values
  
  const usersRef = ref(db, `users/${key}`);
  //const newPostRef = push(usersRef);

  set(usersRef,{
    codigo: codigo,
    nome: nome,
    dataNascimento: dataNascimento,
    foto : foto,
  })
 
  return 201

} 

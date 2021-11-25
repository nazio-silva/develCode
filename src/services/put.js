import { getDatabase, ref, set, push, onValue, child } from "firebase/database";
const db = getDatabase();
const usersRef = ref(db, 'users')

export const updateUser = (values, foto) => {
  const { id, codigo, nome, dataNascimento } = values

  const usersRef = ref(db, `users/${id}`);
  set(usersRef, {
    codigo: codigo,
    nome: nome,
    dataNascimento: dataNascimento,
    foto : foto,
  })
  return 200
} 

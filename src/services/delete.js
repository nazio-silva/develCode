import { getDatabase, ref, set, push, onValue, child } from "firebase/database";
const db = getDatabase();
const usersRef = ref(db, 'users')

export const deleteUser = (object) => {
  const { id } = object
  const usersRef = ref(db, `users/${id}`);
  set(usersRef,null)
  return 200
} 

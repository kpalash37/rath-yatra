// services/user-service.ts
import { database } from '@/lib/firebase';
import { IMessage } from '@/lib/interfaces/message.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'Message/';

export async function createMessage(message: IMessage): Promise<void> {
  try {
    console.log("connecting to firebase database");
    console.log("Creating booking with data:", message);
    const newUserRef = push(ref(database, USERS_PATH));
    const res = await set(newUserRef, {
      ...message,
      createdAt: new Date().toISOString(),
    });

    return res;
  } catch (error) {
    toast.error("Error creating message:") ;
    throw new Error("Failed to create message");
  }
}

export async function readMessage(): Promise<IMessage[]> {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, USERS_PATH));
  const data = snapshot.val();
  return data ? Object.values(data) : [];
}

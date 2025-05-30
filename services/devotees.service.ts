// services/user-service.ts
import { database } from '@/lib/firebase';
import { IBooking } from '@/lib/interfaces/booking.interface';
import { IDevotee } from '@/lib/interfaces/devotees.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'Devotees/';

export async function createDevotee(devotee: IDevotee): Promise<void> {
  try {
    console.log("connecting to firebase database");
    console.log("Creating booking with data:", devotee);
    const newUserRef = push(ref(database, USERS_PATH));
    const res = await set(newUserRef, {
      ...devotee,
      createdAt: new Date().toISOString(),
    });

    return res;
  } catch (error) {
    toast.error("Error creating booking:") ;
    throw new Error("Failed to create booking");
  }
}

export async function getDevoteeByPhone(phone: string): Promise<IDevotee[] | null> {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, USERS_PATH));
    const data = snapshot.val();
    if (!data) return null;
    const bookings: IDevotee[] = Object.values(data);
    const matched = bookings.filter((booking) => booking.phone === phone);
    return matched.length > 0 ? matched : null;
}

export async function getDevotees(): Promise<IDevotee[]> {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, USERS_PATH));
  const data = snapshot.val();
  //return data ? Object.values(data) : [];

  return data
    ? Object.entries(data).map(([id, value]) => ({
        id,
        ...(value as any),
      }))
    : [];
}

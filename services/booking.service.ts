// services/user-service.ts
import { database } from '@/lib/firebase';
import { IBooking } from '@/lib/interfaces/booking.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'shirtBooking/';

export async function createBooking(booking: IBooking): Promise<void> {
  try {
    console.log("connecting to firebase database");
    console.log("Creating booking with data:", booking);
    const newUserRef = push(ref(database, USERS_PATH));
    const res = await set(newUserRef, {
      ...booking,
      createdAt: new Date().toISOString(),
    });

    return res;
  } catch (error) {
    toast.error("Error creating booking:") ;
    throw new Error("Failed to create booking");
  }
}

export async function getBookingByPhone(phone: string): Promise<IBooking[] | null> {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, USERS_PATH));
    const data = snapshot.val();
    if (!data) return null;
    const bookings: IBooking[] = Object.values(data);
    const matched = bookings.filter((booking) => booking.phone === phone);
    return matched.length > 0 ? matched : null;
}

export async function readBooking(): Promise<IBooking[]> {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, USERS_PATH));
  const data = snapshot.val();
  return data ? Object.values(data) : [];
}

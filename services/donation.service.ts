// services/user-service.ts
import { database } from '@/lib/firebase';
import { IBooking } from '@/lib/interfaces/booking.interface';
import { IDonation } from '@/lib/interfaces/donation.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'Donation/';

export async function createDonationService(booking: IDonation): Promise<void> {
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

export async function getDonationByPhone(phone: string): Promise<IDonation | null> {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, USERS_PATH));
    const data = snapshot.val();
    if (!data) return null;
    const bookings: IDonation[] = Object.values(data);
    const matched = bookings.find((booking) => booking.phone === phone);
    return matched ? matched : null;
}

export async function readDonations(): Promise<IDonation[]> {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, USERS_PATH));
  const data = snapshot.val();
  return data ? Object.values(data) : [];
}

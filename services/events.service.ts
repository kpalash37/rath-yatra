// services/user-service.ts
import { database } from '@/lib/firebase';
import { IBooking } from '@/lib/interfaces/booking.interface';
import { IDevotee } from '@/lib/interfaces/devotees.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'Events/';

export async function createEvents(evens: any): Promise<void> {
  try {
    console.log("connecting to firebase database");
    console.log("Creating booking with data:", evens);
    const newUserRef = push(ref(database, USERS_PATH));
    const res = await set(newUserRef, {
      ...evens,
      createdAt: new Date().toISOString(),
    });

    return res;
  } catch (error) {
    toast.error("Error getting events:");
    throw new Error("Failed to create booking");
  }
}




export async function getEvents(): Promise<any[]> {
  const dbRef = ref(database);
  const snapshot = await get(child(dbRef, USERS_PATH));
  const data = snapshot.val();
  return data ? Object.values(data) : [];

  // return data
  //   ? Object.entries(data).map(([id, value]) => ({
  //       id,
  //       ...(value as any),
  //     }))
  //   : [];
}


const events = {
    religious: [
      {
        title: "Snana Yatra",
        date: "June 14, 2025",
        time: "6:00 AM - 12:00 PM",
        location: "Jagannath Temple",
        description: "Sacred bathing ceremony of the deities",
      },
      {
        title: "Rath Yatra Begins",
        date: "June 28, 2025",
        time: "7:00 AM - 6:00 PM",
        location: "Temple to Gundicha",
        description: "Grand chariot procession starts",
      },
      {
        title: "Bahuda Yatra",
        date: "July 6, 2025",
        time: "8:00 AM - 7:00 PM",
        location: "Gundicha to Temple",
        description: "Return journey of the chariots",
      },
    ],
    cultural: [
      {
        title: "Classical Dance Performance",
        date: "June 27, 2025",
        time: "7:00 PM - 9:00 PM",
        location: "Cultural Stage",
        description: "Odissi and Bharatanatyam performances",
      },
      {
        title: "Devotional Music Night",
        date: "June 29, 2025",
        time: "6:00 PM - 10:00 PM",
        location: "Main Amphitheater",
        description: "Bhajans and kirtans by renowned artists",
      },
    ],
    food: [
      {
        title: "Mahaprasadam Distribution",
        date: "June 28 - July 6, 2025",
        time: "12:00 PM - 3:00 PM Daily",
        location: "Multiple Distribution Points",
        description: "Free sacred food for all devotees",
      }    
    ],
  }
// services/user-service.ts
import { database } from '@/lib/firebase';
import { IPerson, ITask } from '@/lib/interfaces/task.interface';
import { ref, push, set, get, child } from 'firebase/database';
import { toast } from 'react-toastify';

const USERS_PATH = 'Tasks/';

// export async function createTasks(): Promise<void> {
//   try {
//     let taskCollection= tasks;
//     console.log("connecting to firebase database");
//     console.log("Creating booking with data:", taskCollection);
//     const newUserRef = push(ref(database, USERS_PATH));

//     for (const task of taskCollection) {
//       const taskRef = push(ref(database, USERS_PATH));
//       await set(taskRef, {
//       ...task,
//       createdAt: new Date().toISOString(),
//       });
//     }

    

//     //return res;
//   } catch (error) {
//     toast.error("Error creating booking:") ;
//     throw new Error("Failed to create booking");
//   }
// }

export async function createTaskByAdmin(task: ITask): Promise<void> {
  try {
    console.log("connecting to firebase database");
    console.log("Creating booking with data:", task);
    const newUserRef = push(ref(database, USERS_PATH));
    const res = await set(newUserRef, {
      ...task,
      createdAt: new Date().toISOString(),
    });

    return res;
  } catch (error) {
    toast.error("Error creating booking:") ;
    throw new Error("Failed to create booking");
  }
}


export async function addPersonToTaskService(taskId: string, person: IPerson): Promise<void> {
  try {
    // Fetch current assignedPersons array
    const assignedPersonsRef = ref(database, `${USERS_PATH}${taskId}/assignedPersons`);
    const snapshot = await get(assignedPersonsRef);
    const current = snapshot.exists() ? snapshot.val() : [];
    // If current is an array, push; if it's an object (from push), convert to array
    let assignedPersonsArr: IPerson[] = [];
    if (Array.isArray(current)) {
      assignedPersonsArr = [...current, person];
    } else if (current && typeof current === 'object') {
      assignedPersonsArr = [...(Object.values(current) as IPerson[]), person];
    } else {
      assignedPersonsArr = [person];
    }
    await set(assignedPersonsRef, assignedPersonsArr);
    toast.success("Person added to task successfully");
  } catch (error) {
    toast.error("Error adding person to task");
    throw new Error("Failed to add person to task");
  }
} 

export async function deletePersonFromTaskService(taskId: string, personName: string): Promise<void> {
  try { 
    // Fetch current assignedPersons array
    const assignedPersonsRef = ref(database, `${USERS_PATH}${taskId}/assignedPersons`);
    const snapshot = await get(assignedPersonsRef);
    const current = snapshot.exists() ? snapshot.val() : [];
    
    // If current is an array, filter out the person; if it's an object, convert to array first
    let assignedPersonsArr: IPerson[] = [];
    if (Array.isArray(current)) {
      assignedPersonsArr = current.filter((person: IPerson) => person.name !== personName);
    } else if (current && typeof current === 'object') {
      assignedPersonsArr = (Object.values(current) as IPerson[]).filter((person: IPerson) => person.name !== personName);
    }
    
    await set(assignedPersonsRef, assignedPersonsArr);
    toast.success("Person removed from task successfully");
  } catch (error) {
    toast.error("Error removing person from task");   
  }
}

export async function getTasks(): Promise<ITask[]> {
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







const tasks: ITask[] = [
    {      
      title: "Chariot Decoration",
      description: "Decorate all three chariots with traditional flowers and ornaments",
      category: "Decoration",
      priority: "Medium",
      status: "Completed",
      startDate: "2025-06-10",
      endDate: "2025-06-15",
      location: "284 Freshwater Road, St. John's",
      assignedPersons: [
        { name: "Visheesh Sheeshan Poorun", phone:"234343",  role: "Decoration Lead", avatar: "/placeholder.svg?height=40&width=40" },
        {  name: "Mousumi Sen", phone:"234343",  role: "Assistant", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: "6", name: "Shuvashis Ray", phone:"234343", role: "Decoration Lead" },
      progress: 100,
    },
    {
      
      title: "Volunteer Collection Program",
      description: "Conduct comprehensive training for all registered volunteers",
      category: "Training",
      priority: "High",
      status: "Pending",
      startDate: "2025-06-15",
      endDate: "2025-06-20",
      location: "Community Hall, St. John's",
      assignedPersons: [],
      responsiblePerson: {  name: "Protul Kanti Pramanik", phone:"234343",  role: "Manager" },
      progress: 0,
    },
    
    {
      id: "4",
      title: "Security Coordination",
      description: "Coordinate with local police and security agencies for crowd management",
      category: "Security",
      priority: "High",
      status: "In Progress",
      startDate: "2025-06-01",
      endDate: "2025-07-10",
      location: "Multiple Locations, St. John's",
      assignedPersons: [
        { name: "Protul Kanti Pramanik", phone:"234343",  role: "Security Chief", avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: "18", name: "Visheesh Sheeshan Poorun", phone:"234343",  role: "Security Chief" },
      progress: 40,
    },
    {
      
      title: "Prasadam Setup",
      description: "Setup distribution points and organize food preparation",
      category: "Food Service",
      priority: "Medium",
      status: "Pending",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      location: "Multiple Distribution Points, St. John's",
      assignedPersons: [
        {  name: "Nipa", role: "Coconut Laddu", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
        {  name: "Laboni", role: "Suji Item", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
        { name: "Neha", role: "Item 1", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: "9", name: "Shishir Amit", phone:"234343",  role: "Food Coordinator" },
      progress: 0
    },

    {
      
      title: "Donation Collection",
      description: "Organize donation collection drives and manage funds",
      category: "Logistics",
      priority: "High",
      status: "In Progress",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      location: "Multiple Distribution Points, St. John's",
      assignedPersons: [ ],
      responsiblePerson: { id: "9", name: "Neha", phone:"234343",  role: "Manager" },
      progress: 0
    },

    {
      
      title: "T-Shirt Distribution",
      description: "Organize distribution of festival T-shirts to volunteers and participants",
      category: "Logistics",
      priority: "High",
      status: "In Progress",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      location: "Multiple Distribution Points, St. John's",
      assignedPersons: [
        {  name: "Shishir Amit", role: "Lead", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
        {  name: "Badhan Paul", role: "Lead", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { id: "9", name: "Palash Kanti Bachar", phone:"709 6975309",  role: "Lead" },
      progress: 0
    },
    {
      
      title: "Banner and Signage Setup",
      description: "Design and install banners and signage across the festival area",
      category: "Decoration",
      priority: "Medium",
      status: "Pending",
      startDate: "2025-06-25",
      endDate: "2025-06-28",
      location: "Multiple Distribution Points, St. John's",
      assignedPersons: [
        {  name: "Badhan Paul", role: "Lead", phone:"234343",  avatar: "/placeholder.svg?height=40&width=40" },
      ],
      responsiblePerson: { name: "Palash Kanti Bachar", phone:"709 6975309",  role: "Lead" },
      progress: 0
    }
  ]
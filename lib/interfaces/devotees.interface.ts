export interface IDevotee {
    id?: string; // Optional, will be assigned by Firebase
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string; // e.g., "St. John's"
    state: string; // e.g., "Newfoundland and Labrador"
    pincode: string;
    emergencyContact: string;
    emergencyPhone: string;
    skills: string[];
    availability: string[];
    experience: string;
    motivation: string;
    department: string;
    adminLevel: string;
    specialRequirements: string;
    groupSize: string;
    transportationNeeded: boolean;
    role: string; // e.g., "Volunteer", "Staff", "Organizer"
    createdAt: string; // ISO date string
}
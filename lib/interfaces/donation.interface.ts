export interface IDonation {
    id?: string;
    amount: string;
    category: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    createdAt?: string; // ISO date string
    status?: 'Pending' | 'Completed' | 'Failed'; // Optional status field
}
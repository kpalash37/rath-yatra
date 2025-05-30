export interface IPerson {
    id?: string;
    name: string;
    phone: string;
    role: string;
    avatar?: string;
}

export interface ResponsiblePerson {
    id?: string;
    name: string;
    phone: string;
    role: string;
}

export interface ITask {
    id?: string;
    title: string;
    description: string;
    category: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Pending' | 'In Progress' | 'Completed';
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
    location: string;
    assignedPersons: IPerson[];
    responsiblePerson: ResponsiblePerson;
    progress: number; // 0-100
}
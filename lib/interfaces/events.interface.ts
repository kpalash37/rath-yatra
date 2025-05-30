export interface IEvent {
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export interface IEvents {
    religious: IEvent[];
    cultural: IEvent[];
    food: IEvent[];
}
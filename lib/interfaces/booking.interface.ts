export interface IBooking {
    name: string;
    phone: string;
    email: string;
    quantity: number;
    notes: string;
    size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
    address: string;
    price: number;
    paymentStatus: 'pending' | 'completed' | 'failed';
    deliveryStatus: 'pending' | 'delivered' | 'cancelled';
    createdAt: string;
}
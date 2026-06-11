export interface Mybooking {
  id: number;
  userEmail: string;
  sportName: string;
  venueName: string;
  date: string;
  fromTime: string;
  toTime: string;
  amount: number;
  paymentMethod: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}
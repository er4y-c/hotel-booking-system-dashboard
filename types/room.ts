export type RoomCategory = 'Basic' | 'Premium' | 'Suite';

export interface Room {
  _id?: string;
  category: RoomCategory;
  basePrice: number;
  hotelId: string;
  roomNumber: string;
}

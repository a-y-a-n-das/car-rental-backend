import { type IBooking } from "../../src/types/types.js";
import { type IData } from "../../src/types/types.js";
export declare function createBooking(carname: string, days: number, rentPerDay: number, user_id: number): Promise<IBooking>;
export declare function getBookings(user_id: number): Promise<IBooking[]>;
export declare function updateBooking(bookingId: number, data: IData): Promise<IBooking>;
export declare function deleteBooking(bookingId: number): Promise<{
    created_at: Date;
    id: number;
    days: number;
    user_id: number;
    car_name: string;
    rent_per_day: number;
    status: string;
}>;
export declare function getAllBookings(): Promise<{
    created_at: Date;
    id: number;
    days: number;
    user_id: number;
    car_name: string;
    rent_per_day: number;
    status: string;
}[]>;
//# sourceMappingURL=booking.d.ts.map
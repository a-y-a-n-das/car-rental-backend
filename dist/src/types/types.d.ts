import { type Request } from "express";
export interface IUser {
    id: number;
    username: string;
    password: string;
    created_at: Date;
}
export interface IBooking {
    id: number;
    car_name: string;
    user_id: number;
    days: number;
    rent_per_day: number;
    status: string;
    created_at: Date;
}
export interface IData {
    car_name?: string;
    days?: number;
    rent_per_day?: number;
    status?: string;
}
export interface userReq extends Request {
    user?: {
        userId: string;
        username: string;
    };
}
//# sourceMappingURL=types.d.ts.map
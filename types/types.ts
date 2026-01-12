export enum Status{
    booked,
    completed,
    cancelled
}

export interface IUser{
    id: number,
    username: string,
    password: string,
    created_at: Date
}

export interface IBooking{
    id: number,
    car_name: string,
    days: number,
    rent_per_day: number,
    status: Status,
    created_at: Date
}
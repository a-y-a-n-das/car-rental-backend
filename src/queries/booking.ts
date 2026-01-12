import { prisma } from "../../src/lib/prisma.ts";
import { type IBooking } from "../../src/types/types.ts";

interface IData {
  car_name?: string;
  days?: number;
  rent_per_day?: number;
  status?: string;
}

export async function createBooking(
  carname: string,
  days: number,
  rentPerDay: number,
  user_id: number
): Promise<IBooking> {
  const booking: IBooking = await prisma.booking.create({
    data: {
      car_name: carname,
      days: days,
      rent_per_day: rentPerDay,
      user_id: user_id,
      status: "booked",
    },
  });
  return booking;
}

export async function getBookings(user_id: number, status: string) {
  const bookings: IBooking[] = await prisma.booking.findMany({
    where: {
      user_id,
      status,
    },
  });
  return bookings;
}

export async function updateBooking(bookingId: number, data: IData) {
  const updatedBooking = await prisma.booking.update({
    where: {
      id: bookingId,
    },
    data: data,
  });

  return updatedBooking;
}


export async function deleteBooking(bookingId: number){
    const deletedBooking = await prisma.booking.delete({
        where:{
            id: bookingId
        }
    })
    return deletedBooking;
}

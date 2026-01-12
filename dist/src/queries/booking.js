import { prisma } from "../../src/lib/prisma.js";
import {} from "../../src/types/types.js";
import {} from "../../src/types/types.js";
export async function createBooking(carname, days, rentPerDay, user_id) {
    const booking = await prisma.booking.create({
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
export async function getBookings(user_id) {
    const bookings = await prisma.booking.findMany({
        where: {
            user_id,
            NOT: {
                status: "cancelled"
            }
        },
    });
    return bookings;
}
export async function updateBooking(bookingId, data) {
    const updatedBooking = await prisma.booking.update({
        where: {
            id: bookingId,
        },
        data: data,
    });
    return updatedBooking;
}
export async function deleteBooking(bookingId) {
    const deletedBooking = await prisma.booking.delete({
        where: {
            id: bookingId
        }
    });
    return deletedBooking;
}
export async function getAllBookings() {
    const allBookings = await prisma.booking.findMany();
    return allBookings;
}
//# sourceMappingURL=booking.js.map
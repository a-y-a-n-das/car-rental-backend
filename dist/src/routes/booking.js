import { Router } from "express";
import {} from "express";
import { createBooking, deleteBooking, getAllBookings, getBookings, updateBooking, } from "../queries/booking.js";
const router = Router();
router.post("/create", async (req, res) => {
    const { carName, days, rentPerDay } = req.body;
    const { userId } = req.user;
    if (parseInt(days) > 365 || parseInt(rentPerDay) > 2000) {
        res.status(400).send("invalid inputs");
        return;
    }
    const booking = await createBooking(carName, days, rentPerDay, parseInt(userId));
    if (booking) {
        res.status(201).json({ success: true, data: booking });
    }
    else {
        res.status(400).send("invalid inputs");
        return;
    }
});
router.get("/bookings", async (req, res) => {
    let { bookingId, summary } = req.query;
    const { userId, username } = req.user;
    const bookings = getBookings(parseInt(userId));
    if (Boolean(summary)) {
        let totalAmountSpent = 0;
        (await bookings).forEach((b) => {
            totalAmountSpent += b.rent_per_day * b.days;
        });
        res.status(200).json({
            success: true,
            data: {
                userId,
                username,
                totalBookings: (await bookings).length,
                totalAmountSpent,
            },
        });
    }
    else if (!Boolean(summary) && bookingId) {
        let id = Number(bookingId);
        let booking = (await bookings).filter((b) => {
            b.id == id;
        });
        if (booking.length == 0) {
            res.status(404).json({ success: false, error: "bookingId not found" });
            return;
        }
        res.status(200).json({ success: true, data: booking });
    }
    else if (bookingId == undefined || bookingId == null) {
        res.status(404).json({ success: false, error: "bookingId not found" });
    }
});
router.put("/update/:bookingId", async (req, res) => {
    const id = req.params.bookingId;
    const bookingId = Number(id);
    const { userId } = req.user;
    const { data } = req.body;
    if (!data || !bookingId) {
        res.status(400).send("Invalid inputs");
        return;
    }
    const bookings = await getBookings(parseInt(userId));
    const list = bookings.filter((b) => b.id == bookingId);
    console.log(bookings);
    if (list.length == 0) {
        res.status(403).send("booking doesn't belongs to user");
        return;
    }
    const updatedBooking = await updateBooking(bookingId, data);
    if (updatedBooking) {
        const totalCost = updatedBooking.rent_per_day * updatedBooking.days;
        res.status(200).json({ success: true, data: updatedBooking, totalCost });
    }
    else {
        res.status(404).send("booking not found");
    }
});
router.delete("/deletebooking/:bookingId", async (req, res) => {
    const bookingId = Number(req.params.bookingId);
    let { userId } = req.user;
    const id = parseInt(userId);
    if (!bookingId) {
        res.status(400).send("Invalid bookingId");
        return;
    }
    let valid = false;
    const bookings = await getAllBookings();
    bookings.forEach((b) => {
        b.id == bookingId && b.user_id == id ? (valid = true) : null;
    });
    if (valid) {
        const deletedBooking = await deleteBooking(bookingId);
        if (deletedBooking) {
            res.status(200).json({ success: true, data: deletedBooking });
        }
        else {
            res.status(404).send("booking not found");
        }
    }
    else {
        res.status(403).send("booking does not belong to user");
    }
});
export const bookingRoute = router;

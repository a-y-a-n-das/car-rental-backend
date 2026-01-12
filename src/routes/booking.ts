import { Router } from "express";
import { type Response } from "express";
import {
  createBooking,
  deleteBooking,
  getAllBookings,
  getBookings,
  updateBooking,
} from "../queries/booking.ts";
import type { IBooking,  userReq } from "../types/types.ts";

const router = Router();

router.post("/create", async (req: userReq, res: Response) => {
  const { carName, days, rentPerDay } = req.body;
  const { userId } = req.user as { userId: string; };
  const booking = await createBooking(carName, days, rentPerDay, parseInt(userId));

  if (booking) {
    res.status(201).json({ success: true, data: booking });
  } else {
    res.status(400).send("invalid inputs");
  }
}) ;

router.get("/bookings", async (req: userReq, res: Response) => {
  let { bookingId, summary } = req.query;
  const { userId, username } = req.user as { userId: string; username: string; };

  const bookings = getBookings(parseInt(userId))

  if (summary) {
    let totalAmountSpent = 0;
    (await bookings).forEach((b: IBooking) => {
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

  if (!summary) {
    let id = Number(bookingId);
    let booking = (await bookings).filter((b: IBooking) => {
      b.id == id;
    });
    res.status(200).json({ success: true, data: booking });
  } else {
    res.status(400).send("bookingId not found");
  }
});

router.put("/updatebooking/:bookingId", async (req: userReq, res: Response) => {
  const bookingId = Number(req.params.bookingId);
  const { userId } = req.user as { userId: string; };
  const data = req.body;
  if (!data || !bookingId) {
    res.status(400).send("Invalid inputs");
    return;
  }

  const bookings = await getBookings(parseInt(userId));
  const list = bookings.filter((b: IBooking)=>b.id==bookingId)
  if(list.length==0){
    res.status(403).send("booking doesn't belongs to user")
  }

  const updatedBooking: IBooking = await updateBooking(bookingId, data);
  if (updatedBooking) {
    const totalCost = updatedBooking.rent_per_day * updatedBooking.days;
    res.status(200).json({ success: true, data: updatedBooking, totalCost });
  } else {
    res.status(404).send("booking not found");
  }
});

router.delete(
  "/deletebooking/:bookingId",
  async (req: userReq, res: Response) => {
    const bookingId = Number(req.params.bookingId);
    let { userId } = req.user as {userId: string};
    const id: number = parseInt(userId);
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
      } else {
        res.status(404).send("booking not found");
      }
    } else {
      res.status(403).send("booking does not belong to user");
    }
  }
);

export const bookingRoute = router;

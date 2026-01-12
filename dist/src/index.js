import express, {} from "express";
import dotenv from "dotenv";
import auth from "./routes/authMiddleware.js";
import { userRoute } from "./routes/user.js";
import { bookingRoute } from "./routes/booking.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use("/user", userRoute);
app.use("/booking", auth, bookingRoute);
app.listen(3000, () => {
    console.log("app is listening on port 3000");
});
//# sourceMappingURL=index.js.map
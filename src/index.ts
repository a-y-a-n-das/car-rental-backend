import express, {type Express} from "express" 
import dotenv  from "dotenv";
import auth from "./routes/authMiddleware.ts";
import { userRoute } from "./routes/user.ts";
import { bookingRoute } from "./routes/booking.ts";
dotenv.config()

const app: Express = express()

app.use("/user", userRoute);
app.use("/booking", auth, bookingRoute);

app.listen(3000, ()=>{console.log("app is listening on port 3000")})

import express, {type Express} from "express" 

const app: Express = express()

app.route("/user");
app.route("/booking");

app.listen(3000, ()=>{console.log("app is listening on port 3000")})

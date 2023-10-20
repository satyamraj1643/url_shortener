const express = require("express");
const PORT = 8000;
const path = require("path");
const {URL} = require("./models/url")
const {connectMongoDB} = require("./DBConnection")
const cookieParser  = require('cookie-parser')
const { router } = require("./routes/url")
const {Creationrouter}  = require("./routes/user")
const { staticRouter } = require("./routes/staticRouter")
const app = express();
const {logReqRes, restrictToLoggedInUserOnly} = require("./middlewares/user")

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const urlval = "mongodb://127.0.0.1:27017/";
connectMongoDB(urlval);
app.use(logReqRes("./log.txt"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded ({extended : false}));

app.use("/url",restrictToLoggedInUserOnly, router);
app.use("/user",Creationrouter);
app.use("/", staticRouter);


app.listen(PORT, ()=>{
    console.log(`Server Started at Port : ${PORT}`)
})




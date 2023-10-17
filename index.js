const express = require("express");
const PORT = 8000;
const path = require("path");
const {URL} = require("./models/user")
const {connectMongoDB} = require("./DBConnection")
const { router } = require("./routes/user")
const { staticRouter } = require("./routes/staticRouter")
const app = express();
const {logReqRes} = require("./middlewares/user")

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const urlval = "mongodb://127.0.0.1:27017/test";
connectMongoDB(urlval);
app.use(logReqRes("./log.txt"));
app.use(express.json());
app.use(express.urlencoded ({extended : false}));
app.use("/url", router);
app.use("/", staticRouter);


app.listen(PORT, ()=>{
    console.log(`Server Started at Port : ${PORT}`)
})




const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const AuthRoute = require("./routes/auth");
const MusicRoute = require("./routes/music");
app.use(express.json());
app.use(cors());
app.use("/auth", AuthRoute);
app.use("/music", MusicRoute);
app.get("/ping", (req, res) => {
    res.send("🏀 pong.");
});
const PORT = process.env.PORT || 5001;
mongoose
    .connect(process.env.MONGO_CONNECTION_STRING)
    .then(() => {
        app.listen(PORT, () => {
            console.log("listing at " + PORT);
        });
    })
    .catch((err) => {
        console.log("MONGO err=> ", err);
    });

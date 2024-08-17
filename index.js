const express = require("express")
const mongoose = require("mongoose")
const { register } = require("./controllers/auth.controller");
const app = express();
const dotenv = require("dotenv")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const helmet = require("helmet")
const morgan = require("morgan")
const multer = require("multer")
const postRouter = require("./routes/posts.routes")
const authRouter = require("./routes/auth.routes")


dotenv.config();
app.use(express.json())
app.use(helmet());
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

//routes

app.post("/auth/register", upload.single("picture") ,register)
app.use(authRouter)
app.use(postRouter)






const PORT = process.env.PORT || 3002

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => { console.log("Server started") });
}).catch((e) => {
    console.log(e);
})
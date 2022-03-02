const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 3001;
const audioRoutes = require("./routes/audioRoutes");
const db = require("./models");
const path = require("path");
const bodyParser = require("body-parser");

app.use(cors());
app.options("*", cors());
// var whitelist = [
//   "https://audio--manager.herokuapp.com",
//   "http://localhost:3000/audio/getAudios",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

//
// app.use(cors());

// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "https://audio--manager.herokuapp.com",
//     "http://localhost:3000",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.setHeader("Access-Control-Allow-Origin", origin);
//   }
//   return next();
// });

// app.use(function (req, res, next) {
//   res.contentType("application/json");
//   next();
// });

// app.all("/*", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

//   res.header("Access-Control-Allow-Headers", "*");
//   next();
// });
// app.use(
//   cors({
//     origin: ["http://localhost:3000"],
//   })
// );

app.use((req, res, next) => {
  //allow access from every, elminate CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.removeHeader("x-powered-by");
  //set the allowed HTTP methods to be requested
  res.setHeader("Access-Control-Allow-Methods", "POST");
  //headers clients can use in their requests
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  //allow request to continue and be handled by routes
  next();
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use("/audio", audioRoutes);
app.set("view engine", "ejs");
// app.set("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(express.static(path.join(__dirname, "assets")));

db.audioDetails
  .sync({ force: false })
  .then(() => {
    db.user
      .sync({ force: false })
      .then(() => {
        app.listen(port, (req, res) => {
          console.log(`listening in http://localhost:${port}`);
        });
      })
      .catch((err) => {
        console.log(`error: ${err}`);
      });
  })
  .catch((err) => {
    console.error(err);
  });

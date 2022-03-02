const express = require("express");
const app = express();
const route = express.Router();
const audioController = require("../controller/audioController");
const multer = require("multer");
const {
  addAudio,
  getAudios,
  addText,
} = require("../controller/audioController");
const fs = require("fs");
const fileUpload = require("express-fileupload");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// var upload = multer({ storage: storage });
var upload = multer();
route.use(fileUpload());
// route.use(
//   fileUpload({
//     useTempFiles: false,
//   })
// );
route.get("/", (req, res) => {
  res.render("addAudio");
});
route.get("/getAudios", getAudios);
route.post("/addAudio", upload.single("audioFile"), addAudio);
// route.post("/addAudio", addAudio);
route.post("/addText", addText);

// cloudinary.uploader.upload((error, response) => {
//   if (error) {
//     console.log(error);
//     return;
//   }
//   console.log(response);
//   res.send("File Uploaded");
// });

//   let streamUpload = (req) => {
//     return new Promise((resolve, reject) => {
//       let stream = cloudinary.uploader.upload_stream((error, result) => {
//         if (result) {
//           resolve(result);
//         } else {
//           reject(error);
//         }
//       });
//       streamifier.createReadStream(req.file.buffer).pipe(stream);
//     });
//   };

//   async function upload(req) {
//     let result = await streamUpload(req);
//     // console.log(result);
//     res.send("File Uploaded");
//   }

//   upload(req);

//   return new Promise((resolve, reject) => {
//     let stream = cloudinary.uploader.upload_stream((error, result) => {
//       if (result) {
//         resolve(result);
//       } else {
//         reject(error);
//       }
//     });
//     console.log(stream);

//     streamifier.createReadStream(req.file.filename).pipe(stream);
//   });
// };

// async function upload(req) {
//   let result = await streamUpload(req)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// }

// upload(req);
// res.send("Success");
// });
// route.get("/assets/uploads/:s", audioController.getAudio);
module.exports = route;

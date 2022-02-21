const db = require("../models");
const path = require("path");
const axios = require("axios");
const { getAudioDurationInSeconds } = require("get-audio-duration");
const httpAdapter = require("axios/lib/adapters/http");

//Get Audio
exports.getAudios = (req, res) => {
  // res.json({ message: "hey" });
  // res.send("heyy");
  db.audioDetails.findAll().then((audios) => {
    if (Object.keys(audios).length == 0) {
      res.send("no data found");
      return false;
    }
    // res.send(audios);
    // console.log(audios);
    res.render("viewAudio", { audios });
  });
};

// Add Audio File
exports.addAudio = (req, res) => {
  // res.send("hey");

  // console.log(req);

  if (
    req.file.mimetype === "audio/basic" ||
    req.file.mimetype === "audio/mpeg" ||
    req.file.mimetype === "audio/vnd.wav" ||
    req.file.mimetype === "audio/vorbis" ||
    req.file.mimetype === "audio/ogg"
  ) {
    getAudioDurationInSeconds(req.file.path)
      .then((duration) => {
        // if (duration < 60) {
        //   duration = duration;
        //   duration = duration.toFixed(3) + " seconds";
        // } else if (duration > 60) {
        //   duration = duration / 60;
        //   duration = duration.toFixed(2) + " minutes";
        // }
        db.audioDetails
          .create({
            audioFile: req.file.path,
            audioLength: duration,
          })
          .then((data) => {
            res.json({ message: "File Uploaded!", data });
          });
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    res.json({ message: "File type must be audio" });
  }
};

//Play Audio
exports.getAudio = (req, res) => {
  const { s } = req.params;
  // const filePath = path.join("../uploads/", s);
  const filePath = path.join("../uploads/", s);
  console.log(filePath);
  res.render("singleAudio", { fileName: s });

  // axios
  //   .get(, {
  //     responseType: "stream",
  //     adapter: httpAdapter,
  //     "Content-Range": "bytes 16561-8065611",
  //   })
  //   .then((Response) => {
  //     const stream = Response.data;

  //     res.set("content-type", "audio/mp3");
  //     res.set("accept-ranges", "bytes");
  //     res.set("content-length", Response.headers["content-length"]);
  //     console.log(Response);

  //     stream.on("data", (chunk) => {
  //       res.write(chunk);
  //     });

  //     stream.on("error", (err) => {
  //       res.sendStatus(404);
  //     });

  //     stream.on("end", () => {
  //       res.end();
  //     });
  //   })
  //   .catch((Err) => {
  //     console.log(Err.message);
  //   });
};

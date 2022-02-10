const db = require("../models");
const { getAudioDurationInSeconds } = require("get-audio-duration");
exports.getAudios = (req, res) => {
  // res.json({ message: "hey" });
  // res.send("heyy");
  db.audioDetails.findAll().then((audios) => {
    if (Object.keys(audios).length == 0) {
      res.send("no data found");
      return false;
    }
    res.send(audios);
  });
};

exports.addAudio = (req, res) => {
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
            audioFile: req.file.originalname,
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

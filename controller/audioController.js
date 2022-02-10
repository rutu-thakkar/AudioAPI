const db = require("../models/audiodetails");
const { getAudioDurationInSeconds } = require("get-audio-duration");
exports.getAudios = (req, res) => {
  db
    .findAll()
    .then((data) => {
      if (Object.keys(data).length === 0) {
        res.json({ message: "No data found" });
        return;
      }
      res.json({ message: "Data", data });
    })
    .catch((err) => {
      res.json({ message: "**--" + err.message });
    });
};

exports.addAudio = (req, res) => {
  // console.log(req.file);
  if (
    req.file.mimetype == "audio/basic" ||
    req.file.mimetype == "audio/mpeg" ||
    req.file.mimetype == "audio/vnd.wav" ||
    req.file.mimetype == "audio/vorbis" ||
    req.file.mimetype == "audio/ogg" ||
    req.file.mimetype == "audio/mp3"
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
        db
          .create({
            audioFile: req.file.originalname,
            audioLength: duration,
            createdAt: Date.now(),
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

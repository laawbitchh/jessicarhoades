const verify = require("../../utils/verify"),
  fs = require("fs");

module.exports = {
  method: "get",
  endpoint: "/photo/:id",
  about: "Endpoint to get a photo",
  exec: async (req, res) => {
    if (!req.body) {
      res.status(400).json({
        code: 400,
        status: "No body in req",
      });
      return;
    }

    try {
      var img = fs.readFileSync(`./${req.params.id}.jpg`);
      res.contentType("image/jpeg");
      res.send(img);
    } catch (err) {
      res.send("No image with this id");
    }
  },
};

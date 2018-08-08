const sharp = require("sharp");
const uniqid = require("uniqid");

uploadCover = async (req, res, next) => {
  if (req.files !== null && req.body.data !== undefined) {
    // resize and save img on React folder with MD5 name
    const files = req.files;
    let body = req.body.data;
    console.log("middle", body);

    body = JSON.parse(body);

    for (const file in files) {
      let imgName = `${uniqid()}.jpeg`;
      await sharp(files[file].data)
        // .resize(1920, 1080)
        .toFile(`${__dirname}/../../client/public/${imgName}`, err => {
          err ? console.log(err) : "";
        })
        .toBuffer()
        .then(() => {
          body[file] = imgName;
        });
    }
    req.body = body;
    next();
  } else {
    let body = req.body.data;
    if (body !== undefined) {
      body = JSON.parse(body);
      req.body = body;
      next();
    } else {
      next();
    }
  }
};

uploadAvatar = (req, res, next) => {};

module.exports = {
  uploadCover,
  uploadAvatar
};

const sharp = require("sharp");
const uniqid = require("uniqid");

uploadCover = async (req, res, next) => {
  if (req.files !== null && req.body !== undefined) {
    // resize and save img on React folder with MD5 name
    const files = req.files;
    let body = req.body.data;
    body = JSON.parse(body);

    for (const file in files) {
      // console.log(file)
      let imgName = `${uniqid()}.jpeg`;
      await sharp(files[file].data)
        .resize(1920, 1080)
        .toFile(`${__dirname}/../../client/public/${imgName}`, err => {
          err ? console.log(err) : "";
        })
        .toBuffer()
        .then(() => {
          body[file] = imgName;
        });        
    }
    req.body = body;
    console.log(req.body)
    next();
  } else {
    let body = req.body.data;
    body = JSON.parse(body);
    req.body = body;
    next();
  }
};

uploadAvatar = (req, res, next) => {

};

module.exports = {
  uploadCover,
  uploadAvatar
};

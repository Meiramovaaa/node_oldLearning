const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/books')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.split(".")
      ext = ext[ext.length -1]
      const uniqueSuffix = Date.now() +"." + ext
      cb(null,  uniqueSuffix)
    }
})

const upload = multer({ storage})

module.exports ={
    upload,
}
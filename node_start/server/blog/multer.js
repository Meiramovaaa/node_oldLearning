const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/blogs')
    },
    filename: function (req, file, cb) {
      let ext = file.originalname.split(".")
      ext = ext[ext.length -1]
    //   const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9 +"." + ext)
      const uniqueSuffix = Date.now() +"." + ext
    //   cb(null, file.originalname + '-' + uniqueSuffix)
      cb(null,  uniqueSuffix)
    }
})
const upload = multer({ storage})

module.exports = {
    upload
}
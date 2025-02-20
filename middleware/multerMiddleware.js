const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/images');
        console.log(uploadPath);
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname
        cb(null, fileName)
    },

})

const upload = multer({ storage })

module.exports = upload;
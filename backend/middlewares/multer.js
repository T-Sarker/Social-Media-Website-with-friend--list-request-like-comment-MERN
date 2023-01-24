const multer = require('multer')
const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        var extension = file.originalname.split(".");
        filename = Date.now() + '.' + extension[extension.length - 1];
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

module.exports = upload
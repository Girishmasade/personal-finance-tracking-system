import multer from 'multer'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const storage = multer.diskStorage({
    destination: function (_, file, cb) {
        cb(null, path.join(__dirname ,'.././uploads'))
    },
    filename: function (_, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const fileFilter = (_, file, cb) => {
    if (
        file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        cb(null, true)
    } else {
        cb(new Error('Only .xlsx files are allowed!'), false);
    }
}

const upload = multer({
    storage,
    fileFilter
})

export const uploadXlsx = upload
import { diskStorage } from 'multer';
import { extname } from 'path';

const storage = diskStorage({
  destination: '/uploads', // Render persistent disk path
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = extname(file.originalname);
    callback(null, uniqueSuffix + extension);
  },
});

const allowedMimeTypes = [
  'image/jpeg',
  'image/png',
  'image/jpg',
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
];

const fileFilter = (req, file, callback) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error('Only image and document files are allowed.'), false);
  }
};

export const multerConfig = {
  storage,
  fileFilter,
};

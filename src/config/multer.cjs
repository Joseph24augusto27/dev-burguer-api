const multer = require('multer');
const { resolve } = require('node:path');
const { randomUUID } = require('node:crypto');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_request, file, callback) => {
      const uniqueName = `${randomUUID()}-${file.originalname}`;
      return callback(null, uniqueName);
    },
  }),
};
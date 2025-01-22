// const multer = require('multer');
//  const path = require('path');
// const {CloudinaryStorage} =require('multer-storage-cloudinary')
// const cloudinary =require('../config/cloudinary')



// const storage = new CloudinaryStorage({

//   cloudinary,
//   params:{
//     folder:'books',
//     allowed_formats:['jpg', 'png', 'jpeg','gif'],
//     public_id:(req,file)=>`${Date.now()}-${file.originalname}`
//   }
 
// });

// // Defining a file filter to restrict uploaded files to specific image formats.
// const fileFilter = (req, file, cb) => {
 
//   const fileTypes = /jpeg|jpg|png|gif/;

//   // Checking the file extension and MIME type against the allowed types.
//   const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = fileTypes.test(file.mimetype);
//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
   
//     cb('Error: Images only!');
//   }
// };


// const upload = multer({
//   storage: storage,
//   fileFilter,
// });

// module.exports = upload ;

const express = require('express'); 
const bookController = require('../controllers/bookController'); 
const upload = require('../config/cloudinary'); 


const router = express.Router();


router
.get('/', bookController.getBooks)
.get('/:id', bookController.getBookById)
.post('/create-book', upload.single('image'), bookController.createBook)
.put('/:id', upload.single('image'), bookController.updateBook)
.delete('/:id', bookController.deleteBook)


module.exports = router;

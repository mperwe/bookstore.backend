const express = require('express'); 
const bookController = require('../controllers/bookController'); 
const { upload } = require('../middlewares/multer'); 


const router = express.Router();


router
.get('/', bookController.getBooks)
.post('/create-book', upload.single('image'), bookController.createBook)

// .get('/:id', getBookById)

// .put('/:id', upload.single('image'), updateBook)

// .delete('/:id', deleteBook)


module.exports = router;

const Book = require('../models/Book');
const cloudinary = require('cloudinary').v2; 


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
   return res.status(200).json({'Books':books,'Results':books.length});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id); 
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({'Book':book});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.createBook = async (req, res) => {
  try {
    const { title, author, description, price } = req.body;

    if (!title || !author || !description || !price || !image) {
      return res.status(400).json({ error: 'All fields (title, author, description, price,image) are required' });
    }

    const existingBook = await Book.findOne({ title, author });
    if (existingBook) {
      return res.status(400).json({ error: 'Book with the same title and author already exists' });
    }

    let imageUrl = req.body.image; 

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'books',  
        use_filename: true,  
      });
      imageUrl = result.secure_url;  // Save the URL of the uploaded image
    }

    
    const book = new Book({
      title,
      author,
      description,
      price,
      image: imageUrl,  // Save the image URL (from Cloudinary or passed in request)
    });

    // Save the book to the database
    await book.save();

    return res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};





exports.updateBook = async (req, res) => {
  try {
    const { title, author, description,price,image } = req.body;
    let imageUrl = req.body.image; 

    // Preparing updated data, including the image if provided in the request.
    const updatedData = {
      title,
      author,
      description,
      price,
      image: imageUrl//req.file ? req.file.path : undefined,
    };

    const book = await Book.findByIdAndUpdate(
      req.params.id, updatedData, 
      { new: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json({ message:'Book updated successfully', book });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(
      req.params.id); 

    if (!book) return res.status(404).json({ message: 'Book not found' })

    res.status(200).json({ message: 'Book deleted successfully', book })

  } catch (error) {

    res.status(500).json({ error: error.message });
  }
};

// // Function to search for books by query.
// const searchBooks = async (req, res) => {
//   const { query } = req.query; // Extracting the search query from request parameters.

//   try {
//     const books = await Book.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } },
//         { author: { $regex: query, $options: 'i' } },
//       ],
//     });
//     res.status(200).json(books); // Returning the matching books.
//   } catch (error) {
//     res.status(500).json({ error: 'Server error' });
//   }
// };

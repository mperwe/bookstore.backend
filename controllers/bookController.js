const Book = require('../models/Book');
const cloudinary = require('../config/cloudinary'); // Import Cloudinary configuration

// Create a new book
const createBook = async (req, res) => {
  try {
    const { title, author, price } = req.body;

    // Handle Cloudinary image upload
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'books', // Folder name in your Cloudinary account
        use_filename: true, // Use the original filename
      });
      imageUrl = result.secure_url; // Get the secure URL of the uploaded image
    }

    const book = new Book({ title, author, price, image: imageUrl });
    await book.save();

    res.status(201).json({ message: 'Book created successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create book' });
  }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// Update a book
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, price } = req.body;

    // If there's a new image, upload it to Cloudinary
    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'books',
        use_filename: true,
      });
      imageUrl = result.secure_url;
    }

    const updatedFields = { title, author, price };
    if (imageUrl) updatedFields.image = imageUrl; // Update the image field if a new image is uploaded

    const book = await Book.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book updated successfully', book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// Delete a book
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    // Optionally delete the image from Cloudinary
    if (book.image) {
      const publicId = book.image.split('/').pop().split('.')[0]; // Extract public ID from the URL
      await cloudinary.uploader.destroy(`books/${publicId}`); // Delete the image from Cloudinary
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
};

import axios from "axios";

const API_URL = "/api/books";

// Create a book
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, bookData, config);

  if (response.data) {
    localStorage.setItem("book", JSON.stringify(response.data));
  }

  return response.data;
};
// Get books
const getBooks = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get books
const getBooksBorrowed = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.get(API_URL + "/borrowed", config);

  return response.data;
};
// Delete book
const deleteBook = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

// Update book
const updateBook = async (id, token, updatedBook) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedBook, config);
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      console.log("Book ID:", id);
      throw new Error("Book not found");
    } else {
      throw error;
    }
  }
};

// Borrow book
const borrowBook = async (data, token, userId, borrowId, bookId, book) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}/borrow/${data.bookId}`,

      { userId, borrowId, bookId, book },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Book not found");
    } else {
      throw error;
    }
  }
};
// Return book
const returnBook = async (data, token, userId, borrowId, bookId, book) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.post(
      `${API_URL}/return/${data.bookId}`,
      { userId, borrowId, bookId, book },
      config
    );
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      throw new Error("Book not found");
    } else {
      throw error;
    }
  }
};

const bookService = {
  createBook,
  getBooks,
  getBooksBorrowed,
  deleteBook,
  updateBook,
  borrowBook,
  returnBook,
};

export default bookService;

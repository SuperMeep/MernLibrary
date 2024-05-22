import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "./bookService";

// Set initial state
const initialState = {
  books: [],
  borrows: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create Book
export const createBook = createAsyncThunk(
  "books/create",
  async (bookData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.createBook(bookData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get books
export const getBooks = createAsyncThunk(
  "books/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.getBooks(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getBooksBorrowed = createAsyncThunk(
  "borrows/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.getBooksBorrowed(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete Book
export const deleteBook = createAsyncThunk(
  "books/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.deleteBook(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Update Book
export const updateBook = createAsyncThunk(
  "books/update",
  async ({ id, updatedBook }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.updateBook(id, token, updatedBook);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Borrow Book
export const borrowBook = createAsyncThunk(
  "books/borrow",
  async ({ bookId, borrowId, userId, book }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.borrowBook(
        { bookId, borrowId, userId, book },
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// Return Book
export const returnBook = createAsyncThunk(
  "books/return",
  async ({ bookId, borrowId, userId, book }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await bookService.returnBook(
        { bookId, borrowId, userId, book },
        token
      );
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Book slice
export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // Createbook reducers
      .addCase(createBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books.push(action.payload);
        state.message = "Book created successfully!";
      })
      .addCase(createBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get books
      .addCase(getBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.books = action.payload;
      })
      .addCase(getBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get books borrowed
      .addCase(getBooksBorrowed.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBooksBorrowed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.borrows = action.payload;
      })
      .addCase(getBooksBorrowed.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Delete book
      .addCase(deleteBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Book deleted successfully!";
        state.books = state.books.filter(
          (book) => book._id !== action.payload._id
        );
      })
      .addCase(deleteBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Update book
      .addCase(updateBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Book updated successfully!";
        state.books = state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        );
      })
      .addCase(updateBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Borrow book
      .addCase(borrowBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(borrowBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Book borrowed successfully!";
        // Get the ID of the borrowed book from the action payload
        const borrowedBookId = action.payload.bookId;
        // Find the index of the borrowed book in the state.books array
        const bookIndex = state.books.findIndex(
          (book) => book._id === borrowedBookId
        );
        if (bookIndex !== -1) {
          // Reduce the stock of the borrowed book by 1
          state.books[bookIndex].stock -= 1;
        }
        // Push the borrowed book to the state.borrows array
        state.borrows.push(action.payload);
      })
      .addCase(borrowBook.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Return book
      .addCase(returnBook.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(returnBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Book returned successfully!";

        const returnedBookId = action.payload.bookId;
        // Update the stock of the returned book in the books array
        const bookIndex = state.books.findIndex(
          (book) => book._id === returnedBookId
        );
        if (bookIndex !== -1) {
          state.books[bookIndex].stock += 1;
        }

        state.borrows = state.borrows.filter(
          (borrow) => borrow._id !== action.payload._id
        );
      })
      .addCase(returnBook.rejected, (state, action) => {
        console.error(action.error.message);
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bookSlice.actions;
export default bookSlice.reducer;

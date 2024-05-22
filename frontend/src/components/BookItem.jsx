import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  updateBook,
  borrowBook,
  reset,
} from "../features/books/bookSlice";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";

import { FaEdit, FaTrashAlt, FaPlusSquare } from "react-icons/fa";

function BookItem({ book }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({ ...book });
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.books);

  const statusColorClass = book.stock > 0 ? "green" : "red";

  const genreOptions = [
    { name: "Action", id: 1 },
    { name: "Romance", id: 2 },
    { name: "Fantasy", id: 3 },
    { name: "Drama", id: 4 },
    { name: "Crime", id: 5 },
    { name: "Adventure", id: 6 },
    { name: "Thriller", id: 7 },
    { name: "Sci-fi", id: 8 },
    { name: "Music", id: 9 },
    { name: "Family", id: 10 },
  ];

  const handleGenreSelection = (selectedList) => {
    if (Array.isArray(selectedList)) {
      const selectedGenreNames = selectedList.map(
        (item) => (item && item.name) || ""
      );
      setUpdatedBook({
        ...updatedBook,
        genre: selectedGenreNames,
      });
    } else {
      // Handle the case where a single item is removed
      setUpdatedBook({
        ...updatedBook,
        genre: updatedBook.genre.filter((name) => name !== selectedList.name),
      });
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setUpdatedBook({
      ...updatedBook,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveClick = async () => {
    dispatch(updateBook({ id: book._id, updatedBook }));
    setIsEditing(false);
  };

  const handleDelete = async () => {
    dispatch(deleteBook(book._id));
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBorrowClick = () => {
    dispatch(
      borrowBook({
        bookId: book._id,
        userId: user.userId,
        borrowId: "someId",
      })
    );
  };

  if (isSuccess && message) {
    toast.success(message);
    dispatch(reset());
  }

  if (isError && message) {
    toast.error(message);
    dispatch(reset());
  }

  return (
    <div className="book-details">
      <div>
        {isEditing && book._id ? (
          <form className="create" onSubmit={handleSaveClick}>
            <div className="book-form">
              <label>Book Title:</label>
              <input
                type="text"
                className="book-input"
                id="title"
                name="title"
                value={updatedBook.title}
                placeholder="Enter book title"
                onChange={handleInputChange}
              />
            </div>

            <div className="book-form">
              <label>Author:</label>
              <input
                type="text"
                className="book-input"
                id="author"
                name="author"
                value={updatedBook.author}
                placeholder="Enter book author"
                onChange={handleInputChange}
              />
            </div>

            <div className="book-form genre">
              <label>Genre:</label>
              <Multiselect
                options={genreOptions}
                onSelect={handleGenreSelection}
                onRemove={handleGenreSelection}
                isObject={true}
                displayValue="name"
                placeholder="Select book genre"
                hidePlaceholder={true}
                style={{
                  searchBox: {
                    border: "1px solid #e6e6e6",
                    borderRadius: "5px",
                    height: "100%",
                    marginBottom: "10px",
                    position: "relative",
                    width: "675px",
                  },
                }}
              />
            </div>

            <div className="book-form">
              <label>Ratings:</label>
              <input
                type="number"
                className="book-input"
                id="ratings"
                name="ratings"
                value={updatedBook.ratings}
                placeholder="Enter book ratings"
                onChange={handleInputChange}
              />
            </div>

            <div className="book-form">
              <label>Stock:</label>
              <input
                type="number"
                className="book-input"
                id="stock"
                name="stock"
                value={updatedBook.stock}
                placeholder="Enter book stock"
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="bn632-hover bn26">
              Submit
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bn632-hover bn26">
              Cancel
            </button>
          </form>
        ) : (
          <div>
            <span className={`status-light ${statusColorClass}`}> </span>
            <h4>{book.title}</h4>
            <p>
              <strong>Author:</strong> {book.author}{" "}
            </p>
            <p>
              <strong>Genresz:</strong> {book.genre}
            </p>
            <p>
              <strong>Ratings:</strong> {book.ratings}
            </p>
            <p>
              <strong>Image:</strong>{" "}
              {book.image && (
                <img
                  src={book.image}
                  alt="Book Cover"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    marginTop: "10px",
                  }}
                />
              )}
            </p>
            {user &&
              (user.isAuthorized ||
                user.role === "librarian" ||
                user.role === "admin") && (
                <p>
                  <strong>Stock:</strong> {book.stock}
                </p>
              )}
            <p>
              {" "}
              <strong>Book added at:</strong>{" "}
              {new Date(book.createdAt).toLocaleString()}{" "}
            </p>

            {user &&
              (user.isAuthorized ||
                user.role === "librarian" ||
                user.role === "admin") && (
                <div>
                  <span className="spanUpdate" onClick={handleEditClick}>
                    <FaEdit />
                  </span>
                  <span className="spanDelete" onClick={handleDelete}>
                    <FaTrashAlt />
                  </span>
                </div>
              )}
            <span
              title="Borrow book"
              className="spanBorrow"
              onClick={handleBorrowClick}>
              <FaPlusSquare />
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookItem;

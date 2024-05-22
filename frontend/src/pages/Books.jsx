import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../features/books/bookSlice";
import BookItem from "../components/BookItem";
import BookFilter from "../components/BookFilter";

function Books() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { books } = useSelector((state) => state.books);

  const [searchTerm, setSearchTerm] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }

    dispatch(getBooks());
  }, [user, navigate, dispatch]);

  const filterBooks = useCallback(
    (searchTerm, showAvailable) => {
      const filtered = books.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (showAvailable ? book.stock > 0 : true)
      );
      setFilteredBooks(filtered);
    },
    [books] // Ensure this function doesn't change unless 'books' changes
  );

  useEffect(() => {
    if (searchTerm || showAvailableOnly) {
      filterBooks(searchTerm, showAvailableOnly);
    } else {
      setFilteredBooks(books); // Display all books initially
    }
  }, [searchTerm, showAvailableOnly, filterBooks, books]);

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    filterBooks(searchTerm, showAvailableOnly);
  };

  const handleFilter = (showAvailable) => {
    setShowAvailableOnly(showAvailable);
    filterBooks(searchTerm, showAvailable);
  };

  return (
    <>
      <section className="heading">
        <h1>Select and borrow books! </h1>
        <BookFilter onSearch={handleSearch} onFilter={handleFilter} />
        <section className="content">
          {filteredBooks.length > 0 ? (
            <div className="books">
              {filteredBooks.map((book) => (
                <BookItem key={book._id} book={book} />
              ))}
            </div>
          ) : (
            <h3>No books match your criteria</h3>
          )}
        </section>
      </section>
    </>
  );
}

export default Books;

import { useDispatch, useSelector } from "react-redux";
import { returnBook, reset } from "../features/books/bookSlice";
import { toast } from "react-toastify";
import { FaMinusSquare } from "react-icons/fa";

function BookReturnItem({ borrow }) {
  const dispatch = useDispatch();
  const { book } = borrow;
  const { user } = useSelector((state) => state.auth);
  const { isSuccess, isError, message } = useSelector((state) => state.books);

  const handleReturnClick = () => {
    const bookId = borrow.bookId;
    const borrowId = borrow._id;
    const userId = user.userId;
    dispatch(returnBook({ bookId, borrowId, userId, book }));
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
        <div>
          <h4>{book.title}</h4>
          <p>
            <strong>Author:</strong> {book.author}{" "}
          </p>
          <p>
            <strong>Genre:</strong> {book.genre}
          </p>
          <p>
            <strong>Ratings:</strong> {book.ratings}
          </p>

          <p>
            {" "}
            <strong>Book borrowed at:</strong>{" "}
            {new Date(borrow.borrowDate).toLocaleString()}{" "}
          </p>

          <span className="spanBorrow" onClick={handleReturnClick}>
            <FaMinusSquare />
          </span>
        </div>
      </div>
    </div>
  );
}

export default BookReturnItem;

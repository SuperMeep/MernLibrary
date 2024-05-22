import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBooksBorrowed, reset } from "../features/books/bookSlice";
import BookReturnItem from "../components/BookReturnItem";

function Borrows() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isLoading, borrows } = useSelector((state) => state.books);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    dispatch(getBooksBorrowed());
    return () => {
      dispatch(reset());
    };
  }, [user, navigate, dispatch]);

  if (isLoading) {
  }

  return (
    <>
      <section className="heading">
        <h1>Return borrowed books! </h1>

        <section className="content">
          {borrows.length > 0 ? (
            <div className="borrows">
              {borrows &&
                borrows.map((borrow) => (
                  <BookReturnItem key={borrow._id} borrow={borrow} />
                ))}
            </div>
          ) : (
            <h3>You have not set any borrows</h3>
          )}
        </section>
      </section>
    </>
  );
}

export default Borrows;

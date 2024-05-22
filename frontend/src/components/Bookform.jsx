import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaUser } from "react-icons/fa";
import { createBook, reset } from "../features/books/bookSlice";
import { toast } from "react-toastify";
import Multiselect from "multiselect-react-dropdown";
import Spinner from "../components/Spinner";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function BookForm() {
  const dispatch = useDispatch();
  const storage = getStorage();
  const { user } = useSelector((state) => state.auth);
  const [book, setBook] = useState({
    title: "",
    author: "",
    description: "",
    genre: [],
    ratings: "",
    stock: "",
    image: null,
  });
  const [selectedGenres, setSelectedGenres] = useState([]); // Store selected genres here
  const { title, author, genre, ratings, stock } = book;
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.books
  );

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
    // Ensure selectedList is an array
    if (Array.isArray(selectedList)) {
      const selectedGenreNames = selectedList.map(
        (item) => (item && item.name) || ""
      );
      setSelectedGenres(selectedGenreNames);
      setBook({
        ...book,
        genre: selectedGenreNames,
      });
    } else {
      // Handle the case where a single item is removed
      setSelectedGenres((selectedGenres) =>
        selectedGenres.filter((name) => name !== selectedList.name)
      );
      setBook({
        ...book,
        genre: book.genre.filter((name) => name !== selectedList.name),
      });
    }
  };

  const onChange = (e) => {
    if (e.target.name === "image") {
      setBook({ ...book, [e.target.name]: e.target.files[0] });
    } else {
      setBook({ ...book, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if an image is selected
    if (!book.image) {
      console.error("Image is not selected");
      // Handle the case where an image is not selected
      return;
    }

    const storageRef = ref(storage, "images/" + book.image.name);
    // Upload the image to Firebase Storage
    await uploadBytes(storageRef, book.image);

    // Get the download URL of the uploaded image
    const imageUrl = await getDownloadURL(storageRef);

    // Dispatch the action with the payload
    dispatch(
      createBook({
        title: book.title,
        author: book.author,
        genre: selectedGenres,
        ratings: book.ratings,
        stock: book.stock,
        image: imageUrl,
        userId: user.userId,
      })
    );

    // Reset the form fields and selected genres
    setBook({
      title: "",
      author: "",
      description: "",
      genre: [],
      ratings: "",
      stock: "",
      image: null,
    });
    setSelectedGenres([]); // Clear selected genres
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isSuccess && message) {
    toast.success(message);
    dispatch(reset());
  }

  if (isError && message) {
    toast.error(message);
    dispatch(reset());
  }

  return (
    <div>
      <section className="heading">
        <h2>
          <FaUser className="person" /> &nbsp;Create a Book!
        </h2>
        <p>Fill-up the fields below to create your book</p>
      </section>
      <section className="form">
        <form className="create" onSubmit={onSubmit}>
          <div className="book-form">
            <label>Book Title:</label>
            <input
              type="text"
              className="book-input"
              id="title"
              name="title"
              value={title}
              placeholder="Enter book title"
              onChange={onChange}
            />
          </div>

          <div className="book-form">
            <label>Author:</label>
            <input
              type="text"
              className="book-input"
              id="author"
              name="author"
              value={author}
              placeholder="Enter book author"
              onChange={onChange}
            />
          </div>

          <div className="book-form genre">
            <label>Genre:</label>
            <Multiselect
              value={genre}
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
              value={ratings}
              placeholder="Enter book ratings"
              onChange={onChange}
            />
          </div>

          <div className="book-form">
            <label>Stock:</label>
            <input
              type="number"
              className="book-input"
              id="stock"
              name="stock"
              value={stock}
              placeholder="Enter book stock"
              onChange={onChange}
            />
          </div>
          <div className="book-form">
            <label>File:</label>
            <input
              type="file"
              className="book-input"
              id="image"
              name="image"
              placeholder="Enter book image"
              onChange={onChange}
            />
          </div>

          <button type="submit" className="bn632-hover bn26">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}

export default BookForm;

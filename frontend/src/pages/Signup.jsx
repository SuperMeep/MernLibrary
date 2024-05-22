import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../features/auth/authSlice";
import { FaUser } from "react-icons/fa";
import usePasswordToggle from "../components/PasswordInput";
import Spinner from "../components/Spinner";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const { name, email, password, password2 } = formData;
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/create");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      dispatch(register(userData));
    }
  };
  const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h2>
          <FaUser className="person" /> &nbsp;Signup
        </h2>
        <p>Please create an account</p>
      </section>
      <section className="form">
        <form className="signup" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type={PasswordInputType}
              className="form-control"
              id="password"
              name="password"
              value={password}
              placeholder="Enter your password"
              onChange={onChange}
            />
            <span onClick={toggleVisibility} className="password-toggle-icon">
              {ToggleIcon}
            </span>
          </div>
          <div className="form-group">
            <input
              type={PasswordInputType}
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm your password"
              onChange={onChange}
            />
            <span onClick={toggleVisibility} className="password-toggle-icon">
              {ToggleIcon}
            </span>
          </div>

          <button type="submit" className="bn632-hover bn26">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Signup;

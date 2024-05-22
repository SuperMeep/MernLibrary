import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import { FaSignInAlt } from "react-icons/fa";
import usePasswordToggle from "../components/PasswordInput";
import Spinner from "../components/Spinner";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
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

    const userData = {
      email,
      password,
    };

    dispatch(login(userData));
  };

  const [PasswordInputType, ToggleIcon, toggleVisibility] = usePasswordToggle();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <section className="heading">
        <h2>
          <FaSignInAlt className="person" />
          &nbsp; Login
        </h2>
        <p>Login and start borrowing books online</p>
      </section>
      <section className="form">
        <form className="login" onSubmit={onSubmit}>
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

          <button type="submit" className="bn632-hover bn26">
            Submit
          </button>
        </form>
      </section>
    </>
  );
}

export default Login;

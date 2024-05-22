import { useState } from "react";
import { FaEyeSlash, FaEye } from "react-icons/fa";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);

  const Icon = visible ? <FaEyeSlash /> : <FaEye />;
  const InputType = visible ? "text" : "password";

  const toggleVisibility = () => {
    setVisibility(!visible);
  };

  return [InputType, Icon, toggleVisibility];
};

export default usePasswordToggle;

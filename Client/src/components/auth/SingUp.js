import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../store/actions/authActions";

const SignUp = () => {
  const dispatch = useDispatch();
  const registerInfo = useSelector((state) => state.auth.registerInfo);
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [selectedFile, setSelectedFile] = useState({});

  const handleChange = (e) => {
    if (e.target.files[0])
      setUser({ ...user, [e.target.name]: e.target.value });
    // setSelectedFile([...selectedFile, e.target.files[0]]);
  };
  const handleChangeFile = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (registerInfo) {
      return registerInfo;
    }
  }, [registerInfo]);

  const handelSbmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("password", user.password);
    formData.append("userName", user.userName);
    formData.append("email", user.email);
    console.log("formData", formData);
    dispatch(signUp(formData));
  };

  const handelInputs = (e) => {
    handleChangeFile(e);
    handleChange(e);
  };
  return (
    <div>
      <form onSubmit={handelSbmit}>
        <label htmlFor="userName">name</label>
        <input
          type="text"
          id="userName"
          name="userName"
          onChange={handleChange}
        />

        <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" onChange={handleChange} />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
        />
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept=".jpg, .png, .jpeg"
          onChange={handelInputs}
        />
        <button>Sign Up</button>
      </form>
      {registerInfo}
    </div>
  );
};

export default SignUp;

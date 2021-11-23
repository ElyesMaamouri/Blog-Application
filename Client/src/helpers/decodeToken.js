import jwt_decode from "jwt-decode";

const decodeTokens = () => {
  let tokenUser;
  if (localStorage.getItem("userDetails")) {
    tokenUser = jwt_decode(localStorage.getItem("userDetails"));
  } else {
    tokenUser = null;
  }
  return tokenUser;
};

export default decodeTokens;

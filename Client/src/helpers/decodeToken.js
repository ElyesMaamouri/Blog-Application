import jwt_decode from "jwt-decode";

const decodeTokens = () => {
  const tokenUser = jwt_decode(localStorage.getItem("userDetails"));
  return tokenUser;
};

export default decodeTokens;

import axios from "axios";
import {createContext, useContext, useReducer,} from "react";

if(localStorage.getItem("token")){

  const token = JSON.parse(localStorage.getItem("token"))

  const settings = {
    method: "GET",
    headers: {
      authorization: token
    }
  }

  axios("http://localhost:8080/usuario/getuser", settings)
  .then(res => {
    initialState.user = res
  })
  .catch(error => {
    console.log(error)
  })
}

const initialState = {
  user: {},
  admin: false,
  products: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_PRODUCTS":
      return null;
    case "LOG_IN":
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      return {...state, user: action.payload}
    case "LOG_OUT":
      localStorage.clear()
      return { ...state, user: {}, admin: false };
    case "ADMIN":
      return {...state, admin: action.payload}
  }
};

const userContext = createContext();

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);


  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;

export const useUserContext = () => useContext(userContext);

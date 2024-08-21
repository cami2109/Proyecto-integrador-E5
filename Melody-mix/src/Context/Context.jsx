import axios from "axios";
import {createContext, useContext, useReducer,} from "react";

const token = JSON.parse(localStorage.getItem("token"))

const settings = {
  method: "GET",
  headers: {
    authorization: token
  }
}

axios.post("http://localhost:8080/usuario/getuser", settings)
.then(res => {
  if(res.status === 200) initialState.user = res
})


const initialState = {
  user: {},
  products: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_PRODUCTS":
      return null;
    case "LOG_IN":
      localStorage.setItem('token', JSON.stringify(payload.token))
      return {...state, user: payload}
    case "LOG_OUT":
      localStorage.clear()
      return { ...state, user: {} };
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

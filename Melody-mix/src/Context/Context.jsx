import {createContext, useContext, useEffect,useReducer,} from "react";
import axios from "axios";

const initialState = {
  user: {
    id: "",
    nombre: "", 
    apellido: "",
    email: "",
  },
  products: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_PRODUCTS":
      return null;
    case "LOG_IN":
      return null
    case "LOG_OUT":
      return { ...state, user: {} };
  }
};

const userContext = createContext();

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect(() => {
  //   axios().then((res) => dispatch({ type: "GET_USER", payload: res.data }));
  // }, []);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;

export const useUserContext = () => useContext(userContext);

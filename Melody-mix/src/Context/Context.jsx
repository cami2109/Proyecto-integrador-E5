import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const initialState = {
  user: {
    // cargo el valor inicial para evitar el error de inicio:
    //<h2>{iniciales(state.user.name)}</h2>. aca seria leer localStorage??
    id: 2,
    name: "Ervin Howell",
    username: "Antonette",
    email: "Shanna@melissa.tv",
    phone: "010-692-6593 x09125",
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
  const url = "https://jsonplaceholder.typicode.com/users/1";

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    axios(url).then((res) => dispatch({ type: "GET_USER", payload: res.data }));
  }, []);

  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;

export const useUserContext = () => useContext(userContext);

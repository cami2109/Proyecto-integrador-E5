import {createContext, useContext, useEffect,useReducer,} from "react";
import axios from "axios";

const initialState = {
  user: {
    id: "",
    name: "",
    username: "", 
    email: "",
    phone: "",
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

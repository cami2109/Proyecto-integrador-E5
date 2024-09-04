import axios from "axios";
import {createContext, useContext, useEffect, useReducer,} from "react";

// if(localStorage.getItem("token")){

//   const token = JSON.parse(localStorage.getItem("token"))

//   const settings = {
//     method: "GET",
//     headers: {
//       authorization: token
//     }
//   }

//   axios("http://localhost:8080/usuario/getuser", settings)
//   .then(res => {
//     initialState.user = res
//   })
//   .catch(error => {
//     console.log(error)
//   })
// }


const initialState = {
  user: {},
  products: [],
};



// if(localStorage.getItem("token")){
//   const user = {
//     nombre: JSON.parse(localStorage.getItem("Nombre")),
//     apellido: JSON.parse(localStorage.getItem("Apellido")),
//     email: JSON.parse(localStorage.getItem("Email"))
//   }
//   initialState.user = user
// }


const reducer = (state, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, user: action.payload };
    case "GET_PRODUCTS":
      return {...state, products: action.payload}
    case "LOG_IN":
      localStorage.setItem('token', JSON.stringify(action.payload.token))
      localStorage.setItem('Nombre', JSON.stringify(action.payload.nombre))
      localStorage.setItem('Apellido', JSON.stringify(action.payload.apellido))
      localStorage.setItem('Email', JSON.stringify(action.payload.email))
      return {...state, user: action.payload}
    case "LOG_OUT":
      localStorage.clear()
      return { ...state, user: {} };
  }
};

const userContext = createContext();

const Context = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
      fetch("http://localhost:8080/instrumento/listar")
      .then((res) => res.json())
      .then((data) => dispatch({type: "GET_PRODUCTS", payload: data}))
      .catch(error => console.log(error))
  }, [])


  return (
    <userContext.Provider value={{ state, dispatch }}>
      {children}
    </userContext.Provider>
  );
};

export default Context;

export const useUserContext = () => useContext(userContext);

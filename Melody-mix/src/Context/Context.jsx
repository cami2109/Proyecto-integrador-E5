import {act, createContext, useContext, useEffect, useReducer,} from "react";





const initialState = {
  user: {},
  products: [],
};

// fetch("http://localhost:8080/instrumento/listar")
// .then((res) => res.json())
// .then((data) => {console.log(data), [...initialState.products, data]})
// .catch(error => console.log(error))



if(localStorage.getItem("token")){
  const admin = () =>{
    if(localStorage.getItem("Admin")) return true

    return false
  }
  const user = {
    nombre: JSON.parse(localStorage.getItem("Nombre")),
    apellido: JSON.parse(localStorage.getItem("Apellido")),
    email: JSON.parse(localStorage.getItem("Email")),
    isAdmin: admin
  }
  initialState.user = user
}


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
      if(action.payload.isAdmin) localStorage.setItem('Admin', JSON.stringify(action.payload.isAdmin))
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

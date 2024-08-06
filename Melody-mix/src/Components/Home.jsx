import { useState } from "react";
import Card from "./Card";
import { instrumentos } from "../Utils/listaInstrumentos"

const titleStyle = {
  backgroundColor: "#ffda92",
  color: "firebrick",
  width: "20%",
  margin: "10px auto",
  borderRadius: "10px",
};

// let instrumentos = [
//   {
//     id: 1,
//     nombre: "Piano",
//     precio: "1000",
//     imagen:
//       "https://imgs.search.brave.com/iXhvNpIGqjdWSeAi8caZTegDsDxsGe5uKVbYQTNkvkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdWRp/b211c2ljYWNsLnZ0/ZXhhc3NldHMuY29t/L2Fzc2V0cy92dGV4/LmZpbGUtbWFuYWdl/ci1ncmFwaHFsL2lt/YWdlcy9kZjc0MTZm/ZS0yNTBmLTQzNGQt/YWM1Yi04NjBjOTBl/YTQ1YzZfX182NTY4/NDE5MTM1MjQ3NDZh/M2U0NzZiOTI0ZDhl/NzJiOC5qcGc",
//   },
//   {
//     id: 2,
//     nombre: "Guitarra Acústica",
//     precio: "950",
//     imagen:
//       "https://imgs.search.brave.com/iXhvNpIGqjdWSeAi8caZTegDsDxsGe5uKVbYQTNkvkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdWRp/b211c2ljYWNsLnZ0/ZXhhc3NldHMuY29t/L2Fzc2V0cy92dGV4/LmZpbGUtbWFuYWdl/ci1ncmFwaHFsL2lt/YWdlcy9kZjc0MTZm/ZS0yNTBmLTQzNGQt/YWM1Yi04NjBjOTBl/YTQ1YzZfX182NTY4/NDE5MTM1MjQ3NDZh/M2U0NzZiOTI0ZDhl/NzJiOC5qcGc",
//   },
//   {
//     id: 3,
//     nombre: "Flauta",
//     precio: "200",
//     imagen:
//       "https://imgs.search.brave.com/iXhvNpIGqjdWSeAi8caZTegDsDxsGe5uKVbYQTNkvkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdWRp/b211c2ljYWNsLnZ0/ZXhhc3NldHMuY29t/L2Fzc2V0cy92dGV4/LmZpbGUtbWFuYWdl/ci1ncmFwaHFsL2lt/YWdlcy9kZjc0MTZm/ZS0yNTBmLTQzNGQt/YWM1Yi04NjBjOTBl/YTQ1YzZfX182NTY4/NDE5MTM1MjQ3NDZh/M2U0NzZiOTI0ZDhl/NzJiOC5qcGc",
//   },
//   {
//     id: 4,
//     nombre: "Bateria",
//     precio: "1000",
//     imagen:
//       "https://imgs.search.brave.com/iXhvNpIGqjdWSeAi8caZTegDsDxsGe5uKVbYQTNkvkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdWRp/b211c2ljYWNsLnZ0/ZXhhc3NldHMuY29t/L2Fzc2V0cy92dGV4/LmZpbGUtbWFuYWdl/ci1ncmFwaHFsL2lt/YWdlcy9kZjc0MTZm/ZS0yNTBmLTQzNGQt/YWM1Yi04NjBjOTBl/YTQ1YzZfX182NTY4/NDE5MTM1MjQ3NDZh/M2U0NzZiOTI0ZDhl/NzJiOC5qcGc",
//   },
//   {
//     id: 5,
//     nombre: "Violin",
//     precio: "900",
//     imagen:
//       "https://imgs.search.brave.com/iXhvNpIGqjdWSeAi8caZTegDsDxsGe5uKVbYQTNkvkw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hdWRp/b211c2ljYWNsLnZ0/ZXhhc3NldHMuY29t/L2Fzc2V0cy92dGV4/LmZpbGUtbWFuYWdl/ci1ncmFwaHFsL2lt/YWdlcy9kZjc0MTZm/ZS0yNTBmLTQzNGQt/YWM1Yi04NjBjOTBl/YTQ1YzZfX182NTY4/NDE5MTM1MjQ3NDZh/M2U0NzZiOTI0ZDhl/NzJiOC5qcGc",
//   },
// ];

const Home = () => {
  const [cart, setCart] = useState([]);
  console.log(cart);
  return (
    <div>
      {/* <h2>Instrumentos seleccionadas</h2>
      <ul>
        {cart.map((pedido) => (
          <li>{pedido.nombre}</li>
        ))}
      </ul> */}

      {/* <h1 style={{color: 'blue'}}>Lista de instrumentos</h1> */}
      <h1 style={titleStyle}>Lista de instrumentos</h1>
      <div className="list-container">
        {instrumentos.map((instrumento) => (
          // <Card item={instrumento} key={instrumento.id} cart={cart} setCart={setCart} />
          // paso solo el setState (setCart), y en el componente uso --prev-- para
          // solicitar el valor del state (cart)
          <Card item={instrumento} key={instrumento.id} setCart={setCart} />
        ))}
      </div>
    </div>
  );
};

export default Home;

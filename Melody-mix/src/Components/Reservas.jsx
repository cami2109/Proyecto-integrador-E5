import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../Context/Context";

const Reservas = ({ id, titulo }) => {
  const [selectedDates, setSelectedDates] = useState([]); // Manejar un array de fechas seleccionadas
  const [reservedDates, setReservedDates] = useState([]);

  const { state } = useUserContext()

  const navigate = useNavigate()

  useEffect(() => {
    // Simulación de llamada a la API para obtener las fechas ya reservadas
    const fetchReservedDates = async () => {
      try {
        // Llamada a la API para obtener las fechas reservadas
        const response = await fetch("http://localhost:8080/reserva/fechas-reservadas?instrumentoId=" + id);
        const data = await response.json();
    
        const reserved = [];
        if (data && Array.isArray(data)) {
          data.forEach((item) => {
            // Solución: obtener la fecha sin la conversión a UTC
            const localDate = new Date(item + 'T00:00:00'); // Añadir 'T00:00:00' para que se tome como local
            reserved.push(localDate);
          });
          console.log(reserved);
        }
    
        setReservedDates(reserved); // Guardamos las fechas reservadas en el estado
      } catch (error) {
        console.log("Error al obtener las fechas reservadas:", error);
      }
    };
    
  
    fetchReservedDates(); // Llamamos a la función para obtener las fechas reservadas
  }, [])
  

  const isDateReserved = (date) => {
    return reservedDates.some(
      (reservedDate) => reservedDate.toDateString() === date.toDateString()
    );
  };

  const today = new Date();

  const isDateInPast = (date) => {
    const todayWithoutTime = new Date(today.setHours(0, 0, 0, 0)); //hoy sin horas
    return date < todayWithoutTime; // Evita seleccionar fechas pasadas
  };

  const handleDateChange = (newDate) => {
    if (!isDateInPast(newDate) && !isDateReserved(newDate)) {
      // Si la fecha ya está seleccionada, la eliminamos
      if (
        selectedDates.some(
          (date) => date.toDateString() === newDate.toDateString()
        )
      ) {
        setSelectedDates(
          selectedDates.filter(
            (date) => date.toDateString() !== newDate.toDateString()
          )
        );
      } else {
        // Si no está seleccionada, la agregamos
        setSelectedDates([...selectedDates, newDate]);
      }
    }
  };

  const formatDate = (date) => {
    const day = date.getDate()
    const month = date.getMonth() + 1 // Los meses son 0 indexados
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  };

  const handleReservation = () => {
    // Aquí envías las fechas seleccionadas al backend
    // console.log("Reserva realizada para las fechas:", selectedDates);
    const showLoginAlert = () => {
      Swal.fire({
        title: 'No estás logueado',
        text: 'Debes iniciar sesión para reservar un producto.',
        icon: 'warning',
        allowOutsideClick: false,  
        allowEscapeKey: false,    
        confirmButtonText: 'Ir a login'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login")
        }
      })
    }
    
    if (Object.keys((state.user)).length === 0) {
      showLoginAlert()
      return null
    } else {
      const configs = {
        method: "POST"
      }
      const fechaInicio = selectedDates[0].toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const fechaFin = selectedDates[selectedDates.length - 1].toISOString().split('T')[0];
      fetch(`http://localhost:8080/reserva/reservar?instrumentoId=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, configs)
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Reserva registrada!",
          html: "Instrumento: <b>" + data.instrumento.nombre + "</b><br>" +
                "Desde el día: " + data.fechaInicio + "<br>" +
                "Hasta el día: " + data.fechaFin,
          icon: "success",
          allowOutsideClick: false,
          allowEscapeKey: false,
        })
        setTimeout(() => {
          navigate("/")
        }, 3000)
      })
      .catch(error => {
        Swal.fire({
          icon: "error",
          title: "Error: ",
          text: error,
        })
      })
    }
    
  };

  // const handleReservation = () => {
  //   // Aquí envías las fechas seleccionadas al backend
  //   console.log("Reserva realizada para las fechas:", selectedDates);
    
  //   // Ajustar las fechas al formato local antes de enviarlas
  //   const fechaInicio = selectedDates[0].getFullYear() + '-' +
  //                       ('0' + (selectedDates[0].getMonth() + 1)).slice(-2) + '-' +
  //                       ('0' + selectedDates[0].getDate()).slice(-2);
  //   const fechaFin = selectedDates[selectedDates.length - 1].getFullYear() + '-' +
  //                    ('0' + (selectedDates[selectedDates.length - 1].getMonth() + 1)).slice(-2) + '-' +
  //                    ('0' + selectedDates[selectedDates.length - 1].getDate()).slice(-2);
  
  //   const configs = {
  //     method: "POST"
  //   };
  //   fetch(`http://localhost:8080/reserva/reservar?instrumentoId=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, configs)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch(error => console.log(error));
  // };
  

  const handleCancel = () => {
    setSelectedDates([]); // Borrar todas las fechas seleccionadas
    console.log("cancelado", selectedDates);
  };

  return (
    <div className="card">
      <h3>{titulo}</h3>
      <Calendar
        onClickDay={handleDateChange} // Detecta el clic en una fecha
        value={selectedDates}
        tileClassName={({ date }) => {
          if (isDateInPast(date)) {
            return "past-date"; // Clase para fechas pasadas
          }
          if (isDateReserved(date)) {
            return "reserved-date"; // Clase para fechas reservadas
          }
          if (
            selectedDates.some(
              (selectedDate) =>
                selectedDate.toDateString() === date.toDateString()
            )
          ) {
            return "selected-date"; // Clase para fechas seleccionadas
          }
          return null;
        }}
      />

      {selectedDates.length > 0 && (
        <p>
          Fechas seleccionadas:{" "}
          {selectedDates.map((date) => formatDate(date)).join(", ")}
        </p>
      )}

      <div className="reserva">
        <button
          onClick={handleReservation}
          disabled={selectedDates.length === 0} // Deshabilita si no hay fechas seleccionadas
        >
          Reservar
        </button>
        <button
          onClick={handleCancel}
          disabled={selectedDates.length === 0} // Deshabilita si no hay fechas seleccionadas
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default Reservas;

import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";

const Reservas = ({ id, titulo }) => {
  const [selectedDates, setSelectedDates] = useState([]); // Manejar un array de fechas seleccionadas
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Simulación de llamada a la API para obtener las fechas ya reservadas
    // las reservas vienen por props (desde listaReservas.js)
    const fetchReservedDates = async () => {
      const fechasApi = () => { //reservas que lleguen desde backend
        fetch("http://localhost:8080/reserva/fechas-reservadas?instrumentoId=" + id)
        .then(res => res.json())
        .then(data => {return data})
        .catch(error => console.log(error)) 
      }
      fechasApi()
      const reserved = [];
      if (fechasApi !== null) {
        fechasApi.map((item) => {
          const itemDate = new Date(item);
          reserved.push(itemDate);
        });
        // console.log(reserved);
      }
      setReservedDates(reserved);
    };
    fetchReservedDates();
  }, []);

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
    const day = date.getDate();
    const month = date.getMonth() + 1; // Los meses son 0 indexados
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleReservation = () => {
    // Aquí envías las fechas seleccionadas al backend
    console.log("Reserva realizada para las fechas:", selectedDates);
    const configs = {
      method: "POST"
    }
    const fechaInicio = selectedDates[0].toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const fechaFin = selectedDates[selectedDates.length - 1].toISOString().split('T')[0];
    fetch(`http://localhost:8080/reserva/reservar?instrumentoId=${id}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`, configs)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
    })
    .catch(error => console.log(error))
    
  };

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

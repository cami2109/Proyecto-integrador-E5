import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";

const Reservas = ({id, info}) => {
  const [selectedDates, setSelectedDates] = useState([]); // Manejar un array de fechas seleccionadas
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Simulación de llamada a la API para obtener las fechas ya reservadas
    const fetchReservedDates = async () => {
      // Simulamos algunas fechas reservadas
      const reserved = [
        new Date(2024, 8, 10),
        new Date(2024, 8, 15),
        new Date(2024, 8, 20),
      ];
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
  };

  const handleCancel = () => {
    setSelectedDates([]); // Borrar todas las fechas seleccionadas
    console.log("cancelado", selectedDates);
  };

  return (
    <div className="card">
      <h3>{info}</h3>
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
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Reservas;

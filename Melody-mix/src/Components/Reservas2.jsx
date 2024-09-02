import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "../App.css";


const Reservas2 = () => {
  const [date, setDate] = useState(new Date());
  const [reservedDates, setReservedDates] = useState([]);

  useEffect(() => {
    // Simulación de llamada a la API para obtener las fechas ya reservadas
    const fetchReservedDates = async () => {
      // Aquí se haría la llamada a la API, por ahora simulamos algunas fechas
      const reserved = [
        new Date(2024, 8, 10), // Recuerda que el mes es 0 indexado (8 es Septiembre)
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
  console.log(isDateReserved(today));
  
  const isDateInPast = (date) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0); // Compara la fecha sin la hora
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleReservation = () => {
    // Aquí deberías enviar la fecha de reserva al backend
    console.log("Reserva realizada para la fecha:", date);
  };
  
  return (
    <div className="reservas">
      <h3>Selecciona una fecha para reservar</h3>
      <Calendar
        onChange={handleDateChange}
        value={date}
        // tileDisabled={({ date }) => isDateInPast(date) || isDateReserved(date)}
        // tileDisabled={({ date }) => isDateInPast(date) || isDateReserved(date)}
        tileClassName={({ date }) => {
          if (isDateInPast(date)) {
            return 'past-date'; // Clase para fechas pasadas
          }
          if (isDateReserved(date)) {
            return 'reserved-date'; // Clase para fechas reservadas
          }
          return null;
        }}
      
      />
      <button
        onClick={handleReservation}
        disabled={isDateReserved(date) || isDateInPast(date)}
      >
        Reservar
      </button>
      {isDateReserved(date) && (
        <p style={{ color: "red" }}>Esta fecha ya está reservada.</p>
      )}
      {isDateInPast(date) && (
        <p style={{ color: "red" }}>No puedes seleccionar una fecha pasada.</p>
      )}
    </div>
  );
};

export default Reservas2;

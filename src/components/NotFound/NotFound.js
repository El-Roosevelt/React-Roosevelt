import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    // vh-100 делает блок высотой во весь экран, а d-flex центрирует содержимое
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 text-center bg-white">
      
      {/* Твоя картинка с роботом */}
      <img
        src="/assets/404-robot.png"
        alt="Error 404 - Page not found"
        className="img-fluid mb-4"
        style={{ maxWidth: "500px" }} // Ограничиваем размер, чтобы не была слишком огромной
      />

      {/* Небольшой текст и кнопка возврата */}
      <h2 className="text-primary fw-bold mb-3">¡Ups! Te has perdido...</h2>
      <p className="text-secondary mb-4">
        La página que buscas no existe o ha sido movida.
      </p>
      
      {/* Кнопка ведет на главную страницу */}
      <Link to="/" className="btn btn-primary px-4 py-2 rounded-pill fw-bold">
        Volver al Inicio
      </Link>
      
    </div>
  );
}
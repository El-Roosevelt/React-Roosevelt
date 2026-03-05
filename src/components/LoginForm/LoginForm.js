import React, { useState } from "react";
import axios from 'axios';

export default function LoginForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
  });

  const [errors, setErrors] = useState({});

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Borro error
    setErrors((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!formData.nombre) newErrors.nombre = true;
    if (!formData.apellido) newErrors.apellido = true;

    if (!formData.email) newErrors.email = "required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "invalid";

    if (!formData.contrasena) newErrors.contrasena = true;

    if (!formData.confirmarContrasena) {
      newErrors.confirmarContrasena = true;
    } else if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = "no_match";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {

        const response = await axios.post(
          "http://localhost:8081/api/auth/login",
          //"http://localhost:8081/api/auth/registrar",
          formData
        );

        console.log(response.data);
        alert("Registro exitoso");

        setFormData({
          nombre: "",
          apellido: "",
          email: "",
          contrasena: "",
          confirmarContrasena: "",
        });

      } catch (error) {
        console.error("Error al registrar:", error);
        alert("Error en el registro");
      }
    }
  };


    return (
      <div className="d-flex justify-content-center align-items-center animate-fade">
        <div className="col-12 col-sm-8 col-md-9 col-lg-10">
          <h2 className="text-center mb-4 text-primary">Formulario de registro</h2>

          <form onSubmit={handleSubmitForm}>
            <div className="mb-3">
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Nombre"
                className="form-control"
              />
              {errors.nombre && (
                <small className="text-danger">Nombre es obligatorio</small>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                placeholder="Apellido"
                className="form-control"
              />
              {errors.apellido && (
                <small className="text-danger">Apellido es obligatorio</small>
              )}
            </div>

            <div className="mb-3">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="form-control"
              />
              {errors.email === "required" && (
                <small className="text-danger">Email es obligatorio</small>
              )}
              {errors.email === "invalid" && (
                <small className="text-danger">Email no es válido</small>
              )}
            </div>

            <div className="mb-3">
              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                placeholder="Contraseña"
                className="form-control"
              />
              {errors.contrasena && (
                <small className="text-danger">Contraseña es obligatoria</small>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                placeholder="Confirmar contraseña"
                className="form-control"
              />
              {errors.confirmarContrasena === true && (
                <small className="text-danger">Confirmación es obligatoria</small>
              )}
              {errors.confirmarContrasena === "no_match" && (
                <small className="text-danger">Las contraseñas no coinciden</small>
              )}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button
                type="submit"
                className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase"
              >
                Registrarme
              </button>
            </div>

            <div className="text-center mt-3">
              <button
                type="button"
                className="btn btn-link fw-semibold link-primary link-offset-4 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Recuperar contraseña
              </button>
              <button
                onClick={() => onSwitch("iniciar")}
                type="button"
                className="btn btn-link fw-semibold link-primary link-offset-4 link-underline-opacity-25 link-underline-opacity-100-hover"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
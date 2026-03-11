import React, { useState } from "react";
import axios from 'axios';

export default function RegisterForm({ onSwitch }) {
  const [formData, setFormData] = useState({
    username: "",
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmarContrasena: "",
    tel: "",
    fechaNac: "",
    foto: ""
  });
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState({ text: "", type: "" });

  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
  const phoneRegex = /^[0-9+\-\s]{6,20}$/;

  const validateField = (name, value) => {
    let error = "";

    switch (name) {

      case "username":
        if (!value) error = "El nombre de usuario es obligatorio";
        break;

      case "nombre":
        if (!value) error = "El nombre es obligatorio";
        break;

      case "email":
        if (!value) error = "El email es obligatorio";
        else if (!emailRegex.test(value)) error = "El email no es válido";
        break;

      case "contrasena":
        if (!value) error = "La contraseña es obligatoria";
        else if (value.length < 6) error = "Debe tener al menos 6 caracteres";
        break;

      case "confirmarContrasena":
        if (value !== formData.contrasena)
          error = "Las contraseñas no coinciden";
        break;

      case "tel":
        if (!value) error = "El teléfono es obligatorio";
        else if (!phoneRegex.test(value)) error = "Teléfono no válido";
        break;

      case "fechaNac":
        if (!value) error = "La fecha de nacimiento es obligatoria";
        break;

      default:
        break;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

    validateField(name, value);
    //limpiar errores
    if (statusMessage.text) {
      setStatusMessage({ text: "", type: "" });
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    let newErrors = {};

    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (errors[field]) newErrors[field] = errors[field];
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {

        const userLoad = {
          username: formData.username,
          password: formData.contrasena,
          email: formData.email,
          email_sec: formData.email,
          nombre: formData.nombre,
          apellido: formData.apellido,
          administrador: false,
          tel: formData.tel,
          fechaNac: formData.fechaNac,
          foto: formData.foto || "default.png"
        };

        const response = await axios.post(
          "http://localhost:8080/roosevelt/api/users",
          userLoad
        );

        setStatusMessage({
          text: "Usuario registrado con éxito!",
          type: "success"
        });

        setTimeout(() => onSwitch("iniciar"), 2000);

      } catch (error) {

        const errorMsg =
          error.response?.data?.error ||
          "Error al registrar. Revisa los campos.";

        setStatusMessage({
          text: errorMsg,
          type: "danger"
        });
      }
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center animate-fade">
      <div className="col-12 col-sm-8 col-md-9 col-lg-10">

        <h2 className="text-center mb-4 text-primary">
          Formulario de registro
        </h2>

        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSubmitForm}
        >

          <div className="row">

            {/* USERNAME */}
            <div className="col-md-6 mb-3">
              <label className="form-label text-primary">
                Nombre de usuario
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-control ${errors.username ? "is-invalid" : ""}`}
                placeholder="Nombre de usuario"
              />

              {errors.username && (
                <div className="invalid-feedback">
                  {errors.username}
                </div>
              )}
            </div>

            {/* NOMBRE */}
            <div className="col-md-6 mb-3">
              <label className="form-label text-primary">
                Nombre
              </label>

              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                placeholder="Nombre"
              />

              {errors.nombre && (
                <div className="invalid-feedback">
                  {errors.nombre}
                </div>
              )}
            </div>

          </div>

          {/* EMAIL */}
          <div className="mb-3">

            <label className="form-label text-primary">
              Correo electrónico
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              placeholder="Correo electrónico"
            />

            {errors.email && (
              <div className="invalid-feedback">
                {errors.email}
              </div>
            )}
          </div>

          {/* PASSWORDS */}
          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label text-primary">
                Contraseña
              </label>

              <input
                type="password"
                name="contrasena"
                value={formData.contrasena}
                onChange={handleChange}
                className={`form-control ${errors.contrasena ? "is-invalid" : ""}`}
                placeholder="Contraseña"
              />

              {errors.contrasena && (
                <div className="invalid-feedback">
                  {errors.contrasena}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label text-primary">
                Confirmar contraseña
              </label>

              <input
                type="password"
                name="confirmarContrasena"
                value={formData.confirmarContrasena}
                onChange={handleChange}
                className={`form-control ${errors.confirmarContrasena ? "is-invalid" : ""}`}
                placeholder="Confirmar contraseña"
              />

              {errors.confirmarContrasena && (
                <div className="invalid-feedback">
                  {errors.confirmarContrasena}
                </div>
              )}
            </div>

          </div>

          {/* PHONE + DATE */}
          <div className="row">

            <div className="col-md-6 mb-3">

              <label className="form-label text-primary">
                Teléfono
              </label>

              <input
                type="text"
                name="tel"
                value={formData.tel}
                onChange={handleChange}
                className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                placeholder="+34..."
              />

              {errors.tel && (
                <div className="invalid-feedback">
                  {errors.tel}
                </div>
              )}
            </div>

            <div className="col-md-6 mb-3">

              <label className="form-label text-primary">
                Fecha de nacimiento
              </label>

              <input
                type="date"
                name="fechaNac"
                value={formData.fechaNac}
                onChange={handleChange}
                className={`form-control ${errors.fechaNac ? "is-invalid" : ""}`}
              />

              {errors.fechaNac && (
                <div className="invalid-feedback">
                  {errors.fechaNac}
                </div>
              )}
            </div>

          </div>

          {/* FOTO */}
          <div className="mb-3">

            <input
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
              className="form-control"
              placeholder="URL de tu foto (opcional)"
            />
          </div>

          {/* STATUS MESSAGE */}
          {statusMessage.text && (
            <div className={`alert alert-${statusMessage.type} text-center`}>
              {statusMessage.text}
            </div>
          )}

          {/* BUTTON */}
          <div className="d-flex justify-content-center mt-4">

            <button
              type="submit"
              className="btn btn-primary rounded-pill px-5 py-3 fw-bold text-uppercase"
            >
              Registrarme
            </button>

          </div>

          {/* LOGIN LINK */}
          <div className="text-center mt-4">

            <p className="small mb-0">
              ¿Ya tienes cuenta?
            </p>

            <button
              onClick={() => onSwitch("iniciar")}
              type="button"
              className="btn btn-link fw-semibold link-primary"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
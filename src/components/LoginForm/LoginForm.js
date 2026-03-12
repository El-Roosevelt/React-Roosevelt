import React, { useState } from "react";
import axios from "axios";

export default function RegisterForm({ onSwitch }) {
  const initialForm = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    email_sec: "",
    tel: "",
    fecha_nac: "",
    foto: ""
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = () => {
    let newErrors = {};
    if (!formData.username) newErrors.username = "El nombre de usuario es obligatorio";
    if (!formData.email) {
      newErrors.email = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Correo no válido";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (formData.password.length < 4) {
      newErrors.password = "La contraseña debe tener mínimo 4 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.tel) newErrors.tel = "El teléfono es obligatorio";
    if (!formData.fecha_nac) newErrors.fecha_nac = "La fecha de nacimiento es obligatoria";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error del campo actual al escribir
    if (errors[name]) setErrors({ ...errors, [name]: "" });
    if (statusMessage) setStatusMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      
      const payload = {
        name: formData.username, // Envio username como 'name' para el backend
        username: formData.username,
        password: formData.password,
        email: formData.email,
        email_sec: formData.email_sec || formData.email,
        tel: formData.tel,
        fecha_nac: formData.fecha_nac,
        foto: formData.foto || "default.png",
        administrador: false
      };

      await axios.post("http://localhost:8080/roosevelt/api/users", payload);

      setStatusMessage("Usuario registrado correctamente");
      setFormData(initialForm);
      setErrors({});
    } catch (error) {
      console.error(error.response?.data);
      // Mostrar el error específico que devuelve el servidor
      setStatusMessage(error.response?.data?.error || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 p-4">
            <h2 className="text-center mb-4 text-primary">Formulario de registro</h2>

            <form onSubmit={handleSubmit} noValidate>
              {/* USERNAME */}
              <div className="mb-3">
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  placeholder="Nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.username}</div>
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.email}</div>
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  placeholder="Contraseña"
                  value={formData.password}
                  onChange={handleChange}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.password}</div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <input
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  placeholder="Confirmar contraseña"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                />
                <div className="invalid-feedback">{errors.confirmPassword}</div>
              </div>

              {/* PHONE + DATE */}
              <div className="row">
                <div className="col-12 col-md-6 mb-3">
                  <input
                    type="text"
                    name="tel"
                    autoComplete="tel"
                    placeholder="Teléfono"
                    value={formData.tel}
                    onChange={handleChange}
                    className={`form-control ${errors.tel ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.tel}</div>
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <input
                    type="date"
                    name="fecha_nac"
                    value={formData.fecha_nac}
                    onChange={handleChange}
                    className={`form-control ${errors.fecha_nac ? "is-invalid" : ""}`}
                  />
                  <div className="invalid-feedback">{errors.fecha_nac}</div>
                </div>
              </div>

              {/* FOTO */}
              <div className="mb-3">
                <input
                  type="text"
                  name="foto"
                  placeholder="URL de tu foto (opcional)"
                  value={formData.foto}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>

              {/* MENSAJE DE ESTADO */}
              {statusMessage && (
                <div className={`alert ${statusMessage.includes("correctamente") ? "alert-success" : "alert-danger"} text-center`}>
                  {statusMessage}
                </div>
              )}

              {/* BOTÓN */}
              <div className="d-flex justify-content-center mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary rounded-pill px-5 py-2 fw-bold text-uppercase"
                >
                  {loading ? "Enviando..." : "Registrarme"}
                </button>
              </div>

              {/* LOGIN LINK */}
              <div className="text-center mt-4">
                <p className="small mb-0">¿Ya tienes cuenta?</p>
                <button
                  onClick={() => onSwitch("iniciar")}
                  type="button"
                  className="btn btn-link fw-semibold"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
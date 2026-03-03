import React, { useState } from "react";

export default function RecuperarContrasena({ onSwitch }) {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: false });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.email) newErrors.email = "required";
    else if (!emailRegex.test(formData.email)) newErrors.email = "invalid";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("La contraseña fue enviada al email registrado");
      setFormData({ email: "" });
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center my-5">
      <div className="col-12 col-sm-10 col-md-10 col-lg-11">
        <h2 className="text-center mb-4 text-primary">Recuperar contraseña</h2>

        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="form-control rounded-3 p-3"
            />
            {errors.email === "required" && (
              <small className="text-danger">Email es obligatorio</small>
            )}
            {errors.email === "invalid" && (
              <small className="text-danger">Email no es válido</small>
            )}
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button
              type="submit"
              className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase w-100"
            >
              Enviar
            </button>
          </div>

          <div className="text-center mt-3">
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
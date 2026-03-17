        import React, { useState } from "react";
        import "./ContactForm.scss";

        export default function ContactoForm() {
            const [form, setForm] = useState({
                nombre: "",
                email: "",
                tel: "",
                titulo: "",
                mensaje: "",
            });
            const [exitoMensaje, setMensaje] = useState("");
            const [errors, setErrors] = useState({});

            const nombreRegex = /^[A-Za-zÁÉÍÓÚÑáéíóúñ]{2,40}( [A-Za-zÁÉÍÓÚÑáéíóúñ]{2,40})*$/;


            const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
            const phoneRegex = /^[0-9+\-\s]{6,20}$/;
            const messageRegex = /^.{10,500}$/;

            const validateField = (name, value) => {
                let error = "";

                switch (name) {
                    case "titulo":
                        if (!value) error = "El título es obligatorio";
                        break;

                    case "nombre":
                        if (!value) error = "El nombre es obligatorio";
                        else if (!nombreRegex.test(value)) error = "El nombre no es válido";
                        break;

                    case "email":
                        if (!value) error = "El email es obligatorio";
                        else if (!emailRegex.test(value)) error = "El email no es válido";
                        break;

                    case "tel":
                        if (!value) error = "El teléfono es obligatorio";
                        else if (!phoneRegex.test(value)) error = "El teléfono no es válido";
                        break;

                    case "mensaje":
                        if (!value) error = "El mensaje es obligatorio";
                        else if (!messageRegex.test(value))
                            error = "El mensaje debe tener al menos 10 caracteres";
                        break;

                    default:
                        break;
                }

                setErrors((prev) => ({
                    ...prev,
                    [name]: error,
                }));
                return error;
            };


            const onChange = (e) => {
                const { name, value } = e.target;

                setForm({
                    ...form,
                    [name]: value,
                });

                validateField(name, value);
            };

            // reviso form cuando hago submit
            const onSubmit = async (e) => {
                e.preventDefault();
                setMensaje("");

                let newErrors = {};

                Object.keys(form).forEach(field => {
                    validateField(field, form[field]);
                    if (errors[field]) newErrors[field] = errors[field];
                });

                setErrors(newErrors);

                if (Object.keys(newErrors).length === 0) {
                    try {
                        const dataToSend = {
            ...form,
            fecha_pub: new Date().toISOString().split('T')[0] // 2026-03-10

        };
        const API_URL = process.env.REACT_APP_API_URL;

                        const response = await fetch(`${API_URL}mensajes`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(dataToSend),
                        });

                        if (response.ok) {
                            setMensaje("Formulario enviado con éxito!");
                            setForm({ titulo: "", nombre: "", email: "", tel: "", mensaje: "" });
                        } else {
                            setMensaje("Error al enviar el formulario, inténtalo de nuevo.");
                        }
                    } catch (err) {
                        setMensaje("Error al enviar el formulario, inténtalo de nuevo.");
                        console.error(err);
                    }
                } else {
                    setMensaje("");
                }
            };
            return (
                <section className="contact-section py-5">
                    <div className="container">
                        <div className="text-center mb-5">
                            <p className="text-uppercase text-muted fw-semibold mb-2">Contacta con nosotros!</p>
                            <h2 className="fw-bold text-primary fs-2">Estamos aqui para ayudarte</h2>
                        </div>

                        <div className="  row justify-content-center">
                            <div className="col-lg-8">
                                <form className="contact-form row g-4 p-5 rounded-4 shadow-sm bg-white border border-primary-subtle needs-validation" noValidate onSubmit={onSubmit}>
                                
                                    <div className="col-md-6">
                                        <input
                                            type="text"
                                            name="nombre"
                                            className={`form-control rounded-3 p-3 ${errors.nombre ? "is-invalid" : ""}`}
                                            placeholder="Nombre"
                                            value={form.nombre}
                                            onChange={onChange}
                                        />
                                        {errors.nombre && (
                                            <div className="invalid-feedback">{errors.nombre}</div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            type="email"
                                            name="email"
                                            className={`form-control rounded-3 p-3 ${errors.email ? "is-invalid" : ""}`}
                                            placeholder="Correo electrónico"
                                            value={form.email}
                                            onChange={onChange}
                                        />
                                        {errors.email && (
                                            <div className="invalid-feedback">{errors.email}</div>
                                        )}
                                    </div>

                                    <div className="col-md-6">
                                        <input
                                            type="tel"
                                            name="tel"
                                            className={`form-control rounded-3 p-3 ${errors.tel ? "is-invalid" : ""}`}
                                            placeholder="Telefono"
                                            value={form.tel}
                                            onChange={onChange}
                                        />
                                        {errors.tel && (
                                            <div className="invalid-feedback">{errors.tel}</div>
                                        )}
                                    </div>
                                    {/* TÍTULO */}
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            name="titulo"
                                            className={`form-control rounded-3 p-3 ${errors.titulo ? "is-invalid" : ""}`}
                                            placeholder="Título"
                                            value={form.titulo}
                                            onChange={onChange}
                                        />
                                        {errors.titulo && <div className="invalid-feedback">{errors.titulo}</div>}
                                    </div>



                                    <div className="col-12">
                                        <textarea
                                            name="mensaje"
                                            className={`form-control ${errors.mensaje ? "is-invalid" : ""}`}
                                            rows="4"
                                            placeholder="Tu mensaje"
                                            value={form.mensaje}
                                            onChange={onChange}
                                        ></textarea>
                                        {errors.mensaje && (
                                            <div className="invalid-feedback d-block">
                                                {errors.mensaje}
                                            </div>
                                        )}
                                    </div>


                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary border border-secondary border-2 rounded-pill px-5 py-3 fs-6 fw-bold text-uppercase">
                                            Enviar mensaje
                                        </button>
                                    </div>

                                    {exitoMensaje && (
                                        <div className="alert alert-success mt-3" role="alert">
                                            {exitoMensaje}
                                        </div>
                                    )}

                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
        
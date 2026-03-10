import React, { useState } from "react";
import "./ContactForm.scss";

export default function ContactoForm() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        title: "",
        message: "",
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
            case "title":
                if (!value) error = "El título es obligatorio";
                break;

            case "name":
                if (!value) error = "El nombre es obligatorio";
                else if (!nombreRegex.test(value)) error = "El nombre no es válido";
                break;

            case "surname":
                if (!value) error = "El apellido es obligatorio";
                else if (!nombreRegex.test(value)) error = "El apellido no es válido";
                break;

            case "email":
                if (!value) error = "El email es obligatorio";
                else if (!emailRegex.test(value)) error = "El email no es válido";
                break;

            case "phone":
                if (!value) error = "El teléfono es obligatorio";
                else if (!phoneRegex.test(value)) error = "El teléfono no es válido";
                break;

            case "message":
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

        let newErrors = {};

        Object.keys(form).forEach(field => {
            validateField(field, form[field]);
            if (errors[field]) newErrors[field] = errors[field];
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetch("http://localhost:8080/api/mensaje", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                });

                if (response.ok) {
                    setMensaje("Formulario enviado con éxito!");
                    setForm({ title: "", name: "", email: "", phone: "", message: "" });
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
    // const onSubmit = (e) => {
    //     e.preventDefault();

    //     let newErrors = {};

    //     Object.keys(form).forEach((field) => {
    //         let value = form[field];
    //         let error = "";

    //         if (field === "name") {
    //             if (!value) error = "El nombre es obligatorio";
    //             else if (!nombreRegex.test(value)) error = "El nombre no es válido";
    //         }

    //         if (field === "surname") {
    //             if (!value) error = "El apellido es obligatorio";
    //             else if (!nombreRegex.test(value)) error = "El apellido no es válido";
    //         }

    //         if (field === "email") {
    //             if (!value) error = "El email es obligatorio";
    //             else if (!emailRegex.test(value)) error = "El email no es válido";
    //         }

    //         if (field === "phone") {
    //             if (!value) error = "El teléfono es obligatorio";
    //             else if (!phoneRegex.test(value)) error = "El teléfono no es válido";
    //         }

    //         if (field === "message") {
    //             if (!value) error = "El mensaje es obligatorio";
    //             else if (!messageRegex.test(value))
    //                 error = "El mensaje debe tener al menos 10 caracteres";
    //         }

    //         if (error) newErrors[field] = error;
    //     });

    //     setErrors(newErrors);

    //     if (Object.keys(newErrors).length === 0) {
    //         alert("Formulario enviado correctamente");

    //         setForm({
    //             name: "",
    //             surname: "",
    //             email: "",
    //             phone: "",
    //             message: "",
    //         });
    //     }
    // };

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
                                    name="name"
                                    className={`form-control rounded-3 p-3 ${errors.name ? "is-invalid" : ""}`}
                                    placeholder="Nombre"
                                    value={form.name}
                                    onChange={onChange}
                                />
                                {errors.name && (
                                    <div className="invalid-feedback">{errors.name}</div>
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
                                    name="phone"
                                    className={`form-control rounded-3 p-3 ${errors.phone ? "is-invalid" : ""}`}
                                    placeholder="Telefono"
                                    value={form.phone}
                                    onChange={onChange}
                                />
                                {errors.phone && (
                                    <div className="invalid-feedback">{errors.phone}</div>
                                )}
                            </div>
                            {/* TÍTULO */}
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="title"
                                    className={`form-control ${errors.title ? "is-invalid" : ""}`}
                                    placeholder="Título"
                                    value={form.title}
                                    onChange={onChange}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                            </div>



                            <div className="col-12">
                                <textarea
                                    name="message"
                                    className={`form-control ${errors.message ? "is-invalid" : ""}`}
                                    rows="4"
                                    placeholder="Tu mensaje"
                                    value={form.message}
                                    onChange={onChange}
                                ></textarea>
                                {errors.message && (
                                    <div className="invalid-feedback d-block">
                                        {errors.message}
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
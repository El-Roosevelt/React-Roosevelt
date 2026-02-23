import "./HeroSection";

export default function HeroSection() {
    return (

        <>
            <div className="d-flex justify-content-center mx-5 my-3 border border-2 rounded rounded-3 py-5">
                <video loop id="myVideo">
                    <source src="fondo.mp4" type="video/mp4" />
                </video>
                <div className="container  position-absolute w-75 px-5">
                    <h3 className="display-5 mb-3 text-center">Tu compañero indispensable</h3>
                    <p className="lead text-light text-center">Roosevelt es una aplicación de mapas creada para ayudar a las personas mayores o con discapacidades a desplazarse por zonas de difícil acceso en una ciudad o pueblo. ¡Os ayudaremos a orientaros rápidamente, evitar zonas peligrosas y encontrar lugares interesantes! Puedes navegarte y guardar tus rutas favoritas!</p>
                    <button className="align-self-center btn btn-primary">ir al mapa</button>
                </div>

            </div>

        </>

    )
}
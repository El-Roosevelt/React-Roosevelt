export default function Ruta({titulo, imagen, fecha, data}) {

    return (
        <div class="card">
            <button className="position-absolute top-0 end-0 rounded rounded-4">X</button>
            <img src={imagen} class="card-img-top" alt={titulo} />

            <div class="card-body">
                <h5 class="card-title">{titulo}</h5>
                <p class="card-text">{fecha}</p>
            </div>
        </div>
    )
}
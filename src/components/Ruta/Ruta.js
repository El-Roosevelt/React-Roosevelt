export default function Ruta({ id, titulo, imagen, fecha, eliminarRuta }) {
  return (
    <div className="card ruta-card shadow border-0 rounded-4 overflow-hidden h-100">
      {/* Добавлены классы: top-0 end-0 m-2 z-1 */}
      <button
        className="btn-delete position-absolute top-0 end-0 m-2 z-1 rounded-circle shadow-sm d-flex justify-content-center align-items-center border-0"
        onClick={() => eliminarRuta(id)}
        title="Eliminar ruta"
      >
        <i className="bi bi-x-lg"></i>
      </button>
      
      <img
        src={imagen}
        className="card-img-top object-fit-cover"
        alt={titulo}
        style={{ height: "180px" }}
      />
      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title fw-bold text-primary">{titulo}</h5>
        <p className="card-text text-secondary mb-0">{fecha}</p>
      </div>
    </div>
  );
}
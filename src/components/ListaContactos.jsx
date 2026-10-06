export default function ListaContactos({ contactos, cargando, error, onActualizar }) {
  let contenido;

  if (cargando) {
    contenido = (
      <>
        <div className="skeleton" />
        <div className="skeleton" />
        <div className="skeleton" />
      </>
    );
  } else if (error) {
    contenido = <div className="empty">No se pudo cargar la agenda. {error}</div>;
  } else if (contactos.length === 0) {
    contenido = (
      <div className="empty">Todavía no hay contactos. Agrega el primero arriba.</div>
    );
  } else {
    contenido = (
      <ul className="contacts">
        {contactos.map((c, i) => (
          <li key={c.id ?? i}>
            <span className="name">{[c.nombre, c.apellido].filter(Boolean).join(" ")}</span>
            <span className="phone">{c.telefono}</span>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="panel">
      <div className="list-header">
        <h2>Contactos guardados</h2>
        <div className="list-tools">
          {!cargando && !error && contactos.length > 0 && (
            <span className="count">
              {contactos.length} {contactos.length === 1 ? "contacto" : "contactos"}
            </span>
          )}
          <button className="ghost" type="button" onClick={onActualizar}>
            Actualizar
          </button>
        </div>
      </div>
      {contenido}
    </section>
  );
}

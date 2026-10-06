import { useCallback, useEffect, useState } from "react";
import FormularioContacto from "./components/FormularioContacto.jsx";
import ListaContactos from "./components/ListaContactos.jsx";
import { AGENDA_URL } from "./config.js";


// Componente padre: contiene el estado de la agenda y coordina
// el formulario (agregar) con el listado (mostrar).
export default function App() {
  const [contactos, setContactos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const cargarContactos = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const res = await fetch(AGENDA_URL, { method: "GET" });
      if (!res.ok) throw new Error("Respuesta HTTP " + res.status);
      const data = await res.json();
      setContactos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error de red.");
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargarContactos();
  }, [cargarContactos]);

  return (
    <div className="wrap">
      <header>
        <h1>Agenda de contactos</h1>
        <p className="sub">
          Consulta y agrega contactos guardados en el servicio remoto de agenda.
        </p>
      </header>

      <FormularioContacto onContactoAgregado={cargarContactos} />
      <ListaContactos
        contactos={contactos}
        cargando={cargando}
        error={error}
        onActualizar={cargarContactos}
      />
    </div>
  );
}

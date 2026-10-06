import { useState } from "react";
import { AGENDA_URL } from "../config.js";

const VACIO = { nombre: "", apellido: "", telefono: "" };

export default function FormularioContacto({ onContactoAgregado }) {
  const [campos, setCampos] = useState(VACIO);
  const [guardando, setGuardando] = useState(false);
  const [estado, setEstado] = useState({ texto: "", error: false });

  const handleChange = (e) => {
    setCampos({ ...campos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const contacto = {
      nombre: campos.nombre.trim(),
      apellido: campos.apellido.trim(),
      telefono: campos.telefono.trim(),
    };

    if (!contacto.nombre || !contacto.apellido || !contacto.telefono) {
      setEstado({ texto: "Completa los tres campos.", error: true });
      return;
    }

    setGuardando(true);
    setEstado({ texto: "Guardando...", error: false });
    try {
      const res = await fetch(AGENDA_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contacto),
      });
      if (!res.ok) throw new Error("Respuesta HTTP " + res.status);
      setCampos(VACIO);
      setEstado({ texto: "Contacto guardado.", error: false });
      onContactoAgregado();
    } catch (err) {
      setEstado({
        texto: "No se pudo guardar el contacto. " + (err.message || "Error de red."),
        error: true,
      });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <section className="panel">
      <h2>Nuevo contacto</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            autoComplete="given-name"
            value={campos.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field">
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            autoComplete="family-name"
            value={campos.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="field full">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            autoComplete="tel"
            value={campos.telefono}
            onChange={handleChange}
            required
          />
        </div>
        <div className="actions">
          <button type="submit" disabled={guardando}>
            Guardar contacto
          </button>
          <span
            className={"status" + (estado.error ? " error" : "")}
            role="status"
            aria-live="polite"
          >
            {estado.texto}
          </span>
        </div>
      </form>
    </section>
  );
}

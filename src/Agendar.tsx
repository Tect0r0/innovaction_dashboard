import React, { useState } from "react";

export default function Agendar() {
  const [espacio, setEspacio] = useState<string>("");
  const [evento, setEvento] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:5000/agendar_evento", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Evento añadido con éxito");
      } else {
            const errorData = await response.json();
            alert(`Error al añadir evento: ${errorData.error}`);
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="container">
      <div className="headLine">
        <h1>Agendar evento</h1>
      </div>
      <br />
      <div className="page">
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-container">
            <div className="form-field">
              <label htmlFor="nombre_contacto">Nombre completo:</label>
              <input
                id="nombre_contacto"
                type="text"
                name="nombre_contacto"
                placeholder="Nombre"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="info_contacto">Correo o teléfono:</label>
              <input
                id="info_contacto"
                type="text"
                name="info_contacto"
                placeholder="Correo / Teléfono"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="asociacion">Asociación:</label>
              <input
                id="asociacion"
                type="text"
                name="asociacion"
                placeholder="Asociacion o empresa"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="ubicacion">Espacio a solicitar:</label>
              <select
                id="ubicacion"
                name="ubicacion"
                required
                onChange={(e) => setEspacio(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  -Eliga un espacio-
                </option>
                <option id="fractal" value="fractal">
                  Fractal
                </option>
                <option id="esferas" value="esferas">
                  Esferas
                </option>
                <option id="makerspace" value="makerspace">
                  Maker Space
                </option>
                <option id="sparring" value="sparring">
                  Sparring
                </option>
                <option id="todo" value="todo">
                  Todo el Innovaction
                </option>
                <option id="otro" value="otro">
                  Otro
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="titulo_evento">Nombre del evento:</label>
              <input
                id="titulo_evento"
                type="text"
                name="titulo_evento"
                placeholder="Nombre del evento"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="tipo_evento">Tipo de evento:</label>
              <select
                id="tipo_evento"
                name="tipo_evento"
                required
                onChange={(e) => setEvento(e.target.value)}
              >
                <option value="" selected disabled hidden>
                  -Eliga un tipo de evento-
                </option>
                <option id="conferencia" value="conferencia">
                  Conferencia
                </option>
                <option id="taller" value="taller">
                  Taller
                </option>
                <option id="convivio" value="convivio">
                  Convivio Social
                </option>
                <option id="clase" value="clase">
                  Clase
                </option>
                <option id="otro" value="otro">
                  Otro
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="fecha_inicio">Fecha y hora de inicio:</label>
              <input
                id="fecha_inicio"
                type="datetime-local"
                name="fecha_inicio"
                min="2024-01-01T00:00"
                max="2024-12-31T23:59"
                step="1"
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="fecha_fin">Fecha y hora de fin:</label>
              <input
                id="fecha_fin"
                type="datetime-local"
                name="fecha_fin"
                min="2024-01-01T00:00"
                max="2024-12-31T23:59"
                step="1"
                required
              />
            </div>

            

            

            <div className="form-field">
              <label htmlFor="nivel_">Nivel de ruido:</label>
              <select id="nivel_ruido" name="nivel_ruido" required>
                <option value="" selected disabled hidden>
                  -Eliga un nivel de ruido-
                </option>
                <option id="bajo" value="bajo">
                  Bajo
                </option>
                <option id="medio" value="medio">
                  Medio
                </option>
                <option id="alto" value="alto">
                  Alto
                </option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="descripcion_evento">Información adicional:</label>
              <textarea
                id="descripcion_evento"
                name="descripcion_evento"
                placeholder="Breve descripción (obligatorio si elegiste 'otro')"
                rows={4}
                cols={30}
                required={espacio === "otro" || evento === "otro"}
                autoComplete="off"
              ></textarea>
              <br />
            </div>
          </div>
          <br />
          <button className="submit" type="submit">
            Enviar
          </button>
          <br />
          <br />
        </form>
      </div>
    </div>
  );
}

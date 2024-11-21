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
                placeholder="Nombre de la persona que registra el evento"
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
              <label htmlFor="tipo_colaborador">Tipo de colaborador:</label>
              <input
                id="tipo_colaborador"
                type="text"
                name="tipo_colaborador"
                placeholder="UF/SS/Grupo estudiantil"
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
              <label htmlFor="colaboracion_externa">
                Colaboración Externa:
              </label>
              <input
                id="colaboracion_externa"
                type="text"
                name="colaboracion_externa"
                placeholder="Si/No"
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
                <option id="fractal" value="Fractal">
                  Fractal
                </option>
                <option id="esferas" value="Esferas">
                  Esferas
                </option>
                <option id="makerspace" value="Maker Space">
                  Maker Space
                </option>
                <option id="sparring" value="Sparring">
                  Sparring
                </option>
                <option id="atenas" value="Atenas">
                  Atenas
                </option>
                <option id="todo" value="Todo Innovaction">
                  Todo el Innovaction
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
                <option id="conferencia" value="Conferencia">
                  Conferencia
                </option>
                <option id="taller" value="Taller">
                  Taller
                </option>
                <option id="convivio" value="Convivio">
                  Convivio Social
                </option>
                <option id="clase" value="Clase">
                  Clase
                </option>
                <option id="otro" value="Otro">
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
              <label htmlFor="impacto">Impacto:</label>
              <input
                id="impacto"
                type="text"
                name="impacto"
                placeholder="Alto/Medio/Bajo"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="tipo_innovacion">Tipo de Innovación:</label>
              <input
                id="tipo_innovacion"
                type="text"
                name="tipo_innovacion"
                placeholder="Aprender/Innovar/Crear"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="usuarios_estimados">Usuarios Estimados:</label>
              <input
                id="usuarios_estimados"
                type="number"
                name="usuarios_estimados"
                placeholder="Ingrese el número de usuarios estimados"
                required
                autoComplete="off"
              />
            </div>

            <div className="form-field">
              <label htmlFor="descripcion_evento">Información adicional:</label>
              <textarea
                id="descripcion_evento"
                name="descripcion_evento"
                placeholder="Breve descripción (obligatorio si elegiste 'otro')"
                rows={4}
                cols={30}
                required={evento === "Otro"}
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

// Reporte.js
import React, { useState, useEffect } from 'react';
import UsuariosVsAsistenciasChart from './UsuariosVsAsistenciasChart';
import EventosPorLugarChart from './EventosPorLugarChart';
import EventosPorTipoChart from './EventosPorTipoChart';
import AsistenciasPorMesChart from './AsistenciasPorMesChart';
import './Reporte.css';



function Reporte() {
    interface Evento {
        id: number;
        nombre_contacto: string;
        info_contacto: string;
        asociacion: string;
        ubicacion: string;
        titulo_evento: string;
        tipo_evento: string;
        fecha_inicio: string;
        fecha_fin: string;
        usuarios_estimados: number;
        descripcion_evento: string;
        asistencias_confirmadas: number;
        impacto: string;
        tipo_innovacion: string;
        tipo_colaborador: string;
    }
    
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [activeTab, setActiveTab] = useState('eventos');
    const [editableEvento, setEditableEvento] = useState<{ [key: number]: Partial<Evento>; }>({});

    useEffect(() => {
        fetch('http://localhost:5000/eventos')
            .then(response => response.json())
            .then(data => setEventos(data.eventos))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (id: number) => {
      const updatedEvento = editableEvento[id];
      fetch("http://localhost:5000/actualizar_evento", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, ...updatedEvento }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "success") {
            setEventos((prevEventos) =>
              prevEventos.map((evento) =>
                evento.id === id ? { ...evento, ...updatedEvento } : evento
              )
            );
            alert("Evento actualizado correctamente");
          }
        })
        .catch((error) => console.error("Error updating data:", error));
    };

    const handleDelete = (id: number) => {
      if (window.confirm("¿Estás seguro de que deseas eliminar este evento?")) {
        fetch(`http://localhost:5000/eliminar_evento/${id}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              setEventos((prevEventos) =>
                prevEventos.filter((evento) => evento.id !== id)
              );
              alert("Evento eliminado exitosamente");
            } else {
              alert("Error al eliminar el evento: " + data.error);
            }
          })
          .catch((error) => console.error("Error deleting data:", error));
      }
    };

    const handleInputChange = (id: number, field: keyof Evento, value: any) => {
      setEditableEvento((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          [field]: value,
        },
      }));
    };

    const renderEventos = () => (
      <div className="table-container">
        <table className="tablee">
          <thead>
            <tr>
              <th>Nombre Contacto</th>
              <th>Info de Contacto</th>
              <th>Tipo de colaborador</th>
              <th>Asociación</th>
              <th>Ubicación</th>
              <th>Título del Evento</th>
              <th>Descripción Evento</th>
              <th>Tipo de Evento</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Impacto</th>
              <th>Tipo de Innovación</th>
              <th>
                Usuarios
                <br />
                Estimados
              </th>
              <th>
                Asistencias
                <br />
                Confirmadas
              </th>
              <th>Actualizar<br/>Evento</th>
              <th>Eliminar<br/>Evento</th>
            </tr>
          </thead>
          <tbody>
            {eventos.map((evento) => (
              <tr key={evento.id}>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.nombre_contacto}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "nombre_contacto",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.info_contacto}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "info_contacto",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.tipo_colaborador}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "tipo_colaborador",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.asociacion}
                    onChange={(e) =>
                      handleInputChange(evento.id, "asociacion", e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.ubicacion}
                    onChange={(e) =>
                      handleInputChange(evento.id, "ubicacion", e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.titulo_evento}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "titulo_evento",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.descripcion_evento}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "descripcion_evento",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.tipo_evento}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "tipo_evento",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="inputt"
                    type="datetime-local"
                    defaultValue={new Date(evento.fecha_inicio)
                      .toISOString()
                      .slice(0, 16)}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "fecha_inicio",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="inputt"
                    type="datetime-local"
                    defaultValue={new Date(evento.fecha_fin)
                      .toISOString()
                      .slice(0, 16)}
                    onChange={(e) =>
                      handleInputChange(evento.id, "fecha_fin", e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.impacto}
                    onChange={(e) =>
                      handleInputChange(evento.id, "impacto", e.target.value)
                    }
                  />
                </td>
                <td>
                  <textarea
                    className="inputt"
                    defaultValue={evento.tipo_innovacion}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "tipo_innovacion",
                        e.target.value
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="inputt"
                    type="number"
                    defaultValue={evento.usuarios_estimados}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "usuarios_estimados",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <input
                    className="inputt"
                    type="number"
                    defaultValue={evento.asistencias_confirmadas}
                    onChange={(e) =>
                      handleInputChange(
                        evento.id,
                        "asistencias_confirmadas",
                        Number(e.target.value)
                      )
                    }
                  />
                </td>
                <td>
                  <button
                    className="edit"
                    onClick={() => handleEdit(evento.id)}
                  >
                    Actualizar
                  </button>
                </td>
                <td>
                  <button
                    className="delete"
                    onClick={() => handleDelete(evento.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );

    const renderResultados = () => (
      <div>
        {/* Aquí puedes agregar el código para renderizar las gráficas y otros datos */}
        <h2>Resultados</h2>
        {/* Ejemplo de gráficos */}
        <div className="chart-container">
          <div className="chart">
            <h3>Porcentaje de usados</h3>
                    {/* Código para el gráfico de porcentaje de usados */}
                    <AsistenciasPorMesChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Eventos por tipo de evento</h3>
            {/* Código para el gráfico de eventos por tipo de evento */}
            <EventosPorTipoChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Asistencias estimadas vs confirmadas</h3>
            {/* Código para el gráfico de asistencias estimadas vs confirmadas */}
            <UsuariosVsAsistenciasChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Eventos por Lugar</h3>
            {/* Código para el gráfico de eventos por lugar */}
            <EventosPorLugarChart eventos={eventos} />
          </div>
        </div>
      </div>
    );

    return (
        <div className='container'>
            <div className='headLine'>
                <h1 
                    style={{color: activeTab === 'eventos' ? "#00A3E0" : "", textDecoration: activeTab === 'eventos' ? "underline" : ""}}
                    onClick={() => setActiveTab('eventos')}
                > Eventos </h1>
                <h1 
                    style={{color: activeTab === 'resultados' ? "#00A3E0" : "", textDecoration: activeTab === 'resultados' ? "underline" : ""}}
                    onClick={() => setActiveTab('resultados')}
                > Resultados </h1>
            </div>
            <br />
            <div className="page">
                {activeTab === 'eventos' ? renderEventos() : renderResultados()}
            </div>
        </div>
    );
}

export default Reporte;
// Reporte.js
import  { useState, useEffect } from 'react';
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
      colaboracion_externa: string;
    }
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 10;  
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    // Eventos
    const [eventos, setEventos] = useState<Evento[]>([]);

    // Tabs
    const [activeTab, setActiveTab] = useState('eventos');
    // Tabla de eventos
    const [editableEvento, setEditableEvento] = useState<{ [key: number]: Partial<Evento>; }>({});

    // Filtros
    const [showDatePopup, setShowDatePopup] = useState(false);

    const [filters, setFilters] = useState({
      tipo_colaborador: 'todos',
      nombre_contacto: '',
      asociacion: '',
      colaboracion_externa: 'todos',
      ubicacion: [] as string[],
      titulo_evento: '',
      tipo_evento: [] as string[],
      fecha_inicio: '',
      fecha_fin: '',
      impacto: 'todos',
  });
  
  const [sortBy, setSortBy] = useState('mas_recientes');

  const handleFilterChange = (field: keyof typeof filters, value: string | string[]) => {
    setFilters((prevFilters) => ({ ...prevFilters, [field]: value }));
  };

  const handleMultiSelectChange = (field: keyof typeof filters, value: string) => {
      setFilters((prevFilters) => ({
          ...prevFilters,
          [field]: Array.isArray(prevFilters[field]) && prevFilters[field].includes(value)
              ? prevFilters[field].filter((item: string) => item !== value)
              : [...(prevFilters[field] as string[]), value],
      }));
  };

const filteredEvents = eventos
    .filter((evento) => {
        // Tipo Colaborador
        if (filters.tipo_colaborador !== 'todos' && evento.tipo_colaborador !== filters.tipo_colaborador) return false;
        // Nombre Contacto
        if (filters.nombre_contacto && !evento.nombre_contacto.toLowerCase().includes(filters.nombre_contacto.toLowerCase())) return false;
        // Asociación
        if (filters.asociacion && !evento.asociacion.toLowerCase().includes(filters.asociacion.toLowerCase())) return false;
        // Colaboración Externa
        if (filters.colaboracion_externa !== 'todos' && evento.colaboracion_externa !== filters.colaboracion_externa) return false;
        // Ubicación
        if (filters.ubicacion.length > 0 && !filters.ubicacion.includes(evento.ubicacion)) return false;
        // Título Evento
        if (filters.titulo_evento && !evento.titulo_evento.toLowerCase().includes(filters.titulo_evento.toLowerCase())) return false;
        // Tipo Evento
        if (filters.tipo_evento.length > 0 && !filters.tipo_evento.includes(evento.tipo_evento)) return false;
        // Impacto
        if (filters.impacto !== 'todos' && evento.impacto !== filters.impacto) return false;
        // Fecha Rango
        if (
          (filters.fecha_inicio && new Date(evento.fecha_inicio) < new Date(filters.fecha_inicio)) ||
          (filters.fecha_fin && new Date(evento.fecha_fin) > new Date(filters.fecha_fin))
      )
          return false;

        return true;
    })
    .sort((a, b) => {
      const dateA = new Date(a.fecha_inicio).getTime();
      const dateB = new Date(b.fecha_inicio).getTime();
      const now =  Date.now();
      if (sortBy === 'eventos_mas_cercanos') return Math.abs(dateA - now) - Math.abs(dateB - now);
      if (sortBy === 'mas_recientes') return dateB - dateA;
      if (sortBy === 'hace_mas_tiempo') return dateA - dateB;
      if (sortBy === 'mayor_usuarios_estimados') return b.usuarios_estimados - a.usuarios_estimados;
      if (sortBy === 'menor_usuarios_estimados') return a.usuarios_estimados - b.usuarios_estimados;
      if (sortBy === 'mayor_usuarios_confirmados') return b.asistencias_confirmadas - a.asistencias_confirmadas;
      if (sortBy === 'menor_usuarios_confirmados') return a.asistencias_confirmadas - b.asistencias_confirmadas;
      return 0;
  });

  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

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

    const renderPagination = () => {
      const totalPages = Math.ceil(eventos.length / eventsPerPage);
      return (
          <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => (
                  <button
                      key={i}
                      className={`page-button ${i + 1 === currentPage ? 'active' : ''}`}
                      onClick={() => setCurrentPage(i + 1)}
                  >
                      {i + 1}
                  </button>
              ))}
          </div>
      );
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
              <th>Colaboración<br/>Externa</th>
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
            {currentEvents.map((evento) => (
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
                    defaultValue={evento.colaboracion_externa}
                    onChange={(e) =>
                      handleInputChange(evento.id, "colaboracion_externa", e.target.value)
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
        {renderPagination()}

      </div>
    );

    
    const renderFilters = () => (
      <div className="filters">
        <div className='filtCont'>
          <h3 className='filtLabel'> Titulo del evento</h3>
          <input className='filterInput'
              type="text"
              value={filters.titulo_evento}
              onChange={(e) => handleFilterChange('titulo_evento', e.target.value)}
              placeholder='Nombre del evento'
          />
        </div>

        <div className='filtCont'>
        <h3 className='filtLabel'> Tipo Colaborador</h3>
          <select className="filterSelect"
              value={filters.tipo_colaborador}
              onChange={(e) => handleFilterChange('tipo_colaborador', e.target.value)}
          >
              <option value="todos">Todos</option>
              <option value="UF">UF</option>
              <option value="SS">SS</option>
              <option value="Grupo estudiantil">Grupo estudiantil</option>
          </select>
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Colaboracion Externa</h3>
          <select className="filterSelect"
                value={filters.colaboracion_externa}
                onChange={(e) => handleFilterChange('colaboracion_externa', e.target.value)}
            >
                <option value="todos">Todos</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
            </select>
        </div>


        <div className='filtCont'>
          <h3 className='filtLabel'> Ubicacion</h3>
            <div>
              <select className="filterSelect"
                  value={filters.ubicacion[0] || 'todos'}
                  onChange={(e) =>
                      handleFilterChange(
                          'ubicacion',
                          e.target.value === 'todos' ? [] : [e.target.value]
                      )
                  }
              >
                  <option value="todos">Todos</option>
                  <option value="Fractal">Fractal</option>
                  <option value="Esferas">Esferas</option>
                  <option value="Maker Space">Maker Space</option>
                  <option value="Sparring">Sparring</option>
                  <option value="Atenas">Atenas</option>
                  <option value="Todo Innovaction">Todo Innovaction</option>
              </select>
          </div>
        </div>
        
        <div className='filtCont'>
          <h3 className='filtLabel'> Impacto</h3>
          <select className="filterSelect"
              value={filters.impacto}
              onChange={(e) => handleFilterChange('impacto', e.target.value)}
          >
              <option value="todos">Todos</option>
              <option value="Alto">Alto</option>
              <option value="Medio">Medio</option>
              <option value="Bajo">Bajo</option>
          </select>
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Ordenar Por:</h3>
          <select  className="filterSelect" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="mas_recientes">Más Recientes</option>
              <option value="hace_mas_tiempo">Hace Más Tiempo</option>
              <option value="mayor_usuarios_estimados">Mayor Usuarios Estimados</option>
              <option value="menor_usuarios_estimados">Menor Usuarios Estimados</option>
              <option value="mayor_usuarios_confirmados">Mayor Usuarios Confirmados</option>
              <option value="menor_usuarios_confirmados">Menor Usuarios Confirmados</option>
          </select>
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Nombre </h3>
          <input className='filterInput'
              type="text"
              value={filters.nombre_contacto}
              onChange={(e) => handleFilterChange('nombre_contacto', e.target.value)}
              placeholder='Quien registro el evento'
          />
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Asociacion </h3>
          <input className='filterInput'
              type="text"
              value={filters.asociacion}
              onChange={(e) => handleFilterChange('asociacion', e.target.value)}
              placeholder='Asociacion del evento'
          />
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Tipo de Evento</h3>
          <select className="filterSelect"
              value={filters.tipo_evento[0] || 'todos'}
              onChange={(e) =>
                  handleMultiSelectChange(
                                        'tipo_evento',
                                        e.target.value === 'todos' ? '' : e.target.value
                                    )
              }
          >
              <option value="todos">Todos</option>
              <option value="Taller">Taller</option>
              <option value="Conferencia">Conferencia</option>
              <option value="Seminario">Seminario</option>
              <option value="Curso">Curso</option>
              <option value="Otro">Otro</option>
          </select>
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Limpiar Filtros</h3>
          <button
              className='filterButton'
              onClick={() => {
                  setFilters({
                      tipo_colaborador: 'todos',
                      nombre_contacto: '',
                      asociacion: '',
                      colaboracion_externa: 'todos',
                      ubicacion: [],
                      titulo_evento: '',
                      tipo_evento: [],
                      fecha_inicio: '',
                      fecha_fin: '',
                      impacto: 'todos',
                  });
                  setSortBy('mas_recientes');
              }}
          > 
              Limpiar Filtros
          </button>
        </div>

        <div className='filtCont'>
          <h3 className='filtLabel'> Rango de Fechas</h3>
        
                    <button className='filterButton' onClick={() => setShowDatePopup(true)}>Filtrar por Fecha</button>
          {showDatePopup && (
              <div className="date-popup">
                  <input
                      type="datetime-local"
                      onChange={(e) => handleFilterChange('fecha_inicio', e.target.value)}
                      value={filters.fecha_inicio}
                  />
                  <input
                      type="datetime-local"
                      onChange={(e) => handleFilterChange('fecha_fin', e.target.value)}
                      value={filters.fecha_fin}
                  />
                  <button onClick={() => setShowDatePopup(false)}>Aplicar</button>
              </div>
          )}
  
        </div>


      </div>
  );
  
  
    const renderResultados = () => (
      <div>
        <h2>Resultados</h2>
        <div className="chart-container">
          <div className="chart">
            <h3>Porcentaje de usados</h3>
                    <AsistenciasPorMesChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Eventos por tipo de evento</h3>
            <EventosPorTipoChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Asistencias estimadas vs confirmadas</h3>
            <UsuariosVsAsistenciasChart eventos={eventos} />
          </div>
          <div className="chart">
            <h3>Eventos por Lugar</h3>
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
    {activeTab === 'eventos' && renderFilters()}
    <div className="page">
        {activeTab === 'eventos' ? renderEventos() : renderResultados()}
    </div>
</div>
    );
}

export default Reporte;
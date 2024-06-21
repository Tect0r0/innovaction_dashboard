// Reporte.js
import React, { useState, useEffect } from 'react';
import './Reporte.css'; // Importa tus estilos CSS



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
    }
    
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [activeTab, setActiveTab] = useState('eventos');

    useEffect(() => {
        fetch('http://localhost:5000/eventos')
            .then(response => response.json())
            .then(data => setEventos(data.eventos))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleEdit = (id: number, newAsistenciasConfirmadas: number) => {
        fetch('http://localhost:5000/actualizar_asistencias', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id, asistencias_confirmadas: newAsistenciasConfirmadas }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                setEventos(prevEventos => prevEventos.map(evento => 
                    evento.id === id ? { ...evento, asistencias_confirmadas: newAsistenciasConfirmadas } : evento
                ));
            }
        })
        .catch(error => console.error('Error updating data:', error));
    };

    const renderEventos = () => (

        <div className="table-container">
            <table className='tablee'>
                <thead>
                    <tr>
                        <th>Nombre Contacto</th>
                        <th>Info de Contacto</th>
                        <th>Asociación</th>
                        <th>Ubicación</th>
                        <th>Título del Evento</th>
                        <th>Tipo de Evento</th>
                        <th>Fecha Inicio</th>
                        <th>Fecha Fin</th>
                        <th>Usuarios Estimados</th>
                        <th>Descripción Evento</th>
                        <th>Asistencias Confirmadas</th>
                        <th>Actualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {eventos.map(evento => (
                        <tr key={evento.id}>
                            <td>{evento.nombre_contacto}</td>
                            <td>{evento.info_contacto}</td>
                            <td>{evento.asociacion}</td>
                            <td>{evento.ubicacion}</td>
                            <td>{evento.titulo_evento}</td>
                            <td>{evento.tipo_evento}</td>
                            <td>{new Date(evento.fecha_inicio).toLocaleString()}</td>
                            <td>{new Date(evento.fecha_fin).toLocaleString()}</td>
                            <td>{evento.usuarios_estimados}</td>
                            <td>{evento.descripcion_evento}</td>
                            <td>
                                <input
                                 className='inputt'
                                    type="number"
                                    defaultValue={evento.asistencias_confirmadas}
                                    onBlur={(e) => handleEdit(evento.id, Number(e.target.value))}
                                />
                            </td>
                            <td><button className='edit' onClick={() => handleEdit(evento.id)}>Editar</button></td>
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
                </div>
                <div className="chart">
                    <h3>Eventos por tipo de evento</h3>
                    {/* Código para el gráfico de eventos por tipo de evento */}
                </div>
                <div className="chart">
                    <h3>Asistencias estimadas vs confirmadas</h3>
                    {/* Código para el gráfico de asistencias estimadas vs confirmadas */}
                </div>
                <div className="chart">
                    <h3>Eventos por Lugar</h3>
                    {/* Código para el gráfico de eventos por lugar */}
                </div>
            </div>
        </div>
    );

    return (
        <div className='container'>
            <div className='headLine'>
                <h1 onClick={() => setActiveTab('eventos')}>Eventos</h1>
                <h1 onClick={() => setActiveTab('resultados')}>Resultados</h1>
            </div>
            <br />
            <div className="page">
                {activeTab === 'eventos' ? renderEventos() : renderResultados()}
            </div>
        </div>
    );
}

export default Reporte;
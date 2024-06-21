import { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Event as CalendarEvent, EventProps } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Event extends CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    desc: string;
    asociacion: string;
    ubicacion: string;
}

function getColorByLocation(location: string): string {
    switch (location) {
        case 'Todo Innovaction':
            return '#444FAF'; // Azul oscuro
        case 'Makerspace':
            return '#FF5305'; // Naranja
        // Agrega más ubicaciones y colores según sea necesario
        case 'Fractal':
            return '#E12626'; // Amarillo
        case 'Esferas':
            return '#019AF0'; // Rojo
        case 'Sparring':
            return '#23A330'; // Morado
        case 'Atenas':
            return '#5D3E6B'; // Azul claro
        default:
            return '#757575'; // Gris por defecto
    }
}

const EventComponent: React.FC<EventProps<Event> & { onSelectEvent: (event: Event) => void }> = ({ event, onSelectEvent }) => (
    <span 
        onClick={() => onSelectEvent(event)}
        style={{ padding: '5px', cursor: 'pointer', /*textAlign: 'center'*/}}
    >
        <strong>{event.title}</strong>
        <p>{event.desc}</p>
        <p>{event.asociacion}</p>
    </span>
);

const EventPopup: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => (
    <div className='popUp'>
        <h2>{event.title}</h2>
        <p>Inicia el {event.start.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p>Termina el  {event.end.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
        <p>Detalles Adicionales: {event.desc}</p>
        <p>Asociacion: {event.asociacion}</p>
        <p>Ubicacion: {event.ubicacion}</p>

            
     <button className='cerrar'  onClick={onClose}><img src="src\assets\icon.png" alt="Close" onClick={onClose} style={{ cursor: 'pointer' }} /></button>
    </div>
);

function eventStyleGetter(event: Event) {
    const backgroundColor = getColorByLocation(event.ubicacion);
    return {
        style: {
            backgroundColor,
            borderRadius: '10px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            width: '100%',
            height: '100%',
           // textAlign: 'center', //genera un error pero sigue jalando xd
        }
    };
}


export default function Calendario() {
    const [events, setEvents] = useState<Event[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        fetch('http://localhost:5000/eventos')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const fetchedEvents = data.eventos.map((evento: any) => ({
                        title: evento.titulo_evento,
                        start: new Date(evento.fecha_inicio),
                        end: new Date(evento.fecha_fin),
                        desc: evento.descripcion_evento,
                        asociacion: evento.asociacion,
                        ubicacion: evento.ubicacion
                    }));
                    setEvents(fetchedEvents);
                } else {
                    console.error('Failed to fetch events:', data.error);
                }
            })
            .catch(error => console.error('An error occurred while fetching the events:', error));
    }, []);

    const handleSelectEvent = (event: Event) => {
        setSelectedEvent(event);
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSelectedEvent(null);
    };

    return (
        <div className='container'>
            <div className='headLine'>
                 <h1>Calendario </h1>
            </div>
            <br />

            <div className="page">
                <div style={{ height: 700 }}>
                <Calendar
    localizer={localizer}
    events={events}
    startAccessor="start"
    endAccessor="end"
    style={{ maxWidth: '1000px', margin: '0 auto' }}
    components={{
        event: (props) => <EventComponent {...props} onSelectEvent={handleSelectEvent} />
    }}
    eventPropGetter={eventStyleGetter} 
    onSelectEvent={event => handleSelectEvent(event)}
/>
                </div>
            </div>
            {showPopup && selectedEvent && <EventPopup event={selectedEvent} onClose={handleClosePopup} />}

        </div>
    );
}

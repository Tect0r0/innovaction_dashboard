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
}

const EventComponent: React.FC<EventProps<Event>> = ({ event }) => (
    <span>
        <strong>{event.title}</strong>
        <p>{event.desc}</p>
        <p>{event.asociacion}</p>
    </span>
);

export default function Calendario() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/eventos')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const fetchedEvents = data.eventos.map((evento: any) => ({
                        title: evento.titulo_evento,
                        start: new Date(evento.fecha_inicio),
                        end: new Date(evento.fecha_fin),
                        desc: evento.ubicacion,
                        asociacion: evento.asociacion
                    }));
                    setEvents(fetchedEvents);
                } else {
                    console.error('Failed to fetch events:', data.error);
                }
            })
            .catch(error => console.error('An error occurred while fetching the events:', error));
    }, []);

    return (
        <div className='container'>
            <div className='headLine'>
                 <h1>Calendario </h1>
            </div>
            <br />

            <div className="page">
                <div style={{ height: 500 }}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ maxWidth: '1000px', margin: '0 auto' }}
                        components={{
                            event: EventComponent
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

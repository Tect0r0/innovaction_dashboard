import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const localizer = momentLocalizer(moment);

interface Event {
    title: string;
    start: Date;
    end: Date;
}

const eventos: Event[] = [
    {
        title: 'Evento 1',
        start: new Date('2024-04-05T10:00:00'),
        end: new Date('2024-04-05T12:00:00')
    },
    {
        title: 'Evento 2',
        start: new Date('2024-04-10T14:00:00'),
        end: new Date('2024-04-10T16:00:00')
    },
    // Agrega más eventos según sea necesario
];

export default function Calendario() {
    const [events] = useState<Event[]>(eventos);

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
                />
            </div>
        </div>
    </ div>
    );
}

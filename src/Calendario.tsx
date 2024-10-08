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
            return '#444FAF'; 
        case 'Makerspace':
            return '#FF5305'; 
        case 'Fractal':
            return '#E12626'; 
        case 'Esferas':
            return '#019AF0'; 
        case 'Sparring':
            return '#23A330'; 
        case 'Atenas':
            return '#5D3E6B';
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

const EventPopup: React.FC<{ event: Event; onClose: () => void }> = ({ event, onClose }) => {
    const getFillOpacity = (id: string) => {
        return event.ubicacion === id ? 1 : 0;
    };


    return (
        
        <div className='popUp'>
            
            <h2>{event.title}</h2>
            <p>Inicia el {event.start.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <p>Termina el  {event.end.toLocaleString('es-ES', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
            <p>Detalles Adicionales: {event.desc}</p>
            <p>Asociación: {event.asociacion}</p>
            <p>Ubicación: {event.ubicacion}</p>
            <svg
                version="1.1"
                id="svg1"
                width="400"
                height="239.33331"
                viewBox="0 0 800 539.33331"
                xmlns="http://www.w3.org/2000/svg"
            >
                <defs id="defs1" />
                <path
                    style={{ display: 'inline', fill: '#444FAF', fillOpacity: getFillOpacity('Todo Innovaction'), stroke: '#000000' }}
                    d="m 239.79381,20.502816 164.02253,0.891427 c 1.0886,-9.126866 5.85713,-14.573812 12.96563,-17.6807768 h 71.21118 c 8.57496,1.8373108 12.6466,8.1779398 13.76167,17.4751348 l 236.76028,0.08772 c 1.22626,0.145568 1.68883,0.556027 1.77532,2.31511 l 0.32801,148.377359 c 0.027,1.59007 -1.22949,1.6786 -3.47718,1.86888 l -14.39781,-0.034 -218.59607,-1.39976 -0.69988,193.63365 66.48867,-0.23329 0.23329,153.50716 H 395.19928 l -2.09533,-0.0969 -0.13678,9.301 -7.93321,9.84811 -74.2712,-0.27356 -10.12168,-11.76302 -0.13677,-6.83897 -241.142058,0.68389 c -0.329076,-0.19623 -0.681068,-0.35426 -0.683897,-1.09423 l 0.13678,-150.04698 c 0.251379,-0.89395 0.494416,-1.79303 1.778132,-2.05169 H 239.77426 Z"
                    id="Todo Innovaction"
               
                >
                    <title id="title1">InnovactionGym</title>
                </path>
                <path
                    style={{ display: 'inline', fill: '#23A330', fillOpacity: getFillOpacity('Sparring'), stroke: '#000000' }}
                    d="m 239.72715,171.94185 31.30266,0.0557 c 2.28247,-0.41939 2.61589,-1.14653 3.17483,-1.83806 L 372.05026,24.126944 c 0.75577,-1.808952 0.66568,-2.86307 0.15978,-2.910366 L 239.83141,20.53187 Z"
                    id="Sparring"
           
                />
                <path
                    style={{ display: 'inline', fill: '#FF5305', fillOpacity: getFillOpacity('Makerspace'), stroke: '#000000' }}
                    d="m 512.96565,21.272601 21.13065,28.863963 c 1.41599,1.626117 0.17079,1.85828 -0.18919,2.554127 l -69.70594,48.810039 c -1.85575,1.22412 -1.96469,2.04503 -2.07988,2.9482 l -0.8649,26.75751 c 0.13412,6.73323 2.2617,12.04255 4.44607,17.31131 2.23891,4.72954 4.63201,7.8182 8.14652,11.24593 3.56329,3.94989 7.37228,5.95059 11.15133,8.39019 5.23438,2.27602 10.46877,2.94637 15.70315,3.72941 l 3.31091,0.37839 1.41996,0.22878 233.11689,1.28395 c 1.06413,-0.13761 1.63519,-0.78587 2.18,-1.63193 L 740.30387,22.660342 c -0.12853,-0.587757 -0.31059,-1.146315 -1.14886,-1.346943 z"
                    id="Makerspace"
                
                />
                <path
                    style={{ display: 'inline', fill: '#019AF0',  fillOpacity: getFillOpacity('Esferas'), stroke: '#000000' }}
                    d="m 395.63884,400.88439 c -1.41198,0.72149 -1.87796,1.218 -2.17338,2.73704 l 0.86238,115.61256 174.30199,0.0818 c 0.75306,-0.0644 1.5526,-0.0358 1.46581,-1.77991 l -0.3141,-150.6644 -1.15171,-1.36111 -63.97217,0.52351 h -1.25209 l -0.22582,31.99293 c 0.19664,1.98052 -1.2688,2.35553 -2.4695,2.70583 z"
                    id="Esferas"
                  
                />
                <path
                    style={{ display: 'inline', fill: '#E12626', fillOpacity: getFillOpacity('Fractal'), stroke: '#000000' }}
                    d="m 321.8983,154.17911 c -1.01729,0.25254 -1.99581,0.59038 -2.27315,2.47082 l 0.79066,210.41494 c 0.0853,1.09133 0.81305,1.59375 1.77899,1.87783 l 125.61644,-0.19767 2.27315,-1.58132 -0.0988,-211.79861 c -0.13806,-0.45951 0.21429,-1.05276 -1.48249,-1.08716 z"
                    id="Fractal"
                 
                />
                <path
                    style={{ display: 'inline', fill: '#5D3E6B', fillOpacity: getFillOpacity('Atenas'), stroke: '#000000' }}
                    d="m 60.45384,366.79439 -1.963997,2.35106 0.169404,149.79452 0.725263,1.36349 240.83099,-0.86659 c 3.53506,-9.10738 5.95337,-19.73758 1.54963,-39.6706 l -0.4604,-108.79871 c -0.16492,-2.28841 -2.0257,-3.03995 -3.8496,-3.82491 z"
                    id="Atenas"
                 
                />
            </svg>
            <button className='cerrar' onClick={onClose}>
                <img src="src/assets/icon.png" alt="Close" onClick={onClose} style={{ cursor: 'pointer' }} />
            </button>
        </div>
    );
};


function eventStyleGetter(event: Event) {
    const backgroundColor = getColorByLocation(event.ubicacion);
    return {
        style: {
            backgroundColor,
            borderRadius: '10px',
            opacity: 0.9,
            color: 'white',
            border: '0px',
            
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

            <br />

          

        </div>
    );
}

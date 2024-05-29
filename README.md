# Innovaction Events Dashboard
Dashboard de eventos para el Tec Innovaction Gym.

## Información
Este Dashboard fue creado con el fin de desplegar los eventos que tomarán lugar en el Innovaction Gym del Tecnológico de Monterrey. Esto se hace mediante la lectura de un excel, y su despliegue de manera de calendario.

## Autores
- Gerardo Leiva Diaz (gerardo.leiva.d@gmail.com / a01198479@tec.mx)
- Isaac Rojas Sosa (isaacrojassosa@gmail.com / a01198693@tec.mx)
- Saúl Emilio Delgado Garza (saul10emilio@gmail.com/ a01285188@tec.mx)


## Codigo MYSQL
CREATE TABLE eventos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_inicio DATETIME NOT NULL,
    fecha_fin DATETIME NOT NULL,
    ubicacion VARCHAR(255),
    grupo_estudiantil VARCHAR(255),
    nivel_ruido ENUM('Bajo', 'Medio', 'Alto') DEFAULT 'Bajo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
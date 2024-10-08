from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime
import mysql.connector

app = Flask(__name__)
CORS(app)

config = { # Configuracion de MySQL server
        'user': 'root',
        'password': '12345', #'BalooMowgli48.',          #'12345',
        'host': 'localhost',
        'port': 3306,
        'database': 'innovaction', #'innovaction',
        'raise_on_warnings': True
}

@app.route('/agendar_evento', methods=['POST'])
def agendar_evento():

    try:
        # Connect to MySQL Server
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        # Obtener datos del request
        nombre_contacto = request.json['nombre_contacto']
        info_contacto = request.json['info_contacto']
        asociacion = request.json['asociacion']
        ubicacion = request.json['ubicacion']
        titulo_evento = request.json['titulo_evento']
        tipo_evento = request.json['tipo_evento']
        fecha_inicio = request.json['fecha_inicio']
        fecha_fin = request.json['fecha_fin']
        usuarios_estimados = request.json['usuarios_estimados']
        descripcion_evento = request.json['descripcion_evento']

        # Verificar si ya hay un evento en la misma ubicación y hora
        query = """
        SELECT COUNT(*) FROM eventos 
        WHERE ubicacion = %s 
        AND (
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (%s <= fecha_inicio AND %s >= fecha_inicio)
        )
        """
        cursor.execute(query, (ubicacion, fecha_inicio, fecha_inicio, fecha_fin, fecha_fin, fecha_inicio, fecha_fin))
        count = cursor.fetchone()[0]

        # Verificar si hay conflicto en la ubicación general
        query_general = """
        SELECT COUNT(*) FROM eventos 
        WHERE ubicacion = 'Todo Innovaction' 
        AND (
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (fecha_inicio <= %s AND fecha_fin >= %s) OR
            (%s <= fecha_inicio AND %s >= fecha_inicio)
        )
        """
        cursor.execute(query_general, (fecha_inicio, fecha_inicio, fecha_fin, fecha_fin, fecha_inicio, fecha_fin))
        count_general = cursor.fetchone()[0]

        if count > 0 or count_general > 0:
            return jsonify({'status': 'failure', 'error': 'Conflicting event in the same location and time'}), 409

        # Insertar el nuevo evento si no hay conflictos
        cursor.execute("INSERT INTO eventos (nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, asistencias_confirmadas) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)", 
                        (nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, 0))
        conn.commit()

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()

    return jsonify({'status': 'success'}), 200


# Consutar eventos en base de datos
@app.route('/eventos', methods=['GET'])
def obtener_eventos():

    try:
        # Conectar a MySQL Server
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

     # Query que trae los datos de la tabla eventos
        cursor.execute("SELECT id, nombre_contacto, info_contacto, asociacion, ubicacion, titulo_evento, tipo_evento, fecha_inicio, fecha_fin, usuarios_estimados, descripcion_evento, asistencias_confirmadas FROM eventos ORDER BY fecha_inicio DESC")

        eventos = cursor.fetchall()

        # Convertir resultados a una lista
        eventos_list = [
            {
                'id': evento[0],
                'nombre_contacto': evento[1],
                'info_contacto': evento[2],
                'asociacion': evento[3],
                'ubicacion': evento[4],
                'titulo_evento': evento[5],
                'tipo_evento': evento[6],
                'fecha_inicio': evento[7].strftime('%Y-%m-%dT%H:%M:%S'),
                'fecha_fin': evento[8].strftime('%Y-%m-%dT%H:%M:%S'),
                'usuarios_estimados': evento[9],
                'descripcion_evento': evento[10],
                'asistencias_confirmadas': evento[11]
            } for evento in eventos
        ]
 
    # Exepcion en caso de error
    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()
    #Caso de exito
    return jsonify({'status': 'success', 'eventos': eventos_list}), 200

@app.route('/actualizar_asistencias', methods=['PUT'])
def actualizar_asistencias():
    try:
        conn = mysql.connector.connect(**config)
        cursor = conn.cursor()

        evento_id = request.json['id']
        asistencias_confirmadas = request.json['asistencias_confirmadas']

        cursor.execute("UPDATE eventos SET asistencias_confirmadas = %s WHERE id = %s", 
                       (asistencias_confirmadas, evento_id))
        conn.commit()

    except mysql.connector.Error as err:
        print("Something went wrong: {}".format(err))
        return jsonify({'status': 'failure', 'error': str(err)}), 500

    finally:
        conn.close()

    return jsonify({'status': 'success'}), 200

if __name__ == '__main__':
    app.run(debug=True)
<?php
header("Content-Type: application/json");

// Datos de conexión a la base de datos
$servidor = "localhost";
$usuario = "root";
$contraseña = "BalooMowgli48.";
$base_datos = "inovaction";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $contraseña, $base_datos);

// Verificar conexión
if ($conn->connect_error) {
    die(json_encode(array("status" => "error", "message" => "Conexión fallida: " . $conn->connect_error)));
}

// Capturar datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

$titulo = $data['nombre'];
$descripcion = $data['info'];
$fecha_inicio = $data['fecha'];
$fecha_fin = $data['fecha'];
$ubicacion = $data['espacio'];
$grupo_estudiantil = $data['grupo'];
$nivel_ruido = $data['ruido'];

// Insertar datos en la tabla eventos
$sql = "INSERT INTO eventos (titulo, descripcion, fecha_inicio, fecha_fin, ubicacion, grupo_estudiantil, nivel_ruido)
VALUES ('$titulo', '$descripcion', '$fecha_inicio', '$fecha_fin', '$ubicacion', '$grupo_estudiantil', '$nivel_ruido')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(array("status" => "success", "message" => "Nuevo evento añadido con éxito"));
} else {
    echo json_encode(array("status" => "error", "message" => "Error: " . $sql . "<br>" . $conn->error));
}

// Cerrar conexión
$conn->close();
?>

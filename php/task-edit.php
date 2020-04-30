<?php
    include('./DB.php');
    $id = $_POST['id'];
    $descripcion = $_POST['descripcion'];
    $nombre = $_POST['nombre'];

    $query = "UPDATE tareas SET Nombre = '$nombre', Descripcion = '$descripcion' WHERE Id = $id" ;
    $result = mysqli_query($conexion, $query);
    if(!$result){
        die('Error en la consulta');
    }
    echo "Tarea actualizada corretamente";
?>
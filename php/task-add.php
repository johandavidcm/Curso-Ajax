<?php 
    include('./DB.php');
    if(isset($_POST['nombre'])){
        $nombre      = $_POST['nombre'];
        $descripcion = $_POST['descripcion'];
        $query = "INSERT INTO tareas(Nombre,Descripcion) VALUES ('$nombre','$descripcion')";
        $result = mysqli_query($conexion, $query);
        if(!$result){
            die('La consulta ha fallado');
        }
        echo "Tarea agregada satisfactoriamente";
    }
?>
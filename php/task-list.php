<?php
    include('./DB.php');
    $query = "SELECT * FROM tareas";
    $result = mysqli_query($conexion,$query);
    if(!$result){
        die('Consulta fallida '. mysqli_error($conexion));
    }
    $json = array();
    while($row = mysqli_fetch_array($result)){
        $json[] = array(
            'nombre'     => $row['Nombre'],
            'descripcion'=> $row['Descripcion'],
            'id'         => $row['Id'] 
        );
    }
    $jsonString = json_encode($json);
    echo $jsonString;
?>
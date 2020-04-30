<?php 
    include('./DB.php');
    $search = $_POST['search'];
    if(!empty($search)){
        $query = "SELECT * FROM tareas WHERE nombre LIKE '$search%'";
        $result = mysqli_query($conexion,$query);
        if(!$result){
            die("Error de consulta ". mysqli_error($conexion));
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
    }
?>
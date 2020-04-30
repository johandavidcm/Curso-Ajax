<?php 
    include('./DB.php');
    if(isset($_POST['id'])){
        $id = $_POST['id'];
        $query = 'DELETE FROM tareas WHERE Id ='.$id;
        $result = mysqli_query($conexion,$query);
        if(!$result){
            die('Consulta fallida');
        }
        echo "Tarea eliminada satisfactoriamente";
    }
?>
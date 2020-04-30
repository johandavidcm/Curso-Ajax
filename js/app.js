$(document).ready(function(){
    let editar = false;
    obtenerTareas();
    $('#task-result').hide();
    $('#search').keyup(function(e){
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url : '../php/task-search.php',
                type: 'POST',
                data: {search},
                success: function(respuesta){
                    let tareas = JSON.parse(respuesta);
                    let template = '';
                    if(tareas.length != 0){
                        tareas.forEach(tarea => {
                            template += `<li>
                                            ${tarea.nombre}
                                        </li>`;
                        });
                        $('#container').html(template);
                        $('#task-result').show();
                    }
                    else{
                        $('#container').html('No se encontro ninguna tarea');
                        $('#task-result').show();
                    }
                }
            });
        }
        else{
            $('#container').html('');
            $('#task-result').hide();
        }
    });

    $('#task-form').submit(function(e){
        e.preventDefault();
        const datos = {
            nombre      : $('#name').val(),
            descripcion : $('#descripcion').val(),
            id          : $('#id').val()

        };
        let url = editar === false ? '../php/task-add.php' : '../php/task-edit.php';
        $.post(url, datos, function(respuesta){{
            $("#task-form").trigger('reset');
            obtenerTareas();
            if(url=="../php/task-edit.php"){
                editar = false;
            }
        }});
    });

    function obtenerTareas(){
        $.ajax({
            url     : '../php/task-list.php',
            type    : 'GET',
            success : function(respuesta){
                let tareas = JSON.parse(respuesta);
                let template = '';
                tareas.forEach(tarea => {
                    template += `<tr taskId="${tarea.id}">
                                    <td>${tarea.id}</td>
                                    <td>
                                        <a href="#" class="task-item">${tarea.nombre}</a>
                                    </td>
                                    <td>${tarea.descripcion}</td>
                                    <td>
                                        <button class=" task-delete btn btn-danger">Eliminar</button>
                                    </td>
                                </tr>`;
                });
                $('#task').html(template);
            }
        });
    }

    $(document).on('click', '.task-delete', function(){
        if(confirm('¿Esta seguro de la eliminacion de esta tarea?')){
            let elemento = $(this)[0].parentElement.parentElement;
            let id = $(elemento).attr('taskId');
            $.post('../php/task-delete.php', {id}, function(respuesta) {
                obtenerTareas();
            });
        }
    });
    $(document).on('click', '.task-item',function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('taskId');
        $.post('../php/task-single.php', {id}, function(respuesta) {
            let tarea = JSON.parse(respuesta);
            $('#name').val(tarea.nombre);
            $('#descripcion').val(tarea.descripcion);
            $('#id').val(tarea.id);
            editar = true;
            obtenerTareas();
        });
    });
});
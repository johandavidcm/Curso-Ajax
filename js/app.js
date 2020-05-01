$(document).ready(function(){
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
        $.post('../php/task-add.php', datos, function(respuesta){{
            $("#task-form").trigger('reset');
            obtenerTareas();
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
                                        <a href="#" class="task-item" data-toggle="modal" data-target="#actualizacion">${tarea.nombre}</a>
                                    </td>
                                    <td>${tarea.descripcion}</td>
                                    <td>
                                        <button class="btn btn-danger" data-toggle="modal" data-target="#confirmacion" onClick="eliminarRegistro(\'${tarea.id}\',)">Eliminar</button>
                                    </td>
                                    
                                </tr>`;
                });
                $('#task').html(template);
            }
        });
    }
    $(document).on('click', '.task-item',function(){
        let elemento = $(this)[0].parentElement.parentElement;
        let id = $(elemento).attr('taskId');
        $.post('../php/task-single.php', {id}, function(respuesta) {
            let tarea = JSON.parse(respuesta);
            $('#nombreModal').val(tarea.nombre);
            $('#descripcionModal').val(tarea.descripcion);
            $('#idModal').val(tarea.id);
        });
    });
    eliminar = false;
    eliminarRegistro = function(id){
        $("#eliminarModal").on('click', function(){
            $.post('../php/task-delete.php', { id }, function(respuesta) {
                obtenerTareas();
                $('#confirmacion').modal('hide');
            });
        });
    };
    $('#actualizarModal').on('click', function(){
        const datos = {
            nombre      : $('#nombreModal').val(),
            descripcion : $('#descripcionModal').val(),
            id          : $('#idModal').val()
        };
        $.post('../php/task-edit.php', datos, function(respuesta){{
            $("#actualizarForm").trigger('reset');
            $('#actualizacion').modal('hide');
            obtenerTareas();
        }});
    });

});
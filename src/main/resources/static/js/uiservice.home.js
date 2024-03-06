
$(document).ready(function(){
    var $=jQuery.noConflict();
    var table = $('#itemTable').DataTable({
        "searching": false,
        "paging": false,
        "info": false,
        "sAjaxSource": "/api",
        "sAjaxDataProp": "",
        "aoColumns": [
            {"mData": "content"},
            {"mData": "freezedate"},
            {"mRender": function(data, type, full) {
                return '<a class="btn btn-primary editItemModalButton" data-toggle="modal" data-id="' + full["id"] + '" data-target="#editItemModal"><i class="bi bi-search"></i>' +
                '<a class="btn btn-outline-danger deleteItemModalButton" data-toggle="modal" data-id="' + full["id"] + '"><i class="bi bi-trash"></i></a>';
            }}
        ]
    })
    $.ajax({
        url: "/api/2/image",
        method: "GET",
        success: function (data, msg) {
            var text = '<img src="data:image/png;base64,' + data + '"/>'
            $("#imgtest").html(text);
        }
    });
    $(document).on("click", ".editItemModalButton", function () {
        var id = $(this).data('id');
        $.ajax({
            url: "/api/" + id,
            method: "GET",
            success: function (data, msg) {
                $("#editItemId").val(data.id);
                $("#editItemContent").val(data.content);
                $("#editItemDrawer").val(data.drawer);
                $("#editItemDate").val(data.freezedate);
                if(data.image !== null) {
                    $("#editItemImageDisplay").attr('src', 'data:image/png;base64,' + data.image);
                } else {
                    $("#editItemImageDisplay").removeAttr('src');
                }
            }
        });
    });
    $("#editModalForm").on("submit", function(event) {
        event.preventDefault();
        $.ajax({
            url: "/api" + ($("#editItemId").val() != '' ? "/" + $("#editItemId").val() : ''),
            method: $("#editItemId").val() != '' ? "PUT" : "POST",
            dataType: 'json',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            data: JSON.stringify({
                "id": $("#editItemId").val(),
                "content": $("#editItemContent").val(),
                "drawer": $("#editItemDrawer option:selected" ).attr("value"),
                "freezedate": $("#editItemDate").val(),
                "image": $('#editItemImageDisplay').attr('src') != null ? $("#editItemImageDisplay").attr("src").substring($("#editItemImageDisplay").attr("src").lastIndexOf(",") + 1) : null

            }),
            success: function (data, msg) {
                $("#editModalForm").trigger("reset");
                $('#editItemImageDisplay').removeAttr('src');
                $('#itemTable').DataTable().ajax.reload();
                $(".close").click();
            }
        });
    });
    $('#editItemModal').on('hidden.bs.modal', function(){
        destroyEditModal();
    });
    function destroyEditModal() {
        $("#editModalForm").trigger("reset");
        $('#editItemImageDisplay').removeAttr('src');
        $('#editItemId').removeAttr("value");
    }
    $(document).on("change", "#editItemImageInput", function() {
        var input = this;
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#editItemImageDisplay').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    });
});
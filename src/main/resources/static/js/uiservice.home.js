$(document).ready(function(){
    $.noConflict();
    var table = $('#itemTable').DataTable({
        "sAjaxSource": "/api",
        "sAjaxDataProp": "",
        "aoColumns": [
            {"mData": "content"},
            {"mData": "drawer"},
            {"mData": "freezedate"},
            {"mRender": function(data, type, full) {
                return '<a class="btn btn-info btn-sm viewEditItemModalButton" data-toggle="modal" data-id="' + full["id"] + '" href="#viewEditItemModal">Show/Edit</a>' +
                '<a class="btn btn-danger btn-sm deleteItemModalButton" data-toggle="modal" data-id="' + full["id"] + '">Delete</a>';
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
    $(document).on("click", ".viewEditItemModalButton", function () {
        var id = $(this).data('id');
        $.ajax({
            url: "/api/" + id,
            method: "GET",
            success: function (data, msg) {
                $("#showEditItemId").val(data.id);
                $("#showEditItemContent").val(data.content);
                $("#showEditItemDrawer").val(data.drawer);
                $("#showEditItemDate").val(data.date);
                if(data.image !== null) {
                    $("#showEditItemImageDisplay").attr('src', 'data:image/png;base64,' + data.image);
                } else {
                    $("#showEditItemImageDisplay").removeAttr('src');
                }
            }
        });
    });
    $(document).on("change", "#showEditItemImageInput", function() {
        var input = this;
        var reader = new FileReader();

        reader.onload = function (e) {
          $('#showEditItemImageDisplay').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    });
});
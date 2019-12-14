$(function () {
    var tables = $("#tbGrid").dataTable({
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthMenu": [10, 25, 50, 100],
        "autoWidth": false,
        "pageLength": 10,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
            "url": "/device/selectAllPage",
            "cache": false,  //禁用缓存
            "data": function (d) {
                return d;
            },
            "dataFilter": function (json) {//json是服务器端返回的数据
                json = JSON.parse(json);
                var returnData = {};
                returnData.draw = json.draw;
                returnData.recordsTotal = json.recordsTotal;//返回数据全部记录
                returnData.recordsFiltered = json.recordsTotal;//后台不实现过滤功能，每次查询均视作全部结果
                returnData.data = json.data;//返回的数据列表
                return JSON.stringify(returnData);//这几个参数都是datatable需要的，必须要
            }
        },
        "dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-8'><'col-xs-2'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
            $("#mytool").append('<button id="btnDel" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-minus" data-toggle="modal" data-target="#myModal">&nbsp;删除</button>');
            $("#mytool").append('<button id="btnEdit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal">&nbsp;修改</button>');
            $("#mytool").append('<button id="btnAdd" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;添加</button>');
            $("#btnAdd").on("click", function () {
                setText("create");
            });
            $("#btnDel").on("click", function () {
                delRowData();
            });
            $("#btnEdit").on("click", function () {
                editRowData();
            });
        },
        "language": {
            "lengthMenu": "_MENU_ 条记录每页",
            "zeroRecords": "没有找到记录",
            "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条 , 第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "sFirst": "首页",
                "sLast": "末页"
            }
        },
        "columns": [
            {
                "data": "guid",
                "width": "60px",
                "orderable": false,
                "className": "text-center",
                "render": function (row) {
                    return "<input type=\"checkbox\" id=\"" + row + "\"  value=\"\"/>";
                }
            },
            {"data": "devicetypecode"},
            {"data": "devicetypename"},
            {"data": "productline"},
            {
                "data": null, "render": function (row) {
                    return "<i class='glyphicon glyphicon-picture' style='cursor:pointer'  id='" + row.devicetypeimage + "' onmousemove='showPic(this)' onmouseout='hiddenPic()'>" + row.devicetypeimage + "</i>";
                }
            },
            {
                "data": "createtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            },
            {"data": "creator"},
            {
                "data": null, "className": "text-center", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\"  style='cursor: pointer' title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>" +
                        "  &nbsp;<i class=\"glyphicon glyphicon-trash\"  style='cursor: pointer' title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            }
        ]
    });


    $("#btnSearch").click(function () {
        $("#tbGrid").dataTable().fnDraw(false);
    });

    //保存按钮
    $("#btnDeviceTypeSave").click(function () {
        var model = new Object();
        model.guid = $("#hdGuid").val();
        model.devicetypecode = $("#txtDeviceTypeCode").val();
        model.devicetypename = $("#txtDeviceTypeName").val();
        model.productline = $("#txtProductline").val();
        model.devicetypeimage = $("#DeviceTypeimage .file-caption-name").val();
        $.ajax({
            dateType: "json",
            async: false,
            type: "POST",
            contentType: 'application/json',
            url: "/device/insertDevicetype",
            data: JSON.stringify(model),
            success: function (result) {
                var result = JSON.parse(result)
                if (result.result) {
                    $("#editModal").modal('hide');
                    $("#tbGrid").dataTable().fnDraw(false);
                } else
                    modals.info(result.msg);
            },
            error: function (msg) {
                modals.info("保存失败");
                $("#editModal").modal('hide');
            }
        });
    });
});

//弹框数据操作
function setText(operate, a) {
    if (operate == "create") {
        $("#editModalLabel").text('新增');
        $('#editModal input').val('');
        $("#ddlSingle").val("1");
    } else if (operate == "edit") {
        $("#editModalLabel").text('修改');
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(a).closest('tr')).data();
        $("#txtDeviceTypeCode").val(tds.devicetypecode);
        $("#txtDeviceTypeName").val(tds.devicetypename);
        $("#txtProductline").val(tds.productline);
        $("#DeviceTypeimage .file-caption-name").val(tds.devicetypeimage);
        $("#hdGuid").val(tds.guid);
    }
    $("#editModal").modal();
}

//全选按钮
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}

//编辑行数据
function editRowData(row) {
    if (undefined == row) {
        var row = $("#tbGrid").find("tbody tr input[type='checkbox']:checked").eq(0);
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            setText("edit", row);
        }
    } else
        setText("edit", row);
}

//删除行数据
function delRowData(row) {
    var ids = [];
    if (undefined == row) {

        $("#tbGrid").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids.push($(this).attr('id'));
        });
        /*ids = ids.substring(0, ids.length - 1);*/

        if (ids.length == 0) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids.push(tds.guid);
    }
    modals.confirm("确认删除", function () {
        var guids = "'" + ids.join("','") + "'";
        $.ajax({
            dateType: "json",
            type: "GET",
            async: false,
            url: "../device/deleteByPrimaryKey/" + guids,
            success: function (result) {
                var result = JSON.parse(result)
                modals.info(result.msg);
                $("#tbGrid").dataTable().fnDraw(false);
            },
            error: function (result) {
                modals.info("删除失败");
            }
        });
    })
}

//生成guid
function getGuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

$("#txtDeviceTypeimage").fileinput({
    theme: "zh",
    uploadUrl: "/device/upload",
    enctype: 'multipart/form-data',
    allowedFileExtensions: ['jpg', 'png', 'bmp', 'jpeg'],
    browseClass: "btn btn-success",
    removeClass: "btn btn-danger",
    uploadClass: "btn btn-info",
    isAjaxUpload: true,
    minFileCount: 1,
    maxFileCount: 1,
    showPreview: false,
    uploadExtraData: function () {  //传递参数
        return {"id": "1"};
    }
});

function showPic(object) {
    var e = window.event;
    var x, y;
    x = e.screenX;
    y = e.screenY;
    document.getElementById("picpreview").style.left = x + 12 + 'px';
    document.getElementById("picpreview").style.top = y - 60 + 'px';
    document.getElementById("picpreview").innerHTML = "<img border='0'  width=\"100\" height=\"100\" src=\"http://localhost:8088/uploadfile/devicetypeimage/" + $(object).prop("id") + "\">";
    document.getElementById("picpreview").style.border = "3px gray solid";
    document.getElementById("picpreview").style.display = "";
}

function hiddenPic() {
    document.getElementById("picpreview").innerHTML = "";
    document.getElementById("picpreview").style.display = "none";
}
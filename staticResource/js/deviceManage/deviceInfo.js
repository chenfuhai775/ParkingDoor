$(function () {
    $("[data-mask]").inputmask();
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
            "url": "/device/listAll",
            "cache": false,  //禁用缓存
            "data": function (d) {
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
            {"data": "sn"},
            {"data": "typename"},
            {"data": "devicename"},
            {"data": "parentname"},
            {"data": "devicetopic"},
            {"data": "ipaddress"},
            {"data": "deviceport"},
            {
                "data": "single", "render": function (d) {
                    return d == "1" ? "<div style='color:red;'>根节点</div>" : "<div style='color:green;'>叶子节点</div>";
                }
            },
            {
                "data": null, "className": "text-center", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\"  style='cursor: pointer' title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>" +
                        "  &nbsp;<i class=\"glyphicon glyphicon-trash\"  style='cursor: pointer' title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-arrow-down\" style='cursor: pointer'  title=\"权限下载\" value=\"" + row.guid + "\" onclick=\"downLoadPermission('" + row.sn + "')\"></i>";
                }
            }
        ]
    });
    initDeviceInfo();
    initType();
    $("#btnSearch").click(function () {
        $("#tbGrid").dataTable().fnDraw(false);
    });

    //保存按钮
    $("#btndevSave").click(function () {
        var model = new Object();
        model.guid = $("#hdGuid").val();
        model.devicename = $("#txtDeviceName").val();
        model.ipaddress = $("#txtIPAddress").val();
        model.devicetopic = $("#txtdeviceTopic").val();
        model.single = $("#ddlSingle").val() == null ? "1" : "0";
        model.deviceport = $("#txtDevicePort").val();
        model.parentid = $("#ddlSingle").val() == null ? "0" : $("#ddlSingle").val();
        model.sn = $("#txtSn").val();
        model.devicetypecode = $("#ddldevType").val();
        var data = JSON.stringify(model);
        $.ajax({
            dateType: "json",
            async: false,
            type: "POST",
            url: "/device/createinfo",
            data: {"JsonData": data},
            success: function (result) {
                var result = JSON.parse(result);
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

function initDeviceInfo() {
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/selectAllTree",
        success: function (result) {
            var result = JSON.parse(result);
            $("#ddlSingle").select2({
                data: result,
                placeholder: "请选择父节点",
                allowClear: true
            });
        },
        error: function (msg) {
        }
    });
}

//设备类型下拉框初始化
function initType() {
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/devtype",
        success: function (result) {
            var result = JSON.parse(result);
            $("#ddldevType").select2({
                data: JSON.parse(result.data),
                allowClear: false
            });
        },
        error: function (msg) {
        }
    });
}

//弹框数据操作
function setText(operate, a) {
    if (operate == "create") {
        $("#editModalLabel").text('新增');
        $('#editModal input').val('');
        $("#ddlSingle").val("1").trigger("change");
        ;
    } else if (operate == "edit") {
        $("#editModalLabel").text('修改');
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(a).closest('tr')).data();
        $("#txtDeviceName").val(tds.devicename);
        $("#txtDeviceCode").val(tds.devicecode);
        $("#txtIPAddress").val(tds.ipaddress);
        $("#txtdeviceTopic").val(tds.devicetopic);
        $("#txtDevicePort").val(tds.deviceport);
        $("#txtSn").val(tds.sn);
        $("#ddlSingle").val(tds.parentid).trigger("change");
        $("#ddldevType").val(tds.devicetypecode).trigger("change");
        $("#hdGuid").val(tds.guid);
    }
    $("#editModal").modal();
}

//全选按钮
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table').find("tbody tr input[type='checkbox']").prop("checked", $(ckb).prop("checked"));
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
    var sn = null;
    var table = $('#tbGrid').DataTable();
    if (undefined == row) {
        var checked = $("#tbGrid").find("tbody tr input[type='checkbox']:checked").eq(0);
        if (checked.length == 0) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(checked).closest('tr')).data();
            sn = row.sn;
        }
    } else {
        var tds = table.row($(row).closest('tr')).data();
        sn = tds.sn;
    }
    modals.confirm('确定删除', function () {
        var JsonData = {}
        JsonData.sn = sn;
        $.ajax({
            datetype: "json",
            async: false,
            url: "../device/delinfo",
            data: {"JsonData": JSON.stringify(JsonData)},
            success: function (result) {
                var result = JSON.parse(result)
                if (result.result)
                    $("#tbGrid").dataTable().fnDraw(false);
                else
                    modals.info(result.msg);
            },
            error: function (result) {
                modals.info("删除失败");
            }
        });
    });
}

//权限下载
function downLoadPermission(devicecode) {
    if (null == devicecode || "" == devicecode) {
        modals.info("请选择设备");
        return false;
    } else {
        $.ajax({
            datetype: "json",
            async: false,
            url: "/device/downloadPermission/" + devicecode,
            success: function (result) {
                var result = JSON.parse(result);
                modals.info(result.msg);
            },
            error: function (data) {
            }
        });
    }
}

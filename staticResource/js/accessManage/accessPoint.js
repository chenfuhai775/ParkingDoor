$(function () {
    var tables = $("#accessPointList").dataTable({
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthMenu": [10, 15],
        "autoWidth": false,
        "pageLength": 10,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
            "url": "/active/selectAllAccess",
            "cache": false,  //禁用缓存
            "data": function (d) {
                var param = {};
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
        "language": {
            "lengthMenu": "_MENU_ 条记录每页",
            "zeroRecords": "没有找到记录",
            "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条 , 第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
            "infoEmpty": "无记录",
            "seach": "",
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "sFirst": "首页",
                "sLast": "末页"
            }
        },
        "dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-8'><'col-xs-2'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
            /* $("#mytool").append('<button id="dataDel" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-minus" data-toggle="modal" data-target="#myModal">&nbsp;删除</button>');
             $("#mytool").append('<button id="dataEdit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal">&nbsp;修改</button>');
             $("#mytool").append('<button id="datainit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;添加</button>');
             $("#datainit").on("click", function () {
                 showFormPanel();
             });
             $("#dataDel").on("click", function () {
                 delRowData();
             });
             $("#dataEdit").on("click", function () {
                 editRowData();
             });*/
        },
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "clientname"},
            {"data": "clientcode"},
            {"data": "devicename"},
            {"data": "sn"},
            {"data": "devicetypename"},
            {"data": "activename"},
            {"data": "creator"},
            {
                "data": "createtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            }
        ]
    });
});

function showFormPanel() {
    clearValue();
    $("#editModal").modal();
}

function editRowData(row) {
    var table = $('#accessPointList').DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setValue(tds);
    } else {
        var row = $("#accessPointList").find("tbody tr input[type='checkbox']:checked").eq(0);
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row).closest('tr')).data();
            setValue(tds);
        }
    }
    $("#editModal").modal();
}

function delRowData(row) {
    if (undefined == row) {
        var ids = "";
        $("#accessPointList").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids = ids + $(this).attr("id") + ",";
        })
        ids = ids.substring(0, ids.length - 1);

        if ("" == ids) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#accessPointList').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids = tds.guid;
    }

    var JsonData = {}
    JsonData.guid = ids;
    $.ajax({
        datetype: "json",
        async: true,
        url: "/Access/deleteAccessPoint",
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            modals.info(result.msg);
            $("#accessPointList").dataTable().fnDraw(false);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function Save() {
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.accessgroupcode = $("#accessGroupCode").val();
    JsonData.clientcode = $("#clientCode").val();
    JsonData.devicecode = $("#deviceCode").val();
    JsonData.funccode = $("#FuncCode").val();
    $.ajax({
        datetype: "json",
        async: false,
        url: "/Access/insertAccessPoint",
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            $("#editModal").modal('hide');
            modals.info(result.msg);
            $("#accessPointList").dataTable().fnDraw(false);
        },
        error: function (result) {
            console.log(result);
        }
    });
}

function setValue(rowObject) {
    $("#guid").val(rowObject.guid);
    $("#accessGroupCode").val(rowObject.accessgroupcode);
    $("#clientCode").val(rowObject.clientcode);
    $("#deviceCode").val(rowObject.devicecode);
    $("#FuncCode").val(rowObject.funccode);
}

function clearValue() {
    $("#guid").val("");
    $("#accessGroupCode").val("");
    $("#clientCode").val("");
    $("#deviceCode").val("");
    $("#FuncCode").val("");
}

function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}
$(function () {
    var table = $("#baseRoleList").dataTable({
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
            "url": "/Role/selectList",
            "cache": false,  //禁用缓存
            "data": function (data) {
                return data;
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
            $("#mytool").append('<button id="dataDel" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-minus" data-toggle="modal" data-target="#myModal">&nbsp;删除</button>');
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
            });
        },
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "rolecode"},
            {"data": "rolename"},
            {
                "data": null, "render": function (row) {
                    return dateFtt("yyyy年MM月dd日", new Date(row.creatdate));
                }
            },
            {"data": "remark"},
            {
                "data": null, "width": "120px", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'   title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-trash\" style='cursor: pointer'  title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
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
    var table = $('#baseRoleList').DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setValue(tds);
    } else {
        var row = $("#baseRoleList").find("tbody tr input[type='checkbox']:checked");
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row[0]).closest('tr')).data();
            setValue(tds);
        }
    }
    $("#editModal").modal();
}

function delRowData(row) {
    var rolecode = null;
    var table = $('#baseRoleList').DataTable();
    if (undefined == row) {
        var row = $("#baseRoleList").find("tbody tr input[type='checkbox']:checked");
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row[0]).closest('tr')).data();
            rolecode = tds.rolecode;
        }
    } else {
        var tds = table.row($(row).closest('tr')).data();
        rolecode = tds.rolecode;
    }

    modals.confirm("确认删除", function () {
        $.ajax({
            dateType: "json",
            async: false,
            contentType: 'application/json',
            url: "../Role/delRole/" + rolecode,
            success: function (result) {
                var result = JSON.parse(result)
                if (result.result)
                    $("#baseRoleList").dataTable().fnDraw(false);
                else
                    modals.info(result.msg);
            },
            error: function (result) {
            }
        });
    })
}

function Save() {
    var check = "";
    if ($("#checkcode").val() != $("#rolecode").val()) {
        $.ajax({
            dataType: "json",
            async: false,
            type:"POST",
            contentType: 'application/json',
            url: "/Role/checkCode/" + $("#rolecode").val(),
            success: function (data) {
                if (data > 0) {
                    check = "false";
                }
            }, error: function () {
                modals.info("验证过程出现错误");
                return false;
            }
        });
    }
    if (check == "false") {
        modals.info("角色编码编码已存在，请换一个!");
        return false;
    }
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.rolename = $("#rolename").val();
    JsonData.rolecode = $("#rolecode").val();
    JsonData.remark = $("#remark").val();
    $.ajax({
        dataType: "json",
        async: false,
        type:"POST",
        contentType : 'application/json',
        url: "../Role/addBaseRole",
        data:  JSON.stringify(JsonData),
        success: function (result) {
            if (result.result) {
                $("#editModal").modal('hide');
                $("#baseRoleList").dataTable().fnDraw(false);
            } else
                modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}


function setValue(rowObject) {
    $("#checkcode").val(rowObject.rolecode);
    $("#guid").val(rowObject.guid);
    $("#rolecode").val(rowObject.rolecode);
    $("#rolename").val(rowObject.rolename);
    $("#remark").val(rowObject.remark);
}

function clearValue() {
    $("#checkcode").val("");
    $("#guid").val("");
    $("#rolecode").val("");
    $("#rolename").val("");
    $("#remark").val("");
}

function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}

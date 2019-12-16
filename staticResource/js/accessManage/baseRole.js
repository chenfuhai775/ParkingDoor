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
        "dom": "<'row'<'col-xs-2'l><'#mytool.col-xs-7'><'col-xs-2'f>r>" +
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

    $("#baseRoleList").delegate("tbody tr[role='row']", "click", function (row) {
        var table = $('#baseRoleList').DataTable();
        var tr = $(this).closest("tr");
        $("#baseRoleList").find("tbody tr[role='row']").closest("tr").css("color", "#000000");
        $("#baseRoleList").find("tbody tr[role='row']").closest("tr").css("background-color", "#FFFFFF");
        tr.css("color", "#FFFFFF");
        tr.css("background-color", "#428bca");
        if (undefined != row) {
            var tds = table.row($(this).closest('tr')).data();
        }
        var rolecode = tds.rolecode;
        selectUsers(rolecode);
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
            type: "POST",
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
        type: "POST",
        contentType: 'application/json',
        url: "../Role/addBaseRole",
        data: JSON.stringify(JsonData),
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

function selectUsers(roleCode) {
    if (![null, undefined, ""].includes(roleCode)) {
        $("#roleCode").val(roleCode);
        $("#baseUserList").dataTable({
            "lengthChange": true,
            "searching": false,
            "destroy": true,
            "ordering": true,
            "info": true,
            // "lengthMenu": [10, 15],
            "autoWidth": false,
            "pageLength": 10,
            "pagingType": "full_numbers",
            "serverSide": true,
            "ajax": {
                "url": "/UserRole/getUsers/" + roleCode,
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
            "columns": [
                {"data": "username"},
                {"data": "realname"},
                {"data": "usercode"}
            ]
        });

        $("#baseUserList").delegate("tbody tr[role='row']", "click", function (row) {
            var table = $('#baseUserList').DataTable();
            var tr = $(this).closest("tr");
            $("#baseUserList").find("tbody tr[role='row']").closest("tr").css("color", "#000000");
            $("#baseUserList").find("tbody tr[role='row']").closest("tr").css("background-color", "#FFFFFF");
            tr.css("color", "#FFFFFF");
            tr.css("background-color", "#428bca");
            if (undefined != row) {
                var tds = table.row($(this).closest('tr')).data();
            }
            $("#userid").val(tds.userid);
        });
    }
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

function authRoleFunc() {
    if ([null, undefined, ""].includes($("#roleCode").val())) {
        modals.info("请选择一个角色");
        return false;
    }

    $("#baseUsersList").dataTable({
        "lengthChange": true,
        "searching": true,
        "destroy": true,
        "ordering": true,
        "info": true,
        "lengthMenu": [10, 15],
        "autoWidth": false,
        "pageLength": 10,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
            "url": "/Users/selectList",
            "cache": false,  //禁用缓存
            "contentType": 'application/json',
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
        "columns": [
            {
                "data": null, "orderable": false,
                "render": function (data, type, row, meta) {
                    var no = meta.settings._iDisplayStart + meta.row + 1;
                    return no;
                }
            },
            {"data": "username"},
            {"data": "realname"},
            {"data": "usercode"},
            {
                "data": null, "render": function (row) {
                    return dateFtt("yyyy年MM月dd日", new Date(row.createtime));
                }
            }
        ]
    });

    $("#baseUsersList").delegate("tbody tr[role='row']", "dblclick", function (row) {
        var table = $('#baseUsersList').DataTable();
        var tr = $(this).closest("tr");
        $("#baseUsersList").find("tbody tr[role='row']").closest("tr").css("color", "#000000");
        $("#baseUsersList").find("tbody tr[role='row']").closest("tr").css("background-color", "#FFFFFF");
        tr.css("color", "#FFFFFF");
        tr.css("background-color", "#428bca");
        if (undefined != row) {
            var tds = table.row($(this).closest('tr')).data();
        }
        var JsonData = {}
        JsonData.rolecode = $("#roleCode").val();
        JsonData.userid = tds.guid;
        $.ajax({
            dataType: "json",
            async: false,
            type: "POST",
            data: JSON.stringify(JsonData),
            contentType: 'application/json',
            url: "/UserRole/addRoleUsers",
            success: function (data) {
                if (data.result) {
                    $("#baseUserList").dataTable().fnDraw(false);
                }
            }, error: function () {
                modals.info("程序出错");
                return false;
            }
        });

    });

    $("#grantModal").modal();
}

function deleteRoleFunc() {
    if ([null, undefined, ""].includes($("#roleCode").val())) {
        modals.info("请选择一个角色");
        return false;
    }

    if ([null, undefined, ""].includes($("#userid").val())) {
        modals.info("请选择一个用户");
        return false;
    }
    var JsonData = {}
    JsonData.rolecode = $("#roleCode").val();
    JsonData.userid = $("#userid").val();
    $.ajax({
        dataType: "json",
        async: false,
        type: "POST",
        data: JSON.stringify(JsonData),
        contentType: 'application/json',
        url: "/UserRole/delRoleUsers",
        success: function (data) {
            $("#baseUserList").dataTable().fnDraw(false);
        }, error: function () {
            modals.info("程序出错");
            return false;
        }
    });

}

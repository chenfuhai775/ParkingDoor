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
            },
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
    var guid = null;
    var table = $('#baseRoleList').DataTable();
    if (undefined == row) {
        var row = $("#baseRoleList").find("tbody tr input[type='checkbox']:checked");
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row[0]).closest('tr')).data();
            guid = tds.guid;
        }
    } else {
        var tds = table.row($(row).closest('tr')).data();
        guid = tds.guid;
    }

    modals.confirm("确认删除", function () {
        $.ajax({
            dateType: "json",
            async: false,
            contentType: 'application/json',
            url: "../User/delBaseUser/" + guid,
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
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.username = $("#username").val();
    JsonData.password = $("#password").val();
    JsonData.realname = $("#realname").val();
    JsonData.usercode = $("#usercode").val();

    if ([null, undefined, ""].includes(JsonData.username)) {
        modals.info("请填写用户名称");
        return false;
    }
    if ([null, undefined, ""].includes(JsonData.password)) {
        modals.info("请填写密码");
        return false;
    }

    $.ajax({
        dataType: "json",
        async: false,
        type: "POST",
        contentType: 'application/json',
        url: "/User/checkCode",
        data: JSON.stringify(JsonData),
        success: function (data) {
            if (!data) {
                modals.info("用户名已存在");
                return false;
            } else {
                $.ajax({
                    dataType: "json",
                    async: false,
                    type: "POST",
                    contentType: 'application/json',
                    url: "../User/addBaseUser",
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
        }, error: function () {
            modals.info("验证过程出现错误");
            return false;
        }
    });
}

function setValue(rowObject) {
    $("#guid").val(rowObject.guid);
    $("#username").val(rowObject.username);
    $("#password").val(rowObject.password);
    $("#realname").val(rowObject.realname);
    $("#usercode").val(rowObject.usercode);
}

function clearValue() {
    $("#guid").val("");
    $("#username").val("");
    $("#password").val("");
    $("#realname").val("");
    $("#usercode").val("");
}

function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}
var winId = 'iconWin';
$(function () {
    var tables = $("#menuList").dataTable({
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
            "url": "/baseMenu/selectAll",
            "cache": false,
            "data": function (data) {
                /*      var prObj = new Object();
                      prObj.clientcode = $("#txtSsearchclientcode").val();
                      prObj.clientname = $("#txtSsearchclientname").val();
                      data["search"]["value"] = JSON.stringify(prObj);*/
                return data;
            },
            "dataFilter": function (json) {
                json = JSON.parse(json);
                var returnData = {};
                returnData.draw = json.draw;
                returnData.recordsTotal = json.recordsTotal;
                returnData.recordsFiltered = json.recordsTotal;
                returnData.data = json.data;
                return JSON.stringify(returnData);
            }
        },
        "language": {
            "lengthMenu": "_MENU_ 条记录每页",
            "zeroRecords": "没有找到记录",
            "info": "当前 _START_ 条到 _END_ 条 共 _TOTAL_ 条 , 第 _PAGE_ 页 ( 总共 _PAGES_页 )",
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
            {"data": "menuname"},
            {"data": "parentid"},
            {"data": "url"},
            {"data": "icon"},
            {"data": "sortno"},
            {
                "data": "active", "render": function (row) {
                    return row == "1" ? "启用" : "禁用";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\"  style='cursor: pointer' title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-trash\"  style='cursor: pointer' title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            }
        ]

    });
    $("#active").select2({
        width: 195,
        data: [{id: 1, text: "启用"}, {id: 0, text: "禁用"}],
        placeholder: '启用',
    });
    $.ajax({
        url: "/baseMenu/selectParent",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (result) {
            $("#parentid").select2({
                placeholder: '选择父节点',
                allowClear: true,
                width: 195,
                data: JSON.parse(result.data)
            });
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
    $.ajax({
        url: "/baseMenu/selectDictByPK/100",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (data) {
            var arr = new Array();
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    var obj = new Object();
                    obj.id = data[i].id;
                    obj.text = data[i].text;
                    arr.push(obj);
                }
            }
            if (arr.length > 0) {
                $("#menutype").select2({
                    width: 195,
                    data: arr
                });
            }
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
    $("#selectIcon").click(selectIcon);
});

function showFormPanel() {
    clearValue();
    $("#editModal").modal();
}

function editRowData(row) {
    var table = $("#menuList").DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setValue(tds);
    } else {
        var row = $("#menuList").find("tbody tr input[type='checkbox']:checked").eq(0);
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
        var arr = [];
        $("#menuList").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            arr.push($(this).attr("id"));
        })

        if (arr.length == 0) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#menuList').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        arr.push(tds.guid);
    }

    var guid = "'" + arr.join("','") + "'";
    modals.confirm('确定删除', function () {
        $.ajax({
            dateType: "json",
            async: false,
            contentType: 'application/json',
            url: "/baseMenu/Delete/" + guid,
            success: function (result) {
                var result = JSON.parse(result)
                modals.info(result.msg);
                $("#menuList").dataTable().fnDraw(false);
            },
            error: function (result) {
            }
        });

    });


}

function Save() {
    if ($("#menuname").val() == "") {
        modals.info("菜单名称不能为空");
        return false;
    }
    if ($("#url").val() == "") {
        modals.info("页面路径不能为空");
        return false;
    }
    if ($("#sortno").val() == "") {
        modals.info("排序编号不能为空");
        return false;
    }
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.menutype = $("#menutype").val();
    JsonData.menuname = $("#menuname").val();
    JsonData.parentid = $("#parentid").val() == null ? 0 : $("#parentid").val();
    JsonData.url = $("#url").val();
    JsonData.icon = $("#txtIcon").val();
    var active = $("#active").val();
    JsonData.active = active;
    JsonData.sortno = $("#sortno").val();
    JsonData.remark = $("#remark").val();
    $.ajax({
        dataType: "json",
        type: "POST",
        contentType: 'application/json',
        async: false,
        url: "/baseMenu/Add",
        data: JSON.stringify(JsonData),
        success: function (result) {
            $("#editModal").modal('hide');
            modals.info(result.msg);
            $("#menuList").dataTable().fnDraw(false);
        },
        error: function (result) {
        }
    });
}

function clearValue() {
    $("#guid").val("");
    $("#menutype").val("1").trigger("change");
    $("#menuname").val("");
    $("#parentid").val("1").trigger("change");
    $("#url").val("");
    $("#txtIcon").val("");
    $("#active").val("1").trigger("change");
    $("#sortno").val("");
    $("#remark").val("");
}

function setValue(rowObject) {
    $("#guid").val(rowObject.guid);
    $("#menutype").val(rowObject.menutype).trigger("change");
    $("#menuname").val(rowObject.menuname);
    $("#parentid").val(rowObject.parentid).trigger("change");
    $("#url").val(rowObject.url);
    $("#txtIcon").val(rowObject.icon);
    $("#active").val(rowObject.active).trigger("change");
    $("#sortno").val(rowObject.sortno);
    $("#remark").val(rowObject.remark);
    $("#icon_i").removeClass().addClass("form-control-feedback").addClass(rowObject.icon);
}

//全选按钮
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table').find("tbody tr input[type='checkbox']").prop("checked", $(ckb).prop("checked"));
}

function selectIcon() {
    modals.openWin({
        winId: winId,
        title: '图标选择器（双击选择）',
        width: '1000px',
        height: '100%',
        overflow: 'scroll',
        url: "/select/icon"
    });
}

//回填图标
function fillBackIconName(icon_name) {
    $("#txtIcon").val(icon_name);
    $("#icon_i").removeClass().addClass("form-control-feedback").addClass(icon_name);
}
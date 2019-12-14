//初始化form表单
var form = null;
var winId = 'iconWin';

$(function () {
    initTree(0);
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
            "url": "/devicefunc/listAll",
            "cache": false,  //禁用缓存
            "data": function (d) {
                var obj = new Object();
                obj.devicetypecode = $('#tree').treeview('getSelected')[0].id
                obj.keyword = $('#tree').val();
                d.param = JSON.stringify(obj);
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
        "dom": "<'row'<'col-sm-2'l><'#mytool.col-sm-7'><'col-sm-3'f>r>" +
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
            {"data": "activename"},
            {"data": "activecode"},
            {"data": "activeno"},
            {
                "data": "icon", "render": function (d) {
                    return "<i class='" + d + "'></i>" + "&nbsp;" + d;
                }
            },
            {"data": "expression"},
            {
                "data": null, "className": "text-center", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\"  style='cursor: pointer' title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>" +
                        "  &nbsp;<i class=\"glyphicon glyphicon-trash\"  style='cursor: pointer' title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            }
        ]
    });

    $('#tree').on('nodeSelected', function (event, data) {
        $("#typecode").val(data.id);
        $("#tbGrid").dataTable().fnDraw(false);
    });

    $("#btnSave").click(function () {
        save();
    });
    $("#selectIcon").click(selectIcon);
});

//弹框数据操作
function setText(operate, a) {
    $("#editModal form input").prop("readonly", "");
    $("#editModal form textarea").prop("readonly", "");
    $("#selectIcon").removeClass("disabled");

    if (operate == "create") {
        $("#editModalLabel").text('新增');
        $("#editModal form input").val('');
        $("#editModal form textarea").val('');
        $("#icon_i").removeClass().addClass("form-control-feedback").addClass("fa fa-hand-o-right");
    } else if (operate == "edit") {
        $("#editModalLabel").text('修改');
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(a).closest('tr')).data();
        $("#hidGuid").val(tds.guid)
        $("#txtActiveName").val(tds.activename);
        $("#txtActiveCode").val(tds.activecode);
        $('#typecode').val(tds.devicetypecode);
        $('#txtActiveNo').val(tds.activeno);
        $('#txtActiveNo').attr("readonly", "readonly");
        $("#txtIcon").val(tds.icon);
        $("#txtExpression").val(tds.expression);
        $("#icon_i").removeClass().addClass("form-control-feedback").addClass(tds.icon);
    }
    $("#editModal").modal();
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
            ids.push($(this).attr("id"));
        });

        if (ids.length == 0) {
            modals.info("请选择一条记录");

            return false;
        }
    } else {
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids.push(tds.guid);
    }
    modals.confirm('确定删除', function () {
        var guid = "'" + ids.join("','") + "'";
        $.ajax({
            dateType: "json",
            type: "GET",
            async: false,
            url: "/devicefunc/delete/" + guid,
            success: function (result) {
                var result = JSON.parse(result)
                modals.info(result.msg);
                $("#tbGrid").dataTable().fnDraw(false);
            },
            error: function (result) {
            }
        });
    })
}

//保存数据
function save() {
    var model = new Object();
    if ($("#hidGuid").val() == "") {
        model.guid = null;
        model.creater = "system";
        model.createtime = dateFtt('yyyy-MM-dd', new Date());
    } else {
        model.guid = $("#hidGuid").val();
    }
    model.activename = $("#txtActiveName").val();
    model.activecode = $("#txtActiveCode").val();
    model.activeno = $("#txtActiveNo").val() == "" ? 0 : $("#txtActiveNo").val();
    model.devicetypecode = $('#typecode').val();
    model.icon = $("#txtIcon").val();
    model.expression = $("#txtExpression").val();

    var data = JSON.stringify(model);
    $.ajax({
        dateType: "json",
        async: false,
        type: "POST",
        url: "/devicefunc/create",
        data: data,
        success: function (result) {
            var result = JSON.parse(result)
            $("#editModal").modal('hide');
            modals.info(result.msg);
            $("#tbGrid").dataTable().fnDraw(false);
        },
        error: function (msg) {
            modals.info("保存失败");
            $("#editModal").modal('hide');
        }
    });
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

function initTree(selectNodeId) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/devicefunc/typetree",
        success: function (data) {
            treeData = JSON.parse(data);
        },
        error: function (data) {
        }
    });
    var tree = $("#tree").treeview({
        data: treeData,
        showBorder: true,
        expandIcon: "glyphicon glyphicon-plus",
        collapseIcon: "glyphicon glyphicon-minus",
        levels: 4,
    });
    if (treeData.length == 0)
        return;
    //默认选中第一个节点
    selectNodeId = selectNodeId || 0;
    $("#tree").data('treeview').selectNode(selectNodeId);
    $("#tree").data('treeview').expandNode(selectNodeId);
    $("#tree").data('treeview').revealNode(selectNodeId);

    $("#typecode").val($('#tree').treeview('getSelected')[0].id);
}

//回填图标
function fillBackIconName(icon_name) {
    $("#txtIcon").val(icon_name);
    $("#icon_i").removeClass().addClass("form-control-feedback").addClass(icon_name);
}

//全选按钮
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table').find("tbody tr input[type='checkbox']").prop("checked", $(ckb).prop("checked"));
}
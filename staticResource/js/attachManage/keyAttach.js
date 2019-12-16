$(function () {
    var tables = $("#tbGrid").dataTable({
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
            "url": "../Attach/List",
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
        "columns": [
            {
                "width": "60px",
                "orderable": false,
                "className": "text-center",
                "render": function (row) {
                    return "<input type=\"checkbox\" id=\"" + row + "\"  value=\"\"/>";
                }
            },
            {"data": "src"},
            {"data": "sequence"},
            {"data": "vendor"},
            {"data": "sn"},
            {"data": "version"},
            {"data": "k1"},
            {
                "data": "token",
                "defaultContent": ""
            },
            {"data": "signkey", "defaultContent": ""},
            {
                "data": "active", "render": function (row) {
                    return row ? "<div style='color:green;cursor: pointer' onclick='updateRow(this)'>启用</div>" : "<div style='color:red;cursor: pointer' onclick='updateRow(this)'>禁用</div>";
                }
            },
            {
                "data": "createtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日", new Date(strDate));
                }
            },
            {
                "data": null, "width": "120px", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-trash\" style='cursor: pointer'   title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            }
        ]
    });
});

function delRowData(row) {
    if (undefined == row) {
        var ids = "";
        $("#tbGrid").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids = ids + $(this).attr("id") + ",";
        })
        ids = ids.substring(0, ids.length - 1);

        if ("" == ids) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#tbGrid').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids = tds.guid;
    }

    var JsonData = {}
    JsonData.guid = ids;
    $.ajax({
        datetype: "json",
        async: false,
        url: "../Attach/D/" + ids,
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            $("#tbGrid").dataTable().fnDraw(false);
            modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}

function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}

function updateRow(row) {

    var table = $('#tbGrid').DataTable();
    var tds = table.row($(row).closest('tr')).data();

    var JsonData = {}
    JsonData.guid = tds.guid;
    $.ajax({
        datetype: "json",
        async: false,
        url: "../Attach/Status/" + tds.guid,
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            $("#tbGrid").dataTable().fnDraw(false);
            if (!result.result)
                modals.error(result.msg);
        },
        error: function (result) {
        }
    });

}
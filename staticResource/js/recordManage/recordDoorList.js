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
            "url": "/record/cardRecordList",
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
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "sn"},
            {"data": "version"},
            {"data": "cardno"},
            {"data": "eventtype"},
            {"data": "cardtype"},
            {
                "data": "result", "render": function (row) {
                    return row ? "成功" : "失败";
                }
            },
            {
                "data": "cardtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            },
            {
                "data": "reporttime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            },
            {"data": "message"},
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-trash\" style='cursor: pointer'  title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            }
        ]
    });
})

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
        url: "/record/deleteOnecardRecord/" + ids,
        success: function (result) {
            result = JSON.parse(result);
            if (result.result) {
                $("#tbGrid").dataTable().fnDraw(false);
            } else
                modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}
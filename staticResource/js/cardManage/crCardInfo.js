$(function () {
    laydate.render({
        elem: '#starttime'
        , type: 'datetime'
        , format: "yyyy-MM-dd HH:mm:ss"
    });
    laydate.render({
        elem: '#endtime'
        , type: 'datetime'
        , format: "yyyy-MM-dd HH:mm:ss"
    });

    initStatus();
    initCertificateType();
    initCardList(null);
});

function initCardList(clientcode) {
    var table = $("#cardlist").dataTable({
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
            "url": "/card/selectListByClientCode",
            "cache": false,  //禁用缓存
            "data": {"clientcode": clientcode},
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
        "dom": "<'row'<'col-xs-2'l><'#cardtool.col-xs-7'><'col-xs-3'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
            $("#cardtool").append('<button id="dataCardDel" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-minus" data-toggle="modal" data-target="#myModal">&nbsp;删除</button>');
            $("#cardtool").append('<button id="dataCardEdit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal">&nbsp;修改</button>');
            $("#cardtool").append('<button id="dataCardinit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;添加</button>');
            $("#dataCardinit").on("click", function () {
                showCardFormPanel();
            });
            $("#dataCardDel").on("click", function () {
                delCardRowData();
            });
            $("#dataCardEdit").on("click", function () {
                editCardRowData();
            });
        },
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "cardno"},
            {"data": "cardname"},
            {
                "data": null, "render": function (row) {
                    return dateFtt("yyyy-MM-dd hh:mm:ss", new Date(row.starttime));
                }
            },
            {
                "data": null, "render": function (row) {
                    return dateFtt("yyyy-MM-dd hh:mm:ss", new Date(row.endtime));
                }
            },
            {"data": "statename"},
            {"data": "creator"},
            {
                "data": null, "width": "120px", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'   title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editCardRowData(this)\" operate=\"edit\"></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-trash\" style='cursor: pointer'  title=\"删除\" value=\"" + row.guid + "\" onclick=\"delCardRowData(this)\"></i>";
                }
            }
        ]
    });
    return table;
}
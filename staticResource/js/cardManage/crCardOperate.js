$(function () {
    var form = $("#cardinfoForm").form();
    //初始化校验
    $('#cardinfoForm').bootstrapValidator({
        message: '请输入有效值',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, functionform, submitButton) {
            SaveCard();
        },
        fields: {
            cardno: {
                validators: {
                    notEmpty: {
                        message: '请输入物理卡号'
                    }
                }
            },
            certificatetype: {
                validators: {
                    notEmpty: {
                        message: '请选择凭证类型'
                    }
                }
            },
            state: {
                validators: {
                    notEmpty: {
                        message: '请选择卡状态'
                    }
                }
            }
        }
    });
    form.initComponent();
})

function initCardList(clientcode) {
    var url = clientcode == null ? "/card/selectCardList" : "/card/selectListByClientCode";
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
            "url": url,
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

function initCertificateType() {
    $.ajax({
        url: "/baseMenu/selectDictByPK/107",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (data) {
            $("#certificatetype").select2({
                data: data,
                placeholder: "- - 凭证类型 - -",
                allowClear: false
            });
            $("#certificatetype").on("select2:select", function () {
                var data = $(this).val();
                initCardType(data);
            });
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
}

function initCardType(data) {
    if (null == data) {
        $("#ddlCardtype").select2({
            data: null,
            placeholder: "- - 卡类型 - -",
            allowClear: false
        });
    } else {
        $("#ddlCardtype").empty();
        $.ajax({
            url: "/baseMenu/selectDictByPK/" + data,
            type: "get",
            dataType: "json",
            data: "data",
            async: false,
            success: function (data) {
                $("#ddlCardtype").select2({
                    data: data,
                    placeholder: "- - 卡类型 - -",
                    allowClear: false
                });
            },
            error: function (data) {
                modals.info("加载失败");
            }
        });
    }
}

function initStatus() {
    $.ajax({
        dataType: "json",
        async: true,
        url: "/card/selectcardtype/113",
        success: function (data) {
            var result = JSON.parse(data.data);
            $("#state").select2({
                data: result,
                placeholder: "请选择",
                allowClear: false
            });
        }
    });
}

function showCardFormPanel() {
    clearCardValue();
    $("#editCardModal").modal();
}

function editCardRowData(row) {
    var table = $('#cardlist').DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setCardValue(tds);
    } else {
        var row = $("#cardlist").find("tbody tr input[type='checkbox']:checked");
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row[0]).closest('tr')).data();

            setCardValue(tds);
        }
    }
    $("#editCardModal").modal();
}

function delCardRowData(row) {
    var ids = [];
    if (undefined == row) {

        $("#cardlist").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids.push($(this).attr("id"));
        });
        if (ids.length == 0) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#cardlist').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids.push(tds.guid);
    }
    modals.confirm("确认删除", function () {
        var JsonData = {}
        JsonData.guid = "'" + ids.join("','") + "'";
        $.ajax({
            datetype: "json",
            async: false,
            url: "../card/deleteMore",
            data: {"JsonData": JSON.stringify(JsonData)},
            success: function (result) {
                var result = JSON.parse(result)
                if (result.result)
                    $("#cardlist").dataTable().fnDraw(false);
                else
                    modals.info(result.msg);
            },
            error: function (result) {
            }
        });
    })
}

function SaveCard() {
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.cardno = $("#cardno").val();
    JsonData.cardname = $("#ddlCardtype").select2('data')[0].text;
    JsonData.certificatetype = $("#certificatetype").select2('data')[0].id;
    JsonData.cardtype = $("#ddlCardtype").select2('data')[0].id;
    JsonData.state = $("#state").select2('data')[0].id;
    JsonData.starttime = $("#starttime").val();
    JsonData.endtime = $("#endtime").val();
    JsonData.clientcode = $("#clientcode").val();
    $.ajax({
        datetype: "json",
        async: false,
        url: "../card/insert",
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            if (result.result) {
                $("#editCardModal").modal('hide');
                $("#cardlist").dataTable().fnDraw(false);
            } else
                modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}

function setCardValue(rowObject) {
    $("#guid").val(rowObject.guid);
    initCardType(rowObject.certificatetype);
    $("#cardno").val(rowObject.cardno);
    $("#certificatetype").val(rowObject.certificatetype).trigger("change");
    $("#ddlCardtype").val(rowObject.cardtype).trigger("change");
    $("#state").val(rowObject.state).trigger("change");
    $("#starttime").val(dateFtt("yyyy-MM-dd hh:mm:ss", new Date(rowObject.starttime)));
    $("#endtime").val(dateFtt("yyyy-MM-dd hh:mm:ss", new Date(rowObject.endtime)));
}

function clearCardValue() {
    $("#guid").val("");
    $("#cardno").val("");
    $("#cardtype").val("").trigger("change");
    $("#state").val("").trigger("change");
    $("#starttime").val("");
    $("#endtime").val("");
}
$(function () {
    $('#grantTab a').click(function (e) {
        e.preventDefault()
        $(this).tab('show')
    });

    $("#tbGridRole").dataTable({
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
            "url": "../Access/AccessGroupList",
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
            $("#mytool").append('<button id="dataGrant" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;人员授权</button>');
            $("#mytool").append('<button id="dataDel" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-minus" data-toggle="modal" data-target="#myModal">&nbsp;删除</button>');
            $("#mytool").append('<button id="dataEdit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-pencil" data-toggle="modal" data-target="#myModal">&nbsp;修改</button>');
            $("#mytool").append('<button id="dataAdd" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;添加</button>');
            $("#dataAdd").on("click", function () {
                showFormPanel();
            });
            $("#dataDel").on("click", function () {
                delRowData();
            });
            $("#dataEdit").on("click", function () {
                editRowData();
            });
            $("#dataGrant").on("click", function () {
                showClientPanel();
            });
        },
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "orggroupname"},
            {"data": "orggroupcode"},
            {
                "data": "active", "render": function (row) {
                    return row ? "启用" : "禁用";
                }
            },
            {"data": "creator"},
            {
                "data": "createtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            },
            {
                "data": null, "width": "120px", "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'  title=\"授权\" value=\"" + row.guid + "\" onclick=\"grantbyRow('" + row.orggroupcode + "')\" operate=\"edit\"></i>";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-th-large\" style='cursor: pointer'  title=\"全部权限\" value=\"" + row.guid + "\" onclick=\"showallgrant('" + row.orggroupcode + "','user')\" operate=\"edit\"></i>";
                }
            }
        ]
    })

    $("#tbGridUser").dataTable({
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
            "url": "/userRegister/selectList",
            "cache": false,
            "data": function (data) {
                var param = {};
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
        "dom": "<'row'<'col-xs-2'l><'#mytool1.col-xs-8'><'col-xs-2'f>r>" +
            "t" +
            "<'row'<'col-xs-6'i><'col-xs-6'p>>",
        "initComplete": function () {
            $("#mytool1").append('<button id="datainit" style="float: right" type="button" class="btn btn-flat btn-default glyphicon glyphicon-plus">&nbsp;授权</button>');
            $("#datainit").on("click", function () {
                grantbyRow(null, null, 'user');
            });
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
            {"data": "phone"},
            {"data": "address"},
            {"data": "routerule"},
            {"data": "rolename"},
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'  title=\"授权\" value=\"" + row.guid + "\" onclick=\"grantbyRow('" + row.clientname + "','" + row.clientcode + "','user')\" operate=\"edit\"></i>";

                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-th-large\" style='cursor: pointer'  title=\"详细\" value=\"" + row.guid + "\" onclick=\"showallgrant('" + row.clientcode + "','user')\" operate=\"edit\"></i>";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-th-list\" style='cursor: pointer'  title=\"权限集合\" value=\"" + row.guid + "\" onclick=\"showallgrant('" + row.clientcode + "',null)\" operate=\"edit\"></i>";
                }
            }
        ]
    });

    $("#btnSave").click(function () {
        save();
    });
    $("#btnAccessSave").click(function () {
        SaveAccess();
    })
});

function showClientPanel() {
    var table = $('#tbGridRole').DataTable();
    var row = $("#tbGridRole").find("tbody tr input[type='checkbox']:checked").eq(0);
    if (0 == row.length) {
        modals.info("请选择一条记录");
        return false;
    } else {
        var tds = table.row($(row).closest('tr')).data();
        var clientCode = tds.orggroupcode;
        $.ajax({
            datetype: "json",
            async: false,
            url: "/Access/getClentByGroup/" + clientCode,
            success: function (json) {
                json = JSON.parse(json);
                if (json.result) {
                    $("#userSelected").empty();
                    $("#userUnSelected").empty();
                    var data = eval(json.data);
                    $.each(data, function (i) {
                        if (this.flag)
                            $("<option value='" + this.clientcode + "'>" + this.clientname + "</option>").appendTo("#userSelected")
                        else
                            $("<option value='" + this.clientcode + "'>" + this.clientname + "</option>").appendTo("#userUnSelected")
                    })
                }
            },
            error: function (result) {
            }
        });
        $("#clientModal").modal();
    }
}

function userUnSelect() {
    var options = $("#userUnSelected option:selected").each(function (i) {
        var temp = $(this).clone();
        $("#userSelected").append(temp);
        $(this).remove();
    });
}

function userSelect() {
    var options = $("#userSelected option:selected").each(function (i) {
        var temp = $(this).clone();
        $("#userUnSelected").append(temp);
        $(this).remove();
    });
}

function SaveAccess() {
    var JsonData = {};
    var clientCodes = [];
    var options = $("#userSelected").children().each(function (i) {
        var clientCode = {};
        clientCode.clientcode = $(this).val();
        clientCodes.push(clientCode);
    });
    var table = $('#tbGridRole').DataTable();
    var row = $("#tbGridRole").find("tbody tr input[type='checkbox']:checked").eq(0);
    var tds = table.row($(row).closest('tr')).data();
    var groupcode = tds.orggroupcode;
    JsonData.groupcode = groupcode;
    JsonData.clientCodes = clientCodes;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/Access/AddClientGroup",
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            if (!result.result)
                modals.info(result.msg);
            $("#clientModal").modal('hide');
        },
        error: function (json) {

        }
    });

}

//保存权限
function save() {
    var JsonData = {};
    var activeCodes = [];
    var options = $("#activeSelectedAll").children().each(function (i) {
        var activeCode = {};
        activeCode.activecode = $(this).val();
        activeCode.sn = $(this).attr("sn");
        activeCode.clientcode = $(this).attr("clientcode");
        activeCodes.push(activeCode);
    });
    JsonData.activeCodes = activeCodes;
    JsonData.code = grantclientcode;
    JsonData.clientname = grantclientname;
    var arr = new Array();
    var table = $('#tbDevInfoCheck').DataTable();
    $('#tbDevInfoCheck tbody tr').each(function () {
        var obj = new Object();
        obj.guid = getGuid();
        obj.clientcode = grantclientcode;
        obj.sn = $(this).children().eq(0).text();
        arr.push(obj);
    });
    JsonData.list = arr;
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": JSON.stringify(JsonData)},
        url: "/device/access/insert",
        success: function (msg) {
            var msg = jQuery.parseJSON(msg);
            $("#grantModal").modal('hide');
            modals.info(msg.result ? "授权成功" : "授权失败");
        },
        error: function (msg) {
            $("#grantModal").modal('hide');
            modals.info("授权失败");
        }
    });
}

var deviceTable = null;
var deviceTableCheck = null;
var grantclientcode = null;
var grantclientname = null;

function grantbyRow(name, code, type) {
    if (null == code) {
        var table = $('#tbGridUser').DataTable();
        var row = $("#tbGridUser").find("tbody tr input[type='checkbox']:checked").eq(0);
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row).closest('tr')).data();
            grantclientcode = type == "user" ? tds.clientcode : tds.orggroupcode;
            grantclientname = type == "user" ? tds.clientname : tds.orggroupname;
            code = tds.clientcode;
        }
    } else {
        grantclientcode = code;
        grantclientname = name;
    }
    if (null != deviceTable) {
        deviceTable.fnClearTable();    //清空数据
        deviceTable.fnDestroy();       //销毁datatable
    }
    deviceTable = $("#tbDevInfo").dataTable({
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "lengthMenu": [5],
        "autoWidth": false,
        "pageLength": 5,
        "pagingType": "full_numbers",
        "serverSide": true,
        "ajax": {
            "url": "/device/listAll",
            "cache": false,  //禁用缓存
            "data": function (d) {
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
            "infoFiltered": "(从 _MAX_ 条记录过滤)",
            "paginate": {
                "previous": "上一页",
                "next": "下一页",
                "sFirst": "首页",
                "sLast": "末页"
            }
        },
        "columns": [
            {"data": "sn"},
            {"data": "typename"},
            {"data": "devicename"},
            {"data": "parentname"}
        ]
    });
    //未选中内容绑定单击事件
    $('#tbDevInfo tbody').off("dblclick");
    $('#tbDevInfo tbody').on('dblclick', 'tr', function () {
        var table = $('#tbDevInfo').DataTable();
        var data = table.row(this).data();
        var container = false;
        $("#tbDevInfoCheck tbody tr").each(function (i) {
            if ($(this).children("td").eq(0).text() == data.sn) {
                container = true;
                return;
            }
        });
        if (!container) {
            if (1 == $("#tbDevInfoCheck tbody tr").children(".dataTables_empty").length)
                $("#tbDevInfoCheck tbody tr").eq(0).remove();
            $(this).clone().appendTo($('#tbDevInfoCheck tbody'));
            $(this).css("background-color", "#ccc");
        }
        InitActiveFun(data, code);
    });

    //选中的设备表格
    if (null != deviceTableCheck) {
        deviceTableCheck.fnClearTable();    //清空数据
        deviceTableCheck.fnDestroy();       //销毁datatable
    }
    deviceTableCheck = $("#tbDevInfoCheck").dataTable({
        "lengthChange": true,
        "searching": false,
        "ordering": true,
        "info": false,
        "lengthMenu": [10, 25, 50, 100],
        "autoWidth": false,
        "pageLength": 10,
        "paging": false,
        "serverSide": true,
        "ajax": {
            "url": "/device/selectListByClientCode/" + code,
            "cache": false,  //禁用缓存
            "data": function (d) {
            },
            "dataFilter": function (json) {//json是服务器端返回的数据
                json = JSON.parse(json);
                var returnData = {};
                returnData.data = json;//返回的数据列表
                return JSON.stringify(returnData);//这几个参数都是datatable需要的，必须要
            }
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
            {"data": "sn"},
            {"data": "typename"},
            {"data": "devicename"},
            {"data": "parentname"}
        ],
        "fnDrawCallback": function () {
            //初始化选中项目
            $('#tbDevInfoCheck tbody').children("tr").each(function (i) {
                var sn = $(this).children("td").eq(0).text();
                $("#tbDevInfo tbody tr").each(function (i) {
                    if ($(this).children("td").eq(0).text() == sn) {
                        $(this).css("background-color", "#ccc");
                        return;
                    }
                });
            });
        }
    });

    //选中内容绑定单击事件
    $('#tbDevInfoCheck tbody').off("dblclick");
    $('#tbDevInfoCheck tbody').on('dblclick', 'tr', function () {
        var sn = $(this).children("td").eq(0).text();
        $("#tbDevInfo tbody tr").each(function (i) {
            if ($(this).children("td").eq(0).text() == sn) {
                $(this).css("background-color", "#fff");
                return;
            }
        });
        $(this).remove();
        var options = $("#activeSelectedAll").children().each(function (k) {
            if ($(this).attr("sn") == sn)
                $(this).remove();
        });
    });
    activemultiInit();

    $("#activeSelectedAll").empty();
    $.ajax({
        datetype: "json",
        async: false,
        data: {"clientcode": grantclientcode},
        url: "/active/selectAllAccess",
        success: function (json) {
            json = JSON.parse(json);
            var jsonArr = eval(json.data);
            $.each(jsonArr, function (i) {
                $("<option clientcode='" + this.clientcode + "' sn='" + this.sn + "' value='" + this.activecode + "'>" + "【" + this.devicename + "】" + this.activename + "</option>").appendTo("#activeSelectedAll")
            });
        },
        error: function (data) {
        }
    });

    $("#activeSelectedAll").children().bind('click', function () {
        $(this).remove();
    })

    $("#grantModal").modal({height: "100%"});
}

function activemultiInit() {
    $('#activeSelected').multiSelect({
        selectableHeader: "<input type='text' class='form-control search-input' style='height:26px;margin-bottom:5px' autocomplete='off' placeholder='未选'>",
        selectionHeader: "<input type='text' class='form-control search-input' style='height:26px;margin-bottom:5px' autocomplete='off' placeholder='已选'>",
        afterInit: function (ms) {
            var that = this,
                $selectableSearch = that.$selectableUl.prev(),
                $selectionSearch = that.$selectionUl.prev(),
                selectableSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selectable:not(.ms-selected)',
                selectionSearchString = '#' + that.$container.attr('id') + ' .ms-elem-selection.ms-selected';

            that.qs1 = $selectableSearch.quicksearch(selectableSearchString)
                .on('keydown', function (e) {
                    if (e.which === 40) {
                        that.$selectableUl.focus();
                        return false;
                    }
                });

            that.qs2 = $selectionSearch.quicksearch(selectionSearchString)
                .on('keydown', function (e) {
                    if (e.which == 40) {
                        that.$selectionUl.focus();
                        return false;
                    }
                });
        },
        afterSelect: function () {
            this.qs1.cache();
            this.qs2.cache();
            $('#activeSelected').multiSelect('refresh');
            var groupList = $("#activeSelected").val();
            pspanel(groupList);
        },
        afterDeselect: function () {
            this.qs1.cache();
            this.qs2.cache();
            $('#activeSelected').multiSelect('refresh');
            var groupList = $("#activeSelected").val();
            pspanel(groupList);
        }
    });
}

function showallgrant(code, type) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/selectTreeByClientCode",
        data: {
            "clientcode": code,
            "type": type
        }
        ,
        success: function (data) {
            treeData = data;
        }
        ,
        error: function (data) {
        }
    })
    ;
    $("#treegrand").treeview({
        data: treeData,
        showBorder: true,
        showCheckbox: false,
        showIcon: false,
        levels: 3
    });
    $("#grantTreeModal").modal({height: "100%"});
}

function showFormPanel() {
    clearValue();
    $("#editModal").modal();
}

function editRowData(row) {
    var table = $('#tbGridRole').DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setValue(tds);
    } else {
        var row = $("#tbGridRole").find("tbody tr input[type='checkbox']:checked").eq(0);
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
    var ids = [];
    if (undefined == row) {

        $("#tbGridRole").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids.push($(this).attr("id"));
        })


        if (ids.length == 0) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#tbGridRole').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids.push(tds.guid);
    }
    modals.confirm("确认删除", function () {
        var guids = "'" + ids.join("','") + "'";
        $.ajax({
            datetype: "json",
            async: false,
            url: "../Access/DelGroup/" + guids,
            success: function (result) {
                var result = JSON.parse(result)
                if (!result.result)
                    modals.info(result.msg);
                $("#tbGridRole").dataTable().fnDraw(false);
            },
            error: function (result) {
            }
        });
    })
}

function saveOrg() {
    var check = "";
    if ($("#checkcode").val() != $("#orgGroupCode").val()) {
        $.ajax({
            dataType: "json",
            async: false,
            url: "/Access/checkcode/"+$("#orgGroupCode").val(),
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
        modals.info("组织编码已存在，请换一个!");
        return false;
    }
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.orggroupname = $("#orgGroupName").val();
    JsonData.orggroupcode = $("#orgGroupCode").val();
    JsonData.remark = $("#remark").val();
    $.ajax({
        dateType: "json",
        async: false,
        type: "POST",
        contentType: 'application/json',
        url: "../Access/Add",
        data: JSON.stringify(JsonData),
        success: function (result) {
            var result = JSON.parse(result)
            $("#editModal").modal('hide');
            modals.info(result.msg);
            $("#tbGridRole").dataTable().fnDraw(false);
        },
        error: function (result) {
        }
    });
}

function setValue(rowObject) {
    $("#checkcode").val(rowObject.orggroupcode);
    $("#guid").val(rowObject.guid);
    $("#orgGroupName").val(rowObject.orggroupname);
    $("#orgGroupCode").val(rowObject.orggroupcode);
    $("#remark").val(rowObject.remark);
}

function clearValue() {
    $("#checkcode").val();
    $("#guid").val("");
    $("#orgGroupName").val("");
    $("#orgGroupCode").val("");
    $("#remark").val("");
}

//全选按钮
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}

var globalSN = null;

function InitActiveFun(data, clientCode) {
    globalSN = data;
    var typeCode = data.devicetypecode;
    var sn = data.sn;
    var JsonData = {};
    JsonData.sn = sn;
    JsonData.typecode = typeCode;
    JsonData.clientcode = clientCode;
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": JSON.stringify(JsonData)},
        url: "/active/getActiveByDevTypeCode",
        success: function (json) {
            json = JSON.parse(json);
            var jsonArr = eval(json);
            $("#activeSelected").empty();
            $.each(jsonArr, function (i) {
                if (!this.flag)
                    $("#activeSelected").append('<option clientcode="' + clientCode + '" sn="' + sn + '" value="' + this.activecode + '">' + this.activename + '</option>');
                else
                    $("#activeSelected").append('<option clientcode="' + clientCode + '" sn="' + sn + '" selected="selected" value="' + this.activecode + '">' + this.activename + '</option>');
            });
            $('#activeSelected').multiSelect('refresh');
        },
        error: function (data) {
        }
    });
}

function pspanel(groupIDlist) {
    var data = globalSN;
    if (null != data.sn) {
        $("#activeSelectedAll").children().each(function (i) {
            if ($(this).attr("sn") == data.sn)
                $(this).remove();
        });
        if (null != groupIDlist) {
            $("#activeSelected").children().each(function (i) {
                if (array_contain(groupIDlist, $(this).val())) {
                    var object = $(this).clone();
                    object.bind('click', function () {
                        $(this).remove();
                    })
                    object.removeAttr("selected");
                    object.text("【" + data.devicename + "】" + object.text());
                    object.appendTo("#activeSelectedAll");
                }
            })
        }
    }
}

function array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }
    return false;
}
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
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'  title=\"授权\" value=\"" + row.guid + "\" onclick=\"showGrantPanel('" + row.orggroupname + "','" + row.orggroupcode + "','role')\" operate=\"edit\"></i>";
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
            "url": "/userRegister/selectChildrenList",
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
                showGrantPanel(null, null, "user");
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
                    return "<i class=\"glyphicon glyphicon-edit\" style='cursor: pointer'  title=\"授权\" value=\"" + row.guid + "\" onclick=\"showGrantPanel('" + row.clientname + "','" + row.clientcode + "','user')\" operate=\"edit\"></i>";

                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-th-list\" style='cursor: pointer'  title=\"全部权限\" value=\"" + row.guid + "\" onclick=\"showGrantDetailsPanel('" + row.clientcode + "')\" operate=\"edit\"></i>";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-arrow-down\" style='cursor: pointer'  title=\"权限下载\" value=\"" + row.guid + "\" onclick=\"showDevicesPanel('" + row.clientcode + "')\"></i>";
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

    $("#btnactiveAccessSave").click(function () {
        SaveActiveAccess();
    })

    $("#btnDevPermissSave").click(function () {
        selectedAllDevice();
    })

    initTree(0);

    usermultiInit();

});

var grantType = "role";

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
                    var data = eval(json.data);
                    $.each(data, function (i) {
                        if (this.flag)
                            $("<option selected='selected' value='" + this.clientcode + "'>" + this.clientname + "</option>").appendTo("#userSelected")
                        else
                            $("<option value='" + this.clientcode + "'>" + this.clientname + "</option>").appendTo("#userSelected")
                    })
                    $('#userSelected').multiSelect('refresh');
                }
            },
            error: function (result) {
            }
        });
        $("#clientModal").modal();
    }
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

function usermultiInit() {
    $('#userSelected').multiSelect({
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
        },
        afterDeselect: function () {
            this.qs1.cache();
            this.qs2.cache();
        }
    });
}

function devicesInit() {
    $('#devSelected').multiSelect({
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
        },
        afterDeselect: function () {
            this.qs1.cache();
            this.qs2.cache();
        }
    });
}

function pspanel(groupIDlist) {
    // var arr = $('#activeSelected').multiSelect('deselect_all');
    var tree = $("#tree").treeview("getSelected")[0];
    var sn = tree.sn;

    $("#activeSelectedAll").children().each(function (i) {
        if ($(this).attr("sn") == sn)
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
                object.text("【" + tree.text + "】" + object.text());
                object.appendTo("#activeSelectedAll");
            }
        })
    }
}

function array_contain(array, obj) {
    for (var i = 0; i < array.length; i++) {
        if (array[i] == obj)//如果要求数据类型也一致，这里可使用恒等号===
            return true;
    }
    return false;
}

function SaveAccess() {
    var JsonData = {};
    var clientCodes = [];
    var options = $("#userSelected").val();
    if (null != options) {
        for (var i = 0; i < options.length; i++) {
            var clientCode = {};
            clientCode.clientcode = options[i];
            clientCodes.push(clientCode);
        }
    }
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

//保存
function save() {
    var nodes = $('#tree').treeview('getChecked');
    var arr = new Array();
    if (nodes.length > 0) {
        var obj = null;
        $(nodes).each(function () {
            if (this.nodes == undefined || this.nodes == null) {
                obj = new Object();
                obj.guid = getGuid();
                if (grantType == "role") {
                    obj.accessgroupcode = $("#hidCode").val();
                } else {
                    obj.clientcode = $("#hidCode").val();
                }
                obj.activecode = this.id;
                arr.push(obj);
            }
        })
    }
    var data = new Object();
    data.code = $("#hidCode").val();
    data.type = grantType;
    data.list = arr;
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": JSON.stringify(data)},
        url: "/active/access/insert",
        success: function (msg) {
            $("#grantModal").modal('hide');
            modals.info("授权成功");
        },
        error: function (msg) {
            $("#grantModal").modal('hide');
            modals.info("授权失败");
        }
    });

}

var grantclientcode = null;
var grantclientname = null;

function showGrantPanel(name, code, type) {
    grantType = type;
    if (null == code) {
        var table = null;
        var row = null;
        if (type == "user") {
            table = $('#tbGridUser').DataTable();
            row = $("#tbGridUser").find("tbody tr input[type='checkbox']:checked").eq(0);
        } else {
            table = $('#tbGridRole').DataTable();
            row = $("#tbGridRole").find("tbody tr input[type='checkbox']:checked").eq(0);
        }
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row).closest('tr')).data();
            grantclientcode = type == "user" ? tds.clientcode : tds.orggroupcode;
            grantclientname = type == "user" ? tds.clientname : tds.orggroupname;
        }
    } else {
        grantclientcode = code;
        grantclientname = name;
    }

    bandTree(grantclientcode);
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

var accessTable = null;

/*
* 显示授权页面
* */
function showGrantDetailsPanel(code) {
    if (null != accessTable) {
        accessTable.fnClearTable();    //清空数据
        accessTable.fnDestroy();       //销毁datatable
    }
    accessTable = $("#tbAccessDetails").dataTable({
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
            "url": "/active/selectAllAccess",
            "cache": false,
            "data": function (data) {
                data.clientcode = code;
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
        "columns": [
            {
                "data": null, "orderable": false, "render":
                    function (row) {
                        return "<input type=\"checkbox\" id=\"" + row.guid + "\">"
                    }
            },
            {"data": "clientname"},
            {"data": "clientcode"},
            {"data": "devicename"},
            {"data": "sn"},
            {"data": "devicetypename"},
            {"data": "activename"},
            {"data": "creator"},
            {
                "data": "createtime", "render": function (strDate) {
                    return dateFtt("yyyy年MM月dd日 hh:mm:ss", new Date(strDate));
                }
            }
        ]
    });
    $("#grantDetailsModal").modal({height: "100%"});
}

/*
* 保存功能点授权
* */
function SaveActiveAccess() {

    var tree = $("#tree").treeview("getSelected")[0];
    if ("CN1002" == tree.code) {
        var JsonData = {}
        JsonData.sn = tree.sn;
        JsonData.clientcode = grantclientcode;
        JsonData.timegroup = $("#ddlTimeGroup").val();
        $.ajax({
            dateType: "json",
            type: "POST",
            contentType: 'application/json',
            async: false,
            url: "/device/addTimeGroup/",
            data: JSON.stringify(JsonData),
            success: function (result) {
                var result = JSON.parse(result)
                if (!result.result)
                    modals.info(result.msg);
            },
            error: function (json) {
            }
        });
    }
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
    JsonData.clientcode = grantclientcode;
    JsonData.clientname = grantclientname;
    var nodes = $('#tree').treeview('getChecked');
    var arr = new Array();
    if (nodes.length > 0) {
        var obj = null;
        $(nodes).each(function () {
            obj = new Object();
            obj.guid = getGuid();
            obj.sn = this.sn;
            obj.devicecode = this.id;
            arr.push(obj);
        })
    }
    JsonData.list = arr;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/active/AddActiveAccess",
        data: {"JsonData": JSON.stringify(JsonData)},
        success: function (result) {
            var result = JSON.parse(result)
            if (result.result && grantType != "role")
                downLoadPermission(grantclientcode);
            else
                modals.info(result.msg);
            $("#grantModal").modal('hide');
        },
        error: function (json) {

        }
    });
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
            dateType: "json",
            type: "GET",
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
            datatype: "json",
            async: false,
            url: "/Access/checkcode",
            data: {"JsonData": $("#orgGroupCode").val()},
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
        url: "../Access/Add",
        contentType: 'application/json',
        data: JSON.stringify(JsonData),
        success: function (result) {
            var result = JSON.parse(result)
            if (result.result) {
                $("#editModal").modal('hide');
                $("#tbGridRole").dataTable().fnDraw(false);
            } else
                modals.info(result.msg);
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

/*
* 全选按钮
* */
function SelectAll(ckb) {
    var talbe = $(ckb).closest('table');
    var ckbs = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
}

/*
* 初始化功能点树
* */
function initTree(selectNodeId) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/selectTreeByClientCode",
        success: function (data) {
            treeData = data;
        },
        error: function (data) {
        }
    });
    $("#tree").treeview({
        data: treeData,
        showBorder: true,
        showCheckbox: true,
        showIcon: false,
        levels: 3,
        onNodeSelected: function (event, data) {
            if (data.state.checked) {
                InitActiveFun(data.code, data.sn);
                if (data.code == "CN1002") {
                    var tree = $("#tree").treeview("getSelected")[0];
                    var JsonData = {}
                    JsonData.sn = tree.sn;
                    JsonData.clientcode = grantclientcode;
                    $.ajax({
                        dateType: "json",
                        async: false,
                        type: "POST",
                        contentType: 'application/json',
                        url: "/device/selectOneEntity",
                        data: JSON.stringify(JsonData),
                        success: function (result) {
                            var result = JSON.parse(result)
                            $("#ddlTimeGroup").val(result.timegroup).trigger("change");
                            $("#ddlTimeGroup").css({"display": "block"});
                        },
                        error: function (msg) {
                        }
                    });
                } else
                    $("#ddlTimeGroup").css({"display": "none"});
            }
        },
        onNodeChecked: function (event, data) {
            //选中所有子节点
            checkChildren(data, true);
            //点击同时选中
            $("#tree").data('treeview').selectNode(data.nodeId, {silent: true});
            //父节点选中
            checkParent(data, true);
        },
        onNodeUnchecked: function (event, data) {
            checkChildren(data, false);
            checkParent(data, false);
            var options = $("#activeSelectedAll").children().each(function (k) {
                if ($(this).attr("sn") == data.sn)
                    $(this).remove();
            });
        }
    });
}

/*
* 绑定节点
* */
function bandTree(clientCode) {
    $("#hidCode").val(clientCode);
    //默认所以节点未选中
    $('#tree').treeview("uncheckAll");
    //$('#tree').treeview('collapseAll', {silent: true});
    $.ajax({
        dateType: "json",
        async: false,
        type: "GET",
        contentType: 'application/json',
        url: "/device/access/get/" + clientCode,
        success: function (dt) {
            var arr = JSON.parse(JSON.parse(dt).data);
            if (arr.length > 0) checkNodes(arr);
        },
        error: function (msg) {
        }
    });
    $("#grantModal").modal({height: "100%"});
}

/*
* 父节点选中，子节点全部选中
* */
function checkChildren(node, checked) {
    if (node.nodes && node.nodes.length > 0) {
        for (var i = 0; i < node.nodes.length; i++) {
            if (checked)
                $('#tree').treeview('checkNode', [node.nodes[i].nodeId, {silent: true}]);
            else
                $('#tree').treeview('uncheckNode', [node.nodes[i].nodeId, {silent: true}]);
            checkChildren(node.nodes[i], checked);
        }
    }
}

/*
* 子节点选中默认父节点选中
* */
function checkParent(node, checked) {
    var pnode = $('#tree').data('treeview').getParent(node.nodeId);
    if (pnode) {
        if (checked) {
            $('#tree').treeview('checkNode', [pnode.nodeId, {silent: true}]);
            checkParent(pnode, checked);
        } else {
            //查看兄弟节点状态
            var brothers = $('#tree').data('treeview').getSiblings(node.nodeId);
            var flag = true;
            if (brothers && brothers.length > 0) {
                for (var i = 0; i < brothers.length; i++) {
                    if (brothers[i].state.checked) {
                        flag = false;
                    }
                }
            }
            if (flag) {
                $('#tree').treeview('uncheckNode', [pnode.nodeId, {silent: true}]);
                checkParent(pnode, checked);
            }
        }

    }
}

/*
* 设置选中的节点
* */
function checkNodes(arr) {
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            var node = $("#tree").data('treeview').findNodes(arr[i].sn, 'i', 'sn');
            $(node).each(function () {
                if ((this).sn == arr[i].sn) {
                    $("#tree").data('treeview').checkNode(this, {silent: true});
                    checkParent(this, true);
                }
            });
        }
    }
}

/*
* 初始化所有有权限的功能点
* */
function InitActiveFun(typeCode, sn) {
    var JsonData = {};
    JsonData.sn = sn;
    JsonData.typecode = typeCode;
    JsonData.clientcode = grantclientcode;
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
                    $("#activeSelected").append('<option clientcode="' + grantclientcode + '" sn="' + sn + '" value="' + this.activecode + '">' + this.activename + '</option>');
                else
                    $("#activeSelected").append('<option clientcode="' + grantclientcode + '" sn="' + sn + '" selected="selected" value="' + this.activecode + '">' + this.activename + '</option>');
            });
            $('#activeSelected').multiSelect('refresh');
        },
        error: function (data) {
        }
    });
}

function showDevicesPanel(clientcode) {
    devicesInit();
    $.ajax({
        datetype: "json",
        async: false,
        url: "/device/selectListByClientCode/" + clientcode,
        success: function (json) {
            json = JSON.parse(json);
            var jsonArr = eval(json);
            $("#devSelected").empty();
            $.each(jsonArr, function (i) {
                if (!this.flag)
                    $("#devSelected").append('<option clientcode="' + clientcode + '" value="' + this.sn + '">' + this.devicename + '</option>');
                else
                    $("#devSelected").append('<option clientcode="' + clientcode + '" selected="selected" value="' + this.sn + '">' + this.devicename + '</option>');
            });
            $('#devSelected').multiSelect('refresh');
        },
        error: function (data) {
        }
    });
    grantclientcode = clientcode;
    $("#grantDevicesModal").modal({height: "100%"});
}

function selectedAllDevice() {
    var devices = [];
    var options = $("#devSelected").val();
    if (null != options) {
        for (var i = 0; i < options.length; i++) {
            devices.push(options[i]);
        }
    }
    downLoadPermission(grantclientcode, devices);
}

/*
* 下载权限
* */
function downLoadPermission(clientcode, devices) {
    if (null == clientcode || "" == clientcode) {
        modals.info("请选择人员");
        return false;
    } else {
        $.ajax({
            datetype: "json",
            async: false,
            url: "/userRegister/downloadPermission/" + clientcode,
            data: {"devices": JSON.stringify(devices)},
            success: function (result) {
                var result = JSON.parse(result);
                var arrData = eval(result.data);
                if (result.result) {
                    if (arrData.length > 0)
                        modals.info(result.data);
                    else
                        modals.info("用户权限为空");
                } else
                    modals.info(result.msg);
            },
            error: function (data) {
            }
        });
    }
}
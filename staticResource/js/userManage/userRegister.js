var deftrouterule = '/{device}/{company}/{publish}';
$(function () {
    $("#btnDevPermissSave").click(function () {
        selectedAllDevice();
    })
    var tables = $("#PersonnelList").dataTable({
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
            {
                "data": null, "width": "60px", render: function (row) {
                    if (undefined != row.logo)
                        return "<img style='margin-left:15px' width='50px' height='50px' src=" + row.logo + " class=\"img-circle\" alt=\"User Image\">";
                    else
                        return "<img style='margin-left:15px' width='50px' height='50px' src=\".././staticResource/image/login-user.png\" class=\"img-circle\" alt=\"User Image\">";
                }
            },
            {"data": "clientname"},
            {"data": "loginname"},
            {"data": "clientcode"},
            {"data": "phone"},
            {"data": "address"},
            {"data": "routerule"},
            {"data": "rolename"},
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-edit\"  style='cursor: pointer'  title=\"编辑\" value=\"" + row.guid + "\" onclick=\"editRowData(this)\" operate=\"edit\"></i>&nbsp;&nbsp;<i class=\"glyphicon glyphicon-trash\"  style='cursor: pointer' title=\"删除\" value=\"" + row.guid + "\" onclick=\"delRowData(this)\"></i>";
                }
            },
            {
                "data": null, "render": function (row) {
                    return "<i class=\"glyphicon glyphicon-arrow-down\" style='cursor: pointer'  title=\"权限下载\" value=\"" + row.guid + "\" onclick=\"showDevicesPanel('" + row.clientcode + "')\"></i>";
                }
            }
        ]
    });
    $('input[type="checkbox"].square').iCheck({
        checkboxClass: 'icheckbox_square-grey'
    });
    $("#txtRouterule").val(deftrouterule);
    $("input[name='routerule']").on("ifChecked", function () {
        var dft = "/{device}/{company}";
        var chkboxs = $("#divRouterule").find("input");
        var cnum = 0;
        $(chkboxs).each(function () {
            if ($(this).prop("checked")) {
                dft += "/{" + $(this).val() + "}";
                cnum++;
            }
        });
        if (cnum > 0) {
            $("#txtRouterule").val(dft);
        } else {
            $("#txtRouterule").val(deftrouterule);
        }
    });
    $("input[name='routerule']").on("ifUnchecked", function () {
        var dft = "/{device}/{company}";
        var chkboxs = $("#divRouterule").find("input");
        var cnum = 0;
        $(chkboxs).each(function () {
            if ($(this).prop("checked")) {
                dft += "/{" + $(this).val() + "}";
                cnum++;
            }
        });
        if (cnum > 0) {
            $("#txtRouterule").val(dft);
        } else {
            $("#txtRouterule").val(deftrouterule);
        }
    });

    initCertificateType();
    initProvince();
    initCity();
    initRole();
    initStatus();
    laydate.render({
        elem: '#starttime',
        type: 'datetime'
    });
    laydate.render({
        elem: '#endtime',
        type: 'datetime'
    });

    var form = $("#userRegisterForm").form();
    //初始化校验
    $('#userRegisterForm').bootstrapValidator({
        message: '请输入有效值',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, functionform, submitButton) {
            Save();
        },
        fields: {
            loginname: {
                validators: {
                    notEmpty: {
                        message: '请输入用户名称'
                    }
                }
            },
            clientcode: {
                validators: {
                    notEmpty: {
                        message: '请输入企业编码'
                    }
                }
            }
        }
    });
    form.initComponent();
});

var cardList = null;

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

function initRole() {
    $.ajax({
        url: "/Role/selectList",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (result) {
            var arr = [];
            for (var i = 0; i < result.data.length; i++) {
                var obj = new Object();
                obj.id = result.data[i].rolecode;
                obj.text = result.data[i].rolename;
                arr.push(obj);
            }
            $("#ddlRoleCode").select2({
                width: 195,
                data: arr,
                placeholder: "- - 请选择角色 - -",
                allowClear: false
            });
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
}

function initProvince() {
    $.ajax({
        url: "/baseMenu/selectDictByPK/116",
        type: "get",
        dataType: "json",
        data: "data",
        success: function (data) {
            $("#ddlProvince").select2({
                width: 195,
                data: data,
                placeholder: "- - 省份 - -",
                allowClear: true
            });
            $("#ddlProvince").on("select2:select", function () {
                var data = $(this).val();
                initCity(data);
            });
        },
        error: function (data) {
            modals.info("加载失败");
        }
    });
}

function initCity(data) {
    if (null == data) {
        $("#ddlCity").select2({
            width: 195,
            data: null,
            placeholder: "- - 市区 - -",
            allowClear: true
        });
    } else {
        $("#ddlCity").empty();
        $.ajax({
            url: "/baseMenu/selectDictByPK/" + data,
            type: "get",
            dataType: "json",
            data: "data",
            success: function (data) {
                $("#ddlCity").select2({
                    width: 195,
                    data: data,
                    placeholder: "- - 市区 - -",
                    allowClear: true
                });
            },
            error: function (data) {
                modals.info("加载失败");
            }
        });
    }
}

function showFormPanel() {
    clearValue();
    $("#editModal").modal();
}

function editRowData(row) {
    var table = $("#PersonnelList").DataTable();
    if (undefined != row) {
        var tds = table.row($(row).closest('tr')).data();
        setValue(tds);
    } else {
        var row = $("#PersonnelList").find("tbody tr input[type='checkbox']:checked").eq(0);
        if (0 == row.length) {
            modals.info("请选择一条记录");
            return false;
        } else {
            var tds = table.row($(row).closest('tr')).data();
            setValue(tds);
        }
    }
    if (null != cardList) {
        cardList.fnClearTable();    //清空数据
        cardList.fnDestroy();       //销毁datatable
    }
    cardList = initCardList(tds.clientcode);
    $("#editModal").modal();
}

function delRowData(row) {
    var ids = [];
    if (undefined == row) {

        $("#PersonnelList").find("tbody tr input[type='checkbox']:checked").each(function (i) {
            ids.push($(this).attr("id"));
        })
        if (ids.length == 0) {
            modals.info("请选择一条记录");
            return false;
        }
    } else {
        var table = $('#PersonnelList').DataTable();
        var tds = table.row($(row).closest('tr')).data();
        ids.push(tds.guid);
    }
    modals.confirm("确认删除", function () {
        var JsonData = {}
        JsonData.guid = "'" + ids.join("','") + "'";
        $.ajax({
            dataType: "json",
            async: false,
            url: "../userRegister/deleteMore",
            data: {"JsonData": JSON.stringify(JsonData)},
            success: function (result) {
                var result = JSON.parse(result)
                if (result.result)
                    $("#PersonnelList").dataTable().fnDraw(false);
                else
                    modals.info(result.msg);
            },
            error: function (result) {
            }
        });
    });
}

function Save() {
    var JsonData = {};
    JsonData.guid = $("#guid").val();
    JsonData.clientname = $("#clientname").val();
    JsonData.clientcode = $("#clientcode").val();
    JsonData.password = $("#password").val();
    JsonData.loginname = $("#loginname").val();
    JsonData.address = $("#address").val();
    JsonData.phone = $("#phone").val();
    JsonData.province = $("#ddlProvince").val() == null ? 0 : $("#ddlProvince").val();
    JsonData.city = $("#ddlCity").val() == null ? 0 : $("#ddlProvince").val();
    JsonData.logo = $("#logoaddress").val();
    JsonData.pem = $("#pem").val();
    JsonData.remark = $("#remark").val();
    JsonData.rolecode = $("#ddlRoleCode").val();
    JsonData.routerule = $("#txtRouterule").val();
    $.ajax({
        dataType: "json",
        async: false,
        type: "POST",
        contentType: 'application/json',
        url: "/userRegister/Add",
        data: JSON.stringify(JsonData),
        success: function (result) {
            if (result.result) {
                $("#logo").fileinput("reset");
                $("#editModal").modal('hide');
                $("#PersonnelList").dataTable().fnDraw(false);
            } else
                modals.info(result.msg);
        },
        error: function (result) {
        }
    });
}

function setValue(rowObject) {
    $("#checkcode").val(rowObject.clientcode);
    $("#guid").val(rowObject.guid);
    $("#clientname").val(rowObject.clientname);
    $("#clientcode").val(rowObject.clientcode);
    $("#clientcode").attr('disabled', true);
    $("#loginname").val(rowObject.loginname);
    $("#password").val(rowObject.password);
    $("#password").attr('disabled', true);
    $("#address").val(rowObject.address);
    $("#ddlProvince").val(rowObject.province).trigger("change");
    initCity(rowObject.province);
    $("#ddlCity").val(rowObject.city).trigger("change");
    $("#pem").val(rowObject.pem);
    $("#phone").val(rowObject.phone);
    $("#remark").val(rowObject.remark);
    $("#ddlRoleCode").val(rowObject.rolecode).trigger("change");

    $("#txtRouterule").val(rowObject.routerule);
    $("#divRouterule input").iCheck("uncheck");
    if (rowObject.routerule) {
        $("#divRouterule input").each(function () {
            if (rowObject.routerule.indexOf($(this).val()) > 0) {
                $(this).iCheck("check");
            }
        });
    } else {
        $("#txtRouterule").val(deftrouterule);
    }
}

function clearValue() {
    $("#checkcode").val("");
    $("#guid").val("");
    $("#clientname").val("");
    $("#clientcode").val("");
    $("#clientcode").attr('disabled', false);
    $("#loginname").val("");
    $("#password").val("");
    $("#password").attr('disabled', false);
    $("#address").val("");
    $("#phone").val("");
    $("#pem").val("");
    $("#remark").val("");
    $("#divRouterule input").iCheck("uncheck");
    $("#cardlist").children("tbody").empty();
}

function SelectList(ckb) {
    var talbe = $(ckb).closest('table');
    var ckds = talbe.find("tbody tr input[type='checkbox']");
    var isCk = $(ckb).prop("checked");
    $(ckbs).each(function () {
        $(this).prop('checked', isCk);
    })
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

/************************以下暂时不使用******************************/

$("#logo").fileinput({
    theme: "zh",
    uploadUrl: "/paramset/upload",
    type: 'POST',
    enctype: 'multipart/form-data',
    showPreview: false,
    isAjaxUpload: true,
    maxFileCount: 1,
    browseClass: "btn btn-success",
    allowedFileExtensions: ["jpg", "jpeg", "gif", "png"],
    elErrorContainer: "#logo_errorBlock",
    showCancel: false,
    showUpload: false,
    showRemove: false,
    uploadExtraData: {folder: "face"}
});
$("#logo").on('fileselect', function (event, numFiles, label) {
    $("#logo").fileinput('upload');
});
$("#logo").on('fileuploaded', function (event, data, previewId, index) {
    $("#logo").fileinput({
        uploadExtraData: {folder: "face", filename: ""}
    })
    var serveraddress = data.response.serveraddress;
    var substr = serveraddress.substr(serveraddress.indexOf("uploadfile") + 11);
    $("#logoname").val(data.response.clientaddress);
    $("#logoaddress").val(substr);
});
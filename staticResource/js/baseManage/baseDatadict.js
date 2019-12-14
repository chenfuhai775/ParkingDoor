//初始化form表单
var form = null;
var winId = 'iconWin';
$(function () {
    form = $('#function-form').form();
    initTree(0);
    //初始化校验
    $('#function-form').bootstrapValidator({
        message: '请输入有效值',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        submitHandler: function (validator, functionform, submitButton) {
            //Save Data，对应'submit-提交'

            var params = form.getFormSimpleData();
            var obj = {};
            obj.parentmodelkey = params.parentid ? params.parentid : '0';
            if (params.guid) {
                obj.guid = params.guid;
            }
            obj.modelkey = params.id;
            obj.modelname = params.text;
            obj.sortno = params.sortno;
            obj.remark = params.remark;
            obj.icon = params.icon;
            obj.modelvalue = params.code;

            modals.confirm('确认保存？', function () {
                $.ajax({
                    dateType: "json",
                    type: "POST",
                    async: false,
                    data: JSON.stringify(obj),
                    contentType: 'application/json',
                    url: "/base/insertDatadict",
                    success: function (data) {
                        var selectedArr = $("#tree").data("treeview").getSelected();
                        var selectedNodeId = selectedArr.length > 0 ? selectedArr[0].nodeId : 0;
                        initTree(selectedNodeId);
                    },
                    error: function (data) {
                    }
                });
            });
        },
        fields: {
            text: {
                validators: {
                    notEmpty: {
                        message: '请输入名称'
                    }
                }
            },

            sortno: {
                validators: {
                    notEmpty: {
                        message: '请输入排序号'
                    }
                }
            }
        }
    });
    form.initComponent();
    //按钮事件
    var btntype = null;
    $('button[data-btn-type]').click(function () {
        var action = $(this).attr('data-btn-type');
        var selectedArr = $("#tree").data("treeview").getSelected();
        var selectedNode = selectedArr.length > 0 ? selectedArr[0] : null;
        switch (action) {
            case 'addRoot':
                formWritable(action);
                form.clearForm();
                $("#icon_i").removeClass();
                //填充上级菜单和层级编码
                fillParentAndLevelCode(null);
                btntype = 'add';
                break;
            case 'add':
                if (!selectedNode) {
                    modals.info('请先选择上级菜单');
                    return false;
                }
                formWritable(action);
                form.clearForm();
                $("#icon_i").removeClass();
                //填充上级菜单
                fillParentAndLevelCode(selectedNode);
                btntype = 'add';
                break;
            case 'edit':
                if (!selectedNode) {
                    modals.info('请先选择要编辑的节点');
                    return false;
                }
                if (btntype == 'add') {
                    fillDictForm(selectedNode);
                }
                formWritable(action);
                btntype = 'edit';
                break;
            case 'delete':
                if (!selectedNode) {
                    modals.info('请先选择要删除的节点');
                    return false;
                }
                if (btntype == 'add')
                    fillDictForm(selectedNode);
                formReadonly();
                $(".box-header button[data-btn-type='delete']").removeClass("btn-default").addClass("btn-primary");
                if (selectedNode.nodes) {
                    modals.info('该节点含有子节点，请先删除子节点');
                    return false;
                }
                modals.confirm('是否删除该节点', function () {
                    $.ajax({
                        dateType: "json",
                        async: false,
                        type: "GET",
                        url: "/base/deleteDatadict/" + selectedNode.guid,
                        success: function (data) {
                            var rst = JSON.parse(data);
                            if (!rst.result)
                                modals.info(rst.msg);
                            //定位
                            var brothers = $("#tree").data("treeview").getSiblings(selectedNode);
                            if (brothers.length > 0)
                                initTree(brothers[brothers.length - 1].nodeId);
                            else {
                                var parent = $("#tree").data("treeview").getParent(selectedNode);
                                initTree(parent ? parent.nodeId : 0);
                            }
                        },
                        error: function (data) {
                        }
                    });

                });
                break;
            case 'cancel':
                if (btntype == 'add')
                    fillDictForm(selectedNode);
                formReadonly();
                break;
            case 'selectIcon':
                var disabled = $(this).hasClass("disabled");
                if (disabled)
                    break;
                var iconName;
                if ($("#icon").val())
                    iconName = encodeURIComponent($("#icon").val());
                modals.openWin({
                    winId: winId,
                    title: '图标选择器（双击选择）',
                    width: '1000px',
                    height: '100%',
                    overflow: 'scroll',
                    url: "/select/icon"
                });
                break;
        }
    });
})

function initTree(selectNodeId) {
    var treeData = null;
    $.ajax({
        datetype: "json",
        async: false,
        data: {"JsonData": JSON.stringify({guid: null})},
        url: "/base/selectDatadict",
        success: function (data) {
            treeData = data;
        },
        error: function (data) {
        }
    });
    var tree = $("#tree").treeview({
        data: treeData,
        showBorder: true,
        expandIcon: "glyphicon glyphicon-plus",
        collapseIcon: "glyphicon glyphicon-minus",
        levels: 1,
        onNodeSelected: function (event, data) {
            fillDictForm(data);
            formReadonly();
        }
    });
    if (treeData.length == 0)
        return;
    //默认选中第一个节点
    selectNodeId = selectNodeId || 0;
    $("#tree").data('treeview').selectNode(selectNodeId);
    $("#tree").data('treeview').expandNode(selectNodeId);
    $("#tree").data('treeview').revealNode(selectNodeId);
}

//新增时，带入父级菜单名称id,自动生成levelcode
function fillParentAndLevelCode(selectedNode) {
    $("input[name='parentname']").val(selectedNode ? selectedNode.text : '菜单类型');
    if (selectedNode) {
        $("input[name='parentid']").val(selectedNode.id);
        var nodes = selectedNode.nodes;
        var sortno = nodes ? nodes[nodes.length - 1].sortno : null;
        $("input[name='sortno']").val(getNextCode(selectedNode.sortno + "", sortno, 1));
    } else {
        var parentNode = $("#tree").data("treeview").getNode(0);
        var sortno = "10";
        if (parentNode) {
            var brothers = $("#tree").data("treeview").getSiblings(0);
            if (brothers.length > 0)
                sortno = brothers[brothers.length - 1].sortno;
        }
        $("input[name='sortno']").val(getNextCode("", sortno, 1));
    }
}

//填充form
function fillDictForm(node) {
    form.clearForm();

    if (node && node.guid) {
        $.ajax({
            dateType: "json",
            async: false,
            type: "GET",
            url: "/base/getDatadict/" + node.guid,
            success: function (data) {
                var result = JSON.parse(data);
                form.initFormData(JSON.parse(result.data));
            },
            error: function (data) {
                form.initFormData(node);
            }
        });
    }
    fillBackIconName(node.icon);
}

//设置form为只读
function formReadonly() {
    //所有文本框只读
    $("input[name],textarea[name]").attr("readonly", "readonly");
    //隐藏取消、保存按钮
    $("#function-form .box-footer").hide();
    //还原新增、编辑、删除按钮样式
    $(".box-header button").removeClass("btn-primary").addClass("btn-default");
    //选择图标按钮只读
    $("#selectIcon").addClass("disabled");
    //还原校验框
    if ($("function-form").data('bootstrapValidator'))
        $("function-form").data('bootstrapValidator').resetForm();
}

function formWritable(action) {
    $("input[name],textarea[name]").removeAttr("readonly");
    $("#function-form .box-footer").show();
    $(".box-header button").removeClass("btn-primary").addClass("btn-default");
    $("#selectIcon").removeClass("disabled");
    if (action)
        $(".box-header button[data-btn-type='" + action + "']").removeClass("btn-default").addClass("btn-primary");
}

//回填图标
function fillBackIconName(icon_name) {
    $("#icon").val(icon_name);
    $("#icon_i").removeClass().addClass("form-control-feedback").addClass(icon_name);
}

//数字判断
function checkNumber(theObj) {
    var reg = /^[0-9]+.?[0-9]*$/;
    if (reg.test(theObj)) {
        return true;
    }
    return false;
}
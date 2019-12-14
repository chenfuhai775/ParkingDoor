<!DOCTYPE html>
<!--
This is a starter template page. Use this page to start your new project from
scratch. This page gets rid of all links and provides the needed markup only.
-->
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>设备云平台</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="stylesheet" href="../staticResource/adminlte/common/font-awesome/css/font-awesome.min.css">

    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <link rel="stylesheet" href="../staticResource/adminlte/dist/css/AdminLTE.min.css">
    <link rel="stylesheet" href="../staticResource/adminlte/dist/css/skins/_all-skins.css">
    <link rel="stylesheet" href="../staticResource/adminlte/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" type="text/css"
          href="../staticResource/adminlte/plugins/datatables/dataTables.bootstrap.css  "/>
    <link rel="stylesheet" type="text/css" href="../staticResource/adminlte/plugins/select2/select2.min.css  "/>

    <script src="../staticResource/adminlte/plugins/jQuery/jquery-2.2.3.min.js"></script>
    <script src="../staticResource/adminlte/bootstrap/js/bootstrap.js"></script>
    <script src="../staticResource/adminlte/dist/js/adminlte.min.js"></script>
    <script src="../staticResource/adminlte/plugins/select2/select2.full.min.js"></script>
    <script src="../staticResource/adminlte/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../staticResource/adminlte/plugins/datatables/dataTables.bootstrap.min.js"></script>
    <script src="../staticResource/adminlte/plugins/laydate/laydate.js"></script>
    <script src="../staticResource/adminlte/plugins/inputmask/jquery.inputmask.js"></script>
    <script src="../staticResource/adminlte/plugins/inputmask/jquery.inputmask.extensions.js"></script>

<#--treeview 插件-->
    <link href="../staticResource/adminlte/plugins/treeview/css/bootstrap-treeview.min.css" rel="stylesheet"
          type="text/css"/>
    <script src="../staticResource/adminlte/plugins/treeview/js/bootstrap-treeview.min.js"></script>


    <script src="../staticResource/js/base-form.js"></script>
    <script src="../staticResource/js/base-model.js"></script>
    <script src="../staticResource/js/bootstrap-validator.js"></script>
    <script src="../staticResource/js/icheck.min.js"></script>
    <script src="../staticResource/js/base.js"></script>

<#--fileupload 插件-->
    <link href="../staticResource/adminlte/plugins/fileupload/css/fileinput.css" media="all" rel="stylesheet"
          type="text/css"/>
    <link href="../staticResource/adminlte/plugins/fileupload/themes/explorer-fa/theme.css" rel="stylesheet"
          type="text/css"/>
<#--fileupload 插件-->
    <script src="../staticResource/adminlte/plugins/fileupload/js/plugins/sortable.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/fileinput.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/locales/zh.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/locales/es.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/themes/fa/theme.js"></script>

    <link rel="stylesheet" type="text/css" href="../staticResource/adminlte/plugins/iCheck/all.css"/>
    <script src="../staticResource/adminlte/plugins/iCheck/icheck.min.js"></script>

    <script src="../staticResource/adminlte/plugins/laydate/laydate.js"></script>
    <link rel="stylesheet" type="text/css" href="../staticResource/css/nav_bm.css"/>
    <style type="text/css">
        #control-sidebar-tab-main2 .box {
            border-top: 1px solid #d2d6de57;
        }
    </style>
</head>
<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to get the
desired effect
|---------------------------------------------------------|
| SKINS         | skin-blue                               |
|               | skin-black                              |
|               | skin-purple                             |
|               | skin-yellow                             |
|               | skin-red                                |
|               | skin-green                              |
|---------------------------------------------------------|
|LAYOUT OPTIONS | fixed                                   |
|               | layout-boxed                            |
|               | layout-top-nav                          |
|               | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->
<body class="hold-transition skin-blue sidebar-mini">
<div class="wrapper">
    <header class="main-header">

        <!-- Logo -->
        <a href="index2.html" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>A</b>LT</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Admin</b>LTE</span>
        </a>

        <!-- Header Navbar -->
        <nav class="navbar navbar-static-top" role="navigation">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <!-- Navbar Right Menu -->
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Messages: style can be found in dropdown.less-->
                    <li class="dropdown messages-menu">
                        <!-- Menu toggle button -->

                        <ul class="dropdown-menu">
                            <li class="header">You have 4 messages</li>
                            <li>
                                <!-- inner menu: contains the messages -->
                                <ul class="menu">
                                    <li><!-- start message -->
                                        <a href="#">
                                            <div class="pull-left">
                                                <!-- User Image -->
                                                <img src="../adminlte/dist/img/user2-160x160.jpg" class="img-circle"
                                                     alt="User Image">
                                            </div>
                                            <!-- Message title and timestamp -->
                                            <h4>
                                                Support Team
                                                <small><i class="fa fa-clock-o"></i> 5 mins</small>
                                            </h4>
                                            <!-- The message -->
                                            <p>Why not buy a new awesome theme?</p>
                                        </a>
                                    </li>
                                    <!-- end message -->
                                </ul>
                                <!-- /.menu -->
                            </li>
                            <li class="footer"><a href="#">See All Messages</a></li>
                        </ul>
                    </li>
                    <!-- /.messages-menu -->

                    <!-- Notifications Menu -->
                    <li class="dropdown notifications-menu">
                        <!-- Menu toggle button -->

                        <ul class="dropdown-menu">
                            <li class="header">You have 10 notifications</li>
                            <li>
                                <!-- Inner Menu: contains the notifications -->
                                <ul class="menu">
                                    <li><!-- start notification -->
                                        <a href="#">
                                            <i class="fa fa-users text-aqua"></i> 5 new members joined today
                                        </a>
                                    </li>
                                    <!-- end notification -->
                                </ul>
                            </li>
                            <li class="footer"><a href="#">View all</a></li>
                        </ul>
                    </li>
                    <!-- Tasks Menu -->
                    <li class="dropdown tasks-menu">
                        <!-- Menu Toggle Button -->

                        <ul class="dropdown-menu">
                            <li class="header">You have 9 tasks</li>
                            <li>
                                <!-- Inner menu: contains the tasks -->
                                <ul class="menu">
                                    <li><!-- Task item -->
                                        <a href="#">
                                            <!-- Task title and progress text -->
                                            <h3>
                                                Design some buttons
                                                <small class="pull-right">20%</small>
                                            </h3>
                                            <!-- The progress bar -->
                                            <div class="progress xs">
                                                <!-- Change the css width attribute to simulate progress -->
                                                <div class="progress-bar progress-bar-aqua" style="width: 20%"
                                                     role="progressbar"
                                                     aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                                                    <span class="sr-only">20% Complete</span>
                                                </div>
                                            </div>
                                        </a>
                                    </li>
                                    <!-- end task item -->
                                </ul>
                            </li>
                            <li class="footer">
                                <a href="#">View all tasks</a>
                            </li>
                        </ul>
                    </li>
                    <!-- User Account Menu -->
                    <li class="dropdown user user-menu">
                        <!-- Menu Toggle Button -->
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <!-- The user image in the navbar-->
                            <img src="../${usr.logo!}" class="user-image" alt="User Image">
                            <!-- hidden-xs hides the username on small devices so only the image appears. -->
                            <span class="hidden-xs">${usr.clientname!}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- The user image in the menu -->
                            <li class="user-header">
                                <img src="../${usr.logo!}" class="img-circle" alt="User Image">

                                <p>
                                    Alexander Pierce - Web Developer
                                    <small>Member since Nov. 2012</small>
                                </p>
                            </li>
                            <!-- Menu Body -->
                            <li class="user-body">
                                <div class="row">
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Followers</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Sales</a>
                                    </div>
                                    <div class="col-xs-4 text-center">
                                        <a href="#">Friends</a>
                                    </div>
                                </div>
                                <!-- /.row -->
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat">设置</a>
                                </div>
                                <div class="pull-right">
                                    <a id="existSytem" class="btn btn-default btn-flat">退出登录</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                    <!-- Control Sidebar Toggle Button -->
                    <li>
                        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <!-- Sidebar user panel (optional) -->
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="../${usr.logo!}" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>${usr.clientname!}</p>
                    <!-- Status -->
                    <a href="../${usr.logo!}"><i class="fa fa-circle text-success"></i> Online</a>
                </div>
            </div>

            <!-- search form (Optional) -->
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
              <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
              </button>
            </span>
                </div>
            </form>
            <!-- /.search form -->

            <!-- Sidebar Menu -->
            <!-- Sidebar Menu -->
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">菜单栏</li>
            </ul>
            <!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                设备管理
                <small>列表</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="../index"><i class="fa fa-dashboard"></i>首页</a></li>
                <li class="active">设备管理</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <!-- Profile Image -->
                    <div class="box box-primary">
                        <div class="box-body box-profile">

                            <h4><strong><i class="fa fa-university"></i>${Session["usr"]["clientname"]?default("公司")}
                            </strong></h4>
                            <div id="tree" class="treeview" style="max-height: 720px;overflow: auto">
                            </div>
                        </div>
                        <!-- /.box-body -->
                    </div>
                    <!-- /.box -->
                </div>
                <div class="col-md-9">
                    <form id="formAll">
                        <div class="nav-tabs-custom">
                            <ul id="maintab" class="nav nav-tabs">
                                <li class="active"><a href="#control-sidebar-tab-main1" data-toggle="tab">
                                    <h4>基础信息</h4>
                                </a></li>
                                <li><a href="#control-sidebar-tab-main2" onclick="deviceSetTab()" data-toggle="tab">
                                    <h4>设备配置</h4>
                                </a></li>
                            </ul>
                            <div class="tab-content" style="padding: 0;margin: 0px">
                                <div id="control-sidebar-tab-main1"
                                     class="tab-pane form-group content container-fluid active">
                                    <section class="content container-fluid">
                                        <div class="box box-primary">
                                            <div class="box-body">
                                                <div class="form-group">
                                                <#--<div class="btn-group" id="funcHeader">-->
                                                <#--<button type="button" class="btn btn-default" data-btn-type="addRoot"><li class="fa fa-plus">&nbsp;新增根字典</li></button>-->
                                                <#--<button type="button" class="btn btn-default" data-btn-type="add"><li class="fa fa-plus">&nbsp;新增下级字典</li></button>-->
                                                <#--<button type="button" class="btn btn-default" data-btn-type="edit"><li class="fa fa-edit">&nbsp;编辑当前字典</li></button>-->
                                                <#--<button type="button" class="btn btn-default" data-btn-type="delete"><li class="fa fa-remove">&nbsp;删除当前字典</li></button>-->
                                                <#--</div>-->
                                                </div>
                                                <input type="hidden" id="hdGuid">
                                                <input type="hidden" id="hdPid">
                                                <table id="function-form" class="table table-hover"
                                                       style="overflow: visible;">
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">父节点</i>
                                                                </div>
                                                                <input type="text" class="form-control" id="parentname"
                                                                       name="parentname" placeholder="根节点">

                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">类型</i>
                                                                </div>
                                                                <select id="ddldevType" class="form-control select2 "
                                                                        style="width:100%;height:100%"></select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">SN</i>
                                                                </div>
                                                                <input type="text" class="form-control" id="txtSn"
                                                                       name="sn" placeholder="序号" readonly="readonly"
                                                                       data-bv-field="sn">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">名称</i>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                       id="txtDeviceName" name="devicename"
                                                                       placeholder="设备名称" readonly="readonly">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">主题</i>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                       id="txtdeviceTopic" name="devicetopic"
                                                                       placeholder="设备主题" readonly="readonly">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">IP</i>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                       id="txtIPAddress" name="ipaddress"
                                                                       placeholder="设备IP" data-inputmask="'alias': 'ip'"
                                                                       readonly="readonly">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">端口</i>
                                                                </div>
                                                                <input type="text" class="form-control"
                                                                       id="txtDevicePort" name="deviceport"
                                                                       placeholder="设备端口" readonly="readonly">
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <div class="input-group">
                                                                <div class="input-group-addon" style="text-align: left">
                                                                    <i class="fa fa-tag" style="width: 70px">节点类型</i>
                                                                </div>
                                                                <select id="ddlSingle" class="form-control select2 "
                                                                        style="width:100%;height:100%"></select>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>

                                            </div>
                                            <div class="box-footer" id="funcFooter" style="display:none">
                                                <div class="text-center">
                                                    <button type="button" class="btn btn-default"
                                                            data-btn-type="cancel">
                                                        <i class="fa fa-reply">&nbsp;取消</i>
                                                    </button>
                                                    <button type="button" id="btnSaveDevInfo" class="btn btn-primary">
                                                        <i class="fa fa-save">&nbsp;保存</i>
                                                    </button>
                                                </div>
                                            </div>
                                            <!-- /.box-body -->
                                        </div>
                                    </section>
                                </div>
                                <div id="control-sidebar-tab-main2" class="tab-pane form-group  container-fluid">
                                    <div id="CN1001" style="display: block" class="nav-tabs-custom">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <!--修改设备ip-->
                                            <div id="control-sidebar-tab1-1"
                                                 class="tab-pane form-group  heightlimit container-fluid active">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i> 修改设备地址</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>新IP地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_01_ipaddress" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>子网掩码</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_01_maskaddress" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>网关地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_01_gateway" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="Save()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="commandChangeIPaddress()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--修改服务器地址-->
                                            <div id="control-sidebar-tab1-2"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>修改服务器地址</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>新服务器地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_02_service" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveService()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendService()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--恢复出厂设置-->
                                            <div id="control-sidebar-tab1-3"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>恢复出厂设置</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>设备版本</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_03_version" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveVersion()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendVersion()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--设备校时-->
                                            <div id="control-sidebar-tab1-4"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>设备校时</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>服务器时间</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <div class="layui-input-inline">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   id="CN1001_04_timing"
                                                                                   placeholder="yyyy-MM-dd hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveTiming()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendTiming()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--修改MAC地址-->
                                            <div id="control-sidebar-tab1-5"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>修改MAC地址</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>新MAC地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_05_macaddr" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveMacaddr()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendMacaddr()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--下载时间组权限-->
                                            <div id="control-sidebar-tab1-7"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>下载时间组权限</h3>
                                                    </div>
                                                    <div class="box-body" id="timeGroupDiv">
                                                        <table name="dategroup" class="table table-bordered">
                                                            <tr>
                                                                <td colspan="6">
                                                                    第1组
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                            <#--<td class="col-sm-1" style="vertical-align: middle" rowspan="4" name="serialnum"></td>-->
                                                                <td class="col-sm-1">有效时段</td>
                                                                <td class="col-sm-4">
                                                                    <div class="input-group">
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107Date
                                                                                   id="CN1001_07_00_stardate"
                                                                                   name="CN1001_07_stardate"
                                                                                   placeholder="yyyy-MM-dd">
                                                                        </div>
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107Date
                                                                                   id="CN1001_07_00_enddate"
                                                                                   name="CN1001_07_enddate"
                                                                                   placeholder="yyyy-MM-dd">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td class="col-sm-1">时间段1</td>
                                                                <td class="col-sm-5">
                                                                    <div class="input-group">
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_starttime1"
                                                                                   name="CN1001_07_starttime1"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_endtime1"
                                                                                   name="CN1001_07_endtime1"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td rowspan="4" style="vertical-align: middle"
                                                                    id="tdBtn">
                                                                    <h4>
                                                                        <i class="fa fa-plus-square"
                                                                           onclick="addTimeGroupRow(this)"></i>
                                                                        &nbsp;&nbsp;
                                                                        <i class="fa fa-trash"
                                                                           onclick="delTimeGroupRow(this)"></i>
                                                                    </h4>

                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>时间段2</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text" width="100px"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_starttime2"
                                                                                   name="CN1001_07_starttime2"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text" width="100px"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_endtime2"
                                                                                   name="CN1001_07_endtime2"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>时间段3</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_starttime3"
                                                                                   name="CN1001_07_starttime3"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                        <div class="layui-input-inline col-sm-6">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   CN100107DateTime
                                                                                   id="CN1001_07_00_endtime3"
                                                                                   name="CN1001_07_endtime3"
                                                                                   placeholder="hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>限制类型</td>
                                                                <td colspan="3" style="vertical-align: middle">
                                                                    <div class="btn-group col-sm-12"
                                                                         data-toggle="buttons" name="CN1001_07_isweek">
                                                                        <label onclick="changeGroup(this)"
                                                                               class="btn btn-default">
                                                                            <input type="radio" value="0">按日控制
                                                                        </label>
                                                                        <label onclick="changeGroup(this)"
                                                                               class="btn btn-default active">
                                                                            <input type="radio" value="1">按周控制
                                                                        </label>
                                                                        <label onclick="changeGroup(this)"
                                                                               class="btn btn-default">
                                                                            <input type="radio" value="2">按月控制
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>时间段</td>
                                                                <td colspan="3" style="vertical-align: middle">
                                                                    <div name="CN1001_07_timegroup"
                                                                         class="btn-group col-sm-10">
                                                                    </div>
                                                                    <div name="CN1001_07_timegroupholiday"
                                                                         class="btn-group col-sm-10">
                                                                        <div class="col-sm-3" id="ddldiv">
                                                                            <select id="CN1001_08_00_opentimepower"
                                                                                    name="CN1001_8_select"
                                                                                    class="form-control select2 "
                                                                                    style="width:100%;height:100%"></select>

                                                                        </div>
                                                                        <div class="col-sm-6">
                                                                            <input id="CN1001_08_0_HolidayPower"
                                                                                   type="text"
                                                                                   name="CN1001_8_input"
                                                                                   class="form-control col-sm-8"
                                                                                   readonly="readonly">
                                                                        </div>
                                                                        <div class="col-sm-3">
                                                                            <div class="input-group">
                                                                                <input type="text"
                                                                                       class="form-control layui-input"
                                                                                       id="CN1001_08_0_laydate"
                                                                                       name="CN1001_8_selectDate"
                                                                                       placeholder="yyyy-MM-dd">
                                                                                <div class="input-group-addon">
                                                                                    <i class="fa fa-calendar"></i>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>

                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveDowntimepower()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendDowntimepower()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--下载人脸信息-->
                                            <div id="control-sidebar-tab1-9"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>下载人脸信息</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td class="col-sm-2">姓名</td>
                                                                <td class="col-sm-4">
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_name" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td class="col-sm-2">工号(可空)</td>
                                                                <td class="col-sm-4">
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_jobnumber" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td>用户类型</td>
                                                                <td>
                                                                    <div class="btn-group" id="CN1001_09_subjecttype"
                                                                         data-toggle="buttons">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype1" value="0"
                                                                                   checked="checked">员工
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype2" value="1">访客
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype3" value="2">VIP访客
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>性别</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1001_09_gender">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="gender"
                                                                                   checked="checked"
                                                                                   id="gender1" value="1"
                                                                                   checked="checked">男
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="gender"
                                                                                   id="gender2"
                                                                                   value="2">女
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="gender"
                                                                                   id="gender3"
                                                                                   value="0">未知
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>部门(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_department" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>职位(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_title" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>手机(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_phone" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>邮箱(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_email" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>有效开始时间</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <div class="layui-input-inline">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   id="CN1001_09_starttime"
                                                                                   placeholder="yyyy-MM-dd hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>有效结束时间</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <div class="layui-input-inline">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   id="CN1001_09_endtime"
                                                                                   placeholder="yyyy-MM-dd hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>受访人(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_interviewee" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>受访单位(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_comefrom" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                            <tr>
                                                                <td>签名(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_description" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>备注(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_09_remark" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>头像(可空)</td>
                                                                <td>
                                                                    <input id="CN1001_09_avatar" class="form-control"
                                                                           type="file" multiple>
                                                                    <input type="hidden"
                                                                           id="CN1001_09_avatar_clientAddress"/>
                                                                    <input type="hidden"
                                                                           id="CN1001_09_avatar_serverAddress"/>
                                                                    <div id="errorBlock" class="help-block"></div>
                                                                </td>
                                                                <td>人脸图片</td>
                                                                <td>
                                                                    <input id="CN1001_09_facepic" class="form-control"
                                                                           type="file" multiple>
                                                                    <input type="hidden"
                                                                           id="CN1001_09_facepic_clientAddress"/>
                                                                    <input type="hidden"
                                                                           id="CN1001_09_facepic_serverAddress"/>
                                                                    <div id="errorBlock" class="help-block"></div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveDownfaceinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendDownfaceinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!--更新人脸信息-->
                                            <div id="control-sidebar-tab1-10"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>更新人脸信息</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>人脸ID</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_faceid" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>工号(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_jobnumber" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>姓名</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_name" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>用户类型</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1001_10_subjecttype">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype1" value="0"
                                                                                   checked="checked">员工
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype2" value="1">访客
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="subjecttype"
                                                                                   id="subjecttype3" value="2">VIP访客
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>部门(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_department" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>性别</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1001_10_gender">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="gender"
                                                                                   id="gender1"
                                                                                   value="1" checked="checked">男
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="gender"
                                                                                   id="gender2"
                                                                                   value="2">女
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="gender"
                                                                                   id="gender3"
                                                                                   value="0">未知
                                                                        </label>
                                                                    </div>
                                                                </td>

                                                            </tr>
                                                            <tr>

                                                                <td>职位(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_title" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>签名(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_description" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>有效开始时间</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <div class="layui-input-inline">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   id="CN1001_10_starttime"
                                                                                   placeholder="yyyy-MM-dd hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td>有效结束时间</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <div class="layui-input-inline">
                                                                            <input type="text"
                                                                                   class="form-control layui-input"
                                                                                   id="CN1001_10_endtime"
                                                                                   placeholder="yyyy-MM-dd hh:mm:ss">
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>手机(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_phone" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>邮箱(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_email" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>受访人(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_interviewee" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>受访单位(可空)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1001_10_comefrom" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>头像(可空)</td>
                                                                <td>
                                                                    <input id="CN1001_10_avatar" class="form-control"
                                                                           type="file" multiple>
                                                                    <input type="hidden"
                                                                           id="CN1001_10_avatar_clientAddress"/>
                                                                    <input type="hidden"
                                                                           id="CN1001_10_avatar_serverAddress"/>
                                                                    <div id="errorBlock" class="help-block"></div>
                                                                </td>
                                                                <td>人脸图片</td>
                                                                <td>
                                                                    <input id="CN1001_10_facepic" class="form-control"
                                                                           type="file" multiple>
                                                                    <input type="hidden"
                                                                           id="CN1001_10_facepic_clientAddress"/>
                                                                    <input type="hidden"
                                                                           id="CN1001_10_facepic_serverAddress"/>
                                                                    <div id="errorBlock" class="help-block"></div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>备注(可空)</td>
                                                                <td colspan="3">
                                                        <textarea id="CN1001_10_remark" class="form-control" rows="3">
                                                        </textarea>
                                                                </td>
                                                            </tr>

                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SaveUpdatefaceinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendUpdatefaceinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Create the tabs -->
                                        <ul id="grantTab" class="nav nav-tabs-b">
                                            <li class="active"><a href="#control-sidebar-tab1-1"
                                                                  activecode="changedevip" data-toggle="tab">
                                                <h5>修改设备IP</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-2" activecode="changeservice"
                                                   data-toggle="tab">
                                                <h5>修改服务器地址</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-3" activecode="initdev"
                                                   data-toggle="tab">
                                                <h5>恢复出厂设置</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-4" activecode="timeing"
                                                   data-toggle="tab">
                                                <h5>设备校时</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-5" activecode="changemac"
                                                   data-toggle="tab">
                                                <h5>修改MAC地址</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-7" activecode="downtimepower"
                                                   data-toggle="tab">
                                                <h5>下载时间组权限</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-9" activecode="downfaceinfo"
                                                   data-toggle="tab">
                                                <h5>下载人脸信息</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab1-10" activecode="updatefaceinfo"
                                                   data-toggle="tab">
                                                <h5>更新人脸信息</h5>
                                            </a></li>
                                        </ul>
                                    </div>
                                    <div id="CN1002" style="display: none" class="nav-tabs-custom">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <div id="control-sidebar-tab2-1"
                                                 class="tab-pane form-group heightlimit container-fluid active">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>下发开门指令</h3>
                                                    </div>
                                                    <div class="box-body">

                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SendOpenDoornum()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;开门
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="control-sidebar-tab2-2"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>设置通道参数</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>通道编号</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <select id="CN1002_02_doorno"
                                                                                name="CN1002_02_doorno"
                                                                                style="width: 100%"></select>
                                                                    </div>
                                                                </td>
                                                                <td>时间组编号</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <select id="CN1002_02_timegroup"
                                                                                name="CN1002_02_timegroup"
                                                                                style="width: 100%"></select>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>门是否启用标志</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1002_02_doorflag">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="doorflag"
                                                                                   id="doorflag"
                                                                                   checked="checked" value="1">是
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="doorflag"
                                                                                   id="doorflag"
                                                                                   value="0">否
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>开门超时</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <input id="CN1002_02_opendoortimeout"
                                                                               type="text"
                                                                               class="form-control" value="5">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>是否启用首卡开门</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1002_02_isfirstcard">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="isfirstcard"
                                                                                   checked="checked" value="1">是
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="isfirstcard"
                                                                                   value="0">否
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td>首卡刷卡有效时间(单位秒)</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <input id="CN1002_02_firstcardtime" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>是否启用多卡开门</td>
                                                                <td colspan="3">
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1002_02_ismulticard">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="ismulticard"
                                                                                   checked="checked" value="1">是
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="ismulticard"
                                                                                   value="0">否
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>多卡开门人数</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <input id="CN1002_02_multicardnum" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                                <td>多卡有效时间（单位秒）</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <input id="CN1002_02_multicardtime" type="text"
                                                                               class="form-control">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>开门模式</td>
                                                                <td>
                                                                    <div class="btn-group" data-toggle="buttons"
                                                                         id="CN1002_02_opendoormode">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" name="opendoormode"
                                                                                   checked="checked" value="0">刷卡
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="opendoormode"
                                                                                   value="1">密码
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="opendoormode"
                                                                                   value="2">刷卡+密码
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                                <td class="col-sm-2">凭证类型</td>
                                                                <td class="col-sm-4">
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-tag"></i>
                                                                        </div>
                                                                        <select multiple="multiple"
                                                                                id="CN1002_02_certificatetype"
                                                                                style="width: 100%"></select>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="SavePassinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-ok">
                                                                &nbsp;保存
                                                            </button>
                                                            &nbsp;
                                                            <button onclick="SendPassinfo()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Create the tabs -->
                                        <ul id="grantTab" class="nav nav-tabs-b">
                                            <li class="active"><a href="#control-sidebar-tab2-1" activecode="opendoor"
                                                                  data-toggle="tab">
                                                <h5>下发开门指令</h5>
                                            </a></li>
                                            <li><a href="#control-sidebar-tab2-2" activecode="setpassinfo"
                                                   data-toggle="tab">
                                                <h5>设置通道参数</h5>
                                            </a></li>
                                        </ul>
                                    </div>
                                    <div id="CN1003" style="display: none" class="nav-tabs-custom">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <!--14、人脸识别相机设置-->
                                            <div id="control-sidebar-tab3-1"
                                                 class="tab-pane form-group heightlimit container-fluid active">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i> 人脸识别相机</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>主机地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1003_01_boxipaddress" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                                <td>主机端口</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input type="number"
                                                                               oninput="if(value.length>7)value=value.slice(0,7)"
                                                                               class="form-control" id="CN1003_01_boxport">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>摄像机地址</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1003_01_cameraipaddress" type="text"
                                                                               class="form-control"
                                                                               data-inputmask="'alias': 'ip'"
                                                                               data-mask="">
                                                                    </div>
                                                                </td>
                                                                <td>摄像机端口</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input type="number"
                                                                               oninput="if(value.length>7)value=value.slice(0,7)"
                                                                               class="form-control" id="CN1003_01_cameraport">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>用户名</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1003_01_username" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                                <td>密码</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1003_01_password" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="commandCreatefacedev()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;下发
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Create the tabs -->
                                        <ul id="grantTab" class="nav nav-tabs-b">
                                            <li class="active"><a href="#control-sidebar-tab3-1"
                                                                  activecode="createfacedev" data-toggle="tab">
                                                <h5>人脸识别相机</h5>
                                            </a></li>
                                        </ul>
                                    </div>
                                    <div id="CN1004" style="display: none" class="nav-tabs-custom">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <!--LED信息下载-->
                                            <div id="control-sidebar-tab1-1"
                                                 class="tab-pane form-group heightlimit container-fluid active">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>LED信息下载</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>屏幕序号</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1004_01_lednum" type="number"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>序列号</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1004_01_sn" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>显示类型</td>
                                                                <td>
                                                                    <div class="btn-group col-sm-3"
                                                                         data-toggle="buttons"
                                                                         id="CN1004_01_type" name="CN1004_01_type">
                                                                        <label class="btn btn-default active">
                                                                            <input type="radio" value="1" name="type"
                                                                                   checked="checked">固定
                                                                        </label>
                                                                        <label class="btn btn-default">
                                                                            <input type="radio" name="type" value="2">临时
                                                                        </label>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>临时显示时长</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1004_01_duration" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>显示次数</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1004_01_dptimes" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>显示内容</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1004_01_ledstring" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="commandShowLed()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;显示LED
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                        <!-- Create the tabs -->
                                        <ul id="grantTab" class="nav nav-tabs-b">
                                            <li class="active"><a href="#control-sidebar-role-tab" data-toggle="tab">
                                                <h5>LED信息下载</h5>
                                            </a></li>
                                        </ul>
                                    </div>
                                    <div id="CN1005" style="display: none" class="nav-tabs-custom">
                                        <!-- Tab panes -->
                                        <div class="tab-content">
                                            <!--语音播放-->
                                            <div id="control-sidebar-tab5-1"
                                                 class="tab-pane form-group heightlimit container-fluid active">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i> 语言播放</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>播放内容</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1005_01_soundstring" type="text"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="commandPlaySound()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;播放语言
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div id="control-sidebar-tab5-2"
                                                 class="tab-pane form-group heightlimit container-fluid">
                                                <div class="box">
                                                    <div class="box-header with-border">
                                                        <h3 class="box-title"><i class="fa fa-tag"></i>音量设置</h3>
                                                    </div>
                                                    <div class="box-body">
                                                        <table class="table table-bordered table-hover "
                                                               style="overflow: visible;">
                                                            <tr>
                                                                <td>音量设置</td>
                                                                <td>
                                                                    <div class="input-group">
                                                                        <div class="input-group-addon">
                                                                            <i class="fa fa-laptop"></i>
                                                                        </div>
                                                                        <input id="CN1005_01_volumn" type="number"
                                                                               placeholder="音量范围(0-10)"
                                                                               class="form-control" data-mask="">
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <div class="box-footer">
                                                        <div class="text-center">
                                                            <button onclick="commandSoundVolumn()" type="button"
                                                                    class="btn btn-default glyphicon glyphicon-save"
                                                                    data-dismiss="modal">&nbsp;设置语音
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <!-- Create the tabs -->
                                        <ul id="grantTab" class="nav nav-tabs-b">
                                            <li class="active"><a activecode="playsound" href="#control-sidebar-tab5-1"
                                                                  data-toggle="tab">
                                                <h5>语言播放</h5>
                                            </a></li>
                                            <li><a activecode="soundvolumn" href="#control-sidebar-tab5-2"
                                                   data-toggle="tab">
                                                <h5>音量设置</h5>
                                            </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Anything you want
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
    </footer>
    <aside class="control-sidebar control-sidebar-dark">
        <!-- Create the tabs -->
        <ul class="nav nav-tabs nav-justified control-sidebar-tabs">
            <li class="active"><a href="#control-sidebar-home-tab" data-toggle="tab"><i class="fa fa-home"></i></a></li>
            <li><a href="#control-sidebar-settings-tab" data-toggle="tab"><i class="fa fa-gears"></i></a></li>
        </ul>
        <!-- Tab panes -->
        <div class="tab-content">
            <!-- Home tab content -->
            <div class="tab-pane active" id="control-sidebar-home-tab">
                <h3 class="control-sidebar-heading">Recent Activity</h3>
                <ul class="control-sidebar-menu">
                    <li>
                        <a href="javascript:;">
                            <i class="menu-icon fa fa-birthday-cake bg-red"></i>

                            <div class="menu-info">
                                <h4 class="control-sidebar-subheading">Langdon's Birthday</h4>

                                <p>Will be 23 on April 24th</p>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- /.control-sidebar-menu -->

                <h3 class="control-sidebar-heading">Tasks Progress</h3>
                <ul class="control-sidebar-menu">
                    <li>
                        <a href="javascript:;">
                            <h4 class="control-sidebar-subheading">
                                Custom Template Design
                                <span class="pull-right-container">
                    <span class="label label-danger pull-right">70%</span>
                  </span>
                            </h4>

                            <div class="progress progress-xxs">
                                <div class="progress-bar progress-bar-danger" style="width: 70%"></div>
                            </div>
                        </a>
                    </li>
                </ul>
                <!-- /.control-sidebar-menu -->

            </div>
            <!-- /.tab-pane -->
            <!-- Stats tab content -->
            <div class="tab-pane" id="control-sidebar-stats-tab">Stats Tab Content</div>
            <!-- /.tab-pane -->
            <!-- Settings tab content -->
            <div class="tab-pane" id="control-sidebar-settings-tab">
                <form method="post">
                    <h3 class="control-sidebar-heading">General Settings</h3>

                    <div class="form-group">
                        <label class="control-sidebar-subheading">
                            Report panel usage
                            <input type="checkbox" class="pull-right" checked>
                        </label>

                        <p>
                            Some information about this general settings option
                        </p>
                    </div>
                    <!-- /.form-group -->
                </form>
            </div>
            <!-- /.tab-pane -->
        </div>
    </aside>
    <div class="control-sidebar-bg"></div>
</div>
<script src="../staticResource/js/commHelper.js"></script>
<script src="../staticResource/js/siderbarMenu.js"></script>
<script src="../staticResource/js/deviceManage/timeGroupPower.js"></script>
<script src="../staticResource/js/deviceManage/deviceParamsSet.js"></script>
</body>
</html>
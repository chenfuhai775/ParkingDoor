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
    <#--<link rel="stylesheet" href="../adminlte/common/Ionicons/css/ionicons.min.css">-->

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
    <link rel="stylesheet" type="text/css"
          href="../staticResource/adminlte/plugins/jqueryMulti/css/multi-select.css  "/>

    <script src="../staticResource/adminlte/plugins/jQuery/jquery-2.2.3.min.js"></script>
    <script src="../staticResource/adminlte/bootstrap/js/bootstrap.js"></script>
    <script src="../staticResource/adminlte/dist/js/adminlte.min.js"></script>
    <script src="../staticResource/adminlte/plugins/select2/select2.full.min.js"></script>
    <script src="../staticResource/adminlte/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../staticResource/adminlte/plugins/datatables/dataTables.bootstrap.min.js"></script>
    <script src="../staticResource/adminlte/plugins/jqueryMulti/js/jquery.multi-select.js"></script>
    <script src="../staticResource/adminlte/plugins/jqueryMulti/js/jquery.quicksearch.js"></script>
    <#--treeview 插件-->
    <link href="../staticResource/adminlte/plugins/treeview/css/bootstrap-treeview.min.css" rel="stylesheet"
          type="text/css"/>
    <script src="../staticResource/adminlte/plugins/treeview/js/bootstrap-treeview.min.js"></script>

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

    <!-- Main Header -->
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
                                                <img src="../staticResource/dist/img/user2-160x160.jpg"
                                                     class="img-circle"
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
                                    <a id="existSytem" class="btn btn-default btn-flat">退出登录</a></div>
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
    <!-- Left side column. contains the logo and sidebar -->
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
            <ul class="sidebar-menu" data-widget="tree">
                <li class="header">设备列表</li>
            </ul>
            <!-- /.sidebar-menu -->
        </section>
        <!-- /.sidebar -->
    </aside>

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
            <h1>
                设备管理
                <small>授权</small>
            </h1>
            <ol class="breadcrumb">
                <li><a href="../index"><i class="fa fa-dashboard"></i>首页</a></li>
                <li class="active">设备管理</li>
            </ol>
        </section>
        <!-- Main content -->
        <section class="content container-fluid">
            <div class="nav-tabs-custom">
                <!-- Create the tabs -->
                <ul id="grantTab" class="nav nav-tabs">
                    <li class="active"><a href="#control-sidebar-user-tab" data-toggle="tab">
                            <h5>用户列表</h5>
                        </a></li>
                    <li><a href="#control-sidebar-role-tab" data-toggle="tab">
                            <h5>权限组</h5>
                        </a></li>
                </ul>
                <!-- Tab panes -->
                <div class="tab-content">
                    <!-- 用户授权 tab content -->
                    <div class="tab-pane active form-group content container-fluid" id="control-sidebar-user-tab">
                        <table id="tbGridUser" class="table table-bordered table-hover dataTable">
                            <thead>
                            <tr>
                                <th aria-sort="none" aria-label="" width="60px">
                                    <input type="checkbox" id="AllChange" onclick="SelectAll(this)"/>全选
                                </th>
                                <th>用户名称</th>
                                <th>企业编码</th>
                                <th>手机</th>
                                <th>地址</th>
                                <th>路由规则</th>
                                <th>角色</th>
                                <th>授权</th>
                                <th>详细</th>
                                <th>权限集合</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                    <!-- 角色授权 tab content -->
                    <div class="tab-pane form-group content container-fluid" id="control-sidebar-role-tab">

                        <table id="tbGridRole" class="table table-bordered table-hover dataTable">
                            <thead>
                            <tr>
                                <th aria-sort="none" aria-label="" width="60px"><input type="checkbox" id="AllChange"
                                                                                       onclick="SelectAll(this)"/>全选
                                </th>
                                <th>组名称</th>
                                <th>组编码</th>
                                <th>是否有效</th>
                                <th>创建人</th>
                                <th>创建时间</th>
                                <th>授权</th>
                                <th>详细</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <div class="modal fade " id="editModal" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 class="modal-title">权限组管理</h4>
                        </div>
                        <div class="modal-body">
                            <table class="table table-bordered"
                                   style="overflow: visible;">
                                <span type="hidden" id="guid"></span>
                                <span type="hidden" id="checkcode"></span>
                                <tr>
                                    <td class="col-sm-2">名称</td>
                                    <td class="col-sm-3">
                                        <input type="text" class="form-control" id="orgGroupName">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="col-sm-2">编码</td>
                                    <td class="col-sm-3">
                                        <input type="text" class="form-control" id="orgGroupCode">
                                    </td>
                                </tr>
                                <tr>
                                    <td class="col-sm-2">备注</td>
                                    <td class="col-sm-3">
                                        <textarea placeholder="备注" class="form-control" rows="6" id="remark"></textarea>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="modal-footer">
                            <button onclick="saveOrg()" type="button" class="btn btn-default glyphicon glyphicon-ok">
                                &nbsp;保存
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-default glyphicon glyphicon-remove"
                                    data-dismiss="modal">&nbsp;关闭
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="grantModal" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" style="width: 1200px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="editModalLabel">设备授权</h4>
                        </div>
                        <input type="hidden" id="hidCode">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-xs-6">
                                    <table id="tbDevInfo" class="table table-bordered table-hover dataTable">
                                        <thead>
                                        <th>SN</th>
                                        <th>设备类型</th>
                                        <th>设备名称</th>
                                        <th>父节点</th>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-xs-6">
                                    <select id='activeSelected' multiple='multiple'></select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xs-6">
                                    <table id="tbDevInfoCheck" class="table table-bordered table-hover dataTable">
                                        <thead>
                                        <th>SN</th>
                                        <th>设备类型</th>
                                        <th>设备名称</th>
                                        <th>父节点</th>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                                <div class="col-xs-6">
                                    <select id="activeSelectedAll" multiple class="form-control"
                                            style="height: 230px">
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <button id="btnSave" type="submit" class="btn btn-default glyphicon glyphicon-save">
                                &nbsp;保存
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-default glyphicon glyphicon-remove"
                                    data-dismiss="modal">&nbsp;关闭
                            </button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <div class="modal fade" id="clientModal" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="editModalLabel">人员授权</h4>
                        </div>
                        <input type="hidden" id="hidCode">
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-sm-5">
                                    <select id="userSelected" multiple class="form-control" style="min-height: 300px">

                                    </select>
                                </div>
                                <div class="col-sm-2" style="min-height: 300px;">
                                    <div style="height: 80px;margin-top: 80px;">
                                        <button onclick="userUnSelect()" type="button" class="btn btn-default"><<--选中
                                        </button>
                                    </div>
                                    <div>
                                        <button onclick="userSelect()" type="button" class="btn btn-default">删除-->>
                                        </button>
                                    </div>
                                </div>
                                <div class="col-sm-5">
                                    <select id="userUnSelected" multiple class="form-control" style="min-height: 300px">

                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button id="btnAccessSave" type="button" class="btn btn-default glyphicon glyphicon-ok">
                                &nbsp;保存
                            </button>
                            &nbsp;
                            <button type="button" class="btn btn-default glyphicon glyphicon-remove"
                                    data-dismiss="modal">&nbsp;关闭
                            </button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
            <div class="modal fade" id="grantTreeModal" role="dialog" aria-labelledby="myModalLabel">
                <div class="modal-dialog" style="width: 800px;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">×</span></button>
                            <h4 class="modal-title" id="editModalLabel">权限集合</h4>
                        </div>
                        <input type="hidden" id="hidCode">
                        <div class="modal-body">
                            <div id="treegrand" class="treeview"></div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default glyphicon glyphicon-remove"
                                    data-dismiss="modal">&nbsp;关闭
                            </button>
                        </div>
                    </div>
                    <!-- /.modal-content -->
                </div>
                <!-- /.modal-dialog -->
            </div>
        </section>
    </div>
    <!-- /.content-wrapper -->

    <!-- Main Footer -->
    <footer class="main-footer">
        <!-- To the right -->
        <div class="pull-right hidden-xs">
            Anything you want
        </div>
        <!-- Default to the left -->
        <strong>Copyright &copy; 2016 <a href="#">Company</a>.</strong> All rights reserved.
    </footer>

    <!-- Control Sidebar -->
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
<script src="../staticResource/js/base-model.js"></script>
<script src="../staticResource/js/deviceManage/deviceGrant.js"></script>
</body>
</html>
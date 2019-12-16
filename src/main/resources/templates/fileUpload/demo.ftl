<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">

    <link rel="stylesheet" href="../staticResource/adminlte/common/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="../staticResource/adminlte/common/Ionicons/css/ionicons.min.css">
    <link rel="stylesheet" href="../staticResource/adminlte/bootstrap/css/bootstrap.min.css">
    <#--fileupload 插件-->
    <link href="../staticResource/adminlte/plugins/fileupload/css/fileinput.css" media="all" rel="stylesheet"
          type="text/css"/>
    <link href="../staticResource/adminlte/plugins/fileupload/themes/explorer-fa/theme.css" rel="stylesheet"
          type="text/css"/>

    <script src="../staticResource/adminlte/plugins/jQuery/jquery-2.2.3.min.js"></script>
    <script src="../staticResource/adminlte/bootstrap/js/bootstrap.min.js"></script>

    <#--fileupload 插件-->
    <script src="../staticResource/adminlte/plugins/fileupload/js/plugins/sortable.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/fileinput.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/locales/zh.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/js/locales/es.js"></script>
    <script src="../staticResource/adminlte/plugins/fileupload/themes/fa/theme.js"></script>
</head>
<div class="container">
    <#--文件上传 bengin-->
    <div class="row form-group">
        <div class="file-loading">
            <input id="input-fa" name="input-fa" type="file" class="file">
        </div>
    </div> <#--文件上传 end-->
</div>
<script src="../staticResource/js/commHelper.js"></script>
<script src="../staticResource/js/fileUpload/fileupload.js"></script>
</html>


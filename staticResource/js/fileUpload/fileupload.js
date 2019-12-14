$("#input-fa").fileinput({
    theme: "fa",
    uploadUrl: "/file/upload",
    enctype: 'multipart/form-data',
    browseClass: "btn btn-success",
    removeClass: "btn btn-danger",
    uploadClass: "btn btn-info",
    isAjaxUpload:true,
    minFileCount: 1,
    maxFileCount :1,
    uploadExtraData : function() {  //传递参数
        return {"id":"1"} ;
    }
});
// //上传前
// $('#input-fa').on('filepreupload', function(event, data, previewId, index) {
//     var form = data.form;
//
// });
// $('#input-fa').on('fileuploaded', function(event, data, previewId, index) {
//     var form = data.form, files = data.files, extra = data.extra,
//         response = data.response, reader = data.reader;
//     console.log('File uploaded triggered');
// });
// $('#input-fa').on('filebatchuploadsuccess', function(event, data) {
//     var form = data.form, files = data.files, extra = data.extra,
//         response = data.response, reader = data.reader;
//     console.log('File batch upload success');
// });
// $('#input-fa').on('fileloaded', function(event, file, previewId, index, reader) {
//     console.log("fileloaded");
// });
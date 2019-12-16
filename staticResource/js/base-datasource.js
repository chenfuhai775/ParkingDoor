/*!
 * BaseDataSource.
 */
(function ($, window, document, undefined) {
    'use strict';
    var BaseDataSource = function () {

    };

    BaseDataSource.prototype.getDictList = function (code) {
        var dict = null;
        var obj = {
            "code": code
        };
        $.ajax({
            type: "post",
            async: false,
            url: basePath + "/dict/getDictsByCode",
            data: obj,
            dataType: "json",
            success: function (data) {
                dict = data;
            },
            error: function () {
                modals.error("瀛楀吀" + code + "鑾峰彇寮傚父,璇锋鏌�");
            }
        });
        return dict;
    };

    /**
     * dictCode 瀛楀吀缂栫爜 callback 鍥炶皟鍑芥暟
     */
    BaseDataSource.prototype.getDict = function (dictCode, callback) {
        if (!dictCode)
            return null;
        var dict = this.getDictList(dictCode);
        if (dict && dict.length > 0 && callback) {
            callback(dict);
        }
    };

    BaseDataSource.prototype.getDataByUrl = function (url, callback) {
        if (!url)
            return null;
        var data = this.getData(url);
        if (data && data.length > 0 && callback) {
            callback(data);
        }
    };


    BaseDataSource.prototype.getData = function (url) {
        if (!url.startWith(basePath))
            url = basePath + url;
        var dict = null;
        $.ajax({
            type: "post",
            async: false,
            url: url,
            data: null,
            dataType: "json",
            success: function (data) {
                dict = data;
            },
            error: function () {
                modals.error("鑾峰彇鏁版嵁寮傚父锛岃妫€鏌�" + url + "鏂规硶");
            }
        });
        return dict;
    };

    window.$dataSource = new BaseDataSource();

})(jQuery, window, document);
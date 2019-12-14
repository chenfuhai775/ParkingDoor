$(function () {
    //window.setInterval(clock_12h, 1000, "");
    // initDevices();
    // initAttachs();
    // CpuChart();
    // memoryChart();
})

function initDevices() {
    var myChart = echarts.init(document.getElementById('main'));
    var name = [];
    var val = [];

    var option = {
        title: {
            text: '设备类型统计',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['设备类型']
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                splitLine: {show: false},//去除网格线
                splitArea: {show: false},//保留网格区域
                type: 'category',
                data: name
            }
        ],
        yAxis: [
            {
                splitLine: {show: false},//去除网格线
                splitArea: {show: false},//保留网格区域
                type: 'value'
            }
        ],
        series: [

            {
                barMaxWidth: 30,//最大宽度
                itemStyle: {
                    normal: {
                        color: function (params) {
                            // build a color map as your need.
                            var colorList = [
                                '#B5C334', '#E87C25', '#27727B',
                                '#FE8463', '#9BCA63', '#F3A43B', '#60C0DD',
                                '#D7504B', '#F0805A', '#26C0C2', '#26D0D2'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                name: '数量',
                type: 'bar',
                data: val,
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [
                        {type: 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };

    setInterval(function () {
        $.ajax({
            dataType: "json",
            async: true,
            url: "/device/statistic",
            success: function (dt) {
                var arr = JSON.parse(dt.data);
                if (arr.length > 0) {
                    name.length = 0;
                    val.length = 0;
                    $(arr).each(function () {
                        name.push(this.name);
                        val.push(this.qty)
                    });
                }
                myChart.setOption(option, true);
            },
            error: function (msg) {
            }
        });

    }, 3000);
}

function initAttachs() {
    var name = [];
    var data = [];
    var option = {
        title: {
            text: '认证统计',
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['接入总数']
        },
        calculable: false,
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                splitLine: {show: false},//去除网格线
                splitArea: {show: false},//保留网格区域
                data: name
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {show: false},//去除网格线
                splitArea: {show: false}//保留网格区域
            }
        ],
        series: [
            {
                name: '设备接入',
                type: 'line',
                stack: '总量',
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data: data
            }
        ]
    };
    var myChart = echarts.init(document.getElementById('attach'));
    setInterval(function () {
        $.ajax({
            dataType: "json",
            async: false,
            url: "/device/attachstatistic",
            success: function (dt) {
                var arr = JSON.parse(dt.data);
                if (arr.length > 0) {
                    name.length = 0;
                    data.length = 0;
                    $(arr).each(function () {
                        name.push(this.name);
                        data.push(this.qty)
                    });
                }
                myChart.setOption(option, true);
            },
            error: function (msg) {
            }
        });


    }, 5000)
}

function CpuChart() {
    var myChart = echarts.init(document.getElementById('cpumain'));
    var name = [];
    var data = [];

    var option = {
        title: {
            text: 'CPU使用率',
        },
        tooltip: {
            trigger: 'axis'
        },
        calculable: false,
        xAxis: [
            {
                type: 'category',
                splitLine: {show: false},//去除网格线
                splitArea: {show: false},//保留网格区域
                boundaryGap: false,
                data: name
            }
        ],
        yAxis: [
            {
                type: 'value',
                splitLine: {show: false},//去除网格线
                splitArea: {show: false}//保留网格区域
            }
        ],
        series: [
            {
                name: 'CPU占用率',
                type: 'line',
                itemStyle: {normal: {areaStyle: {color: '#F3B89D', type: 'default'}, lineStyle: {color: '#FFB981'}}},
                data: data
            }
        ]
    };

    setInterval(function () {
        $.ajax({
            dataType: "json",
            async: true,
            url: "/system/cpustatistic",
            success: function (dt) {
                var arr = JSON.parse(dt.data);
                if (arr.length > 0) {
                    $(arr).each(function () {
                        if (name.length > 30) {
                            name.shift();
                            data.shift();
                        }
                        name.push(this.name);
                        data.push(this.qty)
                    });

                }
                myChart.setOption(option, true);
            },
            error: function (msg) {
            }
        });
    }, 1000);
}

function memoryChart() {
    var myChart = echarts.init(document.getElementById('memoryMain'), "shine");
    var option = {
        title: {
            text: '系统监控',
        },
        tooltip: {
            formatter: "{a}<br/>{b} {c} "
        },
        toolbox: {
            show: false,
            feature: {
                mark: {show: true},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '内存',
                type: 'gauge',
                z: 3,
                min: 0,
                max: 100,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                        width: 10
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 15,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 20,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                title: {
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder',
                        fontSize: 20,
                        fontStyle: 'italic'
                    }
                },
                detail: {
                    formatter: '{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data: [{value: 50, name: '内存使用率'}]
            },
            {
                name: '剩余内存',
                type: 'gauge',
                center: ['20%', '55%'],    // 默认全局居中
                radius: '60%',
                min: 0,
                max: 100,
                endAngle: 45,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#ff4500'], [0.8, '#48b'], [1, '#228b22']],
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    length: 12,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                splitLine: {           // 分隔线
                    length: 10,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 5
                },
                title: {
                    offsetCenter: [0, '-30%'],       // x, y，单位px
                },
                detail: {
                    formatter: '{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontWeight: 'bolder'
                    }
                },
                data: [{value: 50, name: '内存'}]
            },
            {
                name: '连接',
                type: 'gauge',
                center: ['80%', '50%'],    // 默认全局居中
                radius: '55%',
                min: 0,
                max: 100,
                startAngle: 150,
                endAngle: 30,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,
                    length: 10,        // 属性length控制线长
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: 'auto'
                    }
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0' :
                                return 'L';
                            case '50' :
                                return usersqty;
                            case '100' :
                                return 'H';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    show: false
                },
                data: [{value: 50, name: '用户数'}]
            },
            {
                name: '使用率',
                type: 'gauge',
                center: ['80%', '50%'],    // 默认全局居中
                radius: '55%',
                min: 0,
                max: 100,
                startAngle: 325,
                endAngle: 215,
                splitNumber: 10,
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        color: [[0.2, '#228b22'], [0.8, '#48b'], [1, '#ff4500']],
                        width: 8
                    }
                },
                axisTick: {            // 坐标轴小标记
                    show: false
                },
                axisLabel: {
                    formatter: function (v) {
                        switch (v + '') {
                            case '0' :
                                return 'L';
                            case '50' :
                                return diskrate;
                            case '100' :
                                return 'H';
                        }
                    }
                },
                splitLine: {           // 分隔线
                    length: 15,         // 属性length控制线长
                    lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                        color: 'auto'
                    }
                },
                pointer: {
                    width: 2
                },
                title: {
                    show: false
                },
                detail: {
                    formatter: '{value}%',
                    show: false
                },
                data: [{value: 50, name: '磁盘'}]
            }
        ]
    };
    var usersqty = "连接数";
    var diskrate = "磁盘占率";
    setInterval(function () {
        $.ajax({
            dataType: "json",
            async: true,
            url: "/system/deviceruninfo",
            success: function (dt) {
                var arr = JSON.parse(dt.data);
                var memtotal = 0;
                var disktotal = 0;
                var diskuse = 0;
                if (arr.MemTotal && arr.MemFree) {
                    memtotal = arr.MemTotal / 1024 / 1024;
                    disktotal = arr.DiskTotal / 1024;
                    diskuse = ((arr.DiskUsed / 1024) * (100 / disktotal)).toFixed(2);
                }
                usersqty = "连接数\n" + arr.Connects;
                diskrate = "IO使用率\n" + (arr.DiskIO * 100).toFixed(2);
                option.series[0].data[0].value = arr.memUsage == undefined ? 0 : (arr.memUsage * 100).toFixed(2);
                option.series[0].data[0].name = memtotal.toFixed(0) + "G-内存";
                option.series[1].data[0].value = diskuse;
                option.series[1].data[0].name = disktotal.toFixed(0) + "G-硬盘"
                option.series[2].data[0].value = arr.Connects;
                option.series[3].data[0].value = (arr.diskrate * 100).toFixed(2);
                myChart.setOption(option, true);
            },
            error: function (msg) {
            }
        });
    }, 3000);

}
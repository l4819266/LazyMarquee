/**
 * @Author:      ly
 * @Email:       lyhubei123@163.com
 * @Description: 简易实现跑马灯效果，具有丰富的接口API可供调用
 */
(function($) {

    function LazyMarquee(opt, domObj) {
        var thisObj = this;

        //保存滚动浏览的数据
        var _data = new Array();

        //容器dom
        var _marqueeDom;

        //滚动div
        var _innerDom;

        //outer div
        var _outerDom;

        //内容ul节点
        var _ulDom;

        //定时器
        var _inter;

        //默认配置
        var _config = {
            delay: 100,
            loop: true,
            startup: true
        };

        var padding = 5;


        var outerHeight;
        //创建子元素节点
        var _createDom = function() {
            var height = _marqueeDom.height();
            var width = _marqueeDom.width();
            var container = $('<div style="position:relative;width:' + width + 'px;height:' + height + 'px;"></div>');
            var outer = _outerDom = $('<div style="position:absolute;width:' + (width - padding * 2) + ';overflow:hidden;height:' + (height - padding * 2) + 'px;top:' + padding + 'px;left:' + padding + 'px;"></div>').appendTo(container);
            var inner = _innerDom = $('<div style="position:absolute;width:100%;top:0;"></div>').appendTo(outer);
            var ul = _ulDom = $('<ul style="width:100%;list-style-type: none;margin: 0;padding: 0;"></ul>').appendTo(inner);
            for (var i = 0; i < _data.length; i++) {
                ul.append($('<li>' + _data[i] + '</li>'));
            }
            outerHeight = _outerDom.height()
            return container;
        };

        //执行滚动
        var _doScroll = function() {
            var top = parseFloat(_innerDom.css("top").replace("px", ""));
            var bottom = outerHeight - _innerDom.height() - top;
            var childrens = _innerDom.find("li");
            if (bottom < 0) {
                top = top - 1;
            } else {
                //如果循环滚动，继续加入数据
                if (_config.loop) {
                    var newdom = '';
                    for (var i = 0; i < _data.length; i++) {
                        newdom += ('<li>' + _data[i] + '</li>');
                    }
                    _ulDom.append(newdom);
                } else {
                    clearInterval(_inter);
                    _inter = null;
                }
            }
            //如果太高则删除元素
            if (top < -150) {
                //保持当前位置
                _innerDom.css({ "bottom": bottom + "px", "top": "" });
                childrens.eq(0).remove();
                var newtop = outerHeight - bottom - _innerDom.height();
                _innerDom.css({ "top": newtop, "bottom": "" });
            } else {
                _innerDom.css("top", top + "px");
            }
        };

        //初始化操作
        var _init = function(opt, dom) {
            _config = $.extend(_config, opt);
            _marqueeDom = dom;
            _data = opt.data;
            _marqueeDom.append(_createDom());
            if (_config.startup) {
                thisObj.startup();
            }
        };

        _init(opt, domObj);

        //启动
        this.startup = function() {
            if (_inter) {
                clearInterval(_inter);
                _inter = null;
            }
            _inter = setInterval(_doScroll, _config.delay);
        };

        //添加记录
        this.insertAt = function(datas, index) {
            if (!_config.loop) {
                alert("设置为循环滚动才能使用");
            }
            for (var i = 0; i < datas.length; i++) {
                //     if (!_config.loop && !_inter) {
                //         debugger;
                //         //倒数第几个
                //         var dataIndex = index - _data.length;

                //         //dom的索引
                //         var liIndex = _ulDom.children().length + dataIndex;
                //         if (liIndex >= 0) {
                //             $("<li>" + datas[i] + "</li>").insertBefore(_ulDom.children().eq(liIndex));
                //         }
                //     }
                _data.splice(index + i, 0, datas[i]);
            }
        };

        //添加记录到最后
        this.append = function(datas) {
            for (var i = 0; i < datas.length; i++) {
                _ulDom.append($("<li>" + datas[i] + "</li>"));
                _data.push(datas[i]);
            }
            //如果不是循环滚动，并且已经滚动完成则重新启动
            if (!_config.loop && !_inter) {
                thisObj.startup();
            }
        }

        //移除记录
        this.removeAt = function(index, num) {
            num = num || 1;
            if (!_inter) {
                for (var i = num - 1; i >= 0; i--) {
                    //_data倒数的索引
                    var dataIndex = index - _data.length;

                    //dom的索引
                    var liIndex = _ulDom.children().length + dataIndex;

                    //移除dom
                    if (liIndex >= 0) {
                        _ulDom.children().eq(liIndex).remove();
                    }

                    //移除数据
                    _data.splice(index, 1);
                }
            } else {
                _data.splice(index, num);
            }
        };

        //停止
        this.stop = function() {
            clearInterval(_inter);
            _inter = null;
        };
    }

    $.fn.lazymarquee = function(opt) {
        return new LazyMarquee(opt, this);
    };
})(jQuery);

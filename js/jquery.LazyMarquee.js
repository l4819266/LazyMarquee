/**
 * @Author:      ly
 * @Email:       lyhubei123@163.com
 * @Description: 简易实现跑马灯效果，具有丰富的接口API可供调用
 */
(function($) {

    function LazyMarquee(opt, domObj) {
        var thisObj = this;

        //保存滚动浏览的数据
        var _data = [];

        //容器dom
        var _marqueeDom;

        //滚动div
        var _innerDom;

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


        //创建子元素节点
        var _createDom = function() {
            var height = _marqueeDom.height();
            var width = _marqueeDom.width();
            var container = $('<div style="position:relative;width:' + width + 'px;height:' + height + 'px;"></div>');
            var outer = $('<div style="position:absolute;width:' + (width - padding * 2) + ';overflow:hidden;height:' + (height - padding * 2) + 'px;top:' + padding + 'px;left:' + padding + 'px;"></div>').appendTo(container);
            var inner = _innerDom = $('<div style="position:absolute;width:100%;top:0;"></div>').appendTo(outer);
            var ul = _ulDom = $('<ul style="width:100%;list-style-type: none;margin: 0;padding: 0;"></ul>').appendTo(inner);
            for (var i = 0; i < _data.length; i++) {
                ul.append($('<li>' + _data[i] + '</li>'));
            }
            return container;
        };

        //执行滚动
        var _doScroll = function() {
            var top = parseFloat(_innerDom.css("top").replace("px", ""));
            var bottom = parseFloat(_innerDom.css("bottom").replace("px", ""));
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
                } else

                {
                    clearInterval(_inter);
                    _inter = null;
                }
            }
            //如果太高则删除元素
            if (top < -150) {
                //保持当前位置
                _innerDom.css({ "bottom": bottom + "px", "top": "" });
                childrens.eq(0).remove();
                var newtop = _innerDom.css("top");
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

        _init(opt,domObj);

        //启动
        this.startup = function() {
            if (_inter) {
                clearInterval(_inter);
                _inter = null;
            }
            _inter = setInterval(_doScroll, _config.delay);
        };
    }

    $.fn.lazymarquee = function(opt) {
        return new LazyMarquee(opt, this);
    };
})(jQuery);

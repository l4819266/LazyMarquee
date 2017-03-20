/**
 * @Author:      ly
 * @Email:       lyhubei123@163.com
 * @DateTime:    2017-03-13 18:18:30
 * @Description: Description 
 */
(function() {
    if (!jQuery) {
        console.error("缺少jquery的引用");
        return;
    }

    function LazyMarquee(opt) {
        var thisObj = this;

        //保存滚动浏览的数据
        var _data = [];

        //容器dom
        var _marqueeDom;

        //滚动div
        var _innerDom;

        //定时器
        var _inter;

        //默认配置
        var _opt = {
            delay: 0,
            loop: true,
            startup: true,
            data: []
        };

        var padding = 5;


        //创建子元素节点
        var _createDom = function() {
            var height = _marqueeDom.height();
            var width = _marqueeDom.width();
            var container = $('<div style="position:relative;width:' + width + 'px;height:' + height + 'px;"></div>');
            var outer = $('<div style="position:absolute;width:' + (width - padding * 2) + ';overflow:hidden;height:' + (height - padding * 2) + 'px;top:' + padding + 'px;left:' + padding + 'px;"></div>').appendTo(container);
            var inner = _innerDom = $('<div style="position:absolute;width:100%;top:0;"></div>').appendTo(outer);
            var ul = $('<ul style="width:100%;list-style-type: none;margin: 0;padding: 0;"></ul>').appendTo(inner);
            for (var i = 0; i < _opt.data.length; i++) {
                ul.append($('<li>' + _opt.data[i] + '</li>'));
            }
            return container;
        };



        this.init = function() {
            _opt = $.extend(_opt, opt);
            _marqueeDom = this;
            var dom = _createDom();
            _marqueeDom.append(dom);
            if (_opt.startup) {
                thisObj.startup();
            }
        };
        this.startup = function() {
            if (_inter) {
                clearInterval(_inter);
                _inter = null;
            }
            _inter = setInterval(function() {
                var top = parseFloat(_innerDom.css("top").replace("px", ""));
                var bottom = parseFloat(_innerDom.css("bottom").replace("px", ""));
                var childrens = _innerDom.find("li");
                if (bottom < 0) {
                    top = top - 6;
                } else {
                    clearInterval(_inter);
                    _inter = null;
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
            }, 100);
        };
    }

    $.fn.lazymarquee = function(opt) {
        var _marquee;
        if (typeof(opt) == "string") {
            _marquee[opt](arguments.shift());
        } else if (!opt || typeof(opt) == "object") {
            _marquee = new LazyMarquee(opt);
            _marquee.init.call(this);
        }
    };
})();

var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var LabelRenderer = (function (_super) {
    __extends(LabelRenderer, _super);
    function LabelRenderer() {
        var _this = _super.call(this) || this;
        _this.touchChildren = true;
        _this.labelDisplay = new eui.Label();
        _this.addChild(_this.labelDisplay);
        return _this;
    }
    LabelRenderer.prototype.dataChanged = function () {
        // 显示数据中的label
        this.labelDisplay.text = this.data.label;
    };
    return LabelRenderer;
}(eui.ItemRenderer));
__reflect(LabelRenderer.prototype, "LabelRenderer");

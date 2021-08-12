class LabelRenderer extends eui.ItemRenderer{
  private labelDisplay: eui.label;
  constructor() {
    super();
    this.touchChildren = true;
    this.labelDisplay = new eui.Label();
    this.addChild(this.labelDisplay)
  }

  protected dataChanged(){
    // 显示数据中的label
    this.labelDisplay.text = this.data.label
  }
}
//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {
    private myGroup: eui.Group


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise<void>((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {

        // this.myGroup = new eui.Group();
        // this.addChild(this.myGroup);

        // this.myGroup.width = 500;
        // this.myGroup.height = 300;
        // this.myGroup.layout = new eui.BasicLayout();

        // // 绘制矩形用于显示 myGroup的轮廓
        // const outline: egret.Shape = new egret.Shape;
        // outline.graphics.lineStyle(3, 0x00ff00);
        // outline.graphics.lineStyle(3, 0x00ff00);
        // outline.graphics.beginFill(0x000000, 0);
        // outline.graphics.drawRect(0, 0, 500, 300);
        // outline.graphics.endFill();
        // this.myGroup.addChild(outline);

        // 绝对定位
        // for (let i: number = 0; i < 4; i++) {
        //     const btn: eui.Button = new eui.Button();
        //     btn.x = 25 + i * 35;
        //     btn.y = 40 + i * 65;
        //     btn.label = "button" + i;
        //     this.myGroup.addChild(btn)
        // }

        // 居中设置
        // const btn:eui.Button = new eui.Button();
        // btn.label = "This is an egret button";
        // btn.horizontalCenter = 0;
        // btn.verticalCenter = 0;
        // this.myGroup.addChild(btn);

        // 边距设定
        // const btn: eui.Button = new eui.Button();
        // btn.label = "This is an egret button";
        // btn.top = 20;
        // btn.bottom = 20;
        // btn.left = 20;
        // btn.right = 20;
        // this.myGroup.addChild(btn);

        // const btn1: eui.Button = new eui.Button();
        // btn1.label = "button A";
        // const btn2: eui.Button = new eui.Button();
        // btn2.label = "button B";
        // const btn3: eui.Button = new eui.Button();
        // btn3.label = "button C";
        // this.myGroup.addChild(btn1);
        // this.myGroup.addChild(btn2);
        // this.myGroup.addChild(btn3);

        // 水平布局
        // const hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        // hLayout.gap = 10; // 设置子项之间的间距
        // hLayout.paddingTop = 30;
        // hLayout.horizontalAlign = egret.HorizontalAlign.CENTER; // 设置水平对齐方式
        // this.myGroup.layout = hLayout; // 水平布局

        // 垂直布局
        // const vLayout:eui.VerticalLayout = new eui.VerticalLayout();
        // vLayout.gap = 10;
        // vLayout.paddingTop = 30;
        // vLayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        // this.myGroup.layout = vLayout;

        // 网格布局
        // const tLayout: eui.TileLayout = new eui.TileLayout();
        // tLayout.horizontalGap = 10; // 子项之间的水平距离
        // tLayout.verticalGap = 10;// 子项之间的垂直距离
        // tLayout.columnAlign = eui.ColumnAlign.JUSTIFY_USING_WIDTH;
        // tLayout.rowAlign = eui.RowAlign.JUSTIFY_USING_HEIGHT;
        // tLayout.paddingTop = 30;
        // tLayout.paddingBottom = 10;
        // tLayout.paddingLeft = 30;
        // tLayout.paddingRight = 30;
        // tLayout.requestedColumnCount = 2;// 设置两列显示
        // this.myGroup.layout = tLayout; // 网格布局


        // 按钮
        // const button = new eui.Button();
        // button.width = 200;
        // button.height = 200;
        // button.label = "Confirm";
        // button.verticalCenter = 0;
        // button.horizontalCenter = 0;
        // this.myGroup.addChild(button);
        // // button.enabled = false; // 是否禁用
        // // 获取按钮的文本对象
        // // 因为labelDisplay是个接口，需要使用eui.label转换
        // console.log('----', <eui.Label>button.labelDisplay);

        // (<eui.Label>button.labelDisplay).size = 50
        // button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnTouchHandler, this)


        // 复选框
        // const cbx = new eui.CheckBox();
        // cbx.label = "Select 1";
        // this.addChild(cbx);
        // cbx.addEventListener(eui.UIEvent.CHANGE, (event: eui.UIEvent) => egret.log(event.target.selected), this);

        // const cbx2 = new eui.CheckBox();
        // cbx2.label = "Select 2";
        // cbx2.y = 30;
        // this.addChild(cbx2);
        // cbx2.addEventListener(eui.UIEvent.CHANGE, (event: eui.UIEvent) => egret.log(event.target.selected), this);

        // const cbx3 = new eui.CheckBox();
        // cbx3.label = "Select 3";
        // cbx3.y = 60;
        // cbx3.enabled = false; // 禁用
        // this.addChild(cbx3);

        // 单选框 创建一个RadioButtonGroup的实例，并设置到每个单选按钮的group属性上
        // const radioGroup: eui.RadioButtonGroup = new eui.RadioButtonGroup();
        // radioGroup.addEventListener(eui.UIEvent.CHANGE, (event: eui.UIEvent) => {
        //     console.log(event.target.selectedValue);

        // }, this)

        // const rdbtn: eui.RadioButton = new eui.RadioButton();
        // rdbtn.label = 'select 1';
        // rdbtn.value = 1;
        // rdbtn.group = radioGroup;
        // this.addChild(rdbtn);

        // const rdbtn2: eui.RadioButton = new eui.RadioButton();
        // rdbtn2.label = 'select 1';
        // rdbtn2.value = 2;
        // rdbtn2.group = radioGroup;
        // rdbtn2.y = 30;
        // rdbtn2.selected = true;
        // this.addChild(rdbtn2);

        //  状态切换按钮
        // const btn:eui.ToggleSwitch = new eui.ToggleSwitch();
        // btn.label="This is a ToggleSwitch";
        // this.addChild(btn);
        // btn.addEventListener(eui.UIEvent.CHANGE,(ev:eui.UIEvent) => {
        //     console.log(ev.target.selected);
        // },this)

        // 创建一个容器，里面包含一张图片
        // const group = new eui.Group();
        // const img = new eui.Image("resource/bg.jpg");
        // group.addChild(img);
        // // 创建一个scroller
        // const myScroller = new eui.Scroller();
        // // 位置和尺寸的设置是在Scroller上面，而不是容器上面
        // myScroller.width = 200;
        // myScroller.height = 200;
        // // 设置viewport
        // myScroller.viewport = group;
        // this.addChild(myScroller);

        // 数据容器
        // const sourceArr: any[] = [];
        // for (let i = 1; i < 5; i++) {
        //     sourceArr.push({ label: "item" + i })
        // }
        // // 用ArrayCollection包装
        // const myCollection: eui.ArrayCollection = new eui.ArrayCollection(sourceArr);

        // const dataGroup: eui.DataGroup = new eui.DataGroup();
        // dataGroup.dataProvider = myCollection;
        // dataGroup.percentWidth = 100;
        // dataGroup.percentHeight = 100;
        // this.addChild(dataGroup);

        // dataGroup.itemRenderer = LabelRenderer;

        //先创建一个数组
        const sourceArr: any[] = [{ name: "one", value: 1 }, { name: "two", value: 2 }];
        //用 ArrayCollection 包装
        const myCollection: eui.ArrayCollection = new eui.ArrayCollection(sourceArr);
        myCollection.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE, (ev) => {
            console.log('-----数据已改变', ev.kind + "," + ev.target.length);
        }, this);

        const itemData: Object = { name: "three", value: 3 };
        myCollection.addItem(itemData);//相当于push
        myCollection.addItemAt({ name: "han", value: 0 }, 0)

        console.log('-----',myCollection.getItemAt(0));
        

    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: Array<any>): void {
        let parser = new egret.HtmlTextParser();

        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];

            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };

        change();
    }

    private btnTouchHandler(event: egret.TouchEvent): void {
        console.log('------button touched');

    }

}

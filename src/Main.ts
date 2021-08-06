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

        this.myGroup = new eui.Group();
        this.addChild(this.myGroup);

        this.myGroup.width = 500;
        this.myGroup.height = 300;
        this.myGroup.layout = new eui.BasicLayout();

        // 绘制矩形用于显示 myGroup的轮廓
        const outline: egret.Shape = new egret.Shape;
        outline.graphics.lineStyle(3, 0x00ff00);
        outline.graphics.lineStyle(3, 0x00ff00);
        outline.graphics.beginFill(0x000000, 0);
        outline.graphics.drawRect(0, 0, 500, 300);
        outline.graphics.endFill();
        this.myGroup.addChild(outline);

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

        const btn1:eui.Button = new eui.Button();
        btn1.label = "button A";
        const btn2:eui.Button = new eui.Button();
        btn2.label = "button B";
        const btn3:eui.Button = new eui.Button();
        btn3.label = "button C";
        this.myGroup.addChild(btn1);
        this.myGroup.addChild(btn2);
        this.myGroup.addChild(btn3);

        const hLayout:eui.HorizontalLayout = new eui.HorizontalLayout();
        hLayout.gap = 10; // 设置子项之间的间距
        hLayout.paddingTop = 30;
        hLayout.horizontalAlign = egret.HorizontalAlign.CENTER; // 设置水平对齐方式
        this.myGroup.layout = hLayout; // 水平布局



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

}

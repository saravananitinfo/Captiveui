Ext.define("CaptivePortal.view.editor.DropPanelViewController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.dropPanel',
    requires: [
        'CaptivePortal.view.editor.ThemeCol1',
        'CaptivePortal.view.editor.ThemeCol2',
        'CaptivePortal.view.editor.ThemeCol3',
        'CaptivePortal.view.editor.ThemeCol4',
        'CaptivePortal.view.editor.TextWidget',
        'CaptivePortal.view.editor.ImgWidget',
        'CaptivePortal.view.editor.ButtonWidget',
        'CaptivePortal.view.editor.LoginButtonWidget',
        'CaptivePortal.view.editor.HtmlWidget',
        'CaptivePortal.view.editor.ThemeCol2LeftVbox',
        'CaptivePortal.view.editor.ThemeCol2RightVbox'
    ],
	onRender: function(d) {
        var c = new Ext.dd.DropTarget(this.getView().el, {
            ddGroup: d.ddGroup
        });
        c.dataView = this.getView();
        c.notifyDrop = this.notifyDrop;
        c.notifyEnter = this.notifyEnter;
        c.onInvalidDrop = this.onInvalidDrop;
        // c.notifyOver = this.notifyOver;
        c.getChart = this.getChart

        this.fireEvent('saveEditorHtml');
    },
    notifyDrop: function(m, o, n) {
        console.log(".........notifyDrop..........");
        console.log(m);
        console.log(o);
        console.log(n);
        var p = this,
            l = n.groupName;
        // p.dataView.removeAll();
        if (l === "themeGroup") {
            // p.dataView.add({
            //     xtype: n.dragData
            // })
            window.abc = m;
            if(Ext.ComponentQuery.query('#'+m.id)[0].img_prop){
                var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
                editor_canvas.body.dom.style.background = 'url('+n.sourceEl.dataset.imgurl+') no-repeat center';
            }else if(Ext.ComponentQuery.query('#'+m.id)[0].pre_filled_sec){
                CaptivePortal.util.Utility.buildHtml(CaptivePortal.Config.TEMPLATES[n.dragData])
            }else{
                p.dataView.add({
                    xtype: n.dragData
                })
            }
        }else{
            if(l === "widgetGroup"){
                console.log(".......................1")
                // window.ab = p
                var pa = p.dataView.up();
                var indx = p.dataView.up().items.indexOf(p.dataView);
                pa.remove(p.dataView);
                pa.insert(indx, {
                    xtype: n.dragData,
                    // html: n.dragData
                });
            }
        }
        // if (l === "themeGroup") {
        //     var h = n.dragData.id;
        //     var j = p.dataView.add({
        //         xtype: h
        //     });
        //     j.up("dropPanel").controller.lookupReference("durationButtonsPanel").show()
        // } else {
        //     if (l === "widgetGroup") {
        //         var p = this;
        //         p.dataView.add(p.getChart(n.dragData.data));
        //         p.dataView.setStyle("border-style", "solid", "important")
        //     } else {
        //         console.log("Invalid Drop. The grouping of the drag/drop item is not valid.")
        //     }
        // }

    },
    notifyEnter: function() {
        console.log("Drop item entered");
    },
    onInvalidDrop: function() {
        console.log("Invalid drop");
    },
    notifyOver: function(source, e, data){
        console.log(source);
        console.log(e);
        console.log(data);
        console.log("drag over........");
        return "x-dd-drop-ok";
    }
});
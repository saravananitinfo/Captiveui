Ext.define("CaptivePortal.view.editor.ImageWidgetController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.image_widget_controller',
	onRender: function(d){
		console.log(".........calllll.........."+d.ddGroup);
		console.log(d);
		var c = new Ext.dd.DropTarget(this.getView().el, {
            ddGroup: "galleryImage"
        });
        c.dataView = this.getView();
        c.notifyDrop = this.notifyDrop;
        c.notifyEnter = this.notifyEnter;
        c.onInvalidDrop = this.onInvalidDrop;
        // c.notifyOver = this.notifyOver;
        c.getChart = this.getChart
	},
	notifyDrop: function(m, o, n) {
        console.log(".........notifyDrop..........");
        console.log(m);
        console.log(o);
        console.log(n);
        var p = this,
            l = n.groupName;
        // p.dataView.removeAll();
        if (l === "galleryImage") {
            // p.dataView.add({
            //     xtype: n.dragData
            // })
			p.dataView.el.dom.style.background = 'none';
    	    p.dataView.down('#img_panel').el.query('.img')[0].src = n.sourceEl.dataset.imgurl
            window.ab = n;
        }
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
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
			p.dataView.img_json.src = n.sourceEl.dataset.imgurl;
			var img = p.dataView.down('#img_panel').el.query('.img')[0]
			img.removeAttribute('width');img.removeAttribute('height');
    	    p.dataView.down('#img_panel').el.query('.img')[0].src = n.sourceEl.dataset.imgurl;

    	    // var img_widget_setting = Ext.ComponentQuery.query('#img_widget_setting')[0]
    	    // var img_panel = Ext.ComponentQuery.query('#'+img_widget_setting.img_widget_id)[0];
    	    // var current_setting_img = img_panel.down('#img_panel').el.query('.img')[0]
    	    // img_widget_setting.down('#img_height_field').setValue(current_setting_img.height);
    	    // img_widget_setting.down('#img_width_field').setValue(current_setting_img.width);

    	    var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
            var editor_setting_panel = Ext.ComponentQuery.query('#editor_setting_panel')[0];
            editor_setting_panel.removeAll();
            editor_setting_panel.add({
                xtype: 'img_widget_setting',
                img_widget_id: p.dataView.id
            });
            editor_settings.setActiveItem(1);
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
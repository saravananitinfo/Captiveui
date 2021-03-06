Ext.define("CaptivePortal.view.editor.ImageWidgetController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.image_widget_controller',
	onRender: function(d){
		console.log(".........calllll.........."+d.ddGroup);
		console.log(d);
		var dt = new Ext.dd.DropTarget(this.getView().el, {
            ddGroup: "galleryImage"
        });
        dt.dataView = this.getView();
        dt.notifyDrop = this.notifyDrop;
        dt.notifyEnter = this.notifyEnter;
        dt.onInvalidDrop = this.onInvalidDrop;
        // dt.notifyOver = this.notifyOver;
        dt.getChart = this.getChart
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
            console.log("....................................akshay......................");
    	    var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
            var editor_setting_panel = Ext.ComponentQuery.query('#editor_setting_panel')[0];
            editor_setting_panel.removeAll();
            editor_setting_panel.add({
                xtype: 'img_widget_setting',
                img_widget_id: p.dataView.id
            });
            editor_settings.setActiveItem(1);


            p.dataView.el.dom.style.background = 'none';
            // p.dataView.img_json.src = n.sourceEl.dataset.imgurl;

            var img_json = Ext.decode(p.dataView.img_json);
            img_json.src = n.sourceEl.dataset.imgurl;
            p.dataView.img_json = JSON.stringify(img_json);

            window.abcd = p.dataView 
            var img = p.dataView.down('#img_panel').el.query('.img')[0]
            img.removeAttribute('width');img.removeAttribute('height');
            // img.src = n.sourceEl.dataset.imgurl;
            img.style.display = 'block';

            var newImg = new Image;
            newImg.onload = function() {
                img.src = this.src;
                var img_widget_setting = Ext.ComponentQuery.query('#img_widget_setting')[0]
                // img_widget_setting.down('#img_height_field').setValue(img.height);
                // img_widget_setting.down('#img_width_field').setValue(img.width);

                img_widget_setting.down('#img_height_field').setValue(0);
                img_widget_setting.down('#img_width_field').setValue(0);
                img_widget_setting.down('#img_height_field').setValue(p.dataView.body.dom.style.height);
                img_widget_setting.down('#img_width_field').setValue(p.dataView.body.dom.style.width);
            }
            newImg.src = n.sourceEl.dataset.imgurl

            // var img_widget_setting = Ext.ComponentQuery.query('#img_widget_setting')[0]

            // // img_widget_setting.down('#img_height_field').setValue(img.height); 
            // // img_widget_setting.down('#img_width_field').setValue(img.width);
            // img_widget_setting.down('#img_height_field').setValue(p.dataView.body.dom.style.height); 
            // img_widget_setting.down('#img_width_field').setValue(p.dataView.body.dom.style.width);

            
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
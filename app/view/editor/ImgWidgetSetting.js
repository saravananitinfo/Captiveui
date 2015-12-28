Ext.define("CaptivePortal.view.editor.ImgWidgetSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.img_widget_setting',
	title: 'Image Settings',
    closable : true,
    cls: 'img_widget_setting',
    itemId: 'img_widget_setting',
    layout: 'vbox',
    listeners: {
      'close': function() {
          var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0]
          editor_settings.setActiveItem(0)
      }
    },
    initComponent: function () {
        var img_pnl = Ext.ComponentQuery.query('#'+this.img_widget_id)[0];
        var image = img_pnl.down('#img_panel').el.query('.img')[0]
    	this.items = [
    		{
    		  xtype: 'panel',
          width: '100%',
          items: [
            {
            	items: [
    		      	{
    	          	xtype: 'label',
    	            text: 'Upload File',
    	            margin: '10 10 10 10',
    	          },
    	          {
    	          	xtype: 'filefield',
    	          	margin: '0 10 0 10',
    	          	name: 'file_data',
    	          	emptyText: "Select Image",
    	          	width: '92%',
    							hideLabel: true,
    							itemId: 'upload_field'
    	          }
    	        ]
            },
            { 
            	items: [
    	          {
    	          	xtype: 'button',
    	          	margin: '10 10 10 10',
    	          	text: 'Upload',
    	          	handler: function(){
    	          		var image_widget_id = Ext.ComponentQuery.query('#img_widget_setting')[0].img_widget_id;
    	          		var img_setting = Ext.ComponentQuery.query('#img_widget_setting')[0]
    	          		file = img_setting.el.down('input[type=file]').dom.files[0];
    	          		console.log(file);
    	          		var reader = new FileReader();
    	          		reader.onload = function(e) {
                            var json = {gallery: {name: 'name123'}}
                            json['gallery']['attachment'] = e.target.result;
                            // json['gallery']['img_content'] = e.target.result;
                            var url = CaptivePortal.Config.SERVICE_URLS.UPLOAD_IMAGE, method = 'POST';
                            // var url = 'http://192.168.0.220:3001/galleries.json', method = 'POST';
                            
                            CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", '',function(response){
                                var resObj = Ext.decode(response.responseText);
                                if(resObj.success){
                                    Ext.getCmp('viewport').setLoading(false);
                                    console.log("save.........save..........save...guest_user");
                                    console.log(resObj);
                                    img_setting.el.down('input[type=text]').dom.value = "";
                                    Ext.StoreManager.lookup('CaptivePortal.store.editor.ImageGallery').reload();
                                    var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];
                                    img_panel.el.dom.style.background = 'none';
                                    var img = img_panel.down('#img_panel').el.query('.img')[0]
                                    img.removeAttribute('width');img.removeAttribute('height');
                                    img.src = CaptivePortal.util.Utility.BASE_URL+resObj.data.gallery.medium_image_url;

                                }
                            }.bind(this),function(response){
                                var resObj = Ext.decode(response.responseText);
                                if(!resObj.success && resObj.error.length){
                                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                                }          
                            },method);

                            Ext.getCmp('viewport').setLoading(false);

    	          		}
                        reader.readAsDataURL(file);
    	          	}
    	          }
    	        ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 10 10',
                        text: 'Width'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'img_width_field',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: image.width,
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                            	var image_widget_id = Ext.ComponentQuery.query('#img_widget_setting')[0].img_widget_id;
                            	var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];
                                var img_json = Ext.decode(img_panel.img_json);
                                img_json.width = newValue;
                                img_panel.img_json = JSON.stringify(img_json);
    	          				img_panel.down('#img_panel').el.query('.img')[0].width = newValue;
                                // var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                // var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                // btn.style.fontSize = newValue+"px"

                                // var btn_json = Ext.decode(button_panel.button_json, true);
                                // btn_json['font_size'] = newValue;
                                // button_panel.button_json = JSON.stringify(btn_json);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 10 10',
                        text: 'Height'
                    },
                    {
                        xtype: 'numberfield',
                        itemId: 'img_height_field',
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        value: image.height,
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                            	var image_widget_id = Ext.ComponentQuery.query('#img_widget_setting')[0].img_widget_id;
                            	var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];

                                var img_json = Ext.decode(img_panel.img_json);
                                img_json.height = newValue;
                                img_panel.img_json = JSON.stringify(img_json);

                                // img_panel.img_json.height = newValue;
                                
    	          				img_panel.down('#img_panel').el.query('.img')[0].height = newValue;
                                // var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                // var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                                // btn.style.fontSize = newValue+"px"

                                // var btn_json = Ext.decode(button_panel.button_json, true);
                                // btn_json['font_size'] = newValue;
                                // button_panel.button_json = JSON.stringify(btn_json);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                title: 'Gallery',
                collapsible: true,
                collapsed: true,
                width: '100%',
                layout: 'vbox',
                items: [
                    {
                        xtype: "dragPanel",
                        // itemId: "editor_widgets",
                        itemSelector: "div.dragItem",
                        width: '100%',
                        ddGroup:"galleryImage",
                        dataA: [],
                        store: Ext.StoreManager.lookup('CaptivePortal.store.editor.ImageGallery').load(),
                        customTpl:['<tpl for=".">','<div data-imgurl="'+CaptivePortal.util.Utility.BASE_URL+'{medium_image_url}" class="dragItem">','<div style="line-height: 1px;" class="{name}" data-qtip="{name}">','<img class="galleryImage" src="'+CaptivePortal.util.Utility.BASE_URL+'{medium_image_url}">',"</div>","</div>","</tpl>"]
                    }
                ]
            }
          ]	    	
        }
    	]
    	this.callParent();
    }
});

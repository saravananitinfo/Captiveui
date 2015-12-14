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
		          	width: 300,
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
		          			var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];
		          			img_panel.down('#img_panel').el.query('.img')[0].src = e.target.result;
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
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        // value: btn_json["font_size"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                            	var image_widget_id = Ext.ComponentQuery.query('#img_widget_setting')[0].img_widget_id;
                            	var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];
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
                        margin: '0 10 0 10',
                        width: '100%',
                        minValue: 0,
                        // value: btn_json["font_size"],
                        listeners: {
                            'change': function(ths, newValue, oldValue, eOpts){
                            	var image_widget_id = Ext.ComponentQuery.query('#img_widget_setting')[0].img_widget_id;
                            	var img_panel = Ext.ComponentQuery.query('#'+image_widget_id)[0];
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
            }
	      ]	    	
	    }
  	]
  	this.callParent();
  }
});

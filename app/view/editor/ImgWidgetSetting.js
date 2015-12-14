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
		          		var img_setting = Ext.ComponentQuery.query('#img_widget_setting')[0]
		          		file = img_setting.el.down('input[type=file]').dom.files[0];
		          		console.log(file);
		          		var reader = new FileReader();
		          		reader.onload = function(e) {
		          			var img_panel = Ext.ComponentQuery.query('#img_panel')[0];
		          			window.abc = img_panel;
		          			img_panel.el.query('.img')[0].src = e.target.result;
		          		}
		          		reader.readAsDataURL(file);
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

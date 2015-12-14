Ext.define("CaptivePortal.view.editor.PageSettings",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.page_settings',
	title: 'Page Settings',
  closable : true,
  cls: 'page_setting',
  itemId: 'page_setting',
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
              title: "Text",
              items: [
                  {
                      xtype: 'colorpicker',
                      itemId: 'page_color',
                      margin: '10 10 10 10',
                      // value: btn_json["txt_color"],
                      listeners: {
                          select: function( ths, color, eOpts ){
                            var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
                            editor_canvas.body.dom.style.background = '#'+color;
                          }
                      }
                  }
              ]
          }
	      ]
	    },
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
		          		var page_setting = Ext.ComponentQuery.query('#page_setting')[0]
		          		file = page_setting.el.down('input[type=file]').dom.files[0];
		          		console.log(file);
		          		var reader = new FileReader();
		          		reader.onload = function(e) {
		          			var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
		          			editor_canvas.body.dom.style.background = 'url('+e.target.result+') 100% 100%';
		          			editor_canvas.body.dom.style.backgroundSize = '100% 100%';
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
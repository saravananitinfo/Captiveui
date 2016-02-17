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
	  },
	  'afterrender': function(panel){
			panel.down('colorfield').addListener('change', function(picker){
            	var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
            	var page_data = Ext.decode(editor_canvas.page_data);
            	page_data.background = picker.getValue()
            	editor_canvas.page_data = JSON.stringify(page_data);
		    	editor_canvas.body.dom.style.background = '#'+picker.getValue();
            });
		}
	},
	initComponent: function () {
		var canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
		var page_data = Ext.decode(canvas.page_data);
		this.items = [
			{
				xtype: 'panel',
				width: '100%',
				items: [
					{
					  	items: [
					      	{
						        xtype: 'colorfield',
						        fieldLabel: 'Color Field',
						        labelWidth: 75,
						        value: page_data.background,
						        width: '92%',
						        margin: '10 10 10 10'
						       //  listeners: {
						       //      change: function(picker){
						       //      	var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
						       //      	var page_data = Ext.decode(editor_canvas.page_data);
						       //      	page_data.background = picker.getValue()
						       //      	editor_canvas.page_data = JSON.stringify(page_data);
								    	// editor_canvas.body.dom.style.background = '#'+picker.getValue();
						       //      }
						       //  }
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
					      		var page_setting = Ext.ComponentQuery.query('#page_setting')[0]
					      		file = page_setting.el.down('input[type=file]').dom.files[0];
					      		console.log(file);
					      		var reader = new FileReader();
					      		reader.onload = function(e) {
					      			var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
					      			editor_canvas.body.dom.style.background = 'url('+e.target.result+') repeat';

					      			var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0]
					            	var page_data = Ext.decode(editor_canvas.page_data);
					            	page_data.background = 'url('+e.target.result+') repeat';
					            	editor_canvas.page_data = JSON.stringify(page_data);
					      			// editor_canvas.body.dom.style.backgroundSize = '100% 100%';
					      		}
					      		reader.readAsDataURL(file);
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
		                        img_prop: true,
		                        ddGroup:"themeGroup",
		                        dataA: [],
		                        store: Ext.StoreManager.lookup('CaptivePortal.store.editor.ImageGallery').load(),
		                        customTpl:['<tpl for=".">','<div data-imgurl="'+CaptivePortal.util.Utility.BASE_URL+'{original_image_url}" class="dragItem">','<div style="line-height: 1px;" class="{name}" data-qtip="{name}">','<img class="galleryImage" src="'+CaptivePortal.util.Utility.BASE_URL+'{original_image_url}">',"</div>","</div>","</tpl>"]
		                    }
		                ]
		            }
				]	    	
		    }
		]
		this.callParent();
	}
});
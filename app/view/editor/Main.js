Ext.define('CaptivePortal.view.editor.Main', {
    extend: 'Ext.Panel',
    requires: [
    	'CaptivePortal.view.editor.DragPanel',
    	'CaptivePortal.view.editor.DropPanel',
    	'CaptivePortal.view.editor.MainController',
        'CaptivePortal.view.editor.EditorButtonSetting'
    ],
    alias: 'widget.editor_main',
    layout: 'hbox',
    controller: 'editor_main_controller',
    header: {
        items: [{
            xtype:'button',
            text: 'Page Settings',
            handler: "pageSettings"
        },{
            xtype:'button',
            text: 'Save',
            margin: '0 0 0 5',
            handler: "saveEditorHtml"
        },{
            xtype:'button',
            text: 'Cancle',
            margin: '0 0 0 5',
            handler: 'closeEditor'
        },{
            xtype:'button',
            text: 'Test',
            margin: '0 0 0 5',
            handler: 'buildHtml'
        }]
    },
    initComponent: function () {
        this.items = [
        	// {
        	// 	xtype: "dragPanel",
        	// 	width: '5%',
        	// 	height: '100%',
        	// 	itemId: "editor_widgets",
        	// 	itemSelector: "div.dragItem",
        	// 	ddGroup:"widgetGroup",
        	// 	height: '100%',
        	// 	dataA: [{widgetDesc: "text_widget"},{widgetDesc: "img_widget"},{widgetDesc: "button_widget"},{widgetDesc: "login_button_widget"}],
        	// 	customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {widgetDesc}" data-qtip="{widgetDesc}">',"</div>","</div>","</tpl>"]

        	// },
        	{
        		xtype: "dropPanel",
        		ddGroup:"themeGroup",
                // bodyStyle: "background: #ffffff",
                // style: {
                //     background: '#b6b6cf'
                // },
                style: 'border: 1px solid rgb(151, 173, 194);',
        		reference: 'editor_canvas',
                // width: '75%',
        		width: '80%',
        		height: '100%',
        		layout: "vbox",
        		itemId: "editor_canvas",
        		scrollable: 'y',
        		defaults: {
        			reorderable: true
        		},
            	plugins : Ext.create('Ext.ux.BoxReorderer', {
            		// itemSelector: '.sort_item'
            	})

        	},
            {
                xtype: 'panel',
                layout: 'card',
                width: '20%',
                itemId: "editor_settings",
                height: '100%',
                items: [
                    {
                        xtype: 'tabpanel',
                        items:
                        [

                            {
                                title: "Select Section",
                                items:[{
                                    xtype: "dragPanel",
                                    itemSelector: "div.dragItem",
                                    ddGroup:"themeGroup",
                                    width: '100%',
                                    height: '100%',
                                    overflowY: "auto",
                                    dataA: [{themeDesc: "theme_col_1"},{themeDesc: "theme_col_2"},{themeDesc: "theme_col_3"},{themeDesc: "theme_col_4"}],
                                    customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">',"</div>","</div>","</tpl>"]
                                }]
                            },
                            {
                                title: "Select Widget",
                                items:[{
                                    xtype: "dragPanel",
                                    // width: '5%',
                                    width: '100%',
                                    height: '100%',
                                    itemId: "editor_widgets",
                                    itemSelector: "div.dragItem",
                                    ddGroup:"widgetGroup",
                                    // height: '100%',
                                    dataA: [{widgetDesc: "text_widget"},{widgetDesc: "img_widget"},{widgetDesc: "button_widget"},{widgetDesc: "login_button_widget"}],
                                    customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {widgetDesc}" data-qtip="{widgetDesc}">',"</div>","</div>","</tpl>"]
                                }]
                            }

                        ]


                    },
                    {   
                        xtype: 'panel',
                        itemId: "editor_setting_panel"
                    }
                ]

            }
        	// {
        	// 	xtype: "dragPanel",
        	// 	itemSelector: "div.dragItem",
        	// 	ddGroup:"themeGroup",
        	// 	width: '25%',
        	// 	height: '100%',
        	// 	itemId: "editor_setting_panel",
        	// 	overflowY: "auto",
        	// 	dataA: [{themeDesc: "theme_col_1"},{themeDesc: "theme_col_2"},{themeDesc: "theme_col_3"},{themeDesc: "theme_col_4"}],
        	// 	customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">',"</div>","</div>","</tpl>"]
        	// 	// tpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">', "</div>", "</div>", "</tpl>"]

        	// }
        ]
        this.callParent(arguments);
    },
    listeners: {
        afterrender: function(){
        	console.log("...........call");
        }
    }
});
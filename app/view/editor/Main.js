Ext.define('CaptivePortal.view.editor.Main', {
    extend: 'Ext.Panel',
    requires: [
    	'CaptivePortal.view.editor.DragPanel',
    	'CaptivePortal.view.editor.DropPanel'
    ],
    alias: 'widget.editor_main',
    layout: 'hbox',
    initComponent: function () {
        this.items = [
        	{
        		xtype: "panel",
        		width: '5%',
        		height: '100%',
        		itemId: "editor_widgets"

        	},
        	{
        		xtype: "dropPanel",
        		ddGroup:"themeGroupAkshay",
        		width: '70%',
        		height: '100%',
        		itemId: "editor_canvas",
        		scrollable:true,
        		html: "<div id='editor_canvas'></div>"

        	},
        	{
        		xtype: "dragPanel",
        		itemSelector: "div.dragItem",
        		ddGroup:"themeGroupAkshay",
        		width: '25%',
        		height: '100%',
        		itemId: "editor_setting_panel",
        		overflowY: "auto",
        		dataA: [{themeDesc: "theme1"},{themeDesc: "theme2"},{themeDesc: "theme3"},{themeDesc: "theme4"},{themeDesc: "theme5"},{themeDesc: "theme6"}],
        		customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">',"</div>","</div>","</tpl>"]
        		// tpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">', "</div>", "</div>", "</tpl>"]

        	}
        ]
        this.callParent(arguments);
    },
    listeners: {
        afterrender: function(){
        	console.log("...........call");
        	console.log(this);
        	window.tmp = this;
   //      	var divs = this.down('#editor_setting_panel');

   //      	var overrides = {
   //      		endDrag: function(){
   //      			console.log("endDrag.........");
   //      		}
   //      	};

   //      	Ext.each(Ext.query(".dragItem"), function(item) {
	  //           var dd = Ext.create('Ext.dd.DD', item, 'carsDDGroup', {
	  //               isTarget  : false
	  //           });
	  //           //Apply the overrides object to the newly created instance of DD
	  //           Ext.apply(dd, overrides);
	  //       });

   //      	console.log(divs);
   //      	var mainTarget = Ext.create('Ext.dd.DDTarget', Ext.query('editor_canvas'), 'carsDDGroup', {
			//     ignoreSelf: false
			// });
        }
    }
});
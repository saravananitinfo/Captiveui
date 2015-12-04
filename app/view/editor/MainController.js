Ext.define("CaptivePortal.view.editor.MainController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.editor_main_controller',
    saveEditorHtml: function(){
    	var canvas = this.getView().lookupReference('editor_canvas');
    	console.log(canvas);
    	window.canvas = canvas;
    	var html = []
    	canvas.items.each(function(theme){
    		console.log(theme.xtype);
    		var row = {}
    		row[theme.xtype] = {}
    		row[theme.xtype]['height'] = theme.height;
    		row[theme.xtype]['blocks'] = [];
    		theme.items.each(function(block){
    			console.log(block.xtype);
    			if(block.xtype === 'text_widget'){
	    			var col = {}
	    			col[block.xtype] = {
	    				text: block.items.getAt(0).el.getHtml()
	    			}
	    			row[theme.xtype]['blocks'].push(col);
	    		}else if (block.xtype === 'dropPanel'){
	    			var col = {}
	    			col['empty_block'] = {}
	    			row[theme.xtype]['blocks'].push(col);
	    		}
    			// html[theme.xtype][block.xtype]["text"] = 'block.items.getAt(0).el.getHtml()'
    		});
    		html.push(row);
    	});
    	console.log("........ht.");
    	console.log(html);
    },
    closeEditor: function(){
    	console.log("........closeEditor.........");
    }
});
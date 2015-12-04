Ext.define("CaptivePortal.view.editor.EditorButtonSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.editor_button_setting',
	title: 'Button Settings',
    closable : true,
    cls: 'editor_button_setting',
    layout: 'fit',
    items: [
    	{
    		xtype: 'component',
    		cls: 'button_setting_canvas'
    	}
    	// {
	    //     xtype:'button',
	    //     text: 'Select Button',
	    //     handler: function(){
	    //     	console.log(this.up('.editor_button_setting').current_block);
	    //     	console.log(Ext.query('#'+this.up().current_block));
	    //     }
	    // }
    ]
});
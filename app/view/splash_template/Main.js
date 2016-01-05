Ext.define('CaptivePortal.view.splash_template.Main',{
	extend:'Ext.Panel',
	requires:[
		'CaptivePortal.view.splash_template.MainController',
		'CaptivePortal.view.splash_template.AddOrEditSplashTemplate',
		'CaptivePortal.view.splash_template.SplashTemplateList'
	],
	alias:'widget.splash_template_main',
	controller: 'splash_template_main_controller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
    	this.items = [
    		{
    			xtype: 'splash_template_list',
    			reference: 'card_splash_template_list',
        		itemId:'card_splash_template_list'
    		},
    		{
      			xtype: 'splash_template_add_edit',
      			reference: 'card_add_edit_splash_template',
        		itemId:'card_add_edit_splash_template'
      		}
      	]
        this.callParent(arguments);
	}
});
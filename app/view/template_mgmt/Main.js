Ext.define('CaptivePortal.view.template_mgmt.Main',{
	extend:'Ext.container.Container',
	requires:['CaptivePortal.view.template_mgmt.MainController', 'CaptivePortal.view.template_mgmt.TemplateMgmtAddorEdit', 'CaptivePortal.view.template_mgmt.TemplateMgmtList'],
	alias:'widget.template_mgmt_main',
	controller: 'template_mgmt_maincontroller',
	layout:'card',
	height:'100%',
	width:'100%',
	items:[	
		{
			xtype:'template_mgmt_list'
		},
		{
    	   	xtype: 'template_mgmt_add_or_edit'
    	}
	]
})
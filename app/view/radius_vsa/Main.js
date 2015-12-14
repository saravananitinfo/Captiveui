Ext.define('CaptivePortal.view.radius_vsa.Main',{
	extend:'Ext.container.Container',
	requires:['CaptivePortal.view.radius_vsa.MainController', 'CaptivePortal.view.radius_vsa.RadiusVSAAddorEdit' ,'CaptivePortal.view.radius_vsa.RadiusVSAList'],
	alias:'widget.radius_vsa_main',
	controller: 'radius_vsa_maincontroller',
	layout:'card',
	height:'100%',
	width:'100%',
	items:[{
			xtype:'radius_vsa_list'
		},	
		{
			xtype:'radius_vsa_add_or_edit'
		}
	]
})
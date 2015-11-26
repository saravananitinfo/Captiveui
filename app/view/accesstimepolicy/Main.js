Ext.define('CaptivePortal.view.accesstimepolicy.Main',{
	extend:'Ext.container.Container',
	requires:['CaptivePortal.view.accesstimepolicy.MainController', 'CaptivePortal.store.accesstimepolicy.Weekdays', 'CaptivePortal.view.accesstimepolicy.AccessTimePolicyEdit', 'CaptivePortal.view.accesstimepolicy.PolicyList'],
	alias:'widget.access_time_policy_main',
	controller: 'access_time_policy_maincontroller',
	layout:'card',
	height:'100%',
	width:'100%',
	items:[	
		{
    	   	xtype: 'policylist'
    	},
    	{
			xtype:'access_time_policyaddoredit'
		}
	]
})
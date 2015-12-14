Ext.define('CaptivePortal.view.rule_group.Main',{
	extend:'Ext.container.Container',
	requires:['CaptivePortal.view.rule_group.MainController', 'CaptivePortal.store.rule_group.Rule', 'CaptivePortal.view.rule_group.RuleGroupAddorEdit', 'CaptivePortal.view.rule_group.RuleGroupList', 'CaptivePortal.view.rule_group.Rule'],
	alias:'widget.rule_group_main',
	controller: 'rule_group_maincontroller',
	layout:'card',
	height:'100%',
	width:'100%',
	items:[{
			xtype:'rule_group_list'
		},{
			xtype:'rule_group_add_or_edit'
		},{
			xtype:'rule_group_rule'
		}
	]
})
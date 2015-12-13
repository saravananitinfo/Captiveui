Ext.define('CaptivePortal.model.rule_group.RuleGroup',{
	extend:'Ext.data.Model',
	fields: [
		{ name:'id', type:'string'},
		{ name:'name', type:'string'},
		{ name:'associated_resource'},
		{ name:'access_point_ids'},
		{ name:'splash_rules_attributes'}
    ]
});
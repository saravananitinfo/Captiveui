Ext.define('CaptivePortal.model.rule_group.Rule',{
	extend:'Ext.data.Model',
	fields: [
		{ name:'id', type:'string'},
		{ name:'name', type:'string'},
		{ name:'splash_journey_id', type:'string'},
		{ name:'splash_name', type:'string'},
		{ name:'splash_rule_sets_attributes'}
    ]
});
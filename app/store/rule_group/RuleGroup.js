Ext.define('CaptivePortal.store.rule_group.RuleGroup',{
	extend:'Ext.data.Store',
	requires:['CaptivePortal.model.rule_group.RuleGroup'],
	model:'CaptivePortal.model.rule_group.RuleGroup',
	//data:[{"id":"566a9b706b69721832110000","name":"super admin new","associated_resource":{"id":"566a652b6b69725c16300000","name":"site with out tag","resource_type":"Site"},"access_points":[{"id":"566a7b206b69724a9d000000","mac_id":"22:33:66:55:66:77","uid":"1123"}],"splash_rules":[{"id":"566a9b706b69721832100000","name":"rule1","priority":1,"splash_rule_sets":[{"id":"566a9b706b697218320f0000","rule_type":"fdsa","rule_value":["1","2","3","123","abcdf"]}]}]},{"id":"566ac2de6b697223e81f0000","name":"singlesitetag2ndtim1","associated_resource":{"id":"566ac2066b697223e8020000","name":"tag with one site 2nd time","resource_type":"SiteTag"},"access_points":[{"id":"566a7b206b69724a9d000000","mac_id":"22:33:66:55:66:77","uid":"1123"}],"splash_rules":[{"id":"566ac2de6b697223e81e0000","name":"rule1","priority":1,"splash_rule_sets":[{"id":"566ac2de6b697223e81d0000","rule_type":"fdsa","rule_value":["1","2","3","123","abcdf"]}]}]},{"id":"566acc866b69723f560b0000","name":"singlesitetag2ndtim1","associated_resource":{"id":"566ac9a56b697237bd020000","name":"tag with one site 3rd time","resource_type":"SiteTag"},"access_points":[{"id":"566a7b206b69724a9d000000","mac_id":"22:33:66:55:66:77","uid":"1123"}],"splash_rules":[{"id":"566acc866b69723f560a0000","name":"rule1","priority":1,"splash_rule_sets":[{"id":"566acc866b69723f56090000","rule_type":"fdsa","rule_value":["1","2","3","123","abcdf"]}]}]}],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GET_RULE_GROUP,
		type:'ajax',
		reader:{
			type:'json',
			root:'data.splash_rule_groups'
		}
	}
});
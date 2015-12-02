Ext.define('CaptivePortal.model.template_mgmt.TemplateMgmt',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'id', type: 'string'},
		{ name:'category', type: 'string'},		
		{ name:'default', type: 'string'},
		{ name:'default_error_url', type: 'string'},
		{ name:'default_success_url', type: 'string'},
		{ name:'name', type: 'string'},
		{ name:'privacy_policies', type: 'string'},
		{ name:'privacy_policies_link', type: 'string'},
		{ name:'privacy_policies_name', type: 'string'},
		{ name:'site_id', type: 'string'},
		{ name:'splash_template_attributes'},
		{ name:'status', type: 'string'},
		{ name:'tenant_id', type: 'string'},
		{ name:'tnc', type: 'string'},
		{ name:'tnc_link', type: 'string'},
		{ name:'default', type: 'boolean'},
		{ name:'custom_tnc', type: 'boolean'},
		{ name:'custom_privacy_policies', type: 'boolean'}

	]
});
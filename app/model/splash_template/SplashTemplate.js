Ext.define('CaptivePortal.model.splash_template.SplashTemplate',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type: 'string'},
		{ name:'splash_content', type: 'auto'},
		{ name:'status', type:'string'},
		{ name:'category', type:'string'},
		{ name:'associated_resource'}
	]
});

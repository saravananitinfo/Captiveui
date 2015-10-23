Ext.define('CaptivePortal.model.site.Site',{
	extend:'Ext.data.Model',
	idProperty:'id',
	fields:[
	{ name:'name', type:'string'},
	{ name:'tenant_id', type:'string'},
	{ name:'users'},{ name:'user_profiles'},
	{ name:'timezone'},
	{ name:'tags'},
	{ name:'email'},
	{ name:'tenant'},
	{ name:'phone', type:'string'},
	{ name:'id', type:'string'},
	{ name:'address', type:'string'},
	{ name:'street', type:'string'},
	{ name:'city', type:'string'},
	{ name:'country', type:'string'},
	{ name:'zipcode', type:'string'},
	{ name:'latitude', type:'string'},
	{ name:'longitude', type:'string'}
	]
});
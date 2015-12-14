Ext.define('CaptivePortal.model.radius_vsa.RadiusVSA',{
	extend:'Ext.data.Model',
	fields: [
		{ name:'id', type:'string'},
		{ name:'name', type:'string'},
		{ name:'format', type:'string'},
		{ name:'value', type:'string'},
		{ name:'vsa_attributes'}
    ]
});
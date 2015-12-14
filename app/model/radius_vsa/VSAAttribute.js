Ext.define('CaptivePortal.model.radius_vsa.VSAAttribute',{
	extend:'Ext.data.Model',
	fields: [
		{ name:'id', type:'string'},
		{ name:'name', type:'string'},
		{ name:'code', type:'string'},
		{ name: 'attribute_type', type:'string'}
    ]
});
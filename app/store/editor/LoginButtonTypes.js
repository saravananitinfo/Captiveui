Ext.define('CaptivePortal.store.editor.LoginButtonTypes',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'id', type:'string'},
		{ name:'name', type:'string'}
	],
	data: [
    	{id: 'fb', name: 'Facebook'},
    	{id: 'tw', name: 'Twitter'},
    	{id: 'g', name: 'Google'},
    	{id: 'form', name: 'Registration Form'},
	]
});
Ext.define('CaptivePortal.model.guest_user.GuestUser',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'user_name', type:'string'},
		{ name:'first_name', type: 'string'},
		{ name:'last_name', type: 'string'},
		{ name:'enabled', type: 'string'}
	]
});
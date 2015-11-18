Ext.define('CaptivePortal.view.guest_users.Main',{
	extend:'Ext.Panel',
	requires:[
	  'CaptivePortal.view.guest_users.MainController',
	  'CaptivePortal.view.guest_users.GuestUserList',
	  'CaptivePortal.view.guest_users.AddOrEditGuestUser',
	  'CaptivePortal.view.guest_users.UploadGuestUsersFrom'
	],
	alias:'widget.guest_usersmain',
	controller: 'guest_users_maincontroller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
    	this.items = [
    		{
    			xtype: 'guest_userslist',
    			reference: 'card_guest_user_list',
    			itemId: 'card_guest_user_list'
    		},
    		{
      			xtype: 'guest_user_addedit',
      			reference: 'card_addedit_guest_user',
        		itemId:'card_addedit_guest_user'
      		},
      		{
      			xtype: 'upload_guest_user_form',
      			reference: 'card_upload_guest_user',
      			itemId:'card_upload_guest_user'
      		}
      	]
        this.callParent(arguments);
	}
});
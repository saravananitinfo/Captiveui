Ext.define('CaptivePortal.view.guest_users.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.guest_users_maincontroller',
    listen: {
    	controller: {
    		"*":{
    			setGuestUsersMainActiveItem: "onSetActiveItem"
    		}
    	}
    },
    onSetActiveItem:function(card){
        this.getView().setActiveItem(card);
    }
});
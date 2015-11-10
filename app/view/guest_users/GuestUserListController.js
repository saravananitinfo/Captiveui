Ext.define('CaptivePortal.view.guest_users.GuestUserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.guest_user_listcontroller',
    newGuestUser: function(){
        Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.Sites').reload();
    	this.fireEvent('setGuestUsersMainActiveItem', 1);
        Ext.ComponentQuery.query('#btn_save_guest_user')[0].setText('Create');
        var form = Ext.ComponentQuery.query('#guest_user_form')[0];
        form.reset(true);
    },
    editGuestUser: function(obj){
        
    },
    deleteGuestUser: function(view, record, item, index, e, eOpts){
    	Ext.Msg.show({
            title: 'Delete Guest User',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) { 
                if (btn === 'yes') {
                    Ext.getCmp('viewport').setLoading(true);
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_GUESTUSER + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers').reload();
                            Ext.getCmp('viewport').setLoading(false);
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
    	var me = this
        var action = e.target.getAttribute('action');
        // action = "edit"
        if (action) {
            if (action == "edit") {
            	
            } else {
                this.deleteSMSGateway(view, record, item, index, e, eOpts);
            }
        }
    },
    createGuestUser: function (obj) {
      
    }
});
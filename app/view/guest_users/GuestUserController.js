Ext.define('CaptivePortal.view.guest_users.GuestUserController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.guest_user',
    cancelGuestUser: function () {
        var me = this;
        me.fireEvent('setGuestUsersMainActiveItem', 0);
        Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers').reload();
    },
    saveGuestUser: function(){
    	var me = this;
        var form = this.getView().down('form');
        if(form.isValid()){
        	Ext.getCmp('viewport').setLoading(true);
        	var guest_user_id = form.down('#guest_user_id').getValue();
            form_values = form.getValues();
            console.log(".............guest user for values...........");
            console.log(form_values)

            json = {};
            json['guest_user'] = form_values
            json['guest_user']['authorized_ssids']= [1,2,3,4]
            console.log(json)

            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_GUESTUSER, method = 'POST';
            if(guest_user_id){
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_GUESTUSER + guest_user_id + '.json';
                method = 'PUT';
            }
            
            CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
                var resObj = Ext.decode(response.responseText);
                if(resObj.success){
                    Ext.getCmp('viewport').setLoading(false);
                    console.log("save.........save..........save...guest_user");
                    me.fireEvent('setGuestUsersMainActiveItem', 0);
                    Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers').reload();
                }
            }.bind(this),function(response){
                var resObj = Ext.decode(response.responseText);
                if(!resObj.success && resObj.error.length){
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }          
            },method);

            Ext.getCmp('viewport').setLoading(false);
        }
    }
});
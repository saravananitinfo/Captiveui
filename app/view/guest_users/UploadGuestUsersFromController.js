Ext.define('CaptivePortal.view.guest_users.UploadGuestUsersFromController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.upload_guest_user_form_controller',
    require: [
    	'Ext.util.base64'
    ],
    canceluploadGuestUsers: function() {
    	console.log(".....................cancel upload GuestUsers");
    	this.fireEvent('setGuestUsersMainActiveItem', 0);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText(CaptivePortal.Constant.MANAGEMENT.WIFIUSERS);
    },
    uploadGuestUsers: function(){
    	console.log("...................uploadGuestUsers");
    	var me = this;
        var form = this.getView().down('form');
        if(form.isValid()){
        	Ext.getCmp('viewport').setLoading(true);
            form_values = form.getValues();
            console.log(".............upload guest user for values...........");
            console.log(form_values);

            json = {guest_user: {}};
            json['guest_user']['associated_resource'] = form_values.associated_resource;
            console.log(json);
            file = form.down('#upload_field').el.down('input[type=file]').dom.files[0];
            if(file){
            	console.log(file);
	            var reader = new FileReader();
	            reader.onload = (function(theFile) {
	                return function(e) {
	                    console.log(".............");
	                    console.log(e.target.result);
	                    json['guest_user']['guest_user_file'] = Ext.util.Base64.encode(e.target.result)
	                    console.log(json);
	                    var url = CaptivePortal.Config.SERVICE_URLS.UPLOAD_GUESTUSERS, method = 'POST';
	                    CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", me.getView(),function(response){
			                var resObj = Ext.decode(response.responseText);
			                if(resObj.success){
			                    Ext.getCmp('viewport').setLoading(false);
			                    me.fireEvent('setGuestUsersMainActiveItem', 0);
			                    Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers').reload();
			                }
			            }.bind(this),function(response){
			                var resObj = Ext.decode(response.responseText);
			                if(!resObj.success && resObj.error.length){
			                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
			                }          
			            },method);
	                };
	            })(file);
	            reader.readAsBinaryString(file);
            }
        }

    }
});
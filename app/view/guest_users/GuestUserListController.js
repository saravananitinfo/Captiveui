Ext.define('CaptivePortal.view.guest_users.GuestUserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.guest_user_listcontroller',
    createSites: function(formId){
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_SMSGATEWAY, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var sitesAndTags = CaptivePortal.util.Utility.createSitesAndTags(resObj.data);
                    var sitesCombo = Ext.ComponentQuery.query('#' + formId)[0].down('#gateway_sites');
                    sitesCombo.reset();
                    sitesCombo.store.loadRawData(sitesAndTags);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, 'GET', false);
    },
    newGuestUser: function(){
        Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.Sites').reload();
    	this.fireEvent('setGuestUsersMainActiveItem', 1);
	Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New '+CaptivePortal.Constant.MANAGEMENT.WIFIUSERS);
        Ext.ComponentQuery.query('#btn_save_guest_user')[0].setText('Create');
        var form = Ext.ComponentQuery.query('#guest_user_form')[0];
        form.reset(true);
        this.createSites('guest_user_form');
    },
    editGuestUser: function(obj){
        console.log('....................edit guest_users...............');
        console.log(obj)

        //Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.Sites').reload();
        this.fireEvent('setGuestUsersMainActiveItem', 1);
	Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Edit Guest User');
        this.createSites('guest_user_form');
        var form  = Ext.ComponentQuery.query('#guest_user_form')[0];
        record = this.createGuestUser(obj);
        form.loadRecord(record);

        Ext.getCmp('viewport').setLoading(false);
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
                    CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
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
            	Ext.getCmp('viewport').setLoading(true);
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_GUESTUSER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        this.editGuestUser(resObj);
                        /*var record = this.createTenantModel(resObj.data.tenant, true);

                        me.fireEvent('setTenantEditViewForm', record);*/
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteGuestUser(view, record, item, index, e, eOpts);
            }
        }
    },
    createGuestUser: function (obj) {
        var model_obj = {
            guest_user_id: obj.data.guest_user.id,
            email: obj.data.guest_user.email,
            enabled: obj.data.guest_user.enabled,
            expiry_date: obj.data.guest_user.expiry_date,
            first_name: obj.data.guest_user.first_name,
            last_name: obj.data.guest_user.last_name,
            mobile_no: obj.data.guest_user.mobile_no,
            password: obj.data.guest_user.password,
            user_name: obj.data.guest_user.user_name,
            associated_resource: obj.data.guest_user.associated_resource
        };
        return model = Ext.create('CaptivePortal.model.guest_user.GuestUser', model_obj);
    },
    uploadGuestUser: function(){
        this.fireEvent('setGuestUsersMainActiveItem', 2);
	Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Upload '+CaptivePortal.Constant.MANAGEMENT.WIFIUSERS+' CSV');
        this.createSites('upload_guest_user_frm');
    },
    getGuestUsers: function(){
        var store = this.getView().lookupReference('grd_guest_users_list').getStore();
        store.load();
    }
});

Ext.define('CaptivePortal.view.users.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userlistcontroller',
    listen: {
        component: {
            'button#btn_adduser': {
                click: 'showAddEditMaster'
            }
        },
        controller:{
            '*':{
                refreshUserList:'getUsers'
            }
        }
           
    },
    showAddEditMaster: function () {
        this.fireEvent('showAddEditMaster', this);
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createUserModel(resObj.data.user_profile, true);
                        debugger
                        var tenant = record.data.tenant_id
                        console.log(record)
                      //  CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this, {
                            //roleData: resObj.data.roles, tenantData: resObj.data.tenants, sites: resObj.data.sites, user_id: resObj.data.user_profile.id});
                        var tenantStr = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
                        tenantStr.load();
                        tenantStr.on('load',function(str,rec){
                            debugger
                            console.log(rec)
                        })
                        var data = tenantStr.find('id',tenant);
                        var form = Ext.ComponentQuery.query('#userform')[0];
                        form.loadRecord(record);
                        //this.getAllRoles();
                        this.selectRole(form.down('#role'));
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteUser(view, record, item, index, e, eOpts);
            }
        }
    },
    createUserModel: function (user, idNeed) {
        var siteNames = [];
        Ext.Array.each(user.sites, function (s) {
            siteNames.push((!idNeed) ? s.name : s.id);
        });
        return userModel = Ext.create('CaptivePortal.model.user.User', {
            name: user.name,
            id: user.id,
            email: user.user.email,
            site_ids: siteNames.join(),
            site_role_id: (!idNeed) ? user.site_role.name : user.site_role.id,
            tenant_id: (!idNeed) ? user.tenant.name : user.tenant.id,
            status: user.status
        });
    },
    deleteUser: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete User',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.getCmp('viewport').setLoading(true);
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_USER + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getUsers();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    getUsers: function () {
        var store = this.getView().lookupReference('grd_userlist').getStore();
        store.load();
        store.on('load', function () {
            Ext.getCmp('viewport').setLoading(false);
        })
    },
})
 //# sourceURL=http://localhost:8383/CP/app/view/users/UserListController.js
Ext.define('CaptivePortal.view.users.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userlistcontroller',
    listen: {
        component: {
            'button#btn_adduser': {
                click: 'showAddEditMaster'
            }
        },
        controller: {
            '*': {
                refreshUserList: 'getUsers'
            }
        }

    },
    showAddEditMaster: function () {
        this.fireEvent('showAddEditMaster', this);
        this.clearForm();
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        Ext.getCmp('viewport').setLoading(true);
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                debugger
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createUserModel(resObj.data.user_profile, true);
                        var tenant = record.data.tenant_id
                        var availableroles = resObj.data.user_profile.available_roles;
                        if (availableroles.length > 0)
                            me.fireEvent('showUsersAccessPermission', availableroles, true, resObj.data.user_profile.id);
                        else
                            me.fireEvent('showUsersAccessPermission', availableroles, false, resObj.data.user_profile.id);
                        console.log(record)
                        // //  CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this, {
                        // //roleData: resObj.data.roles, tenantData: resObj.data.tenants, sites: resObj.data.sites, });

                        this.fireEvent('getUsersMainData', function (resp, store) {
                            if (resp) {
                                var data = store.findRecord('id', tenant);
                                record.data.tenant_id = data.data.id;
                                me.fireEvent('getUsersSiteData', tenant, function (store) {
                                    var form = Ext.ComponentQuery.query('#userform')[0];
                                    form.loadRecord(record);
                                    Ext.getCmp('viewport').setLoading(false);
                                }.bind(this));
                            }
                        }.bind(this))
                    }
                }.bind(this), function (response) {
                    Ext.getCmp('viewport').setLoading(false);
                }, 'GET');
            } else {
                this.deleteUser(view, record, item, index, e, eOpts);
            }
        }
    },
    clearForm: function () {
        var form = Ext.ComponentQuery.query('#userform')[0];
        var userid = form.down('hiddenfield');
        userid.setValue('');
        var name = userid.nextNode('textfield');
        name.setValue('')
        var email = name.nextNode('textfield');
        email.setValue('');
        var tenant = email.nextNode('combobox');
        tenant.setValue('');
        var site = tenant.nextNode('combobox');
        site.setValue('');
        site.getStore().removeAll();
        var role = site.nextNode('combobox');
        role.setValue('');
        var label = role.nextNode('label');
        var permlabel = label.nextNode('label')
        permlabel.setVisible(false);
        var container = permlabel.nextNode('container')
        container.setVisible(false);
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
                            Ext.getCmp('viewport').setLoading(false);
                        }
                    }.bind(this), function (response) {
                        Ext.getCmp('viewport').setLoading(false);
                    }, 'DELETE');
                } else if (btn === 'no') {
                    Ext.getCmp('viewport').setLoading(false);
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

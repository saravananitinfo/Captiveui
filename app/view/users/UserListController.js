Ext.define('CaptivePortal.view.users.UserListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.userlistcontroller',
    id: 'vc_userlistcontroller',
    listen: {
        component: {
            'button#btn_adduser': {
                click: 'showAddEditMaster'
            }
        },
        controller: {
            '#users_maincontroller': {
                refreshUserList: 'getUsers'
            },
            '#vc_usersaddoreditcontroller': {
                refreshUserList: 'getUsers'
            }
        }
    },
    showAddEditMaster: function () {
        this.fireEvent('showAddEditMaster', 1);
        this.clearForm();
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Edit User');
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createUserModel(resObj.data.user_profile, true);
                        var tenant = record.data.tenant_id
                        var availableroles = resObj.data.user_profile.available_roles;
                        var roles = resObj.data.roles;
                        if (availableroles.length > 0)
                            me.fireEvent('showUsersAccessPermission', roles, availableroles, true, resObj.data.user_profile.id);
                        else
                            me.fireEvent('showUsersAccessPermission', roles, availableroles, false, resObj.data.user_profile.id);
                        me.fireEvent('setEdit', resObj.data);
                    }
                }.bind(this), function (response) {
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
        userid.clearInvalid();
        var name = userid.nextNode('textfield');
        name.setValue('');
        name.clearInvalid();
        var email = name.nextNode('textfield');
        email.setValue('');
        email.clearInvalid();
        var tenant = email.nextNode('combobox');
        tenant.setValue('');
        tenant.clearInvalid();
        var site = tenant.nextNode('combobox');
        site.setValue('');
        site.clearInvalid();
        site.getStore().removeAll();
        var role = site.nextNode('combobox');
        role.setValue('');
        role.clearInvalid();
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
        var me = this;
        Ext.Msg.show({
            title: 'Delete User',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_USER + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
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
    },
})
//# sourceURL=http://localhost:8383/CP/app/view/users/UserListController.js
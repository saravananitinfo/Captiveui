Ext.define('CaptivePortal.view.users.AddOrEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',
    id: 'vc_usersaddoreditcontroller',
    requires: ['CaptivePortal.model.role.RoleAccess'],
    listen: {
        controller: {
            '#vc_users_maincontroller': {
                setNew: 'bindStoreForNew',
                getUsersSiteData: 'getSitesData'
            },
            '#vc_userlistcontroller': {
                getUsersSiteData: 'getSitesData',
                showUsersAccessPermission: 'showAccessPermission',
                setEdit: 'setDataForEdit'
            }
        }
    },
    bindStoreForNew: function (data) {
        var tagsAndSites = CaptivePortal.util.Utility.createSitesAndTags(data);
        if (CaptivePortal.app.getUserRole() === "super_admin") {
            this.getView().lookupReference('cmb_siterole').getStore().setData(data.roles);
            this.getView().lookupReference('cmb_tenant').getStore().setData(data.tenants);
        } else {
            this.getView().lookupReference('cmb_tenant').setValue(CaptivePortal.app.getUserTenantID());
            //this.getView().lookupReference('tf_site').getStore().setData(data.sites);
            this.getView().lookupReference('cmb_siterole').getStore().setData(data.roles);
        }
        this.getView().lookupReference('tf_site').store.loadRawData(tagsAndSites);
    },
    setDataForEdit: function (data) {
        data.roles && data.roles.length > 0 ? this.getView().lookupReference('cmb_siterole').getStore().setData(data.roles) : "";
        data.tenants && data.tenants.length > 0 ? this.getView().lookupReference('cmb_tenant').getStore().setData(data.tenants) : "";
        //data.sites && data.sites.length > 0 ? this.getView().lookupReference('tf_site').getStore().setData(data.sites) : "";
        var tagsAndSites = CaptivePortal.util.Utility.createSitesAndTags(data);
        this.getView().lookupReference('tf_site').store.loadRawData(tagsAndSites);
        var record = this.createUserModel(data.user_profile, true);
        var form = Ext.ComponentQuery.query('#userform')[0];
        form.loadRecord(record)
    },
    setUserId: function (userid) {
        this.getView().lookupReference('hf_userid').setValue(userid);
        this.getView().lookupReference('btn_save').setText('Update');
    },
    onTenantComboRender: function () {
        var combo = this.getView().lookupReference('cmb_tenant');
        if (CaptivePortal.app.getUserRole() === "super_admin") {
            // do nothing
        } else {
            combo.setVisible(false);
            combo.previousNode('label').setVisible(false);
            combo.setValue(CaptivePortal.app.getUserTenantID())
        }
    },
    showAccessPermission: function (roles, data, view, userid) {
        if (userid != null && userid != undefined)
            this.setUserId(userid)
        if (view) {
            this.getView().lookupReference('lab_permittedroles').setVisible(true);
            this.getView().lookupReference('con_permittedroles').setVisible(true);
            var rolesStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');

            rolesStr.setData(roles)
            var accesspermissionStr = Ext.StoreManager.lookup('CaptivePortal.store.users.AccessPermission');
            var record = [];
            Ext.Array.each(rolesStr.data.items, function (roledata, index) {             
                record.push({
                    id: roledata.data.id,
                    name: roledata.data.name,
                    write: false,
                    permission: 0
                })
            });
            Ext.Array.each(data, function (permission, index) {
                Ext.Array.each(record, function (rec, index) {
                    if (rec.id === permission.id) {
                        record[index].permission = 1;
                        record[index].write = true;
                    }
                })
            })
            accesspermissionStr.setData(record);
            this.getView().lookupReference('grd_permittedusers').setStore(accesspermissionStr);
        } else {
            this.getView().lookupReference('lab_permittedroles').setVisible(false);
            this.getView().lookupReference('con_permittedroles').setVisible(false);
            this.getView().lookupReference('grd_permittedusers').getStore().removeAll();
        }
        this.fireEvent('setActiveUserCard', 1);
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
    createUsers: function () {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var roles = resObj.data.roles;
                var tenants = resObj.data.tenants;
                var sites = [];
                CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this, {
                    roleData: roles, tenantData: tenants, sites: sites});
                CaptivePortal.util.Utility.setHeightForCommonContainer();
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
    },
    cancelUser: function () {
        var me = this;
        me.fireEvent('setActiveUserCard', 0);
        var heading = Ext.ComponentQuery.query('label#lab_appheading')[0];
        heading.setText('Users');
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
            site_ids: siteNames,
            site_role_id: (!idNeed) ? user.site_role.name : user.site_role.id,
            tenant_id: (!idNeed) ? user.tenant.name : user.tenant.id,
            status: user.status
        });
    },
    createUsersFromArray: function (users) {
        var usersObj = [];
        Ext.Array.each(users, function (user) {
            usersObj.push(this.createUserModel(user));
        }.bind(this));

        return usersObj;
    },
    getUsers: function () {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_USER, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var usersModel = this.createUsersFromArray(resObj.data.user_profiles);
                this.getView().down('grid').store.loadData(usersModel);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
    },
    selectTenant: function (combo, record, eopts) {
        var siteCombo = combo.nextNode('combo');
        siteCombo.clearValue();
        if (combo.getValue()) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SITES_FOR_TENANT + combo.getValue() + '/get_sites.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var sites = resObj.data.sites ? resObj.data.sites : [];
                    var siteStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Site');
                    siteStr.setData(sites);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, 'GET');
        }
    },
    getSitesData: function (value, callback) {
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SITES_FOR_TENANT + value + '/get_sites.json', {}, 'CaptivePortal.app.getWaitMsg()', Ext.getCmp('viewport'), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var sites = resObj.data.sites ? resObj.data.sites : [];
                var siteStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Site');
                siteStr.setData(sites);
                me.getView().lookupReference('tf_site').bindStore(siteStr);
                callback(siteStr);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
    },
    selectRole: function (combo, record, eopts) {
        var me = this;
        if (combo.getValue()) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + combo.getValue() + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var accesses = resObj.data.site_role.site_accesses;
                    var permittedRoles = [];
                    Ext.Array.each(accesses, function (rec) {
                        if (rec.access_for === "users") {
                            if (rec.write === true || rec.read == true) {
                                me.getView().lookupReference('lab_permittedroles').setVisible(true);
                                me.getView().lookupReference('con_permittedroles').setVisible(true);
                                me.getView().lookupReference('grd_permittedusers').setStore('CaptivePortal.store.users.Role');
                            } else {
                                me.getView().lookupReference('lab_permittedroles').setVisible(false);
                                me.getView().lookupReference('con_permittedroles').setVisible(false);
                            }
                        }
                    });
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, 'GET');
        }
    },
    saveUser: function () {
     
        var me = this;
        var form = this.getView().down('form');
        if (form.isValid()) {
            var formValues = form.getForm().getValues();
            if (formValues.user_id) {
                form.updateRecord();
            } else {
                var userModel = Ext.create('CaptivePortal.model.user.User');
                form.updateRecord(userModel);
            }

            var permissionGrid = form.down('grid');
            var permissions = [];
            permissionGrid.store.each(function (rec) {
                if (rec.data.write) {
                    permissions.push(rec.id);
                }
            }.bind(this));

            var saveJson = {'user_profile': {'user_attributes': {'email': formValues.email}}};
            for (var key in formValues) {
                if (key != 'email') {
                    saveJson['user_profile'][key] = formValues[key];
                }
            }
            saveJson['user_profile']['available_roles'] = permissions;

            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_USER;
            var method = "POST";
            if (formValues.user_id) {
                //saveJson = formValues;
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_USER + formValues.user_id + '.json';
                method = "PUT";
            }
            console.log(Ext.JSON.encode(saveJson))
            CaptivePortal.util.Utility.doAjaxJSON(url, saveJson, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success != 'false') {
                    me.fireEvent('setActiveUserCard', 0);
                    Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Users');
                    Ext.toast({
                        html: 'Data Saved',
                        title: 'Info',
                        width: 200,
                        align: 't'
                    });
                    me.fireEvent('refreshUserList');
                } else {
                    Ext.Msg.alert('Info', resObj.message[0]);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, method);
        }
    },
    permissionRowClick: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "permission") {
                record.data.write = e.target.checked;
            }
        }
    }
});





//# sourceURL=http://localhost:8383/CP/app/view/users/UserController.js

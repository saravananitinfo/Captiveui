Ext.define('CaptivePortal.view.users.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',
    requires: ['CaptivePortal.model.role.RoleAccess'],
    listen: {
        controller: {
            '*': {
                getUsersSiteData: 'getSitesData',
                showUsersAccessPermission: 'showAccessPermission'
            }
        }
    },
    setUserId: function (userid) {
        this.getView().lookupReference('hf_userid').setValue(userid);
        this.getView().lookupReference('btn_save').setText('Update');
    },
    showAccessPermission: function (data, view, userid) {
        console.log('------------.');
        console.log(data);
        if (userid != null && userid != undefined)
            this.setUserId(userid)
        if (view) {
            this.getView().lookupReference('lab_permittedroles').setVisible(true);
            this.getView().lookupReference('con_permittedroles').setVisible(true);
            var rolesStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');
            var accesspermissionStr = Ext.StoreManager.lookup('CaptivePortal.store.users.AccessPermission');
            var record = [];
            Ext.Array.each(rolesStr.data.items, function (roledata, index) {
                record.push({
                    id: roledata.data.id,
                    name: roledata.data.name,
                    permission: 0
                })
            });
            Ext.Array.each(data, function (permission, index) {
                Ext.Array.each(record, function (rec, index) {
                    if (rec.id === permission.id) {
                        record[index].permission = 1;
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
        this.fireEvent('showUsersEditView', 1);
    },
    deleteUser: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete User',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
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
    createUsers: function () {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var roles = resObj.data.roles;
                var tenants = resObj.data.tenants;
                var sites = [];
                CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this, {
                    roleData: roles, tenantData: tenants, sites: sites});
                CaptivePortal.util.Utility.setHeightForCommonContainer();
                //this.getAllRoles();
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
        me.fireEvent('setUsersActiveItem', 0);
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
            site_ids: siteNames.join(),
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
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_USER, {}, function (response) {
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
        Ext.getCmp('viewport').setLoading(true);
        var siteCombo = combo.nextNode('combo');
        siteCombo.clearValue();
        if (combo.getValue()) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SITES_FOR_TENANT + combo.getValue() + '/get_sites.json', {}, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var sites = resObj.data.sites ? resObj.data.sites : [];
                    var siteStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Site');
                    siteStr.setData(sites);
                    Ext.getCmp('viewport').setLoading(false);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    Ext.getCmp('viewport').setLoading(false);
                }
            }, 'GET');
        }
    },
    getSitesData: function (value, callback) {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SITES_FOR_TENANT + value + '/get_sites.json', {}, function (response) {
            debugger
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var sites = resObj.data.sites ? resObj.data.sites : [];
                var siteStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Site');
                siteStr.setData(sites);
                callback(siteStr);
                Ext.getCmp('viewport').setLoading(false);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                Ext.getCmp('viewport').setLoading(false);
            }
        }, 'GET');
    },
    getAllRoles: function () {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_ROLE, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var accesses = resObj.data.site_accesses ? resObj.data.site_accesses : [];
                var permittedRoles = [];
                Ext.Array.each(accesses, function (rec) {
                    permittedRoles.push({access_for: rec.access_for, write: false, id: rec.id});
                });
                Ext.ComponentQuery.query('grid')[0].store.loadRawData(permittedRoles);
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
        Ext.getCmp('viewport').setLoading(true);
        if (combo.getValue()) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + combo.getValue() + '/edit.json', {}, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var accesses = resObj.data.site_role.site_accesses;
                    var permittedRoles = [];
                    Ext.Array.each(accesses, function (rec) {
                        if (rec.access_for === "users") {
                            if (rec.write === true) {
                                me.getView().lookupReference('lab_permittedroles').setVisible(true);
                                me.getView().lookupReference('con_permittedroles').setVisible(true);
                                me.getView().lookupReference('grd_permittedusers').setStore('CaptivePortal.store.users.Role');
                            } else {
                                me.getView().lookupReference('lab_permittedroles').setVisible(false);
                                me.getView().lookupReference('con_permittedroles').setVisible(false);
                            }
                        }
                    });
//                    Ext.Array.each(accesses, function (rec) {
//                        permittedRoles.push({access_for: rec.access_for, write: false, id: rec.id});
//                    });
//                    var str = Ext.StoreManager.lookup('CaptivePortal.store.users.RoleAccess')
//                    str.setData(permittedRoles);
                    Ext.getCmp('viewport').setLoading(false);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
                Ext.getCmp('viewport').setLoading(false);
            }, 'GET');
        }
    },
    saveUser: function () {
        Ext.getCmp('viewport').setLoading(true);
        var me = this;
        var form = this.getView().down('form');
        debugger
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
                saveJson = formValues;
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_USER + formValues.user_id + '.json';
                method = "PUT";
            }

            CaptivePortal.util.Utility.doAjaxJSON(url, saveJson, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success != 'false') {
                    me.fireEvent('setUsersActiveItem', 0);
                    Ext.toast({
                        html: 'Data Saved',
                        title: 'Info',
                        width: 200,
                        align: 't'
                    });
                     Ext.getCmp('viewport').setLoading(false);
                } else {
                    Ext.getCmp('viewport').setLoading(false);
                    Ext.Msg.alert('Info', resObj.message[0])
                }
            }.bind(this), function (response) {
                Ext.getCmp('viewport').setLoading(false);
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, method);
        }
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        Ext.getCmp('viewport').setLoading(true);
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createUserModel(resObj.data.user_profile, true);                       
                        var form = Ext.ComponentQuery.query('#userform')[0];
                        form.loadRecord(record);
                        Ext.getCmp('viewport').setLoading(false);
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteUser(view, record, item, index, e, eOpts);
            }
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
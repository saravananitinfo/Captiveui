Ext.define('CaptivePortal.view.role.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.role',
    permissionRowClick: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "read") {
                record.data.read = e.target.checked;
            } else {
                record.data.write = e.target.checked;
            }
        }
    },
    deleteRole: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete Role',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_ROLE + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getRoles();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    editroleitem: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.AddOrEditRole', this, {role_access: resObj.data.site_role.site_accesses, role_name: resObj.data.site_role.name, role_id: resObj.data.site_role.id});
                        CaptivePortal.util.Utility.setHeightForCommonContainer();
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteRole(view, record, item, index, e, eOpts);
            }
        }
    },
    cancelRole: function () {
        CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this, {role_access: []});
        CaptivePortal.util.Utility.setHeightForCommonContainer();
    },
    getRoles: function () {
        CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.GET_ROLES, {},"Loading...",this.getView(), function (response) {
            var respObj = Ext.decode(response.responseText);
            this.getView().down('grid').store.loadRawData(respObj.data);
        }.bind(this), function (response) {
        }, 'GET');
        CaptivePortal.util.Utility.setHeightForCommonContainer();
    },
    saveRole: function (button) {
        var form = this.getView().down('form');
        if (form.isValid()) {
            var roleName = form.down('#role_name').getValue();
            var role_id = form.down('#role_id').getValue();
            var grid = form.down('grid');
            var permissions = [];
            grid.store.each(function (rec) {
                var recordValues = {};
                for (var key in rec.data) {
                    recordValues[key] = rec.data[key];
                }
                if (!role_id) {
                    delete recordValues.id;
                }
                permissions.push(recordValues);
            }.bind(this));

            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_ROLE, method = 'POST';
            var json = {site_role: {name: roleName, site_accesses_attributes: permissions}};
            if (role_id) {
                json.site_role['id'] = role_id;
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_ROLE + role_id + '.json';
                method = 'PUT';
            }

            CaptivePortal.util.Utility.doAjaxJSON(url, json,"Loading...",this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this);
                    CaptivePortal.util.Utility.setHeightForCommonContainer();
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }

            }, method);

        }
    },
    createNewRole: function () {
        var view = this.getView();
        if (view) {
            if (!view.role_id) {
                var accesses = [];
                CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.NEW_ROLE, {},"Loading...",this.getView(), function (response) {
                    var respObj = Ext.decode(response.responseText);
                    accesses = (respObj.data && respObj.data.site_accesses) ? respObj.data.site_accesses : [];
                    this.getView().down('grid').store.loadRawData(accesses);
                }.bind(this), function (response) {
                }, 'GET');
            }
        }
    },
    createRoles: function () {
        CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.AddOrEditRole', this);
        CaptivePortal.util.Utility.setHeightForCommonContainer();
    }
});

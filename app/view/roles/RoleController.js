Ext.define('CaptivePortal.view.roles.RoleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rolelistcontroller',
    listen: {
    component: {
      'button#btn_addrole': {
        click: 'showAddEditRole'
      }
    }
	},
	showAddEditRole: function () {
		this.fireEvent('showAddEditRole', this);
    },
    getRoles: function () {
        var store = this.getView().lookupReference('grd_rolelist').getStore();
        store.load();
        store.on('load', function (store, record) {
            console.log(record)
        })
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
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
    deleteRole: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete Role',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_ROLE + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
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
    cancelRole: function () {
        var me = this;
        me.fireEvent('setRoleMainActiveItem', 0);
    },
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
    saveRole: function () {
        Ext.getCmp('viewport').setLoading(true);
        var me = this;
        var form = this.getView().down('form');
        if (form.isValid()) {
            var formValues = form.getForm().getValues();
            console.log("fffffffffffffffffff")
            console.log(formValues);
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


            if (formValues.role_id) {
                form.updateRecord();
            } else {
                var roleModel = Ext.create('CaptivePortal.model.role.RoleAccess');
                form.updateRecord(roleModel);
            }


            
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_ROLE, method = 'POST';
            var json = {site_role: {name: roleName, site_accesses_attributes: permissions}};
            if (role_id) {
                json.site_role['id'] = role_id;
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_ROLE + role_id + '.json';
                method = 'PUT';
            }
         
            CaptivePortal.util.Utility.doAjaxJSON(url, json, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success != 'false') {     
                	var rolestr  = Ext.StoreManager.lookup('CaptivePortal.store.role.Role');
						rolestr.reload();               
                    me.fireEvent('setRoleMainActiveItem', 0);
                    console.log("save.........save..........save");
                    Ext.toast({
                        html: 'Data Saved',
                        title: 'Info',
                        width: 200,
                        align: 't'
                    });
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
    }
})
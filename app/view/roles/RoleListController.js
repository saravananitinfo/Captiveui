Ext.define('CaptivePortal.view.roles.RoleListController',{
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
		this.clearForm();
    },
    getRoles: function () {
        var store = this.getView().lookupReference('grd_rolelist').getStore();
        store.load();
        store.on('load', function (store, record) {
            console.log(record)
        })
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        var me = this
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        // CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.AddOrEditRole', this, {role_access: resObj.data.site_role.site_accesses, role_name: resObj.data.site_role.name, role_id: resObj.data.site_role.id});
                        // CaptivePortal.util.Utility.setHeightForCommonContainer();

                        var record = this.createRoleModel(resObj.data.site_role, true);
                        var roleStr  = Ext.StoreManager.lookup('CaptivePortal.store.role.RoleAccess');
                        roleStr.setData(resObj.data.site_role.site_accesses);
                        me.fireEvent('setTenantEditViewForm', record);
                        console.log("..................1")

                        
                        // console.log("..................2")
                        // this.fireEvent('myEditRole', 1);
                        // console.log("..................2")
                        // view.getView().lookupReference('btn_save').setText('Update'); 
                        // console.log("..................3") 
                        // var form = Ext.ComponentQuery.query('#roleform')[0];
                        // form.loadRecord(record);
                        // Ext.ComponentQuery.query('#permission_user_role_grid')[0].getView().refresh();
                        // console.log("..................4")
                        // console.log(resObj)
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteRole(view, record, item, index, e, eOpts);
            }
        }
    },
    createRoleModel: function (role, idNeed) {
        return userModel = Ext.create('CaptivePortal.model.role.Role', {
            role_name: role.name,
            role_id: role.id
        });
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
    clearForm: function () {
        var form = Ext.ComponentQuery.query('#roleform')[0];
        var tenantid = form.down('hiddenfield');
        tenantid.setValue('');
        var name = tenantid.nextNode('textfield');
        name.setValue('')

    }
});
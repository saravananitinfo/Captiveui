Ext.define('CaptivePortal.view.tenants.TenantListController', {
    extend: 'Ext.app.ViewController',
    id:'vc_tenantlistcontroller',
    alias: 'controller.tenantlistcontroller',
    listen: {
        component: {
            'button#btn_addtenant': {
                click: 'showAddEditTenant'
            }
        }
    },
    showAddEditTenant: function () {
        this.fireEvent('showAddEditTenant', this);
        this.clearForm();
    },
    getTenantList: function () {       
        var store = this.getView().lookupReference('grd_tenantlist').getStore();
        store.load();
        store.on('load', function (store, record) {
            Ext.getCmp('viewport').setLoading(false);
            console.log(record)
        })
    },
    doAssumeUser: function(view, record, item, index, e, eOpts){        
        /*var url = CaptivePortal.Config.SERVICE_URLS.ASSUME_USER_TENANT + record.data.id + '/get_users.json';
        CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
            }
        }.bind(this), function (response) {
        }, 'GET');*/
        this.fireEvent('setTenantMainActiveItem', 2);
        var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
        laab.setText('Assumed Users');
        this.fireEvent('getAssumeList', record);

    },
    userItemClick: function (view, record, item, index, e, eOpts) {
        var me = this
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_TENANT + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var record = this.createTenantModel(resObj.data.tenant, true);
                        console.log("...........record....");
                        console.log(record);
                        me.fireEvent('setTenantEditViewForm', record);
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else if (action == "assume_user")  {
                this.doAssumeUser(view, record, item, index, e, eOpts);
            } else {
                this.deleteTenant(view, record, item, index, e, eOpts);
            }
        }
    },
    createTenantModel: function (tenant, idNeed) {
        return userModel = Ext.create('CaptivePortal.model.tenant.Tenant', {
            tenant_name: tenant.name,
            tenant_id: tenant.id
        });
    },
    deleteTenant: function (view, record, item, index, e, eOpts) {
        Ext.Msg.show({
            title: 'Delete Tenant',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    Ext.getCmp('viewport').setLoading(true);
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_TENANT + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {},"Loading...",this.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getTenantList();
                            Ext.StoreManager.lookup('CaptivePortal.store.site.Site').reload();
                            Ext.StoreManager.lookup('CaptivePortal.store.user.User').reload();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    clearForm: function () {
        var form = Ext.ComponentQuery.query('#tenantform')[0];
        var tenantid = form.down('hiddenfield');
        tenantid.setValue('');
        var name = tenantid.nextNode('textfield');
        name.setValue('')

    }
});

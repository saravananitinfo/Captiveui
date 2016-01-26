Ext.define('CaptivePortal.view.tenants.AddOrEditTenantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tenants',
    requires: ['CaptivePortal.model.tenant.Tenant'],
    listen: {
        controller: {
            '#vc_tenantlistcontroller': {
                setTenantEditViewForm: "onSetTenantEditViewForm"
            }
        }
    },
    onSetTenantEditViewForm: function (record) {
        this.fireEvent('showTenantEditView', 1);
        var form = Ext.ComponentQuery.query('#tenantform')[0];
        form.loadRecord(record);
        this.getView().lookupReference('btn_save').setText('Update');
    },
    saveTenant: function () {
        var form = this.getView().down('form');
        if (form.isValid()) {
            var tenant_Name = form.down('#tenant_name').getValue().trim();
            var tenant_id = form.down('#tenant_id').getValue();
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_TENANT, method = 'POST';
            var json = {tenant: {name: tenant_Name}};
            if (tenant_id) {
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_TENANT + tenant_id + '.json';
                method = 'PUT';
            }
            CaptivePortal.util.Utility.doAjaxJSON(url, json, "Loading..", this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var tenantStr = Ext.StoreManager.lookup('CaptivePortal.store.tenant.Tenant');
                    tenantStr.reload();
                    this.fireEvent('setTenantMainActiveItem', 0);
                    console.log("save.........save..........save");
                    Ext.StoreManager.lookup('CaptivePortal.store.site.Site').reload();
                    Ext.StoreManager.lookup('CaptivePortal.store.user.User').reload();
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, method);
        }
    },
    cancelTenant: function () {       
        this.fireEvent('setTenantMainActiveItem', 0);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Tenants');
    }
});
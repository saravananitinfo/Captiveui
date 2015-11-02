Ext.define('CaptivePortal.view.tenants.TenantController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.tenants',
    requires: ['CaptivePortal.model.tenant.Tenant'],
    listen:{
    	controller:{
    		'*':{
    			setTenantEditViewForm: "onSetTenantEditViewForm"
    		}
    	}
    },
    onSetTenantEditViewForm: function(record){
        this.fireEvent('showTenantEditView', 1);
        var form = Ext.ComponentQuery.query('#tenantform')[0];
        form.loadRecord(record);
        this.getView().lookupReference('btn_save').setText('Update');
    },
    saveTenant: function () {
      var form = this.getView().down('form');
			if(form.isValid()){
				var tenant_Name = form.down('#tenant_name').getValue().trim();
				var tenant_id = form.down('#tenant_id').getValue();
				var url = CaptivePortal.Config.SERVICE_URLS.SAVE_TENANT, method = 'POST';
				var json = {tenant : {name : tenant_Name}};
				if(tenant_id){
					url = CaptivePortal.Config.SERVICE_URLS.UPDATE_TENANT + tenant_id + '.json';
					method = 'PUT';
				}
				CaptivePortal.util.Utility.doAjaxJSON(url,json,function(response){		
					var resObj = Ext.decode(response.responseText);
					if(resObj.success){
						// CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListTenant', this);
						// CaptivePortal.util.Utility.setHeightForCommonContainer();

//						var store = this.getView().lookupReference('CaptivePortal.store.tenant.Tenant').getStore();
	//					store.reload();
						var tenantStr  = Ext.StoreManager.lookup('CaptivePortal.store.tenant.Tenant');
						tenantStr.reload();
						this.fireEvent('setTenantMainActiveItem', 0);
						console.log("save.........save..........save");
					}				
					}.bind(this),function(response){
					var resObj = Ext.decode(response.responseText);
					if(!resObj.success && resObj.error.length){
						CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
					}			
					},method);
			}
    },
    cancelTenant: function () {
        var me = this;
        me.fireEvent('setTenantMainActiveItem', 0);
    }
});
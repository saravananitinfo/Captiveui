Ext.define('CaptivePortal.view.tenant.TenantController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tenant',
	deleteTenant: function(view, record, item, index, e, eOpts){
		Ext.Msg.show({
			title:'Delete Tenant',
			message: 'Do you want to delete?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var url = CaptivePortal.Config.SERVICE_URLS.DELETE_TENANT + record.data.id + '.json';
					CaptivePortal.util.Utility.doAjax(url,{},function(response){
						var resObj = Ext.decode(response.responseText);
						if(resObj.success){
							this.loadTenants();
						}
					}.bind(this),function(response){},'DELETE');
				} else if (btn === 'no') {
					
				} 
			}.bind(this)
		});
	},
	cancelTenant: function(){
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListTenant', this);
		CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	editTenantItemClick: function(view, record, item, index, e, eOpts){
		var action = e.target.getAttribute('action');
		if(action){
			if(action == "edit"){
			var url = CaptivePortal.Config.SERVICE_URLS.EDIT_TENANT + record.data.id + '/edit.json';
				CaptivePortal.util.Utility.doAjax(url,{},function(response){
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var obj = {tenant_id : resObj.data.tenant.id, tenant_name :resObj.data.tenant.name };
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.AddOrEditTenant', this, obj);
					CaptivePortal.util.Utility.setHeightForCommonContainer();
				}
			}.bind(this),function(response){},'GET');
			} else {
				this.deleteTenant(view, record, item, index, e, eOpts);
			}
		}
	},
	saveTenant: function(btn){
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
			CaptivePortal.util.Utility.doAjaxJSON(url,json, "Loading...", this.getView(),function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListTenant', this);
					CaptivePortal.util.Utility.setHeightForCommonContainer();
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},method);
		}
	},
	getNewTenant: function(){
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.NEW_TENANT,{},function(response){
				var respObj = Ext.decode(response.responseText);
				if(respObj.success){
					var obj = {tenant_id : respObj.data.tenant.id};
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.AddOrEditTenant', this, obj);
				}
			}.bind(this),function(response){},'GET');
	},
	loadTenants: function(){
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.GET_TENANTS,{},function(response){
				var respObj = Ext.decode(response.responseText);
				if(respObj.success){
					this.getView().down('grid').store.loadRawData(respObj.data);	
				}
			}.bind(this),function(response){},'GET');
			CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	createTenants:function(){
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.AddOrEditTenant', this);
		CaptivePortal.util.Utility.setHeightForCommonContainer();
		//this.getNewTenant();
	},
});

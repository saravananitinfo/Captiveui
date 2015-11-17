Ext.define('CaptivePortal.view.site.SiteController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.site',
	deleteSite: function(view, record, item, index, e, eOpts){
		Ext.Msg.show({
			title:'Delete Tenant',
			message: 'Do you want to delete?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SITE + record.data.id + '.json';
					CaptivePortal.util.Utility.doAjax(url,{},function(response){
						var resObj = Ext.decode(response.responseText);
						if(resObj.success){
							this.loadSites();
						}
					}.bind(this),function(response){},'DELETE');
				} else if (btn === 'no') {
					
				} 
			}.bind(this)
		});
	},
	cancelSite: function(){
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListSite', this);
		CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	editSiteItemClick: function(view, record, item, index, e, eOpts){
		var action = e.target.getAttribute('action');
		if(action){
			if(action == "edit"){
			var url = CaptivePortal.Config.SERVICE_URLS.EDIT_SITE + record.data.id + '/edit.json';
				CaptivePortal.util.Utility.doAjax(url,{},function(response){
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var model = Ext.create('CaptivePortal.model.site.Site', resObj.data.site);
					this.createSites();
					Ext.ComponentQuery.query('#site_form')[0].getForm().loadRecord(model);
				}
			}.bind(this),function(response){},'GET');
			} else {
				this.deleteSite(view, record, item, index, e, eOpts);
			}
		}
	},
	saveSite: function(btn){
		var form = this.getView().down('form');
		if(form.isValid()){
			var site_Name = form.down('#name').getValue().trim();
			var site_id = form.down('#site_id').getValue();
			var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SITE, method = 'POST';
			var formValues = form.getValues();
			var json = {site : formValues };
			if(site_id){
				url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SITE + site_id + '.json';
				method = 'PUT';
			}
			CaptivePortal.util.Utility.doAjaxJSON(url, json, "Loading...", this.getView(),function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.site.ListSite', this);
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
	getTageStore: function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data:[{id:'1', name : 'tag1'},
			{id:'2', name : 'tag2'},
			{id:'3', name : 'tag3'}]
		});
		return store;
	},
	getTimezoneStore: function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data:[{id:'1', name : '(UTC +5.00) Tashkent'},
			{id:'2', name : '(UTC +5.30) Chenai, Kolkata, Mumbai , Delhi'},
			{id:'3', name : '(UTC +6.00) Astanan'}]
		});
		return store;
	},
	getUsers: function(){
		var store = null;
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.GET_USER,{},function(response){
				var respObj = Ext.decode(response.responseText);
				if(respObj.success){
				var userProfiles = respObj.data ? respObj.data.user_profiles : [];
					store = Ext.create('CaptivePortal.store.user.User', {data:userProfiles});
				}
			}.bind(this),function(response){},'GET', false);
			return store;
	},
	getTenants: function(){
		var store = null;
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.GET_TENANTS,{},function(response){
				var respObj = Ext.decode(response.responseText);
				if(respObj.success){
					store = Ext.create('CaptivePortal.store.tenant.Tenant', {data:respObj.data});
				}
			}.bind(this),function(response){},'GET', false);
			return store;
	},
	loadSites: function(){
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOAD_SITE,{},function(response){
				var respObj = Ext.decode(response.responseText);
				if(respObj.success){
					this.getView().down('grid').store.loadRawData(respObj.data.sites);	
				}
			}.bind(this),function(response){},'GET');
	},
	getCountryStore: function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data:[{id:'1', name : 'India'},
			{id:'2', name : 'Engaland'},
			{id:'3', name : 'United States Of America'}]
		});
		return store;
	},
	getStateStore: function(){
		var store = Ext.create('Ext.data.Store',{
			fields:['id', 'name'],
			data:[{id:'1', name : 'Karnataka'},
			{id:'2', name : 'Kerala'},
			{id:'3', name : 'Uthar Pradesh'}]
		});
		return store;
	},
	createSites:function(){
		var tenantStore = this.getTenants();
		var userStore = this.getUsers();
		var timezoneStore = this.getTimezoneStore();
		var tagsStore = this.getTageStore();
		var stateStore = this.getStateStore();
		var countryStore = this.getCountryStore();
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.site.AddOrEditSite', this
		,{
			tenantStore:tenantStore,
			userStore:userStore,
			timezoneStore: timezoneStore,
			tagsStore:tagsStore,
			stateStore:stateStore,
			countryStore:countryStore
		});
	CaptivePortal.util.Utility.setHeightForCommonContainer();	
	}
});

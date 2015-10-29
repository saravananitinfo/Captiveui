Ext.define('CaptivePortal.view.user.UserController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users',
	requires:['CaptivePortal.model.role.RoleAccess'],
	deleteUser: function(view, record, item, index, e, eOpts){
		Ext.Msg.show({
			title:'Delete User',
			message: 'Do you want to delete?',
			buttons: Ext.Msg.YESNO,
			icon: Ext.Msg.QUESTION,
			fn: function(btn) {
				if (btn === 'yes') {
					var url = CaptivePortal.Config.SERVICE_URLS.DELETE_USER + record.data.id + '.json';
					CaptivePortal.util.Utility.doAjax(url,{},function(response){
						var resObj = Ext.decode(response.responseText);
						if(resObj.success){
							this.getUsers();
						}
					}.bind(this),function(response){},'DELETE');
				} else if (btn === 'no') {
					
				} 
			}.bind(this)
		});
	},
	createUsers: function(){
		CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER,{},function(response){		
			var resObj = Ext.decode(response.responseText);
                                if(resObj.success){
				var roles = resObj.data.roles;
				var tenants = resObj.data.tenants;
				var sites = [];
				CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this,{ 
				roleData : roles, tenantData : tenants, sites:sites});
				CaptivePortal.util.Utility.setHeightForCommonContainer();	
				//this.getAllRoles();
			}				
			}.bind(this),function(response){
			var resObj = Ext.decode(response.responseText);
			if(!resObj.success && resObj.error.length){
				CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
			}			
			},'GET');
		
	},
	cancelUser: function(){
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.ListUser', this);
		CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	createUserModel: function(user, idNeed){
		var siteNames = [];
			Ext.Array.each(user.sites, function(s){
				siteNames.push((!idNeed) ? s.name : s.id);
			});
			return userModel = Ext.create('CaptivePortal.model.user.User',{
				name:user.name,
				id:user.id,
				email:user.user.email,
				site_ids:siteNames.join(),
				site_role_id:(!idNeed) ? user.site_role.name : user.site_role.id,
				tenant_id:(!idNeed) ? user.tenant.name : user.tenant.id,
				status:user.status
			});
	},
	createUsersFromArray: function(users){
		var usersObj = [];
		Ext.Array.each(users, function(user){
			usersObj.push(this.createUserModel(user));
		}.bind(this));
		
		return usersObj;
	},
	
	getUsers: function(){
		CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_USER ,{},function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var usersModel = this.createUsersFromArray(resObj.data.user_profiles);
					this.getView().down('grid').store.loadData(usersModel);
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},'GET');
	
		
	},
	
	
	selectTenant: function(combo, record, eopts){
		if(combo.getValue()){
			CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SITES_FOR_TENANT + combo.getValue() + '/get_sites.json',{},function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var sites = resObj.data.sites ? resObj.data.sites : [];
					var store = Ext.create('Ext.data.Store',{ fields:['id', 'name'], data :sites} );
					Ext.ComponentQuery.query('#site')[0].bindStore(store);
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},'GET');
		}
	},
	
	getAllRoles: function(){
		CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_ROLE,{},function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var accesses = resObj.data.site_accesses ? resObj.data.site_accesses : [];
					var permittedRoles = [];
					Ext.Array.each(accesses, function(rec){  
						permittedRoles.push({access_for:rec.access_for, write:false, id:rec.id});
					});
					Ext.ComponentQuery.query('grid')[0].store.loadRawData(permittedRoles);
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},'GET');
	},
	selectRole: function(combo, record, eopts){
		if(combo.getValue()){
			CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_ROLE + combo.getValue() + '/edit.json',{},function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var accesses = resObj.data.site_role.site_accesses;
					var permittedRoles = [];
					Ext.Array.each(accesses, function(rec){  
						permittedRoles.push({access_for:rec.access_for, write:false, id:rec.id});
					});
					Ext.ComponentQuery.query('grid')[0].store.loadRawData(permittedRoles);
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},'GET');
		}
	},
	saveUser: function(){
		var form = this.getView().down('form');
		if(form.isValid()){
			var formValues = form.getForm().getValues();
			if(formValues.user_id){
				form.updateRecord();
			} else {
				var userModel = Ext.create('CaptivePortal.model.user.User');
				form.updateRecord(userModel);
			}
			
			var permissionGrid = form.down('grid');
			var permissions = [];
			permissionGrid.store.each(function(rec){
				if(rec.data.write){
					permissions.push(rec.id);
				}
			}.bind(this));
			
			var saveJson = {'user_profile' : {'user_attributes' : {'email':formValues.email}}};
			for(var key in formValues){
				if(key != 'email'){
					saveJson['user_profile'][key] = formValues[key];
				}
			}
			saveJson['user_profile']['available_roles'] = permissions;
			
			var url = CaptivePortal.Config.SERVICE_URLS.SAVE_USER;
			var method = "POST";
			if(formValues.user_id){
				saveJson = formValues;
				url = CaptivePortal.Config.SERVICE_URLS.UPDATE_USER + formValues.user_id + '.json';
				method = "PUT";
			}
			
			CaptivePortal.util.Utility.doAjaxJSON( url,saveJson,function(response){		
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.ListUser', this);
					CaptivePortal.util.Utility.setHeightForCommonContainer();	
				} else {
					
				}				
				}.bind(this),function(response){
				var resObj = Ext.decode(response.responseText);
				if(!resObj.success && resObj.error.length){
					CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
				}			
				},method);
		}
	},
	userItemClick:function(view, record, item, index, e, eOpts){
		var action = e.target.getAttribute('action');
		if(action){
			if(action == "edit"){
			var url = CaptivePortal.Config.SERVICE_URLS.EDIT_USER + record.data.id + '/edit.json';
				CaptivePortal.util.Utility.doAjax(url,{},function(response){
				var resObj = Ext.decode(response.responseText);
				if(resObj.success){
					var record = this.createUserModel(resObj.data.user_profile, true);
					CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.AddOrEditUser', this,{ 
				roleData : resObj.data.roles, tenantData : resObj.data.tenants, sites:resObj.data.sites, user_id:resObj.data.user_profile.id});
				var form = Ext.ComponentQuery.query('#userform')[0];
				form.loadRecord(record);
				//this.getAllRoles();
				this.selectRole(form.down('#role'));
				}
			}.bind(this),function(response){},'GET');
			} else {
				this.deleteUser(view, record, item, index, e, eOpts);
			}
		}
	},
	permissionRowClick:function(view, record, item, index, e, eOpts){
		var action = e.target.getAttribute('action');
		if(action){
			if(action == "permission"){
				record.data.write = e.target.checked;
			} 
		}
	}
});

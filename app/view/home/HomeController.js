Ext.define('CaptivePortal.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
	createUsers: function(){
		this.getView().lookupReference('pan_mainnavigation').setActiveItem(1);
		this.getView().lookupReference('lab_heading').setText('Users')
		//CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.ListUser', this);
		//CaptivePortal.util.Utility.setHeightForCommonContainer();	
	},
	createTenants: function(){
		this.getView().lookupReference('pan_mainnavigation').setActiveItem(2);
		this.getView().lookupReference('lab_heading').setText('Tenants')
		//CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListTenant', this);
		//CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	createSites: function(){
		CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.site.ListSite', this);
		CaptivePortal.util.Utility.setHeightForCommonContainer();	
	},
	createRoleTemplate: function(roleAccess){	
		this.getView().lookupReference('pan_mainnavigation').setActiveItem(3);
		this.getView().lookupReference('lab_heading').setText('Roles')
		// if(roleAccess){
		// 	CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this, {role_access : roleAccess});
		// } else {
		// 	CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this, {role_access : []});
		// }
		// CaptivePortal.util.Utility.setHeightForCommonContainer();
	},
	logout: function(){		
		CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGOUT,{},function(response){
			CaptivePortal.util.Utility.changeView('CaptivePortal.view.login.Login', this);
			Ext.util.Cookies.clear('CAP_SESSION');
		}.bind(this),function(response){},'DELETE');
		
	},
	home_render: function(){
		setTimeout(function(){
		var bodyTag = document.getElementsByTagName('body')[0];
			bodyTag.className = bodyTag.className + ' custom_bg_background';
		},100);			
	}
});

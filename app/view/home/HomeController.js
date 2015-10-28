Ext.define('CaptivePortal.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
    listen: {
        component: {
            'gridpanel#grd_profilelist': {
                cellclick: 'getProfileFromUser'
            }
        }
    },
    onUserProfileSelect:function(menu,item){
        Ext.getCmp('viewport').setLoading(true);
        CaptivePortal.util.Utility.doProfileLogin(item.profileid);
        console.log(item)
    },
    onMenuClick: function (menu) {
        switch (menu.itemname) {
            case "users":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem(1);
                this.getView().lookupReference('lab_heading').setText('Users')
                break;
            case "tenants":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem(2);
                this.getView().lookupReference('lab_heading').setText('Tenants');
                break;
            case "site_roles":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem(3);
                this.getView().lookupReference('lab_heading').setText('Roles')
                break;

        }
    },
    getProfileFromUser: function (cell, td, cellIndex, record, tr, rowIndex, e, eOpts) { 
         Ext.getCmp('viewport').setLoading(true);
        CaptivePortal.util.Utility.doProfileLogin(record.id);
    },
    createUsers: function () {
        this.getView().lookupReference('pan_mainnavigation').setActiveItem(1);
        this.getView().lookupReference('lab_heading').setText('Users')
        //CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.user.ListUser', this);
        //CaptivePortal.util.Utility.setHeightForCommonContainer();	
    },
    createTenants: function () {
        this.getView().lookupReference('pan_mainnavigation').setActiveItem(2);
        this.getView().lookupReference('lab_heading').setText('Tenants')
        //CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.tenant.ListTenant', this);
        //CaptivePortal.util.Utility.setHeightForCommonContainer();
    },
    createSites: function () {
        CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.site.ListSite', this);
        CaptivePortal.util.Utility.setHeightForCommonContainer();
    },
    createRoleTemplate: function (roleAccess) {
        this.getView().lookupReference('pan_mainnavigation').setActiveItem(3);
        this.getView().lookupReference('lab_heading').setText('Roles')
        // if(roleAccess){
        // 	CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this, {role_access : roleAccess});
        // } else {
        // 	CaptivePortal.util.Utility.replaceCommonContainer('CaptivePortal.view.role.ListRole', this, {role_access : []});
        // }
        // CaptivePortal.util.Utility.setHeightForCommonContainer();
    },
    logout: function () {
        CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGOUT, {}, function (response) {
            CaptivePortal.util.Utility.changeView('CaptivePortal.view.login.Login', this);
            Ext.util.Cookies.clear('CAP_SESSION');
            Ext.StoreManager.lookup('CaptivePortal.store.role.Role').removeAll();
        }.bind(this), function (response) {
        }, 'DELETE');

    },
    home_render: function () {
        setTimeout(function () {
            var bodyTag = document.getElementsByTagName('body')[0];
            bodyTag.className = bodyTag.className + ' custom_bg_background';
        }, 100);
    }
});



 //# sourceURL=http://localhost:8383/CaptivePortal/app/view/home/HomeController.js
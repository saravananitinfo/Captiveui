Ext.define('CaptivePortal.view.home.HomeController', {
    extend: 'Ext.app.ViewController',
    requires:['CaptivePortal.view.contentbuilder.Main'],
    alias: 'controller.home',
    id: 'vc_homecontroller',
    // requires:['CaptivePortal.view.login.Login'],
    listen: {
        component: {
            'gridpanel#grd_profilelist': {
                cellclick: 'getProfileFromUser'
            }
        }
    },
    onUserProfileSelect: function (menu, item) {
        Ext.getCmp('viewport').setLoading(true);
        CaptivePortal.util.Utility.doProfileLogin(item.profileid);
        console.log(item)
    },
    onMenuClick: function (menu) {
        console.log("...........me ............" + menu.itemname)
        switch (menu.itemname) {
            case "users":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_usermain');
                this.getView().lookupReference('lab_heading').setText('Users');
                this.fireEvent('setActiveUserCard', 0);
                break;
            case "tenants":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_tenantlist');
                this.getView().lookupReference('lab_heading').setText('Tenants');
                this.fireEvent('setTenantMainActiveItem', 0);
                break;
            case "site_roles":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_rolelist');
                this.getView().lookupReference('lab_heading').setText('Roles')
                this.fireEvent('setRoleMainActiveItem', 0);
                break;
            /*case "templates":
               Ext.create('Ext.window.Window',{
                   height:'100%',
                   layout:'fit',
                   title:'Content Builder',
                   width:'100%',
                   items:[{
                           xtype:'contentbuilder'
                   }]
               }).show();
                break;*/
            case "sites":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_sitelist');
                this.getView().lookupReference('lab_heading').setText('Sites');
                this.fireEvent('setActiveSiteCard', 0);
                break;
            case "sms_gateway":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_sms_gatewaysmain');
                this.getView().lookupReference('lab_heading').setText('SMS Gateway')
                this.fireEvent('setSmSGatewayMainActiveItem', 0);
                break;
            case "guests":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_guest_usersmain');
                this.getView().lookupReference('lab_heading').setText('Guest Users Management')
                this.fireEvent('setGuestUsersMainActiveItem', 0);
                break;
            case "access_points":
                console.log("...........me ............1")
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('card_access_point_main');
                this.getView().lookupReference('lab_heading').setText('Access Point')
                console.log("...........me ............2")
                this.fireEvent('setAccessPointMainActiveItem', 0);
                break;
                case "time_policy":
                    this.getView().lookupReference('pan_mainnavigation').setActiveItem('access_time_policymain');
                    this.getView().lookupReference('lab_heading').setText('Access Time Policy');
                    this.fireEvent('setTimePolicyActiveItem',0);
                break;
            case "templates":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('access_template_main');
                this.getView().lookupReference('lab_heading').setText('Template Management');
                this.fireEvent('setTemplateMgmtActiveItem',0);
                break;
            case "radius_configuration":
                this.getView().lookupReference('pan_mainnavigation').setActiveItem('access_radius_vsa_main');
                this.getView().lookupReference('lab_heading').setText('Radius VSA');                
                this.fireEvent('setRadiusVSAActiveItem',0);
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
    },
    logout: function () {
        var me = this;
        CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGOUT, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
            Ext.getCmp('viewport').removeAll();
            me.clearData();
            Ext.getCmp('viewport').add(Ext.create('CaptivePortal.view.login.Login'));
        }.bind(this), function () {
        }, 'DELETE');
    },
    home_render: function () {
        console.log(CaptivePortal.app.getUserRole())
        setTimeout(function () {
            var bodyTag = document.getElementsByTagName('body')[0];
            bodyTag.className = bodyTag.className + ' custom_bg_background';
        }, 100);
    },
    clearData: function () {
        Ext.util.Cookies.clear('CAP_SESSION');
        Ext.util.Cookies.clear('USER_PROFILES');
        Ext.StoreManager.lookup('CaptivePortal.store.tenant.Tenant').removeAll();
        Ext.StoreManager.lookup('CaptivePortal.store.site.Site').removeAll();
        Ext.StoreManager.lookup('CaptivePortal.store.user.User').removeAll();
        Ext.StoreManager.lookup('CaptivePortal.store.role.Role').removeAll();
    }
});



//# sourceURL=http://localhost:8383/CaptivePortal/app/view/home/HomeController.js

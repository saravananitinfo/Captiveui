Ext.define('CaptivePortal.util.Utility', {
    singleton: true,
    //BASE_URL:'http://ec2-54-159-24-52.compute-1.amazonaws.com:8080/',
    BASE_URL: 'http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/',
    setValuesForCookies: function (obj) {
        var currentTime = new Date();
        var expires = new Date(currentTime.getTime() + (7 * 24 * 60 * 60 * 1000));
        Ext.util.Cookies.clear('CAP_SESSION');
        Ext.util.Cookies.set('CAP_SESSION', Ext.encode(obj), expires);
        this.addHeader();
    },
    setUserProfileCookie: function (profiles) {
        var currentTime = new Date();
        var expires = new Date(currentTime.getTime() + (7 * 24 * 60 * 60 * 1000));
        Ext.util.Cookies.clear('USER_PROFILES');
        Ext.util.Cookies.set('USER_PROFILES', Ext.encode(profiles), expires);
    },
    setSuperAdminSession: function (obj, remember, token) {      
        var cookieObj = {
            remember: remember,
            email: obj.email,
            token: token ? token : obj.auth_token,
            username: obj.email,
            language: 'English',
            role: obj.user_role
        };
        this.setValuesForCookies(cookieObj);
    },
    setNormalUserSession: function (obj, profileId, token) {       
        var cookieObj = {
            role: obj.user_role,
            remember: obj.remember,
            email: obj.data.email,
            token: token ? token : obj.data.auth_token,
            username: obj.data.email,
            language: 'English',
            profileId: profileId
        };       
        this.setValuesForCookies(cookieObj)
    },
    setNormalUserDetails: function (profile) {
        CaptivePortal.app.setUserName(profile.name);
        CaptivePortal.app.setUserRole(profile.user_role);
        CaptivePortal.app.setAccessPermissionList(profile.access_permission_list);
        CaptivePortal.app.setUserPermittedList(profile.permitted_roles);
        CaptivePortal.app.setUserAuthorisedIPs(profile.authorized_ips);
        CaptivePortal.app.setUserProfileID(profile.id);
        CaptivePortal.app.setUserTenantID(profile.tenant.id);
        CaptivePortal.app.setUserTenantName(profile.tenant.name);
    },
    setSuperAdminDetails: function (resObj) {
        CaptivePortal.app.setUserName(resObj.email);
        CaptivePortal.app.setUserRole(resObj.user_role);
        CaptivePortal.app.setAccessPermissionList(resObj.access_permission_list);
    },
    doLoginForLoggedUser: function () {
        var me = this;
        Ext.getCmp('viewport').setLoading(true);
        var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
        if (cookieVal) {
            var cookieObj = Ext.decode(cookieVal);
            var profileId = cookieObj.profileId;
            var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
            CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    debugger
                    var cookieObj = Ext.decode(Ext.util.Cookies.get('CAP_SESSION'));
                    if (resObj.data.profile) {
                        var token = cookieObj.token;
                        var cookieObj = {remember: cookieObj.remember, email: resObj.data.profile.email, token: token, username: resObj.data.profile.name, language: 'English', profileId: resObj.data.profile.id};
                        CaptivePortal.app.setTempUserObj({data: resObj.data.profile, remember: cookieObj.remember});
                        CaptivePortal.util.Utility.doProfileLogin(resObj.data.profile.id, cookieObj.token);
                    } else if (resObj.data.user_details.user_role === "super_admin") {                        
                        var homepanel = Ext.create('CaptivePortal.view.home.Home', {
                            layout: 'vbox',
                            user: {
                                langDesc: cookieObj.language,
                                userName: cookieObj.username
                            }
                        });
                        me.setSuperAdminSession(resObj.data.user_details, cookieObj.remember, cookieObj.token);                      
                        resObj = resObj.data.user_details;
                        me.setSuperAdminDetails(resObj)
                        var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
                        me.createMenusForUserBasedOnPermisson(navpanel);
                        var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
                        var bodypanel = Ext.create('CaptivePortal.view.home.Body');
                        homepanel.add(navpanel, headingpanel, bodypanel);
                        Ext.getCmp('viewport').add(homepanel);
                        me.loadUserStore()
                        me.loadRoleStore();
                        me.loadSiteStore();
                        me.loadTenantStore();
                        me.loadSMSGatewayStore();
                        me.loadGuestUsersStore();
                        Ext.getCmp('viewport').setLoading(false);
                    }
                }
            }.bind(this), function (response) {
            }.bind(this), 'GET');
        }
    },
    doProfileLogin: function (profileId, token) {
        Ext.getCmp('viewport').setLoading(true);
        console.log(CaptivePortal.app.getTempUserObj());
        this.setNormalUserSession(CaptivePortal.app.getTempUserObj(), profileId, token);
        var me = this;
        var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
        CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.setNormalUserDetails(resObj.data.profile);
                me.createNormalUserHomePanel(resObj.data.profile);               
            }
        }.bind(this), function (response) {
        }.bind(this), 'GET');
    },
    createNormalUserHomePanel: function (profile) {
        Ext.getCmp('viewport').removeAll();
        var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
        this.createMenusForUserBasedOnPermisson(navpanel);
        var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
        var bodypanel = Ext.create('CaptivePortal.view.home.Body');
        var homepanel = Ext.create('CaptivePortal.view.home.Home', {
            layout: 'vbox',
            user: {
                langDesc: 'English',
                userName: profile.name
            }
        });
        var profile_switch = Ext.ComponentQuery.query('splitbutton#spb_switchprofile')[0];
        var userProfile = Ext.JSON.decode(Ext.util.Cookies.get('USER_PROFILES'));
        var items = [];
        Ext.Array.each(userProfile, function (data) {
            if (profile.tenant.name != data.tenant_name)
                items.push({
                    text: data.tenant_name,
                    profileid: data.id
                })
        });
        profile_switch.setText(profile.tenant.name);
        profile_switch.setMenu({
            xtype: 'menu',
            itemId: 'menu_profilenavigation',
            cls: 'cp-menu cp-menu-tenantlist',
            width: 150,
            listeners: {
                click: 'onUserProfileSelect'
            },
            items: items
        })
        profile_switch.setVisible(true);
        homepanel.add(navpanel, headingpanel, bodypanel);
        Ext.getCmp('viewport').add(homepanel);
        Ext.ComponentQuery.query('label#lab_roledisplay')[0].setText(profile.user_role.charAt(0))
        Ext.getCmp('viewport').setLoading(false);
    },
    loadUserStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.user.User');
        str.load();
    },
    loadSiteStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.site.Site');
        str.load();
    },
    loadTenantStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.tenant.Tenant');
        str.load();
    },
    loadRoleStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.role.Role');
        str.load();
    },
    loadSMSGatewayStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways');
        str.load();
    },
    loadGuestUsersStore: function () {
        var str = Ext.StoreManager.lookup('CaptivePortal.store.guest_user.GuestUsers');
        str.load();
    },
    createMenusForUserBasedOnPermisson: function (navpanel) {
        var store = Ext.StoreManager.lookup('ProfileMenuList');        
        var menu;
        console.log(CaptivePortal.app.getAccessPermissionList());
        Ext.Array.each(store.data.items, function (rec, index) {
            menu = Ext.widget('menu');
            Ext.Array.each(rec.data.menuitem, function (menuitem, index) {
                Ext.Array.each(CaptivePortal.app.getAccessPermissionList(), function (permission, index) {
                    if (menuitem.itemname === permission.access_for) {
                        if (permission.read || permission.write) {
                            menu.add({
                                text: menuitem.name,
                                listeners: {
                                    click: 'onMenuClick'
                                },
                                itemname: menuitem.itemname,
                                //height: 48,
                                cls: "nav-menu-item nav-menu-item" + menuitem.name,
                                width: 235
                            })
                        }
                    }
                });
            });
            console.log(rec)
            if (rec.data.id === 1)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: rec.data.cls,
                    cls: 'cp-splitbutton cp-splitbutton-tenantlist',
                    margin: '0 50 0 0',
                    menu: menu
                });
            else if (rec.data.id === 2)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: rec.data.cls,
                    cls: 'cp-splitbutton cp-splitbutton-tenantlist',
                    margin: '0 50 0 0',
                    menu: menu
                });
            else if (rec.data.id === 3)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: rec.data.cls,
                    cls: 'cp-splitbutton cp-splitbutton-tenantlist',
                    margin: '0 50 0 0',
                    menu: menu
                });
            else if (rec.data.id === 4)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: rec.data.cls,
                    cls: 'cp-splitbutton cp-splitbutton-tenantlist',
                    margin: '0 50 0 0',
                    menu: menu
                });
        })
    },
    showError: function (title, msg) {
        Ext.Msg.show({
            title: title || 'Error',
            message: msg,
            buttons: Ext.Msg.OK,
            icon: Ext.Msg.ERROR
        });
    },
    addHeader: function () {
        var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
        if (cookieVal) {
            var cookieObj = Ext.decode(cookieVal);
            var token = cookieObj.token;
            var profileId = cookieObj.profileId;
            if (token && profileId) {
                Ext.Ajax.setDefaultHeaders({
                    'u-token': token,
                    'u-profile': profileId
                });
            } else if (token) {
                Ext.Ajax.setDefaultHeaders({
                    'u-token': token
                });
            }
        }
    },
    doAjax: function (url, params, successCallback, failureCallback, method, async) {
        this.addHeader();
        var async = (async != undefined) ? async : true;
        Ext.Ajax.request({
            method: method,
            async: async,
            url: url,
            defaultPostHeader: {
                'Content-Type': 'application/json;charset=UTF-8'
            },
            cors: true,
            params: params,
            callback: function (result) {
                console.log('callback', result);
            },
            success: function (response) {

                console.log('success', response)
                Ext.isFunction(successCallback) && successCallback.call(null, response);
            },
            failure: function (response) {
                debugger
                console.log('failure', response)
                Ext.isFunction(failureCallback) && failureCallback.call(null, response);
            }
        });
    },
    doAjaxJSON: function (url, params, successCallback, failureCallback, method, async) {
        this.addHeader();
        var async = (async != undefined) ? async : true;
        Ext.Ajax.request({
            method: method,
            url: url,
            cors: true,
            async: async,
            jsonData: params,
            callback: function (result) {
                console.log('callback', result);
            },
            success: function (response) {
                console.log('success', response)
                Ext.isFunction(successCallback) && successCallback.call(null, response);
            },
            failure: function (response) {                
                console.log('failure', response)
                Ext.isFunction(failureCallback) && failureCallback.call(null, response);
            }
        });
    },
    capitalizeFirstLetter: function(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

});

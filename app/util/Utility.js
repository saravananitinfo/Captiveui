Ext.define('CaptivePortal.util.Utility', {
    singleton: true,
    //BASE_URL:'http://ec2-54-159-24-52.compute-1.amazonaws.com:8080/',
    BASE_URL: 'http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/',
    config: {
        myMask: null
    },
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
        var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
        if (cookieVal) {
            var cookieObj = Ext.decode(cookieVal);
            var profileId = cookieObj.profileId;
            console.log("1..................."+profileId);
            console.log(cookieObj);
            var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
            this.addHeader();
            CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getLoginMsg(), Ext.getCmp('viewport'), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var cookieObj = Ext.decode(Ext.util.Cookies.get('CAP_SESSION'));
                    if (resObj.data.profile) {
                        CaptivePortal.app.setTempUserObj({data: resObj.data.profile, remember: cookieObj.remember});
                        CaptivePortal.util.Utility.doProfileLogin(resObj.data.profile.id, cookieObj.token);
                    } else if (resObj.data.user_details.user_role === "super_admin") {
                        me.doSuperAdminLogin(resObj, cookieObj);
                    }
                }
            }.bind(this), function (response) {
            }.bind(this), 'GET');
        }
    },
    doSuperAdminLogin: function (resObj, cookieObj) {
        var homepanel = Ext.create('CaptivePortal.view.home.Home', {
            layout: 'vbox',
            user: {
                langDesc: cookieObj.language,
                userName: cookieObj.username
            }
        });
        this.setSuperAdminSession(resObj.data.user_details, cookieObj.remember, cookieObj.token);
        resObj = resObj.data.user_details;
        this.setSuperAdminDetails(resObj)
        var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
        this.createMenusForUserBasedOnPermisson(navpanel);
        var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
        var bodypanel = Ext.create('CaptivePortal.view.home.Body');
        homepanel.add(navpanel, headingpanel, bodypanel);
        Ext.getCmp('viewport').add(homepanel);
    },
    doProfileLogin: function (profileId, token) {
        Ext.getCmp('viewport').setLoading(true)
        this.setNormalUserSession(CaptivePortal.app.getTempUserObj(), profileId, token);
        var me = this;
        var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
        CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getLoginMsg(), Ext.getCmp('viewport'), function (response) {
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
        Ext.ComponentQuery.query('label#lab_roledisplay')[0].setText(profile.user_role.charAt(0));
        Ext.getCmp('viewport').setLoading(false)
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
                            console.log("m..............."+menuitem.name);
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
    doAjax: function (url, params, msg, view, successCallback, failureCallback, method, async) {
        var async = (async != undefined) ? async : true;
        CaptivePortal.util.Utility.appLoadMask(msg, Ext.getCmp('viewport'), true);
        Ext.Ajax.request({
            method: method,
            async: async,
            url: url,
            defaultPostHeader: {
                'Content-Type': 'application/json;charset=UTF-8'
            }, cors: true,
            params: params,
            callback: function (result) {
                console.log('callback', result);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            success: function (response) {
                console.log('success', response)
                Ext.isFunction(successCallback) && successCallback.call(null, response);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            failure: function (response) {
                console.log('failure', response)
                Ext.isFunction(failureCallback) && failureCallback.call(null, response);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            }
        });
    },
    doAjaxJSON: function (url, params, msg, view, successCallback, failureCallback, method, async) {
        var async = (async != undefined) ? async : true;
        CaptivePortal.util.Utility.appLoadMask(msg, Ext.getCmp('viewport'), true);
        Ext.Ajax.request({
            method: method,
            url: url,
            cors: true,
            async: async,
            jsonData: params,
            callback: function (result) {
                console.log('callback', result);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            success: function (response) {
                console.log('success', response)
                Ext.isFunction(successCallback) && successCallback.call(null, response);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            failure: function (response) {
                console.log('failure', response)
                Ext.isFunction(failureCallback) && failureCallback.call(null, response);
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            }
        });
    }, capitalizeFirstLetter: function (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    appLoadMask: function (msg, cmp, show) {
        if (this.getMyMask() === null) {
            this.setMyMask(
                    new Ext.LoadMask({
                        msg: msg,
                        target: cmp
                    })
                    )
            this.getMyMask().show();
        } else {
            if (show) {
                this.getMyMask().msg = msg;
                this.getMyMask().target = cmp;
                this.getMyMask().show();
            } else {
                this.getMyMask().hide();
            }
        }
    }

});

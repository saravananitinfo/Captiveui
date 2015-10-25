Ext.define('CaptivePortal.util.Utility', {
    singleton: true,
    //BASE_URL:'http://ec2-54-159-24-52.compute-1.amazonaws.com:8080/',
    BASE_URL: 'http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/',
    replaceCommonContainer: function (viewName, controlObj, viewInitParam) {
        var currentView = controlObj.getView();
        var viewport = currentView.up('viewport');
        var container_replace = viewport.down('#container_replace');
        container_replace.removeAll();
        if (viewInitParam) {
            container_replace.add(Ext.create(viewName, viewInitParam));
        } else {
            container_replace.add(Ext.create(viewName));
        }

    },
    setHeightForCommonContainer: function () {
        var reqHeight = this.getCommonContainerHeight();
        var container = Ext.ComponentQuery.query('[topPanel=true]')[0];
        container.setHeight(reqHeight + 10);
        container.body.setStyle({'overflow-x': 'hidden'});
    },
    getCommonContainerHeight: function () {
        var t1 = Ext.ComponentQuery.query('[priToolbar=true]')[0].getHeight();
        var t2 = Ext.ComponentQuery.query('[secToolbar=true]')[0].getHeight();
        var overallPadding = 20 + 20;
        var paddingUpToHeading = 10 + 20 + 5 + 60;
        var bodyHeight = Ext.getBody().getHeight();
        var remHeight = bodyHeight - (t1 + t2 + overallPadding + paddingUpToHeading);
        return remHeight;
    },
    setValuesForCookies: function (obj) {
        var currentTime = new Date();
        var expires = new Date(currentTime.getTime() + (7 * 24 * 60 * 60 * 1000));
        Ext.util.Cookies.clear('CAP_SESSION');
        Ext.util.Cookies.set('CAP_SESSION', Ext.encode(obj), expires);
    },
    doLoginForLoggedUser: function () {
        var me = this;
        var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
        if (cookieVal) {
            var cookieObj = Ext.decode(cookieVal);
            var profileId = cookieObj.profileId;
            var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
            CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var cookieObj = Ext.decode(Ext.util.Cookies.get('CAP_SESSION'));
                    var homepanel = Ext.create('CaptivePortal.view.home.Home', {
                        layout: 'vbox',
                        user: {
                            langDesc: cookieObj.language,
                            userName: cookieObj.username
                        }
                    });
                    debugger
                    if (resObj.data.profile) {
                        var token = cookieObj.token;
                        var cookieObj = {remember: cookieObj.remember, email: resObj.data.profile.email, token: token, username: resObj.data.profile.name, language: 'English', profileId: resObj.data.profile.id};
                        this.setValuesForCookies(cookieObj);
                    } else if (resObj.data.user_details.user_role === "super_admin") {
                        var cookieObj = {remember: cookieObj.remember, email: resObj.data.user_details.email, token: token, username: resObj.data.user_details.email, language: 'English', userId: resObj.data.user_details.user_id};
                        console.log("Super Admin");
                        console.log(resObj);
                        resObj = resObj.data.user_details;
                        CaptivePortal.app.setUserName(resObj.email);
                        CaptivePortal.app.setUserRole(resObj.user_role);
                        CaptivePortal.app.setAccessPermissionList(resObj.access_permission_list);
                        var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
                        me.createMenusForUserBasedOnPermisson(navpanel);
                        var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
                        var bodypanel = Ext.create('CaptivePortal.view.home.Body');
                        homepanel.add(navpanel, headingpanel, bodypanel);
                        Ext.getCmp('viewport').add(homepanel);
                    }
                }
            }.bind(this), function (response) {
            }.bind(this), 'GET');

        }
    },
    doProfileLogin: function (profileId) {
        var me = this;
        var url = profileId ? CaptivePortal.Config.SERVICE_URLS.GET_USER_PROFILES + '/' + profileId + '.json' : CaptivePortal.Config.SERVICE_URLS.GET_CURRENT_USER_DETAILS;
        CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                console.log('profile login');
                console.log(resObj);
                var cookieObj = Ext.decode(Ext.util.Cookies.get('CAP_SESSION'));
                if (resObj.data.profile) {
                    var token = cookieObj.token;
                    var cookieObj = {remember: cookieObj.remember, email: resObj.data.profile.email, token: token, username: resObj.data.profile.name, language: 'English', profileId: resObj.data.profile.id};
                    this.setValuesForCookies(cookieObj);
                }

                var profile = resObj.data.profile;
                CaptivePortal.app.setUserName(profile.name);
                CaptivePortal.app.setUserRole(profile.user_role);
                CaptivePortal.app.setAccessPermissionList(profile.access_permission_list);
                CaptivePortal.app.setUserPermittedList(profile.permitted_roles);
                CaptivePortal.app.setUserAuthorisedIPs(profile.authorized_ips);
                CaptivePortal.app.setUserProfileID(profile.id);
                CaptivePortal.app.setUserTenantID(profile.tenant.id);
                CaptivePortal.app.setUserTenantName(profile.tenant.name);

                Ext.getCmp('viewport').removeAll();
                var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
                me.createMenusForUserBasedOnPermisson(navpanel);
                var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
                var bodypanel = Ext.create('CaptivePortal.view.home.Body');

                var homepanel = Ext.create('CaptivePortal.view.home.Home', {
                    layout: 'vbox',
                    user: {
                        langDesc: cookieObj.language,
                        userName: cookieObj.username
                    }
                });

                homepanel.add(navpanel, headingpanel, bodypanel);
                Ext.getCmp('viewport').add(homepanel);

            }
        }.bind(this), function (response) {
        }.bind(this), 'GET');
    },
    createMenusForUserBasedOnPermisson: function (navpanel) {
        var store = Ext.StoreManager.lookup('ProfileMenuList');
        console.log('Permisson List');
        var menu;
        console.log(CaptivePortal.app.getAccessPermissionList());
        Ext.Array.each(store.data.items, function (rec, index) {
            menu = Ext.widget('menu');
            Ext.Array.each(rec.data.menuitem, function (menuitem, index) {
                if (rec.data.name === "Configuration" && index === 2) {
                    menu.add({
                        text: menuitem.name,
                        itemname: menuitem.itemname,
                        listeners: {
                            click: 'onMenuClick'
                        },
                        height: 35
                    })
                } else if (rec.data.name === "Configuration" && index === 3) {
                    menu.add({
                        text: menuitem.name,
                        listeners: {
                            click: 'onMenuClick'
                        },
                        itemname: menuitem.itemname,
                        height: 35
                    })
                }
                Ext.Array.each(CaptivePortal.app.getAccessPermissionList(), function (permission, index) {
                    if (menuitem.itemname === permission.access_for) {
                        if (permission.read || permission.write) {
                            menu.add({
                                text: menuitem.name,
                                listeners: {
                                    click: 'onMenuClick'
                                },
                                itemname: menuitem.itemname,
                                height: 35
                            })
                        }
                    }
                });
            });
            console.log(rec)
            if (rec.data.id == 1)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: 'fa fa-bookmark-o',
                    menu: menu
                });
            else if (rec.data.id == 2)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: 'fa fa-cog',
                    menu: menu
                });
            else if (rec.data.id == 3)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: 'fa fa-paper-plane-o',
                    menu: menu
                });
            else if (rec.data.id == 4)
                navpanel.add({
                    text: rec.data.name,
                    iconCls: 'fa fa-user',
                    menu: menu
                });
        })
    },
    doLogin: function (scope, userObj) {
        CaptivePortal.util.Utility.changeView('CaptivePortal.view.home.Home', scope, userObj);
    },
    changeView: function (viewName, controlObj, customObj) {
        var currentView = controlObj.getView();
        var viewport = currentView.up('viewport');
        viewport.removeAll();
        if (customObj) {
            doAjax
            viewport.add(Ext.create(viewName, customObj));
        } else {
            viewport.add(Ext.create(viewName));
        }

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
        /*Ext.Ajax.setDefaultHeaders({
         'Accept':'application/json',   
         'Content-Type':'application/json'
         }); */

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
    }

});

Ext.define('CaptivePortal.util.Utility', {
    singleton: true,
    BASE_URL: 'http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/',
    config: {
        myMask: null
    },
    logout: function () {
        CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGOUT, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
            Ext.getCmp('viewport').removeAll();
            Ext.util.Cookies.clear('CAP_SESSION');
            Ext.util.Cookies.clear('USER_PROFILES');
            Ext.StoreManager.lookup('CaptivePortal.store.tenant.Tenant').removeAll();
            Ext.StoreManager.lookup('CaptivePortal.store.site.Site').removeAll();
            Ext.StoreManager.lookup('CaptivePortal.store.user.User').removeAll();
            Ext.StoreManager.lookup('CaptivePortal.store.role.Role').removeAll();
            Ext.getCmp('viewport').add(Ext.create('CaptivePortal.view.login.Login'));
        }.bind(this), function () {
        }, 'DELETE');
    },
    hideSiteTagRefLabel: function(view){
        var lab = view.down('#sitetagdetails');
        lab && lab.setText('');
    },
    generateSiteTagRefLabel: function(){
        return {
                    xtype:'label',
                    text:'',
                    //height:20,
                    itemId:'sitetagdetails',
                    style:'color: #1fa1eb !important;padding-left:10px;margin-top:-25px;',
                    //hidden:true
                };
    },
    getSiteAndTagDetails:function(combo, recs, eOpts){
        var form = combo.up('form'), labText = [];
        var siteTagDetailsLab = form.down('#sitetagdetails');
        siteTagDetailsLab && siteTagDetailsLab.hide();
        if(siteTagDetailsLab && recs){
            if(Ext.isArray(recs)){
                Ext.Array.each(recs, function(r){
                    labText.push(r.get('name'));
                }.bind(this));
            } else {
                labText.push(recs.get('name'));
            }
            siteTagDetailsLab.setText('Seleted site(s) / Tag(s) : ' + labText.join());
            siteTagDetailsLab.show();
            siteTagDetailsLab.setStyle('display', 'block');            
        }
    },
    getEmptySiteStore: function(){
        return Ext.create('Ext.data.Store',{
            fields:['name', 'id', 'isSite','iconCss'], data:[]
        })
    },
    getSiteTemplateIconForSite: function(){
        var tpl = '<div class="site-icon"></div>&nbsp;&nbsp;&nbsp;<span class="site-icon-cls">{name}</span>';
        return tpl;
    },
    getSiteTemplateIcon: function(){
        var tpl = '<div class={iconCss}></div>&nbsp;&nbsp;&nbsp;<span class="site-icon-cls">{name}</span>';
        return tpl;
    },
    createSitesAndTags: function(data){
        var sitesAndTags = [];
        var sites = (data  && data.available_resources) ?  data.available_resources.sites : [];
        var tags = (data && data.available_resources) ? data.available_resources.tags : [];
        if(sites && sites.length) {
            Ext.Array.each(sites, function(s){
                var rec = {id:s.id, name:s.name, isSite:true, iconCss:'site-icon'};
                sitesAndTags.push(rec);
            }.bind(this))
        }
        if(tags && tags.length) {
            Ext.Array.each(tags, function(t){
                var rec = {id:t.id, name:t.name, isSite:false, iconCss:'tag-icon'};
                sitesAndTags.push(rec);
            }.bind(this))
        }
        return sitesAndTags;
    },
    showServerError: function(response){
        var resObj = Ext.decode(response.responseText);
        if (!resObj.success && resObj.error.length) {
            CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
        }
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
    addRulegroupForAccess: function(list){
        var templateFound = false, readPer, writePer;
        Ext.Array.each(list, function(rec, index){
            if(rec.access_for === 'templates'){
                readPer = rec.read;
                writePer = rec.write;
                templateFound = true;
                return false;
            }
        });
        if(templateFound){
            list.push({access_for : 'rule_group', read : readPer, write : writePer});
        }
    },
    setNormalUserDetails: function (profile) {
        CaptivePortal.app.setUserName(profile.name);
        CaptivePortal.app.setUserRole(profile.user_role);
        CaptivePortal.app.setAccessPermissionList(profile.access_permission_list);
        this.addRulegroupForAccess(profile.access_permission_list);
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
        this.addRulegroupForAccess(resObj.access_permission_list);

    },
    doLoginForLoggedUser: function () {
        var me = this;
        var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
        if (cookieVal) {
            var cookieObj = Ext.decode(cookieVal);
            var profileId = cookieObj.profileId;
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
        Ext.getCmp('viewport').setLoading(true);
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
        Ext.getCmp('viewport').setLoading(false);
    },
    createMenusForUserBasedOnPermisson: function (navpanel) {
        var store = Ext.StoreManager.lookup('ProfileMenuList');
        var menu;
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
    showInfo: function (title, msg) {

        Ext.Msg.show({

            title: title || 'Info',

            message: msg,

            buttons: Ext.Msg.OK,

            icon: Ext.Msg.INFO

        });

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
        this.addHeader();
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
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            success: function (response) {
                CaptivePortal.util.Utility.postManipulateResponse(response, successCallback);
            },
            failure: function (response) {
                CaptivePortal.util.Utility.postManipulateResponse(response, failureCallback);
            }
        });
    },

    postManipulateResponse: function(response, callback){
        var status = response.status, errFlag = false;
        switch(status){
            case 401:
            case 403:
                CaptivePortal.util.Utility.logoutForSession();
                errFlag = true;
            break;
            case 0:
            case 500:
                CaptivePortal.util.Utility.showError('Error', 'There is an issue with the service, please try after some time');
                errFlag = true;
            break;
            case 422:
                CaptivePortal.util.Utility.showError('Error', 'Cannot process data. Looks like some issue with the data, please check the data fields');
                errFlag = true;
            break;
            case 404:
                CaptivePortal.util.Utility.showError('Error', 'The record you are trying to get does not exisit');
                errFlag = true;
            break;
        }
        var resStr = response.responseText;
        if(resStr){
            var resObj = Ext.decode(response.responseText);
            var errs = resObj.message || resObj.error;
            if((resObj.success === false || errFlag) && errs  && errs.length){
                var errorText = '';
                if(Ext.Array.each(errs, function(rec, index){
                    errorText += rec + "\n"; 
                }.bind(this)));
                CaptivePortal.util.Utility.showError('Error', errorText);
                CaptivePortal.util.Utility.appLoadMask(null, null, false); 
                Ext.getCmp('viewport').setLoading(false);
                return;
            }             
            resStr && Ext.isFunction(callback) && callback.call(null, response);
        }        
        CaptivePortal.util.Utility.appLoadMask(null, null, false); 
        Ext.getCmp('viewport').setLoading(false);
    },

    logoutForSession: function(){
        Ext.Msg.show({
                        title: 'Session Expired',
                        message: 'Your session is expired. Please Login again',
                        buttons: Ext.Msg.YES,
                        icon: Ext.Msg.INFO,
                        fn: function (btn) {
                            CaptivePortal.util.Utility.logout();
                        }.bind(this)
                    });
    },
    doAjaxJSON: function (url, params, msg, view, successCallback, failureCallback, method, async) {
        this.addHeader();
        var async = (async != undefined) ? async : true;
        CaptivePortal.util.Utility.appLoadMask(msg, Ext.getCmp('viewport'), true);
        Ext.Ajax.request({
            method: method,
            url: url,
            cors: true,
            async: async,
            jsonData: params,
            callback: function (result) {
                CaptivePortal.util.Utility.appLoadMask(null, null, false);
            },
            success: function (response) {
                CaptivePortal.util.Utility.postManipulateResponse(response, successCallback);
            },
            failure: function (response) {
                CaptivePortal.util.Utility.postManipulateResponse(response, failureCallback);
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
    },
    buildHtml: function(json){
        var me = this;
        // var json = {"rows":[{"col_type":"theme_col_1","background":"rgb(253, 251, 248)","height":154,"widgets":[{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa48b736d735e02490000/medium.jpg?1450878088","height":103,"width":124,"top":10,"left":403}}]},{"col_type":"theme_col_1","background":"rgb(249, 249, 249)","height":108,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<div style=\"color: rgb(0, 0, 0); text-align: center;\"><b><font size=\"2\" style=\"color: rgb(51, 153, 102);\">​</font></b></div><div style=\"text-align: center;\"><b><font size=\"6\" color=\"#339966\">Welcome To StarBucks</font></b></div>"}}]},{"col_type":"theme_col_2","background":"rgb(252, 250, 243)","height":204,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<font color=\"#339966\"><font size=\"3\">​Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</font><span style=\"font-size: medium;\">Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</span></font>"}},{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/56794b0d736d735e0c000000/medium.jpg?1450789644","height":161,"width":222,"top":0,"left":106}}]},{"col_type":"theme_col_1","background":"rgb(45, 125, 98)","height":120,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":10,"font_size":18,"txt_color":"","bg_color":"","border_radius":6,"top":19,"left":415}}]}],"style":{"background":"rgb(255, 255, 255)"}}
        var jsn = json;//Ext.decode(json);
        var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0];
        // editor_canvas.removeAll();
        if(jsn.style){
            editor_canvas.body.dom.style.background = jsn.style.background;
        }
        

        jsn["rows"].forEach(function(row){
            // var key = Object.keys(row)[0];
            switch(row.col_type){
                case 'theme_col_1':
                    editor_canvas.add({
                        xtype: 'theme_col_1',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_2':
                    editor_canvas.add({
                        xtype: 'theme_col_2',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_3':
                    editor_canvas.add({
                        xtype: 'theme_col_3',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_4':
                    editor_canvas.add({
                        xtype: 'theme_col_4',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_2_left_vbox':
                    var items = me.getItems(row);
                    console.log(items[2]);
                    editor_canvas.add({
                        xtype: 'theme_col_2_left_vbox',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: [
                            {
                                xtype: 'v_panel',
                                items: items.splice(0,2)
                            },
                            items[0]
                        ]
                    });
                    break;
                case 'theme_col_2_right_vbox':
                    var items = me.getItems(row);
                    editor_canvas.add({
                        xtype: 'theme_col_2_right_vbox',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: [
                            items[0],
                            {
                                xtype: 'v_panel',
                                items: items.splice(1,3)
                            }
                            
                        ]
                    });
                    break;
            }
        });

    },
    getItems: function(row){
        var key = Object.keys(row)[0];
        var items = []
        row.widgets.forEach(function(widget){
            // var key = Object.keys(block)[0]
            switch(widget.widget_type){
                case 'button_widget':
                    items.push({
                        xtype: 'button_widget',
                        button_json: JSON.stringify(widget.attributes)
                    })
                    break;
                case 'login_button_widget':
                    var obj = {
                        xtype: 'login_button_widget',
                    }
                    if(widget.attributes.connect === 'form'){
                        var form_fields = JSON.stringify(widget.attributes.form_fields);
                        obj['form_json'] = form_fields
                        obj['trigger_type'] = widget.attributes.type
                        if(widget.attributes.type === 'Button'){
                            obj['button_json'] = JSON.stringify(widget.attributes)
                        }else{
                            obj['link_json'] = JSON.stringify(widget.attributes)
                        }
                    }else{
                        obj['button_json'] = JSON.stringify(widget.attributes)
                    }
                    console.log(".............................................1");
                    console.log(obj);
                    items.push(obj);
                    break;
                case 'text_widget':
                    items.push({
                        xtype: 'text_widget',
                        html_str: widget.attributes.html_str
                    })
                    break;
                case 'img_widget':
                    items.push({
                        xtype: 'img_widget',
                        img_json: JSON.stringify(widget.attributes)
                    })
                    break;
                case 'html_widget':
                    items.push({
                        xtype: 'html_widget',
                        html_str: widget.attributes.html_str
                    })
                    break;
                case 'dropPanel':
                    items.push({
                        xtype: 'dropPanel',
                        cls: "dropPanel",
                        height: '100%',
                        margin: 5
                    })
                    break;
            }
        });
        return items;
    }

});

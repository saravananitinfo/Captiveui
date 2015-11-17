
Ext.define('CaptivePortal.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    requires: ['CaptivePortal.view.home.Home', 'CaptivePortal.view.home.Body', 'CaptivePortal.view.home.Navigation', 'CaptivePortal.view.home.Heading',
        'CaptivePortal.view.users.TenantList'],
    routes: {
        'forgotpassword/:id': 'onShowForgotPassword'
    },
    listen: {
        controller: {
            '*': {
                showLogin: 'onShowLogin'
            }
        },
        component: {
            'button#btn_login': {
                click: 'login'
            }
        }
    },
    onShowForgotPassword: function (id) {
        if (Ext.getCmp('viewport')) {
            Ext.getCmp('viewport').removeAll();
            var view = Ext.create('CaptivePortal.view.forget.CreateNewPassword');
            view.id = id;
            Ext.getCmp('viewport').add(view);
        }
    },
    onShowLogin: function () {
        if (Ext.getCmp('viewport')) {
            Ext.getCmp('viewport').removeAll();
            var view = Ext.create('CaptivePortal.view.login.Login');
            Ext.getCmp('viewport').add(view);
        }
    },
    createForget_password_view: function () {
        CaptivePortal.util.Utility.changeView('CaptivePortal.view.forget.ForgetPassword', this);
    },
    render_forget_password: function (labelComp) {
        var ctrl = this;
        if (labelComp.getEl() && labelComp.getEl().dom) {
            labelComp.getEl().dom.addEventListener('click', this.createForget_password_view.bind(ctrl));
        }
    },
    onFormRender: function (form) {
        var btn = this.getView().lookupReference('btn_login');
        var nav = new Ext.util.KeyNav({
            target: form.getEl(),
            enter: function (e) {
                this.login(btn);
            },
            scope: this
        });
    },
    loginForSuperAdmin: function (userObj) {
        var homepanel = Ext.create('CaptivePortal.view.home.Home', {
            layout: 'vbox',
            user: {
                langDesc: userObj.langDesc,
                userName: userObj.userName
            }
        });
        var navpanel = Ext.create('CaptivePortal.view.home.Navigation');
        CaptivePortal.util.Utility.createMenusForUserBasedOnPermisson(navpanel);
        var headingpanel = Ext.create('CaptivePortal.view.home.Heading');
        var bodypanel = Ext.create('CaptivePortal.view.home.Body');
        homepanel.add(navpanel, headingpanel, bodypanel);
        Ext.getCmp('viewport').add(homepanel);
        Ext.ComponentQuery.query('label#lab_roledisplay')[0].setText('S')
    },
    login: function (btn) {
        var formObj = btn.up('form'), form = formObj.getForm();
        var errLab = formObj.down('#login-err');
        errLab.hide();
        if (form.isValid()) {
            var userName = formObj.down('#login-name').getValue();
            var password = formObj.down('#login-password').getValue();
            var rememberMe = formObj.down('#remember_me').getValue();
            var params = {"user[email]": userName, "user[password]": password};
            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGIN, params, CaptivePortal.app.getLoginMsg(), Ext.getCmp('viewport'), function (response) {
                var resObj = Ext.decode(response.responseText);
                var accessPermissionList = [];
                if (resObj.success) {
                    var userObj = Ext.decode(response.responseText);
                    if (userObj.data && userObj.data.user) {
                        if (userObj.data.user.user_role && userObj.data.user.user_role === 'super_admin') {
                            if (userObj.data.user.access_permission_list && userObj.data.user.access_permission_list.length) {
                                var len = userObj.data.user.access_permission_list.length;
                                for (var i = 0; i < len; i++) {
                                    var perm = userObj.data.user.access_permission_list[i];
                                    accessPermissionList.push({module: perm['access_for'], read: perm['read'], write: perm['write']});
                                }
                            }
                            var data = userObj.data.user;
                            CaptivePortal.util.Utility.setSuperAdminDetails(data);
                            CaptivePortal.util.Utility.setSuperAdminSession(userObj.data.user, rememberMe);
                            var userInitialObj = {
                                langDesc: 'English',
                                userName: data.email
                            }
                            Ext.util.Cookies.clear('USER_PROFILES');
                            this.loginForSuperAdmin(userInitialObj);
                        } else {
                            
                            var profiles = userObj.data.user.profiles;
                            CaptivePortal.util.Utility.setUserProfileCookie(profiles);
                            CaptivePortal.app.setTempUserObj({data: userObj.data.user, remember: rememberMe});
                            if (profiles.length > 1) {
                                var homepanel = Ext.ComponentQuery.query('panel#pan_apphome')[0];
                                if (!homepanel) {
                                    homepanel = Ext.create('CaptivePortal.view.home.Home', {
                                        layout: 'vbox',
                                        user: {
                                            langDesc: 'English',
                                            userName: userObj.data.user.email
                                        }
                                    });
                                }
                                homepanel.add({
                                    xtype: 'home_appheader',
                                    margin: '40 0 0 0',
                                    padding: '25 40 20 7',
                                    listeners: {
                                        afterrender: function (container) {
                                            container.down('label').setText('Choose a Tenant')
                                        }
                                    }
                                }, {
                                    xtype: 'user_tenantlist',
                                    padding: '40',
                                    listeners: {
                                        afterrender: function (panel) {
                                            var grid = panel.down('gridpanel');
                                            grid.getStore().removeAll();
                                            grid.getStore().setData(userObj.data.user.profiles);
                                        }
                                    }
                                });
                                if (Ext.getCmp('viewport')) {
                                    Ext.getCmp('viewport').removeAll();
                                    Ext.getCmp('viewport').add(homepanel);
                                }
                            } else {
                                CaptivePortal.util.Utility.doProfileLogin(profiles[0].id);
                            }
                        }
                    }
                    var loginpanel = Ext.ComponentQuery.query('panel#login')[0];
                    if (loginpanel)
                        loginpanel.destroy();
                } else {
                    if (resObj.error) {
                        errLab.show();
                        errLab.setText(resObj.error);
                    }
                }
                CaptivePortal['accessPermissionList'] = accessPermissionList;
            }.bind(this), function () {
                Ext.Msg.alert('Login failure', 'failure');
            }.bind(this), 'POST');
        }
    }

});

//# sourceURL=http://localhost:8383/CaptivePortal/app/view/login/LoginController.js

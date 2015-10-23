
Ext.define('CaptivePortal.view.login.LoginController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.login',
    routes: {
        'forgotpassword/:id': 'onShowForgotPassword'
    },
    listen: {
        controller: {
            '*': {
                showLogin: 'onShowLogin'
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
    render: function (form) {
        var btn = form.down('button');
        var nav = new Ext.util.KeyNav({
            target: form.getEl(),
            enter: function (e) {
                this.login(btn);
            },
            scope: this
        });
    },
    loginForSuperAdmin: function (userObj) {
        var viewObj = Ext.create('CaptivePortal.view.home.Home', userObj);
        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [viewObj]
        });
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

            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOGIN, params, function (response) {
                var resObj = Ext.decode(response.responseText);
                var accessPermissionList = [];
                if (resObj.success) {
                    var userObj = Ext.decode(response.responseText);
                    var userName = "", profileId = "", cookieObj = {}, userInitialObj = {};
                    if (userObj.data && userObj.data.user) {
                        if (userObj.data.user.user_role && userObj.data.user.user_role == 'super_admin') {
                            userName = "";
                            if (userObj.data.user.access_permission_list && userObj.data.user.access_permission_list.length) {
                                var len = userObj.data.user.access_permission_list.length;
                                for (var i = 0; i < len; i++) {
                                    var perm = userObj.data.user.access_permission_list[i];
                                    accessPermissionList.push({module: perm['access_for'], read: perm['read'], write: perm['write']});
                                }
                            }
                            cookieObj = {remember: rememberMe, email: userObj.data.user.email, token: userObj.data.user.auth_token, username: userName, language: 'English'};
                            userInitialObj = {
                                user: {
                                    langDesc: cookieObj.language,
                                    userName: cookieObj.username
                                }
                            };
                            CaptivePortal.util.Utility.setValuesForCookies(cookieObj);
                            this.loginForSuperAdmin(userInitialObj);
                        } else {
                            var profiles = userObj.data.user.profiles;
                            userName = (profiles && profiles.length && profiles[0].name) ? profiles[0].name : "";
                            profileId = (profiles && profiles.length && profiles[0].id) ? profiles[0].id : "";
                            cookieObj = {remember: rememberMe, email: userObj.data.user.email, token: userObj.data.user.auth_token, username: userName, language: 'English', profileId: profileId};
                            CaptivePortal.util.Utility.setValuesForCookies(cookieObj);
                            CaptivePortal.util.Utility.doLoginForLoggedUser();
                        }
                    }
                    console.log(Ext.ComponentQuery.query('panel#login')[0])
                    var loginpanel = Ext.ComponentQuery.query('panel#login')[0];
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

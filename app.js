/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'CaptivePortal',
    extend: 'CaptivePortal.Application',
    //autoCreateViewport: 'CaptivePortal.view.main.Main'

    //-------------------------------------------------------------------------
    // Most customizations should be made to CaptivePortal.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
    requires: ['CaptivePortal.view.accesstimepolicy.Main','CaptivePortal.view.login.Login', 'CaptivePortal.view.sites.Main', 'CaptivePortal.view.Viewport', 'CaptivePortal.util.Utility', 'CaptivePortal.Config', 'CaptivePortal.view.users.TenantList', 'CaptivePortal.view.sms_gateway.Main','Ext.window.Toast','CaptivePortal.view.template_mgmt.Main'],
    config: {
        userRole: '',
        accessPermissionList: [],
        userName: '',
        token: '',
        userPermittedList: [],
        userAuthorisedIPs: [],
        userProfileID: '',
        userTenantID: '',
        userTenantName: '',
        tempUserObj: '',
        waitMsg: 'Please Wait...',
        loginMsg: 'Signing In...'
    },
    launch: function () {
        var vp = Ext.create('CaptivePortal.view.Viewport');
        var validateSignIn = function () {
            var view;
            var cookieVal = Ext.util.Cookies.get('CAP_SESSION');
            if (cookieVal) {
                var cookieObj = Ext.decode(cookieVal);
                if (cookieObj.remember && cookieObj.email) {
                    CaptivePortal.util.Utility.doLoginForLoggedUser();
                    return;
                } else {
                    view = Ext.create('CaptivePortal.view.login.Login');
                }
            } else {
                view = Ext.create('CaptivePortal.view.login.Login');
            }
            return view;
        };
        vp.add(validateSignIn());

        // vp.add(Ext.create('CaptivePortal.view.editor.Main'));
    }
});

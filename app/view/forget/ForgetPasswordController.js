Ext.define('CaptivePortal.view.forget.ForgetPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.forget_password',
    render: function (form) {
        var btn = form.down('button');
        var nav = new Ext.util.KeyNav({
            target: form.getEl(),
            enter: function (e) {
                this.send_forget_password(btn);
            },
            scope: this
        });
    },
    onLoginLabelRender: function (label) {
        var me = this;
        label.el.on('click', function () {
            me.create_SignIn_View();
        });
    },
    create_SignIn_View: function () {
        if (Ext.getCmp('viewport')) {
            Ext.getCmp('viewport').removeAll();
            var view = Ext.create('CaptivePortal.view.login.Login');
            Ext.getCmp('viewport').add(view);
        }
    },
    navigate_to_sign_in: function (labelComp) {
        var ctrl = this;
        if (labelComp.getEl() && labelComp.getEl().dom) {
            labelComp.getEl().dom.addEventListener('click', this.create_SignIn_View.bind(ctrl));
        }
    },
    send_forget_password: function (btn) {
        var formObj = btn.up('form'), form = formObj.getForm();
        var infoLab = formObj.down('#forget_password_info');
        var emailValidationInfo = formObj.down('#sign_in_nav');
        emailValidationInfo.hide();
        infoLab.hide();
        if (form.isValid()) {
            var userName = formObj.down('#forget_password_user_name').getValue();
            var params = {"user[email]": userName};
            emailValidationInfo.show();
            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.SEND_FORGET_PASSWORD, params,'Please Wait', '', function (response) {
            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.SEND_FORGET_PASSWORD, params, 'Please Wait', '', function (response) {
                var respObj = Ext.decode(response.responseText);
                var msg = "";
                console.log(respObj);
                if (!respObj.success) {
                    msg = respObj.error[0];
                    emailValidationInfo.setText(msg);
                    if (emailValidationInfo.hasCls('validEmail')) {
                        emailValidationInfo.removeCls('validEmail');
                    }
                    emailValidationInfo.addCls('inValidEmail');
                } else {
                    msg = respObj.message;
                    emailValidationInfo.setText(msg);
                    if (emailValidationInfo.hasCls('inValidEmail')) {
                        emailValidationInfo.removeCls('inValidEmail')
                    }
                    emailValidationInfo.addCls('validEmail');
                }
                //debugger;
            }.bind(this), function (response) {
            }, 'POST');
        }
    }

});

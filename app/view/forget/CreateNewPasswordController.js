/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.forget.CreateNewPasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.forget_createnewpassword',
    listen: {
        component: {
            'button#btn_submit': {
                click: 'onSubmit'
            }
        }
    },
    onLoginLabelRender: function (label) {
        var me = this;
        label.el.on('click', function () {
            if (Ext.getCmp('viewport')) {
                Ext.getCmp('viewport').removeAll();
                var view = Ext.create('CaptivePortal.view.login.Login');
                Ext.getCmp('viewport').add(view);
            }
        })
    },
    onSubmit: function () {
        var me = this;        
        var password = this.getView().lookupReference('txt_password').getValue();
        var confirmpassword = this.getView().lookupReference('txt_confirmpassword').getValue();
        var params = {"user[reset_password_token]": me.getView().token, "user[password]": password, "user[password_confirmation]": confirmpassword};
        var label = me.getView().lookupReference('lab_err').setVisible(true);
        console.log(params);
        if (password === confirmpassword) {
            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.RESET_PASSWORD_LINK, params, 'Please Wait', '', function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    label.setText(resObj.message);
                    if (label.hasCls('inValidEmail')) {
                        label.removeCls('inValidEmail')
                    }
                    label.addCls('validEmail');
                } else {
                    label.setText(resObj.error[0]);
                    if (label.hasCls('validEmail')) {
                        label.removeCls('validEmail');
                    }
                    label.addCls('inValidEmail');
                }
            }.bind(this), function () {
                Ext.Msg.alert('Info', 'failure');
            }.bind(this), 'PUT');
        } else {
            if (label.hasCls('validEmail')) {
                label.removeCls('validEmail')
            }
            label.addCls('inValidEmail');
            label.setText('password not matching');
        }
    }
})


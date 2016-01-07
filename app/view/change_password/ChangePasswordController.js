Ext.define('CaptivePortal.view.change_password.ChangePasswordController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.change_password_cntl',
    id: 'vc_change_password',
    changePassword: function(btn){
        var form = btn.up('form'), newPass = form.down('#change_password_form-new_password'), 
        confirmPass = form.down('#change_password_form-confirm_password'), oldPass = form.down('#change_password_form-old_password'), 
        newPassVal = newPass.getValue().trim(), confirmPassVal = confirmPass.getValue().trim(), oldPassVal = oldPass.getValue();
        if(newPassVal != confirmPassVal){
            CaptivePortal.util.Utility.showError('Confirm Passsword', 'New password and Confirm password must be same');
            return;
        } else {            
            var param = {
                user: {
                    old_password : oldPassVal,
                    password : newPassVal,
                    password_confirmation : confirmPassVal,
                    verify_old_password : 'yes'
                }
            }
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.CHANGE_PASSWORD, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                       CaptivePortal.util.Utility.showInfo('Change Password', 'Your password is changed successfully');
                    }
                }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success) {
                        CaptivePortal.util.Utility.showError('Error', resObj.error);
                    }
                }, 'PUT');
        }
    }
});


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.users.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.users_maincontroller',
    id: 'vc_users_maincontroller',
    requires: ['CaptivePortal.store.users.TenantList'],
    listen: {
        controller: {
            '#vc_homecontroller': {
                setActiveUserCard: 'setActiveItem',
                getUsersMainData: 'getData'
            },
            '#vc_userlistcontroller': {
                showAddEditMaster: 'createNewUser',
                setActiveUserCard: 'setActiveItem',
                getUsersMainData: 'getData'
            },
            '#vc_usersaddoreditcontroller': {
                setActiveUserCard: 'setActiveItem'
            }
        }
    },
    setActiveItem: function (card) {
        this.getView().setActiveItem(card);
    },
    createNewUser: function (card) {
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('setNew', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        this.getView().setActiveItem(card);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New '+CaptivePortal.Constant.CONFIGURATION.ADMINS+' Profile');
        Ext.ComponentQuery.query('button#btn_newusersave')[0].setText('Create');
        this.fireEvent('refreshUserList');
    },
    getData: function (callback) {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var tenantStr = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
                tenantStr.setData(resObj.data.tenants);
                var roleStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');
                roleStr.setData(resObj.data.roles);
                callback("success", tenantStr);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
    }
});


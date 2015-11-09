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
                getUsersMainData:'getData'
            },
            '#vc_usersaddoreditcontroller': {                
                setActiveUserCard:'setActiveItem'
            }
        }
    },
    setActiveItem: function (card) {
        this.getView().setActiveItem(card);
    },
    createNewUser: function (card) {
        Ext.getCmp('viewport').setLoading(true)
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            console.log(resObj)
            debugger
            if (resObj.success) {               
                if (CaptivePortal.app.getUserRole() != 'super_admin') {
                    me.fireEvent('getUsersSiteData', CaptivePortal.app.getUserTenantID(), function (store) {
                    }.bind(this));
                }
                me.fireEvent('setStoreEvent',resObj.data);
                Ext.getCmp('viewport').setLoading(false);              
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            Ext.getCmp('viewport').setLoading(false)
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        this.getView().setActiveItem(card);
        this.fireEvent('refreshUserList');
        Ext.getCmp('viewport').setLoading(false);
    },
    onShowAddEditMaster: function () {
        this.getView().setActiveItem(1);
        var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
        var btn = Ext.ComponentQuery.query('button#btn_newusersave')[0];
        laab.setText('New User Profile');
        btn.setText('Create');
    },
    getData: function (callback) {
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var tenantStr = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
                tenantStr.setData(resObj.data.tenants);
                var roleStr = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');
                roleStr.setData(resObj.data.roles);
                callback("success", tenantStr);
                console.log(resObj)
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
    }
});


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.users.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.users_maincontroller',
    requires:['CaptivePortal.store.users.TenantList'],
    listen:{       
            controller:{
                 '*':{
                showAddEditMaster:'onShowAddEditMaster',
                setActiveItem:'onSetActiveCard'
            }
        }
    },
    onSetActiveCard:function(card){
         this.getView().setActiveItem(card);
         this.fireEvent('refreshUserList');
         Ext.getCmp('viewport').setLoading(false);
    },
    onShowAddEditMaster:function(){      
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                var tenantStr  = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
                tenantStr.setData(resObj.data.tenants);
                var roleStr  = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');
                roleStr.setData(resObj.data.roles);
              console.log(resObj)              
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');   
       this.getView().setActiveItem(1);
       var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
       laab.setText('New User Profile');
    }
});


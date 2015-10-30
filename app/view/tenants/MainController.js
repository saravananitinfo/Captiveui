Ext.define('CaptivePortal.view.tenants.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.tenants_maincontroller',
    requires:['CaptivePortal.store.users.TenantList'],
    listen:{       
            controller:{
                 '*':{
                showAddEditTenant:'onShowAddEditTenant',
                setTenantMainActiveItem:'onSetTenantMainActiveCard'
            }
        }
    },
    onSetTenantMainActiveCard:function(card){
         this.getView().setActiveItem(card);
         Ext.getCmp('viewport').setLoading(false);
    },
    onShowAddEditTenant:function(){
        // CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_NEW_USER, {}, function (response) {
        //     var resObj = Ext.decode(response.responseText);
        //     if (resObj.success) {
        //         var tenantStr  = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
        //         tenantStr.setData(resObj.data.tenants);
        //         var roleStr  = Ext.StoreManager.lookup('CaptivePortal.store.users.Role');
        //         roleStr.setData(resObj.data.roles);
        //       console.log(resObj)              
        //     }
        // }.bind(this), function (response) {
        //     var resObj = Ext.decode(response.responseText);
        //     if (!resObj.success && resObj.error.length) {
        //         CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
        //     }
        // }, 'GET');   
        this.getView().setActiveItem(1);
        var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
        laab.setText('New Tenant');
    }
});


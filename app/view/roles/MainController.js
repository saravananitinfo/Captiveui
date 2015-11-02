Ext.define('CaptivePortal.view.roles.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.roles_maincontroller',
    requires:['CaptivePortal.store.role.RoleAccess'],
    listen:{       
            controller:{
                 '*':{
                showAddEditRole:'onShowAddEditRole',
                setRoleMainActiveItem:'onSetRoleMainActiveCard',
                showRoleEditView: 'onShowTenantEditView'
            }
        }
    },
    onShowTenantEditView: function(card){
        this.getView().setActiveItem(card);
    },
    onSetRoleMainActiveCard:function(card){
         this.getView().setActiveItem(card);
         Ext.getCmp('viewport').setLoading(false);
    },
    onShowAddEditRole:function(){
         CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_ROLE, {}, function (response) {
             var resObj = Ext.decode(response.responseText);
             if (resObj.success) {
        //         var tenantStr  = Ext.StoreManager.lookup('CaptivePortal.store.users.TenantList');
        //         tenantStr.setData(resObj.data.tenants);
                 var roleStr  = Ext.StoreManager.lookup('CaptivePortal.store.role.RoleAccess');
                 roleStr.setData(resObj.data.site_accesses);
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
        laab.setText('New Role');
        var btn =  Ext.ComponentQuery.query('button#btn_saveRole')[0];
        btn.setText('Create');
    }
});


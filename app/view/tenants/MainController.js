Ext.define('CaptivePortal.view.tenants.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.tenants_maincontroller',
    requires:['CaptivePortal.store.users.TenantList'],
    listen:{       
            controller:{
                 '*':{
                showAddEditTenant:'onShowAddEditTenant',
                setTenantMainActiveItem:'onSetTenantMainActiveCard',
                showTenantEditView: 'onShowTenantEditView'
            }
        }
    },
    onShowTenantEditView:function(card){
         this.getView().setActiveItem(card);
    },
    onSetTenantMainActiveCard:function(card){
         this.getView().setActiveItem(card);
         Ext.getCmp('viewport').setLoading(false);
    },
    onShowAddEditTenant:function(){       
        this.getView().setActiveItem(1);
        var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
        laab.setText('New Tenant');
        var btn =  Ext.ComponentQuery.query('button#btn_saveTenant')[0];
        btn.setText('Create');
    }
});


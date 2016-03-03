Ext.define('CaptivePortal.view.tenantconfig.ConfigModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tenantconfig_configmodel',
    requires:['CaptivePortal.store.tenant.Config'],
    stores: {
        tenantconfig: {
            type: 'tenantconfig',
            model:'CaptivePortal.model.tenant.Config',           
            autoLoad: false
        }
    }
});

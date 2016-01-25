Ext.define('CaptivePortal.view.tenants.AssumeListController', {
    extend: 'Ext.app.ViewController',
    id:'vc_assumelistcontroller',
    alias: 'controller.assumelistcontroller',
    listen: {
        controller:{
                 '*':{
                getAssumeList:'onGetAssumeList'
            }
        }
    },
    cancelAssumeList: function(){
        this.fireEvent('setTenantMainActiveItem', 0);
        var laab = Ext.ComponentQuery.query('label#lab_appheading')[0];
        laab.setText('Tenants');
    },
    onGetAssumeList: function (record) {    
        var url = CaptivePortal.Config.SERVICE_URLS.ASSUME_USER_TENANT + record.data.id + '/get_users.json';   
        var store = this.getView().lookupReference('grd_assumelist').getStore();
        store.proxy.url = url;
        store.load();
        store.on('load', function (store, record) {
            Ext.getCmp('viewport').setLoading(false);
        })
    },
    assumeItemClick: function (view, record, item, index, e, eOpts) {
        var me = this
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "assume") {
                CaptivePortal.util.Utility.doAssumeUserLoginLogout(true, record);
        }
    }
}
});
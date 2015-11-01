Ext.define('CaptivePortal.store.user.User', {
    extend: 'Ext.data.Store',
    autoLoad:false,
    requires: ['CaptivePortal.model.user.User'],
    model: 'CaptivePortal.model.user.User',
    proxy: {
        type: 'ajax',
        disableCachingParam:'',
        url: CaptivePortal.Config.SERVICE_URLS.GET_USER,
        reader: {
            type: 'json',
            rootProperty: 'data.user_profiles'
        }
    }
});
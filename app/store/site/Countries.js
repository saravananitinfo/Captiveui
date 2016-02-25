Ext.define('CaptivePortal.store.site.Countries', {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ['id', 'name'],
    proxy: {
        url: CaptivePortal.Config.SERVICE_URLS.GET_COUNTRIES,
        type: 'ajax',
        reader: {
            type: 'json',
            rootProperty: 'data.countries'
        }
    }
});
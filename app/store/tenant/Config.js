Ext.define('CaptivePortal.store.tenant.Config', {
  extend: 'Ext.data.Store',
  alias: 'store.tenantconfig',
  autoLoad: false,
  requires: ['CaptivePortal.model.tenant.Config'],
  model: 'CaptivePortal.model.tenant.Config',
  proxy: {
    type: 'ajax',
    url: 'http://192.168.0.220:3001/tenants/560bc6e76b69721f8d010000/edit.json',
    reader: {
      type: 'json',
      rootProperty: 'data.tenant'
    },
    listeners: {
      exception: function (store, response, op) {
        debugger
        console.log('Exception !');

        // hack to avoid js exception :
        // TypeError: 'undefined' is not an object (evaluating 'records.length')
        // on line sencha-touch-debug-1-1-0.js:7212
        op.records = [];
      }
    }
  }
});

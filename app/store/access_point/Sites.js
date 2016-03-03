Ext.define('CaptivePortal.store.access_point.Sites', {
  extend: 'Ext.data.Store',
  autoload: false,
  fields: [
    {name: 'id', type: 'string'},
    {name: 'name', type: 'string'}
  ],
  proxy: {
    url: CaptivePortal.Config.SERVICE_URLS.NEW_ACCESSPOINT,
    type: 'ajax',
    reader: {
      type: 'json',
      rootProperty: 'data.site'
    }
  },
  listeners: {
    load: function (str, records, successful, operation, eOpts) {
      str.removeAll();
      str.loadData(records);
      var pos = str.findExact('name', 'Create a new site');
      if (!pos >= 0)
        str.add({
          id: 0,
          name: 'Create a new site'
        });
    }
  }
});
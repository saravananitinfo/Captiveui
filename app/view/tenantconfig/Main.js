Ext.define('CaptivePortal.view.tenantconfig.Main', {
  extend: 'Ext.Container',
  alias: 'widget.tenantconfig_main',
  requires: ['CaptivePortal.view.tenantconfig.Config'],
  layout: {
    type: 'fit'
  },
  items: [{
      xtype: 'tenantconfig_config'
    }]
});

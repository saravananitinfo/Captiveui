Ext.define('CaptivePortal.view.sites.MainController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.sites_maincontroller',
  requires: ['CaptivePortal.store.users.TenantList'],
  listen: {
    controller: {
      '#vc_sitecontroller': {
        setActiveSiteCard: 'setActiveItem'
      },
      '#vc_sitelistcontroller': {
        setActiveSiteCard: 'setActiveItem'
      },
      '#vc_homecontroller': {
        setActiveSiteCard: 'setActiveItem'
      }
    }
  },
  setActiveItem: function (card) {
    debugger
    this.getView().setActiveItem(card);
  }
});


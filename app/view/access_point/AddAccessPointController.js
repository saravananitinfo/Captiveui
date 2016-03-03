Ext.define('CaptivePortal.view.access_point.AddAccessPointController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.add_access_point_controller',
  id: 'vc_add_access_point_controller',  
  onSiteComboSelect: function (l, k, p) {
    if (l.getRawValue() === 'Create a new site') {
      this.fireEvent('forceToChangeView', 'card_sitelist', CaptivePortal.Constant.CONFIGURATION.SITES);
      this.fireEvent('showCreateSite');
    }
  },
  addRowAccessPoint: function () {
    console.log(".........hi");
    console.log(this);
    Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').reload();
    var grid = this.getView().lookupReference('grd_add_access_point');
    grid.getStore().add({name: "", mac_id: "", site_id: ""});
  },
  removeRowAccessPoint: function () {
    var grid = this.getView().lookupReference('grd_add_access_point');
    var store = grid.getStore();
    // console.log(grid.getSelection());
    store.remove(grid.getSelectionModel().getSelection());
  },
  saveAddAccessPoints: function () {
    Ext.getCmp('viewport').setLoading(true);
    console.log('...................call save');
    var store = Ext.StoreManager.lookup('CaptivePortal.store.access_point.AddAccessPoint')
    data = store.getRange().map(function (ele) {
      return {name: ele.data.name, mac_id: ele.data.mac_id, site_id: ele.data.site_id, vendor_type: ele.data.vendor_type}
    });
    console.log(data)

    var json = {access_point: data}

    console.log(json)
    var url = CaptivePortal.Config.SERVICE_URLS.SAVE_ACCESSPOINT, method = 'POST';
    // CaptivePortal.util.Utility.addHeader();
    CaptivePortal.util.Utility.doAjaxJSON(url, json, "Loading..", this.getView(), function (response) {
      Ext.getCmp('viewport').setLoading(false);
      var resObj = Ext.decode(response.responseText);
      console.log("........success");
      console.log(resObj)
      if (resObj.success === true) {
        console.log("save.........save..........save...access_point");
        Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
        this.fireEvent('setAccessPointMainActiveItem', 0);

        // me.fireEvent('setSmSGatewayMainActiveItem', 0);
        // Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
      }
    }.bind(this), function (response) {
      var resObj = Ext.decode(response.responseText);
      if (!resObj.success && resObj.error.length) {
        Ext.getCmp('viewport').setLoading(false);
        CaptivePortal.util.Utility.showError('Error', resObj.error);
      }
    }, method);


  },
  cancleAddAccessPoints: function () {
    console.log('...................call cancle');
    Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
    this.fireEvent('setAccessPointMainActiveItem', 0);
  }
});
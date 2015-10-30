Ext.define('CaptivePortal.view.tenants.TenantListController',{
	extend:'Ext.app.ViewController',
	alias:'controller.tenantlistcontroller',
	listen: {
    component: {
      'button#btn_addtenant': {
        click: 'showAddEditTenant'
      }
    }
	},
	showAddEditTenant: function () {
		console.log("..................first................");
		this.fireEvent('showAddEditTenant', this);
		Ext.getCmp('tenants_addedit').down('form').reset(true)
  },
	getTenantList:function(){
		var store = this.getView().lookupReference('grd_tenantlist').getStore();
		store.load();
		store.on('load',function(store,record){
			console.log(record)
		})
	}
});
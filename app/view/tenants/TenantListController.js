Ext.define('CaptivePortal.view.tenants.TenantListController',{
	extend:'Ext.app.ViewController',
	alias:'controller.tenantlistcontroller',
	getTenantList:function(){
	var store = this.getView().lookupReference('grd_tenantlist').getStore();
	store.load();
	store.on('load',function(store,record){
		console.log(record)
	})
	}
})
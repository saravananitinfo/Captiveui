Ext.define('CaptivePortal.view.roles.RoleController',{
		extend:'Ext.app.ViewController',
		alias:'controller.rolelistcontroller',
		getRoles:function(){
		var store = this.getView().lookupReference('grd_rolelist').getStore();
		store.load();
		store.on('load',function(store,record){
			console.log(record)
		})
		}
})
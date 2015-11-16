Ext.define('CaptivePortal.view.access_point.AddAccessPointController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add_access_point_controller',
    addRowAccessPoint: function(){
    	console.log(".........hi");
    	console.log(this);
    	var grid = this.getView().lookupReference('grd_add_access_point');
    	grid.getStore().add({name:"",mac_id:"",site_id:""})
    	
    },
    removeRowAccessPoint: function(){
    	var grid = this.getView().lookupReference('grd_add_access_point');
    	var store = grid.getStore();
    	// console.log(grid.getSelection());
    	store.remove(grid.getSelectionModel().getSelection());
    },
    saveAddAccessPoints: function(){
    	console.log('...................call save');
    	var store = Ext.StoreManager.lookup('CaptivePortal.store.access_point.AddAccessPoint')
    	data = store.getRange().map(function(ele){ return ele.data});
    	console.log(data)

    },
    cancleAddAccessPoints: function(){
    	console.log('...................call cancle');
    }
});
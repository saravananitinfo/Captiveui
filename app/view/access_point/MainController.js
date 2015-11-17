Ext.define('CaptivePortal.view.access_point.MainController',{
	extend: 'Ext.app.ViewController',
	alias: 'controller.access_point_main_controller',
	listen: {
		controller: {
			'*':{
				setAccessPointMainActiveItem: "onSetActiveItem"
			}
		}
	},
	onSetActiveItem:function(card){
        this.getView().setActiveItem(card);
    }
});
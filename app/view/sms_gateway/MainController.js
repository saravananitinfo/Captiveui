Ext.define('CaptivePortal.view.sms_gateway.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.sms_gateway_maincontroller',
    listen: {
    	controller: {
    		"*":{
    			setSmSGatewayMainActiveItem: "onSetActiveItem"
    		}
    	}
    },
    onSetActiveItem:function(card){
         this.getView().setActiveItem(card);
    }
});
    
    
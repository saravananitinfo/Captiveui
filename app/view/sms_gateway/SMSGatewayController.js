Ext.define('CaptivePortal.view.sms_gateway.SMSGatewayController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.sms_gateway',
    selectGatewayType: function (combo, record, eopts) {
        console.log("..........ccc"+combo.getValue());
        if (combo.getValue()) {
          // this.getView().setActiveItem(card);
          // this.getView().lookupReference('gatwaytype_forms').setActiveItem(parseInt(combo.getValue()));
            this.getView().lookupReference('gatwaytype_forms').removeAll();
            this.getView().lookupReference('gatwaytype_forms').add(Ext.create('CaptivePortal.view.sms_gateway.GatewayType'+parseInt(combo.getValue())))
        }
    },
    saveSMSGateway: function(){
        console.log("me.............");
    }

});
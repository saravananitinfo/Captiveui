Ext.define('CaptivePortal.view.sms_gateway.SMSGatewayController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.sms_gateway',
    selectGatewayType: function (combo, record, eopts) {
        if (combo.getValue()) {
          // this.getView().setActiveItem(card);
          // this.getView().lookupReference('gatwaytype_forms').setActiveItem(parseInt(combo.getValue()));
            if(combo.getValue() === 'Twilio')
                this.getView().lookupReference('gatwaytype_forms').setHeight(300);
            else
                this.getView().lookupReference('gatwaytype_forms').setHeight(200);
            this.getView().lookupReference('gatwaytype_forms').removeAll();
            this.getView().lookupReference('gatwaytype_forms').add(Ext.create('CaptivePortal.view.sms_gateway.GatewayType'+combo.getValue()))
        }
    },
    saveSMSGateway: function(){
        var me = this;
        var form = this.getView().down('form');
        if(form.isValid()){
            Ext.getCmp('viewport').setLoading(true);
            var gateway_id = form.down('#gateway_id').getValue();
            form_values = form.getValues();
            json = {};
            json['sms_gateway_management'] = {}
            json['sms_gateway_management']['name'] = form_values['name'];
            json['sms_gateway_management']['status'] = form_values['status'];
            json['sms_gateway_management']['site_ids'] = form_values['site_ids'];
            json['sms_gateway_management']['gateway_type'] = form_values['gateway_type'].toLowerCase();
            json['sms_gateway_management']['acc_details'] = {};
            switch(json['sms_gateway_management']['gateway_type']){
                case 'clickatell':
                    json['sms_gateway_management']['acc_details']['api_id'] = form_values['api_id'];
                    json['sms_gateway_management']['acc_details']['username'] = form_values['username'];
                    json['sms_gateway_management']['acc_details']['password'] = form_values['password'];
                    break;
                case 'twilio':
                    json['sms_gateway_management']['acc_details']['account_sid'] = form_values['account_sid'];
                    json['sms_gateway_management']['acc_details']['auth_token'] = form_values['auth_token'];
                    json['sms_gateway_management']['acc_details']['twilio_number'] = form_values['twilio_number'];
                    json['sms_gateway_management']['verification_details'] = {}
                    json['sms_gateway_management']['verification_details']['to'] = form_values['veri_to'];
                    json['sms_gateway_management']['verification_details']['text'] = form_values['veri_text'];
                    break;
                case 'cdyne':
                    json['sms_gateway_management']['acc_details']['license_key'] = form_values['license_key'];
                    json['sms_gateway_management']['verification_details'] = {}
                    json['sms_gateway_management']['verification_details']['to'] = form_values['veri_to'];
                    json['sms_gateway_management']['verification_details']['text'] = form_values['veri_text'];
            }
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SMSGATEWAY, method = 'POST';
            if(gateway_id){
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SMSGATEWAY + gateway_id + '.json';
                method = 'PUT';
            }
            CaptivePortal.util.Utility.doAjaxJSON(url,json,function(response){
                var resObj = Ext.decode(response.responseText);
                if(resObj.success){
                    Ext.getCmp('viewport').setLoading(false);
                    console.log("save.........save..........save...smsgatway");
                    me.fireEvent('setSmSGatewayMainActiveItem', 0);
                    Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
                }
            }.bind(this),function(response){
                var resObj = Ext.decode(response.responseText);
                if(!resObj.success && resObj.error.length){
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }          
            },method);
        }
    },
    cancelSMSGateway: function () {
        var me = this;
        me.fireEvent('setSmSGatewayMainActiveItem', 0);
        Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
    }

});
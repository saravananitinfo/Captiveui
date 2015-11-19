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
            var form_values = form.getValues();
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
                    break;
                case 'cdyne':
                    json['sms_gateway_management']['acc_details']['license_key'] = form_values['license_key'];
            }
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SMSGATEWAY, method = 'POST';
            if(gateway_id){
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SMSGATEWAY + gateway_id + '.json';
                method = 'PUT';
            }
            CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
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
    testVerifyGatewayDetails: function(){
        var form = Ext.ComponentQuery.query('#smsform')[0]
        var form_values = form.getValues();
        if(form_values['gateway_type'].toLowerCase() === 'clickatell'){
            this.verifyGateway(form_values);
        }else{
            var myForm = new Ext.form.Panel({
                controller: 'sms_gateway',
                width: 400,
                height: 200,
                title: 'Enter Your Number',
                floating: true,
                closable : true,
                items: [
                    {
                        xtype: 'textfield',
                        name: 'number',
                        emptyText: "Phone Number",
                        allowBlank: false,
                        width: '70%',
                        margin: '20 20 20 20'
                    },
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        width: '100%',
                        height: 50,
                        margin: '0 20 0 20',
                        items: [
                            {
                                xtype: 'button',
                                formBind: true,
                                itemId: "submit_verity_gateway",
                                text: "Save",
                                handler: 'submitVerityGateway',
                                cls: 'btn'
                            }
                        ]
                    }
                ]
            });
            myForm.show();
            myForm.center();
        }
    },
    submitVerityGateway: function(){
        var form = Ext.ComponentQuery.query('#smsform')[0]
        var form_values = form.getValues();
        this.verifyGateway(form_values);
        this.getView().close();

    },
    verifyGateway: function(form_values){
        var json = {}
        errors = []
        json['gateway_type'] = form_values['gateway_type'].toLowerCase()
        switch(json['gateway_type']){
            case 'clickatell':
                form_values['api_id'] == '' ? errors.push("Api Id can't be blank.") : json['api_id'] = form_values['api_id'];
                form_values['username'] == '' ? errors.push("Username can't be blank.") : json['username'] = form_values['username'];
                form_values['password'] == '' ? errors.push("Password can't be blank.") : json['password'] = form_values['password'];
                break;
            case 'twilio':
                form_values['account_sid'] == '' ? errors.push("Account Sid can't be blank.") : json['account_sid'] = form_values['account_sid'];
                form_values['auth_token'] == '' ? errors.push("Auth Token can't be blank.") : json['auth_token'] = form_values['auth_token'];
                form_values['twilio_number'] == '' ? errors.push("Twilio Number can't be blank.") : json['twilio_number'] = form_values['twilio_number'];
                form_values['phone_number'] == '' ? errors.push("Phone Number can't be blank.") : json['phone_number'] = this.getView().down('[name=number]').getValue()
                break;
            case 'cdyne':
                form_values['license_key'] == '' ? errors.push("License Key can't be blank.") : json['license_key'] = form_values['license_key'];
                form_values['phone_number'] == '' ? errors.push("Phone Number can't be blank.") : json['phone_number'] = this.getView().down('[name=number]').getValue()
        }

        console.log(json);
        if(errors.length == 0){
            var url = CaptivePortal.Config.SERVICE_URLS.GATEWAY_VERIFICATION+"?"+Ext.urlEncode(json), method = 'GET';
            Ext.getCmp('viewport').setLoading(true);
            CaptivePortal.util.Utility.doAjaxJSON(url,{},"Loading...", this.getView(),function(response){
                var resObj = Ext.decode(response.responseText);
                if(resObj.success){
                    Ext.getCmp('viewport').setLoading(false);
                    console.log("save.........save..........save...verify");
                    Ext.Msg.show({
                        title: 'Info',
                        message: resObj.message,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                }
            }.bind(this),function(response){
                var resObj = Ext.decode(response.responseText);
                if(!resObj.success && resObj.error.length){
                    Ext.getCmp('viewport').setLoading(false);
                    var error = resObj.error;
                    if(error.constructor == Array)
                        error = resObj.error.join(' ');
                    CaptivePortal.util.Utility.showError('Error', error);
                }          
            },method);
        }else{
            Ext.Msg.show({
                title: 'Error',
                message: errors.join('<br/>'),
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
    },
    cancelSMSGateway: function () {
        var me = this;
        me.fireEvent('setSmSGatewayMainActiveItem', 0);
        Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
    }

});
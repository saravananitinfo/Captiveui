Ext.define('CaptivePortal.view.sms_gateway.SMSGatewatListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.sms_gatewaylistcontroller',
    newSMSGateway: function(){
    	Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.Sites').reload();
    	this.fireEvent('setSmSGatewayMainActiveItem', 1);
        Ext.ComponentQuery.query('#btn_saveSMSGateway')[0].setText('Create');
        var form = Ext.ComponentQuery.query('#smsform')[0];
        form.reset(true);
    	var gateway_type_form  = Ext.ComponentQuery.query('#gatwaytype_forms')[0];
        gateway_type_form.removeAll();
    	gateway_type_form.add(Ext.create('CaptivePortal.view.sms_gateway.GatewayTypeClickatell'))
    },
    editSMSGateway: function(obj){
        Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.Sites').reload();
    	this.fireEvent('setSmSGatewayMainActiveItem', 1);
    	var gateway_type_form  = Ext.ComponentQuery.query('#gatwaytype_forms')[0];

        if(obj.data.sms_gateway_management.gateway_type === 'twilio')
            gateway_type_form.setHeight(300);
        else
            gateway_type_form.setHeight(200);

        var gateway_type = CaptivePortal.util.Utility.capitalizeFirstLetter(obj.data.sms_gateway_management.gateway_type)
        gateway_type_form.removeAll();
        gateway_type_form.add(Ext.create('CaptivePortal.view.sms_gateway.GatewayType'+gateway_type))
        record = this.createSMSGatewayModel(obj);
        var form = Ext.ComponentQuery.query('#smsform')[0];

        form.loadRecord(record);
        Ext.ComponentQuery.query('#btn_saveSMSGateway')[0].setText('Update');
        Ext.getCmp('viewport').setLoading(false);
    },
    deleteSMSGateway: function(view, record, item, index, e, eOpts){ 
    	Ext.Msg.show({
            title: 'Delete SMS Gateway',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) { 
                if (btn === 'yes') {
                    Ext.getCmp('viewport').setLoading(true);
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SMSGATEWAY + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
                            Ext.getCmp('viewport').setLoading(false);
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    userItemClick: function (view, record, item, index, e, eOpts) {
    	var me = this
        var action = e.target.getAttribute('action');
        // action = "edit"
        if (action) {
            if (action == "edit") {
            	Ext.getCmp('viewport').setLoading(true);
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_SMSGATEWAY + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                    	this.editSMSGateway(resObj);
                        /*var record = this.createTenantModel(resObj.data.tenant, true);

                        me.fireEvent('setTenantEditViewForm', record);*/
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteSMSGateway(view, record, item, index, e, eOpts);
            }
        }
    },
    createSMSGatewayModel: function (obj) {
        model_obj = {
            gateway_id: obj.data.sms_gateway_management.id,
            name: obj.data.sms_gateway_management.name,
            status: obj.data.sms_gateway_management.status,
            gateway_type: obj.data.sms_gateway_management.gateway_type,
            site_ids: obj.data.sms_gateway_management.sites.map(function(el){return el.id})
        }
        switch(obj.data.sms_gateway_management.gateway_type){
            case 'clickatell':
                model_obj['api_id'] = obj.data.sms_gateway_management.acc_details.api_id
                model_obj['username'] = obj.data.sms_gateway_management.acc_details.username
                model_obj['password'] = obj.data.sms_gateway_management.acc_details.password
                break;
            case 'twilio':
                model_obj['account_sid'] = obj.data.sms_gateway_management.acc_details.account_sid
                model_obj['auth_token'] = obj.data.sms_gateway_management.acc_details.auth_token
                model_obj['twilio_number'] = obj.data.sms_gateway_management.acc_details.twilio_number
                model_obj['veri_to'] = obj.data.sms_gateway_management.verification_details.to
                model_obj['veri_text'] = obj.data.sms_gateway_management.verification_details.text
                break;
            case 'cdyne':
                model_obj['license_key'] = obj.data.sms_gateway_management.acc_details.license_key
                model_obj['veri_to'] = obj.data.sms_gateway_management.verification_details.to
                model_obj['veri_text'] = obj.data.sms_gateway_management.verification_details.text
        }
        return model = Ext.create('CaptivePortal.model.sms_gateway.SMSGateway', model_obj);
    }
});
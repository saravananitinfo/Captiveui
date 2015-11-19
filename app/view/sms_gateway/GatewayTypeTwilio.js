Ext.define('CaptivePortal.view.sms_gateway.GatewayTypeTwilio',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.gatewaytype1',
	padding: 0,
	height: '100%',
	scrollable: true,
	width: '100%',
	layout: {
	    type: 'vbox'
	},
	initComponent: function () {
		this.items = [

            {
                xtype: 'button',
                text: 'How to get the API details for My Twilio Account?',
                cls: 'header_label_content help-text-sms-gateway',
                href: 'http://www.twilio.com',
                target: '_blank',
                margin: '0 0 20 0'
                
            },
            {
                xtype: 'textfield',
                name: 'account_sid',
                emptyText: "Account Sid",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.account_sid ? this.account_sid : ''
            },
            {
                xtype: 'textfield',
                name: 'auth_token',
                emptyText: "Auth Token",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.auth_token ? this.auth_token : ''
            },
            {
                xtype: 'textfield',
                name: 'twilio_number',
                emptyText: "Twilio Number",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.twilio_number ? this.twilio_number : ''
            },
            {
                xtype: 'label',
                text: 'Test/Verify Gateway Details',
                cls: 'header_label_content',
                margin: '0 0 20 0'
            },
            {
                xtype: 'button',
                text: 'Verify',
                cls: 'header_label_content help-text-sms-gateway',
                margin: '0 0 20 0',
                handler: 'testVerifyGatewayDetails'
                
            }
            // {
            //     xtype: 'textfield',
            //     name: 'veri_to',
            //     emptyText: "Number",
            //     width: '100%',
            //     allowBlank: false,
            //     margin: '0 0 20 0',
            //     value: this.veri_to ? this.veri_to : ''
            // },
            // {
            //     xtype: 'textfield',
            //     name: 'veri_text',
            //     emptyText: "Message",
            //     width: '100%',
            //     allowBlank: false,
            //     value: this.veri_text ? this.veri_text : ''
            // }

		]
		this.callParent();
	}
});
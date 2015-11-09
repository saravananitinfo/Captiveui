Ext.define('CaptivePortal.view.sms_gateway.GatewayTypeCdyne',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.gatewaytype2',
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
                xtype: 'textfield',
                name: 'license_key',
                emptyText: "License Key",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.license_key ? this.license_key : ''
            },
            {
				xtype: 'label',
				text: 'Verification Details',
				cls: 'header_label_content',
				margin: '0 0 20 0'
			},
            {
                xtype: 'textfield',
                name: 'veri_to',
                emptyText: "Number",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.veri_to ? this.veri_to : ''
            },
            {
                xtype: 'textfield',
                name: 'veri_text',
                emptyText: "Message",
                width: '100%',
                allowBlank: false,
                value: this.veri_text ? this.veri_text : ''
            }

		]
		this.callParent();
	}
});
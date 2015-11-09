Ext.define('CaptivePortal.view.sms_gateway.GatewayTypeClickatell',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.gatewaytype0',
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
                name: 'api_id',
                emptyText: "API ID",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.api_id ? this.api_id : ''
            },
            {
                xtype: 'textfield',
                name: 'username',
                emptyText: "USERNAME",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.username ? this.username : ''
            },
            {
                xtype: 'textfield',
                name: 'password',
                emptyText: "PASSWORD",
                width: '100%',
                allowBlank: false,
                margin: '0 0 20 0',
                value: this.password ? this.password : ''
            }


		]
		this.callParent();
	}
});
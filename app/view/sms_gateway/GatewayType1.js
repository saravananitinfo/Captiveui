Ext.define('CaptivePortal.view.sms_gateway.GatewayType1',{
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
                xtype: 'label',
                text: 'GatewayType1'
            },
            {
                xtype: 'textfield',
                name: 'name',
                emptyText: "Account Sid",
                allowBlank: false,
            },
            {
                xtype: 'textfield',
                name: 'name',
                emptyText: "Account Tocken",
                allowBlank: false,
            }

		]
		this.callParent();
	}
});
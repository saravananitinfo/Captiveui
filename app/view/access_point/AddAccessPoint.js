Ext.define('CaptivePortal.view.access_point.AddAccessPoint',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.add_access_point_view',
	dockedItems: [
		{
            xtype: 'toolbar',
            padding: '30 30 0 30',
            dock: 'top',
            items: [
                {
                	xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Add',
                    cls: 'btn-add-module',             
                    itemId:'btn_add_access_point'
                    // handler: 'newSMSGateway'
                    // handler: 'userItemClick'
                }
            ]
        }
    ],
	initComponent: function () {
		this.items = [
			{
				xtype: 'gridpanel',
                reference: 'grd_add_access_point',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.sms_gateway.SMSGateways',
                data: [{name: "akshay"},{city: "bangalore"}],
                columns: [
                	{
            			header: 'Name',
            			dataIndex: 'name',
            			flex: 1,
            			width: 160,
            			editor: {
                			// defaults to textfield if no xtype is supplied
                			allowBlank: false
           				}
           			},
           			{
            			header: 'city',
            			dataIndex: 'city',
            			flex: 1,
            			width: 160,
            			editor: {
                			// defaults to textfield if no xtype is supplied
                			allowBlank: false
           				}
           			}
                ]

			}
		]
		this.callParent();
	}
});
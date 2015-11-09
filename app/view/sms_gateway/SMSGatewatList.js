Ext.define('CaptivePortal.view.sms_gateway.SMSGatewatList',{
	extend: 'Ext.panel.Panel',
	requires: [
		'CaptivePortal.view.sms_gateway.SMSGatewatListController'
	],
	alias: 'widget.sms_gatewaylist',
	controller: 'sms_gatewaylistcontroller',
	border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
	dockedItems: [
		{
            xtype: 'toolbar',
            padding: '30 30 0 30',
            dock: 'top',
            items: [
            	{
                    xtype: 'searchfield'
                },
                {
                	xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Add Gateway',
                    cls: 'btn-add-module',             
                    itemId:'btn_addgateway',
                    handler: 'newSMSGateway'
                    // handler: 'userItemClick'
                }
            ]
        }
    ],
    initComponent: function () {
    	this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_smsgatewaylist',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.sms_gateway.SMSGateways',
                listeners: {
                              itemclick: 'userItemClick'
                            },
                columns: [
                    {
                        header: 'Name',
                        dataIndex: 'name',
                        flex: 1,
                        cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'Type',
                        dataIndex: 'gateway_type',
                        flex: 1,
                        cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'Status',
                        dataIndex: 'status',
                        flex: 1,
                        cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
                    },
                    {
                        header: 'Action',
                        cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                        },
                        width: 100
                    }
                ]
            }]
        this.callParent(arguments)
    }
});
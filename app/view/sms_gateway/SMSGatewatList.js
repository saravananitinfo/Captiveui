Ext.define('CaptivePortal.view.sms_gateway.SMSGatewatList',{
	extend: 'Ext.panel.Panel',
	requires: [
		'CaptivePortal.view.sms_gateway.SMSGatewatListController'
	],
	alias: 'widget.sms_gatewaylist',
	controller: 'sms_gatewaylistcontroller',
	border: true,
    layout: 'fit',
    // bodyPadding: '15 30 30 30',
    bodyCls: 'page_list_grid',
    initComponent: function () {
        // Adding Docked Items..........
        var dockeditems = [
            {
                xtype: 'searchfield'
            },
            {
                xtype: 'tbfill'
            }
        ]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'sms_gateway'
            })[0].write
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Gateway',
                cls: 'btn-add-module',             
                itemId:'btn_addgateway',
                handler: 'newSMSGateway'
            });
        }
        this.dockedItems = [
            {
                xtype: 'toolbar',
                padding: '30 23 0 30',
                dock: 'top',
                items: dockeditems
            }
        ]
        // Adding SMSGateway List Items..........
        var grid_colunms = [
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
            }
        ];
        if (write) {
            grid_colunms.push({
                header: 'Action',
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                },
                width: 100
            });
        }

        this.items = [
            {
                xtype: 'gridpanel',
                reference: 'grd_smsgatewaylist',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.sms_gateway.SMSGateways',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    itemclick: 'userItemClick'
                },
                columns: grid_colunms
            }
        ]

        this.callParent(arguments)
    },
    listeners: {
        render: 'getSMSGateways'
    }
});
Ext.define('CaptivePortal.view.access_point.AccessPointList',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.access_point_list',
	requires: [
		'CaptivePortal.view.access_point.AccessPointListController'
	],
	controller: 'access_point_list_controller',
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
                	xtype: 'tbfill'
                },
                {
                    xtype: 'button',
                    text: 'Add Access Point',
                    cls: 'btn-add-module',             
                    itemId:'btn_add_access_point',
                    handler: 'addAccessPoints'
                }
            ]
        }
    ],
    initComponent: function () {
    	this.items = [
    		{
    			xtype: 'gridpanel',
                reference: 'grd_access_point_list',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.access_point.AccessPoints',
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
            			header: 'NAS Identifier',
            			dataIndex: 'uid',
            			flex: 1,
            			cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
           			},
           			{
            			header: 'Mac Id',
            			dataIndex: 'mac_id',
            			flex: 1,
            			cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function (value, metaData, rec, view) {
                            metaData.tdAttr = 'data-qtip="' + value + '" ';
                            return value;
                        }
           			},
           			{
            			header: 'Site Name',
            			dataIndex: 'site_name',
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
    		}
    	]
    	this.callParent(arguments);
    },
    listeners:{
    	render: 'getAccessPoints'
    }
});
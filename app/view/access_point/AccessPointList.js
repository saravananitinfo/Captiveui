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
    initComponent: function () {

        // Adding Docked Items..........
        var dockeditems = [
            {
                xtype: 'tbfill'
            }
        ]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'access_points'
            })[0].write
        }
        if(write){
            dockeditems.push({
                xtype: 'button',
                text: 'Add Access Point',
                cls: 'btn-add-module',             
                itemId:'btn_add_access_point',
                handler: 'addAccessPoints'
            });
            dockeditems.push({
                xtype: 'button',
                text: 'Upload Access Point',
                cls: 'btn-add-module',             
                itemId:'btn_upload_access_point',
                handler: 'uploadAccessPoints'
            });
        }

        this.dockedItems = [
            {
                xtype: 'toolbar',
                padding: '30 30 0 30',
                dock: 'top',
                items: dockeditems
            }
        ]

        // Adding GuestUser List Items..........

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
            }
        ]

        if(write){
            grid_colunms.push({
                header: 'Action',
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                },
                width: 100
            })
        }

        this.items = [
            {
                xtype: 'gridpanel',
                reference: 'grd_access_point_list',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.access_point.AccessPoints',
                listeners: {
                    itemclick: 'userItemClick'
                },
                columns: grid_colunms
            }
        ]
    	this.callParent(arguments);
    },
    listeners:{
    	render: 'getAccessPoints'
    }
});
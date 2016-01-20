Ext.define('CaptivePortal.view.guest_users.GuestUserList',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.guest_userslist',
    requires: [
        'CaptivePortal.view.guest_users.GuestUserListController'
    ],
	controller: 'guest_user_listcontroller',
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
                return el.access_for == 'guests'
            })[0].write
        }
        if(write){
            dockeditems.push({
                xtype: 'button',
                text: 'Upload Guest List',
                cls: 'btn-add-module',             
                itemId:'btn_upload_guest_user',
                handler: 'uploadGuestUser'
            });
            dockeditems.push({
                xtype: 'button',
                text: 'Add Guest User',
                cls: 'btn-add-module',             
                itemId:'btn_add_guest_user',
                handler: 'newGuestUser'
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

        // Adding GuestUser List Items..........
        var grid_colunms = [
            {
                header: 'Username',
                dataIndex: 'user_name',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            },
            {
                header: 'First Name',
                dataIndex: 'first_name',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            },
            {
                header: 'Last Name',
                dataIndex: 'last_name',
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
                dataIndex: 'enabled',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            }
        ]
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
                reference: 'grd_guest_users_list',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.guest_user.GuestUsers',
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
        render: 'getGuestUsers'
    }
});
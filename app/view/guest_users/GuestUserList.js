Ext.define('CaptivePortal.view.guest_users.GuestUserList',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.guest_userslist',
    requires: [
        'CaptivePortal.view.guest_users.GuestUserListController'
    ],
	controller: 'guest_user_listcontroller',
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
                    text: 'Upload Guest List',
                    cls: 'btn-add-module',             
                    itemId:'btn_upload_guest_user',
                    handler: 'uploadGuestUser'
                },
                {
                    xtype: 'button',
                    text: 'Add Guest User',
                    cls: 'btn-add-module',             
                    itemId:'btn_add_guest_user',
                    handler: 'newGuestUser'
                    // handler: 'userItemClick'
                }
            ]
        }
    ],
    initComponent: function () {
    	this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_guest_users_list',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.guest_user.GuestUsers',
                listeners: {
                              itemclick: 'userItemClick'
                            },
                columns: [
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
    },
    listeners: {
        render: 'getGuestUsers'
    }
});
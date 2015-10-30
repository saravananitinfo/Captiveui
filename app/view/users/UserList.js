Ext.define('CaptivePortal.view.users.UserList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.users.UserListController'],
    alias: 'widget.userlist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'userlistcontroller',
    dockedItems: [{
            xtype: 'toolbar',
            padding: '30 30 0 30',
            dock: 'top',
            items: [{
                    xtype: 'searchfield'
                }, {
                    xtype: 'tbfill'
                }, {
                    xtype: 'button',
                    text: 'Add User',
                    cls: 'btn-add-module',
                    itemId:'btn_adduser'
                }]
        }],
    listeners: {
         render: 'getUsers'
    },
    items: [{
            xtype: 'gridpanel',
            reference: 'grd_userlist',
            style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
            store: 'CaptivePortal.store.user.User',
            columnLines: true,
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'name',
                    width: '20%',
                    flex:1,
                    cls: 'table-row',
                    tdCls: 'table-cell',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Email',
                    dataIndex: 'email',
                    width: '15%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Sites',
                    dataIndex: 'sites[0].names',
                    width: '15%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Roles',
                    dataIndex: 'site_role.name',
                    width: '15%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Status',
                    dataIndex: 'status',
                    width: '15%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        if (value.toLowerCase() == 'enable')
                            value = 'Enable';
                        else
                            value = 'Disable';
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Action',
                    width: '14%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                    }
                }

            ]
        }]
});
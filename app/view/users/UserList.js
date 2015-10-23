Ext.define('CaptivePortal.view.users.UserList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.users.UserListController'],
    alias: 'widget.userlist',
    border: true,
    layout: 'fit',
    bodyPadding: 30,
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
                    text: 'Add User'
                }, {
                    xtype: 'button',
                    text: 'Export'
                }]
        }],
    listeners: {
      //  render: 'getUsers'
    },
    items: [{
            xtype: 'gridpanel',
            reference: 'grd_userlist',
            style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
            store: 'CaptivePortal.store.user.User',
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'name',
                    width: '20%',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Email',
                    dataIndex: 'email',
                    width: '20%',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Sites',
                    dataIndex: 'site_ids',
                    width: '15%',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Roles',
                    dataIndex: 'site_role_id',
                    width: '15%',
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Status',
                    dataIndex: 'status',
                    width: '15%',
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
                    renderer: function (value, metaData, rec, view) {
                        return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                    }
                }

            ]
        }]
});
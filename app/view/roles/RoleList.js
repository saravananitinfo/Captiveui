Ext.define('CaptivePortal.view.roles.RoleList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.roles.RoleController', 'CaptivePortal.store.role.Role'],
    alias: 'widget.rolelist',
    controller: 'rolelistcontroller',
    border: true,
    layout: 'fit',
    bodyPadding: 30,
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
        render: 'getRoles'
    },
    items: [{
            xtype: 'gridpanel',
            reference: 'grd_rolelist',
            columnLines: true,  
            store: 'CaptivePortal.store.role.Role',
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'name',
                    flex:1,
                    renderer: function (value, metaData, rec, view) {
                        metaData.tdAttr = 'data-qtip="' + value + '" ';
                        return value;
                    }
                },
                {
                    header: 'Action',
                    renderer: function (value, metaData, rec, view) {
                        return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                    },
                    width: 100
                }

            ]




        }]
})
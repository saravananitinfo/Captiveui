Ext.define('CaptivePortal.view.roles.RoleList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.roles.RoleController', 'CaptivePortal.store.role.Role','CaptivePortal.view.roles.MainController'],
    alias: 'widget.rolelist',
    controller: 'rolelistcontroller',
    border: false,
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
                    text: 'Add Roles',
                    cls: 'btn-add-module',             
                    itemId:'btn_addrole'
                }]
        }],
    listeners: {
        render: 'getRoles'
    },
    items: [{
            xtype: 'gridpanel',
            reference: 'grd_rolelist',
            store: 'CaptivePortal.store.role.Role',
            style: 'box-shadow: 0px 0px 10px 0px #e3e3e3;',
            columnLines: true,
            listeners: {
                              itemclick: 'userItemClick'
            },
            columns: [
                {
                    header: 'Role Template',
                    dataIndex: 'name',
                    flex:1,
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
})
Ext.define('CaptivePortal.view.roles.RoleList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.roles.RoleListController', 'CaptivePortal.store.role.Role', 'CaptivePortal.view.roles.MainController'],
    alias: 'widget.rolelist',
    controller: 'rolelistcontroller',
    border: false,
    layout: 'fit',
    bodyPadding: 30,
    listeners: {
        render: 'getRoles'
    },
    initComponent: function () {
        var dockeditems = [
            {
                xtype: 'searchfield'
            },
            {
                xtype: 'tbfill'
            }
        ]
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'site_roles'
            })[0].write
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Roles',
                cls: 'btn-add-module',
                itemId: 'btn_addrole'
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

        var griditems = [
            {
                header: 'Role Template',
                dataIndex: 'name',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            }
        ];
        if(write){
            griditems.push({
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
                reference: 'grd_rolelist',
                store: 'CaptivePortal.store.role.Role',
                style: 'box-shadow: 0px 0px 10px 0px #e3e3e3;',
                columnLines: true,
                listeners: {
                    itemclick: 'userItemClick'
                },
                columns: griditems
            }
        ]

        this.callParent();
    }
})
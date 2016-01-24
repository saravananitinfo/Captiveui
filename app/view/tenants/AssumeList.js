Ext.define('CaptivePortal.view.tenants.AssumeList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.tenants.AssumeListController'],
    alias: 'widget.assumelist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 55 30',
    controller: 'assumelistcontroller',
    initComponent: function () {
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'tenants'
            })[0].write
        }
        

        var grid_colunms = [
            {
                header: 'User Name',
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
                header: 'Email',
                dataIndex: 'email',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            },{
                header: 'Role Name',
                dataIndex: 'role_name',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            }, {
                header: 'Action',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="Assume User" ';
                    return "<div action=assume class=assume_user>Login</div>";
                }
            }
        ];

        this.items = [
            {
                xtype: 'gridpanel',
                reference: 'grd_assumelist',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.tenant.Assume',
                listeners: {
                    itemclick: 'assumeItemClick'
                },
                columns: grid_colunms
            },
            {
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                margin:'10 0 0 0',
                height: 50,
                items: [
                    {
                        xtype: 'button',
                        margin: '0 0 0 0',
                        text: 'Cancel',
                        handler: 'cancelAssumeList',
                        cls: 'btn btn-cancel'
                    }
                ]
            }
        ]
        this.callParent(arguments)
    }
});

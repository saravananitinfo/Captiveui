Ext.define('CaptivePortal.view.tenants.TenantList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.tenants.TenantListController', 'CaptivePortal.store.tenant.Tenant'],
    alias: 'widget.tenantlist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'tenantlistcontroller',
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
                    text: 'Add Tenant',
                    cls: 'btn-add-module',             
                    itemId:'btn_addtenant'
                }]
        }],
    listeners: {
        render: 'getTenantList'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_tenantlist',
                //style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                style: 'border: 1px solid #e2e2e2',
                store: 'CaptivePortal.store.tenant.Tenant',
                listeners: {
                              itemclick: 'userItemClick'
                            },
                columns: [
                    {
                        header: 'Tenant Name',
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
    }
});

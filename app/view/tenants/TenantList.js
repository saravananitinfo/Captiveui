Ext.define('CaptivePortal.view.tenants.TenantList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.tenants.TenantListController', 'CaptivePortal.store.tenant.Tenant'],
    alias: 'widget.tenantlist',
    border: true,
    layout: 'fit',
    bodyPadding: 30,
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
                    itemId:'btn_addtenant'
                }, {
                    xtype: 'button',
                    text: 'Export'
                }]
        }],
    listeners: {
        render: 'getTenantList'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_tenantlist',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.tenant.Tenant',
                columns: [
                    {
                        header: 'Tenant Name',
                        dataIndex: 'name',
                        flex: 1,
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
        this.callParent(arguments)
    }
});
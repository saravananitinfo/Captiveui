Ext.define('CaptivePortal.view.accesstimepolicy.PolicyList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.accesstimepolicy.PolicyListController'],
    alias: 'widget.policylist',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'policylistcontroller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'tbfill'
            }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {            
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'time_policy';
            })[0].write;
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Access Time Policy',
                cls: 'btn-add-module',
                itemId: 'btn_addtimepolicy'
            })
        }
        this.dockedItems = [{
                xtype: 'toolbar',
                padding: '30 30 0 30',
                dock: 'top',
                items: dockeditems
            }]

        var grid_colunms = [
            {
                header: 'Name',
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
                header: 'Site Name',
                dataIndex: 'site_info',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value ? value.name : ''  + '" ';
                    return value ? value.name : '';
                }
            }
        ];
        if (write) {
            grid_colunms.push({
                header: 'Action',
                flex:1,
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                }
            })
        }
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_policylist',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.accesstimepolicy.TimePolicy',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    itemclick: 'accessTimeItemClick'
                },
                columns: grid_colunms
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getPolicyList'
    }
});

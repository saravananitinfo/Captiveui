Ext.define('CaptivePortal.view.radius_vsa.RadiusVSAList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.radius_vsa.RadiusVSAListController'],
    alias: 'widget.radius_vsa_list',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'radius_vsa_list_controller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'tbfill'
            }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {            
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'radius_configuration';
            })[0].write;
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Radius VSA',
                cls: 'btn-add-module',
                handler:'addNewVSA'
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
                header: 'Value',
                dataIndex: 'value',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                   metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            },
            {
                header: 'Format',
                dataIndex: 'format',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                   metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            }
        ];
        if (write) {
            grid_colunms.push({
                header: 'Action',
                flex:1,
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon" title="Edit"></div>&nbsp;&nbsp;<div action="delete" class="del-icon" title="Delete"></div>';
                }
            })
        }
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_radius_vsa_list',
                store: 'CaptivePortal.store.radius_vsa.RadiusVSA',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },               
                columns: grid_colunms,
                listeners :{
                   itemclick:'radiusVSAItemClick'
                }
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getRadiusVSAList'
    }
});

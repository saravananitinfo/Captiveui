Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.template_mgmt.TemplateMgmtListController'],
    alias: 'widget.template_mgmt_list',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'template_mgmt_list_controller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'tbfill'
            }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {            
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'templates';
            })[0].write;
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Template',
                cls: 'btn-add-module',
                itemId: 'btn_addtemplate',
                handler:'addSplashTemplate'
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
                dataIndex: 'associated_resource',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value ? value.name : ''  + '" ';
                    return value ? value.name : '';
                }
            },
            /*{
                header: 'Category',
                dataIndex: 'category',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                   metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            }*/
        ];
        if (write) {
            grid_colunms.push({
                header: 'Action',
                flex:1,
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon" title="Edit"></div>&nbsp;&nbsp;<div action="delete" class="del-icon" title="Delete"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div action="duplicate" class="duplicate-icon" title="Duplicate"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div action="preview" class="preview-icon" title="Preview"></div>';
                }
            })
        }
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_template_mgmt_list',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.template_mgmt.TemplateMgmt',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },               
                columns: grid_colunms,
                listeners :{
                    itemclick:'templateMgmtItemClick'
                }
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getTemplateMgmtList',
        // afterrender: 'afterRender'
    }
});

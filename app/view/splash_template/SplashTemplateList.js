Ext.define('CaptivePortal.view.splash_template.SplashTemplateList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.splash_template.SplashTemplateListController'],
    alias: 'widget.splash_template_list',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'splash_template_list_controller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'tbfill'
            }]
        var write = true;
        // if (CaptivePortal.app.getAccessPermissionList() != undefined) {            
        //     write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
        //         return el.access_for == 'templates';
        //     })[0].write;
        // }
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
            // {
            //     header: 'Category',
            //     dataIndex: 'category',
            //     flex: 1,
            //     cls: 'table-row',
            //     tdCls: 'table-cell',
            //     renderer: function (value, metaData, rec, view) {
            //        metaData.tdAttr = 'data-qtip="' + value + '" ';
            //         return value;
            //     }
            // },
            {
                header: 'Site/Tag',
                dataIndex: 'site_info',
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
                dataIndex: 'admin_tempalte',
                flex:1,
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    if(value){
                        return '<div action="duplicate" class="duplicate-icon" title="Duplicate"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div action="preview" class="preview-icon" title="Preview"></div>';
                    }else{
                        return '<div action="edit" class="edit-icon" title="Edit"></div>&nbsp;&nbsp;<div action="delete" class="del-icon" title="Delete"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div action="duplicate" class="duplicate-icon" title="Duplicate"></div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div action="preview" class="preview-icon" title="Preview"></div>';
                    }
                }
            })
        }
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_splash_template_list',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.splash_template.SplashTemplates',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },               
                columns: grid_colunms,
                listeners :{
                    itemclick:'splashTemplateItemClick'
                }
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getSplashTemplateList'
    }
});

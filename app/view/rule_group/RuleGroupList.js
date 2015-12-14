Ext.define('CaptivePortal.view.rule_group.RuleGroupList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.rule_group.RuleGroupListController'],
    alias: 'widget.rule_group_list',
    border: true,
    layout: 'fit',
    bodyPadding: '15 30 15 30',
    controller: 'rule_group_list_controller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'searchfield'
            },{
                xtype: 'tbfill'
            }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {            
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'rule_group';
            })[0].write;
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add New Splash Rule',
                cls: 'btn-add-module',
                handler:'addNewRule'
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
                header: 'Rule Name',
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
                header: 'Site',
                dataIndex: 'associated_resource',
                flex: 1,
                cls: 'table-row',
                tdCls: 'table-cell',
                renderer: function (value, metaData, rec, view) {
                    var siteName = '';
                    if(value && value.name){
                        siteName = value.name;
                    }
                    metaData.tdAttr = 'data-qtip="' + siteName + '" ';
                    return siteName;
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
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.rule_group.RuleGroup',
                reference: 'grd_rule_group_list',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },               
                columns: grid_colunms,
                listeners :{
                   itemclick:'ruleGroupItemClick'
                }
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getRuleGroupList'
    }
});

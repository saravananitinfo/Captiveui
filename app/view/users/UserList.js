Ext.define('CaptivePortal.view.users.UserList', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.users.UserListController'],
    alias: 'widget.userlist',
    border: true,
    layout: 'fit',
    // bodyPadding: '15 30 30 30',
    bodyCls: 'page_list_grid',
    controller: 'userlistcontroller',
    initComponent: function () {
        var dockeditems = [{
                xtype: 'searchfield'
            }, {
                xtype: 'tbfill'
            }]
        var write = false;
        if (CaptivePortal.app.getAccessPermissionList() != undefined) {
            console.log(CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'users'
            }));
            write = CaptivePortal.app.getAccessPermissionList().filter(function (el) {
                return el.access_for == 'users'
            })[0].write
        }
        if (write) {
            dockeditems.push({
                xtype: 'button',
                text: 'Add Admin',
                cls: 'btn-add-module',
                itemId: 'btn_adduser'
            })
        }
        this.dockedItems = [{
                xtype: 'toolbar',
                padding: '30 23 0 30',
                dock: 'top',
                items: dockeditems
            }]

        var grid_colunms = [
            {
                header: 'Name',
                dataIndex: 'name',
                width: '20%',
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
                dataIndex: 'user',
                width: '15%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value.email + '" ';
                    return value.email;
                }
            },
            {
                header: 'Sites',
                dataIndex: 'sites',
                width: '15%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    var asso_reso = rec.get('associated_resources'), siteNames = [];
                    if(asso_reso){
                        if(asso_reso.sites && asso_reso.sites.length){
                            Ext.Array.each(asso_reso.sites, function(r){
                                siteNames.push(r.name);
                            }.bind(this));
                        }
                        if(asso_reso.tags && asso_reso.tags.length){
                            Ext.Array.each(asso_reso.tags, function(r){
                                siteNames.push(r.name);
                            }.bind(this));
                        }
                    }
                    metaData.tdAttr = 'data-qtip="' + siteNames.join() + '" ';
                    return siteNames.join();
                }
            },
            {
                header: 'Roles',
                dataIndex: 'site_role',
                width: '15%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value.name + '" ';
                    return value.name;
                }
            },
            {
                header: 'Status',
                dataIndex: 'status',
                width: '8%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    if (value.toLowerCase() == 'enable')
                        value = 'Enable';
                    else
                        value = 'Disable';
                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                    return value;
                }
            },
            {
                header: 'Tenant',
                dataIndex: 'tenant',
                width: '12%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    metaData.tdAttr = 'data-qtip="' + value.name + '" ';
                    return value.name;
                }
            }
        ]
        if (write) {
            grid_colunms.push({
                header: 'Action',
                width: '8%',
                cls: 'table-row',
                renderer: function (value, metaData, rec, view) {
                    return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
                }
            })
        }
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_userlist',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.user.User',
                columnLines: true,
                viewConfig: {
                    loadMask: false
                },
                listeners: {
                    itemclick: 'userItemClick'
                },
                columns: grid_colunms
            }]
        this.callParent(arguments);
    },
    listeners: {
        render: 'getUsers'
    }
});

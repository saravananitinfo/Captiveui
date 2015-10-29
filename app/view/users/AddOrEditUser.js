Ext.define('CaptivePortal.view.users.AddOrEditUser', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.users.UserController',
        'CaptivePortal.store.users.TenantList'
    ],
    alias: 'widget.users_addedit',
    controller: 'users',
    padding: 0,
    height: 100,
    scrollable: true,
    width: '100%',
    //bodyCls: 'custom_bg_background',
    layout: {
        type: 'vbox',
        padding: '10 0 0 30'
    },
    //autoScroll:true,
    initComponent: function () {
        var permissionStore = Ext.create('Ext.data.Store', {
            model: 'CaptivePortal.model.role.RoleAccess',
            data: this.permissions || []
        });
        var userText = (this.user_id) ? 'Edit User' : 'New User';
        var btnText = (this.user_id) ? 'Update' : 'Create';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                items: [{
                        xtype: 'form',
                        itemId: 'userform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: 20,
                            maxLength: 50
                        },
                        items: [{
                                xtype: 'hiddenfield', name: 'user_id',
                                value: this.user_id
                            }, {
                                xtype: 'label',
                                text: 'Name',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'user_name',
                                allowBlank: false,
                                //readOnly:(this.user_id) ? true:false
                            }, {
                                xtype: 'label',
                                text: 'Email',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                name: 'email',
                                itemId: 'email',
                                vtype: 'email',
                                readOnly: (this.user_id) ? true : false
                            }, {
                                xtype: 'label',
                                text: 'Tenant',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combobox',
                                allowBlank: false,
                                name: 'tenant_id',
                                queryMode: 'local',
                                itemId: 'tenant',
                                valueField: 'id',
                                displayField: 'name',
                                store: 'CaptivePortal.store.users.TenantList',
                                listeners: {
                                    'select': 'selectTenant'
                                }
                            }, {
                                xtype: 'label',
                                text: 'Sites',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'tagfield',
                                queryMode: 'local',
                                allowBlank: false,
                                multiSelect: true,
                                name: 'site_ids',
                                itemId: 'site',
                                valueField: 'id',
                                displayField: 'name',
                                store: 'CaptivePortal.store.users.Site',
                                filterPickList: true
                            }, {
                                xtype: 'label',
                                text: 'Role',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combobox',
                                name: 'site_role_id',
                                itemId: 'role',
                                queryMode: 'local',
                                allowBlank: false,
                                valueField: 'id',
                                displayField: 'name',
                                store: 'CaptivePortal.store.users.Role',
                                listeners: {
                                    'select': 'selectRole'
                                }
                            }, {
                                xtype: 'label',
                                text: 'Access Status',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                defaultType: 'radiofield',
                                height: 80,
                                defaults: {
                                    width: 100
                                },
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: 'Enable',
                                        name: 'status',
                                        inputValue: 'enable',
                                        id: 'user_enable',
                                        checked: true
                                    }, {
                                        boxLabel: 'Disable',
                                        name: 'status',
                                        inputValue: 'disable',
                                        id: 'user_disable'
                                    }
                                ]
                            }, {
                                xtype: 'label',
                                text: 'Permitted User Roles',
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                width: '100%',
                                height: '100%',
                                height:400,
                                        layout: 'fit',
                                margin: '0 20 0 20',
                                items: [{
                                        xtype: 'grid',
                                        itemId: 'permission_user_role_grid',
                                        border: 1,
                                        style: 'z-index:1000;',
                                        autoScroll: true,
                                        columns: [
                                            {
                                                header: 'Access',
                                                dataIndex: 'access_for',
                                                width: '79.9%',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Permission',
                                                dataIndex: 'permission',
                                                width: '20%',
                                                renderer: function (value, metaData, rec, view) {
                                                    if (value) {
                                                        value = '<input type="checkbox" checked action="permission"/>';
                                                    } else {
                                                        value = '<input type="checkbox" action="permission"/>';
                                                    }
                                                    return value;
                                                }
                                            }
                                        ],
                                        listeners: {
                                            itemclick: 'permissionRowClick'
                                        },
                                        store: 'CaptivePortal.store.users.RoleAccess',
                                    }]
                            },
                            {
                                xtype: 'container',
                                margin: 20,
                                layout: 'hbox',
                                width: '100%',
                                height: 50,
                                items: [
                                    {
                                        xtype: 'button',
                                        formBind: true,
                                        text: btnText,
                                        handler: 'saveUser'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancelUser'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }];
        this.callParent();
    }

});

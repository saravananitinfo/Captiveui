Ext.define('CaptivePortal.view.users.AddOrEditUser', {
    extend: 'Ext.panel.Panel',
    itemId: 'pan_useraddedit',
    requires: [
        'CaptivePortal.view.users.AddOrEditController',
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
        padding: '10 0 0 30',
    },
    config: {
        user_id: null
    },
    listeners: {
        activate: 'onTenantComboRender',
    },
    initComponent: function () {
        var emptySiteStore = Ext.create('Ext.data.Store',{
            fields:['id', 'name'],
            data:[]
        });
        var userText = (this.user_id) ? 'Edit User' : 'New User';
        var btnText = (this.user_id) ? 'Update' : 'Create';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'userform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: '10 0 15 0',
                            maxLength: 50,
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'user_id',
                                reference: 'hf_userid'
                            }, {
                                xtype: 'label',
                                text: 'Name',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                name: 'name',
                                itemId: 'user_name',
                                allowBlank: false,
                                emptyText: 'Name',
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
                                emptyText: 'Email',
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
                                reference: 'cmb_tenant',
                                emptyText: 'Select Tenant',
                                store: 'CaptivePortal.store.users.TenantList',
                                listeners: {
                                    select: 'selectTenant'
                                }
                            }, {
                                xtype: 'label',
                                text: 'Sites / Tags',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'tagfield',
                                queryMode: 'local',
                                reference: 'tf_site',
                                allowBlank: true,
                                //editable:false,
                                multiSelect: true,
                                name: 'associated_resources',
                                itemId: 'site',
                                valueField: 'id',
                                displayField: 'name',
                                emptyText: 'Select Sites / Tags',
                                store: emptySiteStore,
                                filterPickList: true
                            }, {
                                xtype: 'label',
                                text: 'Role',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combobox',
                                name: 'site_role_id',
                                itemId: 'role',
                                reference: 'cmb_siterole',
                                queryMode: 'local',
                                allowBlank: false,
                                valueField: 'id',
                                displayField: 'name',
                                emptyText: 'Select Role',
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
                                defaults: {
                                    width: 100
                                },
                                margin: '0 0 20 0',
                                layout: 'hbox',
                                items: [
                                    {
                                        boxLabel: 'Enable',
                                        name: 'status',
                                        inputValue: 'enable',
                                        itemId: 'user_enable',
                                        checked: true
                                    }, {
                                        boxLabel: 'Disable',
                                        name: 'status',
                                        inputValue: 'disable',
                                        itemId: 'user_disable'
                                    }
                                ]
                            }, {
                                xtype: 'label',
                                reference: 'lab_permittedroles',
                                text: 'Permitted User Roles',
                                hidden: true,
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                reference: 'con_permittedroles',
                                width: '100%',
                                hidden: true,
                                //height: '100%',
                                height: 400,
                                layout: 'fit',
                                items: [{
                                        xtype: 'grid',
                                        itemId: 'permission_user_role_grid',
                                        reference: 'grd_permittedusers',
                                        border: 1,
                                        style: 'z-index:1000;',
                                        autoScroll: true,
                                        margin: '0 30 0 0',
                                        width: '50%',
                                        columns: [
                                            {
                                                header: 'Access',
                                                dataIndex: 'name',
                                                width: '79.9%',
                                                cls: 'table-row',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Permission',
                                                dataIndex: 'permission',
                                                width: '20%',
                                                cls: 'table-row',
                                                renderer: function (value, metaData, rec, view) {
                                                    if (value === 1) {
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
                                        store: 'CaptivePortal.store.users.AccessPermission',
                                    }]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                width: '100%',
                                height: 50,
                                items: [
                                    {
                                        xtype: 'button',
                                        reference: 'btn_save',
                                        itemId: 'btn_newusersave',
                                        formBind: true,
                                        text: btnText,
                                        handler: 'saveUser',
                                        cls: 'btn'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        cls: 'btn btn-cancel',
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

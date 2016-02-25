Ext.define('CaptivePortal.view.user.ListUser', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.user.UserController',
        'CaptivePortal.store.user.User'
    ],
    xtype: 'widget.role.ListUser',
    controller: 'users',
    padding: 0,
    height: '100%',
    width: '100%',
    bodyCls: 'custom_bg_background',
    layout: 'vbox',
    initComponent: function () {
        var store = Ext.create('CaptivePortal.store.user.User', {
            //data:[{ name:'Ankur', email:'ankur@wavespot.com', tenant : 'tenant1', site : 'site1', role : 'role1'}]				
            data: []
        });
        this.items = [{
                xtype: 'container',
                autoEl: {
                    tag: 'div'
                },
                cls: 'heading_color',
                height: 5,
                width: 40
            }, {
                xtype: 'label',
                text: 'Users',
                cls: 'header_label header_label_content'
            }, {
                xtype: 'panel',
                autoScroll: true,
                topPanel: true,
                cls: 'custom_toolbar',
                width: '100%',
                items: [{
                        xtype: 'form',
                        items: [{
                                xtype: 'label',
                                text: 'Users',
                                allowBlank: false,
                                //padding:'20 0 0 0',
                                margin: '0 0 0 20',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'container',
                                width: '100%',
                                height: '100%',
                                margin: '0 20 0 20',
                                layout: 'fit',
                                items: [{
                                        xtype: 'grid',
                                        itemId: 'users_grid',
                                        border: 1,
                                        style: 'z-index:1000;',
                                        autoScroll: true,
                                        //height:100,
                                        columns: [
                                            {
                                                header: 'Name',
                                                dataIndex: 'name',
                                                width: '20%',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Email',
                                                dataIndex: 'email',
                                                width: '20%',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Sites',
                                                dataIndex: 'site_ids',
                                                width: '15%',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Roles',
                                                dataIndex: 'site_role_id',
                                                width: '15%',
                                                renderer: function (value, metaData, rec, view) {
                                                    metaData.tdAttr = 'data-qtip="' + value + '" ';
                                                    return value;
                                                }
                                            },
                                            {
                                                header: 'Status',
                                                dataIndex: 'status',
                                                width: '15%',
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
                                                header: 'Action',
                                                width: '14%',
                                                renderer: function (value, metaData, rec, view) {
                                                    return '<div action="edit" class="edit-icon"></div><div action="delete" class="del-icon"></div>';
                                                }
                                            }

                                        ],
                                        tbar: [{
                                                xtype: 'splitbutton',
                                                text: 'Filter',
                                                cls: 'logout_button',
                                                menu: new Ext.menu.Menu({
                                                    items: [
                                                        {
                                                            text: 'Email'
                                                        }

                                                    ]
                                                })
                                            }, {
                                                xtype: 'textfield',
                                                name: 'search'
                                            }, '->',
                                            {
                                                xtype: 'button',
                                                text: 'Export',
                                                cls: 'logout_button',
                                                handler: 'exportUsers'
                                            },
                                            {
                                                xtype: 'button',
                                                text: 'Add Users',
                                                cls: 'logout_button',
                                                handler: 'createUsers'
                                            }
                                        ],
                                        store: store,
                                        listeners: {
                                            itemclick: 'userItemClick'
                                        }
                                    }]
                            }]
                    }]
            }];
        this.callParent();
    },
    listeners: {
        'render': 'getUsers'
    }

});

Ext.define('CaptivePortal.view.sites.AddOrEditSite', {
    extend: 'Ext.panel.Panel',
    itemId: 'pan_siteaddedit',
    requires: [
        'CaptivePortal.view.sites.SiteController'
    ],
    xtype: 'sites_addedit',
    alias: 'widget.sites_addedit',
    controller: 'sitecontroller',
    listeners: {
        activate: 'onEditActivate'
    },
    initComponent: function () {
        var btnText = this.site_name ? 'Update' : 'Create';
        var title = this.site_name ? 'Edit Site' : 'New Site';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                scrollable: true,
                bodyPadding: 30,
                items: [{
                        xtype: 'form',
                        itemId: 'site_form',
                        layout: {
                            type: 'vbox'
                        },
                        items: [{
                                xtype: 'label',
                                text: 'Site Name',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                allowBlank: false,
                                maxLength: 50,
                                width: 500,
                                name: 'name',
                                itemId: 'name',
                                value: this.site_name ? this.site_name : ''
                            }, {
                                xtype: 'hiddenfield',
                                name: 'site_id',
                                itemId: 'site_id',
                                value: this.site_id
                            }, {
                                xtype: 'label',
                                text: 'Tenant',
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combo',
                                allowBlank: false,
                                reference: 'cmb_tenant',
                                valueField: 'id',
                                margin: '20 0 0 0',
                                displayField: 'name',
                                queryMode: 'local',
                                width: 500,
                                emptyText: 'Tenant',
                                name: 'tenant_id',
                                itemId: 'tenant_id'

                            }, {
                                xtype: 'label',
                                text: 'Users',
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'tagfield',
                                reference: 'tf_users',
                                queryMode: 'local',
                                margin: '20 0 0 0',
                                width: 500,
                                multiSelect: true,
                                name: 'user_profile_ids',
                                itemId: 'user_profile_ids',
                                valueField: 'id',
                                displayField: 'name',
                                filterPickList: true
                            }, {
                                xtype: 'label',
                                text: 'Time Zone',
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combo',
                                allowBlank: false,
                                reference: 'cmb_timezone',
                                margin: '20 0 0 0',
                                valueField: 'name',
                                displayField: 'name',
                                queryMode: 'local',
                                width: 500,
                                emptyText: 'Tenant',
                                name: 'timezone',
                                itemId: 'timezone'
                            }, {
                                xtype: 'label',
                                text: 'Tags',
                                margin: '20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'tagfield',
                                queryMode: 'local',
                                reference: 'tf_tag',
                                margin: '20 0 0 0',
                                width: 500,
                                multiSelect: true,
                                name: 'tags',
                                itemId: 'tags',
                                valueField: 'name',
                                displayField: 'name',
                                filterPickList: true
                            },
                            {
                                xtype: 'panel',
                                title: 'Contact Details',
                                collapsible: true,
                                margin: '20 0 0 0',
                                width: '100%',
                                layout: 'vbox',
                                items: [{
                                        xtype: 'container',
                                        width: '100%',
                                        layout: {
                                            type: 'hbox'
                                        },
                                        items: [{
                                                xtype: 'label',
                                                width: 250,
                                                padding: '20 0 0 0',
                                                text: 'Contact Email',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'label',
                                                padding: '20 0 0 20',
                                                text: 'Contact Phone',
                                                width: 250,
                                                cls: 'header_label_content'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                width: 250,
                                                name: 'email',
                                                itemId: 'email',
                                                padding: '20 0 0 0',
                                                vtype: 'email'
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                padding: '20 0 0 20',
                                                width: 250,
                                                name: 'phone',
                                                itemId: 'phone'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'label',
                                                width: 250,
                                                text: 'Address',
                                                padding: '20 0 0 0',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'label',
                                                text: 'Street Name',
                                                width: 250,
                                                padding: '20 0 0 20',
                                                cls: 'header_label_content'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                width: 250,
                                                name: 'address',
                                                padding: '20 0 0 0',
                                                itemId: 'address'
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                padding: '20 0 0 20',
                                                width: 250,
                                                name: 'street',
                                                itemId: 'street'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'label',
                                                width: 250,
                                                text: 'City',
                                                padding: '20 0 0 0',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'label',
                                                text: 'State',
                                                padding: '20 0 0 20',
                                                width: 250,
                                                cls: 'header_label_content'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                width: 250,
                                                padding: '20 0 0 0',
                                                name: 'city',
                                                itemId: 'city'
                                            }, {
                                                xtype: 'combo',
                                                allowBlank: false,
                                                reference: 'cmb_state',
                                                padding: '20 0 0 20',
                                                valueField: 'name',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                width: 250,
                                                emptyText: 'State',
                                                name: 'state',
                                                itemId: 'state'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'label',
                                                width: 250,
                                                padding: '20 0 0 0',
                                                text: 'Country',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'label',
                                                padding: '20 0 0 20',
                                                text: 'Zip Code',
                                                width: 250,
                                                cls: 'header_label_content'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{xtype: 'combo',
                                                allowBlank: false,
                                                padding: '20 0 0 0',
                                                valueField: 'name',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                width: 250,
                                                emptyText: 'country',
                                                name: 'country',
                                                itemId: 'country',
                                                reference: 'cmb_country',
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                padding: '20 0 0 20',
                                                maxLength: 50,
                                                width: 250,
                                                name: 'zipcode',
                                                itemId: 'zipcode'
                                            }
                                        ]
                                    },
                                ]
                            },
                            {
                                xtype: 'panel',
                                title: 'Location Details',
                                collapsible: true,
                                layout: 'vbox',
                                padding: '20 0 0 0',
                                width: '100%',
                                items: [{
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'label',
                                                width: 250,
                                                padding: '20 0 0 0',
                                                text: 'Latitude',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'label',
                                                text: 'Longitude',
                                                padding: '20 0 0 20',
                                                width: 250,
                                                cls: 'header_label_content'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                padding: '20 0 0 0',
                                                width: 250,
                                                name: 'latitude',
                                                itemId: 'latitude'
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: false,
                                                maxLength: 50,
                                                padding: '20 0 0 20',
                                                width: 250,
                                                name: 'longitude',
                                                itemId: 'longitude'
                                            }
                                        ]
                                    }],
                            }, {
                                xtype: 'container',
                                margin: '20 0 0 0',
                                layout: 'hbox',
                                width: '100%',
                                height: 30,
                                items: [
                                    {
                                        xtype: 'button',
                                        formBind: true,
                                        text: btnText,
                                        handler: 'saveSite'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 10',
                                        text: 'Cancel',
                                        handler: 'cancelSite'
                                    }
                                ]
                            }]
                    }


                ]
            }];
        this.callParent();
    }

});

Ext.define('CaptivePortal.view.sites.AddOrEditSite', {
    extend: 'Ext.panel.Panel',
    itemId: 'pan_siteaddedit',
    requires: [
        'CaptivePortal.view.sites.AddOrEditSiteController'
    ],
    xtype: 'sites_addedit',
    alias: 'widget.sites_addedit',
    controller: 'sitecontroller',
    initComponent: function () {
        var btnText = this.site_name ? 'Update' : 'Create';
        var title = this.site_name ? 'Edit Site' : 'New Site';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                scrollable: true,
                bodyCls: 'form_panel',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'site_form',
                        layout: {
                            type: 'vbox',
                            padding: '10 30 0 30'
                        },
                        items: [{
                                xtype: 'label',
                                text: 'Site Name',
                                padding: '0 0 10 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                allowBlank: false,
                                maxLength: 50,
                                width: 500,
                                name: 'name',
                                itemId: 'name',
                                emptyText: 'Site Name',
                                value: this.site_name ? this.site_name : ''
                            }, {
                                xtype: 'hiddenfield',
                                name: 'site_id',
                                itemId: 'site_id',
                                value: this.site_id
                            }, {
                                xtype: 'label',
                                text: 'Tenant',
                                padding: '15 0 10 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combo',
                                allowBlank: false,
                                //editable:false,
                                reference: 'cmb_tenant',
                                valueField: 'id',
                                displayField: 'name',
                                forceSelection:true,
                                queryMode: 'local',
                                width: 500,
                                emptyText: 'Tenant',
                                name: 'tenant_id',
                                itemId: 'tenant_id',
                                listeners:{
                                    change:'changeTenant'
                                }

                            }, {
                                xtype: 'label',
                                text: 'Users',
                                padding: '15 0 10 0',
                                hidden:true,
                                cls: 'header_label_content'
                            }, {
                                xtype: 'tagfield',
                                reference: 'tf_users',
                                queryMode: 'local',
                                width: 500,
                                multiSelect: true,
                                forceSelection:true,
                                name: 'user_profile_ids',
                                itemId: 'user_profile_ids',
                                emptyText: 'Select Users',
                                valueField: 'id',
                                displayField: 'name',
                                hidden:true,
                                filterPickList: true
                            }, {
                                xtype: 'label',
                                text: 'Time Zone',
                                padding: '15 0 10 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combo',
                                allowBlank: false,
                                forceSelection:true,
                                reference: 'cmb_timezone',
                                valueField: 'id',
                                displayField: 'name',
                                queryMode: 'local',
                                width: 500,
                                emptyText: 'Timezone',
                                name: 'timezone',
                                itemId: 'timezone'
                            }, {
                                xtype: 'label',
                                text: 'Tags',
                                padding: '15 0 10 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'combo',
                                queryMode: 'local',
                                reference: 'tf_tag',
                                width: 500,
                                name: 'tags',
                                itemId: 'tags',
                                emptyText: 'Select Tags',
                                valueField: 'id',
                                displayField: 'name',
                                store: CaptivePortal.util.Utility.getEmptySiteStore(),
                                listConfig:{
                                    getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                }
                            },
                            {
                                xtype: 'panel',
                                title: 'Contact Details',
                                collapsible: true,
                                collapsed: true,
                                margin: '20 0 20 0',
                                width: '95%',
                                layout: 'vbox',
                                items: [{
                                        xtype: 'container',
                                        width: '95%',
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
                                                maxLength: 50,
                                                width: 250,
                                                name: 'email',
                                                emptyText: 'Contact Email',
                                                itemId: 'email',
                                                padding: '20 0 0 0',
                                                vtype: 'email'
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: true,
                                                maxLength: 50,
                                                emptyText: 'Contact Phone Number',
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
                                                allowBlank: true,
                                                maxLength: 50,
                                                width: 250,
                                                emptyText: 'Address',
                                                name: 'address',
                                                padding: '20 0 0 0',
                                                itemId: 'address'
                                            }, {
                                                xtype: 'textfield',
                                                emptyText: 'Street Name',
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
                                                allowBlank: true,
                                                maxLength: 50,
                                                width: 250,
                                                emptyText: 'City',
                                                padding: '20 0 0 0',
                                                name: 'city',
                                                itemId: 'city'
                                            }, {
                                                xtype: 'combo',
                                                allowBlank: true,
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
                                                allowBlank: true,
                                                padding: '20 0 0 0',
                                                valueField: 'name',
                                                displayField: 'name',
                                                queryMode: 'local',
                                                width: 250,
                                                emptyText: 'Country',
                                                name: 'country',
                                                itemId: 'country',
                                                reference: 'cmb_country',
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: true,
                                                padding: '20 0 0 20',
                                                maxLength: 50,
                                                width: 250,
                                                emptyText: 'Postal Code',
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
                                collapsed: true,
                                layout: 'vbox',
                                // padding: '20 0 0 0',
                                width: '95%',
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
                                                allowBlank: true,
                                                maxLength: 50,
                                                padding: '20 0 0 0',
                                                width: 250,
                                                emptyText: 'Latitude',
                                                name: 'latitude',
                                                itemId: 'latitude'
                                            }, {
                                                xtype: 'textfield',
                                                allowBlank: true,
                                                maxLength: 50,
                                                padding: '20 0 0 20',
                                                width: 250,
                                                emptyText: 'Longitude',
                                                name: 'longitude',
                                                itemId: 'longitude'
                                            }
                                        ]
                                    }],
                            }, {
                                xtype: 'container',
                                margin: '20 0 0 0',
                                layout: 'hbox',
                                width: '95%',
                                height: 30,
                                items: [
                                    {
                                        xtype: 'button',
                                        reference: 'btn_save',
                                        formBind: true,
                                        text: btnText,
                                        handler: 'saveSite',
                                        cls: 'btn'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 10',
                                        text: 'Cancel',
                                        handler: 'cancelSite',
                                        cls: 'btn btn-cancel'
                                    }
                                ]
                            }]
                    }


                ]
            }];
        this.callParent();
    }

});

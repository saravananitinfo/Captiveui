Ext.define('CaptivePortal.view.tenants.AddOrEditTenant', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.tenants.TenantController',
        'CaptivePortal.store.users.TenantList'
    ],
    alias: 'widget.tenants_addedit',
    controller: 'tenants',
    padding: 0,
    height: 100,
    scrollable: true,
    width: '100%',
    layout: {
        type: 'vbox',
        padding: '10 0 0 30'
    },
    initComponent: function () {
        var userText = (this.user_id) ? 'Edit Tenant' : 'New Tenant';
        var btnText = (this.user_id) ? 'Update' : 'Create';
        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'tenantform',
                        defaults: {
                            width: 400,
                            height: 30,
                            padding: '10 0 15 0',
                            maxLength: 50
                        },
                        items: [{
                                xtype: 'hiddenfield',
                                name: 'tenant_id',
                                itemId: 'tenant_id',
                                value: this.tenant_id ? this.tenant_id : '',
                                reference: 'hf_tenantid'
                            }, {
                                xtype: 'label',
                                text: 'Tenant Name',
                                //padding:'20 0 0 0',
                                cls: 'header_label_content'
                            }, {
                                xtype: 'textfield',
                                allowBlank: false,
                                maxLength: 50,
                                width: 300,
                                name: 'tenant_name',
                                itemId: 'tenant_name',
                                value: this.tenant_name ? this.tenant_name : ''
                            }, {
                                xtype: 'container',
                                layout: 'hbox',
                                width: '100%',
                                height: 50,
                                items: [
                                    {
                                        xtype: 'button',
                                        reference: 'btn_save',
                                        formBind: true,
                                        itemId: "btn_saveTenant",
                                        text: btnText,
                                        handler: 'saveTenant',
                                        cls: 'btn'
                                    },
                                    {
                                        xtype: 'button',
                                        margin: '0 0 0 20',
                                        text: 'Cancel',
                                        handler: 'cancelTenant',
                                        cls: 'btn btn-cancel'
                                    }
                                ]
                            }]
                    }]
            }];
        this.callParent();
    }
});

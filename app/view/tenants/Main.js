Ext.define('CaptivePortal.view.tenants.Main',{
	extend:'Ext.Panel',
	requires:[
	  'CaptivePortal.view.tenants.TenantList',
	  'CaptivePortal.view.tenants.AddOrEditTenant',
	  'CaptivePortal.view.tenants.AssumeList',
	  'CaptivePortal.view.tenants.MainController'
	],
	alias:'widget.tenantsmain',
	controller:'tenants_maincontroller',
	height:'100%',
	width:'100%',
	layout:'card',
	initComponent: function () {
      this.items = [{
                xtype: 'tenantlist',
                itemId: 'card_addtenant'
            }, {
                xtype: 'tenants_addedit',
                itemId:'card_addedittenant'
        },
        {
                xtype: 'assumelist',
                itemId:'card_assumeuser'
        }]
        this.callParent(arguments);
	}
})
Ext.define('CaptivePortal.view.sites.Main', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.sites.SiteList','CaptivePortal.view.sites.AddOrEditSite',
        'CaptivePortal.view.sites.MainController'],
    alias: 'widget.sites_main',
    controller:'sites_maincontroller',
    height: '100%',
    width: '100%',
    layout: 'card',
    scrollable:true,
    initComponent: function () {
        this.items = [{
                xtype: 'sitelist',
                itemId: 'card_adduser'
            }, {
                xtype: 'sites_addedit',
                layout:'fit',                
                itemId:'card_addeditmaster',
            }]
        this.callParent(arguments);

    }
})


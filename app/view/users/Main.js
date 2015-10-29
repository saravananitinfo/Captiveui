Ext.define('CaptivePortal.view.users.Main', {
    extend: 'Ext.Panel',
    requires: ['CaptivePortal.view.users.UserList','CaptivePortal.view.users.AddOrEditUser',
        'CaptivePortal.view.users.MainController'],
    alias: 'widget.usermain',
    controller:'users_maincontroller',
    height: '100%',
    width: '100%',
    layout: 'card',
    scrollable:true,
    initComponent: function () {
        this.items = [{
                xtype: 'userlist',
                itemId: 'card_adduser'
            }, {
                xtype: 'users_addedit',
                itemId:'card_addeditmaster',
            }]
        this.callParent(arguments);

    }
})


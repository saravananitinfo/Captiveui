Ext.define('CaptivePortal.view.home.Home', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.home.HomeController',
        'CaptivePortal.view.users.Main',
        'CaptivePortal.view.tenants.Main',
        'CaptivePortal.view.roles.Main'
    ],
    xtype: 'widget.home.Home',
    itemId: 'pan_apphome',
    controller: 'home',
    padding: '2 80 10 80',
    bodyCls: 'custom_bg_background',
    // layout: 'vbox',
    initComponent: function () {
        var menuItemHeight = 35, menuItemWidth = 145;
        var userObj = this.user;
        console.log(userObj)
        this.items = [{
                xtype: 'toolbar',
                //cls: 'custom_toolbar',
                style: 'border:solid rgb(199, 193, 193) 1px !important;box-shadow: 0 8px 6px -6px grey;',
                width: '100%',
                height: 55,
                margin: '10 0 0 0',
                items: [{
                        xtype: 'image',
                        src: 'custom/css/images/zebra_logo_big.png',
                        height: 40,
                        width: 35
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        cls: 'button_remove',
                        iconCls: 'flag_icon',
                        padding: '0 10 0 10',
                        text: userObj.langDesc,
                        hidden: userObj.langDesc ? false : true,
                        itemId: 'language'
                    }, {
                        xtype: 'splitbutton',
                        //cls: 'button_remove',
                        iconCls: 'fa fa-user',
                        padding: '0 20 0 10',
                        text: userObj.userName,
                        hidden: userObj.userName ? false : true,
                        itemId: 'user_name',
                        menu: new Ext.menu.Menu({
                            items: [{
                                    text: 'SignOut',
                                    iconCls: 'fa-sign-out'
                                }
                            ]
                        })
                    }, {
                        xtype: 'button',
                        cls: 'logout_button',
                        text: 'Logout',
                        itemId: 'logout',
                        handler: 'logout'
                    }]
            }
        ]


        this.callParent();
    },
    listeners: {
        render: 'home_render'
    }

});

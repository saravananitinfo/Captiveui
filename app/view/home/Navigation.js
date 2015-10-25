/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.Navigation', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.home_navigation',
    itemId:'tb_app_navigation',   
    margin: '20 0 0 0',
    style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important',
    cls: 'custom_toolbaPanelr',
    height: 40,
    width: '100%',
//    items: [{
//            xtype: 'splitbutton',
//            height: 35,
//            text: 'TemplatesonShowLogin',
//            cls: 'menu_bar',
//            iconCls: 'fa fa-newspaper-o',
//            menu: new Ext.menu.Menu({
//                items: [
//                    {
//                        text: 'Templates 1',
//                        height: 35,
//                        cls: 'menu_item'
//                    }
//
//                ]
//            })
//        },
//        {
//            xtype: 'splitbutton',
//            text: 'Configuration',
//            cls: 'menu_bar',
//            height: 35,
//            padding: '0 10 0 10',
//            iconCls: 'fa fa-cog',
//            menu: new Ext.menu.Menu({
//                items: [
//                    {
//                        text: 'Users',
//                        cls: 'menu_item',
//                        height: 35,
//                        width: 145,
//                        listeners: {
//                            click: 'createUsers'
//                        }
//                    },
//                    {
//                        text: 'Sites',
//                        cls: 'menu_item',                       
//                        height: 35,
//                        width: 145,
//                        listeners: {
//                            click: 'createSites'
//                        }
//                    },
//                    {
//                        text: 'Tenants',
//                        cls: 'menu_item',
//                        height: 35,
//                        width: 145,
//                        listeners: {
//                            click: 'createTenants'
//                        }
//                    },
//                    {
//                        text: 'Role Templates',
//                        cls: 'menu_item',
//                        height: 35,
//                        width: 145,
//                        listeners: {
//                            click: 'createRoleTemplate'
//                        }
//                    }
//
//                ]
//            })
//        }, {
//            xtype: 'button',
//            cls: 'menu_bar',
//            iconCls: 'fa fa-paper-plane',
//            padding: '0 10 0 10',
//            text: 'On Boarding'
//        }, {
//            xtype: 'button',
//            cls: 'menu_bar',
//            iconCls: 'fa fa-user-secret',
//            padding: '0 10 0 10',
//            text: 'Management'
//        }],
});


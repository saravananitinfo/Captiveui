/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.Body', {
    extend: 'Ext.panel.Panel',
    controller: 'appbodycontroller',
    requires: ['CaptivePortal.view.home.BodyController'],
    alias: 'widget.appbody',
    margin: '20 0 0 10',
    reference: 'pan_mainnavigation',
    flex: 1,
    width: '98%',
    cls: 'tenant-box-border',
    layout: 'card',
    border: false,
    listeners: {
        render: 'onRender'
    },
    items: [{
            xtype: 'panel',
            itemId: 'card_intial'
        }]
//        }, {
//            xtype: 'usermain',
//            itemId: 'card_usermain'
//        }, {
//            xtype: 'tenantsmain',
//            itemId: 'card_tenantlist'
//        }, {
//            xtype: 'rolemain',
//            itemId: 'card_rolelist'
//        }, {
//            xtype: 'sites_main',
//            itemId: 'card_sitelist'
//        },
//        {
//            xtype: 'sms_gatewaysmain',
//            itemId: 'card_sms_gatewaysmain'
//        }]

})


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.Body', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appbody',
    margin: '20 0 0 0',
    reference: 'pan_mainnavigation',
    flex: 1,
    //height:'120%',				
    width: '100%',
    style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important',
    height: '100%',
    layout: 'card',
    border: true,
    //itemId:'container_replace',
    scrollable: false,
    items: [{
            xtype: 'panel',
            itemId: 'card_intial'
        }, {
            xtype: 'usermain',
            itemId: 'card_usermain'
        }, {
            xtype: 'tenantsmain',
            itemId: 'card_tenantlist'
        }, {
            xtype: 'rolemain',
            itemId: 'card_rolelist'
        }]

})


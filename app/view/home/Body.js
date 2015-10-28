/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.Body', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.appbody',
    margin: '20 0 0 10',
    reference: 'pan_mainnavigation',
    flex: 1,
    width: '98%',
    
    cls: 'tenant-box-border',
    height: '100%',
    layout: 'card',
    border: false,
    
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


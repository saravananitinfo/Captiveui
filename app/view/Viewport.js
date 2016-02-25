/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.Viewport', {
    extend: 'Ext.container.Viewport',
    layout: 'fit',
    id: 'viewport',
    listeners: {
        render: function () {
            window.onbeforeunload = function () {
                return "Do you really want to close?";
            };
        }
    }  
//    items:[{
//            xtype:'user_tenantlist'
//    }]
})


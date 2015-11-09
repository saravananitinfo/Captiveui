/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.home.BodyController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.appbodycontroller',
    id: 'vc_appbodycontroller',
    onRender: function (panel) {
        Ext.Array.each(CaptivePortal.app.getAccessPermissionList(), function (permission, index) {
            if ("users" === permission.access_for) {
                if (permission.read || permission.write) {
                    panel.add({
                        xtype: 'usermain',
                        itemId: 'card_usermain'
                    })
                }
            } else if ("tenants" === permission.access_for) {
                panel.add({
                    xtype: 'tenantsmain',
                    itemId: 'card_tenantlist'
                })
            } else if ("sites" === permission.access_for) {
                panel.add({
                    xtype: 'sites_main',
                    itemId: 'card_sitelist'
                })
            } else if ("site_roles" === permission.access_for) {
                panel.add({
                    xtype: 'rolemain',
                    itemId: 'card_rolelist'
                })
            } else if ("sms_gateway" === permission.access_for) {
                panel.add({
                    xtype: 'sms_gatewaysmain',
                    itemId: 'card_sms_gatewaysmain'
                })
            }
        });
    }

})


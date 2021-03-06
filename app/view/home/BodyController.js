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
        var me = this;
        Ext.Array.each(CaptivePortal.app.getAccessPermissionList(), function (permission, index) {
	        if ("users" === permission.access_for) {            
                if(me.checkPermission(permission)){
                    panel.add({
                        xtype: 'usermain',
                        itemId: 'card_usermain'
                    });
                }
            } else if ("tenants" === permission.access_for) {
                if(me.checkPermission(permission)){
                    panel.add({
                        xtype: 'tenantsmain',
                        itemId: 'card_tenantlist'
                    });
                }
            } else if ("sites" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'sites_main',
                    itemId: 'card_sitelist'
                });
            }
            } else if ("site_roles" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'rolemain',
                    itemId: 'card_rolelist'
                });
            }
            } else if ("sms_gateway" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'sms_gatewaysmain',
                    itemId: 'card_sms_gatewaysmain'
                });
            }
            } else if ("guests" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'guest_usersmain',
                    itemId: 'card_guest_usersmain'
                });
            }
            } else if ("access_points" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'access_pointmain',
                    itemId: 'card_access_point_main'
                });
            }
            } else if ("time_policy" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'access_time_policy_main',
                    itemId: 'access_time_policymain'
                });
            }
            } else if ("templates" === permission.access_for) {
                // panel.add({
                //     xtype: 'template_mgmt_main',
                //     itemId: 'access_template_main'
                // })
                if(me.checkPermission(permission)){
                    panel.add({
                        xtype: 'splash_template_main',
                        itemId: 'card_splash_template_main'
                    });
                }
            } else if ("radius_vsas" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'radius_vsa_main',
                    itemId: 'access_radius_vsa_main'
                });
            }
            } else if ("rule_groups" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'rule_group_main',
                    itemId: 'access_rule_group_main'
                });
            }
            } else if ("splash_template" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'splash_template_main',
                    itemId: 'card_splash_template_main'
                });
            }
            } else if ("journeys" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'template_mgmt_main',
                    itemId: 'access_template_main'
                });
            }
            } else if ("reports" === permission.access_for) {
                  if(me.checkPermission(permission)){
                panel.add({
                    xtype: 'report_activesession',
                    itemId: 'card_activesessionreport'
                });
                panel.add({
                    xtype: 'report_sessionhistory',
                    itemId: 'card_sessionhistoryreport'
                });
            }
            } 
        });
        panel.add({
            xtype: 'change_password_view',
            itemId: 'change_password_main'
        });
    },
    checkPermission:function(permission){
          if (permission.read || permission.write) {
            return true;
          }else{
            return false;
          }
    }

})


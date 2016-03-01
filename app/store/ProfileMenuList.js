/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.store.ProfileMenuList', {
    extend: 'Ext.data.Store',   
    autoLoad:true,
    fields: ['id','name','menuitem'],
    data: [{
            id: 1,
            name: 'Pages',
            cls: 'nav-icon nav-icon-template',
            menuitem: [{
                    name: CaptivePortal.Constant.TEMPLATE.SPLASH_TEMPLATE,
                    itemname: 'templates'
                }, {
                    name: CaptivePortal.Constant.TEMPLATE.SPLASH_RULES,
                    itemname: 'rule_group'
                },
		{
                    name: CaptivePortal.Constant.TEMPLATE.SPLASH_PAGES,
                    itemname: 'journeys'
                }
	
		]
        }, {
            id: 2,
            name: 'Configuration',
            cls: 'nav-icon nav-icon-config',
            menuitem: [ {
                    name: 'Sites',
                    itemname: 'sites'
                },{
                    name: CaptivePortal.Constant.MANAGEMENT.INVENTORY,
                    itemname: 'access_points'
                }, {
                    name: 'Role Template',
                    itemname: "site_roles"
                }, {
                    name: 'Tenants',
                    itemname: 'tenants'
                },{
                    name: 'Radius VSA',
                    itemname: 'radius_configuration'
                }]
        }, {
            id: 3,
            name: CaptivePortal.Constant.CONFIGURATION.ADMINS,
            cls: 'nav-icon nav-icon-onboard',
            menuitem: [{
                    name: CaptivePortal.Constant.CONFIGURATION.ADMINS,
                    itemname: 'users'
                }]
        },{
            id: 4,
            name: 'Management',
            cls: 'nav-icon nav-icon-mgmt',
            menuitem: [{
                    name: 'SMS Gateway',
                    itemname: 'sms_gateway'
                },
                {
                    name: 'Access Time Policy',
                    itemname: 'time_policy'
                },{
                    name: CaptivePortal.Constant.MANAGEMENT.WIFIUSERS,
                    itemname: 'guests'
                },{
                    name:'Active Session Report',
                    itemname:'reports'
                },{
                    name:'Session History Report',
                    itemname:'reports'
                }]
        }]
})



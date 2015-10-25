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
            id: '1',
            name: 'Template',
            menuitem: [{
                    name: 'Template',
                    itemname: 'templates'
                }]
        }, {
            id: 2,
            name: 'Configuration',
            menuitem: [{
                    name: 'User',
                    itemname: 'users'
                }, {
                    name: 'Sites',
                    itemname: 'sites'
                }, {
                    name: 'Role Template',
                    itemname: 'roletemplate'
                }, {
                    name: 'Tenants',
                    itemname: 'tenants'
                }]
        }, {
            id: 3,
            name: 'On Board',
            menuitem: [{
                }]
        },{
            id: 4,
            name: 'Management',
            menuitem: [{
                }]
        }]
})



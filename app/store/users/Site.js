/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.store.users.Site', {
    extend: 'Ext.data.Store',
    fields: ['id','name'],
    data: [{name: 'Tenant1'}, {name: 'Tenant2'}]
})


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.users.TenantList', {
    extend: 'Ext.Panel',
    alias: 'widget.user_tenantlist',
    border: true,
    bodyPadding: 40,
    width: '100%',
    dockedItems: [{
            xtype: 'panel',
            height: 50,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            items: [{
                    xtype: 'label',
                    style: 'font-weight: 400;color: #535151;font-size: 16px;padding: 5px 0 0 0;',
                    html: 'We found more than <span style ="color: #1fa1eb;"> 1 Tenant </span>in your login id.Please choose a Tenant.'
                }]
        }],
    style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important;',
    items: [{
            xtype: 'gridpanel',
            reference:'grd_profilelist',
            itemId: 'grd_profilelist',
            style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important;',
            store: 'CaptivePortal.store.user.TenantList',
            columns: [{
                    header: 'ID',
                    width: 200,
                    dataIndex: 'id'
                }, {
                    header: 'Name',
                    flex: 1,
                    dataIndex: 'tenant_name'
                },
                {
                    header: 'Action',
                    width: '14%',
                    renderer: function (value, metaData, rec, view) {
                        metaData.css = 'login';
                        return ''
                    }

                }],
        }]


})


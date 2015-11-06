/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.users.TenantList', {
    extend: 'Ext.Panel',
    alias: 'widget.user_tenantlist',
    border: false,
    bodyPadding: '20 0 0 0' ,
    width: '98%',
    margin: '0 0 0 6',
    dockedItems: [{
            xtype: 'panel',
            height: 30,
            layout: {
                type: 'hbox',
                pack: 'start',
                align: 'middle'
            },
            items: [{
                    xtype: 'label',
                    style: 'font-weight: 400;color: #535151;font-size: 16px;padding: 5px 0 0 0;',
                    html: 'Your account is associated with more than <span style ="color: #1fa1eb;">one</span> Tenant. Please choose a Tenant to continue:'
                }]
            }],
    cls: 'tenant-box-border',
    items: [{
            xtype: 'gridpanel',
            reference:'grd_profilelist',
            itemId: 'grd_profilelist',
            style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important;',
            store: 'CaptivePortal.store.user.TenantList',
            columns: [{
                    header: 'ID',
                    width: 200,
                    hidden:true,
                    cls: 'table-row',
                    tdCls: 'table-cell',
                    dataIndex: 'id'
                }, {
                    header: 'Name',
                    flex: 1,
                    cls: 'table-row',
                    dataIndex: 'tenant_name'
                },
                {
                    header: 'Action',
                    width: '14%',
                    cls: 'table-row',
                    renderer: function (value, metaData, rec, view) {
                        metaData.css = 'login';
                        return ''
                    }

                }],
        }]


})


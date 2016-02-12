/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.report.ActiveSession', {
    extend: 'Ext.Panel',
    alias: 'widget.report_activesession',
    controller:'report_activesession',
    requires:['CaptivePortal.view.report.ActiveSessionController'],
    height: '100%',
    width: '100%',
    layout: {
        type: 'fit'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'gridpanel',
                reference: 'grd_activesession',
                store: 'CaptivePortal.store.report.ActiveSession',
                columns: [{
                        text: 'ID',
                        dataIndex: 'id'
                    },{
                        text: 'ID',
                        dataIndex: 'id'
                    },{
                        text: 'ID',
                        dataIndex: 'id'
                    },{
                        text: 'ID',
                        dataIndex: 'id'
                    },{
                        text: 'ID',
                        dataIndex: 'id'
                    }],
                listeners: {
                    render: 'getReport'
                }

            }];
        this.callParent(arguments);
    }
});


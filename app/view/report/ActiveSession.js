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
                        text: 'Site',
                        dataIndex: 'site_name',
                        width:'15%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Name',
                        dataIndex: 'visitor_name',
                        width:'15%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Email',
                        dataIndex: 'visitor_email',
                        width:'15%',                        
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Gender',
                        dataIndex: 'visitor_gender',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'Birthday',
                        dataIndex: 'visitor_bday',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'Dwell time(in mins)',
                        dataIndex: 'start_time',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            var start_time = new Date(resValue).getTime();
                            var end_time = new Date(rec.get('end_time')).getTime();
                            if(start_time && end_time){
                                resValue = parseInt(end_time) - parseInt(start_time);
                                resValue = parseInt(parseInt(resValue/1000)/60);
                            }
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'Total bytes',
                        dataIndex: 'bytes_tx',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var trfBytes = value || '0';
                            var recBytes = rec.get('bytes_rx') ||'0';
                            resValue = parseInt(trfBytes) + parseInt(recBytes);
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'AP MAC',
                        dataIndex: 'ap_mac_id',
                        width:'14.5%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }],
                listeners: {
                    render: 'getReport'
                }

            }];
        this.callParent(arguments);
    }
});


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
    idPrefix:'session-',
    initComponent: function () {
        this.items = [{
                xtype: 'gridpanel',
                dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: ['->',{
                    xtype:'combo',
                    emptyText:'Site / Group',
                    //store: store,
                    store: CaptivePortal.util.Utility.getEmptySiteStore(),
                    editable:false,
                    queryMode: 'local',
                    displayField: 'name',
                    itemId: this.idPrefix + 'site',
                    valueField: 'id',
                    listConfig:{
                                        getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                    }
                },{
                    xtype:'button',
                    text: 'Search',                    
                    cls: 'btn-add-module',
                    itemId:this.idPrefix + 'search',
                    handler:'activerSessionSearch'
                }, {
                    xtype:'button',
                    text: 'Refresh',                    
                    cls: 'btn-add-module',
                    itemId: this.idPrefix + 'refresh',
                    handler:'refresh'
                }]
            }],
                reference: 'grd_activesession',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.report.ActiveSession',
                columns: [{
                        text: 'Site',
                        dataIndex: 'site_name',
                         cls: 'table-row',
                        width:'15%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Name',
                        dataIndex: 'visitor_name',
                         cls: 'table-row',
                        width:'15%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Email',
                        dataIndex: 'visitor_email',
                         cls: 'table-row',
                        width:'15%',                        
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    },{
                        text: 'Gender',
                        dataIndex: 'visitor_gender',
                         cls: 'table-row',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'Birthday',
                        dataIndex: 'visitor_bday',
                         cls: 'table-row',
                        width:'10%',
                        renderer: function (value, metaData, rec, view) {
                            var resValue = value ? value : '';
                            metaData.tdAttr = 'data-qtip="' + resValue + '" ';
                        return resValue;
                        }
                    }, {
                        text: 'Dwell time(in mins)',
                        dataIndex: 'start_time',
                         cls: 'table-row',
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
                         cls: 'table-row',
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
                         cls: 'table-row',
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


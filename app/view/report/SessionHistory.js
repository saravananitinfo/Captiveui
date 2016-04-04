
Ext.define('CaptivePortal.view.report.SessionHistory', {
    extend: 'Ext.Panel',
    alias: 'widget.report_sessionhistory',
    controller:'report_sessionhistory',
    requires:['CaptivePortal.view.report.SessionHistoryController'],
    height: '100%',
    width: '100%',
    layout: {
        type: 'vbox'
    },
    initComponent: function () {
        var store = Ext.StoreManager.lookup('CaptivePortal.store.site.Site');
        this.items = [{
            xtype:'container',
            padding:'10',
            width:'100%',
                height:20,
            layout:{
                type:'column'
            },
            items:[{
                xtype:'label',
                itemId:'report-new',
                columnWidth:.3,
                text:''
            }, {
                xtype:'label',
                itemId:'report-re',
                margin:'0 0 0 20',
                columnWidth:.3,
                text:''
            }, {
                xtype:'label',
                margin:'0 0 0 20',
                itemId:'report-total',
                columnWidth:.3,
                text:''
            }]
        },{
                xtype: 'gridpanel',
                style:'margin:10px;',
                dockedItems: [{
                xtype: 'toolbar',
                dock: 'top',
                items: ['->',{
                    xtype:'datefield',
                    itemId:'histroy-start',
                    emptyText:'Start Date',
                    format:'d/m/Y',
                    editable:false,
                    maxValue:new Date()
                },{
                    xtype:'datefield',
                    itemId:'histroy-end',
                    format:'d/m/Y',
                    emptyText:'End Date',
                    editable:false,                  
                    maxValue:new Date()
                },{
                    xtype:'combo',
                    emptyText:'Site / Group',
                    //store: store,
                    store: CaptivePortal.util.Utility.getEmptySiteStore(),
                    editable:false,
                    queryMode: 'local',
                    displayField: 'name',
                    itemId:'histroy-site',
                    valueField: 'id',
                    listConfig:{
                                        getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                    }
                },{
                    xtype:'button',
                    text: 'Search',                    
                    cls: 'btn-add-module',
                    itemId:'histroy-search',
                    handler:'histroySearch'
                }, {
                    xtype:'button',
                    text: 'Refresh',                    
                    cls: 'btn-add-module',
                    itemId:'histroy-refresh',
                    handler:'refresh'
                }]
            }],
                width:'100%',
                margin:10,
                //:300,
                reference: 'grd_sessionhistory',
                store: 'CaptivePortal.store.report.SessionHistory',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
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


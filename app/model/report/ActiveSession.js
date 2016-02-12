Ext.define('CaptivePortal.model.report.ActiveSession', {
    extend: 'Ext.data.Model',
    fields: [{
            name: 'id'
        },
        {
            name: 'user_name'
        },
        {
            name: 'start_time'
        },
        {
            name: 'end_time'
        }, {
            name: 'bytes_tx'
        }, {
            name: 'bytes_rx'
        }, {
            name: 'ap_mac_id'
        }, {
            name: 'site_info'
        },{
            name:'status'
        }
    ]

});
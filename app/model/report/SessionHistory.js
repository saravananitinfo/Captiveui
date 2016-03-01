Ext.define('CaptivePortal.model.report.SessionHistory',{
	extend:'Ext.data.Model',
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
            name: 'site_name'
        },{
            name:'status'
        }, {
            name:'visitor_name'
        }, {
            name:'visitor_email'
        },{
            name:'visitor_gender'
        }, {
            name:'visitor_bday'
        }, {
            name:'ap_mac_id'
        }
    ]
});


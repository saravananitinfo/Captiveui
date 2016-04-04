/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.report.ActiveSessionController',{
    extend:'Ext.app.ViewController', 
    alias:'controller.report_activesession',
    listen: {
        controller: {
            "*":{
                refreshActiveSession: "refresh"
            }
        }
    },
    activerSessionSearch: function(btn){
    	var grid = btn.up('grid'), 
    		site = grid.down('#session-site').getValue();
		grid.store.proxy.extraParams.resource = site;
		grid.store.load();
    },
    refresh: function(){
        var grid = this.getView().down('grid');
        grid.down('#session-site').reset();
        grid.store.proxy.extraParams.resource = undefined;        
        grid.store.load();
    },
    getReport:function(){
        var store = this.getView().lookupReference('grd_activesession').getStore();
        store.load(function(res, operation){
        	var res = operation;
            if (res !=null && res._response !=null){
            	var responseObj = res._response.responseText;
            	if(responseObj){
            		var resData = Ext.decode(responseObj);
            		this.getView().down('#session-site').store.loadRawData(CaptivePortal.util.Utility.createSitesAndTags(resData.data));
            	}
            }
        }.bind(this));
        //var _data = {"data":{"sessions":[{"id":"56bb4d426b6972606f000000","site_id":"56bc8fbc6b6972781e0c0000","site_name":"normal usertest 12","visitor_name":"wish","visitor_email":"saaai@sai.com","visitor_gender":null,"visitor_bday":null,"user_name":"gM3It65e","start_time":null,"end_time":"Feb  6 2016 10:11:46 UTC","bytes_tx":null,"bytes_rx":null,"ap_mac_id":"00:0C:66:20:0E:3B","mac":null,"status":"Start"},{"id":"56bb4d756b69726201000000","site_id":"56bc8fbc6b6972781e0c0000","site_name":"normal usertest 12","visitor_name":"wish","visitor_email":"saaai@sai.com","visitor_gender":null,"visitor_bday":null,"user_name":"gM3It65e","start_time":"Feb  6 2016 10:11:46 UTC","end_time":"Feb  6 2016 10:11:46 UTC","bytes_tx":null,"bytes_rx":null,"ap_mac_id":"00:0C:66:20:0E:3B","mac":null,"status":"Start"}]},"success":true};
        //store.loadRawData(_data);
    }
})


Ext.define('CaptivePortal.view.report.SessionHistoryController',{
    extend:'Ext.app.ViewController', 
    alias:'controller.report_sessionhistory',
    histroySearch: function(btn){
    	debugger;
    	var grid=btn.up('grid'), start = grid.down('#histroy-start').getRawValue(),
    	end = grid.down('#histroy-end').getRawValue(), site = grid.down('#histroy-site').getValue();
		grid.store.proxy.extraParams.resource = site;
		grid.store.proxy.extraParams.start_date = start;
		grid.store.proxy.extraParams.end_date = end;
        var _data = {"data":{"session_histories":[{"id":"56bb45d06b69724d0c000000","site_id":"56c31f2d6b69725f6c150000","site_name":"add site","visitor_name":"wish","visitor_email":"saaai@sai.com","visitor_gender":null,"visitor_bday":null,"user_name":"gM3It65e","start_time":"2016-02-12T10:27:49.204Z","end_time":"2016-02-14T10:28:07.428Z","bytes_tx":"121368","bytes_rx":null,"ap_mac_id":"00:0C:66:20:0E:3B","mac":"12:12:12:12:12:12","status":"Stop"},{"id":"56c417606b69726e3c000000","site_id":"56bc8fbc6b6972781e0c0000","site_name":"normal usertest 12","visitor_name":"wish","visitor_email":"saaai@sai.com","visitor_gender":null,"visitor_bday":null,"user_name":"gM3It65e","start_time":"2016-02-12T10:27:49.204Z","end_time":"2016-02-14T10:28:07.428Z","bytes_tx":"121368","bytes_rx":null,"ap_mac_id":"00:0C:66:20:0E:3B","mac":"12:12:12:12:12:12","status":"Stop"}],"new_visitors":6,"re_visitors":12,"available_resources":{"sites":[{"id":"site:56bc8fbc6b6972781e0c0000","name":"normal usertest 12"},{"id":"site:56bc902e6b6972781e0e0000","name":"normal usertest 12"},{"id":"site:56bc95356b6972781e160000","name":"test this21331"},{"id":"site:56bc95636b6972781e180000","name":"test abcdf"},{"id":"site:56c31d246b69725f6c0b0000","name":"new test site"}],"tags":[{"id":"sitetag:56bc8f456b6972781e0a0000","name":"abc"},{"id":"sitetag:56c31d246b69725f6c0c0000","name":"tag34"},{"id":"sitetag:56c31f2d6b69725f6c160000","name":"thj"}]}},"success":true};
        grid.store.loadRawData(_data);
		//grid.store.load();
    },
    getReport:function(){
        var store = this.getView().lookupReference('grd_sessionhistory').getStore();
        store.load(function(res){
        	var res = arguments[1];
        	var responseObj = res._response.responseText;
        	if(responseObj){
        		var resData = Ext.decode(responseObj);
        		var new_vis = resData.data.new_visitors;
        		var re_vis = resData.data.re_visitors;
        		this.getView().down('#report-new').setText('New Visitor : ' + new_vis);
        		this.getView().down('#report-re').setText(' Return Visitor : ' + re_vis);
        		this.getView().down('#report-total').setText(' All Visitors : ' + (new_vis + re_vis));
        		this.getView().down('#histroy-site').store.loadRawData(CaptivePortal.util.Utility.createSitesAndTags(resData.data));
        	}
        }.bind(this));
    }
})


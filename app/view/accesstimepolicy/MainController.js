Ext.define('CaptivePortal.view.accesstimepolicy.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.access_time_policy_maincontroller',    
    id:'vcaccess_time_policy_maincontroller',
    listen: {
		controller: {
			'*':{
				setTimePolicyActiveItem: "setTimePolicyActiveItem"
			},
			'#vc_policylistcontroller': {
                showAccessTimePolicy: 'showAccessTimePolicy',
                loadAccessTimePolicy:'loadAccessTimePolicy'                
            },
		}
	},
    loadAccessTimePolicy: function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_ACCESS_TIME_POLICY + recId + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('resetTimePolicyForm');
                me.fireEvent('loadSitesData', resObj.data);   
                me.fireEvent('loadDataToPolicyForm', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Access Time Policy');
    },
	showAccessTimePolicy: function(card){
		this.getView().setActiveItem(card);		
		var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_ACCESS_TIME_POLICY, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('loadSitesData', resObj.data);
                me.fireEvent('resetTimePolicyForm');
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
		Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New Access Time Policy');
	},
	setTimePolicyActiveItem:function(card){
        this.getView().setActiveItem(card);
    }
});


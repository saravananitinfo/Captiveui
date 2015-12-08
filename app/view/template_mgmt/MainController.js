Ext.define('CaptivePortal.view.template_mgmt.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.template_mgmt_maincontroller',    
    id:'vc_template_mgmt_maincontroller',
    listen:{
    	controller: {
    		'*':{
   					setTemplateMgmtActiveItem: "setTemplateMgmtActiveItem"
   				},
   			'#vc_template_mgmt_list_controller':{
   				showTemplateMgmtForm:'showTemplateMgmtForm',
                loadTemplateMgmtRec : 'loadTemplateMgmtRec',
                duplicateTemplate:'duplicateTemplate'
   			}
   		}
    },
    duplicateTemplate: function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.DUPLICATE_SPLASH_JOURNEY + recId + '/duplicate_splash.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                // for testing need to be removed after server side issue fix
                //resObj.data['categories'] = ["Techno", "Party", "Restaurant", "Lounge"];
                me.fireEvent('initiateTemplateMgmtForm', resObj.data);                
                me.fireEvent('loadDataToTemplateMgmtForm', resObj.data, 'Create');
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Template Management');
    },
    loadTemplateMgmtRec: function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_SPLASH_JOURNEY + recId + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('initiateTemplateMgmtForm', resObj.data);                
                me.fireEvent('loadDataToTemplateMgmtForm', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Template Management');
    },
    showTemplateMgmtForm: function(card){
    	this.getView().setActiveItem(card);
    	var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_SPLASH_JOURNEY, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('initiateTemplateMgmtForm', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
		Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New Template Management');
    },
    setTemplateMgmtActiveItem:function(card){
    	this.getView().setActiveItem(card);
    }
});


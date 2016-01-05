Ext.define('CaptivePortal.view.splash_template.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.splash_template_main_controller',
    listen: {
    	controller: {
    		"*":{
    			setSplashPageActiveItem: "onSplashPageActiveItem",
                showSplashTemplateForm: 'showSplashTemplateForm',
                loadSplashTemplateRec: 'loadSplashTemplateRec'
    		}
    	}
    },
    onSplashPageActiveItem:function(card){
        this.getView().setActiveItem(card);
        // console.log("..........splash");
    },
    showSplashTemplateForm: function(card){
        console.log("......showSplashTemplateForm..");
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_SPLASH_TEMPLATE, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                console.log(resObj.data);
                me.fireEvent('initiateSplashTemplateForm', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New Splash Template');
    },
    loadSplashTemplateRec: function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_SPLASH_TEMPLATE + recId + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('initiateSplashTemplateForm', resObj.data);                
                me.fireEvent('loadDataToSplashTemplateForm', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Splash Template');
    },
});
    
    
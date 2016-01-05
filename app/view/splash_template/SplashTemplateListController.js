Ext.define('CaptivePortal.view.splash_template.SplashTemplateListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.splash_template_list_controller',
    splashTemplateItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadSplashTemplateRec', 1, record.data.id);
            } else if (action == "delete"){
                this.deleteSplashJorney(view, record, item, index, e, eOpts);
            } else if (action == "duplicate"){                
                // this.fireEvent('duplicateTemplate', 1, record.data.id);
            }
        }
    },
    deleteSplashJorney: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Template',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SPLASH_TEMPLATES + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            me.getSplashTemplateList();
                            me.fireEvent('setSplashPageActiveItem',0);
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addSplashTemplate: function(){
        // this.fireEvent('setSplashPageActiveItem',1);
        this.fireEvent('showSplashTemplateForm',1)
    },
    getSplashTemplateList: function(){
        var store = this.getView().lookupReference('grd_splash_template_list').getStore();
        store.load();
    }
});
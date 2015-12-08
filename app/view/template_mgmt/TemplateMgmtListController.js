Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.template_mgmt_list_controller',
    id: 'vc_template_mgmt_list_controller',
    listen:{
         controller:{
            '#vc_template_mgmt_edit':{
                loadTemplateMgmtGrid:'getTemplateMgmtList'
            }
          }
    },
    templateMgmtItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadTemplateMgmtRec', 1, record.data.id);
            } else if (action == "delete"){
                this.deleteSplashJorney(view, record, item, index, e, eOpts);
            } else if (action == "duplicate"){                
                this.fireEvent('duplicateTemplate', 1, record.data.id);
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
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SPLASH_JOURNEY + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getTemplateMgmtList();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addSplashTemplate: function(){
        this.fireEvent('showTemplateMgmtForm',1);
    },
    getTemplateMgmtList: function(){
        var store = this.getView().lookupReference('grd_template_mgmt_list').getStore();
        store.load();
    }
});
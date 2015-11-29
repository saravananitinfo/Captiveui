Ext.define('CaptivePortal.view.accesstimepolicy.PolicyListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.policylistcontroller',
    id: 'vc_policylistcontroller',
    listen: {
            component: {
               'button#btn_addtimepolicy': {
                   click: 'addTimePolicy'
              }
          },
          controller:{
            '#vc_access_time_policy_edit_controller':{
                loadTimePolicyGrid:'getPolicyList'
            }
          }
      },

      accessTimeItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadAccessTimePolicy', 1, record.data.id);
            } else {
                this.deleteAccessTime(view, record, item, index, e, eOpts);
            }
        }
    },
    deleteAccessTime: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Access Time',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_ACCESS_TIME_POLICY + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getPolicyList();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addTimePolicy: function(btn){
        this.fireEvent('showAccessTimePolicy', 1);
    },
    getPolicyList: function(){
        var store = this.getView().lookupReference('grd_policylist').getStore();
    store.load();
    }
});
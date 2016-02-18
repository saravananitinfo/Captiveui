Ext.define('CaptivePortal.view.rule_group.RuleGroupListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rule_group_list_controller',
    id: 'vc_rule_group_list_controller',
    listen:{
        controller:{
            '#vc_rule_group_add_controller':{
                getRuleGroupList:'getRuleGroupList'
            }
        }
    },
    ruleGroupItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadRuleFormRecord', 1, record.data.id);
            } else if (action == "delete"){
                this.deleteRuleGroup(view, record, item, index, e, eOpts);
            } 
        }
    },
    deleteRuleGroup: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Splash Rule',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_RULE_GROUP + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getRuleGroupList();
                        }
                    }.bind(this), function (response) {
                        CaptivePortal.util.Utility.showServerError(response);
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addNewRule: function(){
        this.fireEvent('addRuleGroup', 1);
    },
    getRuleGroupList: function(){
        var store = this.getView().lookupReference('grd_rule_group_list').getStore();
        store.load();
    }
});



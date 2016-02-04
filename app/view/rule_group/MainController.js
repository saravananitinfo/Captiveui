Ext.define('CaptivePortal.view.rule_group.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.rule_group_maincontroller',    
    id:'vc_rule_group_maincontroller',
    listen:{
        controller: {
            '*':{
                    setRuleGroupActiveItem: "setRuleGroupActiveItem"
                },
            '#vc_rule_group_list_controller':{
                addRuleGroup:'addRuleGroup',
                loadRuleFormRecord:'loadRuleFormRecord'
            }
        }
    },
    loadRuleFormRecord:function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_RULE_GROUP + recId + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('loadRecToRuleGroupForm', resObj.data); 
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Rule Group');
    },
    addRuleGroup:function(card){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_RULE_GROUP, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('createNewRule', resObj.data);
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New '+CaptivePortal.Constant.TEMPLATE.SPLASH_RULES);
    },
    setRuleGroupActiveItem:function(card){
        this.getView().setActiveItem(card);
    }
});


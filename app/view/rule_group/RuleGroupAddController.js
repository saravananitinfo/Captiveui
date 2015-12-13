Ext.define('CaptivePortal.view.rule_group.RuleGroupAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rule_group_add_controller',
    id: 'vc_rule_group_add_controller',
    listen:{
        controller:{
            '#vc_rule_group_maincontroller':{
                createNewRule:'createNewRule'
            }
        }
    },
    navigateToIndexPage:function(isReload){
        this.fireEvent('setRuleGroupActiveItem', 0);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Splash Display');
        if(isReload){
            this.fireEvent('getRuleGroupList');
        }
    },
    cancelRuleGroup:function(){
        this.navigateToIndexPage(false);
    },
    createNewRule: function(data){
        this.initiateForm();
        var rec = Ext.create('CaptivePortal.model.rule_group.RuleGroup');
        var form = this.getView().down('form');
        form.loadRecord(rec);
        this.loadSitesCombo(data);
    },
    initiateForm: function(){
        var form = this.getView().down('form');
        form.reset();
    },
    saveRuleGroup: function(btn){
        var form = btn.up('form'), data, isEdit = false;
        if(form.isValid()){
            data = form.getValues(), 
            url = CaptivePortal.Config.SERVICE_URLS.SAVE_RULE_GROUP,
            method = 'POST';
            if(data.id){
                isEdit = true;                
            } else{
                delete data['id'];
            }
            
            var param = {
                splash_rule_group:data                
            }
            param.splash_rule_group['splash_rules_attributes'] = [{
                                                                    name: "rule1",
                                                                    priority: "1",
                                                                    splash_journey_id: "566a99546b69721832050000",
                                                                    splash_rule_sets_attributes:[{ 
                                                                        "rule_value":["1","2","3","123","abcdf"],
                                                                        "rule_type":"fdsa"
                                                                    }]
                                                                }];
            param.splash_rule_group['access_point_ids'] = ["566a7b206b69724a9d000000"];
           
            console.log(param);
            if(isEdit){
                
            }
            CaptivePortal.util.Utility.doAjaxJSON(url, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                       debugger;
                       this.navigateToIndexPage(true);
                    }
                }.bind(this), function (response) {
                    CaptivePortal.util.Utility.showServerError(response);
                    //this.navigateToIndexPage(true);
                }.bind(this), method);
        }
    },
    loadSitesCombo: function(data){        
        var sitesAndTags = [];
        var sites = data.sites || (data.available_resources ? data.available_resources.sites : []);
        var tags = data.tags || (data.available_resources ? data.available_resources.tags : []);
        if(sites && sites.length) {
            Ext.Array.each(sites, function(s){
                var rec = {id:s.id, name:s.name, isSite:true};
                sitesAndTags.push(rec);
            }.bind(this))
        }
        if(tags && tags.length) {
            Ext.Array.each(tags, function(t){
                var rec = {id:t.id, name:t.name, isSite:false};
                sitesAndTags.push(rec);
            }.bind(this))
        }
        this.getView().down('#rule_group_form-sites').store.loadRawData(sitesAndTags);
    },
});
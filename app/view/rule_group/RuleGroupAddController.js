Ext.define('CaptivePortal.view.rule_group.RuleGroupAddController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rule_group_add_controller',
    id: 'vc_rule_group_add_controller',
    listen:{
        controller:{
            '#vc_rule_group_maincontroller':{
                createNewRule:'createNewRule',
                loadRecToRuleGroupForm:'loadRecToRuleGroupForm'
            }
        }
    },
    loadDataToRuleGrid: function(data){
        var rec = [];
        Ext.Array.each(data.splash_rules, function(r, index){
            rec.push(Ext.create('CaptivePortal.model.rule_group.Rule',r));
        }.bind(this));
        if(rec.length){
            this.getView().down('grid').store.loadRawData(rec);
        }
    },
    loadRecToRuleGroupForm: function(data){
        this.initiateForm();
        this.loadSitesCombo(data);
        this.loadSplashCombo(data);
        var rec = Ext.create('CaptivePortal.model.rule_group.RuleGroup', data.splash_rule_group);
        var form = this.getView().down('form');
        form.loadRecord(rec);
        form.down('#btn_save_rule_group').setText('Update');
        this.loadDataToRuleGrid(data.splash_rule_group);
        this.getView().deletedAttrs = [];
    },
    RuleGrpRuleItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('setRuleGroupActiveItem', 2);
                Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Rule');
                this.fireEvent('loadRuleRecToForm',record);
            } else if (action == "delete"){
                this.deleteRuleGrpRule(view, record, item, index, e, eOpts);
            } 
        }
    },
    deleteRuleGrpRule: function (view, record, item, index, e, eOpts) {
        record.store.remove(record);
    },
    addNewRuleForGroup: function(){
        this.fireEvent('setRuleGroupActiveItem', 2);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('New Rule');
        this.fireEvent('createNewRuleForm');
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
        this.loadSplashCombo(data);
        form.down('#btn_save_rule_group').setText('Create');
        this.getView().deletedAttrs = [];
    },
    initiateForm: function(){
        var form = this.getView().down('form');
        form.reset();
        form.down('grid').store.loadRawData([]);
    },
    getRuleValues: function(recs, isDel){
        var reqRecs = [];
        Ext.Array.each(recs, function(r, index){
            var obj = {};
            for(var key in r.data){
                obj[key] = r.data[key];
            }
            obj["priority"] = r.store.indexOf(r);
            obj['splash_rule_sets_attributes'] = (obj['splash_rule_sets_attributes'] ? obj['splash_rule_sets_attributes'] : obj['splash_rule_sets']).concat(obj['deleted_splash_rules']);
            delete obj['splash_name'];
            delete obj['splash_rule_sets'];
            delete obj['deleted_splash_rules'];
            
            if(r.phantom){
                delete obj['id'];
            } 
            if(isDel){
                if( !r.phantom){
                    obj['_destroy'] = true;    
                    reqRecs.push(obj);
                }
            } else {
                reqRecs.push(obj);    
            }
        }.bind(this));
        return reqRecs;
    },
    getRules: function(){
        var grid = this.getView().down('grid'), rules = [];
        rules = rules.concat(this.getRuleValues(grid.store.data.items, false));
        rules = rules.concat(this.getRuleValues(grid.store.getRemovedRecords(), true));
        return rules;
    },
    validSplashJourney: function(){
        var valid = true;
        var store = this.getView().down('grid').store;
        store.each(function(rec){
            if(!rec.data.splash_journey_id){
                valid = false;
            }
        }.bind(this));
        if(!valid){
            CaptivePortal.util.Utility.showError('','Please add splash journey for all rules');
        }
        return valid;
    },
    saveRuleGroup: function(btn){
        var form = btn.up('form'), data, isEdit = false;
        if(form.isValid() && this.validSplashJourney()){
            data = form.getValues(), 
            url = CaptivePortal.Config.SERVICE_URLS.SAVE_RULE_GROUP,
            method = 'POST';
            if(data.id.indexOf('model') == -1){
                isEdit = true;     
            } else{
                delete data['id'];
            }
            
            var param = {
                splash_rule_group:data                
            }
            param.splash_rule_group['splash_rules_attributes'] = this.getRules();
            if(isEdit){
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_RULE_GROUP + data.id + '.json';
                method = 'PUT'; 
            }
            CaptivePortal.util.Utility.doAjaxJSON(url, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                       this.navigateToIndexPage(true);
                    }
                }.bind(this), function (response) {
                    CaptivePortal.util.Utility.showServerError(response);
                }.bind(this), method);
        }
    },
    loadSplashCombo: function(data){
        var splashes = [];
        if(data && data.available_resources){
            var sites = data.available_resources.sites;
            var tags = data.available_resources.tags;
            if(sites && sites.length){
                for(var i=0;i<sites.length;i++){
                    splashes = splashes.concat(sites[i].splash_journeys);
                }
            }
            if(tags && tags.length){
                for(var i=0;i<tags.length;i++){
                    splashes = splashes.concat(tags[i].splash_journeys);
                }
            }
        }
        splashes = [
        {id: "5671bfc4736d73781f010000",name: "temp1"},
        {id: "56745ff6736d732554010000",name: "temp2"},
        {id: "56757302736d737577030000",name: "temp3"}
        ];
        Ext.ComponentQuery.query('#rule_group_rule_form-splash')[0].store.loadRawData(splashes);
    },
    loadSitesCombo: function(data){        
        var sitesAndTags = CaptivePortal.util.Utility.createSitesAndTags(data);
        this.getView().down('#rule_group_form-sites').store.loadRawData(sitesAndTags);
    },
});
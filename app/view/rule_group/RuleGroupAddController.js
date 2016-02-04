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
        rec.sort(function(a,b){
            return a.data.priority - b.data.priority;
        });
        if(rec.length){
            this.getView().down('grid').store.loadRawData(rec);
        }
    },
    changeSitesCombo: function(combo){
        this.loadSplashCombo(combo.getValue(), true);
    },
    loadRecToRuleGroupForm: function(data){
        this.initiateForm();
        this.loadSitesCombo(data); 
        var rec = Ext.create('CaptivePortal.model.rule_group.RuleGroup', data.splash_rule_group);
        var form = this.getView().down('form');
        form.loadRecord(rec);
        form.down('#btn_save_rule_group').setText('Update');
        this.loadDataToRuleGrid(data.splash_rule_group);
        this.loadSplashCombo(data.splash_rule_group.associated_resource);
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
            } else if(action == 'moveup'){
                var store = view.up('grid').store;
                var indexNeed = store.indexOf(record);
                indexNeed--;
                if(indexNeed < 0 ){
                    indexNeed = 0;
                }
                store.remove(record, true);
                store.insert(indexNeed,record);
            } else if(action == 'movedown'){
                var store = view.up('grid').store;
                var indexNeed = store.indexOf(record);
                indexNeed++;
                if(indexNeed > (store.getCount() - 1) ){
                    indexNeed = store.getCount() - 1;
                }
                store.remove(record, true);
                store.insert(indexNeed,record);
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
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText(CaptivePortal.Constant.TEMPLATE.SPLASH_RULES);
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
    resetSplashJourney: function(){
        var store = this.getView().down('grid').store;
        store.each(function(rec){
            rec.data.splash_journey_id = '';
        }.bind(this));
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
    loadSplashCombo: function(resource, resetNeed){
        var splashes = [];
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SPLASHES_FOR_RESOURCE + resource + '.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
               if(resObj.data && resObj.data.splash_journeys){
                    splashes = resObj.data.splash_journeys;
               }
               var splshCombo = Ext.ComponentQuery.query('#rule_group_rule_form-splash')[0];
               splshCombo.reset();
               splshCombo.store.loadRawData(splashes);
               resetNeed && this.resetSplashJourney();
            }
        }.bind(this), function (response) {
            CaptivePortal.util.Utility.showServerError(response);
        }.bind(this), 'GET');
    },
    loadSitesCombo: function(data){        
        var sitesAndTags = CaptivePortal.util.Utility.createSitesAndTags(data);
        this.getView().down('#rule_group_form-sites').store.loadRawData(sitesAndTags);
    },
});
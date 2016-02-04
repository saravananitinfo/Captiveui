Ext.define('CaptivePortal.view.rule_group.RuleController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.rule_group_rule_controller',
    id: 'vc_rule_group_rule_controller',
    listen:{
        controller:{
            '#vc_rule_group_add_controller':{
                createNewRuleForm:'createNewRuleForm',
                loadRuleRecToForm:'loadRuleRecToForm'
            }
        }
    },    
    cancelRuleForm: function(){
        this.fireEvent('setRuleGroupActiveItem', 1);
    },
    loadRuleRecToForm: function(rec){
        this.initiateForm();
        var form = this.getView().down('form');
        var btn = form.down('#rule_group_rule_form-btn_save');
        btn.setText('Update');
        form.loadRecord(rec);
        this.getView().down('#rule_group_rule_attribute_form-dynRowContainer').removeAll();
        form.down('rule_group_rule_attribute').generateRuleAttrs(rec.data.splash_rule_sets ? rec.data.splash_rule_sets : []);
        rec.data.deleted_splash_rules = [];
    },
    createNewRuleForm: function(){
        this.initiateForm();
        var rec = Ext.create('CaptivePortal.model.rule_group.Rule');
        var form = this.getView().down('form');
        var btn = form.down('#rule_group_rule_form-btn_save');
        btn.setText('Create');
        form.loadRecord(rec);
        this.getView().down('#rule_group_rule_attribute_form-dynRowContainer').removeAll();
        form.down('rule_group_rule_attribute').generateRuleAttrs(rec.data.splash_rule_sets ? rec.data.splash_rule_sets : []);
    },
    initiateForm: function(){
        var form = this.getView().down('form');
        form.reset();
    },
    saveRuleRow: function(btn){
        var form = btn.up('form'), data, isEdit = false;
        var nameField = form.down('#rule_group_rule_form-name');
        var splashField = form.down('#rule_group_rule_form-splash');
        var btnText = btn.getText();
        var ruleattrForm = form.down('rule_group_rule_attribute');
        if(nameField.isValid() && splashField.isValid()){
            if(ruleattrForm.areAttributesValid()){
                data = form.getValues();
            if(btnText == 'Update'){
                this.getView().down('form').getForm().updateRecord().getRecord();
                var updateRec = this.getView().down('form').getForm().getRecord();
                var attrValues = ruleattrForm.collectAttrValues();
                updateRec.data['splash_rule_sets_attributes'] = attrValues;
                updateRec.data['splash_rule_sets'] = attrValues;
            } else {                
                var rec = this.getView().down('form').getForm().updateRecord().getRecord();
                var grid = Ext.getCmp('rule_group_form-grid');
                var attrValues = ruleattrForm.collectAttrValues();
                rec.data['splash_rule_sets_attributes'] = attrValues;
                rec.data['splash_rule_sets'] = attrValues;
                grid.store.insert(grid.store.getCount(), rec);
            }
            this.fireEvent('setRuleGroupActiveItem', 1);
            Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Rule Group');
            }
        }
    },
    preview: function(){
        var splash_journey_id = this.getView().down('combo').getValue();
        CaptivePortal.util.Utility.splash_journey_preview(splash_journey_id);
    }
});
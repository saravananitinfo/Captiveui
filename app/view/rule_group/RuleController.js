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
    },
    createNewRuleForm: function(){
        this.initiateForm();
        var rec = Ext.create('CaptivePortal.model.rule_group.Rule');
        var form = this.getView().down('form');
        var btn = form.down('#rule_group_rule_form-btn_save');
        btn.setText('Create');
        form.loadRecord(rec);
    },
    initiateForm: function(){
        var form = this.getView().down('form');
        form.reset();
    },
    saveRuleRow: function(btn){
        var form = btn.up('form'), data, isEdit = false;
        var btnText = btn.getText();
        if(form.isValid()){
            data = form.getValues();
            if(btnText == 'Update'){
                this.getView().down('form').getForm().updateRecord().getRecord();
            } else{                
                var rec = this.getView().down('form').getForm().updateRecord().getRecord();
                var grid = Ext.getCmp('rule_group_form-grid');
                grid.store.insert(grid.store.getCount(), rec);
            }
            this.fireEvent('setRuleGroupActiveItem', 1);
            Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Rule Group');
        }
    }
    
});
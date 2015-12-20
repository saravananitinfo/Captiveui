Ext.define('CaptivePortal.view.rule_group.Rule', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.rule_group.RuleController'],
  alias: 'widget.rule_group_rule',
  controller: 'rule_group_rule_controller',
  padding: 0,
  height: 100,
  autoScroll:true,
  itemIdPrefix:'rule_group_rule_form-',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
  initComponent: function () { 
  var store = Ext.create('Ext.data.Store', {
        	fields:['id', 'name'], 
        	data : []
        });   
        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        defaults: {
                            width: 400,
                            //height: 30,
                            padding: '10 0 15 0',
                            maxLength: 50
                        },
                        items: [{
	                              xtype: 'hiddenfield',
								  name: 'id',
								  itemId:'id'
			                     },{
									xtype:'label',
									text:'Name',							
									cls:'header_label_content'
								},{
									xtype:'textfield',
									allowBlank:false,
									maxLength:50,
									width:300,
									name:'name',
									itemId:this.itemIdPrefix + 'name'
								},{
	                                xtype: 'label',
	                                text: 'Splash Template',
	                                cls: 'header_label_content'
	                            }, {
	                                xtype: 'combo',
	                                queryMode: 'local',
	                                allowBlank: false,
	                                name: 'splash_journey_id',
	                                forceSelection:true,
	                                editable:false,
	                                width:300,
	                                valueField: 'id',
	                                displayField: 'name',
	                                emptyText: 'Select Splash',
	                                store: store,
	                                filterPickList: true,
	                                itemId:this.itemIdPrefix + 'splash'
                            	},	                           
								
							{
		                                xtype: 'container',
		                                layout: 'hbox',
		                                width: '100%',
		                                height: 50,
		                                items: [
		                                    {
		                                        xtype: 'button',
		                                        formBind: true,
		                                        text: 'Create',
		                                        cls: 'btn',
		                                        itemId:this.itemIdPrefix + 'btn_save',
		                                        handler:'saveRuleRow'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        cls: 'btn btn-cancel',
		                                        handler:'cancelRuleForm'
		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});

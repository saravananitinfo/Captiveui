Ext.define('CaptivePortal.view.rule_group.RuleGroupAddorEdit', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.rule_group.RuleGroupAddController'],
  alias: 'widget.rule_group_add_or_edit',
  controller: 'rule_group_add_controller',
  padding: 0,
  height: 100,
  autoScroll:true,
  itemIdPrefix:'rule_group_form-',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
  initComponent: function () {    
  	var data = {"available_resources":{"sites":[{"id":"site:566a652b6b69725c16300000","name":"site with out tag","access_points":[{"id":"566a7b206b69724a9d000000","mac_id":"22.33.66.55.44.77","uid":"1123"},{"id":"566a7b206b69724a9d020000","mac_id":"21.33.66.55.44.77","uid":"123"}],"splash_journeys":[{"id":"566a99546b69721832050000","name":"site joureny"}]}],"tags":[{"id":"tag:566a644e6b69725c162e0000","name":"2nd site tag","splash_journeys":[{"id":"566a7fe56b69725d90010000","name":"normaljourney upa"}]}]}};	
  	var sitesAndTags = [];
        var sites = data.available_resources.sites;
        var tags = data.available_resources.tags;
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
        var store = Ext.create('Ext.data.Store', {
        	fields:['id', 'name'], 
        	data : sitesAndTags
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
	                                text: 'Site',
	                                cls: 'header_label_content'
	                            }, {
	                                xtype: 'combo',
	                                queryMode: 'local',
	                                allowBlank: false,
	                                name: 'associated_resource',
	                                forceSelection:true,
	                                width:300,
	                                valueField: 'id',
	                                displayField: 'name',
	                                emptyText: 'Select Sites',
	                                store: store,
	                                filterPickList: true,
	                                itemId:this.itemIdPrefix + 'sites'
                            	},{
	                                xtype: 'label',
	                                text: 'Rules',
	                                cls: 'header_label_content'
	                            },	                           
								{
										xtype: 'gridpanel',
										margin:'10 10 10 0',										
										id:this.itemIdPrefix + 'grid',
										width:'100%',
						                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
						                store: Ext.create('CaptivePortal.store.rule_group.Rule'),
						                columns: [						                	
						           			{
						            			header: 'Rule Name',
						            			dataIndex: 'name',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell'
						           			},
						           			{
						            			header: 'Splash',
						            			dataIndex: 'splash_name',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell'
						           			},
						           			{
								                header: 'Action',
								                flex:1,
								                cls: 'table-row',
								                renderer: function (value, metaData, rec, view) {
								                    return '<div action="edit" class="edit-icon" title="Edit"></div>&nbsp;&nbsp;<div action="delete" class="del-icon" title="Delete"></div>';
								                }
								            }       			
						                ],	
						                listeners:{
						                	itemclick:'RuleGrpRuleItemClick'
						                },					                								    
									    selModel: {
									        mode: "SIMPLE"
									    },
									    tbar:[
												{
								                	xtype: 'tbfill'
								                },
								                "->",
								                {
								                    xtype: 'button',
								                    text: 'Add',
								                    cls: 'btn-add-module',             
								                    itemId:this.itemIdPrefix + 'rule_add',
								                    handler:'addNewRuleForGroup'
								                }
								             ]									
								
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
		                                        itemId: "btn_save_rule_group",
		                                        text: 'Create',
		                                        cls: 'btn',
		                                        handler:'saveRuleGroup'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        cls: 'btn btn-cancel',
		                                        handler:'cancelRuleGroup'
		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});

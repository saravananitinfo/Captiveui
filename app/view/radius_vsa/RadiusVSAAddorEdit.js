Ext.define('CaptivePortal.view.radius_vsa.RadiusVSAAddorEdit', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.radius_vsa.RadiusVSAAddController'],
  alias: 'widget.radius_vsa_add_or_edit',
  controller: 'radius_vsa_add_controller',
  padding: 0,
  height: 100,
  autoScroll:true,
  itemIdPrefix:'radius_vsa_form-',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
  initComponent: function () {    	
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
	                                text: 'Format',
	                                cls: 'header_label_content'
	                            },{
									xtype:'textfield',
									allowBlank:false,
									maxLength:50,
									width:300,
									name:'format',
									itemId:this.itemIdPrefix + 'format'
								},{
	                                xtype: 'label',
	                                text: 'Value',
	                                cls: 'header_label_content'
	                            },{
									xtype:'textfield',
									allowBlank:false,
									maxLength:50,
									width:300,
									name:'value',
									itemId:this.itemIdPrefix + 'value'
								},{
	                                xtype: 'label',
	                                text: 'VSA Attribute',
	                                cls: 'header_label_content'
	                            },
	                           
							{
										xtype: 'gridpanel',
										margin:'10 10 10 0',
										itemId:this.itemIdPrefix + 'grid',
										width:'100%',
						                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
						                store: Ext.create('CaptivePortal.store.radius_vsa.VSAAttribute'),
						                columns: [						                	
						           			{
						            			header: 'Name',
						            			dataIndex: 'name',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"textfield",
						                			emptyText: "Name"
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "Name" + "</span>"
						           			},
						           			{
						            			header: 'Code',
						            			dataIndex: 'code',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"textfield",
						                			emptyText: "Code"
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "Code" + "</span>"
						           			},
						           			{
						            			header: 'Attribute Type',
						            			dataIndex: 'attribute_type',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"textfield",
						                			emptyText: "Attribute Type"
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "Attribute Type" + "</span>"
						           			},        			
						                ],
						                plugins: {
									        ptype: 'cellediting',
									        clicksToEdit: 1,
									        listeners: {
									            beforeedit: function(d, c) {
									            }
									        }
									    },
									    selType: "checkboxmodel",
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
								                    itemId:this.itemIdPrefix + 'grid_add',
								                    handler:'addVSAAttribute'
								                },
								                {
								                    xtype: 'button',
								                    text: 'Remove',
								                    cls: 'btn-add-module',             
								                    itemId:this.itemIdPrefix + 'grid_remove',
								                    handler:'removeSelectedRecords'
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
		                                        itemId: "btn_save_radius_vsa",
		                                        text: 'Create',
		                                        cls: 'btn',
		                                        handler:'saveRadius'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        cls: 'btn btn-cancel',
		                                        handler:'cancelRSA'
		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});

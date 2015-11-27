Ext.define('CaptivePortal.view.accesstimepolicy.AccessTimePolicyEdit', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.accesstimepolicy.AccessTimePolicyEditController'],
  alias: 'widget.access_time_policyaddoredit',
  controller: 'accesstimepolicyedit',
  padding: 0,
  height: 100,
  scrollable: true,
  intervalTime:15,
	fromMinValue: '12:00 AM',
	fromMaxValue: '11:30 PM',
	toMinValue: '12:15 AM',
	toMaxValue: '11.45 AM',
	defaultFromTimeValue:new Date(2008,0,1,10,0),
	defaultToTimeValue:new Date(2008,0,1,20,0),
  width: '100%',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
  initComponent: function () {
    	var btnText = (this.policy_id) ? 'Update' : 'Create';
    	var avalStore = Ext.create('CaptivePortal.store.accesstimepolicy.Availablity');
        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        itemId: 'accesstimepolicyform',
                        defaults: {
                            width: 700,
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
									text:'Access Time Policy Name',							
									cls:'header_label_content'
								},{
									xtype:'textfield',
									allowBlank:false,
									maxLength:50,
									name:'name',
									itemId:'name',
									value:this.policy_name ? this.policy_name : ''
								}, {
	                                xtype: 'label',
	                                text: 'Site',
	                                cls: 'header_label_content'
	                            }, {
	                                xtype: 'combo',
	                                queryMode: 'local',
	                                reference: 'tf_site',
	                                allowBlank: false,
	                                name: 'site_id',
	                                itemId: 'site_combo',
	                                forceSelection:true,
	                                valueField: 'id',
	                                displayField: 'name',
	                                emptyText: 'Select Sites',
	                                store: 'CaptivePortal.store.users.Site',
	                                filterPickList: true
                            	},                             	
								{
									xtype: 'panel',
	                                title: 'Days',
	                                collapsible: true,
	                                collapsed: true,
	                                layout: 'hbox',
	                                padding: '20 20 0 0',
	                                margin:'20 20 0 0',
	                                width: '100%',
									items:[
									{
										xtype: 'gridpanel',
										margin:10,
										itemId:'time_policy_day_grid',
										width:'100%',
						                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
						                store: Ext.create('CaptivePortal.store.accesstimepolicy.Day'),
						                columns: [
						                	{
						            			header: 'Days',
						            			dataIndex: 'days',
						            			flex: 2,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						            				xtype:"tagfield",
						            				store:Ext.create('CaptivePortal.store.accesstimepolicy.Weekdays'),
						            				emptyText: "Days",
						                			queryMode: 'local',
						                            multiSelect: true,
						                            valueField: 'id',
	                                				forceSelection:true,
						                            displayField: 'name',
						                            filterPickList: true
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "Days" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					/*if(value && value.length){
						           						var strArr = [];
						           						var weekDayStore = Ext.create('CaptivePortal.store.accesstimepolicy.Weekdays');//Ext.StoreManager.lookup('WeekdaysStore');
						           						Ext.Array.each(value, function(v){
						           							strArr.push(weekDayStore.findRecord('id',v).data.name)
						           						}.bind(this));
						           						return strArr.join();
						           					} else {
						           						return '';
						           					}*/
						           					return value;
						           				}
						           			},
						           			{
						            			header: 'From',
						            			dataIndex: 'from',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"timefield",
						                			emptyText: "From Time",
						                			forceSelection:true,
                    								increment: 30                    								
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "From Time" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
						           			},
						           			{
						            			header: 'To',
						            			dataIndex: 'to',
						            			flex: 1,
						            			//width: 160,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"timefield",
						                			emptyText: "To Time",
						                			forceSelection:true,
						            				increment: 30   
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "To Time" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
						           			}           			
						                ],
						                plugins: {
									        ptype: 'cellediting',
									        clicksToEdit: 1,
									        listeners: {
									            beforeedit: function(d, c) {
									            	console.log("...........cellediting");
									                // c.record.set("invalidRec", false);
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
							                    itemId:'btn_add_time_policy_day',
							                    handler: 'addRowToDayGrid'
							                },
							                {
							                    xtype: 'button',
							                    text: 'Remove',
							                    cls: 'btn-add-module',             
							                    itemId:'btn_remove_access_point',
							                    handler: 'removeSelectedRecords'
							                }
							             ]
							        }]									
									
								},
								{
									xtype: 'panel',
	                                title: 'Date Range',
	                                collapsible: true,
	                                collapsed: true,
	                                layout: 'hbox',
	                                padding: '20 20 0 0',
	                                margin:'20 20 0 0',
	                                width: '100%',
									items:[
									{
										xtype: 'gridpanel',
										margin:10,
										itemId:'time_policy_date_range_grid',
										width:'100%',
						                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
						                store: Ext.create('CaptivePortal.store.accesstimepolicy.DateRange'),
						                columns: [
						                	{
						            			header: 'Date Range',						            			
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						                        columns:[
									                        {
									                        	header: 'From',
										            			dataIndex: 'start_date',
										            			width:200,
										            			cls: 'table-row',
										                        tdCls: 'table-cell',
									                        	editor: {
										            				xtype:"datefield",					            				
										            				emptyText: "From Date",
										            				enableKeyEvents:true,
										            				forceSelection:true,
										                			allowBlank: false,
										                			format:'m/d/Y'
									           					},
									           					emptyCellText: '<span style="color:#aaaaaa;">' + "From Date" + "</span>",
									           					renderer:function(value, metaData, record, row, col, store, gridView){
										           					return value ? Ext.Date.format(new Date(value),'m/d/Y') : '';
										           				}
									           				},
									           				{
									                        	header: 'To',
										            			dataIndex: 'end_date',
										            			width:200,
										            			cls: 'table-row',
										                        tdCls: 'table-cell',
									                        	editor: {
										            				xtype:"datefield",					            				
										            				emptyText: "To Date",
										            				enableKeyEvents:true,
										            				forceSelection:true,
										                			allowBlank: false,
										                			format:'m/d/Y'
									           					},
									           					emptyCellText: '<span style="color:#aaaaaa;">' + "To Date" + "</span>",
									           					renderer:function(value, metaData, record, row, col, store, gridView){
										           					return value ? Ext.Date.format(new Date(value),'m/d/Y') : '';
										           				}
						                        			}
						                        		]          			
						           			},
						           			{
						            			header: 'From',
						            			dataIndex: 'from',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"timefield",
						                			emptyText: "From Time",
						            				hasFocus:true,
						            				increment: 30,
						            				enableKeyEvents:true,
						            				forceSelection:true,
						                			allowBlank: false
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "From Time" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
						           			},
						           			{
						            			header: 'To',
						            			dataIndex: 'to',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"timefield",
						                			emptyText: "To Time",
						            				hasFocus:true,
						            				increment: 30,
						            				enableKeyEvents:true,
						            				forceSelection:true,
						                			allowBlank: false
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "To Time" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
						           			},
						           			{
						            			header: 'Availablity',
						            			dataIndex: 'available',
						            			flex: 1,
						            			cls: 'table-row',
						                        tdCls: 'table-cell',
						            			editor: {
						                			xtype:"combo",
						                			emptyText: "Availablity",
						                			store: avalStore,
												    queryMode: 'local',
												    displayField: 'name',
												    valueField: 'value',
						            				forceSelection:true
						           				},
						           				emptyCellText: '<span style="color:#aaaaaa;">' + "Availablity" + "</span>",
						           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value == false ? 'Unavailable' : 'Available';
						           				}
						           			}           			
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
								                    itemId:'btn_add_policy_date_range',
								                    handler: 'addRowToDateRangeGrid'
								                },
								                {
								                    xtype: 'button',
								                    text: 'Remove',
								                    cls: 'btn-add-module',             
								                    itemId:'btn_remove_access_point',
								                    handler: 'removeSelectedRecords'
								                }
								             ]									
								
								}]
							},
								{
									xtype: 'panel',
	                                title: 'Specific Date',
	                                collapsible: true,
	                                collapsed: true,
	                                layout: 'hbox',
	                                padding: '20 20 0 0',
	                                margin:'20 20 0 0',
	                                width: '100%',
									items:[{
									xtype: 'gridpanel',
									width:'100%',
									margin:10,
									itemId:'time_policy_specific_day_grid',
					                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
					                store: Ext.create('CaptivePortal.store.accesstimepolicy.SpecificDay'),
					                columns: [
					                	{
				                        	header: 'Specific Day',
					            			dataIndex: 'date',
					            			flex:1,
					            			cls: 'table-row',
					                        tdCls: 'table-cell',
				                        	editor: {
					            				xtype:"datefield",					            				
					            				emptyText: "Spefice Day",
					            				forceSelection:true,
					            				enableKeyEvents:true,
					                			allowBlank: false,
					                			format:'m/d/Y'			           					
					           				},
					           				emptyCellText: '<span style="color:#aaaaaa;">' + "Specific Day" + "</span>",
					           				renderer:function(value, metaData, record, row, col, store, gridView){
					           					return value ? Ext.Date.format(new Date(value),'m/d/Y') : '';
					           				}
					           			},
					           			{
					            			header: 'From',
					            			dataIndex: 'from',
					            			flex: 1,
					            			cls: 'table-row',
					                        tdCls: 'table-cell',
					            			editor: {
					                			xtype:"timefield",
					                			emptyText: "From Time",
					            				hasFocus:true,
					            				increment: 30, 
					            				forceSelection:true,
					            				enableKeyEvents:true,
					                			allowBlank: false
					           				},
					           				emptyCellText: '<span style="color:#aaaaaa;">' + "From Time" + "</span>",
					           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
					           			},
					           			{
					            			header: 'To',
					            			dataIndex: 'to',
					            			flex: 1,
					            			cls: 'table-row',
					                        tdCls: 'table-cell',
					            			editor: {
					                			xtype:"timefield",
					                			emptyText: "To Time",
					            				hasFocus:true,
					            				forceSelection:true,
					            				increment: 30, 
					            				enableKeyEvents:true,
					                			allowBlank: false
					           				},
					           				emptyCellText: '<span style="color:#aaaaaa;">' + "To Time" + "</span>",
					           				renderer:function(value, metaData, record, row, col, store, gridView){
						           					return value ? Ext.Date.format(new Date(value),'g:i A') : '';
						           				}
					           			},
					           			{
					            			header: 'Availablity',
					            			dataIndex: 'available',
					            			flex: 1,
					            			cls: 'table-row',
					                        tdCls: 'table-cell',
					            			editor: {
					                			xtype:"combo",
					                			emptyText: "Availablity",
					                			store: avalStore,
											    queryMode: 'local',
											    displayField: 'name',
											    valueField: 'value',
					            				forceSelection:true
					           				},
					           				emptyCellText: '<span style="color:#aaaaaa;">' + "Availablity" + "</span>",
					           				renderer:function(value, metaData, record, row, col, store, gridView){
					           					return value == false ? 'Unavailable' : 'Available';
					           				}
						           		}            			
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
							                    itemId:'btn_add_policy_specific_day',
							                    handler: 'addRowToDateSpecficDayGrid'
							                },
							                {
							                    xtype: 'button',
							                    text: 'Remove',
							                    cls: 'btn-add-module',             
							                    itemId:'btn_remove_access_point',
							                    handler: 'removeSelectedRecords'
							                }
							             ]
								}]
								
								},
								{
		                                xtype: 'container',
		                                layout: 'hbox',
		                                width: '100%',
		                                height: 50,
		                                items: [
		                                    {
		                                        xtype: 'button',
		                                        //reference:'btn_save',
		                                        formBind: true,
		                                        itemId: "btn_savePolicy",
		                                        text: btnText,
		                                        handler: 'saveTimePolicy',
		                                        cls: 'btn'
		                                    },
		                                    {
		                                        xtype: 'button',
		                                        margin: '0 0 0 20',
		                                        text: 'Cancel',
		                                        cls: 'btn btn-cancel',
		                                        handler: 'cancelAccessTimePolicy'

		                                    }
		                                ]
		                              }]
            					}]
            	}];
        this.callParent();
  }
});

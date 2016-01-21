Ext.define('CaptivePortal.view.access_point.AddAccessPoint',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.add_access_point_view',
	requires: [
		'CaptivePortal.view.access_point.AddAccessPointController'
	],
	// bodyPadding: '15 30 15 30',
    bodyCls: 'page_list_grid',
	autoScroll: true,
	controller: 'add_access_point_controller',
	dockedItems: [
		{
            xtype: 'toolbar',
            padding: '30 23 0 30',
            dock: 'top',
            items: [
                {
                	xtype: 'tbfill'
                },
                "->",
                {
                    xtype: 'button',
                    text: 'Add',
                    cls: 'btn-add-module',             
                    itemId:'btn_add_access_point',
                    handler: 'addRowAccessPoint'
                },
                {
                    xtype: 'button',
                    text: 'Remove',
                    cls: 'btn-add-module',             
                    itemId:'btn_remove_access_point',
                    handler: 'removeRowAccessPoint'
                }
            ]
        }
    ],
	initComponent: function () {
		Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').reload();
		this.items = [
			{
				xtype: 'gridpanel',
                reference: 'grd_add_access_point',
                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
                store: 'CaptivePortal.store.access_point.AddAccessPoint',
                columns: [
                	{
            			header: 'Name',

            			dataIndex: 'name',
            			flex: 1,
            			width: 160,
            			cls: 'table-row',
                        tdCls: 'table-cell',
            			editor: {
            				xtype:"textfield",
            				emptyText: "Name",
            				hasFocus:true,
            				enableKeyEvents:true,
                			allowBlank: false
           				},
           				emptyCellText: '<span style="color:#aaaaaa;">' + "Name" + "</span>",
           			},
                    {
                        header: 'Vendor',
                        dataIndex: 'vendor_type',
                        flex: 1,
                        width: 160,
                        cls: 'table-row',
                        tdCls: 'table-cell',
                        editor: {
                            xtype:"combo",
                            emptyText: "Vendor",
                            allowBlank: false,
                            store: Ext.create("CaptivePortal.store.access_point.Vendors"),
                            editable: false,
                            queryMode: "remote",
                            displayField: "name",
                            valueField: "id",
                        },
                        emptyCellText: '<span style="color:#aaaaaa;">' + "Vendors" + "</span>",
                    },
           			{
            			header: 'MAC Address',
            			dataIndex: 'mac_id',
            			flex: 1,
            			width: 160,
            			cls: 'table-row',
                        tdCls: 'table-cell',
            			editor: {
                			xtype:"textfield",
                			emptyText: "MAC Address",
            				hasFocus:true,
            				enableKeyEvents:true,
                			allowBlank: false
           				},
           				emptyCellText: '<span style="color:#aaaaaa;">' + "Mac Id" + "</span>",
           			},
           			{
            			header: 'Site Name',
            			dataIndex: 'site_id',
            			flex: 1,
            			width: 160,
            			cls: 'table-row',
                        tdCls: 'table-cell',
                        renderer: function(value){
                        	if(value){
                        	  var name = Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').getById(value).data.name;
				              return name
				            }else{
				            	return ''
				            }
				        },
                        emptyCellText: '<span style="color:#aaaaaa;">' + "Select Site" + "</span>",
            			editor: {
                			xtype: "combobox",
				            store: Ext.create("CaptivePortal.store.access_point.Sites"),
				            editable: false,
				            queryMode: "remote",
				            displayField: "name",
                            allowBlank: false,
				            valueField: "id",
                            emptyCellText: '<span style="color:#aaaaaa;">' + "Select Site" + "</span>",
                            listConfig:{
                                        getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIconForSite
                            },
				            listeners: {
				            	select: function(l, k, p) {
				            		console.log("..........l k p");
				            		console.log(l);
				            		console.log(k);
				            		console.log(p);
				            		var n = l.getRawValue(),
				                        h = null,
				                        o = [];
				                    var m = {
				                        name: l.getRawValue(),
				                        value: l.getValue()
				                    };
				                    // l.setValue(m);
				                    // l.newVal = m;
				                    // l.value = l.getRawValue();
				            	}
				            }
           				},
           				emptyCellText: '<span style="color:#aaaaaa;">' + "Select Site" + "</span>",
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
			    }
			},
			{
                xtype: 'container',
                layout: 'hbox',
                width: '100%',
                height: 50,
                margin: '15 0 0 0',
                items: [
                	{
                        xtype: 'button',
                        reference:'btn_save',
                        formBind: true,
                        itemId: "btn_save_access_points",
                        text: "Save",
                        handler: 'saveAddAccessPoints',
						cls: 'btn'
        			},
        			{
                        xtype: 'button',
                        margin: '0 0 0 20',
                        text: 'Cancel',
                        handler: 'cancleAddAccessPoints',
						cls: 'btn btn-cancel'
        			}
        		]
  			}
		]
		this.callParent();
	}
});

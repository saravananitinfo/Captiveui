Ext.define('CaptivePortal.view.site.AddOrEditSite', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.site.SiteController'
    ],	
    xtype: 'widget.site.AddOrEditSite',
    controller: 'site',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var btnText = this.site_name ? 'Update' :'Create';
	var title = this.site_name ? 'Edit Site' :'New Site';
		this.items = [{
						xtype:'container',
						autoEl: {
								tag: 'div'	
							},
						cls:'heading_color',
						height:5,	
						width:90						
					},{
						xtype:'label',
						text:title,
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						cls:'custom_toolbar',
						width:'100%',
						autoScroll:true,
						topPanel:true,
						items:[{
						xtype:'form',
						itemId:'site_form',
						items:[{
							xtype:'label',
							text:'Site Name',							
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'textfield',
							allowBlank:false,
							margin:'0 0 0 20',
							maxLength:50,
							width:500,
							name:'name',
							itemId:'name',
							value:this.site_name ? this.site_name : ''
						},{
							xtype: 'hiddenfield',
							name: 'site_id',
							itemId:'site_id',
							value: this.site_id
						},{
							xtype:'label',
							text:'Tenant',							
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'combo',
							allowBlank:false,
							margin:'0 0 0 20',
							valueField:'id',
							displayField:'name',
							queryMode: 'local',
							width:500,
							emptyText:'Tenant',
							name:'tenant_id',
							itemId:'tenant_id',
							store:this.tenantStore,
						},{
							xtype:'label',
							text:'Users',
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'tagfield',
							margin:'0 0 0 20',
							queryMode: 'local',
							width:500,
							multiSelect:true,
							name:'user_profile_ids',
							itemId:'user_profile_ids',
							valueField:'id',
							displayField: 'name',
							store:this.userStore,
							filterPickList:true
						},{
							xtype:'label',
							text:'Time Zone',							
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'combo',
							allowBlank:false,
							margin:'0 0 0 20',
							valueField:'name',
							displayField:'name',
							queryMode: 'local',
							width:500,
							emptyText:'Tenant',
							name:'timezone',
							itemId:'timezone',
							store:this.timezoneStore,
						},{
							xtype:'label',
							text:'Tags',
							padding:'0 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'tagfield',
							margin:'0 0 0 20',
							queryMode: 'local',
							width:500,
							multiSelect:true,
							name:'tags',
							itemId:'tags',
							valueField:'name',
							displayField: 'name',
							store:this.tagsStore,
							filterPickList:true
						},
						{
							xtype: 'fieldset',
							padding:'0 0 10 0',
							margin:'0 0 0 20',title: 'Contact Details',collapsible: true,
							layout: 'vbox',
							items: [{
							xtype:'container',
							layout:'hbox',
							items:[{
								xtype:'label',
								width:250,
								text:'Contact Email',							
								padding:'0 0 0 0',
								margin:'0 0 0 20',
								cls:'header_label_content'
							},{
								xtype:'label',
								text:'Contact Phone',							
								padding:'0 0 0 0',
								width:250,
								margin:'0 0 0 20',
								cls:'header_label_content'
							}
							]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'email',
									itemId:'email',
									vtype:'email'
								},{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'phone',
									itemId:'phone'
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'label',
									width:250,
									text:'Address',							
									padding:'0 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'label',
									text:'Street Name',							
									padding:'0 0 0 0',
									width:250,
									margin:'0 0 0 20',
									cls:'header_label_content'
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'address',
									itemId:'address'
								},{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'street',
									itemId:'street'
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'label',
									width:250,
									text:'City',							
									padding:'0 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'label',
									text:'State',							
									padding:'0 0 0 0',
									width:250,
									margin:'0 0 0 20',
									cls:'header_label_content'
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'city',
									itemId:'city'
								},{
									xtype:'combo',
									allowBlank:false,
									margin:'0 0 0 20',
									valueField:'name',
									displayField:'name',
									queryMode: 'local',
									width:250,
									emptyText:'State',
									name:'state',
									itemId:'state',
									store:this.stateStore,
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'label',
									width:250,
									text:'Country',							
									padding:'0 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'label',
									text:'Zip Code',							
									padding:'0 0 0 0',
									width:250,
									margin:'0 0 0 20',
									cls:'header_label_content'
								}
								]
							},
							{
								xtype:'container',
								layout:'hbox',
								items:[{xtype:'combo',
									allowBlank:false,
									margin:'0 0 0 20',
									valueField:'name',
									displayField:'name',
									queryMode: 'local',
									width:250,
									emptyText:'country',
									name:'country',
									itemId:'country',
									store:this.countryStore,
									
								},{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'zipcode',
									itemId:'zipcode'
								}
								]
							},
							]
							},
							{
								xtype: 'fieldset',
								margin:'0 0 0 20',title: 'Location Details',collapsible: true,
padding:'0 0 10 0',								
								layout: 'vbox',
								items: [{
								xtype:'container',
								layout:'hbox',
								items:[{
									xtype:'label',
									width:250,
									text:'Latitude',							
									padding:'0 0 0 0',
									margin:'0 0 0 20',
									cls:'header_label_content'
								},{
									xtype:'label',
									text:'Longitude',							
									padding:'0 0 0 0',
									width:250,
									margin:'0 0 0 20',
									cls:'header_label_content'
								}
								]
								},
								{
									xtype:'container',
									layout:'hbox',
									items:[{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'latitude',
									itemId:'latitude'
								},{
									xtype:'textfield',
									allowBlank:false,
									margin:'0 0 0 20',
									maxLength:50,
									width:250,
									name:'longitude',
									itemId:'longitude'
								}
								]
							}],
							}
						
						
						]
						},{
						xtype:'container',
						margin:20,
						layout:'hbox',
						width:'100%',
						height:30,
						items:[
						{
							xtype:'button',
							text:btnText,
							handler:'saveSite'
						},
						{
							xtype:'button',
							margin:'0 0 0 20',
							text:'Cancel',
							handler:'cancelTenant'
						}
						]
					}]
					}];
					this.callParent();
	}
	
});

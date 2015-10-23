Ext.define('CaptivePortal.view.site.ListSite', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.site.SiteController',
		'CaptivePortal.store.site.Site'
    ],	
    xtype: 'widget.site.ListSite',
    controller: 'site',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var store = Ext.create('CaptivePortal.store.site.Site',{ 
							data:[]
							});
		this.items = [{
						xtype:'container',
						autoEl: {
								tag: 'div'	
							},
						cls:'heading_color',
						height:5,	
						width:50						
					},{
						xtype:'label',
						text:'Site',
						cls:'header_label header_label_content'
					},{
						xtype:'panel',
						//height:'100%',
						autoScroll:true,
						topPanel:true,
						cls:'custom_toolbar',
						width:'100%',
						items:[{
						xtype:'form',
						items:[{
							xtype:'label',
							text:'Sites',
							allowBlank:false,
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
						 xtype:'container',
						 width:'100%',
						 height:'100%',
						 margin:'0 20 0 20',
						 layout:'fit',
						 items:[{
							xtype: 'grid',
							itemId:'sites_grid',
							border:1,							
							autoScroll:true,
							//height:100,
							columns:[
							{
								header:'Name', 
								dataIndex:'name', 
								width:'14.9%',
								renderer: function(value, metaData, rec, view){
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;
								}
							},
							{
								header:'Tenant', 
								dataIndex:'tenant', 
								width:'14.9%',
								renderer: function(value, metaData, rec, view){
									var tenant = rec.get('tenant');
									value = tenant ? tenant.name : '';
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;
								}
							},
							{
								header:'Time Zone', 
								dataIndex:'timezone', 
								width:'29.9%',
								renderer: function(value, metaData, rec, view){
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;									
								}
							},
							{
								header:'Users', 
								dataIndex:'users', 
								width:'14.9%',
								renderer: function(value, metaData, rec, view){
									var users = rec.get('users');
									var userName = [];
									Ext.Array.each(users, function(r){ userName.push(r.name) });
									value = userName.length ? userName.join() : "";
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;
								}
							},
							{
								header:'City', 
								dataIndex:'city', 
								width:'14.9%',
								renderer: function(value, metaData, rec, view){
									metaData.tdAttr='data-qtip="' + value + '" ';
									return value;
								}
							},
							{
								header:'Action',
								renderer: function(value, metaData, rec, view){
									return '<div action="edit" class="edit-icon"></div>&nbsp;&nbsp;<div action="delete" class="del-icon"></div>';
								},
								width:'10%'
							}
							
							],
							tbar:[ '->',
							{
								xtype:'button',
								text:'Add Site',
								cls:'logout_button',
								handler:'createSites'
							}
							],
							store:store,
							listeners:{
								itemclick: 'editSiteItemClick',
								render:'loadSites'
								
							}
						}]
						}]
						}]
					}];
					this.callParent();
	}
	
});

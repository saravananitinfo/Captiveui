Ext.define('CaptivePortal.view.home.Home', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.home.HomeController',
        'CaptivePortal.view.users.Main',
        'CaptivePortal.view.tenants.Main',
        'CaptivePortal.view.roles.Main'
    ],	
    xtype: 'widget.home.Home',
    controller: 'home',	  
	padding:'10',	
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var menuItemHeight = 35, menuItemWidth = 145;
			var userObj = this.user;
			this.items = [{
				xtype:'toolbar',
				cls:'custom_toolbar',
				width:'100%',
				priToolbar:true,				
				height:50,
				padding:10,
				items:[{
						xtype:'label',
						autoEl: {
								tag: 'div'	
							},
						cls:'login_logo login_logo_small',
						height:45,
						width:50
					},'->',{
					xtype:'button',
					cls:'button_remove',
					iconCls:'flag_icon',
					padding:'0 10 0 10',					
					text:userObj.langDesc,
					hidden:userObj.langDesc ? false : true,
					itemId:'language'
				},{
				 xtype:'button',
				cls:'button_remove',
				iconCls:'user_icon',
				padding:'0 20 0 10',			
				 text:userObj.userName,
				 hidden:userObj.userName ? false : true,
				 itemId:'user_name'
				},{
					xtype:'button',
					cls:'logout_button',
					text:'Logout',
					itemId:'logout',
					handler:'logout'
				}]
			},
			{
			xtype:'toolbar',
			secToolbar:true,
			margin:'40 0 0 0',
			style:'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important',
			cls:'custom_toolbaPanelr',
			height:80,
			width:'100%',
			items:[{
				xtype:'splitbutton',
				height:menuItemHeight,
				text:'Templates',
				cls:'menu_bar',
				iconCls:'fa fa-newspaper-o',
				menu: new Ext.menu.Menu({					
				items: [
						{
						text: 'Templates 1',
						height:menuItemHeight,
						cls:'menu_item'					
						}
						
					]
				})
			},
			{
				xtype:'splitbutton',
				text:'Configuration',
				cls:'menu_bar',
				height:menuItemHeight,
				padding:'0 10 0 10',
				iconCls:'fa fa-cog',
				menu: new Ext.menu.Menu({
				items: [
						{
							text: 'Users',
							cls:'menu_item',
							height:menuItemHeight,
							width:menuItemWidth,
							listeners:{
								click:'createUsers'
							}
						},
						{
							text: 'Sites',
							cls:'menu_item',
							height:menuItemHeight,
							width:menuItemWidth,
							listeners:{
								click:'createSites'
							}
						},
						{
							text: 'Tenants',
							cls:'menu_item',
							height:menuItemHeight,
							width:menuItemWidth,
							listeners:{
								click:'createTenants'
							}
						},
						{
							text: 'Role Templates',
							cls:'menu_item',
							height:menuItemHeight,
							width:menuItemWidth,
							listeners:{
								click:'createRoleTemplate'
							}
						}
						
					]
				})
			},{
					xtype:'button',
					cls:'menu_bar',
					iconCls:'fa fa-paper-plane',
					padding:'0 10 0 10',					
					text:'On Boarding'
				},{
					xtype:'button',
					cls:'menu_bar',
					iconCls:'fa fa-user-secret',
					padding:'0 10 0 10',					
					text:'Management'
				}]
			},
			{
				xtype:'container',				
				width:'100%',
				padding:'30 0 0 0',
				height:40,
				items:[{
					xtype:'label',
					reference:'lab_heading',
					style:'border-top: 4px #1fa1eb solid;font-weight: 400;color: #535151;font-size: 23px;padding: 5px 0 0 0;',
					text:''
				}]
			},
			{
				xtype:'panel',
				margin:'30 0 0 0',				
				reference:'pan_mainnavigation',
				flex:1,
				//height:'120%',				
				width:'100%',				
				style:'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc; !important',
				height:'100%',
				layout:'card',				
				border:true,
				//itemId:'container_replace',
				scrollable:false,			
				items:[{
						xtype:'panel',
						itemId:'card_intial'
				},{
					xtype:'usermain',					
					itemId:'card_usermain'
				},{
					xtype:'tenantsmain',
					itemId:'card_tenantlist'
				},{
					xtype:'rolemain',
					itemId:'card_rolelist'
				}]
				
			}];
	this.callParent();
	},
	listeners:{
		render:'home_render'
	}
    
});

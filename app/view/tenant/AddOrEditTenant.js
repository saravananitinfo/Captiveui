Ext.define('CaptivePortal.view.tenant.AddOrEditTenant', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.tenant.TenantController'
    ],	
    xtype: 'widget.tenant.AddOrEditTenant',
    controller: 'tenant',	  
	padding:0,
	height:'100%',
	width:'100%',
	bodyCls:'custom_bg_background',
	layout:'vbox',
	initComponent:function(){
	var btnText = this.tenant_name ? 'Update' :'Create';
	var title = this.tenant_name ? 'Edit Tenant' :'New Tenant';
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
						autoScroll:true,
						topPanel:true,
						cls:'custom_toolbar',
						width:'100%',
						items:[{
						xtype:'form',
						items:[{
							xtype:'label',
							text:'Tenant Name',							
							//padding:'20 0 0 0',
							margin:'0 0 0 20',
							cls:'header_label_content'
						},{
							xtype:'textfield',
							allowBlank:false,
							margin:'0 0 0 20',
							maxLength:50,
							width:300,
							name:'tenant_name',
							itemId:'tenant_name',
							value:this.tenant_name ? this.tenant_name : ''
						},{
							xtype: 'hiddenfield',
							name: 'tenant_id',
							itemId:'tenant_id',
							value: this.tenant_id
						}]
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
							handler:'saveTenant'
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

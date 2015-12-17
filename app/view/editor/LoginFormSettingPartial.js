Ext.define("CaptivePortal.view.editor.LoginFormSettingPartial",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_form_setting_panel',
    cls: 'login_form_setting_panel',
    layout: 'hbox',
    initComponent: function () {1
    	this.items = [
    		{
				xtype: 'panel',
				label: 'vbox',
				width: '50%',
				items: [
					{
						margin: '15 0 15 0'
					},
					{
						margin: '10 0 10 0',
						items: [
							{
								xtype: 'label',
								margin: '5 0 0 5',
								width: '100%',
								text: "Email"
							}
						]
					},
					{
						margin: '10 0 10 0',
						items: [{
							xtype: 'label',
							margin: '5 0 0 5',
							width: '100%',
							text: "First Name"
						}]
					},
					{
						margin: '10 0 10 0',
						items: [
							{
								xtype: 'label',
								margin: '5 0 0 5',
								width: '100%',
								text: "Last Name"
							}
						]
					},
					{
						margin: '10 0 10 0',
						items: [
							{
								xtype: 'label',
								margin: '5 0 0 5',
								width: '100%',
								text: "Gender"
							}
						]
					},
					{
						margin: '10 0 10 0',
						items: [
							{
								xtype: 'label',
								margin: '5 0 0 5',
								width: '100%',
								text: "Birth day"
							}
						]
					}
				]    		
    		},
    		{
				xtype: 'panel',
				label: 'vbox',
				width: '25%',
				items: [
					{
						margin: '5 0 0 5',
						xtype: 'label',
						text: 'Enable'
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'check': function(ths, newValue, oldValue, eOpts){
								console.log(newValue);
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					}
				]    		
    		},
    		{
				xtype: 'panel',
				width: '25%',
				items: [
					{
						margin: '5 0 0 5',
						xtype: 'label',
						text: 'Optional'
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					},
					{
						margin: '5 0 0 5',
						xtype: 'checkboxfield',
						listener: {
							'change': function(ths, newValue, oldValue, eOpts){
								
							}
						}
					}
				]    		
    		}
    	]
    	this.callParent();
    }
});
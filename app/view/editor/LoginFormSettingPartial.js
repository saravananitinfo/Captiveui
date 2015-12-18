Ext.define("CaptivePortal.view.editor.LoginFormSettingPartial",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_form_setting_panel',
    cls: 'login_form_setting_panel',
    layout: 'vbox',
    initComponent: function () {
    	var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
    	console.log(".................blh .....................");
    	console.log(button_panel);
    	var form_json = button_panel.form_json
    	this.items = [
    		{
				xtype: 'panel',
				label: 'hbox',
				width: '100%',
				items: [
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;text-align: center;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									text: ''
								}]
							},
							{
								width: '25%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									text: 'Enable'
								}]
							},
							{
								width: '25%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									text: 'Optional'
								}]
							},
						]
					},
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									margin: '0 0 0 5',
									text: 'Email'
								}]
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								value: form_json.email.enable,
								margin: '0 0 0 0',
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.email.enable = newValue;
										button_panel.form_json = form_json;
									}
								}
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								value: form_json.email.optional,
								margin: '0 0 0 0',
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.email.optional = newValue;
										button_panel.form_json = form_json;
									}
								}
							}
						]
					},
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									margin: '0 0 0 5',
									text: 'First Name'
								}]
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.first_name.enable,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.first_name.enable = newValue;
										button_panel.form_json = form_json;
									}
								}
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.first_name.optional,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.first_name.optional = newValue;
										button_panel.form_json = form_json;
									}
								}
							}
						]
					},
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									margin: '0 0 0 5',
									text: 'Last Name'
								}]
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.last_name.enable,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.last_name.enable = newValue;
										button_panel.form_json = form_json;
									}
								}
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.last_name.optional,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.last_name.optional = newValue;
										button_panel.form_json = form_json;
									}
								}
							}
						]
					},
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									margin: '0 0 0 5',
									text: 'Gender'
								}]
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.gender.enable,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.gender.enable = newValue;
										button_panel.form_json = form_json;
									}
								}
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.gender.optional,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.gender.optional = newValue;
										button_panel.form_json = form_json;
									}
								}
							}
						]
					},
					{
						xtype: 'panel',
						defaults: {
							style: 'float: left;'
						},
						items: [
							{
								width: '50%',
								margin: '5 0 0 0',
								items: [{
									xtype: 'label',
									margin: '0 0 0 5',
									text: 'Birth Day'
								}]
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.birth_day.enable,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.birth_day.enable = newValue;
										button_panel.form_json = form_json;
									}
								}
							},
							{
								xtype: 'checkbox',
								style: 'float: left;text-align: center;',
								margin: '0 0 0 0',
								value: form_json.birth_day.optional,
								width: '25%',
								listeners: {
									'change': function(ths, newValue, oldValue, eOpts){
										var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
										// var form_json = Ext.decode(button_panel.form_json, true);
										var form_json = button_panel.form_json;
										console.log(newValue)
										form_json.birth_day.optional = newValue;
										button_panel.form_json = form_json;
									}
								}
							}
						]
					}
				]    		
    		}
    // 		{
				// xtype: 'panel',
				// label: 'vbox',
				// width: '25%',
				// items: [
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'label',
				// 		text: 'Enable'
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'check': function(ths, newValue, oldValue, eOpts){
				// 				console.log(newValue);
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	}
				// ]    		
    // 		},
    // 		{
				// xtype: 'panel',
				// width: '25%',
				// items: [
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'label',
				// 		text: 'Optional'
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	},
				// 	{
				// 		margin: '5 0 0 5',
				// 		xtype: 'checkboxfield',
				// 		listener: {
				// 			'change': function(ths, newValue, oldValue, eOpts){
								
				// 			}
				// 		}
				// 	}
				// ]    		
    // 		}
    	]
    	this.callParent();
    }
    // listeners: {
    // 	'afterrender': function(panel){
    // 		panel.query('checkbox').on('change', function(){
    // 			console.log(this);
    // 		});
    // 	}
    // }
});
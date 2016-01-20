Ext.define('CaptivePortal.view.guest_users.UploadGuestUsersFrom',{
	extend: 'Ext.panel.Panel',
	alias: 'widget.upload_guest_user_form',
	requires: [
		'CaptivePortal.view.guest_users.UploadGuestUsersFromController'
	],
	controller: 'upload_guest_user_form_controller',
	padding: 0,
	height: 100,
	scrollable: true,
	width: '100%',
	layout: {
	    type: 'vbox',
	    padding: '10 0 0 30'
	},
	initComponent: function () {
        var emptySiteStore = Ext.create('Ext.data.Store',{
            fields:['id', 'name'],
            data:[]
        });
		this.items = [
			{
				xtype: 'panel',
                width: '100%',
                bodyCls: 'form_panel',
                cls: 'form_trigger',
                items: [{
                	xtype: 'form',
            		itemId: 'upload_guest_user_frm',
            		defaults: {
                		width: 400,
                		height: 30,
                		padding: '10 0 15 0',
                		maxLength: 50,
            		},
            		items: [
            			{
                        	xtype: 'label',
                            text: 'Site / Tag',
                            cls: 'header_label_content'
                        },
                        {
			   xtype: 'combobox',
                           allowBlank: false,
                           editable: false,
			   name: 'associated_resource',
			   queryMode: 'local',
			   itemId: 'gateway_sites',
			   emptyText: "Select Site / Tag",
			   valueField: 'id',
			   displayField: 'name',
			   store: CaptivePortal.util.Utility.getEmptySiteStore(),
			   listConfig:{
				getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                }
                        },
                        {
                        	xtype: 'label',
                            text: 'Upload File',
                            cls: 'header_label_content'
                        },
                        {
                        	xtype: 'filefield',
                        	name: 'file_data',
                        	emptyText: "Guest Users",
                        	width: 400,
        			hideLabel: true,
        			itemId: 'upload_field',
				buttonText: 'Select File...',
				cls: 'cp-upload-file'
                        },
                        {
                            xtype: 'label',
                            html:'<a href="custom/images/sample_guest.csv">Click here to download sample guest csv file'
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            width: '100%',
                            height: 50,
                            items: [
                            	{
                                    xtype: 'button',
                                    reference:'btn_save',
                                    formBind: true,
                                    itemId: "btn_save_guest_user",
                                    text: "Save",
                                    handler: 'uploadGuestUsers',
									cls: 'btn'
                    			},
                    			{
                                    xtype: 'button',
                                    margin: '0 0 0 20',
                                    text: 'Cancel',
                                    handler: 'canceluploadGuestUsers',
									cls: 'btn btn-cancel'
                    			}
                    		]
              			}
            		]
                }]
			}
		]
		this.callParent();
	}
});

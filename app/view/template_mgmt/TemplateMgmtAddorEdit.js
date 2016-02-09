Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtAddorEdit', {
    extend: 'Ext.panel.Panel',
    requires: ['CaptivePortal.view.template_mgmt.TemplateMgmtController'],
    alias: 'widget.template_mgmt_add_or_edit',
    controller: 'template_mgmt_edit',
    padding: 0,
    height: 100,
    autoScroll:true,
    itemIdPrefix:'template_mgmt_form-',
    layout: {
        type: 'vbox',
        padding: '10 0 0 30'
    },
    initComponent: function () {      
        this.items=[
                        {
                            xtype: 'panel',
                            width: '100%',
                            bodyCls: 'form_panel',
                            cls: 'form_trigger',
                            items: [
                                    {
                                    xtype: 'form',
                                    itemId: this.itemIdPrefix + 'form',
                                    defaults: {
                                        width: 700,                        
                                        padding: '10 0 15 0',
                                        maxLength: 50
                                    },
                                    items: [
                                            {
                                              xtype: 'hiddenfield',
                                              name: 'id',
                                              itemId:'id'
                                             },{
                                              xtype: 'hiddenfield',
                                              name: 'tenant_id',
                                              itemId:'tenant_id'
                                             }, {
                                              xtype: 'hiddenfield',
                                              name: 'splash_template_id',
                                              itemId:'splash_template_id'
                                             },{
                                                xtype:'label',
                                                text:'Name',                            
                                                cls:'header_label_content'
                                             },{
                                                xtype:'textfield',
                                                allowBlank:false,
                                                maxLength:50,
                                                name:'name',
                                                itemId:this.itemIdPrefix + 'name'
                                            },{
                                                xtype:'label',
                                                text:'Category',                            
                                                cls:'header_label_content'
                                             },{
                                                xtype:'combo',                                          
                                                allowBlank: false,
                                                name:'category',
                                                itemId:this.itemIdPrefix + 'category',
                                                queryMode: 'local',                                             
                                                forceSelection:true,
                                                valueField: 'id',
                                                displayField: 'name',
                                                emptyText: 'Select Category',
                                            }, {
                                                xtype:'checkboxfield',
                                                name:'default',
                                                inputValue: true,
                                                boxLabel:'Set as Default Template',
                                                itemId:this.itemIdPrefix + 'default'
                                            }, {
                                                xtype: 'label',
                                                text: 'Site / Group',
                                                cls: 'header_label_content',
                                                hidden:CaptivePortal.app.getUserRole() == 'super_admin'
                                            }, {
                                                xtype: 'combo',
                                                queryMode: 'local',
                                                name: 'associated_resource',
                                                itemId: 'site_combo',
                                                forceSelection:true,
                                                valueField: 'id',
                                                displayField: 'name',
                                                emptyText: 'Select Site / Group',
                                                store: CaptivePortal.util.Utility.getEmptySiteStore(),
                                                hidden:CaptivePortal.app.getUserRole() == 'super_admin',
                                                listConfig:{
                                                    getInnerTpl:CaptivePortal.util.Utility.getSiteTemplateIcon
                                                },
                                                listeners:{
                                                    //select:CaptivePortal.util.Utility.getSiteAndTagDetails
                                                    select:'site_change'
                                                },margin:'0 0 0 0'
                                            },
                                            CaptivePortal.util.Utility.generateSiteTagRefLabel(),
                                            {
                                                xtype: 'label',
                                                text: 'Status',
                                                cls: 'header_label_content'
                                            }, {
                                                xtype: 'container',
                                                defaultType: 'radiofield',
                                                defaults: {
                                                    width: 100
                                                },
                                                // margin: '0 0 20 0',
                                                layout: 'hbox',
                                                items: [
                                                    {
                                                        boxLabel: 'Draft',
                                                        name: 'status',
                                                        inputValue: 'drafted',
                                                        checked: true
                                                    }, {
                                                        boxLabel: 'Publish',
                                                        name: 'status',
                                                        inputValue: 'published'
                                                    }
                                                ]
                                            }, {
                                                xtype: 'tabpanel',
                                                id:'template_mgmt_form_custom_tab_panel',
                                                margin: '0 0 20 0',
                                                width: '100%',
                                                height: 380,
                                                activeTab: 0,
                                                // border:5,
                                                items: [
                                                    {
                                                        title:'Splash Page',
                                                        margin:'0 30 0 0',
                                                        // padding:15,
                                                        width: '100%',
                                                        cls :'customTab header_label_content',
                                                        // border:5,
                                                        items:[{
                                                            xtype:'container',
                                                            width: '97%',
                                                            margin:15,
                                                            layout:'vbox',
                                                            items:[{
                                                                xtype: 'image',
                                                                hidden:true,
                                                                src: 'custom/css/images/Splash_page.png',
                                                                margin:'0',
                                                                height:155
                                                            }, {
                                                                xtype:'label',
                                                                text:'Please select Site / Group from above dropdown',
                                                                cls:'header_label_content',
                                                                itemId:'site-tag-err-lab',
                                                                margin: '0 0 0 0'
                                                            },{
                                                                xtype:'label',
                                                                itemId:'splash-page-details',
                                                                html:'',
                                                                autoEl: 'div',
                                                                width: '100%',
                                                                height:260,
                                                                cls:'',
                                                                style:'width:100%;height:100%;overflow:auto;float:left;'
                                                            }]
                                                            
                                                        }]
                                                    }, {
                                                        title:'Custom Terms',
                                                        margin:'0 30 0 0',
                                                        padding:'7 15 15 15',
                                                        componentCls :'customTab',
                                                        // border:5,
                                                        layout:'vbox',
                                                        items:[{
                                                                xtype:'checkboxfield',
                                                                name:'custom_tnc',
                                                                checked:true,
                                                                inputValue: true,
                                                                boxLabel:'Enable custom terms',
                                                                itemId:this.itemIdPrefix + 'custom_tnc',
                                                                listeners:{
                                                                    change:'customChange'
                                                                }
                                                            },{
                                                                xtype:'container',
                                                                type:'vbox',
                                                                itemId:this.itemIdPrefix + 'custom_tnc_container',
                                                                items:[{
                                                                xtype:'label',
                                                                text:'Specify new terms name',
                                                                cls:'header_label_content',
                                                                margin: '10 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                margin: '10 0 20 0',
                                                                //allowBlank:false,
                                                                 width: 680,  
                                                                maxLength:100,
                                                                name:'tnc_name'
                                                            },{
                                                                xtype:'label',
                                                                text:'Specify your terms link text',
                                                                cls:'header_label_content',
                                                                margin: '0 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                margin: '10 0 20 0',
                                                                //allowBlank:false,
                                                                 width: 680,  
                                                                maxLength:100,
                                                                name:'tnc_link'
                                                            },{
                                                                xtype:'label',
                                                                margin: '0 0 0 0',
                                                                cls:'header_label_content',
                                                                text:'Copy & Paste your terms text here'
                                                            },{
                                                                xtype:'textareafield',
                                                                margin: '10 0 20 0',
                                                                //llowBlank:false,
                                                                 width: 680,  
                                                                maxLength:100,
                                                                name:'tnc'
                                                            }]
                                                            }
                                                        ]
                                                    },{
                                                        title:'Privacy Policy',
                                                        margin:'0 30 0 0',
                                                        padding:'7 15 15 15',
                                                        componentCls :'customTab',
                                                        // border:5,
                                                        layout:'vbox',
                                                        items:[{
                                                                xtype:'checkboxfield',
                                                                name:'custom_privacy_policies',
                                                                checked:true,
                                                                inputValue: true,
                                                                boxLabel:'Enable privacy policy terms',
                                                                itemId:this.itemIdPrefix + 'custom_privacy_policies',
                                                                listeners:{
                                                                    change:'privacyChange'
                                                                }
                                                            },{
                                                                xtype:'container',
                                                                itemId:this.itemIdPrefix + 'custom_privacy_policies_container',
                                                                type:'vbox',
                                                                items:[{
                                                                xtype:'label',
                                                                text:'Specify new privacy policy name',
                                                                cls:'header_label_content',
                                                                margin: '10 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                maxLength:100,                                                              
                                                                margin: '10 0 20 0',
                                                                //allowBlank:false,
                                                                 width: 680,  
                                                                name:'privacy_policies_name'
                                                            },{
                                                                xtype:'label',
                                                                text:'Specify your privacy policy link text',
                                                                cls:'header_label_content',
                                                                margin: '0 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                maxLength:100,
                                                                margin: '10 0 20 0',
                                                                //allowBlank:false,
                                                                 width: 680,  
                                                                name:'privacy_policies_link'
                                                            },{
                                                                xtype:'label',
                                                                text:'Copy & Paste your privacy policy text here',
                                                                margin: '0 0 0 0',
                                                                cls:'header_label_content',
                                                            },{
                                                                xtype:'textareafield',
                                                                maxLength:100,
                                                                margin: '10 0 20 0',
                                                                //allowBlank:false,
                                                                 width: 680,  
                                                                name:'privacy_policies'
                                                            }]
                                                            }
                                                        ]
                                                    }, {
                                                        title:'Redirects',
                                                        margin:'0 30 0 0',
                                                        padding:'2 15 15 15',
                                                        componentCls :'customTab',
                                                        // border:5,
                                                        layout:'vbox',
                                                        items:[{
                                                                xtype:'label',
                                                                text:'Success URL',
                                                                cls:'header_label_content',
                                                                margin: '10 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                maxLength:300,
                                                                margin: '10 0 20 0',
                                                                allowBlank:true,
                                                                 width: 680,  
                                                                name:'default_success_url'
                                                            },{
                                                                xtype:'label',
                                                                text:'Error URL',
                                                                cls:'header_label_content',
                                                                margin: '0 0 0 0'
                                                            },{
                                                                xtype:'textfield',
                                                                margin: '10 0 20 0',
                                                                maxLength:300,
                                                                allowBlank:true,
                                                                 width: 680,  
                                                                name:'default_error_url'
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title:'SMS Gateway',
                                                        itemId:'sms-gateway-tab',
                                                        margin:'0 30 0 0',
                                                        padding:'2 15 15 15',
                                                        componentCls :'customTab',
                                                        // border:5,
                                                        layout:'vbox',
                                                        items:[{
                                                                xtype:'label',
                                                                padding: '10 0 15 0',
                                                                text:'SMS Gateway',                         
                                                                cls:'header_label_content'
                                                             },{
                                                                xtype:'combo',  
                                                                padding: '0 0 15 0',                                        
                                                                allowBlank: true,
                                                                editable:false,
                                                                name:'sms_gateway_management_id',
                                                                itemId:'sms_gateway_management_id',
                                                                queryMode: 'local',                                             
                                                                forceSelection:true,
                                                                valueField: 'id',
                                                                displayField: 'name',
                                                                emptyText: 'Select SMS Gateway',
                                                            }]
                                                    }
                                                ]
                                            }, {
                                            xtype: 'container',
                                            layout: 'hbox',
                                            width: '100%',
                                            margin:'0 0 10 0',
                                            items: [
                                                {
                                                    xtype: 'button',
                                                    formBind: true,
                                                    text: 'Create',
                                                    itemId:'btn_addtemplate',
                                                    handler: 'saveTemplate',
                                                    cls: 'btn'
                                                },
                                                {
                                                    xtype: 'button',
                                                    margin: '0 0 0 20',
                                                    text: 'Cancel',
                                                    cls: 'btn btn-cancel',
                                                    handler: 'cancelTemplateMgmt'

                                                }
                                            ]
                        }
                                        ]
                                            
                                    },
                                    
                    ]
                }];
        this.callParent();
  }
});

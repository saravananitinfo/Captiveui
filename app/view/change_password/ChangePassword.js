Ext.define('CaptivePortal.view.change_password.ChangePassword', {
    extend: 'Ext.panel.Panel',    
    alias: 'widget.change_password_view',
    requires:['CaptivePortal.view.change_password.ChangePasswordController'],
    autoScroll:true,
    itemIdPrefix:'change_password_form-',
    controller: 'change_password_cntl',
    initComponent: function () {
        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '20 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        defaults: {
                            width: 400,
                            padding: '10 0 15 20',
                            maxLength: 50
                        },
                        items: [{
                                    xtype:'label',
                                    text:'Old Password',                            
                                    cls:'header_label_content'
                                },{
                                    xtype:'textfield',
                                    allowBlank:false,
                                    maxLength:50,
                                    width:300,
                                    name:'old_password',
                                    inputType: 'password',
                                    itemId:this.itemIdPrefix + 'old_password'
                                },{
                                    xtype:'label',
                                    text:'New Password',                            
                                    cls:'header_label_content'
                                },{
                                    xtype:'textfield',
                                    allowBlank:false,
                                    maxLength:50,
                                    width:300,
                                    minLength:8,
                                    name:'new_password',
                                    inputType: 'password',
                                    itemId:this.itemIdPrefix + 'new_password'
                                },{
                                    xtype:'label',
                                    text:'Confirm Password',                            
                                    cls:'header_label_content'
                                },{
                                    xtype:'textfield',
                                    allowBlank:false,
                                    maxLength:50,
                                    width:300,
                                    minLength:8,
                                    name:'confirm_password',
                                    inputType: 'password',
                                    itemId:this.itemIdPrefix + 'confirm_password'
                                },


                            {
                                        xtype: 'container',
                                        layout: 'hbox',
                                        width: '100%',
                                        height: 50,
                                        items: [
                                            {
                                                xtype: 'button',
                                                formBind: true,
                                                itemId: this.itemIdPrefix  + "btn_change_password",
                                                text: 'Change Password',
                                                cls: 'btn',
                                                handler:'changePassword'
                                            }
                                        ]
                                      }]
                                }]
                }];
        this.callParent();
    }
});

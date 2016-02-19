/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.forget.CreateNewPassword', {
    extend: 'Ext.Container',
    alias: 'widget.forget_createnewpassword',
    requires: ['CaptivePortal.view.forget.CreateNewPasswordController'],
    controller: 'forget_createnewpassword',
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'panel',
                //width:'100%',
                height: '100%',
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'middle',
                },
                width: '100%',
                items: [
                    {
                        xtype: 'container',
                        layout: 'hbox',
                        items: [{
                                xtype: 'container',
                                autoEl: {
                                    tag: 'div'
                                },
                                cls: 'login_logo',
                                height: 300,
                                width: 300
                            }, {
                                xtype: 'form',
                                width: '100%',
                                //controller: 'forget_createnewpassword',
                                margin: '40 0 0 20',
                                height: '85%',
                                dockedItems: [{
                                        xtype: 'panel',
                                        margin: '0 0 80 0',
                                        dock: 'bottom',
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        },
                                        items: [{
                                                xtype: 'label',
                                                margin: '0 210 0 0',
                                                text: 'Back to Login',
                                                listeners: {
                                                    render: 'onLoginLabelRender'
                                                },
                                                style: 'text-decoration:none;color:#157fcc;cursor:pointer;',
                                            }, {
                                                xtype: 'button',
                                                margin: '0 10 0 0',
                                                formBind: true,
                                                itemId: 'btn_submit',
                                                text: 'Submit'
                                            }, ]
                                    }],
                                defaults: {
                                    margin: 10,
                                    width: 350,
                                    labelWidth: 30,
                                    height: 35,
                                    labelAlign: 'right'
                                },
                                items: [{
                                        xtype: 'label',
                                        height: 10,
                                        text: '',
                                        hidden: true,
                                        itemId: 'lab_err',
                                        reference: 'lab_err',
                                        style: 'color:red;'
                                    }, {
                                        xtype: 'textfield',
                                        reference: 'txt_password',
                                        inputType: 'password',
                                        emptyText: 'Password',
                                        name: 'newpassword',
                                        allowBlank: false,
                                        msgTarget: 'under',
                                        itemId: 'txt_newpassword'
                                    }, {
                                        xtype: 'textfield',
                                        reference: 'txt_confirmpassword',
                                        inputType: 'password',
                                        emptyText: 'Confirm Password',
                                        name: 'confirmpassword',
                                        msgTarget: 'under',
                                        allowBlank: false,
                                        itemId: 'txt_confirmpassword'
                                    }]
                            }]
                    }]
            }
        ];
        this.callParent(arguments);
    }
});




Ext.define('CaptivePortal.view.forget.ForgetPassword', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.forget.ForgetPasswordController'
    ],
    xtype: 'widget.forget.password',
    controller: 'forget_password',
    layout: {
        type: 'hbox',
        pack: 'center'
    },
    initComponent: function () {
        this.items = [{
                xtype: 'panel',
                height: '100%',
                // width: 900,
                layout: {
                    type: 'vbox',
                    pack: 'center'
                },
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
                                margin: '0 0 0 40',
                                padding: '80 0 0 0',
                                defaults: {//margin: '0 0 0 190',
                                    padding: '10 0 0 0',
                                    width: 270
                                },
                                items: [{
                                        xtype: 'container',
                                        // width: 900,
                                        layout: 'hbox',
                                        items: [{
                                                xtype: 'label',
                                                text: CaptivePortal.Config.MESSAGES.FORGET_PASSWORD_SUCCESS_INFO,
                                                hidden: true,
                                                itemId: 'forget_password_info'
                                            }, {
                                                xtype: 'label',
                                                text: '',
                                                width: '100%',
                                                hidden: true,
                                                itemId: 'sign_in_nav',
                                                cls: '',
                                                listeners: {
                                                    render: 'navigate_to_sign_in'
                                                }
                                            }]
                                    }, {
                                        xtype: 'textfield',
                                        name: 'name',
                                        allowBlank: false,
                                        emptyText: 'Email',
                                        invalidText: 'Please enter valid user name',
                                        vtype: 'email',
                                        msgTarget: 'under',
                                        itemId: 'forget_password_user_name'
                                    }, {
                                        xtype: 'container',
                                        style: 'border-bottom:solid 1px #e1e1e1;',
                                        margin: '0 0 10 0',
                                        width: 270,
                                        height: 45,
                                        layout: {
                                            type: 'hbox',
                                            pack: 'end'
                                        },
                                        items: [
                                            {
                                                xtype: 'button',
                                                formBind: true,
                                                text: 'Submit',
                                                handler: 'send_forget_password'
                                            }
                                        ]
                                    }, {
                                        xtype: 'label',
                                        margin: '25 0 0 0',
                                        text: 'Back to Login',
                                        listeners: {
                                            render: 'onLoginLabelRender'
                                        },
                                        style: 'text-decoration:none;color:#157fcc;cursor:pointer;',
                                    }],
                                listeners: {
                                    render: 'render'
                                }
                            }]
                    }]

            }

        ];
        this.callParent();
    }

});

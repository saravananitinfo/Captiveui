Ext.define('CaptivePortal.view.login.Login', {
    extend: 'Ext.panel.Panel',
    itemId: 'login',
    requires: [
        'CaptivePortal.view.login.LoginController'
    ],
    xtype: 'widget.login',
    controller: 'login',
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
                width: 700,
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
                                height: 250,
                                width: 300
                            }, {
                                xtype: 'form',
                                width: '100%',
                                height: '100%',
                                margin: '40 0 0 20',
                                defaults: {
                                    margin: 5,
                                    width: 350,
                                    height: 35
                                },
                                items: [{
                                        xtype: 'label',
                                        text: 'Either user name or password is inxcorrect. Please try again',
                                        hidden: true,
                                        itemId: 'login-err',
                                        style: 'color:red;'
                                    }, {
                                        xtype: 'textfield',
                                        name: 'name',
                                        allowBlank: false,
                                        emptyText: 'Email',
                                        margin: '10 0 0 0',
                                        itemId: 'login-name',
                                        msgTarget: 'under',
                                        invalidText: 'Please enter valid user name',
                                        vtype: 'email'
                                    }, {
                                        xtype: 'textfield',
                                        inputType: 'password',
                                        margin: '10 0 0 0',
                                        emptyText: 'Password',
                                        msgTarget: 'under',
                                        name: 'password',
                                        allowBlank: false,
                                        itemId: 'login-password'
                                    }, {
                                        xtype: 'container',
                                        margin: '10 0 0 0',
                                        style: 'border-bottom:solid 1px #e1e1e1;',
                                        layout: 'hbox',
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                itemId: 'remember_me'
                                            }, {
                                                xtype: 'label',
                                                text: 'Remember Me',
                                                padding: '5 0 0 5'
                                            }, {
                                                margin: '0 0 0 190',
                                                xtype: 'button',
                                                text: 'Login',
                                                handler: 'login'
                                            }
                                        ]
                                    }, {
                                        xtype: 'container',
                                        margin: '10',
                                        layout: 'vbox',
                                        items: [{
                                                xtype: 'label',
                                                style: 'text-decoration:none;color:#157fcc;cursor:pointer;',
                                                text: 'Forget Password ?',
                                                listeners: {
                                                    render: 'render_forget_password'
                                                }
                                            }]
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

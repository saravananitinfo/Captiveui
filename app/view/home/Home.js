Ext.define('CaptivePortal.view.home.Home', {
    extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.home.HomeController',
        'CaptivePortal.view.users.Main',
        'CaptivePortal.view.tenants.Main',
        'CaptivePortal.view.roles.Main',
        'CaptivePortal.view.sites.Main',
        'CaptivePortal.view.sms_gateway.Main',
        'CaptivePortal.view.guest_users.Main',
        'CaptivePortal.view.access_point.Main',
        'CaptivePortal.view.accesstimepolicy.Main',
        'CaptivePortal.view.splash_template.Main'
    ],
    xtype: 'widget.home.Home',
    itemId: 'pan_apphome',
    controller: 'home',
    padding: '2 80 10 80',
    bodyCls: 'custom_bg_background',   
    initComponent: function () {      
        var userObj = this.user;
        this.items = [{
                xtype: 'toolbar',
                //cls: 'custom_toolbar',
                style: 'border:none;',
                width: '98%',
                height: 60,
                margin: '10 0 0 0',
                items: [{
                        xtype: 'image',
                        src: 'custom/images/zebra_logo_v1.png',
                        margin:'0',
                        height:55
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        cls: 'button_remove',
                        iconCls: 'flag_icon',
                        padding: '0 10 0 10',
                        text: userObj.langDesc,
                        hidden: userObj.langDesc ? false : true,
                        itemId: 'language'
                    }, {
                        xtype:'splitbutton',
                        text:'',
                        hidden:true,
                        cls: 'cp-splitbutton cp-splitbutton-tenantlist',
                        itemId:'spb_switchprofile',
                        menu:new Ext.menu.Menu({
                            cls: 'cp-menu cp-menu-tenantlist',
                            items:[{
                                 text:'SignOut'  
                                }]
                        })
                    },{
                        xtype:'label',
                        itemId:'lab_roledisplay',
                        cls:'top_bar_user_icon',
                        text: 'S'
                    },{
                        xtype: 'label',
                        text: userObj.userName,
                        hidden: userObj.userName ? false : true,
                        itemId: 'user_name'                       
                    }, {
                        xtype: 'button',
                        width:20,
                        cls:'menu_bar',
                        menu:new Ext.menu.Menu({
                            listeners:{
                                show: function(m){
                                    var toolbarBtn = m.up('button'), newX, btnPos = [], newY;
                                    if(toolbarBtn){
                                        btnPos = toolbarBtn.getXY();
                                        newX = (btnPos && btnPos[0]) ? (btnPos[0] - m.getWidth() + 20) : 0 ;
                                        newY = (btnPos && btnPos[1]) ? (btnPos[1] + 25) : 0 ;
                                        setTimeout(function(){
                                            m.setX(newX);
                                            m.setY(newY);
                                        }.bind(this), 1);
                                        
                                    }
                                }
                            },
                            width:30,
			    cls: "cp-profile-menu",
                           items:[
                              {
                                text:'Logout',
                                itemId: 'logout', 
                                handler: 'logout'
                             },{
                                text:'Change Password', 
                                handler:'changePassword'
                            }
                          ]

                       })
                    }]
            }
        ]


        this.callParent();
    },
    listeners: {
        render: 'home_render'
    }

});

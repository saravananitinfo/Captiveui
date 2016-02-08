Ext.define("CaptivePortal.view.editor.LoginButtonSetting",{
	extend: 'Ext.panel.Panel',
	alias: 'widget.login_button_setting',
    requires: [
        'CaptivePortal.view.editor.LoginLinkSettingPartial',
        'CaptivePortal.view.editor.LoginButtonSettingPartial',
        'CaptivePortal.view.editor.LoginFormSettingPartial'
    ],
	title: 'Button Settings',
    closable : true,
    cls: 'login_button_setting',
    layout: 'vbox',
    initComponent: function () {
        var btn_json = Ext.decode(this.btn_json);
        var link_json = Ext.decode(this.link_json);
        var active_tab = 0;
        var connect = 'fb';
        var form_connect = false;
        console.log("1.........................................................");
        console.log(link_json);

        var button = {title: "Button", items: []};
        var link = {title: "Link", items: []};
        if(this.trigger_type === 'Button'){
            connect = btn_json.connect;
            button["items"].push({
                xtype: "login_button_setting_partial",
                button_json: btn_json
            })
        }else if(this.trigger_type === 'Link'){
            active_tab = 1;
            connect = link_json.connect;
            link["items"].push({
                xtype: "login_link_setting_partial",
                link_json: link_json
            })
        }

        var items = [ button, link ]
        if(connect === 'form'){
            items.push({
                title: "Set Form Field",
                items: [
                    {
                        xtype: 'login_form_setting_panel'
                    }
                ]
            });
        }

        // var items = [button, link]

        this.items = [
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 5 10',
                        text: 'Login Type'
                    },
                    {
                        xtype: 'combobox',
                        margin: '0 10 0 10',
                        width: '100%',
                        allowBlank: false,
                        name: 'gateway_type',
                        queryMode: 'local',
                        itemId: 'login_connect_type',
                        valueField: 'id',
                        value: connect,//btn_json["connect"] ? btn_json["connect"] : 'fb',
                        displayField: 'name',
                        store: 'CaptivePortal.store.editor.LoginButtonTypes',
                        listeners: {
                            'select': function(combo, record, eOpts ){
                                var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter', 'form': 'Form'}
                                var tabpanel = this.up('.login_button_setting').down('tabpanel')

                                console.log("..........select ............");
                                console.log(record);
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];

                                // var btn_json = Ext.decode(button_panel.button_json);
                                // btn_json["connect"] = record.id
                                // button_panel.button_json = JSON.stringify(btn_json);

                                var btn_json = Ext.decode(button_panel.button_json);
                                btn_json["connect"] = record.id;
                                button_panel.button_json = JSON.stringify(btn_json);

                                var link_json = Ext.decode(button_panel.link_json);
                                link_json["connect"] = record.id
                                link_json["text"] = 'Connect With '+local[record.id];
                                button_panel.link_json = JSON.stringify(link_json);


                                if(button_panel.trigger_type === 'Button'){
                                    var login_button = button_panel.down('#button_panel').el.query('.edtBtn')[0];

                                    if(record.id != 'form'){
                                        login_button.style.color = "";
                                        login_button.style.background = "";
                                    }
                                    login_button.className = record.id+'Btn'+' edtBtn btn-default';
                                    button_panel.down('#button_panel').el.query('i')[0].className = "fa fa-"+local[record.id];

                                    Ext.ComponentQuery.query("#"+this.up('.login_button_setting').el.down('.btn_text').id)[0].setValue('Login');

                                    
                                    var tab = tabpanel.getActiveTab()
                                    tab.removeAll();
                                    tab.add({
                                        xtype: 'login_button_setting_partial',
                                        button_json: btn_json
                                    })

                                }else if(button_panel.trigger_type === 'Link'){
                                    var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                    // window.abc = button_panel.down('#button_panel').el
                                    button_panel.down('#button_panel').el.query('a')[0].textContent = 'Connect With '+CaptivePortal.util.Utility.capitalizeFirstLetter(local[record.id]);
                                    
                                    
                                    var tab = tabpanel.getActiveTab()
                                    tab.removeAll();
                                    tab.add({
                                        xtype: 'login_link_setting_partial',
                                        link_json: link_json
                                    })
                                }

                                if(record.id === 'form'){
                                    tabpanel.insert(2, {
                                        title: "Set Form Field", 
                                        items: [
                                            {
                                                xtype: 'login_form_setting_panel'
                                            }
                                        ]
                                    });
                                }else{
                                    window.abc = tabpanel;
                                    // var indx = tabpanel.items.indexOf(tabpanel.down('login_form_setting_panel').up('panel'));
                                    tabpanel.remove(tabpanel.items.items[2]);
                                    // console.log(indx);
                                }
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'vbox',
                width: '100%',
                items: [
                    {
                        xtype: 'label',
                        margin: '10 10 0 10',
                        text: 'Alignment'
                    },
                    {
                        xtype: 'panel',
                        margin: '0 10 0 10',
                        layout: 'vbox',
                        items: [
                            {
                                items:[{
                                    xtype: 'button',
    
                                    iconCls : 'align_left',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Left',
                                    margin: '0 10 0 0',
                                    // text: 'Left',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'left'

                                        // button_panel.layout.tdAttrs.align = "left";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('align', 'left');
                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['align'] = "left";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['align'] = "left";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls : 'align_center',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Center',
                                    margin: '0 10 0 0',
                                    // text: 'Center',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'center'

                                        // button_panel.layout.tdAttrs.align = "center";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('align', 'center');

                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['align'] = "center";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['align'] = "center";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls : 'align_right',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'Align Right',
                                    margin: '0 50 0 0',
                                    // text: 'Right',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'right'

                                        // button_panel.layout.tdAttrs.align = "right";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('align', 'right');

                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['align'] = "right";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['align'] = "right";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                }]
                            },


                            {
                                items:[{
                                    xtype: 'button',
                                    iconCls : 'valign_top',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'VAlign Top',
                                    margin: '0 10 0 0',
                                    // text: 'Top',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'left'

                                        // button_panel.layout.tdAttrs.valign = "top";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('valign', 'top');

                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['valign'] = "top";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['valign'] = "top";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls : 'valign_middle',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'VAlign Middle',
                                    margin: '0 10 0 0',
                                    // text: 'Middle',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'center'

                                        // button_panel.layout.tdAttrs.valign = "middle";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('valign', 'middle');

                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['valign'] = "middle";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['valign'] = "middle";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                },
                                {
                                    xtype: 'button',
                                    iconCls : 'valign_bottom',
                                    scale: 'large',
                                    autoWidth : true,
                                    autoHeight : true,
                                    tooltip : 'VAlign Bottom',
                                    margin: '0 10 0 0',
                                    // text: 'Bottom',
                                    handler: function(){
                                        var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                        // var btn = button_panel.down('#button_panel')
                                        // btn.el.dom.style.textAlign = 'right'

                                        // button_panel.layout.tdAttrs.valign = "bottom";
                                        // button_panel.doLayout();
                                        button_panel.body.query('td')[0].setAttribute('valign', 'bottom');

                                        if(button_panel.trigger_type === 'Button'){
                                            var btn_json = Ext.decode(button_panel.button_json, true);
                                            btn_json['valign'] = "bottom";
                                            button_panel.button_json = JSON.stringify(btn_json);
                                        }else if(button_panel.trigger_type === 'Link'){
                                            var link_json = Ext.decode(button_panel.link_json, true);
                                            link_json['valign'] = "bottom";
                                            button_panel.link_json = JSON.stringify(link_json);
                                        }
                                    }
                                }]
                            }
                        ]

                    }
                ]
            },
            {
                xtype: 'tabpanel',
                width: '100%',
                margin: '10 0 0 0',
                activeTab: active_tab,
                items: items,
                // items: [
                //     {
                //         title: "Button",
                //         items: [
                //             {
                //                 xtype: 'panel',
                //                 layout: 'vbox',
                //                 width: '100%',
                //                 items: [
                //                     {
                //                         xtype: 'label',
                //                         margin: '10 10 10 10',
                //                         text: 'Text'
                //                     },
                //                     {
                //                         xtype: 'textfield',
                //                         margin: '0 10 0 10',
                //                         width: '100%',
                //                         cls: 'btn_text',
                //                         value: btn_json["text"],
                //                         listeners: {
                //                             'change': function(){
                //                                 var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                 button_panel.down('#button_panel').el.query('.text')[0].textContent = this.value
                //                                 var btn_json = Ext.decode(button_panel.button_json, true);
                //                                 btn_json['text'] = this.value;
                //                                 button_panel.button_json = JSON.stringify(btn_json);
                //                             }
                //                         }
                //                     }
                //                 ]
                //             },
                //             {
                //                 xtype: 'panel',
                //                 layout: 'vbox',
                //                 width: '100%',
                //                 items: [
                //                     {
                //                         xtype: 'label',
                //                         margin: '10 10 10 10',
                //                         text: 'Font Size'
                //                     },
                //                     {
                //                         xtype: 'numberfield',
                //                         margin: '0 10 0 10',
                //                         width: '100%',
                //                         minValue: 0,
                //                         value: btn_json["font_size"],
                //                         listeners: {
                //                             'change': function(ths, newValue, oldValue, eOpts){
                //                                 var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                 var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                //                                 btn.style.fontSize = newValue+"px"

                //                                 var btn_json = Ext.decode(button_panel.button_json, true);
                //                                 btn_json['font_size'] = newValue;
                //                                 button_panel.button_json = JSON.stringify(btn_json);
                //                             }
                //                         }
                //                     }
                //                 ]
                //             },
                //             {
                //                 xtype: 'panel',
                //                 layout: 'vbox',
                //                 width: '100%',
                //                 items: [
                //                     {
                //                         xtype: 'label',
                //                         margin: '10 10 10 10',
                //                         text: 'Radius'
                //                     },
                //                     {
                //                         xtype: 'numberfield',
                //                         margin: '0 10 0 10',
                //                         width: '100%',
                //                         minValue: 0,
                //                         value: btn_json["border_radius"],
                //                         listeners: {
                //                             'change': function(ths, newValue, oldValue, eOpts){
                //                                 var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                 var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                //                                 btn.style.borderRadius = newValue+"px"

                //                                 var btn_json = Ext.decode(button_panel.button_json, true);
                //                                 btn_json['border_radius'] = newValue;
                //                                 button_panel.button_json = JSON.stringify(btn_json);
                //                             }
                //                         }
                //                     }
                //                 ]
                //             },
                //             {
                //                 xtype: 'panel',
                //                 layout: 'vbox',
                //                 width: '100%',
                //                 items: [
                //                     {
                //                         xtype: 'label',
                //                         margin: '10 10 10 10',
                //                         text: 'Size'
                //                     },
                //                     {
                //                         xtype: 'sliderfield',
                //                         margin: '0 10 0 10',
                //                         width: '100%',
                //                         value: btn_json["padding_val"],
                //                         increment: 5,
                //                         minValue: 0,
                //                         maxValue: 25,
                //                         listeners: {
                //                             change: function(slider, newValue, thumb, eOpts){
                //                                 var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                 var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
                //                                 var newPadding = newValue+"px"+" "+newValue*2+"px"
                //                                 btn.style.padding = newPadding

                //                                 var btn_json = Ext.decode(button_panel.button_json, true);
                //                                 btn_json['padding_val'] = newValue;
                //                                 button_panel.button_json = JSON.stringify(btn_json);
                //                             }
                //                         }
                //                     }
                //                 ]
                //             }
                //         ]
                //     },
                //     {
                //         title: "Link",
                //         items: [
                //             {
                //                 xtype: 'panel',
                //                 layout: 'vbox',
                //                 width: '100%',
                //                 items: [
                //                     {
                //                         xtype: 'panel',
                //                         layout: 'vbox',
                //                         width: '100%',
                //                         items: [
                //                             {
                //                                 xtype: 'label',
                //                                 margin: '10 10 10 10',
                //                                 text: 'Text'
                //                             },
                //                             {
                //                                 xtype: 'textfield',
                //                                 margin: '0 10 0 10',
                //                                 width: '100%',
                //                                 cls: 'btn_text',
                //                                 value: btn_json["text"],
                //                                 listeners: {
                //                                     'change': function(){
                //                                         var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                         button_panel.down('#button_panel').el.query('.a')[0].textContent = this.value
                //                                         var btn_json = Ext.decode(button_panel.button_json, true);
                //                                         btn_json['text'] = this.value;
                //                                         button_panel.button_json = JSON.stringify(btn_json);
                //                                     }
                //                                 }
                //                             }
                //                         ]
                //                     },
                //                     {
                //                         xtype: 'panel',
                //                         layout: 'vbox',
                //                         width: '100%',
                //                         items: [
                //                             {
                //                                 xtype: 'label',
                //                                 margin: '10 10 10 10',
                //                                 text: 'Font Size'
                //                             },
                //                             {
                //                                 xtype: 'numberfield',
                //                                 margin: '0 10 0 10',
                //                                 width: '100%',
                //                                 minValue: 0,
                //                                 value: btn_json["font_size"],
                //                                 listeners: {
                //                                     'change': function(ths, newValue, oldValue, eOpts){
                //                                         var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                //                                         var btn = button_panel.down('#button_panel').el.query('a')[0]
                //                                         btn.style.fontSize = newValue+"px"

                //                                         var btn_json = Ext.decode(button_panel.button_json, true);
                //                                         btn_json['font_size'] = newValue;
                //                                         button_panel.button_json = JSON.stringify(btn_json);
                //                                     }
                //                                 }
                //                             }
                //                         ]
                //                     }
                //                 ]
                //             }
                //         ]

                //     }
                // ],
                listeners: {
                    'tabchange': function(tabPanel, newCard, oldCard, eOpts){
                        var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
                        console.log(newCard);
                        connect_type = Ext.ComponentQuery.query('#login_connect_type')[0]
                        console.log(connect_type);
                        switch(newCard.title){
                            case "Link":
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var link_json = Ext.decode(button_panel.link_json, true);
                                button_panel.trigger_type = "Link"
                                // btn_json["type"] = "Link";
                                // btn_json["active_tab"] = 1;
                                // btn_json["text"] = 'Connect With '+CaptivePortal.util.Utility.capitalizeFirstLetter(local[connect_type.value]);
                                // btn_json["font_size"] = 13;
                                // button_panel.button_json = JSON.stringify(btn_json)

                                newCard.removeAll();
                                newCard.add({
                                    xtype: 'login_link_setting_partial',
                                    link_json: link_json
                                })

                                var stl = 'font-size: '+link_json.font_size+'px;'
                                var htm = '<a style="text-decoration: none;'+stl+'" href="#">'+link_json.text+'</a>'


                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                // var btn = button_panel.down('#button_panel').update('<a style="text-decoration: none;" href="#">Connect With '+CaptivePortal.util.Utility.capitalizeFirstLetter(local[connect_type.value])+'</a>');
                                var btn = button_panel.down('#button_panel').update(htm);
                                break;
                            case "Button":
                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
                                var button_json = Ext.decode(button_panel.button_json, true);
                                button_panel.trigger_type = "Button"

                                var btn_stl = "";
                                if(button_json.connect === 'form'){
                                    // login_button.style.color = "";
                                    // login_button.style.background = "";
                                    btn_stl = 'background: #'+button_json.bg_color+';color: #'+button_json.txt_color+';'
                                }

                                var stl = btn_stl+'border-radius: '+button_json.border_radius+'px'+';font-size: '+button_json.font_size+'px'+';padding: '+button_json.padding_val+'px '+button_json.padding_val*2+'px;';
                                var htm = '<a href="#"><button '+'style="'+stl+'type="button" class="'+button_json.connect+'Btn edtBtn btn-default"><span class="icon"><i class="fa fa-'+local[button_json.connect]+'"></i></span><span class="text" style="margin: 0 5px;">'+button_json.text+'</span></button></a>'

                                // button_json["type"] = "Button";
                                // button_json["active_tab"] = 0;
                                // button_json["text"] = "Login";
                                // button_json["font_size"] = 13;

                                button_panel.button_json = JSON.stringify(button_json)

                                var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                var btn = button_panel.down('#button_panel').update(htm);

                                newCard.removeAll();
                                newCard.add({
                                    xtype: 'login_button_setting_partial',
                                    button_json: button_json
                                })



                                // var str = '<a href="#"><button type="button" class="'+connect_type.value+'Btn edtBtn btn-default"><span style="margin-right: 5px;" class="icon"><i class="fa fa-'+local[connect_type.value]+'"></i></span><span class="text">Login</span></button></a>'
                                
                                // var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
                                // var btn = button_panel.down('#button_panel').update(htm);
                                break;
                        }
                    }
                }
            }
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Login Type'
            //         },
            //         {
            //             xtype: 'combobox',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             allowBlank: false,
            //             name: 'gateway_type',
            //             queryMode: 'local',
            //             itemId: 'gateway_type',
            //             valueField: 'id',
            //             value: this.gateway_type ? this.gateway_type : 'Facebook',
            //             displayField: 'name',
            //             store: 'CaptivePortal.store.editor.LoginButtonTypes',
            //             listeners: {
            //                 'select': function(combo, record, eOpts ){
            //                     var local = {'fb': 'facebook', 'g': 'google', 'tw': 'twitter'}
            //                     console.log("..........select ............");
            //                     console.log(record);
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0];
            //                     var login_button = button_panel.down('#button_panel').el.query('.edtBtn')[0];
            //                     // window.abc = button_panel;
            //                     login_button.className = record.id+'Btn'+' edtBtn btn-default';
            //                     button_panel.down('#button_panel').el.query('i')[0].className = "fa fa-"+local[record.id];

            //                     Ext.ComponentQuery.query("#"+this.up('.login_button_setting').el.down('.btn_text').id)[0].setValue('Login');
            //                     // window.abc = this.up('.login_button_setting');
            //                     // login_button.classList.remove(record.id+'Btn')
            //                     // login_button.classList.remove(record.id+'Btn')
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Text'
            //         },
            //         {
            //             xtype: 'textfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             cls: 'btn_text',
            //             value: btn_json["text"],
            //             listeners: {
            //                 'change': function(){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     button_panel.down('#button_panel').el.query('.text')[0].textContent = this.value
            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['text'] = this.value;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Font Size'
            //         },
            //         {
            //             xtype: 'numberfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             minValue: 0,
            //             value: btn_json["font_size"],
            //             listeners: {
            //                 'change': function(ths, newValue, oldValue, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     btn.style.fontSize = newValue+"px"

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['font_size'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Radius'
            //         },
            //         {
            //             xtype: 'numberfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             minValue: 0,
            //             value: btn_json["border_radius"],
            //             listeners: {
            //                 'change': function(ths, newValue, oldValue, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     btn.style.borderRadius = newValue+"px"

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['border_radius'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // },
            // {
            //     xtype: 'panel',
            //     layout: 'vbox',
            //     width: '100%',
            //     items: [
            //         {
            //             xtype: 'label',
            //             margin: '10 10 10 10',
            //             text: 'Size'
            //         },
            //         {
            //             xtype: 'sliderfield',
            //             margin: '0 10 0 10',
            //             width: '100%',
            //             value: btn_json["padding_val"],
            //             increment: 5,
            //             minValue: 0,
            //             maxValue: 25,
            //             listeners: {
            //                 change: function(slider, newValue, thumb, eOpts){
            //                     var button_panel = Ext.ComponentQuery.query('#'+this.up('.login_button_setting').button_id)[0]
            //                     var btn = button_panel.down('#button_panel').el.query('.edtBtn')[0]
            //                     var newPadding = newValue+"px"+" "+newValue*2+"px"
            //                     btn.style.padding = newPadding

            //                     var btn_json = Ext.decode(button_panel.button_json, true);
            //                     btn_json['padding_val'] = newValue;
            //                     button_panel.button_json = JSON.stringify(btn_json);
            //                 }
            //             }
            //         }
            //     ]
            // }
        ]
        this.callParent(arguments);
    }
});
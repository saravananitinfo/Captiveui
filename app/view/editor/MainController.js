Ext.define("CaptivePortal.view.editor.MainController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.editor_main_controller',
    requires: [
        'CaptivePortal.view.editor.PageSettings',
        'CaptivePortal.view.editor.ButtonWidget',
        'CaptivePortal.view.editor.ThemeCol1',
        'CaptivePortal.view.editor.DropPanel'
    ],
    saveEditorHtml1: function(){
    	var canvas = this.getView().lookupReference('editor_canvas');
    	// console.log(canvas);
    	// window.canvas = canvas;
    	var html = {};
        html["rows"] = [];
        html["style"] = {};
        html["style"]["background"] = canvas.body.dom.style.background;
    	canvas.items.each(function(theme){
    		console.log(theme.xtype);
    		var row = {}
    		row[theme.xtype] = {}
            row[theme.xtype]['background'] = theme.body.dom.style.background;
    		row[theme.xtype]['height'] = theme.height;
    		row[theme.xtype]['blocks'] = [];
    		theme.items.each(function(block){
    			console.log(block.xtype);
                switch(block.xtype){
                    case 'text_widget':
                        var col = {}
                        col[block.xtype] = {
                            text: block.items.getAt(0).el.getHtml()
                        }
                        row[theme.xtype]['blocks'].push(col);
                        break;
                    case 'img_widget':
                        var col = {}
                        col[block.xtype] = {}
                        row[theme.xtype]['blocks'].push(col);
                        break;
                    case 'button_widget':
                        var col = {}
                        col[block.xtype] = Ext.decode(block.button_json)
                        row[theme.xtype]['blocks'].push(col);
                        break;
                    case 'login_button_widget':
                        var col = {}
                        col[block.xtype] = Ext.decode(block.button_json)
                        row[theme.xtype]['blocks'].push(col);
                        break;
                    case 'dropPanel':
                        var col = {}
                        col['empty_block'] = {}
                        row[theme.xtype]['blocks'].push(col);
                        break;
                }
    		});
    		html["rows"].push(row);
    	});
    	console.log(html);
        window.htm = html;
    },
    saveEditorHtml: function(){
        var me = this;
        var canvas = this.getView().lookupReference('editor_canvas');
        // console.log(canvas);
        // window.canvas = canvas;
        var html = {};
        html["rows"] = [];
        html["style"] = {};
        html["style"]["background"] = canvas.body.dom.style.background;
        canvas.items.each(function(theme){
            console.log(theme.xtype);
            var row = {}
            row["col_type"] = theme.xtype
            row['background'] = theme.body.dom.style.background;
            row['height'] = theme.height;
            row['widgets'] = [];
            theme.items.each(function(block){
                console.log(block.xtype);
                console.log(".............."+block.verticle_divide);
                if(block.verticle_divide){
                    console.log("______________");
                    block = block.items.each(function(blc){
                        console.log(",,,,,,,,,,,,,,"+blc.xtype);
                        var col = me.getWidgetJSON(blc);
                        row['widgets'].push(col);
                    });
                }else{
                    var col = me.getWidgetJSON(block);
                    row['widgets'].push(col);
                }
                
            });
            html["rows"].push(row);
        });
        console.log(html);
        window.htm = html;

        this.fireEvent('onSaveSplashTemplate', html);

        return html;
    },
    getWidgetJSON: function(block){
        var col = {}
        switch(block.xtype){
            case 'text_widget':
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = {
                    html_str: block.items.getAt(0).el.getHtml()
                }
                // row['widgets'].push(col);
                break;
            case 'img_widget':
                var img = block.el.query('.img')[0]
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = Ext.decode(block.img_json);
                // {
                //     src: img.src,
                //     height: img.height,
                //     width: img.width
                // }
                // row['widgets'].push(col);
                break;
            case 'button_widget':
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = Ext.decode(block.button_json)
                // row['widgets'].push(col);
                break;
            case 'login_button_widget':
                // var col = {}
                col["widget_type"] = block.xtype
                var json = Ext.decode(block.trigger_type === 'Button' ? block.button_json : block.link_json)
                col["attributes"] = json;
                if(json.connect === 'form'){
                    col["attributes"]["form_fields"] = Ext.decode(block.form_json)
                }
                // row['widgets'].push(col);
                break;
            case 'dropPanel':
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = {}
                // row['widgets'].push(col);
                break;
        }
        return col;
    },
    buildHtml: function(){
        var me = this;
        // var json = {"rows":[{"col_type":"theme_col_1","background":"rgb(253, 251, 248)","height":154,"widgets":[{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa48b736d735e02490000/medium.jpg?1450878088","height":103,"width":124,"top":10,"left":403}}]},{"col_type":"theme_col_1","background":"rgb(249, 249, 249)","height":108,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<div style=\"color: rgb(0, 0, 0); text-align: center;\"><b><font size=\"2\" style=\"color: rgb(51, 153, 102);\">​</font></b></div><div style=\"text-align: center;\"><b><font size=\"6\" color=\"#339966\">Welcome To StarBucks</font></b></div>"}}]},{"col_type":"theme_col_2","background":"rgb(252, 250, 243)","height":204,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<font color=\"#339966\"><font size=\"3\">​Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</font><span style=\"font-size: medium;\">Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</span></font>"}},{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/56794b0d736d735e0c000000/medium.jpg?1450789644","height":161,"width":222,"top":0,"left":106}}]},{"col_type":"theme_col_1","background":"rgb(45, 125, 98)","height":120,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":10,"font_size":18,"txt_color":"","bg_color":"","border_radius":6,"top":19,"left":415}}]}],"style":{"background":"rgb(255, 255, 255)"}}
        var json = {"rows":[{"col_type":"theme_col_2","background":"transparent","height":200,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":5,"font_size":13,"txt_color":"","bg_color":"","border_radius":0,"top":46,"left":251}},{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"tw","text":"Login","url":"https://","padding_val":5,"font_size":13,"txt_color":"","bg_color":"","border_radius":0,"top":68,"left":213}}]},{"col_type":"theme_col_2","background":"transparent","height":200,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"g","text":"Login","url":"https://","padding_val":5,"font_size":13,"txt_color":"","bg_color":"","border_radius":0,"top":64,"left":331}},{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"form","text":"Login","url":"https://","padding_val":5,"font_size":13,"txt_color":"","bg_color":"","border_radius":0,"top":52,"left":193,"form_fields":{"email":{"enable":true,"optional":false},"first_name":{"enable":true,"optional":false},"last_name":{"enable":false,"optional":false},"gender":{"enable":false,"optional":false},"birth_day":{"enable":false,"optional":false},"mobile_number":{"enable":false,"optional":false},"password":{"enable":true,"optional":false},"verify_email":{"enable":true,"optional":true}}}}]},{"col_type":"theme_col_1","background":"transparent","height":200,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Link","connect":"form","text":"Connect With Form","url":"https://","font_size":13,"txt_color":"000000","top":50,"left":50,"form_fields":{"email":{"enable":true,"optional":true},"first_name":{"enable":true,"optional":false},"last_name":{"enable":true,"optional":false},"gender":{"enable":false,"optional":false},"birth_day":{"enable":false,"optional":false},"mobile_number":{"enable":false,"optional":false},"password":{"enable":false,"optional":true},"verify_email":{"enable":false,"optional":false}}}}]}],"style":{"background":"transparent"}};
        var jsn = json;//Ext.decode(json);
        var editor_canvas = Ext.ComponentQuery.query('#editor_canvas')[0];
        editor_canvas.body.dom.style.background = jsn.style.background;
        

        jsn["rows"].forEach(function(row){
            // var key = Object.keys(row)[0];
            switch(row.col_type){
                case 'theme_col_1':
                    editor_canvas.add({
                        xtype: 'theme_col_1',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_2':
                    editor_canvas.add({
                        xtype: 'theme_col_2',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_3':
                    editor_canvas.add({
                        xtype: 'theme_col_3',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
                case 'theme_col_4':
                    editor_canvas.add({
                        xtype: 'theme_col_4',
                        height: row.height,
                        bodyStyle: 'background:'+row.background,
                        items: me.getItems(row)
                    });
                    break;
            }
        });

    },
    getItems: function(row){
        var key = Object.keys(row)[0];
        var items = []
        row.widgets.forEach(function(widget){
            // var key = Object.keys(block)[0]
            switch(widget.widget_type){
                case 'button_widget':
                    items.push({
                        xtype: 'button_widget',
                        button_json: JSON.stringify(widget.attributes)
                    })
                    break;
                case 'login_button_widget':
                    items.push({
                        xtype: 'login_button_widget',
                        button_json: JSON.stringify(widget.attributes)
                    })
                    break;
                case 'text_widget':
                    items.push({
                        xtype: 'text_widget',
                        html_str: widget.attributes.html_str
                    })
                    break;
                case 'img_widget':
                    items.push({
                        xtype: 'img_widget',
                        img_json: widget.attributes
                    })
                    break;
                case 'dropPanel':
                    items.push({
                        xtype: 'dropPanel',
                        cls: "dropPanel",
                        height: '100%',
                        margin: 5
                    })
                    break;
            }
        });
        return items;
    },
    closeEditor: function(){
        var home_panel = Ext.ComponentQuery.query('#pan_apphome')[0];
        home_panel.show();
        Ext.getCmp('viewport').remove(Ext.ComponentQuery.query('editor_main')[0]);
    },
    pageSettings: function(){
        var editor_settings = Ext.ComponentQuery.query('#editor_settings')[0];
        var editor_setting_panel = Ext.ComponentQuery.query('#editor_setting_panel')[0];
        console.log(editor_setting_panel);
        editor_setting_panel.removeAll();
        editor_setting_panel.add({
            xtype: 'page_settings'
        });

        editor_settings.setActiveItem(1)

    },
    preview: function(){
        console.log(this.saveEditorHtml());
        var json = {"splash_content": this.saveEditorHtml()};
        if(json.splash_content.rows.length === 0){
            return
        }
        Ext.getCmp('viewport').setLoading(true);
        console.log(json);
        var url = CaptivePortal.Config.SERVICE_URLS.PREVIEW, method = 'POST';
        CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
            var resObj = response.responseText;
            // if(resObj.success){
                Ext.getCmp('viewport').setLoading(false);
                console.log(resObj);
                var panel = new Ext.panel.Panel({
                    title: 'Preview',
                    floating: true,
                    closable : true,
                    width: '100%',
                    height: '100%',
                    default: '',
                    frame: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'tabpanel',
                        tabBar: {
                            layout: { pack: 'center' }
                        },
                        items:[
                            {
                                title: "Desktop",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: '85%',
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            },
                            {
                                title: "Tab",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: '60%',
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            },
                            {
                                title: "Mobile",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: '25%',
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            }
                        ],
                        listeners:{
                            tabchange: function(tabPanel, newCard, oldCard, eOpts){
                                console.log("...................");
                                var iframe = newCard.el.query('iframe')[0]
                                iframe.contentWindow.document.body.innerHTML = "";
                                iframe.contentWindow.document.write(resObj);
                            }
                        }
                    }],
                    listeners:{
                        afterrender: function(panel){
                            var iframe = panel.down('panel').items.items[0].el.query('iframe')[0]
                            iframe.contentWindow.document.write(resObj);
                            // panel.down('panel').items.items.forEach(function(tab){
                            //     window.tbp = tab
                            //     // var iframe = tab.el.query('iframe')[0]
                            //     // iframe.contentWindow.document.write(resObj);
                            // })
                        }
                    }
                });
                panel.show();
                panel.center();
            // }
        }.bind(this),function(response){
            var resObj = Ext.decode(response.responseText);
            if(!resObj.success && resObj.error.length){
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }          
        },method);
    }
});
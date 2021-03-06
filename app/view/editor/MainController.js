Ext.define("CaptivePortal.view.editor.MainController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.editor_main_controller',
    requires: [
        'CaptivePortal.view.editor.PageSettings',
        'CaptivePortal.view.editor.ButtonWidget',
        'CaptivePortal.view.editor.ThemeCol1',
        'CaptivePortal.view.editor.DropPanel'
    ],
    saveEditorHtml: function(){
        var json = this.getEditorHtml()
        if(json.rows.length === 0){
            return Ext.MessageBox.alert('', 'Please add Content..');
        }
        this.fireEvent('onSaveSplashTemplate', json);
    },
    getEditorHtml: function(){
        var me = this;
        var canvas = this.getView().lookupReference('editor_canvas');
        // console.log(canvas);
        // window.canvas = canvas;
        var html = {};
        html["rows"] = [];
        html["style"] = {};
        html["style"]["background"] = canvas.body.dom.style.background;
        html["verify_email"] = false
        html["verify_mobile_number"] = false

        canvas.items.each(function(theme){
            console.log(theme.xtype);
            var row = {}
            row["col_type"] = theme.xtype
            row['background'] = theme.body.dom.style.background;
            row['height'] = theme.height;// - 36;
            row['widgets'] = [];
            theme.items.each(function(block){
                console.log(block.xtype);
                console.log(".............."+block.verticle_divide);
                if(block.verticle_divide){
                    console.log("______________");
                    block = block.items.each(function(blc){
                        console.log(",,,,,,,,,,,,,,"+blc.xtype);
                        var widgetJSON = me.getWidgetJSON(blc);
                        var col = widgetJSON.col;
                        row['widgets'].push(col);
                        if(widgetJSON.verify_email)
                            html["verify_email"] = widgetJSON.verify_email
                        if(widgetJSON.verify_mobile_number)
                            html["verify_mobile_number"] = widgetJSON.verify_mobile_number
                    });
                }else{
                    var widgetJSON = me.getWidgetJSON(block);
                    var col = widgetJSON.col;
                    row['widgets'].push(col);
                    
                    if(widgetJSON.verify_email)
                        html["verify_email"] = widgetJSON.verify_email
                    if(widgetJSON.verify_mobile_number)
                        html["verify_mobile_number"] = widgetJSON.verify_mobile_number
                }
                
            });
            html["rows"].push(row);
        });
        console.log(html);
        window.htm = html;

        // this.fireEvent('onSaveSplashTemplate', html);

        return html;
    },
    getWidgetJSON: function(block){
        var col = {};
        var verify_email = false;
        var verify_mobile_number = false;
        switch(block.xtype){
            case 'text_widget':
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = {
                    html_str: block.items.getAt(0).el.getHtml()
                }
                // row['widgets'].push(col);
                break;
            case 'html_widget':
                col["widget_type"] = block.xtype
                col["attributes"] = {
                    html_str: block.items.getAt(0).el.getHtml()
                }
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
                    var form_json  = Ext.decode(block.form_json)
                    col["attributes"]["form_fields"] = form_json
                    if(form_json.verify_email.enable === true){
                        verify_email = true
                    }
                    if(form_json.verify_mobile_number.enable === true){
                        verify_mobile_number = true
                    }
                }
                // row['widgets'].push(col);
                break;
            case'login_form_widget':
                col["widget_type"] = block.xtype
                col["attributes"] = {};
                break;
            case 'dropPanel':
                // var col = {}
                col["widget_type"] = block.xtype
                col["attributes"] = {}
                // row['widgets'].push(col);
                break;
        }
        var ret  = {col: col}
        if(verify_email === true)
            ret['verify_email'] = verify_email
        if(verify_mobile_number === true)
            ret['verify_mobile_number'] = verify_mobile_number
        return ret
        // return {
        //          col: col,
        //          verify_email: verify_email,
        //          verify_mobile_number: verify_mobile_number
        //         }
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
    preview1: function(){
        var json = {"splash_content": this.getEditorHtml()};
        // if(!json.splash_content.hasOwnProperty('rows')){
        //     return Ext.MessageBox.alert('', 'Please add Content..');
        // }
        // if(json.splash_content.rows.length === 0){
        //     return Ext.MessageBox.alert('', 'Please add Content..');
        // }
        Ext.getCmp('viewport').setLoading(true);
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
                                    width: 768,
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
                                    width: 320,
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
    },
    preview: function(){
        var json = {"splash_content": this.getEditorHtml()};
        Ext.getCmp('viewport').setLoading(true);
        var url = CaptivePortal.Config.SERVICE_URLS.PREVIEW, method = 'POST';
        CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
            var resObj = response.responseText;
            CaptivePortal.util.Utility.createPreviewPage(resObj);
        }.bind(this),function(response){
            var resObj = Ext.decode(response.responseText);
            if(!resObj.success && resObj.error.length){
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }          
        },method);
    }
});
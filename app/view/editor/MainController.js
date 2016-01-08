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
        this.fireEvent('onSaveSplashTemplate', this.getEditorHtml());
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
        canvas.items.each(function(theme){
            console.log(theme.xtype);
            var row = {}
            row["col_type"] = theme.xtype
            row['background'] = theme.body.dom.style.background;
            row['height'] = theme.height - 36;
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

        // this.fireEvent('onSaveSplashTemplate', html);

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
        var json = {"splash_content": this.getEditorHtml()};
        if(json.splash_content.rows.length === 0){
            return
        }
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
                                    width: 786,
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
    }
});
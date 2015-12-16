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
                switch(block.xtype){
                    case 'text_widget':
                        var col = {}
                        col["widget_type"] = block.xtype
                        col["attributes"] = {
                            html_str: block.items.getAt(0).el.getHtml()
                        }
                        row['widgets'].push(col);
                        break;
                    case 'img_widget':
                        var col = {}
                        col["widget_type"] = block.xtype
                        col["attributes"] = {}
                        row['widgets'].push(col);
                        break;
                    case 'button_widget':
                        var col = {}
                        col["widget_type"] = block.xtype
                        col["attributes"] = Ext.decode(block.button_json)
                        row['widgets'].push(col);
                        break;
                    case 'login_button_widget':
                        var col = {}
                        col["widget_type"] = block.xtype
                        col["attributes"] = Ext.decode(block.button_json)
                        row['widgets'].push(col);
                        break;
                    case 'dropPanel':
                        var col = {}
                        col["widget_type"] = block.xtype
                        col["attributes"] = {}
                        row['widgets'].push(col);
                        break;
                }
            });
            html["rows"].push(row);
        });
        console.log(html);
        window.htm = html;
    },
    buildHtml: function(){
        var me = this;
        var json = {"rows":[{"col_type":"theme_col_3","background":"rgb(79, 79, 79)","height":185,"widgets":[{"widget_type":"button_widget","attributes":{"text":"FB Login","url":"https://facebook.com","padding_val":15,"font_size":18,"txt_color":"969696","bg_color":"000080","border_radius":15,"top":47,"left":80}},{"widget_type":"login_button_widget","attributes":{"type":"Button","text":"Login","url":"https://","padding_val":15,"font_size":15,"txt_color":"","bg_color":"","border_radius":16,"top":53,"left":92,"connect":"tw"}},{"widget_type":"dropPanel","attributes":{}}]},{"col_type":"theme_col_1","background":"rgb(71, 71, 71)","height":116,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<div style=\"text-align: center;\"><b style=\"color: rgb(51, 153, 102); font-size: xx-large;\"><br></b></div><div style=\"text-align: center;\"><b style=\"color: rgb(51, 153, 102); font-size: xx-large;\">Welcome</b></div>"}}]},{"col_type":"theme_col_2","background":"transparent","height":200,"widgets":[{"widget_type":"dropPanel","attributes":{}},{"widget_type":"login_button_widget","attributes":{"type":"Link","connect":"fb","text":"Cnnt With FB","url":"https://","padding_val":5,"font_size":22,"txt_color":"","bg_color":"","border_radius":0,"top":69,"left":158,"active_tab":1}}]}],"style":{"background":"rgb(51, 153, 102)"}}
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
                        xtype: 'img_widget'
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
    	console.log("........closeEditor.........");
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

    }
});
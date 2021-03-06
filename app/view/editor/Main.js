Ext.define('CaptivePortal.view.editor.Main', {
    extend: 'Ext.Panel',
    requires: [
        'CaptivePortal.view.editor.DragPanel',
        'CaptivePortal.view.editor.DropPanel',
        'CaptivePortal.view.editor.MainController',
        'CaptivePortal.view.editor.EditorButtonSetting'
    ],
    alias: 'widget.editor_main',
    layout: 'hbox',
    controller: 'editor_main_controller',
    cls: "speditor",
    header: {
        cls: "editor_top_panel",
        items: [{
                xtype: 'button',
                text: 'Preview',
                handler: 'preview'
            }, {
                xtype: 'button',
                text: 'Page Setting',
                cls: "",
                align: "left",
                margin: '0 0 0 5',
                handler: "pageSettings"
            }, {
                xtype: 'button',
                text: 'Save',
                margin: '0 0 0 5',
                cls: "btn",
                handler: "saveEditorHtml"
            }, {
                xtype: 'button',
                text: 'Cancel',
                margin: '0 0 0 5',
                cls: "btn btn-cancel",
                handler: 'closeEditor'
            }]
    },
    initComponent: function () {
        this.title = this.template_name;
        this.items = [
            // {
            // 	xtype: "dragPanel",
            // 	width: '5%',
            // 	height: '100%',
            // 	itemId: "editor_widgets",
            // 	itemSelector: "div.dragItem",
            // 	ddGroup:"widgetGroup",
            // 	height: '100%',
            // 	dataA: [{widgetDesc: "text_widget"},{widgetDesc: "img_widget"},{widgetDesc: "button_widget"},{widgetDesc: "login_button_widget"}],
            // 	customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {widgetDesc}" data-qtip="{widgetDesc}">',"</div>","</div>","</tpl>"]

            // },
            {
                xtype: "dropPanel",
                ddGroup: "themeGroup",
                style: 'border: 0px solid rgb(151, 173, 194);',
                margin: '15 0 0 0',
                reference: 'editor_canvas',
                width: '77%',
                height: '100%',
                layout: "vbox",
                itemId: "editor_canvas",
                page_data: '{background: "ffffff"}',
                scrollable: 'y',
                defaults: {
                    reorderable: true
                },
                plugins: Ext.create('Ext.ux.BoxReorderer', {
                    // itemSelector: '.sort_item'
                })

            },
            {
                xtype: 'panel',
                layout: 'card',
                width: '23%',
                itemId: "editor_settings",
                height: '100%',
                style: 'box-shadow: rgb(206, 206, 206) 0px -1px 5px 0px;',
                items: [
                    {
                        xtype: 'tabpanel',
                        cls: "editor_side_panel_header",
                        bodyCls: "editor_side_panel_body",
                        items:
                                [
                                    {
                                        title: "Select Section",
                                        items: [
                                            {
                                                xtype: 'panel',
                                                layout: {
                                                    type: 'accordion',
                                                    animate: {
                                                        duration: 5000
                                                    }
                                                },
                                                items: [
                                                    {
                                                        title: 'Sections',
                                                        items: [
                                                            {
                                                                xtype: "dragPanel",
                                                                title: 'akshay',
                                                                itemSelector: "div.dragItem",
                                                                ddGroup: "themeGroup",
                                                                width: '100%',
                                                                overflowY: "auto",
                                                                dataA: [{dragData: "theme_col_1", themeDesc: "Theme Column 1", cls: "sec sec_1"}, {dragData: "theme_col_2", themeDesc: "Theme Column 2", cls: "sec sec_2"}, {dragData: "theme_col_3", themeDesc: "Theme Column 3", cls: "sec sec_3"}, {dragData: "theme_col_4", themeDesc: "Theme Column 4", cls: "sec sec_4"}, {dragData: "theme_col_2_left_vbox", themeDesc: "Theme Column 2 Left Vbox", cls: "sec sec_5"}, {dragData: "theme_col_2_right_vbox", themeDesc: "Theme Column 2 Left Vbox", cls: "sec sec_6"}],
                                                                customTpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="dragImage {themeDesc} {cls}" data-drag="{dragData}" data-qtip="{themeDesc}">', "</div>", "</div>", "</tpl>"]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        title: 'Modules',
                                                        layout: 'vbox',
                                                        width: '100%',
                                                        items: [
                                                            {
                                                                xtype: 'label',
                                                                margin: '10 10 10 10',
                                                                text: 'Templates'
                                                            },
                                                            {
                                                                xtype: 'dragPanel',
                                                                ddGroup: "themeGroup",
                                                                pre_filled_sec: true,
                                                                width: '100%',
                                                                margin: '10 0 0 0',
                                                                overflowY: "auto",
                                                                itemSelector: "div.dragItem",
                                                                dataA: [{name: 'template1', cls: "sec pre-created-sec1"}, {name: 'template2', cls: "sec pre-created-sec2"}, {name: 'template3', cls: "sec pre-created-sec3"}, {name: 'template4', cls: "sec pre-created-sec4"}, {name: 'template5', cls: "sec pre-created-sec5"}],
                                                                customTpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="template_img dragImage {name} {cls}" data-name="{name}" data-drag="{name}" data-qtip="{name}">', "</div>", "</div>", "</tpl>"],
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        title: "Select Widget",
                                        items: [{
                                                xtype: "dragPanel",
                                                // width: '5%',
                                                width: '100%',
                                                height: '100%',
                                                itemId: "editor_widgets",
                                                itemSelector: "div.dragItem",
                                                ddGroup: "widgetGroup",
                                                // height: '100%',
                                                dataA: [{dragData: "text_widget", widgetDesc: "Text", cls: "icon_txt", widgetType: "text_widget"}, {dragData: "img_widget", widgetDesc: "Image", cls: "icon_img", widgetType: "img_widget"}, {dragData: "button_widget", widgetDesc: "Button", cls: "icon_btn", widgetType: "button_widget"}, {dragData: "login_button_widget", widgetDesc: "Login Button", cls: "icon_btn_login", widgetType: "login_button_widget"}, {dragData: "html_widget", widgetDesc: "Html Editor", cls: "icon_html", widgetType: "html_widget"}, {dragData: "login_form_widget", widgetDesc: "Login Form", cls: "icon_login_form", widgetType: "login_form_widget"}],
                                                customTpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="dragImage {widgetType} {cls}" data-drag="{dragData}" data-qtip="{widgetDesc}">', "</div>", "</div>", "</tpl>"]
                                            }]
                                    }

                                ]


                    },
                    {
                        xtype: 'panel',
                        itemId: "editor_setting_panel",
                        bodyCls: 'editor_setting_panel'
                    }
                ]

            }
            // {
            // 	xtype: "dragPanel",
            // 	itemSelector: "div.dragItem",
            // 	ddGroup:"themeGroup",
            // 	width: '25%',
            // 	height: '100%',
            // 	itemId: "editor_setting_panel",
            // 	overflowY: "auto",
            // 	dataA: [{themeDesc: "theme_col_1"},{themeDesc: "theme_col_2"},{themeDesc: "theme_col_3"},{themeDesc: "theme_col_4"}],
            // 	customTpl:['<tpl for=".">','<div class="dragItem">','<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">',"</div>","</div>","</tpl>"]
            // 	// tpl: ['<tpl for=".">', '<div class="dragItem">', '<div class="dragImage {themeDesc}" data-qtip="{themeDesc}">', "</div>", "</div>", "</tpl>"]

            // }
        ]
        this.callParent(arguments);
    },
    listeners: {
        afterrender: function () {
            console.log("...........call");
        }
    }
});

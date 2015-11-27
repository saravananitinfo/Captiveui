Ext.define('CaptivePortal.view.contentbuilder.themes.Theme2', {
    extend: 'Ext.panel.Panel',
    xtype: 'contentbuildertheme2',
    columnWidth: 1,
    border: true,
    height: 100,
    layout: "vbox",
    cls: "themePanel theme2",
    resizable:true,
    defaults: {
        ddGroup: "widgetGroup",
        width: "100%",
        flex: 1,
        margin: 5
    },
    items: [{
        xtype: "panel",
        reference: "panel_1",
        cls: "dropPanel panel1",
        html: 'id 2.1',
        columnWidth: 1,
        border: true
    }, {
        xtype: "panel",
        reference: "panel_2",
        cls: "dropPanel panel2",
        html: 'id 2.2',
        columnWidth: 1,
        border: true
    }]
});
    
Ext.define("CaptivePortal.view.editor.DropPanel",{
	extend: 'Ext.panel.Panel',
    requires: [
        'CaptivePortal.view.editor.DropPanelViewController'
    ],
    alias: 'widget.dropPanel',
    controller: "dropPanel",
    listeners: {
        render: "onRender"
    },
    layout: "fit",
    style: "border: 1px dashed #d6dfeb"
});
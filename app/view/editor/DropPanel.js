Ext.define("CaptivePortal.view.editor.DropPanel",{
	extend: 'Ext.Panel',
    requires: [
        'CaptivePortal.view.editor.DropPanelViewController'
    ],
    alias: 'widget.dropPanel',
    controller: "dropPanel",
    listeners: {
        render: "onRender"
    },  
    // style: "border: 1px dashed #03142a"

    // style: "border:onBoxReady 1px dashed #d6dfeb" // original
    style: 'border: 1px dashed #03142a;background: transparent',

    bodyStyle: "background: transparent"
});
Ext.define("CaptivePortal.view.editor.DragPanel",{
	extend: 'Ext.view.View',
    requires: [
        'CaptivePortal.view.editor.DragPanelViewController'
    ],
    alias: 'widget.dragPanel',
    controller: "dragPanel",
    listeners: {
        render: "onRender"
    },
	initComponent: function() {
        Ext.apply(this, {
            // store: Ext.getStore(this.storeName),
            data: this.dataA,
            itemSelector: "div.dragItem",
            singleSelect: true,
            cls: "dragPanel",
            overflowY: "auto",
            tpl: this.customTpl
        });
        // Ext.view.View.prototype.initComponent.call(this);
        this.callParent(arguments);
    }
});
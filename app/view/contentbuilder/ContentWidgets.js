Ext.define('CaptivePortal.view.contentbuilder.ContentWidgets', {
    extend: 'Ext.view.View',
    alias: 'widget.contentwidgets',
    store: 'Template',
    itemSelector: 'div.thumb-wrap',
    padding: 13,
    tpl: new Ext.XTemplate(
            '<tpl for=".">',
            '<div style="margin-bottom: 10px;cursor: move;margin: 0 10px 12px 0;" class="thumb-wrap">',
            '<img style = "width:100%" src="{imgsrc}" />',
            '</div>',
            '</tpl>'
            ),
    listeners: {
        render: function (dataview) {
            console.log("hereheher")
            dataview.dragZone = Ext.create('Ext.dd.DragZone', dataview.getEl(), {
                ddGroup: 'widgetGroup',
                getDragData: function (e) {
                    var sourceEl = e.getTarget(dataview.itemSelector, 10), d;
                    if (sourceEl) {
                        d = sourceEl.cloneNode(true);
                        d.id = Ext.id();
                        return (dataview.dragData = {
                            sourceEl: sourceEl,
                            repairXY: Ext.fly(sourceEl).getXY(),
                            ddel: d,
                            groupName: 'widgetGroup',
                            dragData: dataview.getRecord(sourceEl),
                            componentData: dataview.getRecord(sourceEl).data
                        });
                    }
                },
                getRepairXY: function () {
                    return this.dragData.repairXY;
                }
            });
        }
    }
})

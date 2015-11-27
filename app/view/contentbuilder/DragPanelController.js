Ext.define('CaptivePortal.view.contentbuilder.DragPanelController',{
    extend:'Ext.app.ViewController',
    alias:'controller.dragPanel',
      onRender: function(b) {
        b.dragZone = Ext.create("Ext.dd.DragZone", b.getEl(), {
            ddGroup: b.ddGroup,
            getDragData: function(e) {
                var a = e.getTarget(b.itemSelector, 10),
                    d;
                if (a) {
                    d = a.cloneNode(true);
                    d.id = Ext.id();
                    return b.dragData = {
                        groupName: this.ddGroup,
                        dragData: b.getRecord(a),
                        sourceEl: a,
                        repairXY: Ext.fly(a).getXY(),
                        ddel: d
                    }
                }
            },
            getRepairXY: function() {
                return this.dragData.repairXY
            }
        })
    }
});
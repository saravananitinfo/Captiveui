Ext.define("CaptivePortal.view.editor.DragPanelViewController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.dragPanel',
	onRender: function(b) {
        b.dragZone = Ext.create("Ext.dd.DragZone", b.getEl(), {
            ddGroup: b.ddGroup,
            getDragData: function(e) {
            	console.log("......getDragData"+this.ddGroup);
                // var a = e.getTarget(b.itemSelector, 10),
                //     d;
                //     console.log(a);
                //     console.log(b.getRecord(a));
                // if (a) {
                // 	console.log("...............me");
                //     d = a.cloneNode(true);
                //     d.id = Ext.id();
                //     return b.dragData = {
                //         groupName: this.ddGroup,
                //         dragData: b.getRecord(a),
                //         sourceEl: a,
                //         repairXY: Ext.fly(a).getXY(),
                //         ddel: d
                //     }
                // }

                var a = e.getTarget(b.itemSelector, 10),
                    d;
                    // console.log(a);
                    // console.log(b.getRecord(a));
                if (a) {
                    d = a.cloneNode(true);
                    d.id = Ext.id();
                    return b.dragData = {
                        groupName: this.ddGroup,
                        dragData: Ext.getDom(e.getTarget()).getAttribute('data-qtip'),
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
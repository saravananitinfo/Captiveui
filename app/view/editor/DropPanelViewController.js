Ext.define("CaptivePortal.view.editor.DropPanelViewController",{
	extend: 'Ext.app.ViewController',
	alias: 'controller.dropPanel',
	onRender: function(d) {
        var c = new Ext.dd.DropTarget(this.getView().el, {
            ddGroup: d.ddGroup
        });
        c.dataView = this.getView();
        c.notifyDrop = this.notifyDrop;
        c.notifyEnter = this.notifyEnter;
        c.onInvalidDrop = this.onInvalidDrop;
        c.getChart = this.getChart
    },
    notifyDrop: function(m, o, n) {
        console.log(".........notifyDrop..........");
        console.log(m);
        console.log(o);
        console.log(n);
        var p = this,
            l = n.groupName;
        p.dataView.removeAll();
        if (l === "themeGroup") {
            var h = n.dragData.id;
            var j = p.dataView.add({
                xtype: h
            });
            j.up("dropPanel").controller.lookupReference("durationButtonsPanel").show()
        } else {
            if (l === "widgetGroup") {
                var p = this;
                p.dataView.add(p.getChart(n.dragData.data));
                p.dataView.setStyle("border-style", "solid", "important")
            } else {
                console.log("Invalid Drop. The grouping of the drag/drop item is not valid.")
            }
        }
    },
    notifyEnter: function() {
        console.log("Drop item entered");
    },
    onInvalidDrop: function() {
        console.log("Invalid drop");
    },
    getChart: function(u) {
        var y = {},
            x = u.filters,
            o, n, w, p, r = false,
            s = false,
            t = false,
            v = false;
        if (x) {
            for (i = 0; i < x.length; i++) {
                if (x[i].name === "wlan") {
                    o = x[i] ? x[i] : null;
                    r = o ? !o.hide : true
                } else {
                    if (x[i].name === "band") {
                        n = x[i] ? x[i] : null;
                        s = n ? !n.hide : true
                    } else {
                        if (x[i].name === "duration") {
                            w = x[i] ? x[i] : null;
                            t = w ? !w.hide : true
                        } else {
                            if (x[i].name === "type") {
                                p = x[i] ? x[i] : null;
                                v = p ? !p.hide : true
                            }
                        }
                    }
                }
            }
        }
        if (u.type === "graph") {
            y = {
                widget: true,
                value: u.id,
                xtype: "chartSeries",
                chartTitle: u.name,
                treeDep: u.navdep,
                searchLevel: u.level,
                chartRoute: u.route,
                showFilter: false,
                showClose: true,
                showResize: true,
                showLegend: false,
                tooltipText: u.description,
                details: u.details,
                filters: u.filters,
                liveChart: u.liveChart
            }
        } else {
            if (u.type == "grid") {
                y = {
                    widget: true,
                    value: u.id,
                    xtype: "gridComponent",
                    chartTitle: u.name,
                    treeDep: u.navdep,
                    searchLevel: u.level,
                    chartRoute: u.route,
                    showFilter: false,
                    showClose: true,
                    showResize: true,
                    showLegend: false,
                    tooltipText: u.description,
                    details: u.details,
                    filters: u.filters
                }
            } else {
                if (u.type == "grid-graph") {
                    y = {
                        widget: true,
                        value: u.id,
                        xtype: "gridGraphComponent",
                        chartTitle: u.name,
                        treeDep: u.navdep,
                        searchLevel: u.level,
                        chartRoute: u.route,
                        showFilter: false,
                        showClose: true,
                        showResize: true,
                        showLegend: false,
                        tooltipText: u.description,
                        details: u.details,
                        filters: u.filters
                    }
                } else {
                    if (u.type == "timeline") {
                        y = {
                            widget: true,
                            value: u.id,
                            xtype: "timelineComponent",
                            chartTitle: u.name,
                            treeDep: u.navdep,
                            searchLevel: u.level,
                            chartRoute: u.route,
                            showFilter: false,
                            showClose: true,
                            showResize: true,
                            showLegend: false,
                            tooltipText: u.description,
                            details: u.details,
                            filters: u.filters
                        }
                    } else {
                        console.log("The widget type is not defined")
                    }
                }
            }
        }
        return y
    }
});
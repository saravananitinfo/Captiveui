/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CaptivePortal.view.contentbuilder.Main', {
    extend: 'Ext.container.Container',
    requires: ['CaptivePortal.view.contentbuilder.Templates'],
    xtype: 'contentbuilder',
    layout: {
        type: 'border'
    },
    items: [{
            xtype: 'panel',
            bodyStyle: 'background:rgb(215, 215, 215) !important;',
            border: false,
            layout: 'fit',
            region: 'east',
            width: 300,
            split: false,
            items: [{
                    xtype: 'contenttemplate',
                    padding: 13
                }]
        }, {
            region: 'center',
            border: false,
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            height: '100%',
            width: '100%',
            bodyStyle: 'background:rgb(238, 238, 238)',
            items: [{
                    xtype: 'panel',
                    width: '90%',
                    margin: 50,
                    height: '100%',
                    bodyStyle: 'background:white;zoom: 0.88;border-radius: 8px;padding: 40px 30px;',
                    maxWidth: 980,
                    layout: 'column',
                    scrollable: true,
                    minHeight: 100,
                    listeners: {
                        render: function (panel) {
                            var me = this;
//                            panel.dropTarget = new Ext.dd.DropTarget(panel.el, {
//                                containerScroll: true,
//                                ddGroup: 's',
//                                notifyOver: function (dd, e, data) {
//                                    var me = this,
//                                            xy = e.getXY();
//                                    me.scrollPos = panel.body.getScroll();
//                                },
//                                notifyDrop: function (dd, e, data) {
//                                    if (data.componentData.id == 1) {
//                                        panel.insert(1, {
//                                            xtype: 'panel',
//                                            columnWidth: 1,
//                                            border: true,
//                                            margin: 10,
//                                            height: 100,
//                                            width: '100%',
//                                            html: 'id 1'
//                                        })
//                                    } else {
//                                        panel.insert(0, {
//                                            xtype: 'panel',
//                                            columnWidth: 1,
//                                            border: true,
//                                            margin: 10,
//                                            height: 100,
//                                            width: '100%',
//                                            html: 'id 2'
//                                        })
//                                    }
//                                }
//                                ,
//                                // internal cache of body and column coords
//                                getGrid: function () {
//
//                                }
//                                // unregister the dropzone from ScrollManager
//
//                            })
                            panel.dropZone = new Ext.dd.DropZone(panel.el, {
                                ddGroup: 's',
                                getTargetFromEvent: function (e) {
                                    return e.getTarget('.x-panel-body');
                                },
                                onNodeEnter: function (target, dd, e, data) {
                                    // console.log(target, dd, e, data)
                                    Ext.fly(target).addCls('hospital-target');
                                    console.log('onNodeEner')
                                },
                                onNodeOut: function (target, dd, e, data) {
                                    Ext.fly(target).removeCls('hospital-target');
                                    //console.log('onNodeOut')
                                },
                                notifyOver: function (source, e, data) {
                                    console.log(source)
                                    panel.scrollTo(source.startPageX, source.startPageY, true);
                                },
                                onNodeOver: function (target, dd, e, data) {
                                    proto = Ext.dd.DropZone.prototype;
                                    console.log('onNodeOver')
                                    console.log(e)
                                    return proto.dropAllowed
                                },
                                onNodeDrop: function (target, dd, e, data) {
                                    // console.log(target, dd, e, data);
                                    console.log('onNodeDrop')
                                    if (data.componentData.id == 1) {
                                        panel.insert(1, {
                                            xtype: 'panel',
                                            columnWidth: 1,
                                            border: true,
                                            margin: 10,
                                            height: 100,
                                            width: '100%',
                                            html: 'id 1'
                                        })
                                    } else {
                                        panel.insert(0, {
                                            xtype: 'panel',
                                            columnWidth: 1,
                                            border: true,
                                            margin: 10,
                                            height: 100,
                                            width: '100%',
                                            html: 'id 2'
                                        })
                                    }

                                }
                            })
                        }
                    }
                }]
        }]
});

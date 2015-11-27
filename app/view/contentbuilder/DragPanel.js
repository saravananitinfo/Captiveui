/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('CaptivePortal.view.contentbuilder.DragPanel', {
    extend: 'Ext.view.View',
    requires:[
      'CaptivePortal.view.contentbuilder.DragPanelController'],
      xtype: 'dragPanel',
      controller:"dragPanel",
      listeners:{render:"onRender"},
      initComponent:function(){
      		Ext.apply(this,{store:Ext.getStore(this.storeName),itemSelector:"div.dragItem",singleSelect:true,cls:"dragPanel",overflowY:"auto",tpl:this.customTpl});

      	 this.callParent();
    }

});



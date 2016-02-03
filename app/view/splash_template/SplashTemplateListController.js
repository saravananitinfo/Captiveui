Ext.define('CaptivePortal.view.splash_template.SplashTemplateListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.splash_template_list_controller',
    splashTemplateItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadSplashTemplateRec', 1, record.data.id);
            } else if (action == "delete"){
                this.deleteSplashJorney(view, record, item, index, e, eOpts);
            } else if (action == "duplicate"){                
                this.duplicateTemplate(view, record, item, index, e, eOpts);
            } else if (action == "preview"){
                this.preview(view, record, item, index, e, eOpts)
            }
        }
    },
    deleteSplashJorney: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Template',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SPLASH_TEMPLATES + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            me.getSplashTemplateList();
                            me.fireEvent('setSplashPageActiveItem',0);
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    duplicateTemplate: function(view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Duplicate Template',
            message: 'Do you want to create copy?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DUPLICATE_SPLASH_TEMPLATE + record.data.id + '/duplicate_template.json';
                    CaptivePortal.util.Utility.doAjax(url, {save: "yes"}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            console.log("..................akshy");
                            console.log(resObj);
                            me.getSplashTemplateList();
                            me.fireEvent('setSplashPageActiveItem',0);
                        }
                    }.bind(this), function (response) {
                    }, 'GET');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addSplashTemplate: function(){
        // this.fireEvent('setSplashPageActiveItem',1);
        this.fireEvent('showSplashTemplateForm',1)
    },
    getSplashTemplateList: function(){
        var store = this.getView().lookupReference('grd_splash_template_list').getStore();
        store.load();
    },
    preview1: function(view, record, item, index, e, eOpts){
        var store = Ext.StoreManager.lookup('CaptivePortal.store.splash_template.SplashTemplates');
        var index = store.findExact('id', record.data.id);
        var splash_content = store.getAt(index).data.splash_content;

        console.log(splash_content);
        var json = {"splash_content": splash_content};
        if(!json.splash_content.hasOwnProperty('rows')){
            return Ext.MessageBox.alert('', 'Please add Content..');
        }
        if(json.splash_content.rows.length === 0){
            return Ext.MessageBox.alert('', 'Please add Content..');
        }
        Ext.getCmp('viewport').setLoading(true);
        console.log(json);
        var url = CaptivePortal.Config.SERVICE_URLS.PREVIEW, method = 'POST';
        CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
            var resObj = response.responseText;
            // if(resObj.success){
                Ext.getCmp('viewport').setLoading(false);
                console.log(resObj);
                var panel = new Ext.panel.Panel({
                    title: 'Preview',
                    floating: true,
                    closable : true,
                    width: '100%',
                    height: '100%',
                    default: '',
                    frame: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'tabpanel',
                        tabBar: {
                            layout: { pack: 'center' }
                        },
                        items:[
                            {
                                title: "Desktop",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: '85%',
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            },
                            {
                                title: "Tab",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: 786,
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            },
                            {
                                title: "Mobile",
                                height: '100%',
                                items: [{
                                    xtype: 'component',
                                    style: 'margin: 0 auto;',
                                    width: 320,
                                    height: '100%',
                                    html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'
                                }]
                            }
                        ],
                        listeners:{
                            tabchange: function(tabPanel, newCard, oldCard, eOpts){
                                console.log("...................");
                                var iframe = newCard.el.query('iframe')[0]
                                iframe.contentWindow.document.body.innerHTML = "";
                                iframe.contentWindow.document.write(resObj);
                            }
                        }
                    }],
                    listeners:{
                        afterrender: function(panel){
                            var iframe = panel.down('panel').items.items[0].el.query('iframe')[0]
                            iframe.contentWindow.document.write(resObj);
                            // panel.down('panel').items.items.forEach(function(tab){
                            //     window.tbp = tab
                            //     // var iframe = tab.el.query('iframe')[0]
                            //     // iframe.contentWindow.document.write(resObj);
                            // })
                        }
                    }
                });
                panel.show();
                panel.center();
            // }
        }.bind(this),function(response){
            var resObj = Ext.decode(response.responseText);
            if(!resObj.success && resObj.error.length){
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }          
        },method);
    },
    preview: function(view, record, item, index, e, eOpts){
        var store = Ext.StoreManager.lookup('CaptivePortal.store.splash_template.SplashTemplates');
        var index = store.findExact('id', record.data.id);
        var splash_content = store.getAt(index).data.splash_content;

        console.log(splash_content);
        var json = {"splash_content": splash_content};
        if(!json.splash_content.hasOwnProperty('rows')){
            return Ext.MessageBox.alert('', 'Please add Content..');
        }
        if(json.splash_content.rows.length === 0){
            return Ext.MessageBox.alert('', 'Please add Content..');
        }
        Ext.getCmp('viewport').setLoading(true);
        console.log(json);
        var url = CaptivePortal.Config.SERVICE_URLS.PREVIEW, method = 'POST';
        CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
            var resObj = response.responseText;
            // if(resObj.success){
                Ext.getCmp('viewport').setLoading(false);
                console.log(resObj);
                var panel = new Ext.panel.Panel({
                    title: 'Preview',
                    floating: true,
                    closable : true,
                    width: '100%',
                    height: '100%',
                    default: '',
                    frame: true,
                    layout: 'fit',
                    items: [{
                        xtype: 'panel',
                        html: '<iframe style="width: 100%;height: 100%;border: none;"></iframe>'

                    }],
                    listeners:{
                        afterrender: function(panel){
                            // var iframe = panel.down('panel').items.items[0].el.query('iframe')[0]
                            var iframe = panel.items.items[0].el.query('iframe')[0]
                            iframe.src = "/preview.html"
                            iframe.onload = function(){
                                var inside_iframe = iframe.contentWindow.document.getElementsByTagName('iframe')[0]
                                inside_iframe.contentWindow.document.write(resObj);
                            }
                            window.abc = iframe;
                            // iframe.contentWindow.document.write(resObj);
                            // panel.down('panel').items.items.forEach(function(tab){
                            //     window.tbp = tab
                            //     // var iframe = tab.el.query('iframe')[0]
                            //     // iframe.contentWindow.document.write(resObj);
                            // })
                        }
                    }
                });
                panel.show();
                panel.center();
            // }
        }.bind(this),function(response){
            var resObj = Ext.decode(response.responseText);
            if(!resObj.success && resObj.error.length){
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }          
        },method);
    }
});
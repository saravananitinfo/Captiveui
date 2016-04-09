Ext.define('CaptivePortal.view.sites.AddOrEditSiteController', {
    extend: 'Ext.app.ViewController',
    id: 'vc_sitecontroller',
    alias: 'controller.sitecontroller',
    config:{
        modelData:null
    },
    listen: {
        controller: {
            '#vc_sitelistcontroller': {
                loadStore: 'setStoreEvent'
            }
        },
        component: {
            'combobox#country': {
                select: 'onConutrySelect'
            }
            
        }
    }, 
    onConutrySelect:function(cmb,record){
       var me =this;      
         CaptivePortal.util.Utility.appLoadMask('Please Wait', Ext.getCmp('viewport'), true);
        var combo = this.getView().lookupReference('cmb_state');
        combo.clearValue();       
        var store = Ext.create('CaptivePortal.store.site.State');
        store.setProxy({
            url: CaptivePortal.Config.SERVICE_URLS.GET_STATES + record.data.id + '.json',
            type: 'ajax',
            reader: {
                type: 'json',
                rootProperty: 'data.states'
            }
        });       
        store.load({
            callback:function(){  
            combo.bindStore(store)              
                CaptivePortal.util.Utility.appLoadMask(null, null, false);                
            }
        });
    },   
    changeTenant: function (field, newValue, oldValue) {
        if (newValue) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_TAGS_FOR_TENANT + newValue + '/get_tags.json', {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var store = Ext.create('Ext.data.Store', {
                        fields: ['id', 'name'],
                        data: resObj.data.site_tags
                    });
                    this.getView().lookupReference('tf_tag').reset();
                    this.getView().lookupReference('tf_tag').bindStore(store);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, 'GET', false);
        }
    },
    setStoreEvent: function (data, serverData,model) {
        var user = [];
        if (data) {
            Ext.Array.each(data, function (record, index) {
                user.push(record.id)
            })
        }
        this.getTageStore(serverData);
        this.getTimezoneStore();
        this.getTenants();
        this.getCountryStore(serverData.site.country,model);     
        this.setModelData(model);   
               
        
        //this.getStateStore();
        //this.getUsers(user);
        if (data) {
            this.getView().lookupReference('btn_save').setText('Update');
        } else {
            this.getView().lookupReference('btn_save').setText('Create');
        }
    },
    setStateStore:function(){
        this.getView().lookupReference('cmb_state').setValue(this.getModelData().data.state) 
    },
    cancelSite: function () {
        this.fireEvent('setActiveSiteCard', 0);
    },
    saveSiteDetails: function (url, method, site_id, formValues, me) {
        var json = {site: formValues};
        if (site_id) {
            url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SITE + site_id + '.json';
            method = 'PUT';
        }
        CaptivePortal.util.Utility.doAjaxJSON(url, json, CaptivePortal.app.getWaitMsg(), '', function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                console.log(resObj);
                me.fireEvent('setActiveSiteCard', 0)
                me.fireEvent('refreshSitesStore');
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, method);

    },
    saveSite: function (btn) {
        var me = this;
        var form = this.getView().down('form');
        if (form.isValid()) {
            var site_Name = form.down('#name').getValue().trim();
            var site_id = form.down('#site_id').getValue();
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SITE, method = 'POST';
            var formValues = form.getValues();
            delete formValues['user_profile_ids'];
            var picker = this.getView().lookupReference('tf_tag').picker;
            //var tagName = this.getView().lookupReference('tf_tag').getValue() ? this.getView().lookupReference('tf_tag').getValue().trim() : '';
            var tagName = '';
            var caseNo = -1, selection = 0;
            var msg = '';

            /*
             c         == create
             u         == update
             nt        == no tag selected
             ne_ta     == new tag selected
             t         == tag selected
             se_ta     == existing tag selected
             
             
             case 1 === c->nt, u->ne_ta
             case 2 === c->nt, u->se_ta
             case 3 === c->t, u->ne_ta
             case 4 === c->t, u->se_ta
             case 5 === c->t, u->same tag
             case 4 === c->nt, u->nt
             case 7 === new site create
             case 8 === c->t, u->nt*/



            var backupRec = this.getView().down('form')._backupRec;
            if (picker) {
                selection = picker.getSelection();
                if (selection.length == 0) {
                    tagName = this.getView().lookupReference('tf_tag').getValue();
                    if (tagName) {
                        formValues['site_tag_attributes'] = {name: tagName};
                    }
                    //formValues['site_tag_id'] = "";
                } else {
                    tagName = this.getView().lookupReference('tf_tag').getRawValue();
                    formValues['site_tag_id'] = selection[0].data.id;
                }

            } else {
                tagName = this.getView().lookupReference('tf_tag').getValue();
                if (tagName) {
                    formValues['site_tag_attributes'] = {name: tagName};
                }
                //formValues['site_tag_id'] = "";
            }

            if (!formValues['site_tag_id']) {
                formValues['site_tag_id'] = "";
            }
            // leave for new site crate
            if (site_id) {
                if (backupRec) {
                    if (backupRec.tag && !backupRec.tag.id && tagName) {
                        caseNo = 1;
                    } else if (backupRec.tag && !backupRec.tag.id && formValues['site_tag_id']) {
                        caseNo = 2;
                    } else if (backupRec.tag && backupRec.tag.id && tagName && selection.length === 0) {
                        caseNo = 3;
                    } else if (backupRec.tag && backupRec.tag.id && formValues['site_tag_id'] && formValues['site_tag_id'] !== backupRec.tag.id) {
                        caseNo = 4;
                    } else if (backupRec.tag && backupRec.tag.id && formValues['site_tag_id'] && formValues['site_tag_id'] === backupRec.tag.id) {
                        caseNo = 5;
                    } else if (backupRec.tag && !backupRec.tag.id && !tagName && !formValues['site_tag_id']) {
                        caseNo = 6;
                    } else if (backupRec.tag && backupRec.tag.id && !tagName && !formValues['site_tag_id']) {
                        caseNo = 8;
                    }
                }
            } else {
                caseNo = 7;
            }

            switch (caseNo) {
                case 1:
                    this.saveSiteDetails(url, method, site_id, formValues, me);
                    break;
                case 2:
                    msg = 'Config from ' + tagName + ' will be copied to current site ?';
                    break;
                case 3:
                    //this.saveSiteDetails(url, method, site_id, formValues, me);
                    msg = 'Current site details will be copied to new tag ? ';
                    break;
                case 4:
                    msg = 'Move tag config from ' + backupRec.tag.name + ' to ' + tagName;
                    break;
                case 5:
                    this.saveSiteDetails(url, method, site_id, formValues, me);
                    break;
                case 6:
                    this.saveSiteDetails(url, method, site_id, formValues, me);
                    break;
                case 7:
                    this.saveSiteDetails(url, method, site_id, formValues, me);
                    break;
                case 8:

                    msg = 'We see you removes tags from site. Do you want to copy tag configuration for the site ? ';
                    break;
            }



            if (caseNo === 2 || caseNo === 3 || caseNo === 4 || caseNo === 8) {
                Ext.Msg.show({
                    title: 'Confirm',
                    message: msg,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        if (btn === 'yes') {
                            switch (caseNo) {
                                case 2:
                                case 3:
                                case 4:
                                    this.saveSiteDetails(url, method, site_id, formValues, me);
                                    break;
                                case 8:
                                    formValues['copy_config'] = true;
                                    this.saveSiteDetails(url, method, site_id, formValues, me);
                                    break;
                            }
                        }
                        
                    }.bind(this)
                });
            }
        }
    },
    getTageStore: function (serverData) {
        var data = [], tagCombo = this.getView().lookupReference('tf_tag');
        if (serverData && serverData.site_tags) {
            data = serverData.site_tags;
        }
        if (data.length) {
            Ext.Array.each(data, function (d) {
                d['iconCss'] = 'tag-icon';
            }.bind(this));
        }
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: data
        });
        tagCombo.setStore(store);
        this.getView().down('#tenant_id').reset();
        if (serverData) {
            this.getView().down('form')._backupRec = serverData.site;
        }
        if (serverData && serverData.site && serverData.site.tag && serverData.site.tag.id) {
            tagCombo.setValue(serverData.site.tag.id);
        }


    },
    getTimezoneStore: function () {
        var store = Ext.create('CaptivePortal.store.common.TimezoneStore')
        this.getView().lookupReference('cmb_timezone').setStore(store);
    },
    getUsers: function (data) {
        var store = null;
        var url = "";
        if (CaptivePortal.app.getUserRole() === "super_admin") {
            url = CaptivePortal.Config.SERVICE_URLS.GET_USER;
        }
        else {
            var tenantid = CaptivePortal.app.getUserTenantID();
            var url = CaptivePortal.Config.SERVICE_URLS.GET_TENANT_USER + tenantid + "/get_users.json";
        }
        CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
            var respObj = Ext.decode(response.responseText);
            if (respObj.success) {
                var userProfiles = respObj.data ? ((respObj.data.user_profiles == undefined) ? respObj.data.users : respObj.data.user_profiles) : [];
                store = Ext.create('CaptivePortal.store.user.User', {data: userProfiles});
            }
        }.bind(this), function (response) {
        }, 'GET', false);
        this.getView().lookupReference('tf_users').setStore(store);
        this.getView().lookupReference('tf_users').setValue(data);

    },
    getTenants: function () {
        if (CaptivePortal.app.getUserRole() === "super_admin") {
            var store = null;
            CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.GET_TENANTS, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
                var respObj = Ext.decode(response.responseText);
                if (respObj.success) {
                    store = Ext.create('CaptivePortal.store.tenant.Tenant', {data: respObj.data});
                }
            }.bind(this), function (response) {
            }, 'GET', false);
            this.getView().lookupReference('cmb_tenant').setStore(store);
        } else {
            var combo = this.getView().lookupReference('cmb_tenant');
            combo.setVisible(false);
            Ext.apply(combo, {allowBlank: true}, {});
            combo.previousNode('label').setVisible(false);
            combo.setValue(CaptivePortal.app.getUserTenantID())
        }
    },
    loadSites: function () {
        CaptivePortal.util.Utility.doAjax(CaptivePortal.Config.SERVICE_URLS.LOAD_SITE, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
            var respObj = Ext.decode(response.responseText);
            if (respObj.success) {
                this.getView().down('grid').store.loadRawData(respObj.data.sites);
            }
        }.bind(this), function (response) {
        }, 'GET');
    },
    getCountryStore: function (country,model) {
        var me = this;
        this.getView().lookupReference('cmb_country').getStore().load({
            callback:function(){
                me.getView().lookupReference('cmb_country').setValue(country);                
            }            
        });
       CaptivePortal.util.Utility.appLoadMask('Please Wait', Ext.getCmp('viewport'), true);
       var combo = this.getView().lookupReference('cmb_state');
        combo.clearValue();       
        var store = Ext.create('CaptivePortal.store.site.State');
        store.setProxy({
            url: CaptivePortal.Config.SERVICE_URLS.GET_STATES + country + '.json',
            type: 'ajax',
            reader: {
                type: 'json',
                rootProperty: 'data.states'
            }
        });       
        store.load({
            callback:function(){  
            combo.bindStore(store);  
            Ext.ComponentQuery.query('#site_form')[0].getForm().loadRecord(model);            
            CaptivePortal.util.Utility.appLoadMask(null, null, false);                
            }
        });
    },
    getStateStore: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: []
        });
        this.getView().lookupReference('cmb_state').setStore(store);
    }
});

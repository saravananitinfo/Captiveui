Ext.define('CaptivePortal.view.sites.AddOrEditSiteController', {
    extend: 'Ext.app.ViewController',
    id: 'vc_sitecontroller',
    alias: 'controller.sitecontroller',
    listen: {
        controller: {
            '#vc_sitelistcontroller': {
                loadStore: 'setStoreEvent'
            }
        }
    },
    changeTenant: function(field, newValue, oldValue){
        if(newValue && oldValue){
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
            }, 'GET');
        }
    },
    setStoreEvent: function (data, serverData) {
        var user = [];
        if (data) {
            Ext.Array.each(data, function (record, index) {
                user.push(record.id)
            })
        }
        this.getTageStore(serverData);
        this.getTimezoneStore();
        this.getTenants();
        this.getCountryStore();
        this.getStateStore();
        this.getUsers(user);
        if (data) {
            this.getView().lookupReference('btn_save').setText('Update');
        } else {
            this.getView().lookupReference('btn_save').setText('Create');
        }
    },
    cancelSite: function () {
        this.fireEvent('setActiveSiteCard', 0);
    },
    saveSite: function (btn) {
        var me = this;
        var form = this.getView().down('form');
        if (form.isValid()) {
            var site_Name = form.down('#name').getValue().trim();
            var site_id = form.down('#site_id').getValue();
            var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SITE, method = 'POST';
            var formValues = form.getValues();
            var picker = this.getView().lookupReference('tf_tag').picker;
            if(picker){
                var selection = picker.getSelection();
                if(selection.length == 0){
                    formValues['site_tag_attributes'] = {name : this.getView().lookupReference('tf_tag').getValue()};    
                } else {
                    formValues['site_tag_id'] = selection[0].data.id;
                }
                
            } else {
                formValues['site_tag_attributes'] = {name : this.getView().lookupReference('tf_tag').getValue()};
            }
            delete formValues['user_profile_ids'];
            var json = {site: formValues};
            if (site_id) {
                url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SITE + site_id + '.json';
                method = 'PUT';
            }
            console.log(Ext.JSON.encode(json))
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
        }
    },
    getTageStore: function (serverData) {
        var data = [], tagCombo = this.getView().lookupReference('tf_tag');
        if(serverData && serverData.site_tags){
            data = serverData.site_tags;
        }
        var store = Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                data: data
            });
        tagCombo.setStore(store);
        if(serverData && serverData.site && serverData.site.tag && serverData.site.tag.id){
            tagCombo.setValue(serverData.site.tag.id);
        }
    },
    getTimezoneStore: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{id: '1', name: '(UTC +5.00) Tashkent'},
                {id: '2', name: '(UTC +5.30) Chenai, Kolkata, Mumbai , Delhi'},
                {id: '3', name: '(UTC +6.00) Astanan'}]
        });
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
    getCountryStore: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{id: '1', name: 'India'},
                {id: '2', name: 'Engaland'},
                {id: '3', name: 'United States Of America'}]
        });
        this.getView().lookupReference('cmb_country').setStore(store);
    },
    getStateStore: function () {
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: [{id: '1', name: 'Karnataka'},
                {id: '2', name: 'Kerala'},
                {id: '3', name: 'Uthar Pradesh'}]
        });
        this.getView().lookupReference('cmb_state').setStore(store);
    }
});

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
        if(newValue){
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
    saveSiteDetails: function(url, method, site_id, formValues, me){
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
            if(picker){
                selection = picker.getSelection();                
                if(selection.length == 0){
                    tagName = this.getView().lookupReference('tf_tag').getValue();
                    if(tagName){
                        formValues['site_tag_attributes'] = {name : tagName};
                    }
                    //formValues['site_tag_id'] = "";
                } else {
                    tagName = this.getView().lookupReference('tf_tag').getRawValue();
                    formValues['site_tag_id'] = selection[0].data.id;
                }
                
            } else {
                tagName = this.getView().lookupReference('tf_tag').getValue();
                if(tagName){
                    formValues['site_tag_attributes'] = {name : tagName};    
                }
                //formValues['site_tag_id'] = "";
            }

            if(!formValues['site_tag_id']){
                formValues['site_tag_id'] = "";
            }
            // leave for new site crate
            if(site_id){
                if(backupRec){
                    if(backupRec.tag && !backupRec.tag.id && tagName) {
                        caseNo = 1;
                    } else if(backupRec.tag && !backupRec.tag.id && formValues['site_tag_id']) {
                        caseNo = 2;
                    } else if(backupRec.tag && backupRec.tag.id && tagName && selection.length===0) {
                        caseNo = 3;
                    } else if(backupRec.tag && backupRec.tag.id && formValues['site_tag_id'] && formValues['site_tag_id'] !== backupRec.tag.id) {
                        caseNo = 4;
                    } else if(backupRec.tag && backupRec.tag.id && formValues['site_tag_id'] && formValues['site_tag_id'] === backupRec.tag.id) {
                        caseNo = 5;
                    } else if(backupRec.tag && !backupRec.tag.id && !tagName && !formValues['site_tag_id']) {
                        caseNo = 6;
                    } else if(backupRec.tag && backupRec.tag.id && !tagName && !formValues['site_tag_id']) {
                        caseNo = 8;
                    } 
                }
            } else {
                caseNo = 7;
            }

            switch(caseNo){
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



            if(caseNo === 2 || caseNo === 3 || caseNo === 4 || caseNo === 8){
                Ext.Msg.show({
                    title: 'Confirm',
                    message: msg,
                    buttons: Ext.Msg.YESNO,
                    icon: Ext.Msg.QUESTION,
                    fn: function (btn) {
                        if (btn === 'yes') {
                             switch(caseNo){
                                case 2:
                                case 3:
                                case 4:
                                    this.saveSiteDetails(url, method, site_id, formValues, me);
                                break;
                                    formValues['copy_config'] = true;
                                    this.saveSiteDetails(url, method, site_id, formValues, me);
                                break;
                             }
                        } 
                        else if (btn === 'no') {
                            if(caseNo === 8){
                                this.saveSiteDetails(url, method, site_id, formValues, me);
                            }
                        }
                    }.bind(this)
                });
            }
        }
    },
    getTageStore: function (serverData) {
        var data = [], tagCombo = this.getView().lookupReference('tf_tag');
        if(serverData && serverData.site_tags){
            data = serverData.site_tags;
        }
        if(data.length){
            Ext.Array.each(data,function(d){
                d['iconCss']  = 'tag-icon';
            }.bind(this));
        }
        var store = Ext.create('Ext.data.Store', {
                fields: ['id', 'name'],
                data: data
            });
        tagCombo.setStore(store);
        this.getView().down('#tenant_id').reset();
        if(serverData){
            this.getView().down('form')._backupRec = serverData.site;
        }
        if(serverData && serverData.site && serverData.site.tag && serverData.site.tag.id){
            tagCombo.setValue(serverData.site.tag.id);
        }


    },
    getTimezoneStore: function () {
        var listStr = '(GMT) Casablanca,(GMT) Coordinated Universal Time,(GMT) Dublin, Edinburgh, Lisbon, London,(GMT) Monrovia, Reykjavik,(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna,(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague,(GMT+01:00) Brussels, Copenhagen, Madrid, Paris,(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb,(GMT+01:00) West Central Africa,(GMT+01:00) Windhoek,(GMT+02:00) Amman,(GMT+02:00) Athens, Bucharest,(GMT+02:00) Beirut,(GMT+02:00) Cairo,(GMT+02:00) Damascus,(GMT+02:00) E. Europe,(GMT+02:00) Harare, Pretoria,(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius,(GMT+02:00) Istanbul,(GMT+02:00) Jerusalem,(GMT+02:00) Kaliningrad (RTZ 1),(GMT+02:00) Tripoli,(GMT+03:00) Baghdad,(GMT+03:00) Kuwait, Riyadh,(GMT+03:00) Minsk,(GMT+03:00) Moscow, St. Petersburg, Volgograd (RTZ 2),(GMT+03:00) Nairobi,(GMT+03:30) Tehran,(GMT+04:00) Abu Dhabi, Muscat,(GMT+04:00) Baku,(GMT+04:00) Izhevsk, Samara (RTZ 3),(GMT+04:00) Port Louis,(GMT+04:00) Tbilisi,(GMT+04:00) Yerevan,(GMT+04:30) Kabul,(GMT+05:00) Ashgabat, Tashkent,(GMT+05:00) Ekaterinburg (RTZ 4),(GMT+05:00) Islamabad, Karachi,(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi,(GMT+05:30) Sri Jayawardenepura,(GMT+05:45) Kathmandu,(GMT+06:00) Astana,(GMT+06:00) Dhaka,(GMT+06:00) Novosibirsk (RTZ 5),(GMT+06:30) Yangon (Rangoon),(GMT+07:00) Bangkok, Hanoi, Jakarta,(GMT+07:00) Krasnoyarsk (RTZ 6),(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi,(GMT+08:00) Irkutsk (RTZ 7),(GMT+08:00) Kuala Lumpur, Singapore,(GMT+08:00) Perth,(GMT+08:00) Taipei,(GMT+08:00) Ulaanbaatar,(GMT+09:00) Osaka, Sapporo, Tokyo,(GMT+09:00) Seoul,(GMT+09:00) Yakutsk (RTZ 8),(GMT+09:30) Adelaide,(GMT+09:30) Darwin,(GMT+10:00) Brisbane,(GMT+10:00) Canberra, Melbourne, Sydney,(GMT+10:00) Guam, Port Moresby,(GMT+10:00) Hobart,(GMT+10:00) Magadan,(GMT+10:00) Vladivostok, Magadan (RTZ 9),(GMT+11:00) Chokurdakh (RTZ 10),(GMT+11:00) Solomon Is., New Caledonia,(GMT+12:00) Anadyr, Petropavlovsk-Kamchatsky (RTZ 11),(GMT+12:00) Auckland, Wellington,(GMT+12:00) Coordinated Universal Time+12,(GMT+12:00) Fiji,(GMT+12:00) Petropavlovsk-Kamchatsky - Old,(GMT+13:00) Nukualofa,(GMT+13:00) Samoa,(GMT+14:00) Kiritimati Island,(GMT-01:00) Azores,(GMT-01:00) Cabo Verde Is.,(GMT-02:00) Coordinated Universal Time-02,(GMT-02:00) Mid-Atlantic - Old,(GMT-03:00) Brasilia,(GMT-03:00) Buenos Aires,(GMT-03:00) Cayenne, Fortaleza,(GMT-03:00) Greenland,(GMT-03:00) Montevideo,(GMT-03:00) Salvador,(GMT-03:00) Santiago,(GMT-03:30) Newfoundland,(GMT-04:00) Asuncion,(GMT-04:00) Atlantic Time (Canada),(GMT-04:00) Cuiaba,(GMT-04:00) Georgetown, La Paz, Manaus, San Juan,(GMT-04:30) Caracas,(GMT-05:00) Bogota, Lima, Quito, Rio Branco,(GMT-05:00) Chetumal,(GMT-05:00) Eastern Time (US &amp; Canada),(GMT-06:00) Central America,(GMT-06:00) Central Time (US &amp; Canada),(GMT-06:00) Guadalajara, Mexico City, Monterrey,(GMT-06:00) Saskatchewan,(GMT-07:00) Arizona,(GMT-07:00) Chihuahua, La Paz, Mazatlan,(GMT-07:00) Mountain Time (US &amp; Canada),(GMT-08:00) Baja California,(GMT-08:00) Pacific Time (US &amp; Canada),(GMT-09:00) Alaska,(GMT-10:00) Hawaii,(GMT-11:00) Coordinated Universal Time-11,(GMT-12:00) International Date Line West';
        var list = listStr.split(',');
        var data = [];
        Ext.Array.each(list, function(l, index){
            data.push({id:index, name:l});
        }.bind(this));
        var store = Ext.create('Ext.data.Store', {
            fields: ['id', 'name'],
            data: data
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

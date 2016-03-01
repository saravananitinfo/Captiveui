/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.sites.SiteListController', {
    extend: 'Ext.app.ViewController',
    id: 'vc_sitelistcontroller',
    alias: 'controller.sitelistcontroller',
    listen: {
        component: {
            'button#btn_addsite': {
                click: 'addNewSite'
            }
        },
        controller: {
            '#vc_sitecontroller': {
                refreshSitesStore: 'getSite'
            }
        }
    },
    addNewSite: function () {
        this.clearForm();
        this.fireEvent('setActiveSiteCard', 1);

        // this.fireEvent('loadStore');
        this.loadNewSites();
    },
    loadNewSites: function(){
        var me = this;
        var url = CaptivePortal.Config.SERVICE_URLS.NEW_SITE;
        CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('setActiveSiteCard', 1);
                var model = Ext.create('CaptivePortal.model.site.Site', resObj.data.site);
                me.fireEvent('loadStore', model.data.users, resObj.data);
                
            }
        }.bind(this), function (response) {
        }, 'GET');
    },
    clearForm: function () {
        var form = Ext.ComponentQuery.query('#site_form')[0];
        form.down('#name').setValue('');
        form.down('#name').clearInvalid('');
        form.down('#user_profile_ids').setValue('');
        form.down('#user_profile_ids').clearInvalid();
        form.down('#timezone').setValue('');
        form.down('#timezone').clearInvalid();
        form.down('#tags').setValue('');
        form.down('#tags').clearInvalid();
        form.down('#email').setValue('');
        form.down('#email').clearInvalid();
        form.down('#state').setValue('');
        form.down('#state').clearInvalid();
        form.down('#site_id').setValue('');
        form.down('#site_id').clearInvalid();

        form.down('#phone').setValue('');
        form.down('#phone').clearInvalid();
        form.down('#address').setValue('');
        form.down('#address').clearInvalid();
        form.down('#street').setValue('');
        form.down('#street').clearInvalid();
        form.down('#city').setValue('');
        form.down('#city').clearInvalid();
        form.down('#state').setValue('');
        form.down('#state').clearInvalid();
        form.down('#country').setValue('');
        form.down('#country').clearInvalid();
        form.down('#zipcode').setValue('');
        form.down('#zipcode').clearInvalid();
        form.down('#latitude').setValue('');
        form.down('#latitude').clearInvalid();
        form.down('#longitude').setValue('');
        form.down('#longitude').clearInvalid();

    },
    deleteSite: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Tenant',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_SITE + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            me.getSite();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {
                }
            }.bind(this)
        });
    },
    editSiteItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_SITE + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), '', function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        me.fireEvent('setActiveSiteCard', 1);
                        var model = Ext.create('CaptivePortal.model.site.Site', resObj.data.site);
                        me.fireEvent('loadStore', model.data.user_profiles, resObj.data);
                        Ext.ComponentQuery.query('#site_form')[0].getForm().loadRecord(model);
                        var tagId = (resObj.data && resObj.data.site && resObj.data.site.tag && resObj.data.site.tag.id) ? resObj.data.site.tag.id : null;
                        Ext.ComponentQuery.query('#tags')[0].setValue(tagId);
                        
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteSite(view, record, item, index, e, eOpts);
            }
        }
    },
    getSite: function () {
        var store = this.getView().lookupReference('grd_sitelist').getStore();
        store.load();
        var storeList = [
        {key:'users', store:'CaptivePortal.store.user.User'},
        {key:'templates', store:'CaptivePortal.store.splash_template.SplashTemplates'},
        {key:'journeys', store:'CaptivePortal.store.template_mgmt.TemplateMgmt'},
        {key:'rule_group', store:'CaptivePortal.store.rule_group.RuleGroup'},
        {key:'access_points', store:'CaptivePortal.store.access_point.AccessPoints'},
        {key:'sms_gateway', store:'CaptivePortal.store.sms_gateway.SMSGateways'}
        ];

        var accessPerList = CaptivePortal.app.getAccessPermissionList();
        Ext.Array.each(storeList, function(rec) {
          var itemFound = false;
          Ext.Array.each(accessPerList, function(per) {
            if(per.access_for == rec.key && per.read && per.write){
                itemFound = true;
                return false;
            }
          }, this);
          if(itemFound){
            Ext.StoreManager.lookup(rec.store).reload();
          }
        }, this);


    }
});

//# sourceURL=http://localhost:8383/CP/app/view/sites/SiteListController.js
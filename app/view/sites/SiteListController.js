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
                click: 'clearForm'
            }
        },
        controller: {
            '*': {
                refreshSitesStore: 'getSite'
            }
        }
    },
    setActiveItem: function () {
        this.fireEvent('setActiveSiteCard', 1);
    },
    clearForm: function () {     
        var model = Ext.create('CaptivePortal.model.site.Site');
        var form = Ext.ComponentQuery.query('#site_form')[0];
        form.getForm().loadRecord(model);
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
        this.fireEvent('setActiveSiteCard', 1);
        this.fireEvent('setviewStore');
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
                    CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            me.getSite();
                            Ext.getCmp('viewport').setLoading(false);
                        }
                    }.bind(this), function (response) {
                        Ext.getCmp('viewport').setLoading(false);
                    }, 'DELETE');
                } else if (btn === 'no') {
                    Ext.getCmp('viewport').setLoading(false);
                }
            }.bind(this)
        });
    },
    editSiteItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                Ext.getCmp('viewport').setLoading(true);
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_SITE + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjax(url, {}, function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        var model = Ext.create('CaptivePortal.model.site.Site', resObj.data.site);
                        me.fireEvent('setviewStore', model.data.user_profiles);
                        Ext.ComponentQuery.query('#site_form')[0].getForm().loadRecord(model);
                        me.fireEvent('setActiveSiteCard', 1);
                        Ext.getCmp('viewport').setLoading(false);
                    }
                }.bind(this), function (response) {
                    Ext.getCmp('viewport').setLoading(false);
                }, 'GET');
            } else {
                this.deleteSite(view, record, item, index, e, eOpts);
            }
        }
    },
    getSite: function () {
        var store = this.getView().lookupReference('grd_sitelist').getStore();
        store.load();
        store.on('load', function () {
            Ext.getCmp('viewport').setLoading(false);
        })
    }
});

//# sourceURL=http://localhost:8383/CP/app/view/sites/SiteListController.js
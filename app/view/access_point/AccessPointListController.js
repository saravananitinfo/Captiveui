Ext.define('CaptivePortal.view.access_point.AccessPointListController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.access_point_list_controller',
    createSites: function(){
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.NEW_SMSGATEWAY, {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (resObj.success) {
                    var sitesAndTags = CaptivePortal.util.Utility.createSitesAndTags(resObj.data);
                    var sitesCombo = Ext.ComponentQuery.query('#upload_access_point_frm')[0].down('#access_point_sites');
                    sitesCombo.reset();
                    sitesCombo.store.loadRawData(sitesAndTags);
                }
            }.bind(this), function (response) {
                var resObj = Ext.decode(response.responseText);
                if (!resObj.success && resObj.error.length) {
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }
            }, 'GET', false);
    },
    uploadAccessPoints: function(){
        this.fireEvent('setAccessPointMainActiveItem', 3);
        this.createSites();

    },
    addAccessPoints: function(){
    	Ext.StoreManager.lookup('CaptivePortal.store.access_point.AddAccessPoint').loadData([{name: "", mac_id: "", site_id: "", uid: ""}],false);
    	this.fireEvent('setAccessPointMainActiveItem', 1)
    },
    deleteAccessPoint: function(view, record, item, index, e, eOpts){
    	console.log('............deleteAccessPoint');
        Ext.Msg.show({
            title: 'Delete Access Point',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) { 
                if (btn === 'yes') {
                    Ext.getCmp('viewport').setLoading(true);
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_ACCESSPOINT + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {},"Loading...", this.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
                            Ext.getCmp('viewport').setLoading(false);
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    editAccessPoint: function(obj){
    	console.log('............editAccessPoint')
        console.log(obj)

        
        this.fireEvent('setAccessPointMainActiveItem', 2);

        var form = Ext.ComponentQuery.query('#access_point_form')[0];
        record = this.createAccessPoint(obj);
        form.loadRecord(record);

        Ext.getCmp('viewport').setLoading(false);
    },
    userItemClick: function(view, record, item, index, e, eOpts){
    	var me = this
        var action = e.target.getAttribute('action');
        // action = "edit"
        if (action) {
            if (action == "edit") {
            	Ext.getCmp('viewport').setLoading(true);
                // Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').reload();
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_ACCESSPOINT + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjaxJSON(url, {}, "", this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').loadData(resObj.data.site,false);
                    if (resObj.success) {
                    	console.log("..............edit success");
                        this.editAccessPoint(resObj)
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteAccessPoint(view, record, item, index, e, eOpts);
            }
        }
    },
    createAccessPoint: function(obj){
        var model_obj = {
            access_point_id: obj.data.access_point.id,
            name: obj.data.access_point.name,
            mac_id: obj.data.access_point.mac_id,
            uid: obj.data.access_point.uid,
            site_id: obj.data.access_point.site_id
        };
        return model = Ext.create('CaptivePortal.model.access_point.AccessPoint', model_obj);
    },
    
    saveEditAccessPoint: function(){
        var me = this;
        var form = this.getView().down('form');
        if(form.isValid()){
            Ext.getCmp('viewport').setLoading(true);
            var guest_user_id = form.down('#access_point_id').getValue();
            form_values = form.getValues();
            console.log(".............access_point for values...........");
            console.log(form_values)

            json = {access_point: {}};
            json['access_point']['mac_id'] = form_values.mac_id
            json['access_point']['site_id'] = form_values.site_id
            json['access_point']['name'] = form_values.name
            json['access_point']['uid'] = form_values.uid
            console.log(json)
            url = CaptivePortal.Config.SERVICE_URLS.UPDATE_ACCESSPOINT + guest_user_id + '.json', method = 'PUT';

            CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", this.getView(),function(response){
                var resObj = Ext.decode(response.responseText);
                if(resObj.success){
                    Ext.getCmp('viewport').setLoading(false);
                    console.log("save.........save..........save...access_point");
                    me.fireEvent('setAccessPointMainActiveItem', 0);
                    Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
                }
            }.bind(this),function(response){
                var resObj = Ext.decode(response.responseText);
                if(!resObj.success && resObj.error.length){
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }          
            },method);

            Ext.getCmp('viewport').setLoading(false);
        }
    },

    cancleEditAccessPoint: function(){
        Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
        this.fireEvent('setAccessPointMainActiveItem', 0);
    },


    getAccessPoints: function(){
        var store = this.getView().lookupReference('grd_access_point_list').getStore();
        store.load();
    }
});
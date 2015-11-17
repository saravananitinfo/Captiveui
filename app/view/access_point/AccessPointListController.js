Ext.define('CaptivePortal.view.access_point.AccessPointListController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.access_point_list_controller',
    addAccessPoints: function(){
    	Ext.StoreManager.lookup('CaptivePortal.store.access_point.AddAccessPoint').loadData([{name: "", mac_id: "", site_id: "", uid: ""}],false);
    	this.fireEvent('setAccessPointMainActiveItem', 1)
    },
    deleteAccessPoint: function(view, record, item, index, e, eOpts){
    	console.log('............deleteAccessPoint');
    },
    editAccessPoint: function(resObj){
    	console.log('............editAccessPoint')
        console.log(obj)

        // Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').reload();
        // this.fireEvent('setGuestUsersMainActiveItem', 1);

        // var form  = Ext.ComponentQuery.query('#guest_user_form')[0];
        // record = this.createGuestUser(obj);
        // form.loadRecord(record);

        // Ext.getCmp('viewport').setLoading(false);
    },
    userItemClick: function(view, record, item, index, e, eOpts){
    	var me = this
        var action = e.target.getAttribute('action');
        // action = "edit"
        if (action) {
            if (action == "edit") {
            	Ext.getCmp('viewport').setLoading(true);
                var url = CaptivePortal.Config.SERVICE_URLS.EDIT_ACCESSPOINT + record.data.id + '/edit.json';
                CaptivePortal.util.Utility.doAjaxJSON(url, {}, "", this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                    	console.log("..............edit success");
                        Ext.getCmp('viewport').setLoading(false);
                        this.editAccessPoint(resObj)
                    }
                }.bind(this), function (response) {
                }, 'GET');
            } else {
                this.deleteAccessPoint(view, record, item, index, e, eOpts);
            }
        }
    },
    getAccessPoints: function(){
        var store = this.getView().lookupReference('grd_access_point_list').getStore();
        store.load();
    }
});
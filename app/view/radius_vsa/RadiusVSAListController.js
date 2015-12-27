Ext.define('CaptivePortal.view.radius_vsa.RadiusVSAListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.radius_vsa_list_controller',
    id: 'vc_radius_vsa_list_controller',
    listen:{
        controller:{
            '#vc_radius_vsa_add_controller':{
                loadRadiusList:'getRadiusVSAList'
            }    
        }
        
    },
    radiusVSAItemClick: function (view, record, item, index, e, eOpts) {
        var me = this;
        var action = e.target.getAttribute('action');
        if (action) {
            if (action == "edit") {
                this.fireEvent('loadRadiusRec', 1, record.data.id);
            } else if (action == "delete"){
                this.deleteRadiusVSA(view, record, item, index, e, eOpts);
            } 
        }
    },
    deleteRadiusVSA: function (view, record, item, index, e, eOpts) {
        var me = this;
        Ext.Msg.show({
            title: 'Delete Radius VSA',
            message: 'Do you want to delete?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            fn: function (btn) {
                if (btn === 'yes') {
                    var url = CaptivePortal.Config.SERVICE_URLS.DELETE_RADIUS_VSA + record.data.id + '.json';
                    CaptivePortal.util.Utility.doAjax(url, {}, CaptivePortal.app.getWaitMsg(), me.getView(), function (response) {
                        var resObj = Ext.decode(response.responseText);
                        if (resObj.success) {
                            this.getRadiusVSAList();
                        }
                    }.bind(this), function (response) {
                    }, 'DELETE');
                } else if (btn === 'no') {

                }
            }.bind(this)
        });
    },
    addNewVSA: function(){
        this.fireEvent('addRadiusVSA',1);
        Ext.ComponentQuery.query('#lab_appheading')[0].setText('New Radius VSA'); 
    },
    getRadiusVSAList: function(){
        if(CaptivePortal.app.getUserRole() == 'super_admin'){
            var store = this.getView().lookupReference('grd_radius_vsa_list').getStore();
            store.load();    
        }        
    }
});



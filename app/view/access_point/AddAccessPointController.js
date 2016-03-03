Ext.define('CaptivePortal.view.access_point.AddAccessPointController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.add_access_point_controller',
    id: 'vc_add_access_point_controller',
    addRowAccessPoint: function(){
        Ext.StoreManager.lookup('CaptivePortal.store.access_point.Sites').reload();
    	var grid = this.getView().lookupReference('grd_add_access_point');
    	grid.getStore().add({name:"",mac_id:"",site_id:""})
    	
    },
    onSiteComboSelect: function (l, k, p) {
        if (l.getRawValue() === 'Create a new site') {
            this.fireEvent('forceToChangeView', 'card_sitelist', CaptivePortal.Constant.CONFIGURATION.SITES);
            this.fireEvent('showCreateSite');
        }
    },
    removeRowAccessPoint: function(){
    	var grid = this.getView().lookupReference('grd_add_access_point');
    	var store = grid.getStore();
    	// console.log(grid.getSelection());
    	store.remove(grid.getSelectionModel().getSelection());
    },
    saveAddAccessPoints: function(){    	
    	console.log('...................call save');
    	//var store = Ext.StoreManager.lookup('CaptivePortal.store.access_point.AddAccessPoint');

        var gridStr = this.getReferences().grd_add_access_point.getStore();
        var data = [];
        var flag = 0;
        Ext.Array.each(gridStr.getData().items,function(record){
            if(record.data.mac_id !== "" && record.data.site_id === "" ){               
                CaptivePortal.util.Utility.showError('Error', 'Select a Site');
            }else if(record.data.mac_id !== "" && record.data.vendor_type === "" ){                
                CaptivePortal.util.Utility.showError('Error', 'Enter Vendor Details');
            }else if(record.data.site_id !== "" && record.data.mac_id === "" ){                
                CaptivePortal.util.Utility.showError('Error', 'Enter Mac Address');
            }else if(record.data.site_id !== "" && record.data.vendor_type === "" ){               
                CaptivePortal.util.Utility.showError('Error', 'Enter Vendor Details');
            }else if(record.data.vendor_type !== "" && record.data.mac_id === "" ){             
                CaptivePortal.util.Utility.showError('Error', 'Enter Mac Address');
            }else if(record.data.vendor_type !== "" && record.data.vendor_type === "" ){               
                CaptivePortal.util.Utility.showError('Error', 'Select Vendor Type');
            }else if(record.data.mac_id === "" && record.data.site_id === "" && record.data.vendor_type === ""){
                flag += 1; 
            }else if(record.data.mac_id !== "" && record.data.site_id !== "" && record.data.vendor_type !== ""){
               flag += 1; 
               data.push({
                    name: record.data.name,
                    mac_id: record.data.mac_id, 
                    site_id: record.data.site_id, 
                    vendor_type: record.data.vendor_type
                })  
            }
        });
        if(data.length > 0 && flag ===  gridStr.getCount()){
    	var json = {access_point: data}

    	var url = CaptivePortal.Config.SERVICE_URLS.SAVE_ACCESSPOINT, method = 'POST';
    	// CaptivePortal.util.Utility.addHeader();
        CaptivePortal.util.Utility.doAjaxJSON(url, json, "Loading..", this.getView(),function(response){
        	Ext.getCmp('viewport').setLoading(false);
            var resObj = Ext.decode(response.responseText);
            console.log("........success");
            console.log(resObj)
            if(resObj.success === true){
                console.log("save.........save..........save...access_point");
                Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
                this.fireEvent('setAccessPointMainActiveItem', 0);

                // me.fireEvent('setSmSGatewayMainActiveItem', 0);
                // Ext.StoreManager.lookup('CaptivePortal.store.sms_gateway.SMSGateways').reload();
            }
        }.bind(this),function(response){
            var resObj = Ext.decode(response.responseText);
            if(!resObj.success && resObj.error.length){
            	Ext.getCmp('viewport').setLoading(false);
                CaptivePortal.util.Utility.showError('Error', resObj.error);
            }          
        },method);
    	
    }
    },
    cancleAddAccessPoints: function(){
    	console.log('...................call cancle');
        Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
        this.fireEvent('setAccessPointMainActiveItem', 0);
    }
});
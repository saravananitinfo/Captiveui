Ext.define('CaptivePortal.view.radius_vsa.MainController',{
    extend:'Ext.app.ViewController',
    alias:'controller.radius_vsa_maincontroller',    
    id:'vc_radius_vsa_maincontroller',
    listen:{
    	controller: {
    		'*':{
   					setRadiusVSAActiveItem: "setRadiusVSAActiveItem"
   				},
   			'#vc_radius_vsa_list_controller':{
   				addRadiusVSA:'addRadiusVSA',
   				loadRadiusRec:'loadRadiusRec'
   			}
   		}
    },
    loadRadiusRec: function(card, recId){
        this.getView().setActiveItem(card);
        var me = this;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.EDIT_RADIUS_VSA + recId + '/edit.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                me.fireEvent('loadRecToRadius', resObj.data); 
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET');
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Radius VSA');
    },
    addRadiusVSA: function(card){
    	this.setRadiusVSAActiveItem(card);
    	this.fireEvent('initiateForm');
    },
    setRadiusVSAActiveItem:function(card){
    	this.getView().setActiveItem(card);
    }
});


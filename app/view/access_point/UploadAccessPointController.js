Ext.define('CaptivePortal.view.access_point.UploadAccessPointController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.upload_access_point_controller',
    require: [
    	'Ext.util.base64'
    ],
    cancelAcecesPointUpload: function() {
    	this.fireEvent('setAccessPointMainActiveItem', 0);
    },
    uploadAccessPoint: function(){
    	var me = this;
        var form = this.getView().down('form');
        if(form.isValid()){
            form_values = form.getValues();
            var json = {access_point: {}};
            json['access_point']['site_id'] = form_values.associated_resource;
            console.log(json);
            file = form.down('#upload_field').el.down('input[type=file]').dom.files[0];
            if(file){
            	console.log(file);
	            var reader = new FileReader();
	            reader.onload = (function(theFile) {
	                return function(e) {
	                    console.log(".............");
	                    console.log(e.target.result);
	                    json['access_point']['access_point_file'] = Ext.util.Base64.encode(e.target.result)
	                    console.log(json);
	                    var url = CaptivePortal.Config.SERVICE_URLS.UPLOAD_ACCESSPOINT, method = 'POST';
	                    CaptivePortal.util.Utility.doAjaxJSON(url,json,"Loading...", me.getView(),function(response){
			                var resObj = Ext.decode(response.responseText);
			                if(resObj.success){
                                Ext.StoreManager.lookup('CaptivePortal.store.access_point.AccessPoints').reload();
                                me.fireEvent('setAccessPointMainActiveItem', 0);
			                }
			            }.bind(this),function(response){
			                var resObj = Ext.decode(response.responseText);
			                if(!resObj.success && resObj.error.length){
			                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
			                }          
			            },method);
	                };
	            })(file);
	            reader.readAsBinaryString(file);
            }
        }

    }
});
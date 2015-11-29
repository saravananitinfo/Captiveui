Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.template_mgmt_edit',
    id:'vc_template_mgmt_edit',
    listen:{
            controller : {
                '#vc_template_mgmt_maincontroller': {
                initiateTemplateMgmtForm: 'initiateTemplateMgmtForm',
                loadDataToTemplateMgmtForm : 'loadDataToTemplateMgmtForm'
            }
    	}
    },
    loadDataToTemplateMgmtForm:function(data){
        var form = this.getView().down('form');
        var model = Ext.create('CaptivePortal.model.template_mgmt.TemplateMgmt', data.splash_journey);
        form.loadRecord(model);
        if(data.splash_journey.site_info && data.splash_journey.site_info.id){
            form.down('#site_combo').setValue(data.splash_journey.site_info.id);
        }
        this.getView().down('#btn_addtemplate').setText('Update');
    },
    cancelTemplateMgmt: function(){
    	this.fireEvent('setTemplateMgmtActiveItem', 0);
    },
    initiateTemplateMgmtForm: function(data){
    	this.resetForm();
    	this.loadSitesDataToTemplateForm(data);
    	this.getView().down('tabpanel').setActiveItem(0);
        this.getView().down('#btn_addtemplate').setText('Create');
    },
    loadSitesDataToTemplateForm: function(data){
    	this.getView().down('#site_combo').store.loadRawData(data.sites);
    },
    resetForm:function(){
    	var form = this.getView().down('form');
    	form.reset();
    },
    saveTemplate: function (btn) {
    	var form = btn.up('form'),  data = {}, param = {};
        var textreaaFields = form.query('textareafield');
        var valid = true;
        Ext.Array.each(textreaaFields, function(f){
            if(f.isValid()){
                if(f.getValue().trim().length == 0){
                    valid = false;
                    f.setValue('')
                }
            } else {
                valid = false;
                f.setValue('')
            }
            if(!valid) {
                return false;
            }
        }.bind(this));

    	if(form.isValid() && valid){
    		data = form.getValues(), isEdit = data.id ? true : false; 
    		data['tenant_id'] = CaptivePortal.app.getUserTenantID();
    		data['default'] = true;
    		data['splash_template_attributes'] = {
    			splash_content : {
    				content_string : 'feawaaaa',
    				content_array : ["3","1",3,13,132,23131]
    			}
    		};
    		param = { splash_journey : data};
    		if(isEdit){
    			CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.UPDATE_SPLASH_JOURNEY + param.splash_journey.id + '.json' , param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (resObj.success) {
                        this.fireEvent('setTemplateMgmtActiveItem', 0);
		                this.fireEvent('loadTemplateMgmtGrid', 0);	
                    }
                }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success && resObj.error.length) {
                        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    }
                }, 'PUT');
    		} else {
    			delete data.id;
    			CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.SAVE_SPLASH_JOURNEY, param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
		            var resObj = Ext.decode(response.responseText);
		            if (resObj.success) {
		                this.fireEvent('setTemplateMgmtActiveItem', 0);
		                this.fireEvent('loadTemplateMgmtGrid', 0);		                
		            }
		        }.bind(this), function (response) {
		            var resObj = Ext.decode(response.responseText);
		            if (!resObj.success && resObj.error.length) {
		                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
		            }
		        }, 'POST');
    		}
    		console.log(data);
    	}
    }
    
})
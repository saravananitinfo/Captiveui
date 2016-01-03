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
    privacyChange: function(checkbox, newValue){
        if(newValue){
            checkbox.up('tabpanel').down('#template_mgmt_form-custom_privacy_policies_container').show();
        } else {
            checkbox.up('tabpanel').down('#template_mgmt_form-custom_privacy_policies_container').hide();
        }
    },
    customChange: function(checkbox, newValue){
        if(newValue){
            checkbox.up('tabpanel').down('#template_mgmt_form-custom_tnc_container').show();
        } else {
            checkbox.up('tabpanel').down('#template_mgmt_form-custom_tnc_container').hide();
        }
    },
    createCategoryStore: function(data){
        var categoryData = [];
        if(data.categories && data.categories.length){
            Ext.Array.each(data.categories, function(c){
                categoryData.push({id:c, name:c});
            }.bind(this));

        }
        var store = Ext.create('Ext.data.Store', {data:categoryData, fields:['id', 'name']});
        return store;
    },
    loadDataToTemplateMgmtForm:function(data, btnText){
        var form = this.getView().down('form');
        var model = Ext.create('CaptivePortal.model.template_mgmt.TemplateMgmt', data.splash_journey);
        form.loadRecord(model);
        if(data.splash_journey.site_info && data.splash_journey.site_info.id){
            form.down('#site_combo').setValue(data.splash_journey.site_info.id);
        }
        this.getView().down('#btn_addtemplate').setText(btnText ? btnText : 'Update');
        if(data && data.splash_journey && data.splash_journey.associated_resource){
            CaptivePortal.util.Utility.getSiteAndTagDetails(form.down('#site_combo'),form.down('#site_combo').getSelectedRecord());
        }
    },
    cancelTemplateMgmt: function(){
    	this.fireEvent('setTemplateMgmtActiveItem', 0);
    },
    initiateTemplateMgmtForm: function(data){
        CaptivePortal.util.Utility.hideSiteTagRefLabel(this.getView());
    	this.resetForm();
    	this.loadSitesDataToTemplateForm(data);
    	this.getView().down('tabpanel').setActiveItem(0);
        this.getView().down('#btn_addtemplate').setText('Create');
        this.getView().down('#template_mgmt_form-category').bindStore(this.createCategoryStore(data));
    },
    loadSitesDataToTemplateForm: function(data){
        var sites = CaptivePortal.util.Utility.createSitesAndTags(data);
    	this.getView().down('#site_combo').store.loadRawData(sites);
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

        var isSuperAdmin = CaptivePortal.app.getUserRole() == 'super_admin', allow = true;
        if(!isSuperAdmin && !form.down('#site_combo').getValue()){
            allow = false;
        }
    	if(form.isValid() && allow){
    		data = form.getValues(), isEdit = data.id ? (data.id.indexOf('model') == -1 ? true : false) : false; 
            var tenantId = CaptivePortal.app.getUserTenantID();;
            if(tenantId){
                data['tenant_id'] = tenantId;    
            }    		
    		data['default'] = form.down('#template_mgmt_form-default').getValue();
            data['custom_tnc'] = form.down('#template_mgmt_form-custom_tnc').getValue();
            data['custom_privacy_policies'] = form.down('#template_mgmt_form-custom_privacy_policies').getValue();

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
    	}
    }
    
})
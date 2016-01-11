Ext.define('CaptivePortal.view.splash_template.SplashTemplateController', {
	extend: 'Ext.app.ViewController',
    alias: 'controller.splash_template',
    listen: {
        controller: {
            '*': {
                onSaveSplashTemplate: 'saveSplashTemplate',
                initiateSplashTemplateForm: 'initiateSplashTemplateForm',
                loadDataToSplashTemplateForm: 'loadDataToSplashTemplateForm'
            }
        }
    },
    saveSplashTemplate: function(html){
    	console.log(".........  saveSplashTemplate  ..........");
    	console.log(html);
    	var form = Ext.ComponentQuery.query('#splashTemplateForm')[0]
    	console.log(form.getValues());
    	var form_val = form.getValues()
    	console.log(form_val)
    	var json = {"splash_template": {}}
    	json.splash_template.name = form_val.name;
    	json.splash_template.splash_content = html;
    	json.splash_template.category = form_val.category;
    	json.splash_template.associated_resource = form_val.associated_resource;
    	json['splash_template']['status'] = 'published';
        console.log("................   json ........... ");
        console.log(json);

    	var url = CaptivePortal.Config.SERVICE_URLS.SAVE_SPLASH_TEMPLATE; method = "POST";
    	if(form_val.splash_template_id){
    		url = CaptivePortal.Config.SERVICE_URLS.UPDATE_SPLASH_TEMPLATE + form_val.splash_template_id + '.json'; method = "PUT";
    	}
    	CaptivePortal.util.Utility.doAjaxJSON(url, json, CaptivePortal.app.getWaitMsg(), '', function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
            	console.log(".........  save save ..........");
            	console.log(resObj);
            	Ext.StoreManager.lookup('CaptivePortal.store.splash_template.SplashTemplates').reload();
            	this.fireEvent('setSplashPageActiveItem',0);
            	var home_panel = Ext.ComponentQuery.query('#pan_apphome')[0];
        		home_panel.show();
        		Ext.getCmp('viewport').remove(Ext.ComponentQuery.query('editor_main')[0]);
                
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, method);
    },
    saveSplashTemplateForm: function(){
    	var home_panel = Ext.ComponentQuery.query('#pan_apphome')[0]
    	home_panel.hide();

        var form = Ext.ComponentQuery.query('#splashTemplateForm')[0]
        var form_val = form.getValues()
    	Ext.getCmp('viewport').add(Ext.create('CaptivePortal.view.editor.Main',{
            template_name: form_val.name
        }));

    	var form = Ext.ComponentQuery.query('#splashTemplateForm')[0]
    	var store = Ext.StoreManager.lookup('CaptivePortal.store.splash_template.SplashTemplates');
        if(form.getValues().splash_template_id){
        	var index = store.findExact('id', form.getValues().splash_template_id);
        	CaptivePortal.util.Utility.buildHtml(store.getAt(index).data.splash_content);
        }
    },
    cancelSplashTemplate: function(){
    	this.fireEvent('setSplashPageActiveItem',0);
        Ext.ComponentQuery.query('label#lab_appheading')[0].setText('Splash Template');
    },
    initiateSplashTemplateForm: function(data){
    	console.log("......initiateSplashTemplateForm..");
    	this.resetForm();
    	this.loadSitesDataToTemplateForm(data);
        this.getView().down('#btn_saveSplashTemplate').setText('Create');
        this.getView().down('#splash_template_form-category').bindStore(this.createCategoryStore(data));
    },
    loadDataToSplashTemplateForm:function(data, btnText){
        var form = this.getView().down('form');

        this.getView().down('#btn_saveSplashTemplate').setText('Update');

        var splash_template = data.splash_template;
        splash_template.splash_template_id = splash_template.id
        var model = Ext.create('CaptivePortal.model.splash_template.SplashTemplate', splash_template);
        form.loadRecord(model);
        // if(data.splash_journey.site_info && data.splash_journey.site_info.id){
        //     form.down('#site_combo').setValue(data.splash_journey.site_info.id);
        // }
        // this.getView().down('#btn_addtemplate').setText(btnText ? btnText : 'Update');
        // if(data && data.splash_journey && data.splash_journey.associated_resource){
        //     CaptivePortal.util.Utility.getSiteAndTagDetails(form.down('#site_combo'),form.down('#site_combo').getSelectedRecord());
        // }
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
    loadSitesDataToTemplateForm: function(data){
        var sites = CaptivePortal.util.Utility.createSitesAndTags(data);
    	this.getView().down('#site_combo').store.loadRawData(sites);
    },
    resetForm:function(){
    	var form = this.getView().down('form');
    	form.reset();
    },
});
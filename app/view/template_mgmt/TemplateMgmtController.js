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
    generateSplashBlock: function(details){
        var wrapperDiv = document.createElement('div');
        wrapperDiv.setAttribute('data-id', details.id);
        wrapperDiv.setAttribute('class', 'splash-block-wrap');
        var topWrapperDiv = document.createElement('div');
        topWrapperDiv.setAttribute('class', 'splash-block-wrap-top');
        wrapperDiv.addEventListener('click', function(event){
            var currentTemplateId = this.getView().down('form').down('#splash_template_id').getValue();
            if(currentTemplateId){
                var existingDiv = document.querySelector("div[data-id='" + currentTemplateId +"']");
                if(existingDiv) existingDiv.style.backgroundColor="white";
            }            
            var parentNode = function(node){
                if(node.className !='splash-block-wrap'){
                    return parentNode(node.parentNode);
                } else {
                    return node;    
                }
            }            
            var wrapNode = parentNode(event.target);
            wrapNode.style.backgroundColor="black";
            this.getView().down('form').down('#splash_template_id').setValue(wrapNode.getAttribute('data-id'));
        }.bind(this))
        var contentDiv = document.createElement('div');
        contentDiv.setAttribute('data-id', details.id);
        contentDiv.setAttribute('class', 'splash-block-content-wrap');
        var imgTag = document.createElement('img');
        imgTag.setAttribute('src', details.preveiew_URL || 'http://' + location.host + '/custom/css/images/Splash_page.png');
        imgTag.setAttribute('height', 120);
        imgTag.setAttribute('width', 138);
        imgTag.setAttribute('class','splash-block-img');
        var label = document.createElement('h3');
        label.setAttribute('class', 'splash-block-wrap-lab');
        label.innerHTML = details.name;
        var preview = document.createElement('h3');
        preview.setAttribute('class', 'splash-block-wrap-lab splash-block-wrap-lab-prev');
        preview.setAttribute('data-preview-id', details.id);
        preview.innerHTML = 'Preview';
        preview.addEventListener('click', function(event){
            var previewId = event.target.getAttribute('data-preview-id');
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.PREVIEW,{},"Loading...", this.getView(),function(response){
                var resObj = response.responseText;
            },function(response){
                var resObj = Ext.decode(response.responseText);
                if(!resObj.success && resObj.error.length){
                    CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                }          
            },'POST');
        }.bind(this))
        contentDiv.appendChild(preview);        
        contentDiv.appendChild(imgTag);        
        wrapperDiv.appendChild(contentDiv);
        topWrapperDiv.appendChild(wrapperDiv);
        topWrapperDiv.appendChild(label);
        return topWrapperDiv;
    },
    generateSplashPageContent: function(data){
        var splash_templates = data.splash_templates, dynDivs = [];
        if(splash_templates && splash_templates.length){
            Ext.Array.each(splash_templates,function(d, index){
                dynDivs.push(this.generateSplashBlock(d));    
            }.bind(this))            
        }
        return dynDivs;
    },
    site_change: function(combo){
        var resId = combo.getValue(),
            view  = this.getView(), divs = [], dom = view.down('#splash-page-details').el.dom;
        CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SPLASH_TEMPLATE_DETAILS + resId + '.json' , {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (resObj.success) {
                divs = this.generateSplashPageContent(resObj.data);
                if(divs.length){
                    view.down('#site-tag-err-lab').hide();
                    Ext.Array.each(divs,function(div, index){
                        dom.appendChild(div);
                    }.bind(this));
                    dom.style['border-width'] = '2px';                   
                    
                } else {
                    view.down('#site-tag-err-lab').show();
                    view.down('#site-tag-err-lab').setText('No splash template for this site/tag');
                    dom.innerHTML = "";
                    dom.style['border-width'] = '0px';
                }
                
            }
        }.bind(this), function (response) {
            var resObj = Ext.decode(response.responseText);
            if (!resObj.success && resObj.error.length) {
                CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
            }
        }, 'GET', false);
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
        if(data.splash_journey.splash_template && data.splash_journey.splash_template.id){
            form.down('#splash_template_id').setValue(data.splash_journey.splash_template.id);
        }
        if(data && data.splash_journey && data.splash_journey.associated_resource){
            //CaptivePortal.util.Utility.getSiteAndTagDetails(form.down('#site_combo'),form.down('#site_combo').getSelectedRecord());
            this.site_change(form.down('#site_combo'));
            var currentTemplateId = this.getView().down('form').down('#splash_template_id').getValue();
            if(currentTemplateId){
                var existingDiv = document.querySelector("div[data-id='" + currentTemplateId +"']");
                if(existingDiv) existingDiv.style.backgroundColor="black";
            } 
        }
    },
    cancelTemplateMgmt: function(){
    	this.fireEvent('setTemplateMgmtActiveItem', 0);
    },
    resetSplashPageContent: function(){
        var view = this.getView();
        view.down('#sms-gateway-tab').tab.hide();
        view.down('#site-tag-err-lab').show();
        view.down('#site-tag-err-lab').setText('Please select site / tag from above dropdown');
        view.down('#splash-page-details').el.dom.innerHTML = "";
        view.down('#splash-page-details').el.dom.style['border-width'] = '0px';
    },
    initiateTemplateMgmtForm: function(data){
        CaptivePortal.util.Utility.hideSiteTagRefLabel(this.getView());
    	this.resetForm();
        this.resetSplashPageContent();
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
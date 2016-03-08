Ext.define('CaptivePortal.view.template_mgmt.TemplateMgmtController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.template_mgmt_edit',
  id: 'vc_template_mgmt_edit',
  listen: {
    controller: {
      '#vc_template_mgmt_maincontroller': {
        initiateTemplateMgmtForm: 'initiateTemplateMgmtForm',
        loadDataToTemplateMgmtForm: 'loadDataToTemplateMgmtForm'
      }
    }
  },
  onTCRadioChage: function (rb, value) {
    if (value.ct === 'default') {
      this.getReferences().lab_tclink.setVisible(false);
      this.getReferences().txt_tclink.setVisible(false);
      this.getReferences().lab_tctext.setVisible(false);
      this.getReferences().txt_tctext.setVisible(false);
    } else if (value.ct === 'custom') {
      this.getReferences().lab_tclink.setVisible(false);
      this.getReferences().txt_tclink.setVisible(false);
      this.getReferences().lab_tctext.setVisible(true);
      this.getReferences().txt_tctext.setVisible(true);
    } else if (value.ct === 'link') {
      this.getReferences().lab_tclink.setVisible(true);
      this.getReferences().txt_tclink.setVisible(true);
      this.getReferences().lab_tctext.setVisible(false);
      this.getReferences().txt_tctext.setVisible(false);
    }
  },
  onPPRadioChage: function (rb, value) {
    if (value.pp === 'default') {
      this.getReferences().lab_pplink.setVisible(false);
      this.getReferences().txt_pplink.setVisible(false);
      this.getReferences().lab_pptext.setVisible(false);
      this.getReferences().txt_pptext.setVisible(false);
    } else if (value.pp === 'custom') {
      this.getReferences().lab_pplink.setVisible(false);
      this.getReferences().txt_pplink.setVisible(false);
      this.getReferences().lab_pptext.setVisible(true);
      this.getReferences().txt_pptext.setVisible(true);
    } else if (value.pp === 'link') {
      this.getReferences().lab_pplink.setVisible(true);
      this.getReferences().txt_pplink.setVisible(true);
      this.getReferences().lab_pptext.setVisible(false);
      this.getReferences().txt_pptext.setVisible(false);
    }
  },
  /*loadSMSGatewayDetails: function(siteId, smsID){
   siteId && CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SPLASH_TEMPLATE_SMS_GATEWAY + siteId + '.json' ,{},"Loading...", this.getView(),function(response){
   var res = Ext.decode(response.responseText);
   var store = Ext.create('Ext.data.Store',{
   fields:['id', 'name'],
   data:res.data.sms_gateways || []
   });
   this.getView().down('#sms-gateway-tab').tab.show();
   this.getView().down('#sms_gateway_management_id').reset();
   this.getView().down('#sms_gateway_management_id').setStore(store);
   smsID && this.getView().down('#sms_gateway_management_id').setValue(smsID);
   }.bind(this),function(response){
   var resObj = Ext.decode(response.responseText);
   if(!resObj.success && resObj.error.length){
   CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
   }          
   }.bind(this),'GET');
   },*/
  getSMSGatewayDetails: function (domEle) {
    var view = this.getView();
    var smsFlag = domEle.getAttribute('data-verify_mobile_number'), siteId;
    if (smsFlag == 'true') {
      siteId = this.getView().down('form').down('#site_combo').getValue();
      //           this.loadSMSGatewayDetails(siteId);
      this.getView().down('#sms-gateway-tab').tab.show();
      this.getView().down('#sms_gateway_management_id').reset();
    } else {
      view.down('#sms-gateway-tab').tab.hide();
      view.down('#sms_gateway_management_id').reset();
    }
  },
  previewClick: function (event) {
    var previewId = event.target.getAttribute('data-preview-id');
    CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.PREVIEW, {}, "Loading...", this.getView(), function (response) {
      var resObj = response.responseText;
    }, function (response) {
      var resObj = Ext.decode(response.responseText);
      if (!resObj.success && resObj.error.length) {
        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
      }
    }, 'POST');
  },
  wrapperClick: function (event) {
    var currentTemplateId = this.getView().down('form').down('#splash_template_id').getValue();
    if (currentTemplateId) {
      var existingDiv = document.querySelector("div[data-id='" + currentTemplateId + "']");
      if (existingDiv)
        existingDiv.style.backgroundColor = "white";
    }
    var parentNode = function (node) {
      if (node.className != 'splash-block-wrap') {
        return parentNode(node.parentNode);
      } else {
        return node;
      }
    }
    var wrapNode = parentNode(event.target);
    wrapNode.style.backgroundColor = "#1FA1EB";
    this.getView().down('form').down('#splash_template_id').setValue(wrapNode.getAttribute('data-id'));
    this.getSMSGatewayDetails(wrapNode);
  },
  generateSplashBlock: function (details) {
    var me = this;
    var wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('data-id', details.id);
    wrapperDiv.setAttribute('data-verify_mobile_number', details.verify_mobile);
    wrapperDiv.setAttribute('class', 'splash-block-wrap');
    wrapperDiv.addEventListener('click', this.wrapperClick.bind(this));
    var topWrapperDiv = document.createElement('div');
    topWrapperDiv.setAttribute('class', 'splash-block-wrap-top');
    var contentDiv = document.createElement('div');
    contentDiv.setAttribute('data-id', details.id);
    // contentDiv.setAttribute('class', 'splash-block-content-wrap');

    var preview = document.createElement('span');
    preview.setAttribute('class', 'rollover');
    preview.setAttribute('data-id', details.id);

    var img = document.createElement('img');
    img.setAttribute('src', "../../resources/images/preview.png");
    img.setAttribute('data-id', details.id);
    img.setAttribute('style', "display:block; margin-left: auto; margin-right:auto; margin-top: 60px;");
    img.onclick = function (e) {
      e.preventDefault();
      console.log(this.dataset.id);
      me.preview(this.dataset.id);
    };
    preview.appendChild(img);

    var imgTag = document.createElement('img');
    imgTag.setAttribute('src', details.snap_shot);

    imgTag.setAttribute('height', 145);
    imgTag.setAttribute('width', 145);
    imgTag.setAttribute('class', 'splash-block-img');

    var label = document.createElement('h3');
    label.setAttribute('class', 'splash-block-wrap-lab');
    label.innerHTML = details.name;

    // var preview = document.createElement('h3');
    // preview.setAttribute('class', 'splash-block-wrap-lab splash-block-wrap-lab-prev');
    // preview.setAttribute('data-preview-id', details.id);
    // preview.innerHTML = 'Preview';
    // preview.addEventListener('click',this.previewClick.bind(this));
    // contentDiv.appendChild(preview);

    contentDiv.appendChild(preview);
    contentDiv.appendChild(imgTag);
    wrapperDiv.appendChild(contentDiv);
    topWrapperDiv.appendChild(wrapperDiv);
    topWrapperDiv.appendChild(label);
    return topWrapperDiv;
  },
  generateSplashPageContent: function (data) {
    var splash_templates = data.splash_templates, dynDivs = [];
    if (splash_templates && splash_templates.length) {
      Ext.Array.each(splash_templates, function (d, index) {
        dynDivs.push(this.generateSplashBlock(d));
      }.bind(this))
    }
    return dynDivs;
  },
  site_change_callback: function (combo, sms_mgmt_id) {
    this.site_change(combo, sms_mgmt_id)
    this.getView().down('form').down('#splash_template_id').setValue(null);
  },
  site_change: function (combo, sms_mgmt_id) {
    var resId = combo.getValue(),
     view = this.getView(), divs = [], dom = view.down('#splash-page-details').el.dom;
    CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.GET_SPLASH_TEMPLATE_SMS_GATEWAY + resId + '.json', {}, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
      var resObj = Ext.decode(response.responseText);
      if (resObj.success) {
        // sms_mgmt_id = null;
        // if(!sms_mgmt_id){
        //     sms_mgmt_id = resObj.data.sms_gateways[0].id;
        // }
        divs = this.generateSplashPageContent(resObj.data);
        dom.innerHTML = "";
        if (divs.length) {
          view.down('#site-tag-err-lab').hide();
          Ext.Array.each(divs, function (div, index) {
            dom.appendChild(div);
          }.bind(this));
          dom.style['border-width'] = '2px';
        } else {
          view.down('#site-tag-err-lab').show();
          view.down('#site-tag-err-lab').setText('No splash template for this site/Group');

          dom.style['border-width'] = '0px';
        }
        var store = Ext.create('Ext.data.Store', {
          fields: ['id', 'name'],
          data: resObj.data.sms_gateways || []
        });
        view.down('#sms_gateway_management_id').setStore(store);
        this.getView().down('#sms-gateway-tab').tab.hide();
        if (sms_mgmt_id && !sms_mgmt_id.data) {
          view.down('#sms_gateway_management_id').setValue(sms_mgmt_id);
          this.getView().down('#sms-gateway-tab').tab.show();
        } else {
          view.down('#sms_gateway_management_id').reset();
        }

      }
    }.bind(this), function (response) {
      var resObj = Ext.decode(response.responseText);
      if (!resObj.success && resObj.error.length) {
        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
      }
    }, 'GET', false);
  },
  privacyChange: function (checkbox, newValue) {
    if (newValue) {
      checkbox.up('tabpanel').down('#template_mgmt_form-custom_privacy_policies_container').show();
    } else {
      checkbox.up('tabpanel').down('#template_mgmt_form-custom_privacy_policies_container').hide();
    }
  },
  customChange: function (checkbox, newValue) {
    if (newValue) {
      checkbox.up('tabpanel').down('#template_mgmt_form-custom_tnc_container').show();
    } else {
      checkbox.up('tabpanel').down('#template_mgmt_form-custom_tnc_container').hide();
    }
  },
  createCategoryStore: function (data) {
    var categoryData = [];
    if (data.categories && data.categories.length) {
      Ext.Array.each(data.categories, function (c) {
        categoryData.push({id: c, name: c});
      }.bind(this));

    }
    var store = Ext.create('Ext.data.Store', {data: categoryData, fields: ['id', 'name']});
    return store;
  },
  loadDataToTemplateMgmtForm: function (data, btnText) {
    var form = this.getView().down('form');
    debugger
    var model = Ext.create('CaptivePortal.model.template_mgmt.TemplateMgmt', data.splash_journey);
    form.loadRecord(model);
    if (data.splash_journey.tnc_type) {
      this.getReferences().cb_ct.setValue(true);
      this.getReferences().rb_ct.setValue({
        ct: data.splash_journey.tnc_type
      });
    }
    if (data.splash_journey.privacy_policies_type) {
      this.getReferences().cb_pp.setValue(true);
      this.getReferences().rb_pp.setValue({
        pp: data.splash_journey.privacy_policies_type
      });
    }
    if (data.splash_journey.site_info && data.splash_journey.site_info.id) {
      form.down('#site_combo').setValue(data.splash_journey.site_info.id);
    }
    this.getView().down('#btn_addtemplate').setText(btnText ? btnText : 'Update');
    if (data.splash_journey.splash_template && data.splash_journey.splash_template.id) {
      form.down('#splash_template_id').setValue(data.splash_journey.splash_template.id);
    }
    if (data.splash_journey.sms_gateway_management_id) {
      //this.loadSMSGatewayDetails(form.down('#site_combo').getValue(), data.splash_journey.sms_gateway_management_id);
    }

    if (data && data.splash_journey && data.splash_journey.associated_resource) {
      //CaptivePortal.util.Utility.getSiteAndTagDetails(form.down('#site_combo'),form.down('#site_combo').getSelectedRecord());
      this.site_change(form.down('#site_combo'), data.splash_journey.sms_gateway_management_id);
      var currentTemplateId = this.getView().down('form').down('#splash_template_id').getValue();
      if (currentTemplateId) {
        var existingDiv = document.querySelector("div[data-id='" + currentTemplateId + "']");
        if (existingDiv) {
          existingDiv.style.backgroundColor = "#1FA1EB";
          this.getSMSGatewayDetails(existingDiv)
        }
      }
    }
  },
  cancelTemplateMgmt: function () {
    this.fireEvent('setTemplateMgmtActiveItem', 0);
    Ext.ComponentQuery.query('label#lab_appheading')[0].setText(CaptivePortal.Constant.TEMPLATE.SPLASH_PAGES);
  },
  resetSplashPageContent: function () {
    var view = this.getView();
    view.down('#sms-gateway-tab').tab.hide();
    view.down('#site-tag-err-lab').show();
    view.down('#site-tag-err-lab').setText('Please select Site / Group from above dropdown');
    view.down('#splash-page-details').el.dom.innerHTML = "";
    view.down('#splash-page-details').el.dom.style['border-width'] = '0px';
  },
  initiateTemplateMgmtForm: function (data) {
    CaptivePortal.util.Utility.hideSiteTagRefLabel(this.getView());
    this.resetForm();
    this.resetSplashPageContent();
    this.loadSitesDataToTemplateForm(data);
    this.getView().down('tabpanel').setActiveItem(0);
    this.getView().down('#btn_addtemplate').setText('Create');
    this.getView().down('#template_mgmt_form-category').bindStore(this.createCategoryStore(data));
  },
  loadSitesDataToTemplateForm: function (data) {
    var sites = CaptivePortal.util.Utility.createSitesAndTags(data);
    this.getView().down('#site_combo').store.loadRawData(sites);
  },
  resetForm: function () {
    var form = this.getView().down('form');
    form.reset();
  },
  saveTemplate: function (btn) {
    var flag = true;
    var form = btn.up('form'), data = {}, param = {};
    var con1 = this.getView().down('#sms-gateway-tab').tab.isVisible() && form.getValues().sms_gateway_management_id === '' && form.getValues().status === 'published'
    if (con1) {
      CaptivePortal.util.Utility.showError('Error', "SMS Gateway not configured for this template, You can't publish this");
    }
    else {
      if (this.getView().lookupReference('sms_gateway_management_id').getValue() != '') {
        flag = true;
      } else {
        flag = false;
        CaptivePortal.util.Utility.showError('Error', 'Please Select SMS Gateway');
      }
      if (flag) {
        // var form = btn.up('form'),  data = {}, param = {};        
        var textreaaFields = form.query('textareafield');
        var valid = true;
        Ext.Array.each(textreaaFields, function (f) {
          if (f.isValid()) {
            if (f.getValue().trim().length == 0) {
              valid = false;
              f.setValue('')
            }
          } else {
            valid = false;
            f.setValue('')
          }
          if (!valid) {
            return false;
          }
        }.bind(this));
        var isSuperAdmin = CaptivePortal.app.getUserRole() == 'super_admin', allow = true;
        if (!isSuperAdmin && !form.down('#site_combo').getValue()) {
          allow = false;
        }
        if (form.isValid() && allow) {
          data = form.getValues(), isEdit = data.id ? (data.id.indexOf('model') == -1 ? true : false) : false;
          var tenantId = CaptivePortal.app.getUserTenantID();
          ;
          if (tenantId) {
            data['tenant_id'] = tenantId;
          }
          data['default'] = form.down('#template_mgmt_form-default').getValue();
          data['custom_tnc'] = form.down('#template_mgmt_form-custom_tnc').getValue();
          data['custom_privacy_policies'] = form.down('#template_mgmt_form-custom_privacy_policies').getValue();
          data['tnc_type'] = this.getReferences().rb_ct.getValue().ct;
          data['privacy_policies_type'] = this.getReferences().rb_pp.getValue().pp;
          data['splash_template_attributes'] = {
            splash_content: {
              content_string: 'feawaaaa',
              content_array: ["3", "1", 3, 13, 132, 23131]
            }
          };
          param = {splash_journey: data};
          if (isEdit) {
            CaptivePortal.util.Utility.doAjaxJSON(CaptivePortal.Config.SERVICE_URLS.UPDATE_SPLASH_JOURNEY + param.splash_journey.id + '.json', param, CaptivePortal.app.getWaitMsg(), this.getView(), function (response) {
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
    }
  },
  preview: function (id) {
    var json = {"id": id};
    Ext.getCmp('viewport').setLoading(true);
    console.log(json);
    var url = CaptivePortal.Config.SERVICE_URLS.PREVIEW, method = 'POST';
    CaptivePortal.util.Utility.doAjaxJSON(url, json, "Loading...", this.getView(), function (response) {
      var resObj = response.responseText;
      CaptivePortal.util.Utility.createPreviewPage(resObj);
    }.bind(this), function (response) {
      var resObj = Ext.decode(response.responseText);
      if (!resObj.success && resObj.error.length) {
        CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
      }
    }, method);
  }

})

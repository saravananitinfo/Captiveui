/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('CaptivePortal.view.tenantconfig.Config', {
  extend: 'Ext.panel.Panel',
  requires: ['CaptivePortal.view.tenantconfig.ConfigController', 'CaptivePortal.view.tenantconfig.ConfigModel'],
  alias: 'widget.tenantconfig_config',
  controller: 'tenantconfig_configcontroller',
  viewModel: {
    type: 'tenantconfig_configmodel'
  },
  layout: {
    type: 'border'
  },
  border: true,
  defaults: {
    bodyStyle: 'padding:15px'
  },
  items: [{
      xtype: 'container',
      width: 300,
      layout: 'fit',
      border: true,
      height: '100%',
      region: 'west',
      items: [{
          xtype: 'panel',
          border: true,
          layout: {
            type: 'accordion'
          },
          items: [{
              xtype: 'panel',
              listeners: {
                expand: 'onExpand'
              },
              title: 'Policy',
              items: [{
                  xtype: 'segmentedbutton',
                  reference: 'sb_policy',
                  padding: 10,
                  height: 30,
                  width: '100%',
                  vertical: true,
                  listeners: {
                    toggle: 'onChangeView'
                  },
                  items: [{
                      text: 'Privacy Policy',
                      pressed: true
                    }, {
                      text: 'Terms & Condition'
                    }]
                }]
            }, {
              xtype: 'panel',
              listeners: {
                expand: 'onExpand'
              },
              title: 'Social Apps',
              items: [{
                  xtype: 'segmentedbutton',
                  reference: 'sb_socialapps',
                  padding: 10,
                  height: 30,
                  width: '100%',
                  vertical: true,
                  listeners: {
                    toggle: 'onChangeView'
                  },
                  items: [{
                      text: 'Facebook'
                    }, {
                      text: 'Twitter'
                    }, {
                      text: 'Google'
                    }]
                }]
            }, {
              xtype: 'panel',
              listeners: {
                expand: 'onExpand'
              },
              title: 'Guest Access Default',
              items: [{
                  xtype: 'segmentedbutton',
                  reference: 'sb_guest',
                  padding: 10,
                  height: 30,
                  width: '100%',
                  vertical: true,
                  listeners: {
                    toggle: 'onChangeView'
                  },
                  items: [{
                      text: 'Setting'
                    }]
                }]
            }]
        }]
    }, {
      xtype: 'panel',
      region: 'center',
      reference: 'con_wrapper',
      dockedItems: [{
          xtype: 'toolbar',
          dock: 'bottom',
          layout: 'hbox',
          width: '95%',
          height: 40,
          items: [{
              xtype: 'tbfill'
            },
            {
              xtype: 'button',
              reference: 'btn_save',
              formBind: true,
              text: 'Save',
              handler: 'save',
              cls: 'btn'
            },
            {
              xtype: 'button',
              margin: '0 10 0 0',
              text: 'Cancel',
              handler: 'cancelSite',
              cls: 'btn btn-cancel'
            }
          ]
        }],
      height: '100%',
      layout: {
        type: 'vbox',
        pack: 'center',
        align: 'middle'
      },
      items: [{
          xtype: 'container',
          reference: 'con_pp',
          items: [{
              xtype: 'radiogroup',
              width: 300,
              reference: 'rg_privacypolicyoption',
              padding: 10,
              listeners: {
                change: 'onPrivacyPolicyOptionChange'
              },
              bind: {
                value: '{tenantconfig.privacy_policies_type}'
              },
              columns: 2,
              items: [
                {boxLabel: 'Custom', name: 'pp', inputValue: 'custom'},
                {boxLabel: 'External Link', name: 'pp', inputValue: 'link'}
              ]
            }, {
              xtype: 'textarea',
              hidden: true,
              padding: 20,
              cls: 'header_label_content',
              reference: 'txt_policydesc',
              fieldLabel: 'Description',
              bind: {
                value: '{tenantconfig.privacy_policies}'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              padding: 20,
              fieldLabel: 'URL',
              reference: 'txt_policylink',
              bind: {
                value: '{tenantconfig.privacy_policies_link}'
              }
            }]
        }, {
          xtype: 'container',
          hidden: true,
          reference: 'con_tc',
          items: [{
              xtype: 'radiogroup',
              reference: 'rg_tcoption',
              width: 300,
              padding: 10,
              listeners: {
                change: 'onTcOptionChange'
              },
              bind: {
                value: '{tenantconfig.tnc_type}'
              },
              columns: 2,
              items: [
                {boxLabel: 'Custom', name: 'tc', inputValue: 'custom'},
                {boxLabel: 'External Link', name: 'tc', inputValue: 'link'}
              ]
            }, {
              xtype: 'textarea',
              hidden: true,
              padding: 20,
              reference: 'txt_tncdesc',
              fieldLabel: 'Description',
              bind: {
                value: '{tenantconfig.tnc}'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              padding: 20,
              fieldLabel: 'URL',
              reference: 'txt_tnclink',
              bind: {
                value: '{tenantconfig.tnc_link}'
              }
            }]
        }, {
          xtype: 'container',
          hidden: true,
          reference: 'con_fb',
          items: [{
              xtype: 'textfield',
              reference: 'txt_fbapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: '{tenantconfig.fbapikey}'
              }
            }, {
              xtype: 'textfield',
              reference: 'txt_fbsecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: '{tenantconfig.fbsecretkey}'
              }
            }]
        }, {
          xtype: 'container',
          hidden: true,
          reference: 'con_tw',
          items: [{
              xtype: 'textfield',
              reference: 'txt_twitterapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: '{tenantconfig.twitterapikey}'
              }
            }, {
              xtype: 'textfield',
              reference: 'txt_twittersecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: '{tenantconfig.twittersecretkey}'
              }
            }]
        }, {
          xtype: 'container',
          hidden: true,
          reference: 'con_go',
          items: [{
              xtype: 'textfield',
              reference: 'txt_googleapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: '{tenantconfig.googleapikey}'
              }
            }, {
              xtype: 'textfield',
              reference: 'txt_googlesecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: '{tenantconfig.googlesecretkey}'
              }
            }]
        }, {
          xtype: 'container',
          hidden: true,
          itemId: 'tenant_config',
          reference: 'con_setting',
          items: [{
              xtype: 'container',              
              style: 'border-radius:50px',
              items: [{
                  xtype: 'image',
                  id: 'tena_img',
                  src: '',
                  height: 64,
                  width: 64,
                  bind: {
                    src: '{tenantconfig.img}'
                  }
                }]
            }, {
              xtype: 'checkboxgroup',
              width: 500,
              padding: 20,
              reference: 'cg_socialauto',
              fieldLabel: 'Social Auto',
              columns: 3,
              bind: {
                value: '{tenantconfig.automac}'
              },
              items: [
                {boxLabel: 'Facebook', id: 'fb', name: 'automac', inputValue: 'fb'},
                {boxLabel: 'Twitter', id: 'tw', name: 'automac', inputValue: 'tw'},
                {boxLabel: 'Google', id: 'gp', name: 'automac', inputValue: 'gp'}
              ]
            }, {
              xtype: 'numberfield',
              padding: 20,
              fieldLabel: 'Session Timeout',
              reference: 'nf_sessiontimeout',
              bind: {
                value: '{tenantconfig.session_time}'
              }
            }, {
              xtype: 'numberfield',
              padding: 20,
              fieldLabel: 'Idle Timeout',
              reference: 'nf_idletimeout',
              bind: {
                value: '{tenantconfig.idle_time}'
              }
            }, {
              xtype: 'filefield',
              margin: '20 10 0 20',               
              fieldLabel :'Profile Picture',
              name: 'file_data',
              emptyText: "Select Image",
              width: 400,
              labelWidth:110,
              id: 'dd',
              //hideLabel: true,
              itemId: 'upload_field'
            }, {
              xtype: 'button',              
              margin: '10 10 10 20',
              text: 'Upload',
              handler: function () {
                var con = Ext.ComponentQuery.query('#tenant_config')[0]
                file = con.el.down('input[type=file]').dom.files[0];
                console.log(file);
                var reader = new FileReader();
                reader.onload = function (e) {
                  var json = {};
                  json['logo'] = e.target.result;
                  var url = CaptivePortal.Config.SERVICE_URLS.UPDATE_TENANT + CaptivePortal.app.getUserTenantID() + '.json', method = 'PUT';
                  CaptivePortal.util.Utility.doAjaxJSON(url, data = {tenant: json}, "Loading...", '', function (response) {
                    var resObj = Ext.decode(response.responseText);
                    console.log(CaptivePortal.util.Utility.BASE_URL + resObj.data.tenant.logo);
                    Ext.getCmp('tena_img').setSrc(CaptivePortal.util.Utility.BASE_URL + resObj.data.tenant.logo);
                    if (resObj.success) {

                    }
                  }.bind(this), function (response) {
                    var resObj = Ext.decode(response.responseText);
                    if (!resObj.success && resObj.error.length) {
                      CaptivePortal.util.Utility.showError('Error', resObj.error.join(' '));
                    }
                  }, method);

                  Ext.getCmp('viewport').setLoading(false);
                }
                reader.readAsDataURL(file);
              }
            }]
        }]
    }]
});

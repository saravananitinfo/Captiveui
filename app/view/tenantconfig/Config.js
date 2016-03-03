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
              title: 'Policy',
              items: [{
                  xtype: 'segmentedbutton',
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
              title: 'Social Apps',
              items: [{
                  xtype: 'segmentedbutton',
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
              title: 'Guest Access Default',
              items: [{
                  xtype: 'segmentedbutton',
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
      xtype: 'container',
      region: 'center',
      layout: 'card',
      items: [{
          xtype: 'panel',
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
                  handler: 'saveSite',
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
              xtype: 'radiogroup',
              reference: 'rg_privacypolicyoption',
              listeners: {
                change: 'onPrivacyPolicyOptionChange'
              },
              columns: 2,
              items: [
                {boxLabel: 'Custom', name: 'rb', inputValue: 'ppcustom'},
                {boxLabel: 'External Link', name: 'rb', inputValue: 'ppexternal'}
              ]
            }, {
              xtype: 'textarea',
              hidden: true,
              padding: 10,
              reference: 'txt_policydesc',
              fieldLabel: 'Description',
              bind: {
                value: '{tenantconfig.privacy_policies}'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              padding: 10,
              fieldLabel: 'URL',
              reference: 'txt_policylink',
              bind: {
                value: '{tenantconfig.privacy_policies_link}'
              }
            }, {
              xtype: 'radiogroup',
              hidden: true,
              reference: 'rg_tcoption',
              listeners: {
                change: 'onTcOptionChange'
              },
              columns: 2,
              items: [
                {boxLabel: 'Custom', name: 'rb', inputValue: 'tccustom'},
                {boxLabel: 'External Link', name: 'rb', inputValue: 'tcexternal'}
              ]
            }, {
              xtype: 'textarea',
              hidden: true,
              padding: 10,
              reference: 'txt_tcdesc',
              fieldLabel: 'Description',
              bind: {
                value: '{tenantconfig.tnc}'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              padding: 10,
              fieldLabel: 'URL',
              reference: 'txt_tnclink',
              bind: {
                value: '{tenantconfig.tnc_link}'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_fbapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: 'tenantconfig.fbapikey'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_fbsecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: 'tenantconfig.fbsecretkey'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_twitterapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: 'tenantconfig.twitterapikey'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_twittersecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: 'tenantconfig.twittersecretkey'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_googleapikey',
              padding: 10,
              fieldLabel: 'API Key',
              bind: {
                value: 'tenantconfig.googleapikey'
              }
            }, {
              xtype: 'textfield',
              hidden: true,
              reference: 'txt_googlesecretkey',
              padding: 10,
              fieldLabel: 'Secret Key',
              bind: {
                value: 'tenantconfig.googlesecretkey'
              }
            }, {
              xtype: 'checkboxgroup',
              hidden: true,
              width: 500,
              padding: 10,
              reference: 'cg_socialauto',
              fieldLabel: 'Social Auto',
              columns: 3,
              items: [
                {boxLabel: 'Facebook', name: 'rb', inputValue: '1'},
                {boxLabel: 'Twitter', name: 'rb', inputValue: '2', checked: true},
                {boxLabel: 'Google', name: 'rb', inputValue: '3'}
              ]
            }, {
              xtype: 'numberfield',
              hidden: true,
              padding: 10,
              fieldLabel: 'Session Timeout',
              reference: 'nf_sessiontimeout',
              bind: {
                value: 'tenantconfig.sessiontimeout'
              }
            }, {
              xtype: 'numberfield',
              hidden: true,
              padding: 10,
              fieldLabel: 'Idle Timeout',
              reference: 'nf_idletimeout',
              bind: {
                value: 'tenantconfig.idletimeout'
              }
            }]
        }]
    }]
});


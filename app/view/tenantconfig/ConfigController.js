Ext.define('CaptivePortal.view.tenantconfig.ConfigController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.tenantconfig_configcontroller',
  listen: {
    controller: {
      '#vc_homecontroller': {
        initTenantConfig: 'doInitLoad'
      }
    }
  },
  config: {
    data: null
  },
  doInitLoad: function () {
    var me = this;
    var refs = this.getReferences();
    var model = this.getView().getViewModel();
    model.getStore('tenantconfig').load({
      callback: function (rec) {
        me.setData(rec[0].data);
        Ext.Array.each(me.getData(), function (data) {
          if (data.privacy_policies_type === 'custom') {
            refs.txt_policydesc.setVisible(true);
            refs.rg_privacypolicyoption.setValue({
              rb: 'ppcustom'
            });
          } else {
            refs.txt_policylink.setVisible(true);
            refs.rg_privacypolicyoption.setValue({
              rb: 'ppexternal'
            });
          }
          model.set('tenantconfig', {
            privacy_policies: data.privacy_policies,
            privacy_policies_link: data.privacy_policies_link
          });
        });
      }
    });
  },
  onPrivacyPolicyOptionChange: function (rg, newValue, oldValue, eOpts) {
    var refs = this.getReferences();
    if (newValue.rb === 'ppcustom') {
      refs.txt_policydesc.setVisible(true);
      if (refs.txt_policylink.isVisible())
        refs.txt_policylink.setVisible(false);
    } else {
      refs.txt_policylink.setVisible(true);
      refs.txt_policydesc.setVisible(false);
    }
  },
  onTcOptionChange: function (rg, newValue) {
    var refs = this.getReferences();
    if (newValue.rb === 'tccustom') {
      refs.txt_tcdesc.setVisible(true);
      if (refs.txt_tclink.isVisible())
        refs.txt_tclink.setVisible(false);
    } else {
      refs.txt_tclink.setVisible(true);
      refs.txt_tcdesc.setVisible(false);
    }
  },
  onChangeView: function (sb, button, isPressed, eOpts) {
    var refs = this.getReferences();
    if (button.text === 'Privacy Policy' && isPressed) {

    } else if (button.text === 'Terms & Condition' && isPressed) {

    } else if (button.text === 'Facebook' && isPressed) {

    } else if (button.text === 'Twitter' && isPressed) {

    } else if (button.text === 'Google' && isPressed) {

    } else if (button.text === 'Google' && isPressed) {

    } else if (button.text === 'Setting' && isPressed) {

    }

  }
});


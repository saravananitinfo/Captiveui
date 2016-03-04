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
  save: function () {
    var con = this.getActiveContainer();
    Ext.Array.each(con.items.items, function (data) {
      console.log(data)
    });
  },
  onExpand: function (panel) {
    var refs = this.getReferences();
    switch (panel.title) {
      case "Policy":
        if (this.getActivePolicyTab(refs.sb_policy.items.items) === 'Privacy Policy') {
          this.show('con_pp');
        } else if (this.getActivePolicyTab(refs.sb_policy.items.items) === 'Terms & Condition') {
          this.show('con_tc');
        }
        break;
      case "Social Apps":
        if (this.getActivePolicyTab(refs.sb_socialapps.items.items) === 'Facebook') {
          this.show('con_fb');
        } else if (this.getActivePolicyTab(refs.sb_socialapps.items.items) === 'Twitter') {
          this.show('con_tw');
        } else if (this.getActivePolicyTab(refs.sb_socialapps.items.items) === 'Google') {
          this.show('con_go');
        }
        break;
      case "Guest Access Default":
        if (this.getActivePolicyTab(refs.sb_guest.items.items) === 'Setting') {
          this.show('con_setting');
        }
        break;
    }
  },
  getActivePolicyTab: function (container) {
    var name;
    Ext.Array.each(container, function (btn) {
      if (btn.pressed) {
        name = btn.text;
      }
    });
    return name;
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
          } else {
            refs.txt_policylink.setVisible(true);
          }
          model.set('tenantconfig', {
            name: data.name,
            privacy_policies: data.privacy_policies,
            privacy_policies_link: data.privacy_policies_link,
            automac: {
              automac: data.automac
            },
            privacy_policies_type: {
              pp: data.privacy_policies_type
            },
            tnc: data.tnc,
            tnc_link: data.tnc_link,
            tnc_type: {
              tc: data.tnc_type
            },
            fbapikey: data.fb_details.client_id,
            fbsecretkey: data.fb_details.client_secret,
            googleapikey: data.gp_details.client_id,
            googlesecretkey: data.gp_details.client_secret,
            twitterapikey: data.tw_details.consumer_id,
            twittersecretkey: data.tw_details.consumer_key,
            session_time: data.session_time,
            idle_time: data.idle_time
          });
        });
      }
    });
  },
  onPrivacyPolicyOptionChange: function (rg, newValue, oldValue, eOpts) {
    var refs = this.getReferences();
    if (newValue.pp === 'custom') {
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
    if (newValue.tc === 'custom') {
      refs.txt_tncdesc.setVisible(true);
      if (refs.txt_tnclink.isVisible())
        refs.txt_tnclink.setVisible(false);
    } else {
      refs.txt_tnclink.setVisible(true);
      refs.txt_tncdesc.setVisible(false);
    }
  },
  onChangeView: function (sb, button, isPressed, eOpts) {
    if (button.text === 'Privacy Policy' && isPressed) {
      this.show('con_pp');
    } else if (button.text === 'Terms & Condition' && isPressed) {
      this.show('con_tc');
    } else if (button.text === 'Facebook' && isPressed) {
      this.show('con_fb');
    } else if (button.text === 'Twitter' && isPressed) {
      this.show('con_tw');
    } else if (button.text === 'Google' && isPressed) {
      this.show('con_go');
    } else if (button.text === 'Setting' && isPressed) {
      this.show('con_setting');
    }
  },
  getActiveContainer: function () {
    var refs = this.getReferences();
    var view;
    Ext.Array.each(refs.con_wrapper.items.items, function (container) {
      if (!container.isHidden()) {
        view = container;
        return;
      }
    });
    return view;
  },
  show: function (containername) {
    var refs = this.getReferences();
    Ext.Array.each(refs.con_wrapper.items.items, function (con) {
      if (con.reference === containername)
        con.show();
      else
        con.hide();
    });
  }
});


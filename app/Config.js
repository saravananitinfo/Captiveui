Ext.define('CaptivePortal.Config', {
    singleton: true,
	MESSAGES:{
		FORGET_PASSWORD_SUCCESS_INFO : 'Mail is sent for forget password. So Please check it'
	},
    SERVICE_URLS:{		
		LOGIN :	CaptivePortal.util.Utility.BASE_URL + 'portal/users/sign_in.json',
		GET_USER_PROFILES : CaptivePortal.util.Utility.BASE_URL + 'set_profile',
		LOGOUT: CaptivePortal.util.Utility.BASE_URL + 'portal/users/sign_out.json',
		SEND_FORGET_PASSWORD: CaptivePortal.util.Utility.BASE_URL + 'portal/users/password.json',
		GET_ROLES:CaptivePortal.util.Utility.BASE_URL + 'site_roles.json',
		NEW_ROLE:CaptivePortal.util.Utility.BASE_URL + 'site_roles/new.json',
		SAVE_ROLE:CaptivePortal.util.Utility.BASE_URL + 'site_roles.json',
		EDIT_ROLE:CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
		UPDATE_ROLE:CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
		DELETE_ROLE:CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
		GET_TENANTS:CaptivePortal.util.Utility.BASE_URL + 'tenants.json',
		NEW_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants/new.json',
		SAVE_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants.json',
		EDIT_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants/',
		UPDATE_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants/',
		DELETE_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants/',
		GET_NEW_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles/new.json',
		SAVE_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles.json',
		GET_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles.json',
		EDIT_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
		UPDATE_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
		DELETE_USER:CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
		LOAD_SITE:CaptivePortal.util.Utility.BASE_URL + 'sites.json',
		SAVE_SITE:CaptivePortal.util.Utility.BASE_URL + 'sites.json',
		EDIT_SITE:CaptivePortal.util.Utility.BASE_URL + 'sites/',
		UPDATE_SITE:CaptivePortal.util.Utility.BASE_URL + 'sites/',
		DELETE_SITE:CaptivePortal.util.Utility.BASE_URL + 'sites/',
		GET_SITES_FOR_TENANT:CaptivePortal.util.Utility.BASE_URL + 'tenants/',
		GET_CURRENT_USER_DETAILS:CaptivePortal.util.Utility.BASE_URL + 'get_current_user_details.json',
        RESET_PASSWORD_LINK :CaptivePortal.util.Utility.BASE_URL + 'portal/users/password.json',
        

        // SMS Gateway Url

        GET_SMSGATEWAYS:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
		NEW_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/new.json',
		SAVE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
		EDIT_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
		DELETE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
		UPDATE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
	}
});

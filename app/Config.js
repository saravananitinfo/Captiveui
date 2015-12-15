Ext.define('CaptivePortal.Config', {
    singleton: true,
    MESSAGES: {
        FORGET_PASSWORD_SUCCESS_INFO: 'Mail is sent for forget password. So Please check it'
    },
    SERVICE_URLS: {
        LOGIN: CaptivePortal.util.Utility.BASE_URL + 'portal/users/sign_in.json',
        GET_USER_PROFILES: CaptivePortal.util.Utility.BASE_URL + 'set_profile',
        LOGOUT: CaptivePortal.util.Utility.BASE_URL + 'portal/users/sign_out.json',
        SEND_FORGET_PASSWORD: CaptivePortal.util.Utility.BASE_URL + 'portal/users/password.json',
        GET_ROLES: CaptivePortal.util.Utility.BASE_URL + 'site_roles.json',
        NEW_ROLE: CaptivePortal.util.Utility.BASE_URL + 'site_roles/new.json',
        SAVE_ROLE: CaptivePortal.util.Utility.BASE_URL + 'site_roles.json',
        EDIT_ROLE: CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
        UPDATE_ROLE: CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
        DELETE_ROLE: CaptivePortal.util.Utility.BASE_URL + 'site_roles/',
        GET_TENANTS: CaptivePortal.util.Utility.BASE_URL + 'tenants.json',
        NEW_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/new.json',
        SAVE_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants.json',
        EDIT_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        GET_TENANT_USER: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        UPDATE_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        DELETE_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',

        //user 
        GET_NEW_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles/new.json',
        GET_SITES_TAGS_FOR_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        SAVE_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles.json',
        GET_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles.json',
        EDIT_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
        UPDATE_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
        DELETE_USER: CaptivePortal.util.Utility.BASE_URL + 'user_profiles/',
        

        GET_TAGS_FOR_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        LOAD_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites.json',
        SAVE_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites.json',
        EDIT_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/',
        UPDATE_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/',
        DELETE_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/',
        GET_SITES_FOR_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        GET_CURRENT_USER_DETAILS: CaptivePortal.util.Utility.BASE_URL + 'get_current_user_details.json',
        RESET_PASSWORD_LINK: CaptivePortal.util.Utility.BASE_URL + 'portal/users/password.json',
        // SMS Gateway Url

        GET_SMSGATEWAYS:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
		NEW_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/new.json',
		SAVE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
		EDIT_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
		DELETE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
		UPDATE_SMSGATEWAY:CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
        GATEWAY_VERIFICATION:CaptivePortal.util.Utility.BASE_URL + '/gateway_verification.json',

		// Guest Users Url

		GET_GUESTUSERS:CaptivePortal.util.Utility.BASE_URL + 'guest_users.json',
		NEW_GUESTUSER:CaptivePortal.util.Utility.BASE_URL + 'guest_users/new.json',
		SAVE_GUESTUSER:CaptivePortal.util.Utility.BASE_URL + 'guest_users.json',
		EDIT_GUESTUSER:CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
		DELETE_GUESTUSER:CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
		UPDATE_GUESTUSER:CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
        UPLOAD_GUESTUSERS:CaptivePortal.util.Utility.BASE_URL + 'guest_users/guest_user_csv.json',

        // Access Point Url

        GET_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points.json',
        NEW_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points/new.json',
        SAVE_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points.json',
        EDIT_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points/',
        DELETE_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points/',
        UPDATE_ACCESSPOINT:CaptivePortal.util.Utility.BASE_URL + 'access_points/',

        //access time policy
        GET_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies.json',
        NEW_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies/new.json',
        SAVE_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies.json',
        EDIT_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies/',
        UPDATE_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies/',
        DELETE_ACCESS_TIME_POLICY:CaptivePortal.util.Utility.BASE_URL + 'time_policies/',

        // Splash Journey
        GET_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys.json',
        NEW_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/new.json',
        SAVE_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys.json',
        DELETE_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        EDIT_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        UPDATE_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        DUPLICATE_SPLASH_JOURNEY:CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',

        // Radius config
        SAVE_RADIUS_VSA:CaptivePortal.util.Utility.BASE_URL + 'radius_vsas.json',
        GET_RADIUS_VSA:CaptivePortal.util.Utility.BASE_URL + 'radius_vsas.json',
        DELETE_RADIUS_VSA:CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',
        EDIT_RADIUS_VSA:CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',
        UPDATE_RADIUS_VSA:CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',


        //Rule Group
        SAVE_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups.json',
        GET_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups.json',
        NEW_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/new.json',
        DELETE_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
	}
});

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

        //Image Upload
        UPLOAD_IMAGE:CaptivePortal.util.Utility.BASE_URL + 'galleries.json',
        GALLERY:CaptivePortal.util.Utility.BASE_URL + 'galleries.json',

        EDIT_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
        UPDATE_RULE_GROUP:CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
        GET_SPLASHES_FOR_RESOURCE:CaptivePortal.util.Utility.BASE_URL + 'journeys/',
	},
    TEMPLATES: {
        template1: {"rows":[{"col_type":"theme_col_1","background":"rgb(253, 251, 248)","height":154,"widgets":[{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa48b736d735e02490000/medium.jpg?1450878088","height":103,"width":124,"top":10,"left":403}}]},{"col_type":"theme_col_1","background":"rgb(249, 249, 249)","height":108,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<div style=\"color: rgb(0, 0, 0); text-align: center;\"><b><font size=\"2\" style=\"color: rgb(51, 153, 102);\">​</font></b></div><div style=\"text-align: center;\"><b><font size=\"6\" color=\"#339966\">Welcome To StarBucks</font></b></div>"}}]},{"col_type":"theme_col_2","background":"rgb(252, 250, 243)","height":204,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<font color=\"#339966\"><font size=\"3\">​Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</font><span style=\"font-size: medium;\">Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</span></font>"}},{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/56794b0d736d735e0c000000/medium.jpg?1450789644","height":161,"width":222,"top":0,"left":106}}]},{"col_type":"theme_col_1","background":"rgb(45, 125, 98)","height":120,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":10,"font_size":18,"txt_color":"","bg_color":"","border_radius":6,"top":19,"left":415}}]}],"style":{"background":"rgb(255, 255, 255)"}},
        template2: {}
    }
});

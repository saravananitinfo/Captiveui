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
        ASSUME_USER_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
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
        NEW_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/new.json',
        UPDATE_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/',
        DELETE_SITE: CaptivePortal.util.Utility.BASE_URL + 'sites/',
        GET_SITES_FOR_TENANT: CaptivePortal.util.Utility.BASE_URL + 'tenants/',
        GET_CURRENT_USER_DETAILS: CaptivePortal.util.Utility.BASE_URL + 'get_current_user_details.json',
        RESET_PASSWORD_LINK: CaptivePortal.util.Utility.BASE_URL + 'portal/users/password.json',
        // SMS Gateway Url

        GET_SMSGATEWAYS: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
        NEW_SMSGATEWAY: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/new.json',
        SAVE_SMSGATEWAY: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements.json',
        EDIT_SMSGATEWAY: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
        DELETE_SMSGATEWAY: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
        UPDATE_SMSGATEWAY: CaptivePortal.util.Utility.BASE_URL + 'sms_gateway_managements/',
        GATEWAY_VERIFICATION: CaptivePortal.util.Utility.BASE_URL + '/gateway_verification.json',
        // Guest Users Url

        GET_GUESTUSERS: CaptivePortal.util.Utility.BASE_URL + 'guest_users.json',
        NEW_GUESTUSER: CaptivePortal.util.Utility.BASE_URL + 'guest_users/new.json',
        SAVE_GUESTUSER: CaptivePortal.util.Utility.BASE_URL + 'guest_users.json',
        EDIT_GUESTUSER: CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
        DELETE_GUESTUSER: CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
        UPDATE_GUESTUSER: CaptivePortal.util.Utility.BASE_URL + 'guest_users/',
        UPLOAD_GUESTUSERS: CaptivePortal.util.Utility.BASE_URL + 'guest_users/guest_user_csv.json',
        // Inventory Url

        GET_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points.json',
        NEW_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points/new.json',
        SAVE_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points.json',
        EDIT_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points/',
        DELETE_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points/',
        UPDATE_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points/',
        UPLOAD_ACCESSPOINT: CaptivePortal.util.Utility.BASE_URL + 'access_points/access_point_csv.json',
        //access time policy
        GET_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies.json',
        NEW_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies/new.json',
        SAVE_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies.json',
        EDIT_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies/',
        UPDATE_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies/',
        DELETE_ACCESS_TIME_POLICY: CaptivePortal.util.Utility.BASE_URL + 'time_policies/',
        // Splash Journey
        GET_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys.json',
        NEW_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/new.json',
        SAVE_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys.json',
        DELETE_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        EDIT_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        UPDATE_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        DUPLICATE_SPLASH_JOURNEY: CaptivePortal.util.Utility.BASE_URL + 'splash_journeys/',
        GET_SPLASH_TEMPLATE_SMS_GATEWAY: CaptivePortal.util.Utility.BASE_URL + 'templates_and_gateways/',
        GET_SPLASH_TEMPLATE_DETAILS: CaptivePortal.util.Utility.BASE_URL + 'templates/',
        // Radius config
        SAVE_RADIUS_VSA: CaptivePortal.util.Utility.BASE_URL + 'radius_vsas.json',
        GET_RADIUS_VSA: CaptivePortal.util.Utility.BASE_URL + 'radius_vsas.json',
        DELETE_RADIUS_VSA: CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',
        EDIT_RADIUS_VSA: CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',
        UPDATE_RADIUS_VSA: CaptivePortal.util.Utility.BASE_URL + 'radius_vsas/',
        //Rule Group
        SAVE_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups.json',
        GET_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups.json',
        NEW_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/new.json',
        DELETE_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
        //Image Upload
        UPLOAD_IMAGE: CaptivePortal.util.Utility.BASE_URL + 'galleries.json',
        GALLERY: CaptivePortal.util.Utility.BASE_URL + 'galleries.json',
        EDIT_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
        UPDATE_RULE_GROUP: CaptivePortal.util.Utility.BASE_URL + 'splash_rule_groups/',
        GET_SPLASHES_FOR_RESOURCE: CaptivePortal.util.Utility.BASE_URL + 'journeys/',
        //Splash Templates
        // GET_SPLASH_TEMPLATES:CaptivePortal.util.Utility.BASE_URL+ 'splash_templates.json',
        // SAVE_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL+ 'splash_templates.json',

        GET_SPLASH_TEMPLATES:CaptivePortal.util.Utility.BASE_URL + 'splash_templates.json',
        SAVE_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL + 'splash_templates.json',
        DELETE_SPLASH_TEMPLATES:CaptivePortal.util.Utility.BASE_URL + 'splash_templates/',
        NEW_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL + 'splash_templates/new.json',
        EDIT_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL + 'splash_templates/',
        UPDATE_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL + 'splash_templates/',
        DUPLICATE_SPLASH_TEMPLATE:CaptivePortal.util.Utility.BASE_URL + 'splash_templates/',

        CHANGE_PASSWORD : CaptivePortal.util.Utility.BASE_URL + 'change_password.json',
        
                //Reports
        GET_ACTIVE_SESSION_REPORT: CaptivePortal.util.Utility.BASE_URL + 'current_visitor_sessions.json',
        GET_SESSION_HISTORY_REPORT: CaptivePortal.util.Utility.BASE_URL + 'visitor_session_histories.json',
        //Editor
        // PREVIEW: 'http://192.168.0.220:3001/' + 'preview/',
        PREVIEW: CaptivePortal.util.Utility.BASE_URL + 'preview/',

        // Get Countries
        GET_COUNTRIES: CaptivePortal.util.Utility.BASE_URL + 'countries.json',
        GET_STATES: CaptivePortal.util.Utility.BASE_URL + 'states/'
    },
    TEMPLATES: {
        template1: {"rows": [{"col_type": "theme_col_2", "background": "rgb(252, 250, 243)", "height": 204, "widgets": [{"widget_type": "text_widget", "attributes": {"html_str": "<font color=\"#339966\"><font size=\"3\">​Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</font><span style=\"font-size: medium;\">Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</span></font>"}}, {"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/56794b0d736d735e0c000000/medium.jpg?1450789644", "height": 161, "width": 222, "top": 0, "left": 106}}]}]},
        template2: {"rows": [{"col_type": "theme_col_4", "background": "rgb(202, 255, 211)", "height": 224, "widgets": [{"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa83e736d73741a070000/medium.jpg?1450879036", "width": 244, "height": 188, "top": 0, "left": 0}}, {"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa73a736d73741a060000/medium.jpg?1450878776", "width": 244, "height": 188, "top": 0, "left": 0}}, {"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa6eb736d73741a050000/medium.jpg?1450878697", "width": 244, "height": 187, "top": 0, "left": 0}}, {"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aab22736d73741a0a0000/medium.jpg?1450879776", "width": 274, "height": 187, "top": 0, "left": 0}}]}]},
        template3: {"rows": [{"col_type": "theme_col_1", "background": "transparent", "height": 209, "widgets": [{"widget_type": "text_widget", "attributes": {"html_str": "<div>\n            <h1 style=\"text-align: center;font-weight: 800; font-size: 2.8em; line-height: 1.4;  text-transform: uppercase;\"><font size=\"7\">Beautiful content. Responsive.</font></h1>\n            <p style=\"text-align: center; font-size:1.5em; font-style:italic\"><font size=\"4\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</font></p>\n        </div>"}}]}]},
        template4: {"rows": [{"col_type": "theme_col_1", "background": "transparent", "height": 165, "widgets": [{"widget_type": "text_widget", "attributes": {"html_str": "<div style=\"padding-left: 1.32rem; padding-right: 1.32rem;font-size: 100%;line-height: 1.7;\">\n            <p style=\"text-align: left;\"><font size=\"3\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus leo ante, consectetur sit amet vulputate vel, dapibus sit amet lectus.</font></p>\n        </div>"}}]}], "style": {"background": "transparent"}},
        template5: {"rows": [{"col_type": "theme_col_2", "background": "transparent", "height": 275, "widgets": [{"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/resources/images/editor_default/01.jpg", "width": 395, "height": 219, "top": 15, "left": 88}}, {"widget_type": "text_widget", "attributes": {"html_str": "<h3><font size=\"4\" color=\"#808080\"><br></font></h3><h3><font size=\"4\" color=\"#808080\">Lorem Ipsum is simply dummy text</font></h3>\n            <p><font size=\"3\" style=\"line-height: 1.7;\" color=\"#969696\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</font></p>"}}]}], "style": {"background": "transparent"}},
        template6: {"rows": [{"col_type": "theme_col_2", "background": "transparent", "height": 294, "widgets": [{"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/resources/images/editor_default/05.jpg", "width": 395, "height": 250, "top": 0, "left": 64}}, {"widget_type": "img_widget", "attributes": {"src": "http://ec2-54-234-147-190.compute-1.amazonaws.com:8080/resources/images/editor_default/06.jpg", "width": 395, "height": 250, "top": 0, "left": 67}}]}, {"col_type": "theme_col_2", "background": "transparent", "height": 121, "widgets": [{"widget_type": "text_widget", "attributes": {"html_str": "<span style=\"color: rgb(128, 128, 128); font-size: large;\"><200b></span><span style=\"color: rgb(128, 128, 128); font-size: large; font-family: 'Open Sans', sans-serif; line-height: 27.4747px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span>"}}, {"widget_type": "text_widget", "attributes": {"html_str": "<div style=\"text-align: left;\"><span style=\"color: rgb(128, 128, 128); font-size: large;\"><200b></span><span style=\"color: rgb(128, 128, 128); font-size: large; font-family: 'Open Sans', sans-serif; line-height: 27.4747px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</span></div>"}}]}], "style": {"background": "transparent"}}
    }
});

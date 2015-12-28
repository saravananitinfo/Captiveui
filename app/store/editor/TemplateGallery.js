Ext.define('CaptivePortal.store.editor.TemplateGallery',{
	extend:'Ext.data.Store',
	autoload:false,
	fields:[
		{ name:'name', type:'string'},
		{ name:'jsn', type:'auto'}
	],
	data: [
    	{name: 'Coffee Template', jsn: {"rows":[{"col_type":"theme_col_1","background":"rgb(253, 251, 248)","height":154,"widgets":[{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/567aa48b736d735e02490000/medium.jpg?1450878088","height":103,"width":124,"top":10,"left":403}}]},{"col_type":"theme_col_1","background":"rgb(249, 249, 249)","height":108,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<div style=\"color: rgb(0, 0, 0); text-align: center;\"><b><font size=\"2\" style=\"color: rgb(51, 153, 102);\">​</font></b></div><div style=\"text-align: center;\"><b><font size=\"6\" color=\"#339966\">Welcome To StarBucks</font></b></div>"}}]},{"col_type":"theme_col_2","background":"rgb(252, 250, 243)","height":204,"widgets":[{"widget_type":"text_widget","attributes":{"html_str":"<font color=\"#339966\"><font size=\"3\">​Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</font><span style=\"font-size: medium;\">Contributions are most welcome. Premailer was rotting away in a private SVN repository for too long and could use some.</span></font>"}},{"widget_type":"img_widget","attributes":{"src":"http://ec2-54-234-147-190.compute-1.amazonaws.com:8080//gallery/56794b0d736d735e0c000000/medium.jpg?1450789644","height":161,"width":222,"top":0,"left":106}}]},{"col_type":"theme_col_1","background":"rgb(45, 125, 98)","height":120,"widgets":[{"widget_type":"login_button_widget","attributes":{"type":"Button","connect":"fb","text":"Login","url":"https://","padding_val":10,"font_size":18,"txt_color":"","bg_color":"","border_radius":6,"top":19,"left":415}}]}],"style":{"background":"rgb(255, 255, 255)"}}},
	]
});
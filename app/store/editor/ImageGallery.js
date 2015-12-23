Ext.define('CaptivePortal.store.editor.ImageGallery',{
	extend:'Ext.data.Store',
	autoload:true,
	requires:['CaptivePortal.model.editor.Image'],
	model:'CaptivePortal.model.editor.Image',
	fields:[
		{ name:'id', type:'string'},
		{ name:'image_path', type:'string'},
		{ name:'image_url', type:'string'},
		{ name:'name', type:'string'},
	],
	proxy:{
		url:CaptivePortal.Config.SERVICE_URLS.GALLERY,
		type:'ajax',
		reader:{
			type:'json',
			rootProperty:'data.galleries'
		}
	}
});
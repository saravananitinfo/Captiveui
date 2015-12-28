Ext.define('CaptivePortal.model.editor.Image',{
	extend:'Ext.data.Model',
	fields:[
		{ name:'id', type:'string'},
		// { name:'image_path', type:'string'},
		{ name:'medium_image_url', type:'string'},
		{ name:'original_image_url', type:'string'},
		{ name:'small_image_url', type:'string'},
		{ name:'large_image_url', type:'string'},
		{ name:'name', type:'string'},
	]
});
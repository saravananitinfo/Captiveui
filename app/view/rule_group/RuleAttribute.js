Ext.define('CaptivePortal.view.rule_group.RuleAttribute', {
  extend: 'Ext.panel.Panel',
  alias: 'widget.rule_group_rule_attribute',
  padding: 0,
  height: '100%',
  // autoScroll:true,
  width:'100%',
  itemIdPrefix:'rule_group_rule_attribute_form-',
  // style: 'border-radius:2px !important;border:solid #cccccc 1px !important; ',
  layout: {
	    type: 'vbox',
	    padding: '0 0 0 0'
  },
  ATTR_ENUM:{  	
  	TYPE_COMBO:1,
  	SSIDS:2,
  	IP_SUBMIT:3,
  	IP_RANGE_FROM:4,
  	IP_RANGE_TO:5,
  	DNS:6,
  	VLAN:7,
  	USER_AGENT:8,
  	TIME_FROM:9,
  	TIME_TO:10
  },
  generateNewAttrRec:function(){
  	return {
  		id:null,
  		attrType:{
  			value:null,
  			store:this.attrTypeStore
  		},
  		ssids:{
  			value:null
  		},
  		ipSubmit:{
  			value:null
  		},
  		ipRangeFrom:{
  			value:null
  		},
  		ipRangeTo:{
  			value:null
  		},
  		dns:{
  			value:null
  		},
  		vlan:{
  			value:null
  		},
  		userAgent:{
  			value:null,
  			store:this.userAgentStore
  		},
  		fromTime:{
  			value:null
  		},
  		toTime:{
  			value:null
  		}
  	};	
  },
  fillAttrData: function(rec, data){  	
  	switch(data.rule_type){
  		case "1":
  			rec['ssids']['value'] = data['rule_value'].join();
  		break;
  		case "2":
  			rec['ipSubmit']['value'] = data['rule_value'].join();
  		break;
  		case "3":
  			rec['ipRangeFrom']['value'] = data['rule_value'][0];
  			rec['ipRangeTo']['value'] = data['rule_value'][1];
  		break;
  		case "4":
  			rec['dns']['value'] = data['rule_value'].join();
  		break;
  		case "5":
  			rec['vlan']['value'] = data['rule_value'].join();
  		break;
  		case "6":
  			rec['userAgent']['value'] = data['rule_value'];
  		break;
  		case "7":
        var time = data['rule_value'][0].split(':');
  			rec['fromTime']['value'] = new Date(2008, 0, 1, parseInt(time[0]), parseInt(time[1]));
        time = data['rule_value'][1].split(':');
  			rec['toTime']['value'] = new Date(2008, 0, 1, parseInt(time[0]), parseInt(time[1]));
  		break;
  	}
  	rec['attrType']['value'] = data['rule_type'];
  	rec['id'] = data['id'];
  },
  generateRuleAttrs: function(attrs){
  	var dynRows = [];
  	Ext.Array.each(attrs, function(da, index){
  		var rec = this.generateNewAttrRec();
  		this.fillAttrData(rec, da);
  		dynRows.push(this.generateNewAttribute(rec));
  	}.bind(this));
  	this.down('#rule_group_rule_attribute_form-dynRowContainer').add(dynRows);
  },
  collectAttrValues:function(){
  	var ruleStes = [];
  	var dynRows = this.down('#rule_group_rule_attribute_form-dynRowContainer').query('container');
  	Ext.Array.each(dynRows, function(c, index){
  		ruleStes.push(this.collectAttributesFromContainer(c));
  	}.bind(this));
  	return ruleStes;
  },
  collectAttributesFromContainer: function(cont){
  	var value = {}, idVal = cont.down('hiddenfield').getValue();
  	if(idVal){
  		value['id'] = idVal;
  	}
  	var typeValue = cont.query('[customType=' + this.ATTR_ENUM.TYPE_COMBO + ']')[0].getValue();
  	value['rule_type'] = typeValue;
  	value['rule_value'] = [];
  	var dataFields = this.getFieldsForType(typeValue, cont);
	Ext.Array.each(dataFields, function(f, ind){
    var fieldValue = f.getValue();
    if(typeValue == '7'){
      fieldValue = fieldValue ? Ext.Date.format(new Date(fieldValue),'H:i') : '';
    }
    
		value['rule_value'] = value['rule_value'].concat(fieldValue);
	}.bind(this));
	return value;
  },
  areContainersValid:function(){
  	var valid = true;
  	var dynRows = this.down('#rule_group_rule_attribute_form-dynRowContainer').query('container');
  	Ext.Array.each(dynRows, function(c, index){
  		var typeCombo = c.query('[customType=' + this.ATTR_ENUM.TYPE_COMBO + ']')[0];
  		if(typeCombo.isValid()){
  			var dataFields = this.getFieldsForType(typeCombo.getValue(), c);
  			Ext.Array.each(dataFields, function(f, ind){
  				if(!f.isValid()){
  					valid = false;
  				}
  			}.bind(this));
  		} else {
  			valid = false;
  		}
  	}.bind(this));
  	if(!valid){
  		CaptivePortal.util.Utility.showError('','Please fill mandatroy fields for rule attributes');
  	}
  	return valid;
  },
  areAttributesValid: function(btn){
  	var dynRows = this.down('#rule_group_rule_attribute_form-dynRowContainer').query('container');
  	if(dynRows.length == 0){
  		CaptivePortal.util.Utility.showError('','Please add atleast one rule attribute');
  		return false;
  	} else {
  		return this.areContainersValid();
  	}
  },
  getFieldsForType: function(type, container){
  	var fields = [];
  	switch(type){
  		case "1":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.SSIDS + ']')[0]);
  		break;
  		case "2":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.IP_SUBMIT + ']')[0]);  
  		break;
  		case "3":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.IP_RANGE_FROM + ']')[0]);
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.IP_RANGE_TO + ']')[0]);
  		break;
  		case "4":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.DNS + ']')[0]);
  		break;
  		case "5":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.VLAN + ']')[0]);
  		break;
  		case "6":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.USER_AGENT + ']')[0]);
  		break;
  		case "7":
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.TIME_FROM + ']')[0]);
  			fields.push(container.query('[customType=' + this.ATTR_ENUM.TIME_TO + ']')[0]);
  		break;
  	}
  	return fields;
  },
  changeAttribute: function(combo, newValue, oldValue){
  	var container = combo.up('container');
  	var fields = container.query('field');
  	Ext.Array.each(fields, function(f, index){
  		f.hide();
  	}.bind(this));
  	var typeCombo = container.query('[customType=' + this.ATTR_ENUM.TYPE_COMBO + ']')[0];
  	var checkBoxField = container.down('checkboxfield');
  	typeCombo.show();
  	checkBoxField.show();
  	Ext.Array.each(this.getFieldsForType(newValue, container), function(f, index){
  		f.show();
  	}.bind(this));
  },
  generateNewAttribute: function(obj){
  	return {
  		xtype:'container',
  		padding:10,
  		autoScroll:true,
      width:'99%',
  		layout:'hbox',
  		items:[{
                  xtype: 'hiddenfield',
                  value:obj.id
                 },{
                 	xtype:'checkboxfield',
                 	padding:'0 10 0 0'
                 },{
    		  			xtype: 'combo',
    		  			customType:this.ATTR_ENUM.TYPE_COMBO,
		            queryMode: 'local',
		            allowBlank: false,
		            forceSelection:true,
		            width:'45%',
		            editable:false,
		            value:obj.attrType.value,
		            hidden:false,
		            valueField: 'id',
		            displayField: 'name',
		            emptyText: 'Select Attr',
		            padding:'0 35% 0 0',
		            store: obj.attrType.store,
		            listeners:{
		            	change:this.changeAttribute.bind(this)
		            }
		        },{
					xtype:'textfield',
					customType:this.ATTR_ENUM.SSIDS,
					allowBlank:false,
					maxLength:50,
					width:'50%',
					emptyText: 'SSIDS',
					padding:'0 10 0 0',
					value:obj.ssids.value,
		            hidden:obj.ssids.value ? false : true
				},{
					xtype:'textfield',
					customType:this.ATTR_ENUM.IP_SUBMIT,
					allowBlank:false,
					maxLength:50,
					padding:'0 10 0 0',
					emptyText: 'IP Subnet',
					width:'50%',
					value:obj.ipSubmit.value,
		            hidden:obj.ipSubmit.value ? false : true
				},{
					xtype:'textfield',
					customType:this.ATTR_ENUM.IP_RANGE_FROM,
					allowBlank:false,
					maxLength:50,
					padding:'0 10 0 0',
					emptyText: 'IP From Range',
					width:'25%',
					value:obj.ipRangeFrom.value,
		            hidden:obj.ipRangeFrom.value ? false : true
				},{
					xtype:'textfield',
					customType:this.ATTR_ENUM.IP_RANGE_TO,
					allowBlank:false,
					padding:'0 10 0 0',
					maxLength:50,
					emptyText: 'IP To Range',
					width:'25%',
					value:obj.ipRangeTo.value,
		            hidden:obj.ipRangeTo.value ? false : true
				},{
					xtype:'textfield',
					customType:this.ATTR_ENUM.DNS,
					padding:'0 10 0 0',
					allowBlank:false,
					maxLength:50,
					emptyText: 'DNS',
					width:'50%',
					value:obj.dns.value,
		            hidden:obj.dns.value ? false : true
				},{
					xtype:'textfield',
					padding:'0 10 0 0',
					customType:this.ATTR_ENUM.VLAN,
					allowBlank:false,
					maxLength:50,
					emptyText: 'VLAN',
					width:'50%',
					value:obj.vlan.value,
		            hidden:obj.vlan.value ? false : true
				},{
		  			xtype: 'combo',
		  			customType:this.ATTR_ENUM.USER_AGENT,
		  			padding:'0 10 0 0',
		            queryMode: 'local',
                multiSelect:true,
		            allowBlank: false,
		            forceSelection:true,
		            editable:false,
		            emptyText: 'User Agent',
		            value:obj.userAgent.value,
		            hidden:obj.userAgent.value ? false : true,
		            width:'50%',
		            valueField: 'id',
		            displayField: 'name',
		            store: obj.userAgent.store
		        },{
		        	xtype:"timefield",
		  			customType:this.ATTR_ENUM.TIME_FROM,
            width:'25%',
		  			padding:'0 10 0 0',
    				increment: 30,
    				forceSelection:true,
    				editable:false,
    				emptyText: 'From Time',
        			allowBlank: false,
        			value:obj.fromTime.value,
		            hidden:obj.fromTime.value ? false : true
				},{
		        	xtype:"timefield",
              width:'25%',
		  			customType:this.ATTR_ENUM.TIME_TO,
		  			padding:'0 10 0 0',
    				increment: 30,
    				forceSelection:true,
    				editable:false,
        			allowBlank: false,
        			emptyText: 'To Time',
        			value:obj.toTime.value,
		            hidden:obj.toTime.value ? false : true
				}

  				]
  	}
  },
  removeAttributes: function(btn){  	
  	var form = btn.up('rule_group_rule').down('form');
  	var checkFields = form.down('#rule_group_rule_attribute_form-dynRowContainer').query('checkboxfield');
  	Ext.Array.each(checkFields, function(f, index){
  		if(f.getValue()){
  			var c = f.up('container');
  			var rec = form.getForm().getRecord();
  			if(rec.data.id){
  				var data = this.collectAttributesFromContainer(c);
  				data['_destroy'] = true;
  				rec.data['deleted_splash_rules'].push(data);
  			} 
  			c.destroy();
  		}
  	}.bind(this));
  },
  addNewAttribute: function(btn){
  	var form = btn.up('form');
  	var rec = this.generateNewAttrRec();
  	var dynRow = this.generateNewAttribute(rec);
  	form.down('#rule_group_rule_attribute_form-dynRowContainer').add(dynRow);
  },
  initComponent: function () { 
	  this.attrTypeStore = Ext.create('Ext.data.Store', {
	        	fields:['id', 'name'], 
	        	data : [
	        		{name: "SSIDS", id: "1"},
					{name: "IP Subnet", id: "2"},
					{name: "IP Range", id: "3"},
					{name: "DNS", id: "4"},
					{name: "VLAN", id: "5"},
					{name: "HTTP User Agent", id: "6"},
					{name: "Time of Day", id: "7"}
	        	]
	        });
	  this.userAgentStore = Ext.create('Ext.data.Store', {
        	fields:['id', 'name'], 
        	data : [
        		{name: "Windows(desktop)", id: "1"},
				{name: "Windows(mobile/tablet)", id: "2"},
				{name: "iOs(iPhone/iPod/iPad)", id: "3"},
				{name: "Mac(desktop)", id: "4"},
				{name: "Android(mobile/tablet)", id: "5"},
				{name: "Blackberry", id: "6"},
        {name: "Linux", id: "7"},
        {name: "ChromeOS", id: "8"},
        {name: "Others", id: "9"}
        	]
        });

        this.items = [{
                xtype: 'panel',
                width: '100%',
                padding: '0 0 0 0',
                cls: 'form_trigger',
                items: [{
                        xtype: 'form',
                        defaults: {
                            width: '100%',
                            maxLength: 50
                        },
                        items: [{
                        	xtype:'toolbar',
                        	items:['->',{
					                    xtype: 'button',
					                    text: 'Add',
					                    cls: 'btn-add-module',
					                    handler:this.addNewAttribute.bind(this)
					                },
					                {
					                    xtype: 'button',
					                    text: 'Remove',
					                    cls: 'btn-add-module',
					                    handler:this.removeAttributes.bind(this)
					                }]
                        },{
                        	xtype: 'gridpanel',
							width:'100%',
			                style: 'border-radius:2px !important;border:solid #cccccc 1px !important; box-shadow: 0px 0px 10px 0px #cccccc;',
			                store: [],
			                columns: [
			           			{
			            			header: 'Name',
			            			dataIndex: 'name',
                        width:'47%',
			            			cls: 'table-row',
			                        tdCls: 'table-cell'
			           			},
			           			{
			            			header: 'Value',
			            			dataIndex: 'name',
			            			flex: 1,
			            			cls: 'table-row',
			                        tdCls: 'table-cell'
			           			},     			
			                ]
                        },
			                {
			                	xtype:'container',
			                	layout:'vbox',
			                	itemId:this.itemIdPrefix + 'dynRowContainer',
			                	items:[]
			                }                          
								
							]
            					}]
            	}];
        this.callParent();
  }
});

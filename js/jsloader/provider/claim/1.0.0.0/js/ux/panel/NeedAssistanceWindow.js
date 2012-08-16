Ext.namespace("provider.claim.search.window.NeedAssistanceWindow");
provider.claim.search.window.NeedAssistanceWindow = function (config){	
	
	var assistanceAdditionalInformation = new provider.claim.search.panel.AdditionalInfomationPanel({
		id: 'AssistanceAdditionalInfomationPanel'
	});
	
	var primaryPhoneNumber = '', alternatePhoneNumber = '', hidePrimary = true, hideAlternate = true;
	var phoneList = [];
	// building JSON radio group array
	var phoneNumberRadioMap = [];
	if (contactDetails
			&& contactDetails.ContactDetails.PhoneList) {
			var cnt = 0;
			phoneList = contactDetails.ContactDetails.PhoneList;
			for (i = 0; i < phoneList.length; i++) {
				var phone = phoneList[i];
				var obj = new Object();
				obj.name = 'PhoneNumber';
				obj.inputValue = phone.PhoneNumber;									
				obj.listeners = {
					check : function(o, b) {
						if (b) {
							togglePanels
									.enableShowPanel(additionalInformation);

							for (i = 0; i < phoneList.length; i++) {
								var phone = phoneList[i];
								if (phone.PhoneNumber == o
										.getRawValue()) {
									Ext
											.getCmp(
													'PhoneType')
											.setValue(
													phone.PhoneType);
								}
							}
						}
					}
				};
				obj.boxLabel = "Call me at "
						+ phone.PhoneNumber;
				phoneNumberRadioMap[cnt++] = obj;
			}
	}

	var win = new Ext.Window({					
				width:425,
				height:245,
				modal:true,
				autoScroll:true,
				resizable:false,
				layout:'fit',
				plain:true,
				items:[{
						xtype:"panel"
						,border:false
						,bodyBorder:false
						,hideBorders:true
						,autoScroll:true
						,style:"background-color:#FFFFFF; background:#FFFFFF; padding:5px;"	
						,layout : "form"
						,labelAlign : "top"
						,items:[
								{
									xtype : "radiogroup",
									name : "callMeRadioGroup1",
									id : "callMeRadioGroup1",
									fieldLabel : "Have MultiPlan contact me at this number:",
									labelSeparator : "",
									vertical : true,
									columns : 1,
									value : "",
									items : phoneNumberRadioMap
								},
								{
									xtype : "panel",
									border : false,
									style : "padding-top:10px;"
								}
						        ,assistanceAdditionalInformation
						]
					}]
			});
	win.show();
};
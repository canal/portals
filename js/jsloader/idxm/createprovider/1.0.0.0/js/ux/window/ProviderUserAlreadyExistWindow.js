Ext.namespace("idxm.create.provider.ux.window.ProviderUserAlreadyExist");
idxm.create.provider.ux.window.ProviderUserAlreadyExist = function (config){	
	var msg = 'This user already has a portal account.<br><br>Would you like to go to their profile?';
		      
	if(config.message) {
		msg = config.message;
	}
			
	var win = new Ext.Window({
				id: 'providerUserExistsWindow',
				width:475,
				height:205,
				closable:false,
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
						,items:[{
								xtype:"idxmStatusBox"
								,status:"warning"
								,statusText:'User Exists'
							},{
								xtype: "panel"
								,style:"padding-left:10px; padding-top:25px; padding-bottom:10px;"
								,html: '<div class="portal-text-medium">'+msg+'</div>'								
							}]
						,buttons:[{
							ctCls : "support-portal-btn-cancel"
								,text:"NO"
								,handler:function(){win.close();}
							},{
							ctCls : "support-portal-btn"
							,text:"YES"
							,handler:function(){config.createProviderParentObject.redirectToUserProfile(config.RedirectUrl, config.doesUserExist.sysKey); win.close();}
						}]
					}]
			});
	win.show();
};
Ext.namespace("IDXM.CreateUser.ProviderUser.SearchResultsSoftError");

Ext.namespace("idxm.create.provider.ux.window.SearchResultsSoftError");
idxm.create.provider.ux.window.SearchResultsSoftError = function (config){	
	var msg = 'At least one user administrator already exists for this provider.<br><br>You can continue creating this user as a user administrator or or instruct the user to request access for themselves.';
		      
	if(config.message) {
		msg = config.message;
	}
			
	var win = new Ext.Window({
				id: 'searchResultsSoftErrorWindow',
				width:475,
				height:250,
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
								,statusText:'Hard Error'
							},{
								xtype: "panel"
								,style:"padding-left:10px; padding-top:25px; padding-bottom:10px;"
								,html: '<div class="portal-text-medium">'+msg+'</div>'								
							}]
						,buttons:[{
								ctCls : "support-portal-btn-cancel"
								,text:"STAY ON PAGE"
								,handler:function(){win.close();}
							},{
								ctCls : "support-portal-btn"
								,text:"CONTINUE WITH THIS USER"
								,handler:function(){win.close();}
							}]
					}]
			});
	win.show();
};
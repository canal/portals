/* Begin Ext Code */
Ext.onReady( function() {													
	/* Define Toolbar Menu */
	var g_toolBar = new Ext.Toolbar({cls:'mpi-toolbar',autoWidth: true});
	g_toolBar.render('g_toolbardiv');

	
	var activeMenuPositionID;
	
	if(g_menuData.length > 0){
		g_getActiveMenu(g_menuData,1,-1,g_portalURL);

		if(!activeMenuPositionID){
			activeMenuPositionID = -1;
		}	

		//Add Submenus based on Bluenog JSon Data Structure
		g_addSubMenu(g_toolBar,g_menuData,1,activeMenuPositionID,g_portalURL);	
	}
	
	/* Add Menu Dynamically */
	function g_addSubMenu(tb,menuData,blnFirstTime,g_menuID,g_portalURL){

		//blnFirstTime = blnFirstTime + 1;

		/* looping through Menu - JSon Data */
		for (var i=0; i < menuData.length; i++) {

			var topLevelMenu = menuData[i];

			var topMenuID;

			/* Multiple Level Menu Items */
			if(topLevelMenu.text && topLevelMenu.submenu){


					//Menu with no Link
					var theMenu = new Ext.menu.Menu({
										id: topLevelMenu.text + i,
										cls:'mpi-btn',
										overCls: 'mpi-btn-over'

									});
																						
					//Only for Top Menu
					if(blnFirstTime){
					
						//Add Toolbar Seaparator
						tb.add({xtype: 'tbseparator'});						

						//Set the topMenu ID for child hrefs
						topMenuID = i;	


						if(g_menuID == topMenuID){
							tb.add({	text:topLevelMenu.text,
									menu: theMenu,
									cls:'mpi-btn-on',
									overCls: 'mpi-btn-over-on'
								});						
						}else{
							tb.add({	text:topLevelMenu.text,
									menu: theMenu,
									cls:'mpi-btn',
									overCls: 'mpi-btn-over'
								});					
						}

					}else{
						tb.add({	text:topLevelMenu.text,
								menu: theMenu,
								cls:'mpi-submenu'
							});					
					}

					//For Submenus
					if (topLevelMenu.submenu && topLevelMenu.submenu.itemdata ) {

						var aMenuData = topLevelMenu.submenu.itemdata;												

						for(var a=0; a < aMenuData.length; a++){

							//If there is no submenu data
							if(aMenuData[a].href && aMenuData[a].text){
								if(blnFirstTime){
									theMenu.add({
											text: aMenuData[a].text,
											href: aMenuData[a].href+"?menuID="+topMenuID,
											cls: 'mpi-submenu'
									});
									
								}else{
									theMenu.add({
											text: aMenuData[a].text,
											href: aMenuData[a].href+"?menuID="+g_menuID,
											cls: 'mpi-submenu'
									});							
								}

							//If there is submenu data
							} else if (aMenuData[a].submenu) {

								//Create Menu with no link
								var theMenuSecondLevel = new Ext.menu.Menu({	id: theMenu.text + i,
														cls:'mpi-btn'													
													});
								//Add sub-menu with no link
								theMenu.add({
										text: aMenuData[a].text,
										menu: theMenuSecondLevel,
										cls: 'mpi-submenu'
								});	

								//Call function recursively
								g_addSubMenu(theMenuSecondLevel,aMenuData[a].submenu.itemdata,0,topMenuID,g_portalURL);

							}
						}
					}

			/* Single Level Menu Items */
			} else {
			
				//Local function for creating cookie and redirecting
				function localFunction(){
					//uRadixCookieManager.createCookie("g_menuID",this[1],30);
					uRadixRedirectHandler.redirect(this[0]);
				}			

				//Only for Top Menu
				if(blnFirstTime == 1){

					//Add Toolbar Separator at the beginning
					tb.add({xtype: 'tbseparator'});

					//Set the topMenu ID for child hrefs
					topMenuID = i;																						
					
					//Menu On if it matches
					if(g_menuID == topMenuID){					
						tb.add(new Ext.Toolbar.Button({
								id:topLevelMenu.href+"?menuID="+topMenuID,
								text: topLevelMenu.text,
								handler: localFunction.createDelegate([topLevelMenu.href+"?menuID="+topMenuID,topMenuID]),
								cls:'mpi-btn-on',
								overCls: 'mpi-btn-over-on'
							}));
					
					//Menu Off if it doesn't matches
					}else{
						tb.add(new Ext.Toolbar.Button({
								id:topLevelMenu.href+"?menuID="+topMenuID,
								text: topLevelMenu.text,
								handler: localFunction.createDelegate([topLevelMenu.href+"?menuID="+topMenuID,topMenuID]),
								cls:'mpi-btn',
								overCls: 'mpi-btn-over'
							}));
					}
			
				
				//For Recursive call when it is no longer top menu
				} else {

					tb.add(
						{
							text: topLevelMenu.text	,						
							handler: localFunction.createDelegate([topLevelMenu.href+"?menuID="+g_menuID,g_menuID]),
							cls: 'mpi-submenu'
						}
					);

				}

			}
		}
		/* E: looping through Menu - JSon Data */
		
		tb.doLayout();
	}/* E: Add Menu Dynamically */	
	
	
	
	
	
	/* Add Menu Dynamically */
	function g_getActiveMenu(menuData,blnFirstTime,g_menuID,g_portalURL){

		/* looping through Menu - JSon Data */
		for (var i=0; i < menuData.length; i++) {

			var topLevelMenu = menuData[i];

			var topMenuID;								

			/* Multiple Level Menu Items */
			if(topLevelMenu.text && topLevelMenu.submenu){

					//Set the topMenu ID for child hrefs
					topMenuID = i;			

					//For Submenus
					if (topLevelMenu.submenu && topLevelMenu.submenu.itemdata ) {

						var aMenuData = topLevelMenu.submenu.itemdata;												

						for(var a=0; a < aMenuData.length; a++){

							//If there is no submenu data
							if(aMenuData[a].href && aMenuData[a].text){																
							
								if(aMenuData[a].href == g_portalURL){							
									if(blnFirstTime){
										activeMenuPositionID = topMenuID; 
									}else{
										activeMenuPositionID = g_menuID;										
									}
								}					

							//If there is submenu data
							} else if (aMenuData[a].submenu) {

								//Call function recursively
								g_getActiveMenu(aMenuData[a].submenu.itemdata,0,topMenuID,g_portalURL);

							}
						}
					}

			/* Single Level Menu Items */
			} else {
						

				//Only for Top Menu
				if(blnFirstTime == 1){
				
					//Set the topMenu ID for child hrefs
					topMenuID = i;	
					
					if(topLevelMenu.href == g_portalURL){
						activeMenuPositionID = topMenuID;
					}
				
				//For Recursive call when it is no longer top menu
				} else {
					if(topLevelMenu.href == g_portalURL){						
						activeMenuPositionID = g_menuID;
					}
				}

			}
		}/* E: looping through g_getActiveMenu - JSon Data */
		
	}/* E: Add g_getActiveMenu Dynamically */		
	
	
	
		
}); /* E: Ext Code */
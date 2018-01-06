var Sidebar=(function () {
    console.debug('Sidebar available');
    function SidebarPanelBoxItemCounter(name, count, tooltipText) {
        this.name=name;
        this.count=count;
        this.counterElement=document.createElement('span');
        this.counterElement.className='sidebar-right-panel-box-item-counter '+'sidebar-right-panel-box-item-counter-'+name;
        //this.counterElement.title=tooltipText;
        this.counterLabelElement=document.createTextNode(''+count);
        this.counterElement.appendChild(this.counterLabelElement);
    }
    
    function SidebarPanelBoxItem(externid, label) {
        this.externid=externid;
        this.label=label;
        this.elementItem=document.createElement('div');
        this.elementItem.className='sidebar-right-panel-box-item';
        this.labelElement=document.createTextNode(label);
        this.elementItem.appendChild(this.labelElement);
        this.counters=[];
    }
    
    SidebarPanelBoxItem.prototype.setCounter=function(name, count, tooltipText) {
        if (name && count) {
            if (name==='c1' || name==='c2' || name=='c3') {
                if (this.counters[name]==undefined) {
                    this.counters[name]=new SidebarPanelBoxItemCounter(name, count, tooltipText);
                    this.elementItem.appendChild(this.counters[name].counterElement);
                }
                this.counters[name].counterLabelElement.text=''+count;
                this.counters[name].count=count;
                if (tooltipText) {
                    this.counters[name].counterElement.title=tooltipText;
                } else if (this.counters[name].counterElement.title) {
                    this.counters[name].counterElement.title='';
                }
                if (count==0) {
                    this.counters[name].counterElement.style.display='none';
                } else {
                    this.counters[name].counterElement.style.display='box';
                }
                        
            }
        }        
    }
    
    function SidebarPanelBox(externid, opened, label) {
        this.externid=externid;
        this.label=label;
        this.panelHeader=document.createElement('div');
        this.panelHeader.className='sidebar-right-panel-box-header';
        this.panelHeader.me=this;
        this.panelHeader.onclick=function(event) {
            event.currentTarget.me.switchOpen(!event.currentTarget.me.opened);
        }
        this.arrowElement=document.createElement('div');
        //this.arrowElement.className=opened==true?'arrow-up':'arrow-down';
        this.panelHeader.appendChild(this.arrowElement);
        this.labelElement=document.createElement('div');
        this.labelElement.appendChild(document.createTextNode(label));
        this.panelHeader.appendChild(this.labelElement);
        this.panelContainer=document.createElement('div');
        this.panelContainer.className='sidebar-right-panel-box';
        this.boxItems=[];
        this.boxItemsCount=0;
        this.switchOpen(opened!=undefined?opened:true);
    }

    SidebarPanelBox.prototype.switchOpen=function(opened) {
        this.opened=opened;
        if (this.opened) {
            this.panelContainer.style.display='block';
            this.arrowElement.className='arrow-up';
        } else {
            this.panelContainer.style.display='none';
            this.arrowElement.className='arrow-down';
        }
    }

    SidebarPanelBox.prototype.addBoxItem=function(externid, label) {
        this.boxItems[this.boxItemsCount]=new SidebarPanelBoxItem(externid, label);
        this.panelContainer.appendChild(this.boxItems[this.boxItemsCount].elementItem);
        this.boxItemsCount++;
        return this.boxItems[this.boxItemsCount-1];
    }
    
    function SidebarPanel(parent, externid, iconPath, label) {
        this.parent=parent;
        this.externid=externid;
        this.iconPath=iconPath;
        this.label=label;
        this.leftElement=document.createElement('div');
        this.leftElement.className='sidebar-left-panel';
        this.leftElement.id='left_'+externid;
        this.rightElement=document.createElement('div');
        var img=document.createElement('img');
        img.src=iconPath!=undefined?iconPath:'icons/faq_16x16.png';
        this.leftElement.appendChild(img);
        var name=document.createElement('div');
        var nameText=document.createTextNode(label);
        name.appendChild(nameText);
        this.leftElement.appendChild(name);
        this.leftElement.me=this;
        this.leftElement.onclick=function(event) {
            if (event.currentTarget.me.isSelected==true) {
                event.currentTarget.me.parent.switchRightContainerOpen(!event.currentTarget.me.parent.opened);
            } else {
                event.currentTarget.me.parent.switchToPanel(event.currentTarget.me);
                event.currentTarget.me.parent.switchRightContainerOpen(true);
            }
        }
        this.rightElement.className='sidebar-right-panel';
        this.rightElement.id='right_'+externid;
        this.isSelected=false;
        this.boxes=[];
        this.boxCount=0;
    }
    
    SidebarPanel.prototype.addBox=function(externid, opened, label) {
        this.boxes[this.boxCount]=new SidebarPanelBox(externid, opened, label);
        this.rightElement.appendChild(this.boxes[this.boxCount].panelHeader);
        this.rightElement.appendChild(this.boxes[this.boxCount].panelContainer);
        this.boxCount++;
        return this.boxes[this.boxCount-1];
    }

    SidebarPanel.prototype.setSelected=function(selected) {
        if (selected==false && this.isSelected==true) {
            this.rightElement.className=this.rightElement.className.replace(' sidebar-right-panel-selected','');
            this.leftElement.className=this.leftElement.className.replace(' sidebar-left-panel-selected','');
            this.isSelected=false;
        }
        if (selected==true && this.isSelected==false) {
            this.rightElement.className+=' sidebar-right-panel-selected';
            this.leftElement.className+=' sidebar-left-panel-selected';
            this.isSelected=true;
        }
    }
    
    function Sidebar(baseContainer) {
        this.panelCount=0;
        this.opened=true;
        //container
        this.sidebarContainer=document.createElement('div');
        this.sidebarContainer.id='sidebar-container';
        //this.sidebarContainer.className='sidebar-block'
        // left container
        this.sidebarLeftContainer=document.createElement('div');
        this.sidebarLeftContainer.id='sidebar-left-container';
        this.sidebarContainer.appendChild(this.sidebarLeftContainer);
        this.sidebarLeftContainerMenue=document.createElement('div');
        this.sidebarLeftContainerMenue.id='sidebar-left-container-menue';
        this.sidebarLeftContainerMenue.me=this;
        this.sidebarLeftContainerMenue.onclick=function(event) {
            event.currentTarget.me.switchRightContainerOpen(!event.currentTarget.me.opened);
        }
        //this.sidebarLeftContainerMenueArrowElement=document.createElement('div');
        //this.sidebarLeftContainerMenue.appendChild(this.sidebarLeftContainerMenueArrowElement);
        var img=document.createElement('img');
        img.src='icons/menu_16x16.png';
        this.sidebarLeftContainerMenue.appendChild(img);        
        this.sidebarLeftContainer.appendChild(this.sidebarLeftContainerMenue);
        // right container
        this.sidebarRightContainer=document.createElement('div');
        this.sidebarRightContainer.id='sidebar-right-container';
        this.sidebarContainer.appendChild(this.sidebarRightContainer);    
        baseContainer.appendChild(this.sidebarContainer);
        this.panels=[];
        this.switchRightContainerOpen(true);
    }

    Sidebar.prototype.switchRightContainerOpen=function(opened) {
        this.opened=opened;
        if (this.opened) {
            if (this.sidebarRightContainer.style.display!=='block') {
                this.sidebarRightContainer.style.display='block';
            }
            //this.sidebarLeftContainerMenueArrowElement.className='arrow-left';
        } else {
            this.sidebarRightContainer.style.display='none';
            //this.sidebarLeftContainerMenueArrowElement.className='arrow-right';
        }
    }
 
    Sidebar.prototype.initWithObject=function(initObject) {
        if (initObject && initObject.panels && Array.isArray(initObject.panels)) {
            initObject.panels.forEach(element=> {
                var panel=this.addPanel(element.externid, element.iconPath, element.label);
                if (element.boxes && Array.isArray(element.boxes)) {
                    element.boxes.forEach(element=> {
                        var box=panel.addBox(element.externid, element.open, element.label);
                        if (element.items && Array.isArray(element.items)) {
                            element.items.forEach(element=> {
                                var item=box.addBoxItem(element.externid, element.label);
                                if (element.counter && element.counter!=0) {
                                    if (element.counter && Array.isArray(element.counter)) {
                                        element.counter.forEach(element=>{
                                            item.setCounter(element.name, element.count, element.tooltipText);
                                        });
                                    }
                                }
                            })
                        }
                    });
                }
            });
        }
    }

    Sidebar.prototype.addPanel=function(externid, iconPath, label) {
        this.panels[this.panelCount]=new SidebarPanel(this, externid, iconPath, label);
        this.sidebarLeftContainer.appendChild(this.panels[this.panelCount].leftElement);
        this.sidebarRightContainer.appendChild(this.panels[this.panelCount].rightElement);
        this.sidebarLeftContainer.appendChild(this.panels[this.panelCount].leftElement);
        if (this.panelCount==0) {
            this.panels[this.panelCount].setSelected(true);
        }
    
        this.panelCount++;
        return this.panels[this.panelCount-1];
    }

    Sidebar.prototype.switchToPanel=function(panel) {
        for(var i=0;i<this.panelCount;i++) {
            if (this.panels[i]===panel) {
                this.panels[i].setSelected(true);
            } else {
                this.panels[i].setSelected(false);
            }
        }
    }

    Sidebar.prototype.getPanelById=function(externid) {
        for (var i=0; i<this.panelCount;i++) {
            if (this.panels[i].externid===externid) {
                return this.panels[i];
            }
        }
        return null;
    }

    Sidebar.prototype.searchPanel=function(externid) {
        var found=null;
        this.panels.forEach(elements=> {
            if (found==null) {
                if (elements.externid===externid) {
                    found=elements;
                }
            }
        });
        return found;
    }

    Sidebar.prototype.searchPanelBox=function(externid) {
        var found=null;
        this.panels.forEach(elements=> {
            if (found==null) {
                elements.boxes.forEach(elements=>{
                    if (found==null) {
                        if (elements.externid===externid) {
                            found=elements;
                        }
                    }
                });
            }
        });
        return found;
    }

    Sidebar.prototype.searchPanelBoxItem=function(externid) {
        var found=null;
        this.panels.forEach(elements=> {
            if (found==null) {
                elements.boxes.forEach(elements=>{
                    if (found==null) {
                        elements.boxItems.forEach(elements=>{
                            if (found==null) {
                                if (elements.externid===externid) {
                                    found=elements;
                                }
                            }
                        });
                    }
                });
            }
        });
        return found;
    }

    return Sidebar;
}
)();


window.onload=function(ev) {
    var n={
        panels: [
            {
                externid: 'home',
                iconPath: 'icons/home_16x16.png',
                label: 'HOME',
                boxes: [
                    {
                        externid: 'cash_management',
                        open: true,
                        label: 'CASH MANAGEMENT',
                        items: [ {
                                externid: 'liquiplanung',
                                label: 'Liquiditätsplanung'
                            },
                            {
                                externid: 'kontierung',
                                label: 'Kontierung'
                            },
                            {
                                externid: 'kontenabgleich',
                                label: 'Kontenabgleich',
                                counter: [{
                                        name: 'c1',
                                        count: 1,
                                        tooltipText: 'Waring! Accounts are not reconciled'
                                    },{
                                        name: 'c3',
                                        count: 18,
                                        tooltipText: 'Account(s) OK'
                                    }
                                ]
                                }
                        ]
                    },
                    {
                        externid: 'treasury',
                        open: false,
                        label: 'TREASURY',
                        items: [ {
                            externid: 'fx',
                            label: 'Foreign Exchange',
                            counter: [{
                                name: 'c1',
                                count: 1
                            },{
                                name: 'c2',
                                count: 5
                            }
                            ]
                        }
                        ]
                    },
                    {
                        externid: 'Reporting',
                        open: false,
                        label: 'REPORTING',
                        items: [ {
                            externid: 'myreports',
                            label: 'MY REPORTS',
                            counter: [{
                                    name: 'c1',
                                    count: 18
                                },{
                                    name: 'c2',
                                    count: 8
                                },{
                                    name: 'c3',
                                    count: 2
                            }
                            ]
                        }
                        ]
                    }

                ]
            },
            {
                externid: 'faq',
                iconPath: 'icons/international_16x16.png',
                label: 'KONTO',
                boxes: [
                    {
                        externid: 'cash_management',
                        open: true,
                        label: 'BENUTZER',
                        items: [ {
                                externid: 'benutzer',
                                label: 'Einstellungen'
                            },
                            {
                                externid: 'password_change',
                                label: 'Kennwort ändern'
                            },
                            {
                                externid: 'logout',
                                label: 'Logout',
                                counter: [{
                                        name: 'c1',
                                        count: 1,
                                        tooltipText: 'Test'
                                    }
                                ]
                                }
                        ]
                    }
                ]                
            },
            {
                externid: 'cm',
                iconPath: 'icons/international_16x16.png',
                label: 'CM'
            },
            {
                externid: 'fx',
                iconPath: 'icons/international_16x16.png',
                label: 'FX'
            },
            {
                externid: 'km',
                iconPath: 'icons/international_16x16.png',
                label: 'KM'
            },
            {
                externid: 'wp',
                iconPath: 'icons/international_16x16.png',
                label: 'WP'
            },
            {
                externid: 'dashboard',
                iconPath: 'icons/international_16x16.png',
                label: 'DASHB'
            },
            {
                externid: 'reports',
                iconPath: 'icons/international_16x16.png',
                label: 'REPORT'
            }
        ]
    }
    

    var mySidebar=new Sidebar(document.getElementById('sidebar-base-containier'));
    mySidebar.initWithObject(n);
    var foundItem=mySidebar.searchPanelBoxItem('logout');
    console.debug(foundItem);
    /*
    var homePanel=mySidebar.addPanel('home', 'icons/home_16x16.png', 'HOME');
    // CM
    var boxCashManagement=homePanel.addBox('cash_management', true, 'CASH MANAGEMENT');
    boxCashManagement.addBoxItem('liquiplanung', 'Liquiditätsplanung');
    var itemKontierung=boxCashManagement.addBoxItem('kontierung', 'Kontierung');
    itemKontierung.setCounter(20);
    boxCashManagement.addBoxItem('kontenabgleich', 'Kontenabgleich');
    // TREASURY
    for (var i=0;i<2;i++) {
        var boxTreasury=homePanel.addBox('treasury'+i, true, 'TREASURY '+i);
        for (var x=0;x<10;x++) {
            boxTreasury.addBoxItem('fx'+x, 'Foreign Exchange_'+x);
        }
    }    
    var faqPanel=mySidebar.addPanel('faq', 'icons/faq_16x16.png', 'FAQ');
    boxCashManagement=faqPanel.addBox('cash_management', true, 'CASH MANAGEMENT');
    boxCashManagement.addBoxItem('liquiplanung', 'Liquiditätsplanung');
    itemKontierung=boxCashManagement.addBoxItem('kontierung', 'Kontierung');
    itemKontierung.setCounter(20);
    boxCashManagement.addBoxItem('kontenabgleich', 'Kontenabgleich');
    for (var i=0;i<3;i++) {
        var boxTreasury=faqPanel.addBox('faq'+i, true, 'FAQ '+i);
        for (var x=0;x<15;x++) {
            boxTreasury.addBoxItem('questioni'+x, 'Question_'+x);
        }
    } */   
}

function onLeftBlockChanged(event, sidebar_right_id) {
    var elements=document.getElementsByClassName('sidebar-left-panel');
    for (var i=0;i<elements.length;i++) {
        elements[i].className=elements[i].className.replace(' sidebar-left-panel-selected', '');
    }
    var elements=document.getElementsByClassName('sidebar-right-panel-selected');
    for (var i=0;i<elements.length;i++) {
        elements[i].className=elements[i].className.replace(' sidebar-right-panel-selected', '');
    }
    event.currentTarget.className+=" sidebar-left-panel-selected";
    var element=document.getElementById(sidebar_right_id);
    if (element) {
        element.className+=' sidebar-right-panel-selected';
    }
}

function onRightPanelHeaderChanged(event) {
    var v=event.currentTarget.nextElementSibling;
    if (v.className.indexOf(' sidebar-right-panel-closed')!=-1) {
        v.className=v.className.replace(' sidebar-right-panel-closed', '');
    } else {
        v.className+=' sidebar-right-panel-closed';
    }
    v=event.currentTarget.firstElementChild;
    if (v.className.indexOf('arrow-up')!=-1) {
        v.className=v.className.replace('arrow-up', 'arrow-down');
    } else {
        v.className=v.className.replace('arrow-down', 'arrow-up');
    }
    //console.debug(v);
    //event.currentTarget.className+=" sidebar-left-panel-selected";
    
}
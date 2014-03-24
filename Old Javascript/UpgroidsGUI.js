#pragma strict
@script AddComponentMenu("GUI/UpgroidsUI")
var render : boolean = true;
var backgroundTex : Texture;
public static var selections = new Array();
var allUpgrades : Upgrades[];
private var unlockedUpgrades = new Array();
private var convUnlockedUpgrades : Upgrades[];
private var toBeBought : int;
private var toBeEquipped : int;
private var equipSelectionBool : boolean = false;
private var supportBayRect : Rect = Rect(20, 20, 400, 400);
private var confirmStarMap : boolean = false;
var xStyle : GUIStyle;
var checkStyle : GUIStyle;
var buttonStyle : GUIStyle;
private var physicalWeaponsRect : Rect = 	new Rect(0,0,Screen.width/8,Screen.height-(Screen.height/4));
private var energyWeaponsRect : Rect = 		new Rect(0,0,Screen.width/8,Screen.height-(Screen.height/4));
private var explosiveWeaponsRect : Rect = 	new Rect(0,0,Screen.width/8,Screen.height - Screen.height/4);
private var devicesRect : Rect = 			new Rect(0,0,Screen.width/4,Screen.height - Screen.height/4);
private var buttonRect : Rect = new Rect(0,0,Screen.width/8-30,60); 
physicalWeaponsRect.center = 	new Vector2(Screen.width/8, Screen.height/2);
energyWeaponsRect.center = 		new Vector2((Screen.width/8)*2+15, Screen.height/2);
explosiveWeaponsRect.center = 	new Vector2((Screen.width/8)*3+30, Screen.height/2);
devicesRect.center = 			new Vector2((Screen.width/8)*5, Screen.height/2);
supportBayRect.center = 		new Vector2(Screen.width/2, Screen.height/2);
private var optionsLastHit : float = 0;
private var popupRect = Rect(0,0,Screen.width/4,Screen.height/4);
popupRect.center = Vector2(Screen.width/2, Screen.height/2);
private var optionsMenuRect = Rect(0,0,Screen.width/2,(Screen.height/4)*3);
optionsMenuRect.center = Vector2(Screen.width/2, Screen.height/2);
var otherCamera : GameObject;
var inputCoordinatorCamera : GameObject;
var inputCoordinator : InputCoordinator;

enum Menu {
	SupportBay,
	EquipEquipables,
	BuyEquipables,
	ConfirmBuyEquipable,
	BuyUpgrades,
	Options,
	InputOptions
}

var currentState : Menu = Menu.SupportBay;

//Joy vars
var supportBayMenu : JoyGUIMenu;
var equipEquipablesMenu : JoyGUIMenu;
var buyEquipablesMenu : JoyGUIMenu;
var confirmBuyEquipableMenu : JoyGUIMenu;
var optionsMenu : JoyGUIMenu;
var inputOptionsMenu : JoyGUIMenu;

var mySkin : GUISkin;
var delayBetweenButtons : float = 0.25;
//end Joy Vars

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var description : String;
	var bought : boolean = false;
	var selected : boolean = false;
}

function Start (){
	var supportBayRects : Rect[] = new Rect[4];
	var supportBayLabels : String[] = new String[4];
	var equipRect : Rect = 	  	 new Rect(0,0,Screen.width/10,Screen.height/20);
	var buyEquipsRect : Rect = 	 new Rect(0,0,Screen.width/10,Screen.height/20); 
	var buyUpgradesRect : Rect = new Rect(0,0,Screen.width/10,Screen.height/20);
	var exitBayRect : Rect = 	 new Rect(0,0,Screen.width/10,Screen.height/20);
	equipRect.center = 			new Vector2(Screen.width/2, (Screen.height/30)*10);
	buyEquipsRect.center = 		new Vector2(Screen.width/2, (Screen.height/30)*14);
	buyUpgradesRect.center =	new Vector2(Screen.width/2, (Screen.height/30)*18);
	exitBayRect.center = 		new Vector2(Screen.width/2, (Screen.height/30)*22);
	supportBayRects[0] = equipRect;
	supportBayRects[1] = buyEquipsRect;
	supportBayRects[2] = buyUpgradesRect;
	supportBayRects[3] = exitBayRect;
	
	supportBayLabels[0] = "Equipment Locker";
	supportBayLabels[1] = "Buy Equipment";
	supportBayLabels[2] = "Buy Upgrades";
	supportBayLabels[3] = "Exit Support Bay";
	supportBayMenu = JoyGUIMenu(4, supportBayRects, supportBayLabels,  InputCoordinator.confirm, InputCoordinator.leftStickVert.axis, InputCoordinator.leftStickHor.axis);
	
	var	buyEquipablesRects : Rect[] = new Rect[20];
	var buyEquipablesLabels : String[] = new String[20];
	var r : Rect;
	for (var i : int = 0; i < 4; i++){
		r = new Rect(0,0,buttonRect.width, buttonRect.height);
		r.center = new Vector2(physicalWeaponsRect.center.x, Screen.height/4 + (i * 100));
		buyEquipablesRects[i] = r;
	}
	for (var j : int = 4; j < 8; j++){
		r = new Rect(0,0,buttonRect.width, buttonRect.height);
		r.center = new Vector2(energyWeaponsRect.center.x, Screen.height/4 + ((j-4) * 100));
		buyEquipablesRects[j] = r;
	}
	for (var k : int = 8; k < 12; k++){
		var rk : Rect = buttonRect;
		rk.center = new Vector2(explosiveWeaponsRect.center.x, Screen.height/4 + ((k-8) * 100));
		buyEquipablesRects[k] = rk;
	}
	for (var l : int = 12; l < 16; l++){
		var rl : Rect = buttonRect;
		rl.center = new Vector2(devicesRect.center.x - buttonRect.width/2, Screen.height/4 + ((l-12) * 100));
		buyEquipablesRects[l] = rl;
	}
	for (var m : int = 16; m < 20; m++){
		var rm : Rect = buttonRect;
		rm.center = new Vector2(devicesRect.center.x + buttonRect.width/2 + 2, Screen.height/4 + ((m-16) * 100));
		buyEquipablesRects[m] = rm;
	}
	for (var n : int = 0; n < allUpgrades.length; n++){
		buyEquipablesLabels[n] = allUpgrades[n].name;
	}
	buyEquipablesMenu = JoyGUIMenu(4, buyEquipablesRects, buyEquipablesLabels,  InputCoordinator.confirm, InputCoordinator.leftStickVert.axis, InputCoordinator.leftStickHor.axis);
	
	var confirmBuyEquipableRects : Rect[] = new Rect[2];
	confirmBuyEquipableRects[0] = new Rect(popupRect.center.x - (buttonRect.width*0.75), popupRect.center.y, buttonRect.width*0.75, buttonRect.height*0.75);
	confirmBuyEquipableRects[1] = new Rect(popupRect.center.x + (buttonRect.width*0.25), popupRect.center.y, buttonRect.width*0.75, buttonRect.height*0.75);
	var confirmBuyEquipableLabels : String[] = new String[2];
	confirmBuyEquipableLabels[0] = "Confirm";
	confirmBuyEquipableLabels[1] = "Back";
	confirmBuyEquipableMenu = JoyGUIMenu(1, confirmBuyEquipableRects, confirmBuyEquipableLabels, InputCoordinator.confirm, InputCoordinator.leftStickVert.axis, InputCoordinator.leftStickHor.axis);
	
	var optionsMenuRects : Rect[] = new Rect[2];
	var optionsMenuLabels : String[] = new String[2];
	optionsMenuRects[0] = new Rect(0,0,buttonRect.width, buttonRect.height);
	optionsMenuRects[1] = new Rect(0,0,buttonRect.width, buttonRect.height);
	optionsMenuRects[0].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y+(buttonRect.height*2));
	optionsMenuRects[1].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y+(buttonRect.height*3.5));
	optionsMenuLabels[0] = "Input";
	optionsMenuLabels[1] = "Sound";
	optionsMenu = JoyGUIMenu(2,optionsMenuRects,optionsMenuLabels,InputCoordinator.confirm,InputCoordinator.leftStickVert.axis,inputCoordinator.leftStickHor.axis);
	
	var inputOptionsMenuRects : Rect[] = new Rect[1];
	var inputOptionsMenuLabels : String[] = new String[1];
	inputOptionsMenuRects[0] = new Rect(0,0,buttonRect.width,buttonRect.height);
	inputOptionsMenuRects[0].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y + buttonRect.height/2);
	inputOptionsMenuLabels[0] = "Controller Setup";
	inputOptionsMenu = JoyGUIMenu(1, inputOptionsMenuRects, inputOptionsMenuLabels,InputCoordinator.confirm,InputCoordinator.leftStickVert.axis,inputCoordinator.leftStickHor.axis);
	
	supportBayMenu.enabled = true;
	equipEquipablesMenu.enabled = false;
	buyEquipablesMenu.enabled = false;
	confirmBuyEquipableMenu.enabled = false;
	optionsMenu.enabled = false;
	inputOptionsMenu.enabled = false;
}

function Update (){
	
	switch (currentState){
		case Menu.SupportBay:
			supportBayMenu.enabled = true;
			equipEquipablesMenu.enabled = false;
			buyEquipablesMenu.enabled = false;
			optionsMenu.enabled = false;
			inputOptionsMenu.enabled = false;
			if (InputCoordinator.usingController){
				if (supportBayMenu.CheckJoyAxis())Invoke("Delay", delayBetweenButtons);
				SupportBay(supportBayMenu.CheckJoyButton());
			}
			if (InputCoordinator.usingMouseAndKeyboard){
				supportBayMenu.CheckMousePosition();
				SupportBay(supportBayMenu.CheckMouseClick());	
			}
			if ((Input.GetButtonDown("Pause") || (Input.GetButtonDown(InputCoordinator.pause))) && Time.time > optionsLastHit + 0.25){
					currentState = Menu.Options;
					optionsLastHit = Time.time;
			}
			break;
		case Menu.EquipEquipables:
			equipEquipablesMenu.enabled = true;
			Equips(equipEquipablesMenu.CheckMouseClick());
			Equips(equipEquipablesMenu.CheckJoyButton());
			break;
		case Menu.ConfirmBuyEquipable:
			buyEquipablesMenu.enabled = true;
			confirmBuyEquipableMenu.enabled = true;
			if (InputCoordinator.usingController){
				if (confirmBuyEquipableMenu.CheckJoyAxis())Invoke("Delay", delayBetweenButtons);
				ConfirmEquipPurchase(confirmBuyEquipableMenu.CheckJoyButton());
			}	
			if (InputCoordinator.usingMouseAndKeyboard){
				confirmBuyEquipableMenu.CheckMousePosition();
				ConfirmEquipPurchase(confirmBuyEquipableMenu.CheckMouseClick());
			}
			
			break;
		case Menu.BuyEquipables:
			supportBayMenu.enabled = false;
			buyEquipablesMenu.enabled = true;
			if (InputCoordinator.usingController){
				if (buyEquipablesMenu.CheckJoyAxis())Invoke("Delay", delayBetweenButtons);
				BuyEquips(buyEquipablesMenu.CheckJoyButton());
				if (Input.GetButtonDown(InputCoordinator.back)){
					currentState = Menu.SupportBay;
					buyEquipablesMenu.UnClickAll();
				}
			}	
			if (InputCoordinator.usingMouseAndKeyboard){
				buyEquipablesMenu.CheckMousePosition();
				BuyEquips(buyEquipablesMenu.CheckMouseClick());
			}

			break;
		case Menu.Options:
			optionsMenu.enabled = true;
			if (InputCoordinator.usingController){
				if (optionsMenu.CheckJoyAxis())Invoke("Delay", delayBetweenButtons);
				Options(optionsMenu.CheckJoyButton());
				if (Input.GetButtonDown(InputCoordinator.back)){
					currentState = Menu.SupportBay;
					optionsMenu.UnClickAll();
				}
			}
			if (InputCoordinator.usingMouseAndKeyboard){
				optionsMenu.CheckMousePosition();
				Options(optionsMenu.CheckMouseClick());
			}
			if ((Input.GetButtonDown("Pause") || (Input.GetButtonDown(InputCoordinator.pause))) && Time.time > optionsLastHit + 0.25){
				currentState = Menu.SupportBay;
				optionsLastHit = Time.time;
			}
			break;
		case Menu.InputOptions:
			inputOptionsMenu.enabled = true;
			if (InputCoordinator.usingController){
				if (inputOptionsMenu.CheckJoyAxis())Invoke("Delay", delayBetweenButtons);
				InputOptions(inputOptionsMenu.CheckJoyButton());
				if (Input.GetButtonDown(InputCoordinator.back)){
					currentState = Menu.SupportBay;
					inputOptionsMenu.UnClickAll();
				}
			}
			if (InputCoordinator.usingMouseAndKeyboard){
				inputOptionsMenu.CheckMousePosition();
				InputOptions(inputOptionsMenu.CheckMouseClick());
			}
			if ((Input.GetButtonDown("Pause") || (Input.GetButtonDown(InputCoordinator.pause))) && Time.time > optionsLastHit + 0.25){
				currentState = Menu.SupportBay;
				optionsLastHit = Time.time;
			}
			break;
	}

}

function OnGUI (){
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backgroundTex,ScaleMode.StretchToFill,true,1.0);
	GUI.skin = mySkin;
	
	if (render == true){
		Title();
		if (confirmStarMap == true){
			GUI.Window(1, popupRect, ConfirmStarMap, "Confirm");
		}
		if (equipSelectionBool == true){
			GUI.Window(3, popupRect, EquipSelection, "Bind Equipment");
		}

		switch (currentState){
			case Menu.SupportBay:
				supportBayMenu.Display();
				break;
			case Menu.EquipEquipables:
				if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
				GUILayout.Label("Unlocked Equipment");
				GUI.Box(physicalWeaponsRect,"Physical Weapons");
				GUI.Box(energyWeaponsRect, "Energy Weapons");
				GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
				GUI.Box(devicesRect, "Devices");
				equipEquipablesMenu.Display();
				break;
			case Menu.BuyEquipables:
				if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
				GUILayout.Label("Equipment Shop");
				GUI.Box(physicalWeaponsRect,"Physical Weapons");
				GUI.Box(energyWeaponsRect, "Energy Weapons");
				GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
				GUI.Box(devicesRect, "Devices");
				buyEquipablesMenu.Display();
				break;
			case Menu.ConfirmBuyEquipable:
				GUI.Box(physicalWeaponsRect,"Physical Weapons");
				GUI.Box(energyWeaponsRect, "Energy Weapons");
				GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
				GUI.Box(devicesRect, "Devices");
				buyEquipablesMenu.Display();
				GUI.Box(popupRect, "Confirm", "window");
				confirmBuyEquipableMenu.Display();
			case Menu.BuyUpgrades:
				BuyUpgrades();
				if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
				break;
			case Menu.Options:
				GUI.Box(optionsMenuRect, "Options", "window");
				optionsMenu.Display();
				break;
			case Menu.InputOptions:
				GUI.Box(optionsMenuRect, "Input Options", "window");
				inputOptionsMenu.Display();
				break;
		}
		ButtonLabels();
	} 
	       
}

function Title (){
	var creditsRect : Rect = new Rect(0,0,140,20);
	creditsRect.center = new Vector2(Screen.width/2, 20);
	GUI.Label(creditsRect, "Total Credits: "+PlayerStats.totalCredits);
}

function SupportBay(buttonHit : int){
	switch (buttonHit){
		case 0:
			currentState = Menu.EquipEquipables;
			supportBayMenu.UnClickAll();
			break;
		case 1:
			currentState = Menu.BuyEquipables;
			supportBayMenu.UnClickAll();
			break;
		case 2:
			currentState = Menu.BuyUpgrades;
			supportBayMenu.UnClickAll();
			break;
		case 3:
			confirmStarMap = true;
			break;
	}
}

function Equips (buttonHit : int){	
	if (buttonHit > -1 && buttonHit < 21){
		if (allUpgrades[buttonHit].bought == true){
			if (allUpgrades[buttonHit].selected == false){
				toBeEquipped = buttonHit;
				equipSelectionBool = true;
			}
		}
	}
	otherCamera.GetComponent(ThreeDeeIconsCamera).Go();
}

function BuyEquips (buttonHit : int){
	if (buttonHit > -1 && buttonHit < 21){
		if (allUpgrades[buttonHit].bought == false){
			toBeBought = buttonHit;
			currentState = Menu.ConfirmBuyEquipable;
		}
	}
	otherCamera.GetComponent(ThreeDeeIconsCamera).Go();
}

function BuyUpgrades(){

}

function ConfirmStarMap(windowID : int){
	if (GUI.Button(Rect(10,25,110,70), "Go to star map?"))
		Application.LoadLevel("StarMap");		
	if (GUI.Button(Rect(125,25,110,70), "Cancel"))
		confirmStarMap = false;
}

function ConfirmEquipPurchase(currentSelection : int){
	var str : String = "Purchase "+allUpgrades[toBeBought].name+" for "+allUpgrades[toBeBought].cost+"?";
	var strRect : Rect = new Rect(popupRect.center.x,popupRect.center.y + buttonRect.height, buttonRect.width, buttonRect.height);
	GUI.Label(strRect,str);
	switch (currentSelection){
		case 0:
			PlayerStats.totalCredits -= allUpgrades[toBeBought].cost;
			unlockedUpgrades.Push(allUpgrades[toBeBought]);
			allUpgrades[toBeBought].bought = true;
			buyEquipablesMenu.buttons[toBeBought].bought = true;
			buyEquipablesMenu.buttons[toBeBought].enabled = false;
			currentState = Menu.BuyEquipables;
			break;
		case 1:
			currentState = Menu.BuyEquipables;
			break;
	}
	if (Input.GetButtonDown(InputCoordinator.back)){
		currentState = Menu.BuyEquipables;
		buyEquipablesMenu.UnClickAll();
	}
}

function EquipSelection (windowID : int){
	var currentSelection : int = -1;
	var str : String = "Bind "+allUpgrades[toBeEquipped].name+" to ";//inputEnum.currentlyHit or something
	GUILayout.BeginVertical();
	GUILayout.Label(str);
	switch (currentSelection){
		case 0:
			break;
		case 1:
			break;
	}
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("Confirm")){
			var bool = false;
			for (var select in selections){
				if (allUpgrades[toBeEquipped] == select)bool = true;
			}
			if (bool == false)selections.Push(allUpgrades[toBeEquipped].name);
			allUpgrades[toBeEquipped].selected = true;
			//assign button
			equipSelectionBool = false;
		}
		if (GUILayout.Button("Cancel")){
			equipSelectionBool = false;
		}
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
/*	if (selections.length > 0){
		var selectionsContents : String = "";
		for (var a : int = 0; a < selections.length; a++){
			selectionsContents= selectionsContents + (a+": "+selections[a]+". ");
		}
		Debug.Log(selectionsContents);
	}*/
}

function Options (buttonHit : int) {
	switch (buttonHit){
		case 0:
			currentState = Menu.InputOptions;
			optionsMenu.UnClickAll();
			break;
	}

}

function InputOptions (buttonHit : int){
	switch (buttonHit){
		case 0:
			inputCoordinatorCamera.GetComponent(InputCoordinator).controllerSetup = true;
			render = false;
			optionsMenu.UnClickAll();
			break;
	}

}

function ButtonLabels (){
	GUI.Label(Rect(Screen.width - (Screen.width/15)*2, Screen.height - (Screen.height/15), Screen.width/15, Screen.height/15), "A - Select", "Button");
	if (GUI.Button(Rect(Screen.width - (Screen.width/15), Screen.height - (Screen.height/15), Screen.width/15, Screen.height/15), "B - Back")){
		currentState = Menu.SupportBay;
	}
}

function Delay (){
		supportBayMenu.isCheckingJoy = false;
		equipEquipablesMenu.isCheckingJoy = false;
		buyEquipablesMenu.isCheckingJoy = false;
		confirmBuyEquipableMenu.isCheckingJoy = false;
		optionsMenu.isCheckingJoy = false;
		inputOptionsMenu.isCheckingJoy = false;
}	

function CheckInputCoordinator(){
	inputCoordinator = gameObject.GetComponent(InputCoordinator);
}
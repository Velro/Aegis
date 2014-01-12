#pragma strict
@script AddComponentMenu("GUI/UpgroidsUI")
var render : boolean = true;
var backgroundTex : Texture;
public static var selections = new Array();
var allUpgrades : Upgrades[];
private var unlockedUpgrades = new Array();
private var convUnlockedUpgrades : Upgrades[];
private var toBeBought : int;
private var confirmEquipPurchaseBool : boolean = false;
private var toBeEquipped : int;
private var equipSelectionBool : boolean = false;
private var supportBayRect : Rect = Rect(20, 20, 400, 400);
private var confirmStarMap : boolean = false;
var xStyle : GUIStyle;
var checkStyle : GUIStyle;
var buttonStyle : GUIStyle;
private var physicalWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height-(Screen.height/4));
private var energyWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height - Screen.height/4);
private var explosiveWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height - Screen.height/4);
private var devicesRect : Rect = new Rect(0,0,Screen.width/4,Screen.height - Screen.height/4);
private var buttonRect : Rect = new Rect(0,0,Screen.width/8-30,60); 
physicalWeaponsRect.center = new Vector2(Screen.width/8, Screen.height/2);
energyWeaponsRect.center = new Vector2((Screen.width/8)*2+15, Screen.height/2);
explosiveWeaponsRect.center = new Vector2((Screen.width/8)*3 + 30, Screen.height/2);
devicesRect.center = new Vector2((Screen.width/8)*5, Screen.height/2);
supportBayRect.center = new Vector2(Screen.width/2, Screen.height/2);
private var optionsCooldown : float = 0.25;
private var optionsLastHit : float = 0;
private var popupRect = Rect(0,0,Screen.width/4,Screen.height/4);
popupRect.center = Vector2(Screen.width/2, Screen.height/2);
private var optionsRect = Rect(0,0,Screen.width/2,(Screen.height/4)*3);
optionsRect.center = Vector2(Screen.width/2, Screen.height/2);
var otherCamera : GameObject;
var inputCoordinatorCamera : GameObject;

enum Menu {
	SupportBay,
	EquipEquipables,
	BuyEquipables,
	BuyUpgrades,
	Options
}

var currentState : Menu = Menu.SupportBay;

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var description : String;
	var bought : boolean = false;
	var selected : boolean = false;
}

function Start (){

}

function OnGUI (){
	if (render == true){
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),backgroundTex,ScaleMode.StretchToFill,true,1.0);
	Title();
	if (confirmStarMap == true){
		GUI.Window(1, popupRect, ConfirmStarMap, "Confirm");
	}
	if (confirmEquipPurchaseBool == true){
		GUI.Window(2, popupRect, ConfirmEquipPurchase, "Confirm");
	}
	if (equipSelectionBool == true){
		GUI.Window(3, popupRect, EquipSelection, "Bind Equipment");
	}

	switch (currentState){
		case Menu.SupportBay:
			GUI.Window(0,supportBayRect, SupportBay, "Support Bay");
			if (Input.GetButtonDown("Pause") && Time.time > optionsLastHit + optionsCooldown){
				currentState = Menu.Options;
				optionsLastHit = Time.time;
			}
			break;
		case Menu.EquipEquipables:
			Equips();
			if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
			break;
		case Menu.BuyEquipables:
			BuyEquips();
			if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
			break;
		case Menu.BuyUpgrades:
			BuyUpgrades();
			if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
			break;
		case Menu.Options:
			GUI.Window(4, optionsRect, Options, "Options");
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

function SupportBay(){
	var equipRect : Rect = new Rect(0,0,180,40);
	var buyEquipsRect : Rect = new Rect(0,0,180,40); 
	var buyUpgradesRect : Rect = new Rect(0,0,180,40);
	var exitBayRect : Rect = new Rect(0,0,180,40);
	equipRect.center = new Vector2(supportBayRect.width/2, 50);
	buyEquipsRect.center = new Vector2(supportBayRect.width/2, 100);
	buyUpgradesRect.center = new Vector2(supportBayRect.width/2, 150);
	exitBayRect.center = new Vector2(supportBayRect.width/2, 200);
	if (GUI.Button(equipRect,"Equip Weapons and Devices")){
		currentState = Menu.EquipEquipables;
	}
	if (GUI.Button(buyEquipsRect, "Buy Equipment")){
		currentState = Menu.BuyEquipables;
	}
	if (GUI.Button(buyUpgradesRect, "Upgrade Ship")){
		currentState = Menu.BuyUpgrades;
	}
	if (GUI.Button(exitBayRect, "Exit Support Bay")){
		confirmStarMap = true;
	}
}

function Equips (){
	GUILayout.Label("Unlocked Equipment");
	GUI.Box(physicalWeaponsRect,"Physical Weapons");
	GUI.Box(energyWeaponsRect, "Energy Weapons");
	GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
	GUI.Box(devicesRect, "Devices");
	/****Physical Weapons ****/
	for (var i : int = 0; i < 4; i++){
		if (allUpgrades[i].bought == true){
			var strA : String = allUpgrades[i].name;
			buttonRect.center = Vector2(physicalWeaponsRect.center.x, Screen.height/4 + (i * 100));
			/**** Equipping ****/
			if (GUI.Button(buttonRect,strA) && allUpgrades[i].selected == false){
				toBeEquipped = i;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[i].selected == true){
				GUI.Button(buttonRect,strA);
				GUI.Label(buttonRect,"",checkStyle);
			}
		}
	}
	/**** Energy Weapons ****/
	for (var j : int = 4; j < 8; j++){
		if (allUpgrades[j].bought == true){
			var strB : String = allUpgrades[j].name;
			buttonRect.center = Vector2(energyWeaponsRect.center.x, Screen.height/4 + ((j - 4) * 100));
			/**** Equipping ****/
			if (GUI.Button(buttonRect,strB) && allUpgrades[j].selected == false){
				toBeEquipped = j;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[i].selected == true){
				GUI.Button(buttonRect,strB);
				GUI.Label(buttonRect,"",checkStyle);
			}
		}
	}
	/**** Explosive Weapons ****/
	for (var k : int = 8; k < 12; k++){
		if (allUpgrades[k].bought == true){
			var strC : String = allUpgrades[k].name;
			buttonRect.center = Vector2(explosiveWeaponsRect.center.x, Screen.height/4 + ((k - 8) * 100));
			/**** Equipping ****/
			if (GUI.Button(buttonRect,strC) && allUpgrades[k].selected == false){
				toBeEquipped = k;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[k].selected == true){
				GUI.Button(buttonRect,strC);
				GUI.Label(buttonRect,"",checkStyle);
			}
		}
	}
	/**** Devices1 ****/
	for (var l : int = 12; l < 16; l++){
		if (allUpgrades[l].bought == true){
			var strD : String = allUpgrades[l].name;
			buttonRect.center = Vector2(devicesRect.center.x - buttonRect.width/2, Screen.height/4 + ((l - 12) * 100));
			/**** Equipping ****/
			if (GUI.Button(buttonRect,strD) && allUpgrades[l].selected  == false){
				toBeEquipped = l;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[l].selected == true){
				GUI.Button(buttonRect,strD);
				GUI.Label(buttonRect,"",checkStyle);
			}
		}
	}
	/**** Devices2 ****/
	for (var m : int = 16; m < 20; m++){
		if (allUpgrades[m].bought == true){
			var strE : String = allUpgrades[m].name;
			buttonRect.center = Vector2(devicesRect.center.x + buttonRect.width/2 + 2, Screen.height/4 + ((m - 16) * 100));
			/**** Equipping ****/
			if (GUI.Button(buttonRect,strE) && allUpgrades[m].selected == false){
				toBeEquipped = m;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[m].selected == true){
				GUI.Button(buttonRect,strE);
				GUI.Label(buttonRect,"",checkStyle);
			}
		}
	}
}

function BuyEquips (){
	GUILayout.Label("Equipment Shop");
	GUI.Box(physicalWeaponsRect,"Physical Weapons");
	GUI.Box(energyWeaponsRect, "Energy Weapons");
	GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
	GUI.Box(devicesRect, "Devices");
	/****Physical Weapons ****/
	for (var i : int = 0; i < 4; i++){
		var str : String = allUpgrades[i].name;
		buttonRect.center = Vector2(physicalWeaponsRect.center.x, Screen.height/4 + (i * 100));
		/**** Buying ****/
		if (GUI.Button(buttonRect,str) && allUpgrades[i].bought == false){
			toBeBought = i;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[i].bought == true){
			GUI.Button(buttonRect,str);
			GUI.Label(buttonRect,"",checkStyle);
		}
	}
	/**** Energy Weapons ****/
	for (var j : int = 4; j < 8; j++){
		var str1 : String = allUpgrades[j].name;
		buttonRect.center = Vector2(energyWeaponsRect.center.x, Screen.height/4 + ((j - 4) * 100));
		/**** Buying ****/
		if (GUI.Button(buttonRect,str1) && allUpgrades[j].bought == false){
			toBeBought = j;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[j].bought == true){;
			GUI.Button(buttonRect,str1);
			GUI.Label(buttonRect,"",checkStyle);
		}
	}
	/**** Explosive Weapons ****/
	for (var k : int = 8; k < 12; k++){
		var str2 : String = allUpgrades[k].name;
		buttonRect.center = Vector2(explosiveWeaponsRect.center.x, Screen.height/4 + ((k - 8) * 100));
		/**** Buying ****/
		if (GUI.Button(buttonRect,str2) && allUpgrades[k].bought == false){
			toBeBought = k;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[k].bought == true){
			GUI.Button(buttonRect,str2);
			GUI.Label(buttonRect,"",checkStyle);
		}
	}
	/**** Devices1 ****/
	for (var l : int = 12; l < 16; l++){
		var str3 : String = allUpgrades[l].name;
		buttonRect.center = Vector2(devicesRect.center.x - buttonRect.width/2 - 2, Screen.height/4 + ((l - 12) * 100));
				/**** Buying ****/
		if (GUI.Button(buttonRect,str3) && allUpgrades[l].bought == false){
			toBeBought = l;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[l].bought == true){
			GUI.Button(buttonRect,str3);
			GUI.Label(buttonRect,"",checkStyle);
		}
		otherCamera.GetComponent(ThreeDeeIconsCamera).Go();
	}
	
	/**** Devices2 ****/
	for (var m : int = 16; m < 20; m++){
		var str4 : String = allUpgrades[m].name;
		buttonRect.center = Vector2(devicesRect.center.x + buttonRect.width/2 + 2, Screen.height/4 + ((m - 16) * 100));
				/**** Buying ****/
		if (GUI.Button(buttonRect,str4) && allUpgrades[m].bought == false){
			toBeBought = m;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[m].bought == true){
			GUI.Button(buttonRect,str4);
			GUI.Label(buttonRect,"",checkStyle);
		}
	}
}
function BuyUpgrades(){

}
function ConfirmStarMap(windowID : int){
	if (GUI.Button(Rect(10,25,110,70), "Go to star map?"))
		Application.LoadLevel("StarMap");		
	if (GUI.Button(Rect(125,25,110,70), "Cancel"))
		confirmStarMap = false;
}
function ConfirmEquipPurchase(windowID : int){
	var str : String = "Purchase "+allUpgrades[toBeBought].name+" for "+allUpgrades[toBeBought].cost+"?";
	GUILayout.BeginVertical();
	GUILayout.Label(str);
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("Confirm")){
			PlayerStats.totalCredits -= allUpgrades[toBeBought].cost;
			unlockedUpgrades.Push(allUpgrades[toBeBought]);
			allUpgrades[toBeBought].bought = true;
			confirmEquipPurchaseBool = false;
		}
		if (GUILayout.Button("Cancel")){
			confirmEquipPurchaseBool = false;
		}
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
	if (currentState != Menu.BuyEquipables)confirmEquipPurchaseBool = false;
}
function EquipSelection (windowID : int){
	var str : String = "Bind "+allUpgrades[toBeEquipped].name+" to ";//inputEnum.currentlyHit or something
	GUILayout.BeginVertical();
	GUILayout.Label(str);
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
	if (currentState != Menu.EquipEquipables)equipSelectionBool = false;
}

enum OptionsMenu {
	Base,
	InputOptions
}
var optionsCurrentState : OptionsMenu = OptionsMenu.Base;

function Options (windowID : int) {
	//var optionsButtonRect : Rect = Rect(0,0,optionsRect.width - 10, optionsRect.height - 10);
	//optionsButtonRect.center = Vector2(Screen.width/2, (Screen.height/8) * 4);
	GUILayout.Space(10);
	switch (optionsCurrentState){
		case OptionsMenu.Base:
			if (GUILayout.Button("Input Options")){
				optionsCurrentState = OptionsMenu.InputOptions;
			}
			break;
		
		case OptionsMenu.InputOptions:
			if (GUILayout.Button("Controller Setup")){
				inputCoordinatorCamera.GetComponent(InputCoordinator).controllerSetup = true;
				render = false;
			}
			
			break;
	}

	
	if (Input.GetButtonDown("Pause") && Time.time > optionsLastHit + optionsCooldown){
		currentState = Menu.SupportBay;
		optionsLastHit = Time.time;
	}
}

function ButtonLabels (){
	GUI.Label(Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	GUI.Label(Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
}


#pragma strict
private var width : float;
private var height : float;
public static var selections = new Array();
var allUpgrades : Upgrades[];
var unlockedUpgrades = new Array();
var convUnlockedUpgrades : Upgrades[];
var toBeBought : int;
var confirmEquipPurchaseBool : boolean = false;
var toBeEquipped : int;
var equipSelectionBool : boolean = false;
var supportBayRect : Rect = Rect(20, 20, 400, 400);
var confirmStarMap : boolean = false;

var physicalWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height-(Screen.height/4));
var energyWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height - Screen.height/4);
var explosiveWeaponsRect : Rect = new Rect(0,0,Screen.width/8,Screen.height - Screen.height/4);
var devicesRect : Rect = new Rect(0,0,Screen.width/4,Screen.height - Screen.height/4);
var buttonRect : Rect = new Rect(0,0,Screen.width/8-10,60); 
physicalWeaponsRect.center = new Vector2(Screen.width/8, Screen.height/2);
energyWeaponsRect.center = new Vector2((Screen.width/8)*2+15, Screen.height/2);
explosiveWeaponsRect.center = new Vector2((Screen.width/8)*3 + 30, Screen.height/2);
devicesRect.center = new Vector2((Screen.width/8)*5, Screen.height/2);
supportBayRect.center = new Vector2(Screen.width/2, Screen.height/2);
enum Menu {
	SupportBay,
	EquipEquipables,
	BuyEquipables,
	BuyUpgrades
}

var currentState : Menu = Menu.SupportBay;

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var description : String;
	var bool : boolean = false;
	var bought : boolean = false;
	var selected : boolean = false;
}

function Start (){
	width = Screen.width;
	height = Screen.height;
}
var popupRect = Rect(400,300,250,150);
function OnGUI (){
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
	}
	ButtonLabels();
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
			buttonRect.center = Vector2(physicalWeaponsRect.center.x, Screen.height/4 + (i * 80));
			/**** To Be Equipped ****/
			allUpgrades[i].bool = GUI.Toggle(buttonRect,allUpgrades[i].bool,strA,"Button");
			/**** Equipping ****/
			if (allUpgrades[i].bool == true && allUpgrades[i].selected == false){
				toBeEquipped = i;
				equipSelectionBool = true;
			}
			/**** Equipped ****/
			if (allUpgrades[i].bought == true){
				allUpgrades[i].bool = true;
			}
		}
	}
	/**** Energy Weapons ****/
	for (var j : int = 4; j < 8; j++){
		var str1 : String = allUpgrades[j].name;
		buttonRect.center = Vector2(energyWeaponsRect.center.x, Screen.height/4 + ((j - 4) * 80));
		/**** To Be Bought ****/
		allUpgrades[j].bool = GUI.Toggle(buttonRect,allUpgrades[j].bool,str1,"Button");
		/**** Buying ****/
		if (allUpgrades[j].bool == true && allUpgrades[j].bought == false){
			toBeBought = j;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[j].bought == true){
			allUpgrades[j].bool = true;
		}
	}
	/**** Explosive Weapons ****/
	for (var k : int = 8; k < 12; k++){
		var str2 : String = allUpgrades[k].name;
		buttonRect.center = Vector2(explosiveWeaponsRect.center.x, Screen.height/4 + ((k - 8) * 80));
		/**** To Be Bought ****/
		allUpgrades[k].bool = GUI.Toggle(buttonRect,allUpgrades[k].bool,str2,"Button"); 
		/**** Buying ****/
		if (allUpgrades[k].bool == true && allUpgrades[k].bought == false){
			toBeBought = k;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[k].bought == true){;
			allUpgrades[k].bool = true;
		}
	}
	/*
	for (var i : int; i < convUnlockedUpgrades.length; i++){
		convUnlockedUpgrades[i].selected = GUILayout.Toggle(convUnlockedUpgrades[i].selected, convUnlockedUpgrades[i].name, "Button");
		if (convUnlockedUpgrades[i].selected == true){
			var str : String = convUnlockedUpgrades[i].name;
			var bool = false;
			for (var select in selections){
				if (str == select)bool = true;
			}
			if (bool == false)selections.Push(str);
		}
		//if (selections.length == 2)Debug.Log(selections[0]+"   "+selections[1]);
	}
	*/
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
		buttonRect.center = Vector2(physicalWeaponsRect.center.x, Screen.height/4 + (i * 80));
		/**** To Be Bought ****/
		allUpgrades[i].bool = GUI.Toggle(buttonRect,allUpgrades[i].bool,str,"Button");
		/**** Buying ****/
		if (allUpgrades[i].bool == true && allUpgrades[i].bought == false){
			toBeBought = i;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[i].bought == true){
			allUpgrades[i].bool = true;
		}
	}
	/**** Energy Weapons ****/
	for (var j : int = 4; j < 8; j++){
		var str1 : String = allUpgrades[j].name;
		buttonRect.center = Vector2(energyWeaponsRect.center.x, Screen.height/4 + ((j - 4) * 80));
		/**** To Be Bought ****/
		allUpgrades[j].bool = GUI.Toggle(buttonRect,allUpgrades[j].bool,str1,"Button");
		/**** Buying ****/
		if (allUpgrades[j].bool == true && allUpgrades[j].bought == false){
			toBeBought = j;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[j].bought == true){;
			allUpgrades[j].bool = true;
		}
	}
	/**** Explosive Weapons ****/
	for (var k : int = 8; k < 12; k++){
		var str2 : String = allUpgrades[k].name;
		buttonRect.center = Vector2(explosiveWeaponsRect.center.x, Screen.height/4 + ((k - 8) * 80));
		/**** To Be Bought ****/
		allUpgrades[k].bool = GUI.Toggle(buttonRect,allUpgrades[k].bool,str2,"Button");
		/**** Buying ****/
		if (allUpgrades[k].bool == true && allUpgrades[k].bought == false){
			toBeBought = k;
			confirmEquipPurchaseBool = true;
		}
		/**** Bought ****/
		if (allUpgrades[k].bought == true){
			allUpgrades[k].bool = true;
		}
	}
}
function BuyUpgrades(){

}
function ConfirmStarMap(windowID : int){
	if (GUI.Button(Rect(10,25,110,70), "Go to star map?"))
		Application.LoadLevel("Star Map");		
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
			allUpgrades[toBeBought].bool = false;
			confirmEquipPurchaseBool = false;
		}
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
}
function EquipSelection (windowID : int){
	var str : String = "Bind "+allUpgrades[toBeBought].name+" to ";
	GUILayout.BeginVertical();
	GUILayout.Label(str);
		GUILayout.BeginHorizontal();
		if (GUILayout.Button("Confirm")){
			PlayerStats.totalCredits -= allUpgrades[toBeBought].cost;
			unlockedUpgrades.Push(allUpgrades[toBeBought]);
			allUpgrades[toBeBought].bought = true;
			equipSelectionBool = false;
		}
		if (GUILayout.Button("Cancel")){
			allUpgrades[toBeBought].bool = false;
			equipSelectionBool = false;
		}
		GUILayout.EndHorizontal();
	GUILayout.EndVertical();
}
function ButtonLabels (){
	GUI.Label(Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	GUI.Label(Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
}
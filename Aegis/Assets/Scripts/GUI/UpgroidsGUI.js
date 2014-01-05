#pragma strict
private var width : float;
private var height : float;
public static var selections = new Array();
var allUpgrades : Upgrades[];
var unlockedUpgrades = new Array();
var convUnlockedUpgrades : Upgrades[];

var supportBayRect : Rect = Rect(20, 20, 400, 400);
var confirmStarMap : boolean = false;

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
	var bool : boolean = false;
	var bought : boolean = false;
	var selected : boolean = false;
}

function Awake (){
	//selections.Push("Vulcan Cannon");
	//selections.Push("Fusion Beam");
}

function Start (){
	width = Screen.width;
	height = Screen.height;
}

function OnGUI (){
	Title();
	//Shop();
	//Unlocked();
	if (confirmStarMap == true){
		var rect = Rect(400,300,250,150);
		GUI.Window(1, rect, ConfirmStarMap, "Confirm");
	}
		
	switch (currentState){
		case Menu.SupportBay:
		GUI.Window(0,supportBayRect, SupportBay, "Support Bay");
		case Menu.EquipEquipables:
		Equips();
		case Menu.BuyEquipables:
		BuyEquips();
		case Menu.BuyUpgrades:
		BuyUpgrades();
	}
	
}

function Title (){
	GUI.Label(Rect(width/2 - 100,10,200,20),"Choose your loadout");
	GUI.Label(Rect(width/2+100, 10,200, 20), "Total Credits: "+PlayerStats.totalCredits);
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
	if (unlockedUpgrades.length > 0){
		convUnlockedUpgrades = unlockedUpgrades.ToBuiltin(Upgrades) as Upgrades[];
		//Debug.Log(convUnlockedUpgrades[0].name);
		GUILayout.BeginArea(Rect (10, Screen.height/2, 400,400));
			GUILayout.BeginHorizontal();
			//Debug.Log(convUnlockedUpgrades.length);
			if (convUnlockedUpgrades.length > 0){
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
					if (selections.length == 2)Debug.Log(selections[0]+"   "+selections[1]);
				}
			}
			GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
}
function BuyEquips (){
	GUILayout.BeginArea(Rect(10,50,width-40,height - 40));
		GUILayout.Label("Shop");
		
		GUILayout.BeginHorizontal();
		GUILayout.Label("Weapons");
		GUILayout.EndHorizontal();
		
		GUILayout.BeginHorizontal();
			for (var i : int = 0; i < 4; i++){
				var str : String = allUpgrades[i].name+"  "+allUpgrades[i].cost;
				if (allUpgrades[i].bool == false){
					allUpgrades[i].bool = GUILayout.Toggle(allUpgrades[i].bool,str,"Button");
				}  
				if (allUpgrades[i].bool == true && allUpgrades[i].bought == false){
					PlayerStats.totalCredits -= allUpgrades[i].cost;
					unlockedUpgrades.Push(allUpgrades[i]);
					//Debug.Log(unlockedUpgrades.length);
					allUpgrades[i].bought = true;
				}
				if (allUpgrades[i].bought == true){
					allUpgrades[i].bool = GUILayout.Toggle(allUpgrades[i].bool,str,"Button");
					allUpgrades[i].bool = true;
				}
			}
		GUILayout.EndHorizontal();
		GUILayout.Label("Devices");
		GUILayout.BeginHorizontal();
		
		GUILayout.EndHorizontal();
	
		GUILayout.Label("Stats");
	GUILayout.EndArea();
}
function BuyUpgrades(){

}
function ConfirmStarMap(windowID : int){
	if (GUI.Button(Rect(10,25,110,70), "Go to star map?"))
		Application.LoadLevel("Star Map");
	if (GUI.Button(Rect(125,25,110,70), "Cancel"))
		confirmStarMap = false;
}
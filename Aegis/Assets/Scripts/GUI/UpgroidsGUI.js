#pragma strict
private var width : float;
private var height : float;
public static var selections = new Array();
var allUpgrades : Upgrades[];
var unlockedUpgrades = new Array();

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var bool : boolean = false;
	var bought : boolean = false;
	var selected : boolean = false;
}

function Start (){
	width = Screen.width;
	height = Screen.height;
}
function OnGUI (){
	Title();
	Shop();
	Unlocked();
	if (GUI.Button(Rect(Screen.width/2, Screen.height - 40, 100, 50),"Battle!")){
		Application.LoadLevel(2);
	}
}

function Title (){
	GUI.Label(Rect(width/2 - 100,10,200,20),"Choose your loadout");
	GUI.Label(Rect(width/2+100, 10,200, 20), "Total Credits: "+PlayerStats.totalCredits);
}

function Shop (){
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

function Unlocked (){
	if (unlockedUpgrades.length > 0){
		var convUnlockedUpgrades :Upgrades[] = unlockedUpgrades.ToBuiltin(Upgrades) as Upgrades[];
		//Debug.Log(convUnlockedUpgrades[0].name);
		GUILayout.BeginArea(Rect (10, Screen.height/2, 400,400));
			GUILayout.BeginHorizontal();
			//Debug.Log(convUnlockedUpgrades.length);
			if (convUnlockedUpgrades.length > 0){
				for (var i : int; i < convUnlockedUpgrades.length; i++){
					convUnlockedUpgrades[i].selected = GUILayout.Toggle(convUnlockedUpgrades[i].selected, convUnlockedUpgrades[i].name, "Button");
					if (convUnlockedUpgrades[i].selected == true){
						var str : String = convUnlockedUpgrades[i].name;
						selections.Push(str);
						//Debug.Log(selections[0]);
					}
					//if (selections.length > 0)Debug.Log(selections[i]);
				}
			}
			GUILayout.EndHorizontal();
		GUILayout.EndArea();
	}
}

function AddToSelection (name : String){
	
}

function RemoveFromSelection(){

}
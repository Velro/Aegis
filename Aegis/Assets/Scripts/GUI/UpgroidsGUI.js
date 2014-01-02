#pragma strict
private var width : float;
private var height : float;
public static var selections : String[];
var upgrades : Upgrades[];

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var bool : boolean = false;
	var bought : boolean = false;
}
function Start (){
	width = Screen.width;
	height = Screen.height;
}
function OnGUI (){
	Title();
	Shop();
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
				var str : String = upgrades[i].name+"  "+upgrades[i].cost;
				if (upgrades[i].bool == false){
					upgrades[i].bool = GUILayout.Toggle(upgrades[i].bool,str,"Button");
				}  
				if (upgrades[i].bool == true && upgrades[i].bought == false){
					PlayerStats.totalCredits -= upgrades[i].cost;
					upgrades[i].bought = true;
				}
				if (upgrades[i].bought == true){
					upgrades[i].bool = GUILayout.Toggle(upgrades[i].bool,str,"Button");
					upgrades[i].bool = true;
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

}
#pragma strict
private var width : float;
private var height : float;
public static var selections : String[];
var upgrades : Upgrades[];

class Upgrades extends System.Object{
	var name : String;
	var cost : int;
	var selected : boolean = false;
}
function Start (){
	width = Screen.width;
	height = Screen.height;
}
function OnGUI (){
	Title();
	Equipables();
}

function Title (){
	GUI.Label(Rect(width/2 - 100,10,200,20),"Choose your loadout");
}

function Equipables (){
	GUILayout.BeginArea(Rect(10,50,width-40,height - 40));
		GUILayout.Label("Weapons");
		GUILayout.BeginHorizontal();
			upgrades[0].selected = GUILayout.Toggle(upgrades[0].selected,upgrades[0].name,"Button");
		GUILayout.EndHorizontal();
		
		GUILayout.Label("Devices");
		
		GUILayout.BeginHorizontal();
		
		GUILayout.EndHorizontal();
		
		GUILayout.Label("Stats");
	GUILayout.EndArea();
}
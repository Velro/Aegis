#pragma strict
var level1 : String;
var background : Texture2D;
private var optionsMenu : boolean = false;
private var inputMenu : boolean = false;

function OnGUI () {
	GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),background,ScaleMode.StretchToFill,true,1.0);
	GUI.BeginGroup(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200)); //GUI organization tool
	GUI.Box(Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200),"Main Menu"); //just to see the menu
	if (!optionsMenu && !inputMenu){
		if (GUI.Button(Rect(10,10,180,30),"Adventure")){
			Application.LoadLevel(level1);
		}
		if (GUI.Button(Rect(10,50,180,30),"Options")){
			optionsMenu = true;
		}
		if (GUI.Button(Rect(10,90,180,30),"Quit")){
			Application.Quit();
		}
	}
	if (optionsMenu){
		if (GUI.Button (Rect(10,10,180,30),"Input")){
			optionsMenu = false;
			inputMenu = true;
		} 
		if (GUI.Button (Rect(10,50,180,30),"Back")){
			optionsMenu = false;
		}
	}
	if (inputMenu){
		if (GUI.Button (Rect(5,20,110,30),"Mouse/Keyboard")){
			InputCoordinator.usingMouseAndKeyboard = true;
			InputCoordinator.usingController = false;
		}
		if (GUI.Button (Rect(15,60,110,30),"Xbox Controller")){
			InputCoordinator.usingController = true;
			InputCoordinator.usingMouseAndKeyboard = false;
		}
		if (GUI.Button (Rect(15,100,110,30),"Back")){
			inputMenu = false;
			optionsMenu = true;
		}
	}
	GUI.EndGroup ();
}
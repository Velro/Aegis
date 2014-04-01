using UnityEngine;
using System.Collections;

public class MainMenuGUI : MonoBehaviour 
{

    public int starMapLevelID = 1;
    public Texture2D background;
    public enum MainMenuState 
    {
        mainMenu,
        optionsMenu,
        inputMenu
    }
    public MainMenuState currentMenuState = MainMenuState.mainMenu;

    void Start ()
    {
        Time.timeScale = 1;
    }

    void OnGUI () 
    {
	    GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height),background,ScaleMode.StretchToFill);
	    GUI.BeginGroup(new Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200)); //GUI organization tool
	    GUI.Box(new Rect(Screen.width/2 - 100, Screen.height/2 - 100, 200, 200),"Main Menu"); //just to see the menu
	    if (currentMenuState == MainMenuState.mainMenu){
		    if (GUI.Button(new Rect(10,10,180,30),"Adventure")){
			    Application.LoadLevel("StarMap");
		    }
		    if (GUI.Button(new Rect(10,50,180,30),"Options")){
			    currentMenuState = MainMenuState.optionsMenu;
		    }
		    if (GUI.Button(new Rect(10,90,180,30),"Quit")){
			    Application.Quit();
		    }
	    }
	    if (currentMenuState == MainMenuState.optionsMenu){
		    if (GUI.Button (new Rect(10,10,180,30),"Input")){
                currentMenuState = MainMenuState.inputMenu;
		    } 
		    if (GUI.Button (new Rect(10,50,180,30),"Back")){
                currentMenuState = MainMenuState.mainMenu;
		    }
	    }
	    if (currentMenuState == MainMenuState.inputMenu){
		    if (GUI.Button (new Rect(5,20,110,30),"Mouse/Keyboard")){
			    InputCoordinator.usingMouseAndKeyboard = true;
			    InputCoordinator.usingController = false;
		    }
		    if (GUI.Button (new Rect(15,60,110,30),"Xbox Controller")){
			    InputCoordinator.usingController = true;
			    InputCoordinator.usingMouseAndKeyboard = false;
		    }
		    if (GUI.Button (new Rect(15,100,110,30),"Back")){
                currentMenuState = MainMenuState.optionsMenu;
		    }
	    }
	    GUI.EndGroup ();
    }
}

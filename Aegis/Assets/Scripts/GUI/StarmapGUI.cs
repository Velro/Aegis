using UnityEngine;
using System.Collections;

public class StarmapGUI : MonoBehaviour 
{
    bool paused = false;
    private float pausedCooldown = 0.15f;
    private float pausedLastHit = 0;
    private Rect confirmMenuRect = new Rect(Screen.width/4, Screen.height/4, Screen.width/3, Screen.height/3);
    private Rect pauseMenuRect = new Rect(20, 20, Screen.width/4, Screen.height/2);
    bool confirmMenuOpened = false;
    public int oomdassaID = 3;
    public int mainMenuID = 0;
    public int upgroidsID = 2;
    
    string destinationName;
    int destinationID;

    void OnGUI () {

        if (GUI.Button(new Rect(100, 100, 100, 75), "Oomdassa"))
        {
            confirmMenuOpened = true;
            destinationName = "Oomdassa";
            destinationID = 3;

        }
	    if (confirmMenuOpened)
		    GUI.Window(1, confirmMenuRect, confirmMenu, "Confirm Menu");
	    if (Input.GetButtonDown("Pause") && Time.time - pausedCooldown > pausedLastHit && paused == false){
		    paused = true;
		    pausedLastHit = Time.time;
	    }
	    if (paused)
		    GUI.Window(0, pauseMenuRect, pauseMenu, "Pause Menu");
	    ButtonLabels();
    }

    void confirmMenu (int windowID){
	    if (GUI.Button(new Rect(10,10,100,70), "Go to "+destinationName+"?"))
		    Application.LoadLevel(destinationID);
	    if (GUI.Button(new Rect(120,10,100,70), "Cancel"))
		    confirmMenuOpened = false;

    }

    void pauseMenu (int window){
	    Rect resumeRect = new Rect(0,0,140,40);
	    Rect supportRect = new Rect(0,0,140,40);
	    Rect optionsRect = new Rect(0,0,140,40);
	    Rect returnMainRect = new Rect(0,0,140,40);
	    Rect exitGameRect = new Rect(0,0,140,40);
	    resumeRect.center = new Vector2(pauseMenuRect.width/2,40);
	    supportRect.center = new Vector2(pauseMenuRect.width/2,90);
	    optionsRect.center = new Vector2(pauseMenuRect.width/2,140);
	    returnMainRect.center = new Vector2(pauseMenuRect.width/2,190);
	    exitGameRect.center = new Vector2(pauseMenuRect.width/2,240);
	    if (confirmMenuOpened == true)
		    confirmMenuOpened = false;
	    if (Input.GetButtonDown("Pause") && Time.time - pausedCooldown > pausedLastHit){
		    paused = false;
		    pausedLastHit = Time.time;
	    }
	    if (GUI.Button(resumeRect,"Resume") && Time.time - pausedCooldown > pausedLastHit){
		    paused = false;
		    pausedLastHit = Time.time;
	    }
	    if (GUI.Button(supportRect, "Support Bay")){
		    paused = false;
		    destinationName = "UpgradesMenu";
            destinationID = 2;
		    confirmMenuOpened = true;
	    }
	    GUI.Button(optionsRect, "Options");
	    if (GUI.Button(returnMainRect, "Return to Main Menu")){
		    paused = false;
		    destinationName = "MainMenu";
            destinationID = 0;
            confirmMenuOpened = true;
	    }
	    if (GUI.Button(exitGameRect, "Exit Game"))
        {
            Application.Quit();
        }
    }

    void ButtonLabels (){
	    GUI.Label(new Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	    GUI.Label(new Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
    }
}

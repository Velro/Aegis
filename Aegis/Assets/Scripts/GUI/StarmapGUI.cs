using UnityEngine;
using System.Collections;

public class StarmapGUI : MonoBehaviour 
{
    public GUISkin mySkin;
    public enum StarmapMenuState
    {
        mainMenu,
        pauseMenu,
        optionsMenu,
        inputMenu
    }
    public StarmapMenuState currentStarmapMenuState = StarmapMenuState.mainMenu;

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

    JoyGUIMenu mainMenu;
    Rect[] mainMenuRects = new Rect[8];
    string[] mainMenuStrings = new string[8];

    JoyGUIMenu pauseMenu;
    Rect[] pauseMenuRects = new Rect[4];
    string[] pauseMenuStrings = new string[4];

    JoyGUIMenu optionsMenu;
    string[] optionsMenuStrings = new string[3];
    Rect[] optionsMenuRects = new Rect[3];

    JoyGUIMenu inputMenu;
    string[] inputMenuStrings = new string[2];
    Rect[] inputMenuRects = new Rect[2];

    void Start ()
    {
        Time.timeScale = 1;

        mainMenuRects[0] = new Rect(100, 100, 100, 75);
        mainMenuRects[1] = new Rect(100, 200, 100, 75);
        mainMenuRects[2] = new Rect(100, 300, 100, 75);
        mainMenuRects[3] = new Rect(200, 100, 100, 75);
        mainMenuRects[4] = new Rect(200, 200, 100, 75);
        mainMenuRects[5] = new Rect(200, 300, 100, 75);
        mainMenuRects[6] = new Rect(300, 100, 100, 75);
        mainMenuRects[7] = new Rect(300, 200, 100, 75);

        mainMenuStrings[0] = "Oomdassa";
        mainMenuStrings[1] = "Stars";
        mainMenuStrings[2] = "Level 3";
        mainMenuStrings[3] = "Level 4";
        mainMenuStrings[4] = "Level 5";
        mainMenuStrings[5] = "Level 6";
        mainMenuStrings[6] = "Level 7";
        mainMenuStrings[7] = "Level 8";
        mainMenu = new JoyGUIMenu(8, mainMenuRects, mainMenuStrings, MainMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

        pauseMenuRects[0] = new Rect(0,0, Screen.width / 5, Screen.height / 10);
        pauseMenuRects[1] = new Rect(0,0, Screen.width / 5, Screen.height / 10);
        pauseMenuRects[2] = new Rect(0,0, Screen.width / 5, Screen.height / 10);
        pauseMenuRects[3] = new Rect(0,0, Screen.width / 5, Screen.height / 10);
        pauseMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        pauseMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);
        pauseMenuRects[2].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 16);
        pauseMenuRects[3].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 20);

        pauseMenuStrings[0] = "Resume Game";
        pauseMenuStrings[1] = "Options";
        pauseMenuStrings[2] = "Main Menu";
        pauseMenuStrings[3] = "Exit Game";

        optionsMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[2] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        optionsMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);
        optionsMenuRects[2].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 16);

        optionsMenuStrings[0] = "Input";
        optionsMenuStrings[1] = "Sound";
        optionsMenuStrings[2] = "Graphics";
        optionsMenu = new JoyGUIMenu(3, optionsMenuRects, optionsMenuStrings, OptionsMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

        inputMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        inputMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        inputMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        inputMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);

        inputMenuStrings[0] = "Use Keyboard";
        inputMenuStrings[1] = "Use Controller";
        inputMenu = new JoyGUIMenu(2, inputMenuRects, inputMenuStrings, InputMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);
    }

    void Update ()
    {
        switch (currentStarmapMenuState)
        {
            case StarmapMenuState.mainMenu:

                break;

            case StarmapMenuState.pauseMenu:

                break;

            case StarmapMenuState.optionsMenu:

                break;
        }
    }

    void OnGUI () 
    {
        switch (currentStarmapMenuState)
        {
            case StarmapMenuState.mainMenu:

                break;

            case StarmapMenuState.pauseMenu:

                break;

            case StarmapMenuState.optionsMenu:

                break;
        }
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

    void MainMenuLogic (int hit)
    {

    }

    void OptionsMenuLogic (int hit)
    {

    }

    void InputMenuLogic (int hit)
    {

    }

    void ButtonLabels (){
	    GUI.Label(new Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	    GUI.Label(new Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
    }
}

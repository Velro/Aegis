using UnityEngine;
using System.Collections;

public class StarmapGUI : MonoBehaviour 
{
    public GUISkin mySkin;
    public enum StarmapMenuState
    {
        mainMenu,
        confirmMenu,
        pauseMenu,
        optionsMenu,
        inputMenu,
        soundMenu,
        graphicsMenu
    }
    public StarmapMenuState currentStarmapMenuState = StarmapMenuState.mainMenu;

    bool paused = false;
    private float pausedCooldown = 0.15f;
    private float pausedLastHit = 0;
    private Rect confirmMenuRect;
    private Rect pauseMenuRect;
    bool confirmMenuOpened = false;
    public int oomdassaID = 3;
    public int mainMenuID = 0;
    public int upgroidsID = 2;
    
    string destinationName;
    int destinationID;

    JoyGUIMenu mainMenu;
    Rect[] mainMenuRects = new Rect[8];
    string[] mainMenuStrings = new string[8];

    JoyGUIMenu confirmMenu;
    Rect[] confirmMenuRects = new Rect[2];
    string[] confirmMenuStrings = new string[2];

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

        confirmMenuRect = new Rect(0,0, Screen.width / 3, Screen.height / 3);
        confirmMenuRect.center = new Vector2(Screen.width / 2, Screen.height / 2);
        pauseMenuRect = new Rect(20, 20, Screen.width / 4, Screen.height / 2);
        pauseMenuRect.center = new Vector2(Screen.width / 2, Screen.height / 2);

        mainMenuRects[0] = new Rect(100, 50,  100, 75);
        mainMenuRects[1] = new Rect(100, 200, 100, 75);
        mainMenuRects[2] = new Rect(100, 350, 100, 75);
        mainMenuRects[3] = new Rect(100, 500, 100, 75);
        mainMenuRects[4] = new Rect(300, 50,  100, 75);
        mainMenuRects[5] = new Rect(300, 200, 100, 75);
        mainMenuRects[6] = new Rect(300, 350, 100, 75);
        mainMenuRects[7] = new Rect(300, 500, 100, 75);

        mainMenuStrings[0] = "Oomdassa";
        mainMenuStrings[1] = "Support Bay";
        mainMenuStrings[2] = "Level 3";
        mainMenuStrings[3] = "Level 4";
        mainMenuStrings[4] = "Level 5";
        mainMenuStrings[5] = "Level 6";
        mainMenuStrings[6] = "Level 7";
        mainMenuStrings[7] = "Level 8";
        mainMenu = new JoyGUIMenu(4, mainMenuRects, mainMenuStrings, MainMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

        confirmMenuRects[0] = new Rect(0, 0, Screen.width / 10, Screen.height / 20);
        confirmMenuRects[1] = new Rect(0, 0, Screen.width / 10, Screen.height / 20);
        confirmMenuRects[0].center = new Vector2((Screen.width / 2) - Screen.width / 10, Screen.height / 2);
        confirmMenuRects[1].center = new Vector2((Screen.width / 2) + Screen.width / 10, Screen.height / 2);

        confirmMenuStrings[0] = "you shouldn't see this";
        confirmMenuStrings[1] = "Back";
        confirmMenu = new JoyGUIMenu(1, confirmMenuRects, confirmMenuStrings, ConfirmMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

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
        pauseMenu = new JoyGUIMenu(4, pauseMenuRects, pauseMenuStrings, PauseMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

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
        mainMenu.enabled = false;
        confirmMenu.enabled = false;
        pauseMenu.enabled = false;
        optionsMenu.enabled = false;
        inputMenu.enabled = false;

        if (Input.GetButtonDown("Pause") && Time.time - pausedCooldown > pausedLastHit && paused == false && currentStarmapMenuState != StarmapMenuState.confirmMenu)
        {
            paused = true;
            currentStarmapMenuState = StarmapMenuState.pauseMenu;
            pausedLastHit = Time.time;
        }
        else if (Input.GetButtonDown("Pause") && Time.time - pausedCooldown > pausedLastHit && paused == true && currentStarmapMenuState != StarmapMenuState.confirmMenu)
        {
            paused = false;
            currentStarmapMenuState = StarmapMenuState.mainMenu;
            pausedLastHit = Time.time;
            mainMenu.UnClickAll();
            confirmMenu.UnClickAll();
            pauseMenu.UnClickAll();
            optionsMenu.UnClickAll();
            inputMenu.UnClickAll();
        }
        switch (currentStarmapMenuState)
        {
            case StarmapMenuState.mainMenu:
                mainMenu.enabled = true;
                mainMenu.CheckInput();
                break;

            case StarmapMenuState.confirmMenu:
                confirmMenu.enabled = true;
                confirmMenu.CheckInput();
                confirmMenu.buttons[0].text = destinationName;
                mainMenu.UnClickAll();
                pauseMenu.UnClickAll();
                optionsMenu.UnClickAll();
                inputMenu.UnClickAll();
                if (InputCoordinator.usingController)
                    if (Input.GetButtonDown("joystick button 1")) 
                        currentStarmapMenuState = StarmapMenuState.mainMenu;
                if (InputCoordinator.usingMouseAndKeyboard)
                    if (Input.GetButtonDown("Pause"))
                        currentStarmapMenuState = StarmapMenuState.mainMenu;
                break;

            case StarmapMenuState.pauseMenu:
                pauseMenu.enabled = true;
                pauseMenu.CheckInput();
                break;

            case StarmapMenuState.optionsMenu:
                optionsMenu.enabled = true;
                optionsMenu.CheckInput();
                if (InputCoordinator.usingController)
                    if (Input.GetButtonDown("joystick button 1"))
                        currentStarmapMenuState = StarmapMenuState.pauseMenu;
                break;

            case StarmapMenuState.inputMenu:
                inputMenu.enabled = true;
                inputMenu.CheckInput();
                if (InputCoordinator.usingController)
                    if (Input.GetButtonDown("joystick button 1"))
                        currentStarmapMenuState = StarmapMenuState.optionsMenu;
                break;
        }
    }

    void OnGUI () 
    {
        switch (currentStarmapMenuState)
        {
            case StarmapMenuState.mainMenu:
                mainMenu.Display();
                break;

            case StarmapMenuState.confirmMenu:
                mainMenu.Display();
                GUI.Box(confirmMenuRect, "Confirm");
                confirmMenu.Display();
                break;

            case StarmapMenuState.pauseMenu:
                mainMenu.Display();
                GUI.Box(pauseMenuRect, "Pause");
                pauseMenu.Display();
                break;

            case StarmapMenuState.optionsMenu:
                GUI.Box(pauseMenuRect, "Pause");
                optionsMenu.Display();
                break;

            case StarmapMenuState.inputMenu:
                GUI.Box(pauseMenuRect, "Pause");
                inputMenu.Display();
                break;
        }
	    ButtonLabels();
    }

    void MainMenuLogic (int hit)
    {
        switch (hit)
        {
            case 0:
                currentStarmapMenuState = StarmapMenuState.confirmMenu;
                destinationName = "Oomdassa";
                destinationID = oomdassaID;
                break;

            case 1:
                currentStarmapMenuState = StarmapMenuState.confirmMenu;
                destinationName = "Support Bay";
                destinationID = upgroidsID;
                break;

            case 2:

                break;

            case 3:

                break;

            case 4:

                break;

            case 5:

                break;

            case 6:

                break;

            case 7:

                break;

        }

    }

    void ConfirmMenuLogic(int hit)
    {
        switch (hit)
        {
            case 0:
                Application.LoadLevel(destinationID);
                break;

            case 1:
                currentStarmapMenuState = StarmapMenuState.mainMenu;
                break;
        }
    }

    void PauseMenuLogic (int hit)
    {
        switch (hit)
        {
            case 0:
                currentStarmapMenuState = StarmapMenuState.mainMenu;
                break;

            case 1:
                currentStarmapMenuState = StarmapMenuState.optionsMenu;
                break;

            case 2:
                destinationID = mainMenuID;
                destinationName = "Main Menu";
                currentStarmapMenuState = StarmapMenuState.confirmMenu;
                break;

            case 3:
                Application.Quit();
                break;
        }

    }

    void OptionsMenuLogic (int hit)
    {
        pauseMenu.UnClickAll();
        inputMenu.UnClickAll();
        switch (hit)
        {
            case 0:
                currentStarmapMenuState = StarmapMenuState.inputMenu;
                break;
            case 1:
                currentStarmapMenuState = StarmapMenuState.soundMenu;
                break;
            case 2:
                currentStarmapMenuState = StarmapMenuState.graphicsMenu;
                break;
        }
    }

    void InputMenuLogic (int hit)
    {
        optionsMenu.UnClickAll();
        switch (hit)
        {
            case 0:
                GetComponent<InputCoordinator>().SwitchToMouseAndKeyboard();
                break;
            case 1:
                GetComponent<InputCoordinator>().SwitchToController();
                break;
        }
    }

    void ButtonLabels (){
	    GUI.Label(new Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	    GUI.Label(new Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
    }
}

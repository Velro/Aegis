using UnityEngine;
using System.Collections;

public class MainMenuGUI : MonoBehaviour 
{
    public GUISkin mySkin;

    public int starMapLevelID = 1;
    public Texture2D background;
    public enum MainMenuState 
    {
        mainMenu,
        optionsMenu,
        inputMenu,
        soundMenu,
        graphicsMenu
    }
    public MainMenuState currentMenuState = MainMenuState.mainMenu;

    JoyGUIMenu mainMenu;
    string[] mainMenuStrings = new string[3];
    Rect[] mainMenuRects = new Rect[3];

    JoyGUIMenu optionsMenu;
    string[] optionsMenuStrings = new string[3];
    Rect[] optionsMenuRects = new Rect[3];

    JoyGUIMenu inputMenu;
    string[] inputMenuStrings = new string[2];
    Rect[] inputMenuRects = new Rect[2];

    void Start ()
    {
        Time.timeScale = 1;

        mainMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainMenuRects[2] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        mainMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);
        mainMenuRects[2].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 16);

        mainMenuStrings[0] = "Campaign";
        mainMenuStrings[1] = "Options";
        mainMenuStrings[2] = "Exit Aegis";
        mainMenu = new JoyGUIMenu(3, mainMenuRects, mainMenuStrings, MainMenuLogic, "joystick button 0", "Y axis", "X axis", mySkin);

        optionsMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[2] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        optionsMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        optionsMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);
        optionsMenuRects[2].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 16);

        optionsMenuStrings[0] = "Input";
        optionsMenuStrings[1] = "Sound";
        optionsMenuStrings[2] = "Graphics";
        optionsMenu = new JoyGUIMenu(3, optionsMenuRects, optionsMenuStrings, Options, "joystick button 0", "Y axis", "X axis", mySkin);

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
        switch (currentMenuState)
        {
            case MainMenuState.mainMenu:
                mainMenu.enabled = true;
                optionsMenu.enabled = false;
                inputMenu.enabled = false;
                mainMenu.CheckInput();
                break;

            case MainMenuState.optionsMenu:
                mainMenu.enabled = false;
                optionsMenu.enabled = true;
                inputMenu.enabled = false;
                optionsMenu.CheckInput();
                if (InputCoordinator.usingController)
                    if (Input.GetButtonDown("joystick button 1"))
                        currentMenuState = MainMenuState.mainMenu;
                break;

            case MainMenuState.inputMenu:
                mainMenu.enabled = false;
                optionsMenu.enabled = false;
                inputMenu.enabled = true;
                inputMenu.CheckInput();
                if (InputCoordinator.usingController)
                    if (Input.GetButtonDown("joystick button 1"))
                        currentMenuState = MainMenuState.optionsMenu;
                break;

            case MainMenuState.soundMenu:

                break;

            case MainMenuState.graphicsMenu:

                break;
        }
    }
    void OnGUI () 
    {
        GUI.DrawTexture(new Rect(0, 0, Screen.width, Screen.height), background, ScaleMode.StretchToFill);
        GUI.Box(new Rect(Screen.width / 2 - 100, Screen.height / 2 - 100, 200, 200), ""); //just to see the menu
        switch (currentMenuState)
        {
            case MainMenuState.mainMenu:
                mainMenu.Display();
                break;

            case MainMenuState.optionsMenu:
                optionsMenu.Display();
                break;

            case MainMenuState.inputMenu:
                inputMenu.Display();
                break;

            case MainMenuState.soundMenu:

                break;

            case MainMenuState.graphicsMenu:

                break;
        }
    }

    void MainMenuLogic (int hit)
    {
        optionsMenu.UnClickAll();
        switch (hit)
        {
            case 0:
                Application.LoadLevel("Starmap");
                break;

            case 1:
                currentMenuState = MainMenuState.optionsMenu;
                break;

            case 2:
                Application.Quit();
                break;
        }
    }

    void Options(int hit)
    {
        mainMenu.UnClickAll();
        inputMenu.UnClickAll();
        switch (hit)
        {
            case 0:
                currentMenuState = MainMenuState.inputMenu;
                break;
            case 1:
                currentMenuState = MainMenuState.soundMenu;
                break;
            case 2:
                currentMenuState = MainMenuState.graphicsMenu;
                break;
        }
    }

    void InputMenuLogic(int hit)
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
}

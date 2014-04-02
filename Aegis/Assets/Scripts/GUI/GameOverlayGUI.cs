using UnityEngine;
using System.Collections;

public class GameOverlayGUI : MonoBehaviour 
{
    public GameObject player;
    public GameObject boss;
    PlayerStats playerStats;

    public GUIStyle healthbar;
    public GUIStyle border;
    public GUIStyle heat;
    public GUIStyle credits;
    public GUIStyle weaponsBackground;
    public GUIStyle weapon1;
    public GUIStyle weapon2;
    public GUIStyle weapon3;
    public GUIStyle weapon4;
    public GUIStyle cooldown;
    public GUIStyle levelUp;

    public GUIStyle upButton;
    public GUIStyle hoverButton;
    public GUIStyle downButton;

    public GameObject[] enemiesForHealthbars;

    public bool paused = false;
    public Texture2D alphagrey;
    float ltPausedHit = 0;
    float ltSwitch = 0;
    public float pausedCooldown = 0.25f;
    public float levelUpDisplayTime = 1;

    string levelledName;
    int levelledLevel;
    float levelledTime = -10f;

    enum PausedMenuState
    {
        mainMenu,
        optionsMenu,
        inputMenu,
        soundMenu, 
        graphicsMenu
    }
    PausedMenuState currentPausedMenuState = PausedMenuState.mainMenu;

    public JoyGUIMenu mainPauseMenu;
    Rect[] mainPauseMenuRects = new Rect[3];
    string[] mainPauseMenuStrings = new string[3];

    public JoyGUIMenu optionsMenu;
    Rect[] optionsMenuRects = new Rect[3];
    string[] optionsMenuStrings = new string[3];

    public JoyGUIMenu inputMenu;
    Rect[] inputMenuRects = new Rect[2];
    string[] inputMenuStrings = new string[2];

    public float delayBetweenButtons = 0.25f;

    void Awake()
    {
        playerStats = player.GetComponent<PlayerStats>();

    }
	// Use this for initialization
	void Start () {
        
        mainPauseMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainPauseMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainPauseMenuRects[2] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        mainPauseMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        mainPauseMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);
        mainPauseMenuRects[2].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 16);
        
		mainPauseMenuStrings[0] = "Options";
		mainPauseMenuStrings[1] = "Return to Star Map";
		mainPauseMenuStrings[2] = "Exit Aegis";
	    mainPauseMenu = new JoyGUIMenu(3, mainPauseMenuRects, mainPauseMenuStrings, Pause, "joystick button 0", "Y axis", "X axis");
	    mainPauseMenu.enabled = false;

        foreach (JoyGUIButton b in mainPauseMenu.buttons)
        {
            b.up = upButton;
            b.hover = hoverButton;
            b.down = downButton;
        }
	    
		optionsMenuRects[0] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[1] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[2] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[0].center = new Vector2(Screen.width/2, (Screen.height/30) * 8);
		optionsMenuRects[1].center = new Vector2(Screen.width/2, (Screen.height/30) * 12);
		optionsMenuRects[2].center = new Vector2(Screen.width/2, (Screen.height/30) * 16);
	    
		optionsMenuStrings[0] = "Input";
		optionsMenuStrings[1] = "Sound";
		optionsMenuStrings[2] = "Graphics";
	    optionsMenu = new JoyGUIMenu(3, optionsMenuRects, optionsMenuStrings, Options, "joystick button 0", "Y axis", "X axis");
	    optionsMenu.enabled = false;

        foreach (JoyGUIButton b in optionsMenu.buttons)
        {
            b.up = upButton;
            b.hover = hoverButton;
            b.down = downButton;
        }

        inputMenuRects[0] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        inputMenuRects[1] = new Rect(0, 0, Screen.width / 5, Screen.height / 10);
        inputMenuRects[0].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 8);
        inputMenuRects[1].center = new Vector2(Screen.width / 2, (Screen.height / 30) * 12);

        inputMenuStrings[0] = "Use Keyboard";
        inputMenuStrings[1] = "Use Controller";
        inputMenu = new JoyGUIMenu(2, inputMenuRects, inputMenuStrings, InputMenuLogic, "joystick button 0", "Y axis", "X axis");
        inputMenu.enabled = false;

        foreach (JoyGUIButton b in inputMenu.buttons)
        {
            b.up = upButton;
            b.hover = hoverButton;
            b.down = downButton;
        }
    }
	
	// Update is called once per frame
	void Update () {
        if ((Input.GetButtonDown("Pause") || Input.GetButtonDown("joystick button 7")) && paused == false && Time.realtimeSinceStartup - ltPausedHit > pausedCooldown)
        {	//pause game
            Time.timeScale = 0;
            ltPausedHit = Time.realtimeSinceStartup;
            paused = true;
            Debug.Log("pause");
            mainPauseMenu.enabled = true;
            currentPausedMenuState = PausedMenuState.mainMenu;
        }
        if (Input.GetButtonDown("Pause") && paused == true && Time.realtimeSinceStartup - ltPausedHit > pausedCooldown)
        {	//and unpause
            Time.timeScale = 1;
            ltPausedHit = Time.realtimeSinceStartup;
            paused = false;
            Debug.Log("unpause");
            mainPauseMenu.enabled = false;
            currentPausedMenuState = PausedMenuState.mainMenu;
            mainPauseMenu.UnClickAll();
            optionsMenu.UnClickAll();
            inputMenu.UnClickAll();
        }
        if (paused)
        {
            switch (currentPausedMenuState)
            {
                case PausedMenuState.mainMenu:
                    mainPauseMenu.enabled = true;
                    optionsMenu.enabled = false;
                    inputMenu.enabled = false;
                    mainPauseMenu.CheckInput();
                    if (InputCoordinator.usingController)
                    {
                        if (Input.GetButtonDown("joystick button 1"))
                        {
                            mainPauseMenu.UnClickAll();
                        }
                    }
                    if (InputCoordinator.usingMouseAndKeyboard)
                    {

                    }
                    break;

                case PausedMenuState.optionsMenu:
                    mainPauseMenu.enabled = false;
                    optionsMenu.enabled = true;
                    inputMenu.enabled = false;
                    optionsMenu.CheckInput();
                    if (InputCoordinator.usingController)
                        if (Input.GetButtonDown("joystick button 1"))
                        {
                            currentPausedMenuState = PausedMenuState.mainMenu;
                            optionsMenu.UnClickAll();
                        }
                    if (InputCoordinator.usingMouseAndKeyboard)
                    {

                    }
                    break;

                case PausedMenuState.inputMenu:
                    mainPauseMenu.enabled = false;
                    optionsMenu.enabled = false;
                    inputMenu.enabled = true;
                    inputMenu.CheckInput();
                    if (InputCoordinator.usingController)
                    {
                        if (Input.GetButtonDown("joystick button 1"))
                        {
                            currentPausedMenuState = PausedMenuState.optionsMenu;
                            inputMenu.UnClickAll();
                        }
                    }
                    if (InputCoordinator.usingMouseAndKeyboard)
                    {

                    }
                    break;
            }
        }
	}
    void OnGUI ()
    {
	    /**** Health bar ****/
	    if (player != null){
		    //Rects work at Rect(screenPosition X, screenPosition Y, width, height) all in pixels
		    GUI.Label (new Rect(Screen.width/30, Screen.height/30, (Screen.width/10)* PercentHealth(player), Screen.height/20),"", healthbar);
		    GUI.Label (new Rect((Screen.width/30)-1, (Screen.height/30)-1, (Screen.width/10)+2, (Screen.height/20)+2),
			    ""+Mathf.RoundToInt(player.GetComponent<PlayerStats>().Health)+" / "+player.GetComponent<PlayerStats>().maxHealth, border);
	    //		
	    /**** Heat bar ****/
		    GUI.Label (new Rect((Screen.width/30)*4.5f, Screen.height/30, (Screen.width/10) * PercentHeat(), Screen.height/20),"", heat);
		    GUI.Label (new Rect(((Screen.width/30)*4.5f)-1, (Screen.height/30) - 1, (Screen.width/10)+2, (Screen.height/20)+2),
			    ""+Mathf.RoundToInt(playerStats.heat)+" / "+playerStats.maxHeat, border);
			
	    /**** Overheat ****/
		    if (playerStats.overheat){
			    GUI.Label (new Rect(Screen.width/2, Screen.height/2, 100, 100), 
				    "OVERHEAT");
		    }		
	    /**** Credits ****/
		    GUI.Label (new Rect(0, 20, Screen.width, 20), "Credits "+playerStats.creditsThisLevel, credits);
		
	    /**** Weapons ****/
		    GUI.BeginGroup (new Rect(Screen.width - (Screen.width/3.5f), Screen.height/30, Screen.width/3.5f - Screen.width/30, Screen.height/6));
			    //GUI.Box(Rect(0,0,Screen.width,Screen.height),"", weaponsBackground);
			    //weapon 0ne 
			    GUI.Label(new Rect(Screen.width/60,Screen.height/60,
                    (Screen.width / 10) * percentCooldown(player.GetComponent<BlunderBuster>().blunderBuster.currentLevel.cooldown, player.GetComponent<BlunderBuster>().blunderBuster.currentLevel.ltShot), Screen.height / 20), 
                    "", cooldown);
			    GUI.Label(new Rect(Screen.width/60-1,Screen.height/60-1,Screen.width/10+2,Screen.height/20+2), "Blunder Buster", border);
			    //weapon two
			    GUI.Label(new Rect((Screen.width/60)*8,Screen.height/60,
                    (Screen.width / 10) * percentCooldown(player.GetComponent<FusionBeam>().fusionBeam.currentLevel.cooldown, player.GetComponent<FusionBeam>().fusionBeam.currentLevel.ltShot),Screen.height/20),
                    "", cooldown);
			    GUI.Label(new Rect((Screen.width/60)*8-1,Screen.height/60-1,Screen.width/10+2,Screen.height/20+2), "Fusion Beam", border);
			    //weapon three
                GUI.Label(new Rect((Screen.width / 60), (Screen.height / 60) * 5,
                    (Screen.width / 10) * percentCooldown(player.GetComponent<ArcNade>().arcNade.currentLevel.cooldown, player.GetComponent<ArcNade>().arcNade.currentLevel.ltShot), Screen.height / 20), 
                    "", cooldown);
                GUI.Label(new Rect(Screen.width / 60 - 1, (Screen.height / 60) * 5 - 1, Screen.width / 10 + 2, Screen.height / 20 + 2), "Arc Nade", border);
			    //weapon four
			    //GUI.Label(Rect(11,11,118,63), "", cooldown);
              //  GUI.Label(new Rect((Screen.width / 60) * 8, (Screen.height / 60) * 5,
               //     (Screen.width / 10) * percentCooldown(player.GetComponent<WeaponName>().cooldown, player.GetComponent<WeaponName>.ltShot), Screen.height / 20),
              //      "", cooldown);
              //  GUI.Label(new Rect((Screen.width / 60) * 8 - 1, (Screen.height / 60) * 5 - 1, Screen.width / 10 + 2, Screen.height / 20 + 2), "Weapon 4", border);
		    GUI.EndGroup ();
		
	    } else {
	    /**** Dying ****/
		    if (GUI.Button (new Rect((Screen.width/2)-35, (Screen.height/2)-15, 70, 30), 
				    "Replay?")){
			    Application.LoadLevel("MainMenu");
		    }
            Time.timeScale = 0;
            GUI.DrawTexture(new Rect(0, 0, Screen.width + 10, Screen.height + 10), alphagrey, ScaleMode.StretchToFill, true, 1.0f);
	    }
	    /**** Kill boss ****/
	    if (boss == null){
		    GUI.Label (new Rect(Screen.width/2, Screen.height/2, Screen.width/2-100, Screen.height/2+120), 
			    "End Test Level");
	    }
        /**** Enemy health bars ***
        foreach (GameObject enemy in enemiesForHealthbars)
        {
            if (enemy == null)
                return;
            GUI.Label (new Rect(camera.WorldToScreenPoint(enemy.transform.position).x-14,
                camera.WorldToScreenPoint(enemy.transform.position).y+140//coefficient needed to lift bar above unit
                ,40*PercentHealth(enemy),4),"",healthbar);
        }*/

        /**** Level Up ****/
		    if (Time.time < levelledTime + levelUpDisplayTime){
			    GUI.Label(new Rect(0, 0, Screen.width, Screen.height - Screen.height/4), levelledName+" is level "+levelledLevel, levelUp);
	    }
			
	    /**** Pause Menu ****/
	    if (paused)
        {	//pause game
		    GUI.DrawTexture(new Rect(0,0,Screen.width + 10,Screen.height + 10),alphagrey,ScaleMode.StretchToFill, true, 1.0f); //dim the screen with negro-engineered filter since filters are only for Pro
		    Rect pausedRect = new Rect(0, 0, Screen.width/3, (Screen.height/4)*3);
		    pausedRect.center = new Vector2(Screen.width/2,Screen.height/2);
		    GUI.Box (pausedRect,"Paused");
		    switch (currentPausedMenuState)
            {
			    case PausedMenuState.mainMenu:
				    mainPauseMenu.Display();
				    break;
			    case PausedMenuState.optionsMenu:
				    optionsMenu.Display();
				    break;
                case PausedMenuState.inputMenu:
                    inputMenu.Display();
                    break;
		    }
	    }
    }

    public void SetLevelledLevel (int i)
    {
        levelledLevel = i;
    }

    public void SetLevelledTime(float time)
    {
        levelledTime = time;
    }

    public void SetLevelledName(string name)
    {
        levelledName = name;
    }

    float PercentHealth (GameObject gameObject)
    {
	   float percent = 0;
       if (player == null)
           return 0;
		float thisMaxHealth = gameObject.GetComponent<PlayerStats>().maxHealth;
        percent = gameObject.GetComponent<PlayerStats>().Health / thisMaxHealth;
	    return Mathf.Clamp01(percent);
    }

    float PercentHeat()
    {
	    float percent = playerStats.heat/playerStats.maxHeat;
	    return percent;
    }

    float percentCooldown (float cooldown, float lastTimeShot)
    {
	    float percent = (Time.time - lastTimeShot) / cooldown; 
	    //if (percent > 0.99)percent = 1;
	    return Mathf.Clamp01(percent);
    }

    void Pause (int hit)
    {
        switch (hit)
        {
            case 0:
                currentPausedMenuState = PausedMenuState.optionsMenu;
                mainPauseMenu.UnClickAll();
                break;

            case 1:
                Application.LoadLevel("MainMenu");
                paused = false;
                Time.timeScale = 1;
                mainPauseMenu.UnClickAll();
                break;

            case 2:
                Application.Quit();
                paused = false;
                Time.timeScale = 1;                
                mainPauseMenu.UnClickAll();
                break;
        }
    }

    void Options(int hit)
    {
        switch (hit)
        {
            case 0:
                currentPausedMenuState = PausedMenuState.inputMenu;
                optionsMenu.UnClickAll();
                break;
            case 1:
                currentPausedMenuState = PausedMenuState.soundMenu;
                optionsMenu.UnClickAll();
                break;
            case 2:
                currentPausedMenuState = PausedMenuState.graphicsMenu;
                optionsMenu.UnClickAll();
                break;
        }
    }

    void InputMenuLogic(int hit)
    {
        if (hit != -1)
            print(hit);
        switch (hit)
        {
            case 0:
                player.GetComponent<InputCoordinator>().SwitchToMouseAndKeyboard();
                print("switchA");
                inputMenu.UnClickAll();
                break;
            case 1:
                player.GetComponent<InputCoordinator>().SwitchToController();
                print("switchC");
                inputMenu.UnClickAll();
                break;
        }
    }
}

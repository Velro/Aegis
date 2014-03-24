#pragma strict
@script AddComponentMenu("GUI/GameOverlayGUI")
/*
*  This class has the potential to become monolithic. May be broken down into some 
*  sub-scripts that aren't components. GUI code is weird. Check out the UnityGUI learning resources if you're confused, they're nice.
*/

var player : GameObject;
var boss : GameObject;

//custom styles
var healthbar : GUIStyle;
var border : GUIStyle;
var heat : GUIStyle;
var credits : GUIStyle;
var weaponsBackground : GUIStyle;
var weapon1 : GUIStyle;
var weapon2 : GUIStyle;
var weapon3 : GUIStyle;
var weapon4 : GUIStyle;
var cooldown : GUIStyle;
var levelUp : GUIStyle;

var enemiesForHealthbars : GameObject[];

var paused : boolean = false; //are we paused?!
var alphagrey : Texture2D;
private var timePausedHit : float = 0;
var timeLastSwitch : float = 0;
private var pausedCooldown : float = 1; //without this the Input manager will register pause/unpause several times in a frame
private var playerStats : PlayerStats;
var levelUpDisplayTime : float;

@System.NonSerializedAttribute
	var boolLevel : boolean = false;
@System.NonSerializedAttribute
	var levelledName : String;
@System.NonSerializedAttribute
	var levelledLevel : int;
@System.NonSerializedAttribute
	var levelledTime : float;

enum pausedMenuState {
	mainMenu,
	optionsMenu,
	inputMenu,
	soundMenu,
	graphicsMenu
}
var currentPausedMenuState : pausedMenuState = pausedMenuState.mainMenu;

private var creditsRect : Rect = new Rect(0,0,Screen.width, Screen.height/60);
creditsRect.center = new Vector2(Screen.width/2, (Screen.height/60)*2);

var mainPauseMenu : JoyGUIMenu;
var optionsMenu : JoyGUIMenu;
var delayBetweenButtons : float = 0.25;

function Awake (){
	playerStats = player.GetComponent(PlayerStats);
	
}
function Start (){
	var mainPauseMenuRects : Rect[] = new Rect[3];
		mainPauseMenuRects[0] = new Rect(0,0,Screen.width/5, Screen.height/10);
		mainPauseMenuRects[1] = new Rect(0,0,Screen.width/5, Screen.height/10);
		mainPauseMenuRects[2] = new Rect(0,0,Screen.width/5, Screen.height/10);
		mainPauseMenuRects[0].center = new Vector2(Screen.width/2, (Screen.height/30) * 8);
		mainPauseMenuRects[1].center = new Vector2(Screen.width/2, (Screen.height/30) * 12);
		mainPauseMenuRects[2].center = new Vector2(Screen.width/2, (Screen.height/30) * 16);
	var mainPauseMenuStrings : String[] = new String [3];
		mainPauseMenuStrings[0] = "Options";
		mainPauseMenuStrings[1] = "Return to Star Map";
		mainPauseMenuStrings[2] = "Exit Aegis";
	mainPauseMenu = new JoyGUIMenu(3, mainPauseMenuRects, mainPauseMenuStrings, InputCoordinator.confirm, InputCoordinator.leftStickVert.axis, InputCoordinator.leftStickHor.axis);
	mainPauseMenu.enabled = false;
	
	var optionsMenuRects : Rect[] = new Rect[3];
		optionsMenuRects[0] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[1] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[2] = new Rect(0,0,Screen.width/5, Screen.height/10);
		optionsMenuRects[0].center = new Vector2(Screen.width/2, (Screen.height/30) * 8);
		optionsMenuRects[1].center = new Vector2(Screen.width/2, (Screen.height/30) * 12);
		optionsMenuRects[2].center = new Vector2(Screen.width/2, (Screen.height/30) * 16);
	var optionsMenuStrings : String[] = new String [3];
		optionsMenuStrings[0] = "Input";
		optionsMenuStrings[1] = "Sound";
		optionsMenuStrings[2] = "Graphics";
	optionsMenu = new JoyGUIMenu(3, optionsMenuRects, optionsMenuStrings, InputCoordinator.confirm, InputCoordinator.leftStickVert.axis, InputCoordinator.leftStickHor.axis);
	optionsMenu.enabled = false;
}

function Update (){
	if (Input.GetButtonDown("Pause") && paused == false && Time.realtimeSinceStartup - timePausedHit > pausedCooldown){	//pause game
		Time.timeScale = 0;
		timePausedHit = Time.realtimeSinceStartup;
		paused = true;
		Debug.Log("pause");
		mainPauseMenu.enabled = true;
		currentPausedMenuState = pausedMenuState.mainMenu;
	}
	if (Input.GetButtonDown("Pause") && paused == true && Time.realtimeSinceStartup - timePausedHit > pausedCooldown){	//and unpause
		Time.timeScale = 1;
		timePausedHit = Time.realtimeSinceStartup;
		paused = false;
		Debug.Log("unpause");
		mainPauseMenu.enabled = false;
		currentPausedMenuState = pausedMenuState.mainMenu;
		mainPauseMenu.UnClickAll();
		optionsMenu.UnClickAll();
	}
	if (paused){
		switch (currentPausedMenuState){
		case pausedMenuState.mainMenu:
			mainPauseMenu.enabled = true;
			optionsMenu.enabled = false;
			if (InputCoordinator.usingController){
				if (timeLastSwitch + delayBetweenButtons < Time.realtimeSinceStartup){
					if (mainPauseMenu.CheckJoyAxis()){
						Delay();
						timeLastSwitch = Time.realtimeSinceStartup;
					}
				}
				Pause(mainPauseMenu.CheckJoyButton());
				if (Input.GetButtonDown(InputCoordinator.back)){
					//currentState = Menu.SupportBay;
					mainPauseMenu.UnClickAll();
				}
			}
			if (InputCoordinator.usingMouseAndKeyboard){
				mainPauseMenu.CheckMousePosition();
				Pause(mainPauseMenu.CheckMouseClick());
			}
			break;
		case pausedMenuState.optionsMenu:
			mainPauseMenu.enabled = false;
			optionsMenu.enabled = true;
			if (InputCoordinator.usingController){
				if (timeLastSwitch + delayBetweenButtons < Time.realtimeSinceStartup){
					if (optionsMenu.CheckJoyAxis()){
						Delay();
						timeLastSwitch = Time.realtimeSinceStartup;
					}
				}
				Pause(mainPauseMenu.CheckJoyButton());
				if (Input.GetButtonDown(InputCoordinator.back)){
					currentPausedMenuState = pausedMenuState.mainMenu;
					optionsMenu.UnClickAll();
				}
			}
			if (InputCoordinator.usingMouseAndKeyboard){
				optionsMenu.CheckMousePosition();
				Pause(optionsMenu.CheckMouseClick());
			}
			break;	
		}	
	}
}
function OnGUI () {
	/**** Health bar ****/
	if (player != null){
		//Rects work at Rect(screenPosition X, screenPosition Y, width, height) all in pixels
		GUI.Label (Rect(Screen.width/30, Screen.height/30, (Screen.width/10)* PercentHealth(player), Screen.height/20),"", healthbar);
		GUI.Label (Rect((Screen.width/30)-1, (Screen.height/30)-1, (Screen.width/10)+2, (Screen.height/20)+2),
			""+Mathf.RoundToInt(player.GetComponent(Stats).health)+" / "+player.GetComponent(Stats).maxHealth, border);
	//		
	/**** Heat bar ****/
		GUI.Label (Rect((Screen.width/30)*4.5, Screen.height/30, (Screen.width/10) * PercentHeat(), Screen.height/20),"", heat);
		GUI.Label (Rect(((Screen.width/30)*4.5)-1, (Screen.height/30) - 1, (Screen.width/10)+2, (Screen.height/20)+2),
			""+Mathf.RoundToInt(playerStats.heat)+" / "+playerStats.maxHeat, border);
			
	/**** Overheat ****/
		if (playerStats.overheat){
			GUI.Label (Rect(Screen.width/2, Screen.height/2, 100, 100), 
				"OVERHEAT");
		}		
	/**** Credits ****/
		GUI.Label (creditsRect, "Credits "+playerStats.creditsThisLevel, credits);
		
	/**** Weapons ****/
		GUI.BeginGroup (Rect(Screen.width - (Screen.width/3.5), Screen.height/30, Screen.width/3.5 - Screen.width/30, Screen.height/6));
			//GUI.Box(Rect(0,0,Screen.width,Screen.height),"", weaponsBackground);
			//weapon 0ne 
			GUI.Label(Rect(Screen.width/60,Screen.height/60,(Screen.width/10)*percentCooldown(0),Screen.height/20), "", cooldown);
			GUI.Label(Rect(Screen.width/60-1,Screen.height/60-1,Screen.width/10+2,Screen.height/20+2), playerStats.weapons[0].name, border);
			//weapon two
			GUI.Label(Rect((Screen.width/60)*8,Screen.height/60,(Screen.width/10)*percentCooldown(1),Screen.height/20), "", cooldown);
			GUI.Label(Rect((Screen.width/60)*8-1,Screen.height/60-1,Screen.width/10+2,Screen.height/20+2), playerStats.weapons[1].name, border);
			//weapon three
			GUI.Label(Rect((Screen.width/60),(Screen.height/60)*5,(Screen.width/10)*percentCooldown(2),Screen.height/20), "", cooldown);
			GUI.Label(Rect(Screen.width/60-1,(Screen.height/60)*5-1,Screen.width/10+2,Screen.height/20+2), playerStats.weapons[2].name, border);
			//weapon four
			//GUI.Label(Rect(11,11,118,63), "", cooldown);
			GUI.Label(Rect((Screen.width/60)*8,(Screen.height/60)*5,(Screen.width/10)*percentCooldown(3),Screen.height/20), "", cooldown);
			GUI.Label(Rect((Screen.width/60)*8-1,(Screen.height/60)*5-1,Screen.width/10+2,Screen.height/20+2), playerStats.weapons[3].name, border);
		GUI.EndGroup ();
		
	} else {
	/**** Dying ****/
		if (GUI.Button (Rect((Screen.width/2)-35, (Screen.height/2)-15, 70, 30), 
				"Replay?")){
			Application.LoadLevel("MainMenu");
		}
	}
	/**** Kill boss ****/
	if (boss == null){
		GUI.Label (Rect(Screen.width/2, Screen.height/2, Screen.width/2-100, Screen.height/2+120), 
			"End Test Level");
	}
	/**** Enemy health bars ****/
	for (var enemy : GameObject in enemiesForHealthbars){
		if (enemy != null){
			GUI.Label (Rect(camera.WorldToScreenPoint(enemy.transform.position).x-14,
				camera.WorldToScreenPoint(enemy.transform.position).y+140//coefficient needed to lift bar above unit
				,40*PercentHealth(enemy),4),"",healthbar);
		}
	}
	/**** Level Up ****/
	if (boolLevel == true){
		if (Time.time < levelledTime + levelUpDisplayTime){
			GUI.Label(Rect(Screen.width/2, Screen.height/2, 200, 100), levelledName+" is level "+levelledLevel, levelUp);
		}
	}
			
	/**** Pause Menu ****/
	if (paused){	//pause game
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),alphagrey,ScaleMode.StretchToFill, true, 1.0f); //dim the screen with negro-engineered filter since filters are only for Pro
		var pausedBox : Rect = new Rect(0, 0, Screen.width/3, (Screen.height/4)*3);
		pausedBox.center = new Vector2(Screen.width/2,Screen.height/2);
		GUI.Box (pausedBox,"Paused");
		switch (currentPausedMenuState){
			case pausedMenuState.mainMenu:
				mainPauseMenu.Display();
				break;
			case pausedMenuState.optionsMenu:
				optionsMenu.Display();
				break;
		}
	}
}

function PercentHealth (gameObject : GameObject){
	var percent : float = 0;
	if (player != null){
		var thisMaxHealth : float = player.GetComponent(Stats).maxHealth;
		percent =  player.GetComponent(Stats).health/thisMaxHealth;
	}
	return percent;
}

function PercentHeat(){
	var percent : float = playerStats.heat/playerStats.maxHeat;
	return percent;
}

function percentCooldown (weaponNumber : int){
	var cooldown : float = playerStats.weapons[weaponNumber].currentLevel.cooldown;
	var lastShot : float =playerStats.weapons[weaponNumber].currentLevel.lastShot;
	var percent : float = (Time.time - lastShot) / cooldown; 
	if (percent > 0.99)percent = 1;
	return percent;
}

function Pause (hit : int){
	switch (hit){
		case 0:
			currentPausedMenuState = pausedMenuState.optionsMenu;
			mainPauseMenu.UnClickAll();
			break;
		
		case 1:
			paused = false;
			Time.timeScale = 1;
			Application.LoadLevel("MainMenu");
			mainPauseMenu.UnClickAll();
			break;
			
		case 2:
			paused = false;
			Time.timeScale = 1;
			Application.Quit();
			mainPauseMenu.UnClickAll();
			break;
	}		
}
function Options (hit : int){
	switch (hit){
		case 0:
			currentPausedMenuState = pausedMenuState.inputMenu;
			break;
		case 1:
			currentPausedMenuState = pausedMenuState.soundMenu;
			break;
		case 2:
			currentPausedMenuState = pausedMenuState.graphicsMenu;
			break;
	}
		
}

function Delay (){
	mainPauseMenu.isCheckingJoy = false;
	optionsMenu.isCheckingJoy = false;
}	


#pragma strict
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

var enemiesForHealthbars : GameObject[];

//paused variables
var paused : boolean = false; //are we paused?!
var alphagrey : Texture2D;
private var timePausedHit : float = 0;
private var pausedCooldown : float = 1; //without this the Input manager will register pause/unpause several times in a frame
private var inputMenu : boolean = false; //are we in the input submenu?
private var playerStats : PlayerStats;
private var name0 : String;

function Awake (){
	playerStats = player.GetComponent(PlayerStats);
	
}
function Start (){
	

}
function Update (){
	if (Input.GetButtonDown("Pause") && paused == false && Time.realtimeSinceStartup - timePausedHit > pausedCooldown){	//pause game
		Time.timeScale = 0;
		timePausedHit = Time.realtimeSinceStartup;
		paused = true;
		Debug.Log("pause");
	}
	if (Input.GetButtonDown("Pause") && paused == true && Time.realtimeSinceStartup - timePausedHit > pausedCooldown){	//and unpause
		Time.timeScale = 1;
		timePausedHit = Time.realtimeSinceStartup;
		paused = false;
		Debug.Log("unpause");
	}
}
function OnGUI () {
	
	/**** Health bar ****/
	if (player != null){
		//Rects work at Rect(screenPosition X, screenPosition Y, width, height) all in pixels
		GUI.Label (Rect(30, 25, 110 * PercentHealth(player), 29),"", healthbar);
		GUI.Label (Rect(30-1, 24, 112, 30),
			""+Mathf.RoundToInt(player.GetComponent(Stats).health)+" / "+player.GetComponent(Stats).maxHealth, border);
	//		
	/**** Heat bar ****/
		GUI.Label (Rect(155, 25, 110 * PercentHeat(), 29),"", heat);
		GUI.Label (Rect(155-1, 24, 112, 30),
			""+Mathf.RoundToInt(playerStats.heat)+" / "+playerStats.maxHeat, border);
			
	/**** Overheat ****/
		if (playerStats.overheat){
			GUI.Label (Rect(Screen.width/2, Screen.height/2, 100, 100), 
				"OVERHEAT");
		}		
	/**** Credits ****/
		GUI.Label (Rect(Screen.width/2,25, 110, 30), "Credits "+playerStats.creditsThisLevel, credits);
		
	/**** Weapons ****/
		GUI.BeginGroup (Rect(Screen.width-300, 30, Screen.width-30, 120));
			GUI.Box(Rect(0,0,Screen.width,Screen.height),"", weaponsBackground);
			//weapon 0ne 
			GUI.Label(Rect(11,11,118*percentCooldown(0),43), "", cooldown);
			GUI.Label(Rect(10,10,120,45), playerStats.weapons[0].name, border);
			//weapon two
			//GUI.Label(Rect(11,11,118,63), "", cooldown);
			//GUI.Label(Rect(140,10,120,45), "Weapon 2", border);
			GUI.Label(Rect(141,11,118*percentCooldown(1),43), "", cooldown);
			GUI.Label(Rect(140,10,120,45), playerStats.weapons[1].name, border);
			//weapon three
			//GUI.Label(Rect(11,11,118,63), "", cooldown);
			GUI.Label(Rect(10,65,120,45), "Weapon 3", border);
			//weapon four
			//GUI.Label(Rect(11,11,118,63), "", cooldown);
			GUI.Label(Rect(140,65,120,45), "Weapon 4", border);
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
	
	
	
	/**** Pause Menu ****/
	if (paused){	//pause game
		
		GUI.DrawTexture(Rect(0,0,Screen.width,Screen.height),alphagrey,ScaleMode.StretchToFill, true, 1.0f); //dim the screen with negro-engineered filter since filters are only for Pro
		GUI.BeginGroup(Rect(Screen.width/2 - 50, Screen.height/2 - 50, 140, 140)); //GUI organization tool
		GUI.Box (Rect(0, 0, 140, 140),"Paused");
		//basic menu
		if (!inputMenu){
			if (GUI.Button (Rect(30,20,80,30),"Main Menu")){
				paused = false;
				Time.timeScale = 1;
				Application.LoadLevel("MainMenu");
				
			}
			if (GUI.Button (Rect(30,60,80,30),"Input")){
				inputMenu = true;
				//another box of buttons
			}
		}
		
		//input submenu
		if (inputMenu){
			if (GUI.Button (Rect(5,20,110,30),"Mouse/Keyboard")){
				playerStats.usingMouseAndKeyboard = true;
				playerStats.usingXboxController = false;
			}
			if (GUI.Button (Rect(15,60,110,30),"Xbox Controller")){
				playerStats.usingXboxController = true;
				playerStats.usingMouseAndKeyboard = false;
			}
			if (GUI.Button (Rect(15,100,110,30),"Back")){
				inputMenu = false;
			}
		}
		GUI.EndGroup ();
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
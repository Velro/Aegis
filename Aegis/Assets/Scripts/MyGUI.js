#pragma strict
/*
*  This class has the potential to become monolithic. May be broken down into some 
*  sub-scripts
*/

var player : GameObject;
var boss : GameObject;
var healthbar : GUIStyle;
var border : GUIStyle;
var heat : GUIStyle;
var enemiesForHealthbars : GameObject[];

private var maxHealth : float;
private var currentHealth : float;

private var maxHeat : float;
private var currentHeat : float;

private var paused : boolean = false;
private var timePausedHit : float = 0;
private var pausedCooldown : float = 1; //without this the Input manager will register pause/unpause several times in a frame

function Start (){
	maxHealth = player.GetComponent(Stats).maxHealth;
	maxHeat = player.GetComponent(Stats).maxHeat;
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
			""+Mathf.RoundToInt(player.GetComponent(Stats).health)+" / "+maxHealth, border);
			
	/**** Heat bar ****/
		GUI.Label (Rect(155, 25, 110 * PercentHeat(), 29),"", heat);
		GUI.Label (Rect(155-1, 24, 112, 30),
			""+Mathf.RoundToInt(player.GetComponent(Stats).heat)+" / "+maxHeat, border);
			
	/**** Overheat ****/
		if (player.GetComponent(Stats).overheat){
			GUI.Label (Rect(Screen.width/2, Screen.height/2, Screen.width/2+100, Screen.height/2+100), 
				"OVERHEAT");
				
		}
	} else {
	/**** Dying ****/
		if (GUI.Button (Rect((Screen.width/2)-35, (Screen.height/2)-15, 70, 30), 
				"Replay?")){
			Application.LoadLevel("TestLevel");
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
		//GUI.DrawTexture(Rect(0,0,Screen.width(),Screen.height()),alphagrey,true,10.0f); //dim the screen with negro-engineered filter since filters are only for Pro
		GUI.BeginGroup(Rect(Screen.width/2 - 50, Screen.height/2 - 50, 100, 100)); //GUI organization tool
		GUI.Box (Rect(0, 0, 100, 100),"Paused");
		if (!paused){
			if (GUI.Button (Rect(10,20,80,30),"Main Menu")){
				//Application.LoadLevel("Main Menu");
			}
			if (GUI.Button (Rect(10,60,80,30),"Input")){
				//another box of buttons
			}
		}
		GUI.EndGroup ();
	}
	if (!paused){	//and unpause

	}
}

function PercentHealth (gameObject : GameObject){
	var thisMaxHealth : float = gameObject.GetComponent(Stats).maxHealth;
	var percent : float =  gameObject.GetComponent(Stats).health/thisMaxHealth;
	return percent;
}

function PercentHeat(){
	var percent : float = player.GetComponent(Stats).heat/maxHeat;
	return percent;
}

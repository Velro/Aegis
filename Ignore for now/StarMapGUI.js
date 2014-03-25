#pragma strict
@script AddComponentMenu("GUI/StarmapGUI")

var paused : boolean = false;
private var pausedCooldown : float = 0.15;
private var pausedLastHit : float = 0;
private var confirmMenuRect : Rect = Rect(Screen.width/4, Screen.height/4, Screen.width/3, Screen.height/3);
private var pauseMenuRect : Rect = Rect(20, 20, Screen.width/4, Screen.height/2);
var confirmMenuOpened : boolean = false;
private var level : String = "TestLevel";
var pauseButton : String = "";

function Awake (){
	//pauseButton = InputManager.pauseButton;
}
function Start () {

}

function Update () {

}

function OnGUI () {
	
	if (GUI.Button(Rect(100,100,100, 75),"Oomdassa"))
		confirmMenuOpened = true;
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

function confirmMenu (windowID : int){
	if (GUI.Button(Rect(10,10,100,70), "Go to "+level+"?"))
		Application.LoadLevel(level);
	if (GUI.Button(Rect(120,10,100,70), "Cancel"))
		confirmMenuOpened = false;

}

function pauseMenu (windowID : int){
	var resumeRect : Rect = Rect(0,0,140,40);
	var supportRect : Rect = Rect(0,0,140,40);
	var optionsRect : Rect = Rect(0,0,140,40);
	var returnMainRect : Rect = Rect(0,0,140,40);
	var exitGameRect : Rect = Rect(0,0,140,40);
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
		level = "UpgradesMenu";
		confirmMenuOpened = true;
	}
	GUI.Button(optionsRect, "Options");
	if (GUI.Button(returnMainRect, "Return to Main Menu")){
		paused = false;
		level = "MainMenu";
		confirmMenuOpened = true;
	}
	GUI.Button(exitGameRect, "Exit Game");
}

function ButtonLabels (){
	GUI.Label(Rect(Screen.width - 200, Screen.height - 50, 80, 40), "A - Select", "Button"); 
	GUI.Label(Rect(Screen.width - 100, Screen.height - 50, 80, 40), "B - Back", "Button");
}
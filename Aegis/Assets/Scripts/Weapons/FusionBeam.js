#pragma strict
@script AddComponentMenu("Player Weapons/Fusion Beam")
var beam : GameObject;
private var heatCost : float = 0;	//for basic bullet
private var cooldown : float = 0;
private var damage : float = 0;
var blast : AudioClip;
var playerStats : PlayerStats;
//var size : Vector2;
var chargeTime : float = 2;
var duration : float = 2;
private var input : String;
var currentChargeTime : float = 0; //private
var currentShootTime : float = 0; //private
private var instantiateOnce : boolean = false;

function Start () {
	beam = Resources.Load("Prefabs/FusionBeam", GameObject);
	playerStats = gameObject.GetComponent(PlayerStats);
	heatCost = playerStats.FusionBeamStats.currentLevel.heatPerShot;
	damage = playerStats.FusionBeamStats.currentLevel.damage;
	cooldown = playerStats.FusionBeamStats.currentLevel.cooldown;
	input = playerStats.FusionBeamStats.input;
}

function Update () {
	var instance : GameObject;
	if (((Input.GetButton(input) && playerStats.usingMouseAndKeyboard) || (playerStats.usingXboxController && Input.GetAxis(input) < 0)) 
			&& !gameObject.GetComponent(PlayerStats).overheat //make sure we're not overheating
			&& Time.time - playerStats.FusionBeamStats.currentLevel.lastShot > cooldown
			&& currentChargeTime  < chargeTime){ //charge doesn't go beyond chargeTime
		currentChargeTime += Time.deltaTime;
	} else if (currentChargeTime >= chargeTime){ //charge maxed
		if (currentShootTime < duration && Input.GetButton(input) && instantiateOnce == false){ //start beam
			instantiateOnce = true;
			instance = Instantiate(beam, transform.position, Quaternion.identity);	
			Debug.Log("Instantiated");
		} else if (Input.GetButton(input) && instantiateOnce == true && currentShootTime < duration){ //tick time shot while held
			currentShootTime += Time.deltaTime;
		} else if (instantiateOnce == true && Input.GetButton(input) == false){ //let Go
			Debug.Log("let go during shoot");
			Destroy (instance);
			playerStats.VulcanCannonStats.currentLevel.lastShot = Time.time;
		} else if (currentShootTime >= duration){ //held through hold duration
			Debug.Log("end shoot");
			Destroy (instance);
			playerStats.VulcanCannonStats.currentLevel.lastShot = Time.time;
		}
	} else if (currentChargeTime > 0){ //if button is let go before fully charged, empty
	 	currentChargeTime = 0; 
	}
}
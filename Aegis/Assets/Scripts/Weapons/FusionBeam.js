#pragma strict
@script AddComponentMenu("Player Weapons/Fusion Beam")
var beam : GameObject;
var beamCharging : GameObject;
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

private var thisBeam : GameObject;
private var thisBeamCharging : GameObject;
function Update () {
	
	if (((Input.GetButton(input) && playerStats.usingMouseAndKeyboard) || (playerStats.usingXboxController && Input.GetAxis(input) < 0)) 
			&& !gameObject.GetComponent(PlayerStats).overheat //make sure we're not overheating
			&& Time.time - playerStats.FusionBeamStats.currentLevel.lastShot > cooldown)
	{
		if (currentChargeTime  < chargeTime){
			thisBeamCharging = Instantiate(beamCharging, transform.FindChild("nozzle").position, Quaternion.identity);
			currentChargeTime += Time.deltaTime;
			//thisBeamingCharging.renderer.material.alpha;
			if (thisBeamCharging != null)Destroy(thisBeamCharging,2);
		} else if (currentChargeTime > 0 && instantiateOnce == false){ //if button is let go before fully charged, empty
	 		currentChargeTime = 0; 
	 		Destroy(thisBeamCharging);
	 	}
	 }
	if (currentChargeTime >= chargeTime)
	{ //charge maxed
		if (currentShootTime < duration && Input.GetButton(input) && instantiateOnce == false) //start beam
		{
			thisBeam = Instantiate(beam, transform.FindChild("nozzle").position, Quaternion.identity);	
			instantiateOnce = true;
			Debug.Log("Beam Instantiated");
			gameObject.GetComponent(PlayerStats).heat += heatCost;
		} else if (Input.GetButton(input) && instantiateOnce == true && currentShootTime < duration){ //tick time shot while held
			currentShootTime += Time.deltaTime;
		} else if (instantiateOnce == true && Input.GetButton(input) == false){ //let Go
			Debug.Log("let go during shoot."+"Destroy "+thisBeam.name);
			Destroy (thisBeam);
			playerStats.FusionBeamStats.currentLevel.lastShot = Time.time;
			instantiateOnce = false;
			currentShootTime = 0;
			currentChargeTime = 0;
		} else if (currentShootTime >= duration){ //held through hold duration
			if(thisBeam != null)Debug.Log("end shoot"+"Destroy "+thisBeam.name);
			Destroy (thisBeam);
			playerStats.FusionBeamStats.currentLevel.lastShot = Time.time;
			instantiateOnce = false;
			currentShootTime = 0;
			currentChargeTime = 0;
		}	
	}
}
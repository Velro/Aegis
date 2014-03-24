#pragma strict
@script AddComponentMenu("Player/Devices/Coolant Tank")

var input : String;
var playerStats : PlayerStats;
var cooldown : float;
private var timeLastShot : float = 0;


function Start () {
	playerStats = gameObject.GetComponent(PlayerStats);
	input = playerStats.CoolantTankStats.input;
	cooldown = playerStats.CoolantTankStats.currentLevel.cooldown;
}

function Update () {
	if (Input.GetButtonDown(input) && Time.time - timeLastShot > cooldown){
		gameObject.GetComponent(PlayerStats).heat = 0;
		timeLastShot = Time.time;
		playerStats.CoolantTankStats.currentLevel.lastShot = Time.time;
		Debug.Log("coolant used");
	}
}
#pragma strict
@script AddComponentMenu("Player/Devices/Shield")

var shield : GameObject;
private var nozzle : Transform;
private var playerStats : PlayerStats;
private var heatPerSecond : float = 0;
private var size : Vector3 = Vector3.zero;
private var maxHealth : float = 0;
private var input : String;
private var instantiateOnce : boolean;
private var thisShield : GameObject;

function Start () {
	playerStats = gameObject.GetComponent(PlayerStats);
	heatPerSecond = playerStats.ShieldStats.currentLevel.heatCost;
	input = playerStats.ShieldStats.input;
	nozzle = gameObject.transform.FindChild("nozzle");
}

function Update () {
	if (Input.GetButton(input) && !instantiateOnce){ //instantiate shield
		thisShield = Instantiate(shield, nozzle.position, Quaternion.Euler(90,0,0));
		thisShield.transform.parent = nozzle;
		Debug.Log("Instantiate "+thisShield.name);
		instantiateOnce = true;
		gameObject.GetComponent(PlayerStats).heat += heatPerSecond * Time.deltaTime;
		Debug.Log(heatPerSecond * Time.deltaTime);
	} else if (Input.GetButton(input) && instantiateOnce && thisShield != null){ //tick heat while held
		Debug.Log("tick shield");
		gameObject.GetComponent(PlayerStats).heat += heatPerSecond * Time.deltaTime;
	}
	
	if (!Input.GetButton(input) && thisShield != null || playerStats.heat > playerStats.maxHeat){ //destroy if too hot or let go
		Destroy(thisShield);
		instantiateOnce = false;
	}
}
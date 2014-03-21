#pragma strict
@script AddComponentMenu("Player/Devices/Shield")

var shield : GameObject;
var distanceFromShip : float = 13; //alter this directly to change
private var sight : Transform;
private var playerStats : PlayerStats;
private var heatPerSecond : float = 0;
private var size : Vector3 = Vector3.zero;
private var maxHealth : float = 0;
private var input : String;
private var instantiateOnce : boolean;
private var thisShield : GameObject;
private var mouseX : float = 0;
private var mouseY : float = 0;
private var diff : float = 0;

function Start () {
	shield = Resources.Load("Prefabs/Shield", GameObject);
	playerStats = gameObject.GetComponent(PlayerStats);
	heatPerSecond = playerStats.ShieldStats.currentLevel.heatCost;
	input = playerStats.ShieldStats.input;
	sight = gameObject.transform.FindChild("gun");
	diff = Camera.main.transform.position.y + sight.transform.position.y;
}

function Update () {
	if (((Input.GetButtonDown(input) && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController && (Input.GetAxis(input) > 0.5 ))) 
		 && !instantiateOnce){ //instantiate shield
		thisShield = Instantiate(shield, sight.position, Quaternion.Euler(90,0,0));
		thisShield.transform.parent = sight;
		thisShield.transform.localPosition.x = distanceFromShip;
		//Debug.Log("Instantiate "+thisShield.name);
		instantiateOnce = true;
		gameObject.GetComponent(PlayerStats).heat += heatPerSecond * Time.deltaTime;
	} else if (Input.GetButton(input) && instantiateOnce && thisShield != null){ //tick heat while held
		//Debug.Log("tick shield");
		gameObject.GetComponent(PlayerStats).heat += heatPerSecond * Time.deltaTime;
	}
	if (!Input.GetButton(input) && thisShield != null || playerStats.heat > playerStats.maxHeat){ //destroy if too hot or let go
		Destroy(thisShield);
		instantiateOnce = false;
	}
	if (thisShield != null)
		thisShield.transform.localRotation = Quaternion.Euler(270, 0, 0);
}
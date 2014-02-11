#pragma strict
@script AddComponentMenu("Player/Weapon/ArcNade")

var canister : GameObject;
var path : GameObject;
private var heatCost : float = 0;	//for basic bullet
private var cooldown : float = 0;
private var damage : float = 0;
private var input : String;
var fire : AudioClip;
private var playerStats : PlayerStats;
private var sight : Transform;
var playerSpeed : float; 

private var thisCanister : GameObject;
private var thisPath : GameObject;

function Start () {
	canister = Resources.Load("Prefabs/nadeCanister", GameObject);
	path = Resources.Load("Prefabs/nadePath", GameObject);
	playerStats = gameObject.GetComponent(PlayerStats);
	heatCost = playerStats.ArcNadeStats.currentLevel.heatCost;
	damage = playerStats.ArcNadeStats.currentLevel.damage;
	cooldown = playerStats.ArcNadeStats.currentLevel.cooldown;
	input = playerStats.ArcNadeStats.input;
	sight = transform.FindChild("gun");
	
	//thisPath.transform.parent = sight;
}


function Update () {
	CheckStats();
	if (((Input.GetButtonDown(input) && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController &&  Input.GetButtonDown(input))) 
			&& !gameObject.GetComponent(PlayerStats).overheat //make sure we're not overheating
			&& Time.time - playerStats.ArcNadeStats.currentLevel.lastShot > cooldown)
	{
		thisCanister = Instantiate(canister, sight.transform.position, sight.transform.rotation);
		//thisCanister.transform.parent = sight;
		thisCanister.GetComponent(Stats).damage = damage;
		gameObject.GetComponent(PlayerStats).ArcNadeStats.currentLevel.lastShot = Time.time;
		gameObject.GetComponent(PlayerStats).heat += heatCost;
		playerSpeed = gameObject.GetComponent(ShipMovement).moveDirection.normalized.magnitude + 1;
		thisCanister.GetComponent(Stats).speed *= playerSpeed;
		
		thisPath = Instantiate(path, sight.transform.position, sight.transform.rotation);
		if (sight.transform.eulerAngles.y > 180)thisPath.transform.eulerAngles.x = 180;
		thisCanister.GetComponent(CurvePaths).parentPath = thisPath.transform;
		
		Destroy(thisPath,5);
	}
}

function CheckStats(){
	heatCost = playerStats.ArcNadeStats.currentLevel.heatCost;
	damage = playerStats.ArcNadeStats.currentLevel.damage;
	cooldown = playerStats.ArcNadeStats.currentLevel.cooldown;
	input = playerStats.ArcNadeStats.input;
}
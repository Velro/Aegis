#pragma strict
@script AddComponentMenu("Player/Weapons/Blunder Buster")

var sight : GameObject;
var bullet : GameObject;
private var heatCost : float = 0;
private var cooldown : float = 0;
private var damage : float = 0;
var laser : AudioClip;
var lastShot : float = 0;
var playerStats : PlayerStats;
private var input : String;

function Start () {
	bullet = Resources.Load("Prefabs/GreenLaser", GameObject);
	playerStats = gameObject.GetComponent(PlayerStats);
	sight = transform.FindChild("gun").gameObject;
}

function Update () {
	CheckStats();
	if (((Input.GetButtonDown(input) && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController && (Input.GetAxis(input) < -0.5))) 
			&& !gameObject.GetComponent(PlayerStats).overheat //make sure we're not overheating
			&& Time.time - playerStats.BlunderBusterStats.currentLevel.lastShot > cooldown)
	{
		gameObject.GetComponent(PlayerStats).heat += heatCost; //up the heat
		var instance1 : GameObject;
		var instance2 : GameObject;
		var instance3 : GameObject;
		var instance4 : GameObject;
		var sightRotation : Quaternion = sight.transform.rotation;
		var instance1rotation : Quaternion = sightRotation;
		var instance2rotation : Quaternion = sightRotation;
		var instance3rotation : Quaternion = sightRotation;
		var instance4rotation : Quaternion = sightRotation;
		if (playerStats.BlunderBusterStats.level == 0){		
			instance1rotation.eulerAngles.y -= 15;
			instance1rotation.eulerAngles.x += 90; //because XZ plane		
			instance2rotation.eulerAngles.y += 15;
			instance2rotation.eulerAngles.x += 90; //because XZ plane	
			instance1 = Instantiate (bullet, sight.transform.position, instance1rotation);
			instance2 = Instantiate (bullet, sight.transform.position,instance2rotation);
			instance1.GetComponent(Stats).damage = damage;
			instance2.GetComponent(Stats).damage = damage;
			Destroy (instance1, 1); //after 5 seconds the bullet is way off the screen. This is for clean up
			Destroy (instance2, 1);
		}
		if (playerStats.BlunderBusterStats.level == 1){
			instance1rotation.eulerAngles.y -= 15;
			instance1rotation.eulerAngles.x += 90; //because XZ plane
			instance2rotation.eulerAngles.y += 15;
			instance2rotation.eulerAngles.x += 90; //because XZ plane
			instance3rotation.eulerAngles.x += 90; //because XZ plane
			instance1 = Instantiate (bullet, sight.transform.position, instance1rotation);
			instance2 = Instantiate (bullet, sight.transform.position,instance2rotation);
			instance3 = Instantiate (bullet, sight.transform.position,instance3rotation);
			instance1.GetComponent(Stats).damage = damage;
			instance2.GetComponent(Stats).damage = damage;
			instance3.GetComponent(Stats).damage = damage;
			Destroy (instance1, 1);
			Destroy(instance2, 1);
			Destroy(instance3, 1);
		}
		
		if (playerStats.BlunderBusterStats.level == 2){
			instance1rotation.eulerAngles.y -= 15;
			instance1rotation.eulerAngles.x += 90; //because XZ plane
			instance2rotation.eulerAngles.y += 15;
			instance2rotation.eulerAngles.x += 90; //because XZ plane
			instance3rotation.eulerAngles.y += 5;
			instance3rotation.eulerAngles.x += 90; //because XZ plane
			instance4rotation.eulerAngles.y -= 5;
			instance4rotation.eulerAngles.x += 90; //because XZ plane
			instance1 = Instantiate (bullet, sight.transform.position, instance1rotation);
			instance2 = Instantiate (bullet, sight.transform.position,instance2rotation);
			instance3 = Instantiate (bullet, sight.transform.position,instance3rotation);
			instance4 = Instantiate (bullet, sight.transform.position, instance4rotation);
			instance1.GetComponent(Stats).damage = damage;
			instance2.GetComponent(Stats).damage = damage;
			instance3.GetComponent(Stats).damage = damage;
			instance4.GetComponent(Stats).damage = damage;
			Destroy (instance1, 1);
			Destroy (instance2, 1);
			Destroy (instance3, 1);
			Destroy (instance4, 1);
		}
		if (playerStats.BlunderBusterStats.level == 3){
			instance1rotation.eulerAngles.y -= 15;
			instance1rotation.eulerAngles.x += 90; //because XZ plane
			instance2rotation.eulerAngles.y += 15;
			instance2rotation.eulerAngles.x += 90; //because XZ plane
			instance3rotation.eulerAngles.y += 5;
			instance3rotation.eulerAngles.x += 90; //because XZ plane
			instance4rotation.eulerAngles.y -= 5;
			instance4rotation.eulerAngles.x += 90; //because XZ plane
			instance1 = Instantiate (bullet, sight.transform.position, instance1rotation);
			instance2 = Instantiate (bullet, sight.transform.position,instance2rotation);
			instance3 = Instantiate (bullet, sight.transform.position,instance3rotation);
			instance4 = Instantiate (bullet, sight.transform.position, instance4rotation);
			instance1.GetComponent(Stats).damage = damage;
			instance2.GetComponent(Stats).damage = damage;
			instance3.GetComponent(Stats).damage = damage;
			instance4.GetComponent(Stats).damage = damage;
			Destroy (instance1, 2);
			Destroy (instance2, 2);
			Destroy (instance3, 2);
			Destroy (instance4, 2);
		}
		audio.PlayOneShot(laser);
		

		playerStats.BlunderBusterStats.currentLevel.lastShot = Time.time;
	}
}

function CheckStats(){
	heatCost = playerStats.BlunderBusterStats.currentLevel.heatCost;
	damage = playerStats.BlunderBusterStats.currentLevel.damage;
	cooldown = playerStats.BlunderBusterStats.currentLevel.cooldown;
	input = playerStats.BlunderBusterStats.input;
}
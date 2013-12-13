#pragma strict
/*
* Moving the reticule and shooting from it. Handling keyboard and gamepad inputs.
*/
var sight : GameObject;
var bullet : GameObject;
var heatCost : float = 1;	//for basic bullet
var cooldown : float = 0.1;
private var lastShot : float = 0;
private var mouseX : float = 0;
private var mouseY : float = 0;

var diff : float;
function Start () {
	diff = Camera.main.transform.position.y + sight.transform.position.y;
}

function Update () {
	var playerStats : PlayerStats = gameObject.GetComponent(PlayerStats);
	if (((Input.GetButtonDown("Fire1") && playerStats.usingMouseAndKeyboard) || (playerStats.usingXboxController && Input.GetAxis("Fire1") < 0)) && !gameObject.GetComponent(PlayerStats).overheat && //make sure we're not overheating
			Time.time - lastShot > cooldown){ //basic forward gun
		gameObject.GetComponent(PlayerStats).heat += heatCost; //up the heat
		var instance : GameObject;
		instance = Instantiate (bullet, sight.transform.position,sight.transform.rotation);
		instance.transform.localRotation.eulerAngles.x = 90; //because XZ plane
		Destroy (instance, 5); //after 5 seconds the bullet is way off the screen. This is for clean up
		lastShot = Time.time;
	}
	
	/**** Mouse Input ***/
	if (playerStats.usingMouseAndKeyboard && Camera.main.GetComponent(MyGUI).paused == false){
		mouseX = Input.mousePosition.x;
		mouseY = Input.mousePosition.y;
		var worldPos = Camera.main.ScreenToWorldPoint(Vector3(mouseX, mouseY, diff));
		sight.transform.LookAt(worldPos);
		sight.transform.rotation *= Quaternion.Euler(0,-90,0);
		sight.transform.eulerAngles.z = 0;
	}
	
	/**** Controller Input ****/
	if (playerStats.usingXboxController){
		var xAxis = Input.GetAxis("AimHorizontal");
		var yAxis = Input.GetAxis("AimVertical");
		if (xAxis != 0 || yAxis != 0){
			var relativePos = (transform.position+Vector3(yAxis,0, xAxis)) - transform.position;
			var rotation = Quaternion.LookRotation(relativePos, Vector3.up);
			sight.transform.rotation = rotation;
		}
	}
}

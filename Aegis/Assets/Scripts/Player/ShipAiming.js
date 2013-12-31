#pragma strict
/*
* Moving the reticule and shooting from it. Handling keyboard and gamepad inputs.
*/
var sight : GameObject;
private var mouseX : float = 0;
private var mouseY : float = 0;
private var diff : float;

function Start () {
	diff = Camera.main.transform.position.y + sight.transform.position.y;
}

function Update () {
	var playerStats : PlayerStats = gameObject.GetComponent(PlayerStats);

	
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
		} else {
			sight.transform.localRotation = Quaternion.Euler(270,0,0);
		}
	}
}

#pragma strict
@script AddComponentMenu("EnemyAI/Turret")

var lookAt : GameObject;
var bullet : GameObject;	//gameObject to be used. should be a prefab
var cooldown : float;		//how long of a wait between shots? in seconds
var getParent : boolean = false; 	//should we use the parents transforms?
private var lastShot : float;
private var grabInitialTimeBool : boolean = false;
private var grabInitialTime : float = 1;
var turnSpeed : float;
var wait : float = 0;		//wait 4 seconds after being activated to shoot, geared towards AI
private var scrollAdjust : float = 0;

function Update () {
	//aiming left
	if (lookAt != null){
		if (lookAt.transform.position.x < transform.position.x){
			if (lookAt != null)transform.LookAt(lookAt.transform.position);
			transform.rotation.eulerAngles.x -= scrollAdjust*2;
			if (transform.localEulerAngles.x > 390)transform.localEulerAngles.x = 390;
			transform.localRotation.y = 0;
			transform.localRotation.z = 0;

			//shooting left
			if (!grabInitialTimeBool){
				grabInitialTime = Time.time;
				grabInitialTimeBool = true;
			}
			if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ 
				var instance : GameObject;
				var rotation : Quaternion = Quaternion.Euler(90, 360 - transform.localEulerAngles.x + (scrollAdjust), 0);
				instance = Instantiate (bullet, transform.position, rotation);
				Destroy (instance, 5);
				lastShot = Time.time;
			}
			//aiming right
		} else { 
			var targetDir = lookAt.transform.position - transform.position;
			
		    // The step size is equal to speed times frame time.
		    var step = turnSpeed * Time.deltaTime;
		    
		    var newDir = Vector3.RotateTowards(transform.forward, targetDir, step, 0.0);
		    // Move our position a step closer to the target.
		    transform.rotation = Quaternion.LookRotation(newDir);
		    transform.rotation.eulerAngles.z = 90;
		    
		    //shooting right
			if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ 
				cooldown *= 1.5;
				var instance1 : GameObject;
				var rotation1 : Quaternion = Quaternion.Euler(90, 180 + transform.localEulerAngles.x + (scrollAdjust), 0);
				instance = Instantiate (bullet, transform.position, rotation1);
				Destroy (instance1, 5);
				lastShot = Time.time;
			}
		}
	}
}

function CheckScrollSpeed (){
	scrollAdjust = Camera.main.transform.parent.GetComponent(CameraScroll).scrollSpeed;
}


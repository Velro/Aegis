var lookAt : GameObject;
var bullet : GameObject;	//gameObject to be used. should be a prefab
var cooldown : float;		//how long of a wait between shots? in seconds
private var lastShot : float = 0;
private var grabInitialTimeBool : boolean = false;
private var grabInitialTime : float = 0;
var wait : float = 0;		//wait after being activated to shoot, geared towards AI

function Update () {
	if (lookAt != null)transform.LookAt(lookAt.transform.position);
	
	if (!grabInitialTimeBool){
		grabInitialTime = Time.time;
		grabInitialTimeBool = true;
	}
	
	if (Time.time - lastShot > cooldown && Time.time - grabInitialTime > wait){ //basic forward gun
		var instance : GameObject;
		//var scrollAdjust : float = Camera.main.transform.parent.GetComponent(CameraScroll).scrollSpeed;
		var rotation : Quaternion = Quaternion.Euler(90, transform.eulerAngles.x, 0);
		//Debug.Log("corsairshoot");
			
		instance = Instantiate (bullet, transform.position, rotation); //  * Quaternion.Euler(0, scrollAdjust, 0)
		Destroy (instance, 5);
		lastShot = Time.time;
		
	}

}






#pragma strict
private var currentHealth : float;
var xShakeSpeed : float = 0.02;
var xShakeRange : Vector2 = new Vector2(-1,1);
var shakeDuration : float = 0.2;
private var shakeStartTime : float = 0;
var shaking : boolean = false;

function Start () {
	currentHealth = GetComponent(Stats).health;
}

function Update () {
	if (GetComponent(Stats).health < currentHealth){
		shaking = true;
		shakeStartTime = Time.time;
		currentHealth = GetComponent(Stats).health;
	}
	
	if (shaking){
		ScreenShake();
	}
	if (shaking && Time.time > shakeStartTime + shakeDuration){
		shaking = false;
		Camera.main.transform.localPosition.x = 0;
	}
}

function ScreenShake(){
	var shakePos = Random.Range(xShakeRange.x, xShakeRange.y);
	Camera.main.transform.localPosition.x += shakePos;
	WaitForSeconds(xShakeSpeed);
}
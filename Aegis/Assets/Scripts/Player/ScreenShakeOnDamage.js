#pragma strict
private var currentHealth : float;
var xShakeSpeed : float = 0.02;
var xShakeRange : Vector2 = new Vector2(-1,1);
var shakeDuration : float = 0.2;
private var shakeStartTime : float = 0;

function Start () {
	currentHealth = GetComponent(Stats).health;
}

function Update () {
	if (GetComponent(Stats).health < currentHealth){
	
	
		if (
		ScreenShake();
		currentHealth = GetComponent(Stats).health;
	}
}

function ScreenShake(){
	var shakePos = Random.Range(xShakeRange.x, xShageRange.y);
	Camera.main.transform.position.x += shakePos;
	WaitForSeconds(xShakeSpeed);
}
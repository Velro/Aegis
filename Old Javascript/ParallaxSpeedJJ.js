#pragma strict
var speed1 : float = 1;
var speed2 : float = 1;
var speed3 : float = 1;
var texSizeX : float = 200; //largely arbitrary. Adjust until it looks right
var texSizeY : float = 150;
var parallaxing : boolean = true;
private var screenSpeed : float = 0;
var screenSize : Vector2;
var tileSize : Vector2;
function Start () {
	screenSize = Vector2(Camera.main.pixelWidth, Camera.main.pixelHeight);
	screenSpeed = transform.parent.GetComponent(CameraScroll).scrollSpeed;
	transform.localScale.x = screenSize.x;
	transform.localScale.y = screenSize.y;
	tileSize.x = screenSize.x / texSizeX;
	tileSize.y = screenSize.x / texSizeY;
	var materials : Material[] = gameObject.renderer.materials;
	for (var material in materials){
		material.SetTextureScale("_MainTex",tileSize);
	}
}

function Update () {
	if (parallaxing){
		gameObject.renderer.materials[0].mainTextureOffset.x += speed1*Time.deltaTime;
		gameObject.renderer.materials[1].mainTextureOffset.x += speed2*Time.deltaTime;
		gameObject.renderer.materials[2].mainTextureOffset.x += speed3*Time.deltaTime;
	}
}
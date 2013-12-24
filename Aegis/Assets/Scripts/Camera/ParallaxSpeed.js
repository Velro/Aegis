#pragma strict
var speed1 : float = 1;
var speed2 : float = 1;
var speed3 : float = 1;
var texSizeX : float = 200; //for tiling
var texSizeY : float = 150;
private var screenSpeed : float = 0;
private var unitWidth : float = 0;
private var unitHeight : float = 0;

function Start () {
	var v : Vector2 = Vector2(Camera.main.pixelWidth/texSizeX, Camera.main.pixelHeight/texSizeY);
	screenSpeed = transform.parent.GetComponent(CameraScroll).scrollSpeed;
	var p : Vector3 = Camera.main.ScreenToWorldPoint (Vector3 (Camera.main.pixelWidth,Camera.main.nearClipPlane,Camera.main.pixelHeight));
	unitWidth = p.x;
	unitHeight = p.z;
	transform.localScale.x = unitWidth;
	transform.localScale.y = unitHeight;
	var materials : Material[] = gameObject.renderer.materials;
	for (var material in materials){
		
		material.SetTextureScale("_MainTex",v);
	}
}

function Update () {
	gameObject.renderer.materials[0].mainTextureOffset.x += speed1*Time.deltaTime;
	gameObject.renderer.materials[1].mainTextureOffset.x += speed2*Time.deltaTime;
	gameObject.renderer.materials[2].mainTextureOffset.x += speed3*Time.deltaTime;
}
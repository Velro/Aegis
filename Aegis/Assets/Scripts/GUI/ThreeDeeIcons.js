#pragma strict

function Start () {

}

function Update () {

}

function Go(){
	gameObject.GetComponent(Camera).Render();
	Debug.Log("GO");
}
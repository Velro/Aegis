#pragma strict
@script AddComponentMenu("GUI/ThreeDeeIconsCamera")
function Start () {

}


function Go(){
	gameObject.GetComponent(Camera).Render();
}

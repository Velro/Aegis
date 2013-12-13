#pragma strict

private var moveDirection : Vector3 = Vector3.zero;
private var controller : CharacterController;

function Start () { 

}

function Awake () {
	controller = GetComponent (CharacterController);
}

function Update () {
/**** Move Ship Input ****/
	var horizontal : float = Input.GetAxis("MoveHorizontal");
	var vertical : float = Input.GetAxis("MoveVertical");	
	moveDirection = Vector3(horizontal, 0, vertical) * gameObject.GetComponent(Stats).speed;
	controller.Move(moveDirection * Time.deltaTime);
	
/**** Physics ****/
	transform.position.y = 0; //dont let collisions knock it out of 2d plane
}	
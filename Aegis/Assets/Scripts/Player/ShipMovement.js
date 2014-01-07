#pragma strict

/*
* Very no-frills movement class. Unity has a lot of API resources for moving players
*/
private var moveDirection : Vector3 = Vector3.zero;
private var controller : CharacterController;


function Awake () {
	controller = GetComponent (CharacterController);
}

function Update () {
/**** Move Ship Input ****/
	var horizontal : float;
	var vertical : float;
	if (InputCoordinator.usingController == true){
		horizontal = Input.GetAxis(InputCoordinator.leftStickHor);
		vertical = Input.GetAxis(InputCoordinator.leftStickVert);
	}
	if (InputCoordinator.usingMouseAndKeyboard == true){
		horizontal = Input.GetAxis("MoveHorizontalKey");
		vertical = Input.GetAxis("MoveVerticalKey");	
	}	
	moveDirection = Vector3(horizontal, 0, vertical) * gameObject.GetComponent(Stats).speed;
	controller.Move(moveDirection * Time.deltaTime);
	
/**** Physics ****/
	transform.position.y = 0; //dont let collisions knock it out of XZ plane
}	
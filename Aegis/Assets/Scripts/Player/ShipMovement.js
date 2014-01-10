#pragma strict

/*
* Very no-frills movement class. Unity has a lot of API resources for moving players
*/
var moveDirection : Vector3 = Vector3.zero;
private var controller : CharacterController;
private var speed : float;
var rotateUp : float = 0;
var rotateDown : float = 0;
var rotateBack : float = 0;

function Awake () {
	controller = GetComponent (CharacterController);
}

function Update () {
/**** Move Ship Input ****/
	CheckStats();
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
	moveDirection = Vector3(horizontal, 0, vertical) * speed;
	controller.Move(moveDirection * Time.deltaTime);
	
/**** Physics ****/
	transform.position.y = 0; //dont let collisions knock it out of XZ plane
	
/**** Tilting ****/
	if (moveDirection.z == speed){
		rotateUp += Time.deltaTime;
		rotateDown = 0;
		rotateBack = 0;
		transform.eulerAngles.x = Mathf.LerpAngle(0,35, rotateUp);
	} else if (moveDirection.z == (0-speed)){
		rotateUp = 0;
		rotateDown += Time.deltaTime;
		rotateBack = 0;
		transform.eulerAngles.x = Mathf.LerpAngle(0,-35, rotateDown);
	} else if (transform.eulerAngles.x != 0){
		rotateUp = 0;
		rotateDown = 0;
		rotateBack += Time.deltaTime;
		transform.eulerAngles.x = Mathf.LerpAngle(transform.eulerAngles.x, 0, rotateBack);
	}
}
	

function CheckStats (){
	speed = gameObject.GetComponent(Stats).speed;
}
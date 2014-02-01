#pragma strict

/*
* Very no-frills movement class. Unity has a lot of API resources for moving players
*/
var moveDirection : Vector3 = Vector3.zero;
private var controller : CharacterController;
private var speed : float;
private var rotateUp : float = 0;
private var rotateDown : float = 0;
private var rotateBack : float = 0;
private var rotateRight : float = 0;
private var rotateLeft : float = 0;
private var rotateReturn : float = 0;
var verticalSpeedOfRotation : float = 1;
var verticalDistanceRotate : float = 35;
var horizontalSpeedOfRotation : float = 1;
var horizontalDistanceRotate : float = 35;

function Awake () {
	controller = GetComponent (CharacterController);
}

function Update () {
/**** Move Ship Input ****/
	CheckStats();
	var horizontal : float;
	var vertical : float;
	if (InputCoordinator.usingController == true){
		horizontal = Input.GetAxis(InputCoordinator.leftStickHor.axis);
		vertical = Input.GetAxis(InputCoordinator.leftStickVert.axis);
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
	if (vertical > 0){
		rotateUp += Time.deltaTime * verticalSpeedOfRotation;
		rotateDown = 0;
		rotateBack = 0;
		transform.eulerAngles.x = Mathf.LerpAngle(transform.eulerAngles.x,verticalDistanceRotate, rotateUp);
	} else if (vertical < 0){
		rotateUp = 0;
		rotateDown += Time.deltaTime * verticalSpeedOfRotation;
		rotateBack = 0;
		transform.eulerAngles.x = Mathf.LerpAngle(transform.eulerAngles.x,-verticalDistanceRotate, rotateDown);
	} else if (transform.eulerAngles.x != 0){
		rotateUp = 0;
		rotateDown = 0;
		rotateBack += Time.deltaTime * verticalSpeedOfRotation;
		transform.eulerAngles.x = Mathf.LerpAngle(transform.eulerAngles.x, 0, rotateBack);
	}
	
	if (horizontal > 0){
		rotateRight += Time.deltaTime*horizontalSpeedOfRotation;
		rotateLeft = 0;
		rotateReturn = 0;
		transform.eulerAngles.z = Mathf.LerpAngle(transform.eulerAngles.z,horizontalDistanceRotate, rotateRight);
	} else if (horizontal < 0){
		rotateRight = 0;
		rotateLeft += Time.deltaTime*horizontalSpeedOfRotation;
		rotateReturn = 0;
		transform.eulerAngles.z = Mathf.LerpAngle(transform.eulerAngles.z, -horizontalDistanceRotate, rotateLeft);
	} else {
		rotateRight = 0;
		rotateLeft = 0;
		rotateReturn = Time.deltaTime *horizontalSpeedOfRotation;
		transform.eulerAngles.z = Mathf.LerpAngle(transform.eulerAngles.z, 0, rotateReturn);
	}
}
	

function CheckStats (){
	speed = gameObject.GetComponent(Stats).speed;
}
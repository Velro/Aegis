#pragma strict
/*
* Script for pushing our linear bullets. 
*/
var speed : float;
var left : boolean = false;
var right : boolean = false;


function Awake () {
	if (right){
		transform.rotation.x = 90;
		transform.rotation.z = 0;
		rigidbody.AddForce(transform.right * speed);
	}
	if (left){
		transform.rotation.x = 90;
		transform.rotation.z = 0;
		rigidbody.AddForce(transform.right * -speed);
	}
}



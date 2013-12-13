#pragma strict
/*
* Script for pushing our linear bullets. 
*/
var speed : float;
var left : boolean = false;
var right : boolean = false;


function Awake () {
	if (right){
		rigidbody.AddForce(transform.right * speed);
	}
	if (left){
		rigidbody.AddForce(transform.right * -speed);
	}
}



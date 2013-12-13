#pragma strict
/*
*  A general class that contains statistics for the gameObject its attached to. 
*
*	This gets a little confusing with enemies that shoot.
*  The damage is read for whatever collided with the object taking damage. So if the player collides with a ship, they take collision damage equal to
*  the damage stat of that ship. If the player collides with an enemy bullet, he takes the damage stat of that bullet.
*/


var damage : float = 1;
var health : float = 10;
var maxHealth : float = 100;
var speed : float = 1;




#pragma strict

var damage : float = 1;
var health : float = 10;
var maxHealth : float = 100;
var heat : float = 50;
var maxHeat : float = 100;
var speed : float = 1;

var heatCooldownRate : float = 1; 
var overheat : boolean = false;
var overheatTime : float = 1;
var speedReduction : float = 0.5;
private var beginOverheat : float;
function Start () {
}

function Update () {
	if (heat > 0 && heat != maxHeat){
		heat = Mathf.MoveTowards(heat, 0, heatCooldownRate * Time.deltaTime);
	}
	if (heat > maxHeat){ //overheated!
		heat = maxHeat;
		overheat = true;
		beginOverheat = Time.time;
		speed *= speedReduction;
	}
	if (overheat && Time.time - beginOverheat >= overheatTime){ //end overheat
		overheat = false;
		heat = 99;
		
		speed /= speedReduction;
	}
}
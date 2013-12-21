#pragma strict

/*
* 
*/

var heat : float = 50;
var maxHeat : float = 100;
var heatCooldownRate : float = 1; 		
var overheat : boolean = false;
var overheatTime : float = 1;			//time you are overheated
var speedReduction : float = 0.5;		//overheat penalty
public static var usingXboxController : boolean = false; //xbox stated explicitly because setup will be a little different with other controllers *sigh*
public static var usingMouseAndKeyboard : boolean = true;
var totalCredits : int  = 0;
var creditsThisLevel : int = 0;

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
		gameObject.GetComponent(Stats).speed *= speedReduction;
	}
	if (overheat && Time.time - beginOverheat >= overheatTime){ //end overheat
		overheat = false;
		heat = 99;
		
		gameObject.GetComponent(Stats).speed /= speedReduction;
	}
}
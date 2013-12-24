#pragma strict

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

class WeaponLevel extends System.Object{
	var damage : float;
	var heatPerShot : float;
	var cooldown : float;
	
	@System.NonSerialized
	var lastShot : float;
}

class Weapon extends System.Object {
	var level : int = 0;
	var name : String;
	var currentLevel : WeaponLevel;
	var level0 : WeaponLevel;
	var level1 : WeaponLevel;
	var level2 : WeaponLevel;
	var level3 : WeaponLevel;	
}

var weapons : Weapon[];
var VulcanCannonStats : Weapon;

function Awake () {
	weapons = new Weapon[4];
	if (VulcanCannonStats.level >= 0){
		weapons[0] = VulcanCannonStats;
		
		if (VulcanCannonStats.level == 0)VulcanCannonStats.currentLevel = VulcanCannonStats.level0;
		if (VulcanCannonStats.level == 1)VulcanCannonStats.currentLevel = VulcanCannonStats.level1;
		if (VulcanCannonStats.level == 2)VulcanCannonStats.currentLevel = VulcanCannonStats.level2;
		if (VulcanCannonStats.level == 3)VulcanCannonStats.currentLevel = VulcanCannonStats.level3;
		gameObject.AddComponent(VulcanCannon);
	}
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
#pragma strict

var heat : float = 50;
var maxHeat : float = 100;
var heatCooldownRate : float = 1; 		
var overheat : boolean = false;
var overheatTime : float = 1;			//time you are overheated
var speedReduction : float = 0.5;		//overheat penalty
public static var usingXboxController : boolean = false; //xbox stated explicitly because setup will be a little different with other controllers *sigh*
public static var usingMouseAndKeyboard : boolean = true;
public static var totalCredits : int  = 5000;
var creditsThisLevel : int = 0;
private var beginOverheat : float;



class WeaponLevel extends System.Object{
	var damage : float;
	var heatCost : float;
	var cooldown : float;
	
	@System.NonSerialized
	var lastShot : float;

}

class Weapon extends System.Object {
	var level : int = 0;
	var name : String;
	var level0 : WeaponLevel;
	var level1 : WeaponLevel;
	var level2 : WeaponLevel;
	var level3 : WeaponLevel;
	@System.NonSerialized
	var input : String;
	@System.NonSerialized
	var currentLevel : WeaponLevel;
}

var weapons : Weapon[];
var VulcanCannonStats : Weapon;
var FusionBeamStats : Weapon;
var ShieldStats : Weapon;
var CoolantTankStats : Weapon;

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
	if (FusionBeamStats.level >= 0){
		weapons[1] = FusionBeamStats;
		if (FusionBeamStats.level == 0)FusionBeamStats.currentLevel = FusionBeamStats.level0;
		if (FusionBeamStats.level == 1)FusionBeamStats.currentLevel = FusionBeamStats.level1;
		if (FusionBeamStats.level == 2)FusionBeamStats.currentLevel = FusionBeamStats.level2;
		if (FusionBeamStats.level == 3)FusionBeamStats.currentLevel = FusionBeamStats.level3;	
		gameObject.AddComponent(FusionBeam);
	}
	if (ShieldStats.level >= 0){
		weapons[2] = ShieldStats;
		if (ShieldStats.level == 0)ShieldStats.currentLevel = ShieldStats.level0;
		if (ShieldStats.level == 1)ShieldStats.currentLevel = ShieldStats.level1;
		if (ShieldStats.level == 2)ShieldStats.currentLevel = ShieldStats.level2;
		if (ShieldStats.level == 3)ShieldStats.currentLevel = ShieldStats.level3;	
		gameObject.AddComponent(Shield);
	}
	if (CoolantTankStats.level >= 0){
		weapons[3] = CoolantTankStats;
		if (CoolantTankStats.level == 0)CoolantTankStats.currentLevel = CoolantTankStats.level0;
		if (CoolantTankStats.level == 1)CoolantTankStats.currentLevel = CoolantTankStats.level1;
		if (CoolantTankStats.level == 2)CoolantTankStats.currentLevel = CoolantTankStats.level2;
		if (CoolantTankStats.level == 3)CoolantTankStats.currentLevel = CoolantTankStats.level3;	
		gameObject.AddComponent(CoolantTank);
	}
	weapons[0].input = "Fire1";
	weapons[1].input = "Fire2";
	weapons[2].input = "Fire3";
	weapons[3].input = "Fire4";
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
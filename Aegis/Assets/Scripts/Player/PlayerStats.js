#pragma strict

var heat : float = 50;
var maxHeat : float = 100;
var heatCooldownRate : float = 1; 		
var overheat : boolean = false;
var overheatTime : float = 1;			//time you are overheated
var speedReduction : float = 0.5;		//overheat penalty
var expWindow : float = 2;

public static var totalCredits : int  = 5000;
var creditsThisLevel : int = 0;
private var beginOverheat : float;
var levelUp : AudioClip; 

enum WeaponType {
	Projectile,
	Explosive,
	Energy,
	Device
}
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
	var weaponType : WeaponType = weaponType.Projectile;
	@System.NonSerialized
	var input : String;
	@System.NonSerialized
	var currentLevel : WeaponLevel;
	@System.NonSerialized
	var currentExp : float;
}

var allEquipables = new Array();
var weapons : Weapon[];
selections = new String[4];
var VulcanCannonStats : Weapon;
var FusionBeamStats : Weapon;
var ShieldStats : Weapon;
var CoolantTankStats : Weapon;
var selections : String[];


function Awake () {
	if (Application.platform != RuntimePlatform.WindowsEditor){
		selections = UpgroidsGUI.selections.ToBuiltin(String) as String[];
	}
	var allEquipables = new Array(VulcanCannonStats, FusionBeamStats,ShieldStats,CoolantTankStats);
	var convAllEquipables :Weapon[] = allEquipables.ToBuiltin(Weapon) as Weapon[];
	weapons = new Weapon[4];
	var weaponsIndex : int = 0;
	for (var i : int = 0; i < selections.length; i++){
		for (var k : int = 0; k < convAllEquipables.length; k++){
			if (selections[i] == convAllEquipables[k].name){
				weapons[weaponsIndex] = convAllEquipables[k];
				var str = convAllEquipables[k].name.Replace(' ','');
				gameObject.AddComponent(""+str);
				weaponsIndex++;
			}
		}
	}
	weapons[0].input = InputCoordinator.weaponOne;
	weapons[1].input = InputCoordinator.weaponTwo;
	weapons[2].input = InputCoordinator.weaponThree;
	weapons[3].input = InputCoordinator.weaponFour;
	CheckLevel();
}

function Update () {
	CheckLevel();
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

function CheckLevel () {
	for (var weapon : Weapon in weapons){
		if (weapon.currentExp >= 100){
			weapon.level += 1;
			weapon.currentExp -= 100;
			Debug.Log(weapon.name+" levelled up!");
			audio.PlayOneShot(levelUp, 1);
			Camera.main.GetComponent(MyGUI).levelledName = weapon.name;
			Camera.main.GetComponent(MyGUI).levelledLevel = weapon.level;
			Camera.main.GetComponent(MyGUI).levelledTime = weapon.currentLevel.lastShot;
			Camera.main.GetComponent(MyGUI).boolLevel = true;
		}
	}
	if (VulcanCannonStats.level == 0)VulcanCannonStats.currentLevel = VulcanCannonStats.level0;
	if (VulcanCannonStats.level == 1)VulcanCannonStats.currentLevel = VulcanCannonStats.level1;
	if (VulcanCannonStats.level == 2)VulcanCannonStats.currentLevel = VulcanCannonStats.level2;
	if (VulcanCannonStats.level == 3)VulcanCannonStats.currentLevel = VulcanCannonStats.level3;
	
	if (FusionBeamStats.level == 0)FusionBeamStats.currentLevel = FusionBeamStats.level0;
	if (FusionBeamStats.level == 1)FusionBeamStats.currentLevel = FusionBeamStats.level1;
	if (FusionBeamStats.level == 2)FusionBeamStats.currentLevel = FusionBeamStats.level2;
	if (FusionBeamStats.level == 3)FusionBeamStats.currentLevel = FusionBeamStats.level3;
	
	if (ShieldStats.level == 0)ShieldStats.currentLevel = ShieldStats.level0;
	if (ShieldStats.level == 1)ShieldStats.currentLevel = ShieldStats.level1;
	if (ShieldStats.level == 2)ShieldStats.currentLevel = ShieldStats.level2;
	if (ShieldStats.level == 3)ShieldStats.currentLevel = ShieldStats.level3;
	
	if (CoolantTankStats.level == 0)CoolantTankStats.currentLevel = CoolantTankStats.level0;
	if (CoolantTankStats.level == 1)CoolantTankStats.currentLevel = CoolantTankStats.level1;
	if (CoolantTankStats.level == 2)CoolantTankStats.currentLevel = CoolantTankStats.level2;
	if (CoolantTankStats.level == 3)CoolantTankStats.currentLevel = CoolantTankStats.level3;
}

function GiveExp (exp : float, time : float){
	for (var weapon : Weapon in weapons){
		if (Time.time - weapon.currentLevel.lastShot < expWindow){
			weapon.currentExp += exp;
		}
	}
}
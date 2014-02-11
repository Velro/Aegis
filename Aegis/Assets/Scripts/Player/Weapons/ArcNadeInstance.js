#pragma strict
@script AddComponentMenu("Player/Weapons/ArcNadeInstance")

@System.NonSerializedAttribute
var damage : float = 0;
var explosionRadius : float = 10;
var strongAgainst : EnemyType = EnemyType.Armored;
var weaponType : WeaponType = WeaponType.Explosive;
var superEffectiveCoef : float = 2;

function Start () {
	CheckStats();
}

function Update () {
	CheckStats();
	if (gameObject.GetComponent(CurvePaths).t == 1){
		Explode();
	}
	
}

function OnCollisionEnter (){
	Explode();
}

function OnTriggerEnter (other : Collider){
	if (other.gameObject.GetComponent(Stats) != null){
		if (other.gameObject.GetComponent(Stats).enemyType == strongAgainst){
			other.gameObject.GetComponent(Stats).health -= damage * superEffectiveCoef;
			other.gameObject.GetComponent(Stats).hitWithWeakness = true;
			InstantiateSuperEffectiveSystem(other);
			Debug.Log("SUPER EFFECTIVE");
		} else {
			other.gameObject.GetComponent(Stats).health -= damage;
		}
	} else if (other.transform.parent != null){
		if (other.transform.parent.gameObject.GetComponent(Stats) != null){
			if (other.transform.parent.gameObject.GetComponent(Stats).enemyType == strongAgainst){
				other.transform.parent.gameObject.GetComponent(Stats).health -= damage*superEffectiveCoef;
				other.transform.parent.	gameObject.GetComponent(Stats).hitWithWeakness = true;
				InstantiateSuperEffectiveSystem(other);
				Debug.Log("SUPER EFFECTIVE");
			} else {
				other.transform.parent.gameObject.GetComponent(Stats).health -= damage;
			}
		}
	} else {
		Debug.Log("other and its parents has no stats");
	}
}

private var thisExplosionEffect : GameObject; 
function Explode (){
	var l = Mathf.Lerp(0,explosionRadius, Time.time);
	gameObject.GetComponent(SphereCollider).enabled = true;
	gameObject.GetComponent(SphereCollider).radius = l;
	if (l == explosionRadius){
		gameObject.GetComponent(Stats).health = -1;
	
	}
}	

function CheckStats(){
	damage = gameObject.GetComponent(Stats).damage;
}

function InstantiateSuperEffectiveSystem (other : Collider) {
		if (other.gameObject.GetComponent(DealDamage).effectiveDebris != null){
			var instance : GameObject = Instantiate(other.gameObject.GetComponent(DealDamage).effectiveDebris, 
					transform.position,
					Quaternion.identity);
			instance.transform.parent = other.transform;
			instance.transform.rotation = Quaternion.Euler(transform.rotation.y - 180, 270, 90);
	//		Debug.Log(instance.name);
			Destroy(instance, 3);
		}
}
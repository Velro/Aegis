#pragma strict
/*
* Collision handler. All objects should have this as well as Stats. This only handles damage to itself. If health gets below 0 an explosion
* effect will occur if provided and the object is destroyed. Bullets are summarily destroyed on any impact. 
*/


var explosion : GameObject; //explosion effect
var destructionTime : float = 4;	//delay on destroying the explosion effect object (cleaning up)
var explosionPosition : Vector3 = Vector3.zero; //explosion position offset if we need it in case the origin isn't centered *cough*
private var damage : float;
private var player : GameObject;
var damageEffects : boolean = true;
var whiteEffect : Material;
var redEffect : Material;
var beginFlashingRed : boolean = false;
private var flashingRed : boolean = false; 
private var r : Renderer;
private var m : Material[];
var currentHealth : float;
private var flashingWhite : boolean = false;
private var beganFlashing : float;
private var flashDuration : float;

function Awake () {
	flashDuration = 0.1;
	player = GameObject.FindWithTag("Player");
	if (damageEffects == true){
		whiteEffect = Resources.Load("Materials/flash_white_mat", Material);
		redEffect = Resources.Load("Materials/flash_red_mat", Material);
		r =  gameObject.GetComponentInChildren(Renderer);
		m = r.materials;
	}
	currentHealth = FindHealth();
}


function OnCollisionEnter (other : Collision){
	if (explosion != null && other.gameObject.name != gameObject.name){ //damage isn't dealt to collisions with other objects of the same name. This will prevent tight packs of enemies killing themselves.
		
		if (other.gameObject.GetComponent(Stats)!= null){
			damage = other.gameObject.GetComponent(Stats).damage; //retrieve how much damage "other" does
		} else if (other.transform.parent.gameObject.GetComponent(Stats) != null){
			damage = other.transform.parent.gameObject.GetComponent(Stats).damage;
			//Debug.Log("parent's damage grabbed");
		} else {
			//Debug.Log("No Stats on gameObject or parent");
		}
		
		if (gameObject.GetComponent(Stats) != null){
			gameObject.GetComponent(Stats).health -= damage;
		} else if (transform.parent.gameObject.GetComponent(Stats) != null && other.transform.parent != transform.parent){
			transform.parent.gameObject.GetComponent(Stats).health -= damage;
			//Debug.Log("Child of "+transform.parent.gameObject.name+" hit");	
		}
		if (other.gameObject.tag == "Bullet"){
			Destroy (other.gameObject);
		}
	}
	if (gameObject.tag == "Player"){
		//Debug.Log("Player hitting "+other.gameObject.name);
	}
}

function Update () {

	if (FindHealth() <= 0){
		var clone : GameObject;
		clone = Instantiate (explosion, transform.position+explosionPosition, Quaternion.identity);
		if (gameObject.GetComponent(CreditsDispenser) != null){
			gameObject.GetComponent(CreditsDispenser).RollToDrop();
		}
		if (player!= null){
			var exp : float = 0;
			if (gameObject.GetComponent(Stats) != null){
				exp = gameObject.GetComponent(Stats).exp;
			} else if (transform.parent.gameObject.GetComponent(Stats) != null){
				exp = transform.parent.gameObject.GetComponent(Stats).exp;
			}
			player.GetComponent(PlayerStats).GiveExp(exp, Time.time);
			
		}
		Destroy (clone, destructionTime); //kill explosion effect after delay
		Destroy (gameObject);
	}
	if (damageEffects == true){
		/**** Flash White ****/
		if (currentHealth > FindHealth()){
			currentHealth = FindHealth();
			beganFlashing = Time.time + flashDuration;
			flashingWhite = true;
		}
		if (flashingWhite == true && Time.time < beganFlashing){
			FlashWhite();	
		}
		if (flashingWhite == true && Time.time > beganFlashing){   
			r.materials = m; 
			flashingWhite = false;
		}
		/**** Flash Red ****/
		if (beginFlashingRed == true){
			beganFlashing = Time.time + flashDuration;
			beginFlashingRed = false;
			flashingRed = true;
		}
		if (flashingRed == true && Time.time < beganFlashing){
			FlashRed();	
		}
		if (flashingRed == true && Time.time > beganFlashing){   
			r.materials = m; 
			flashingRed = false;
		}
	}
}

function FindHealth () {
	var health : float;
	if (gameObject.GetComponent(Stats) != null){
		health = gameObject.GetComponent(Stats).health;
	} else if (transform.parent.gameObject.GetComponent(Stats) != null){
		health = transform.parent.gameObject.GetComponent(Stats).health;
	} else {
		Debug.Log("No stats found");
	}
	return health;
}

var bool : boolean = true;
var lastFlash : float = 0;
var newMats : Material[];
function FlashWhite () {
	if (bool == false && Time.time > lastFlash){
		newMats = new Material[r.materials.length];
		for (var i : int = 0; i < r.materials.length; i++){
			newMats[i] = whiteEffect;
		}
		r.materials = newMats;
		lastFlash = Time.time + 0.02;
		bool = !bool;
	}
	if (bool == true && Time.time > lastFlash){
		r.materials = m; 
		lastFlash = Time.time + 0.02;
		bool = !bool;
	}
}

var bool1 : boolean = true;
var lastFlash1 : float = 0;
var newMats1 : Material[];
function FlashRed () {
	if (bool1 == false && Time.time > lastFlash1){
		newMats1 = new Material[r.materials.length];
		for (var i : int = 0; i < r.materials.length; i++){
			newMats1[i] = redEffect;
		}
		r.materials = newMats1;
		lastFlash1 = Time.time + 0.05;
		bool1 = !bool1;
	}
	if (bool1 == true && Time.time > lastFlash1){
		r.materials = m; 
		lastFlash1 = Time.time + 0.05;
		bool1 = !bool1;
	}
}









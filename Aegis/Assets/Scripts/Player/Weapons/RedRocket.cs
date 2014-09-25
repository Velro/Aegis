using UnityEngine;
using System.Collections;

public class RedRocket : MonoBehaviour 
{
    public Weapon redRocket = new Weapon();
    public GameObject canister;
    public GameObject path;
    public AudioClip fire; 
    public GameObject nozzle;
    private GameObject thisRocket;

    public float lifeTime1 = 2;
    public float lifeTime2 = 3;
    public float lifeTime3 = 4;
    public float lifeTime4 = 5;
    private float lifeTime;

    void Awake()
    {
        redRocket.Awake();
    }

    void Start () 
    {
	    canister = Resources.Load<GameObject>("Prefabs/redRocket");
	    nozzle = GameObject.Find("nozzle").gameObject;
	
	    //thisPath.transform.parent = nozzle;
    }


    void Update () 
    {
	    if ((Input.GetButtonDown("Fire3") || Input.GetButtonDown("joystick button 4")) 
			    && !gameObject.GetComponent<PlayerStats>().overheat //make sure we're not overheating
			    && Time.time - redRocket.currentLevel.ltShot > redRocket.currentLevel.cooldown)
	    {
            if (redRocket.level == 0) lifeTime = lifeTime1;
            if (redRocket.level == 1) lifeTime = lifeTime2;
            if (redRocket.level == 2) lifeTime = lifeTime3;
            if (redRocket.level == 3) lifeTime = lifeTime4;
		    thisRocket = Instantiate(canister, nozzle.transform.position, Quaternion.Euler(new Vector3(0,90,0))) as GameObject;
		    //thisRocket.transform.parent = nozzle;
		    thisRocket.GetComponent<RedRocketInstance>().CollisionDamage = redRocket.currentLevel.damage;
            thisRocket.GetComponent<RedRocketInstance>().lifeTime = lifeTime;
		    redRocket.currentLevel.ltShot = Time.time;
		    gameObject.GetComponent<PlayerStats>().heat += redRocket.currentLevel.heatCost;
	    }
    }
}

using UnityEngine;
using System.Collections;

public class FusionBeam : MonoBehaviour 
{

    GameObject beamObj;
    GameObject beamCharging;
    public Weapon fusionBeam = new Weapon();
    public AudioClip blast;
    PlayerStats playerStats;
    //var size : Vector2;
    public float chargeTime;
    public float duration;
    float currentChargeTime = 0; //private
    float currentShootTime = 0; //private
    bool instantiateBeamOnce = false;
    bool instantiateChargingOnce = false;
    float instantiateChargingOnceTime = 0;
    public GameObject nozzle;
    Vector3 level0Size = new Vector3(1.5f, 4, 2);
    Vector3 level1Size = new Vector3(1.75f, 4, 3);
    Vector3 level2Size = new Vector3(2, 4, 4);
    Vector3 level3Size = new Vector3(2.25f, 4, 5);

    void Awake()
    {
        fusionBeam.Awake();
    }

    void Start () 
    {
	    beamObj = Resources.Load<GameObject>("Prefabs/FusionBeam");
	    beamCharging = Resources.Load<GameObject>("Prefabs/BeamCharging");
	    playerStats = GetComponent<PlayerStats>();
	    nozzle = GameObject.Find("nozzle");
    }

    private GameObject thisBeam;
    private GameObject thisBeamCharging;
    void Update ()
    {
	    if (((Input.GetButton("Fire2") && InputCoordinator.usingMouseAndKeyboard) || (InputCoordinator.usingController && (Input.GetAxis("3rd axis") > 0.5 || Input.GetButtonDown("Fire2")))) 
			    && !GetComponent<PlayerStats>().overheat //make sure we're not overheating
			    && Time.time - fusionBeam.currentLevel.ltShot > fusionBeam.currentLevel.cooldown)
	    {
            //Debug.Log("charging");
		    if (currentChargeTime  < chargeTime)
            {
			    if (instantiateChargingOnce == false)
                {
                    
				    thisBeamCharging = Instantiate(beamCharging, nozzle.transform.position, Quaternion.Euler(90,0,0)) as GameObject;
				    instantiateChargingOnce = true;
				    instantiateChargingOnceTime = Time.time;
			    }
			    currentChargeTime += Time.deltaTime;
                if (thisBeamCharging != null)
                {
                    thisBeamCharging.transform.position = nozzle.transform.position;
                    Color color = thisBeamCharging.renderer.material.GetColor("_TintColor");
                    color.a += Time.deltaTime;
                    thisBeamCharging.renderer.material.SetColor("_TintColor", color);
                }

		    }
	    } 
        else if ((currentChargeTime > 0 && instantiateChargingOnce == true && Input.GetButton("Fire2") == false) 
			    || currentChargeTime >= chargeTime)
        { //if button is let go before fully charged, empty
	 	    Destroy(thisBeamCharging);
	 	    instantiateChargingOnce = false;
            //Debug.Log("cut off early");
	     }

	    if (currentChargeTime >= chargeTime)
	    { //charge maxed
		    if (currentShootTime < duration && Input.GetButton("Fire2") && instantiateBeamOnce == false)
            { //start beam
                Destroy(thisBeamCharging);
                print("fusion beam firing");
			    thisBeam = Instantiate(beamObj, nozzle.transform.position, Quaternion.Euler(Vector3.zero)) as GameObject;	
			    instantiateBeamOnce = true;
			    thisBeam.GetComponent<FusionBeamInstance>().CollisionDamage = fusionBeam.currentLevel.damage;
			    if (fusionBeam.level == 0)thisBeam.transform.localScale = level0Size; 
			    if (fusionBeam.level == 1)thisBeam.transform.localScale = level1Size;
			    if (fusionBeam.level == 2)thisBeam.transform.localScale = level2Size;
			    if (fusionBeam.level == 3)thisBeam.transform.localScale = level3Size;
			    //Debug.Log("Beam Instantiated");
			    fusionBeam.currentLevel.ltShot = Time.time;
			    GetComponent<PlayerStats>().heat += fusionBeam.currentLevel.heatCost;	
		    } 
            else if (Input.GetButton("Fire2") && instantiateBeamOnce == true)
            { //tick time shot while held
			    //Debug.Log("tick");
			    currentShootTime += Time.deltaTime;
		    } 
            else if (instantiateBeamOnce == true && Input.GetButton("Fire2") == false)
            { //let Go
			    //Debug.Log("let go during shoot."+"Destroy "+thisBeam.name);
			    Destroy (thisBeam);
			    instantiateBeamOnce = false;
			    currentShootTime = 0;
			    currentChargeTime = 0;
		    }
		    if (currentShootTime >= duration)
            { //held through hold duration
			    //if(thisBeam != null)Debug.Log("end shoot"+"Destroy "+thisBeam.name);
			    Destroy (thisBeam);
			    fusionBeam.currentLevel.ltShot = Time.time;
			    instantiateBeamOnce = false;
			    currentShootTime = 0;
			    currentChargeTime = 0;
		    }	
	    }
    }
}

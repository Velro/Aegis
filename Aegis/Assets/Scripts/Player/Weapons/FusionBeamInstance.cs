using UnityEngine;
using System.Collections;

public class FusionBeamInstance : MonoBehaviour, ICollisionDamage, IKillable 
{
    public float extensionSpeed = 2;
    public float timeExtended = 1;
    public float retractionSpeed = 2;
    public float endWidth = 8;
    [SerializeField]
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    
    GameObject player;
    GameObject nozzle;
    public float offsetFromNozzle = -4;
    WeaponType weaponType = WeaponType.Energy;

    bool extended = false;
    float lerpOut = 0;
    bool retracted = false;
    float lerpIn = 0;
    float ltExtended = 0;

    void Awake () 
    {
	    player = GameObject.FindWithTag("Player");
        nozzle = GameObject.Find("nozzle");
    }

    void Update ()
    {
        if (extended == false)
        {
            lerpOut += Time.deltaTime / extensionSpeed;
            gameObject.transform.localScale = new Vector3(lerpOut * endWidth, gameObject.transform.localScale.y, gameObject.transform.localScale.z);
            if (lerpOut >= 1)
            {
                extended = true;
                ltExtended = Time.time;
            }
        }
        if (extended == true)
        {
            if (Time.time > ltExtended + timeExtended) // begin retracting
            {
                lerpOut -= Time.deltaTime / extensionSpeed;
                gameObject.transform.localScale = new Vector3(lerpOut * endWidth, gameObject.transform.localScale.y, gameObject.transform.localScale.z);
                if (lerpOut <= 0)
                {
                    retracted = true;
                }
            }
        }
        if (retracted)
        {
            Destroy(gameObject);
        }
        Vector3 pos = new Vector3(nozzle.transform.position.x + offsetFromNozzle, nozzle.transform.position.y, nozzle.transform.position.z);
        transform.position = pos;
	    if (player == null)Destroy(gameObject);
    }	

    void OnTriggerStay (Collider other)
    {
        other.SendMessageUpwards("DamageEnergy", CollisionDamage * Time.deltaTime, SendMessageOptions.DontRequireReceiver);
        //other.SendMessageUpwards("Damage", CollisionDamage * Time.deltaTime);
    }

    void OnCollisionEnter(Collision other)
    {
        other.gameObject.SendMessage("Damage", CollisionDamage);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}


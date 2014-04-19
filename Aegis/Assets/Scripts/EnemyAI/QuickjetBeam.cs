using UnityEngine;
using System.Collections;

public class QuickjetBeam : MonoBehaviour, ICollisionDamage, IKillable
{
    public float timeExtending = 2;
    public float timeExtended = 1;
    public float timeRetracting = 2;
    [HideInInspector]
    public Vector3 beamSize = Vector3.zero;
    [HideInInspector]
    public float delayToShoot;
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    [HideInInspector]
    public GameObject player;
    [HideInInspector]
    public GameObject nozzle;
    public float DamageFromShieldCollision = 10;
    bool extended = false;
    float lerp = 0;
    bool retracted = false;
    float ltExtended = 0;
    private float startTime;

    void Start ()
    {
        startTime = Time.time;
    }

    void Update()
    {
        if (Time.time < startTime + delayToShoot)
            return;
        if (extended == false)
        {
            Mathf.Clamp01(lerp += Time.deltaTime / timeExtending);
            gameObject.transform.localScale = new Vector3(lerp * beamSize.x, beamSize.y, beamSize.z);
            if (lerp >= 1)
            {
                extended = true;
                ltExtended = Time.time;
            }
        }
        if (extended == true)
        {
            if (Time.time > ltExtended + timeExtended) // begin retracting
            {
                Mathf.Clamp01(lerp -= Time.deltaTime / timeExtending);
                gameObject.transform.localScale = new Vector3(lerp * beamSize.x, gameObject.transform.localScale.y, gameObject.transform.localScale.z);
                if (lerp <= 0)
                {
                    retracted = true;
                }
            }
        }
        if (retracted)
        {
            Destroy(gameObject);
        }
        Vector3 pos = new Vector3(nozzle.transform.position.x, nozzle.transform.position.y, nozzle.transform.position.z);
        transform.position = pos;
        // if (player == null)Destroy(gameObject);
    }

    void OnTriggerEnter(Collider other)
    {
        if (other.name == "Shield")
            print("hi");
    }

    void OnTriggerStay(Collider other)
    {
        if (other.name == "Shield")
            print("hi");
        if (other.tag == "Shield")
        {
            Debug.Log("blocked");
            extended = true;
            ltExtended = Time.time - timeExtended;
            SendMessageUpwards("Damage", DamageFromShieldCollision);
        }
        else
        {
            other.SendMessageUpwards("DamageEnergy", CollisionDamage * Time.deltaTime, SendMessageOptions.DontRequireReceiver);
        }


        //other.SendMessageUpwards("Damage", CollisionDamage * Time.deltaTime);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}

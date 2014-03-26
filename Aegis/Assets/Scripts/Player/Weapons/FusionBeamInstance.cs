using UnityEngine;
using System.Collections;

public class FusionBeamInstance : MonoBehaviour, ICollisionDamage, IKillable 
{
    [SerializeField]
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    
    GameObject player;
    GameObject nozzle;
    WeaponType weaponType = WeaponType.Energy;

    void Awake () 
    {
	    player = GameObject.FindWithTag("Player");
        nozzle = GameObject.Find("nozzle");
    }

    void Update ()
    {
	    transform.position = nozzle.transform.position;
	    if (player == null)Destroy(gameObject);
    }	

    void OnTriggerStay (Collider other)
    {
        other.SendMessageUpwards("DamageExplosive", CollisionDamage * Time.deltaTime);
        //other.SendMessageUpwards("Damage", CollisionDamage * Time.deltaTime);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}


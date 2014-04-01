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
    public float offsetFromNozzle = -4;
    WeaponType weaponType = WeaponType.Energy;

    void Awake () 
    {
	    player = GameObject.FindWithTag("Player");
        nozzle = GameObject.Find("nozzle");
    }

    void Update ()
    {
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


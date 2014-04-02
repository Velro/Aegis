using UnityEngine;
using System.Collections;


public class SpaceWormSegmentAI : MonoBehaviour, ISpeed, ICollisionDamage, IDamageable<float>, IKillable 
{
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    private float collisionDamage;
    public float CollisionDamage
    {
        get { return collisionDamage; }
        set { collisionDamage = value; }
    }
    private float health;
    public float Health
    {
        get { return health; }
        set { health = value; }
    }
    private GameObject superEffectiveSystem;

    void Awake ()
    {
        Speed = transform.parent.GetComponent<SpaceWormMasterAI>().Speed;
        CollisionDamage = transform.parent.GetComponent<SpaceWormMasterAI>().CollisionDamage;
        superEffectiveSystem = transform.parent.GetComponent<SpaceWormMasterAI>().superEffectiveSystem;
    }
	// Use this for initialization
	void Start () 
    {
	
	}
	
	// Update is called once per frame
	void Update () 
    {
	
	}

    void OnCollisionEnter (Collision other)
    {
        if (other.gameObject.name == "spaceworm_head_mesh" || other.gameObject.name == "spaceworm_middle_mesh")
            return;
        other.gameObject.SendMessage("Damage", collisionDamage, SendMessageOptions.DontRequireReceiver);
        //Debug.Log("worm collided with "+other.gameObject.name);
    }



    public void Damage(float damageTaken)
    {
        transform.parent.SendMessage("Damage", damageTaken);
    }

    public void DamageProjectile(float damageTaken)
    {
        transform.parent.SendMessage("DamageProjectile", damageTaken);
    }

    public void DamageExplosive(float damageTaken)
    {
        transform.parent.SendMessage("DamageExplosive", damageTaken);
        SuperEffectiveSystem();
    }

    public void DamageEnergy(float damageTaken)
    {
        transform.parent.SendMessage("DamageEnergy", damageTaken);
    }

    GameObject instance;
    public void SuperEffectiveSystem()
    {
        instance = GameObject.Instantiate(transform.parent.GetComponent<SpaceWormMasterAI>().superEffectiveSystem, transform.position, transform.rotation) as GameObject;
        Destroy(instance, 2);   
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}

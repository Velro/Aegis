using UnityEngine;
using System.Collections;

public class ArcNadeInstance : MonoBehaviour, ISpeed, ICollisionDamage, IKillable 
{
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    [System.NonSerialized]
    public float lifeTime;
    public float explosionRadius = 10;
    public EnemyType strongAgainst = EnemyType.Armored;
    public WeaponType weaponType = WeaponType.Explosive;
    public float superEffectiveCoef = 2;
    public GameObject explosionEffect;
    private float startTime = 0;

    void Start ()
    {
        startTime = Time.time;
        //Debug.Log(Speed);
    }
    void Update () 
    {
        if (Time.time > startTime + lifeTime)
            Explode();
//	    if (gameObject.GetComponent<CurvePaths>().t == 1)
//        {
//		    Explode();
//	    }
	
    }

    void OnCollisionEnter ()
    {
	    Explode();
    }

    void OnDrawGizmosSelected()
    {
        // Draw a yellow sphere at the transform's position
        Gizmos.color = Color.yellow;
        //Gizmos.DrawSphere(transform.position, explosionRadius);
    }
    void Explode ()
    {
		Collider[] hitColliders = Physics.OverlapSphere(transform.position, explosionRadius);

		for (var i = 0; i < hitColliders.Length; i++) {
            hitColliders[i].SendMessage("DamageExplosive", damage, SendMessageOptions.DontRequireReceiver);
           // Debug.Log("damage message sent");
		}
        Instantiate(explosionEffect, transform.position, transform.rotation);
        Kill();
    }

    private GameObject thisExplosionEffect;
    public void Kill()
    {
        Destroy(gameObject);
        thisExplosionEffect = Instantiate(explosionEffect, transform.position, transform.rotation) as GameObject;
    }
}

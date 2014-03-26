using UnityEngine;
using System.Collections;

public class ArcNadeInstance : MonoBehaviour, IMoves, ICollisionDamage, IKillable 
{
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    [SerializeField]
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    public float explosionRadius = 10;
    public EnemyType strongAgainst = EnemyType.Armored;
    public WeaponType weaponType = WeaponType.Explosive;
    float superEffectiveCoef = 2;

    void Update () {
	    if (gameObject.GetComponent<CurvePaths>().t == 1)
        {
		    Explode();
	    }
	
    }

    void OnCollisionEnter ()
    {
	    Explode();
    }

    void OnTriggerEnter (Collider other)
    {
	    other.SendMessage("Damage", damage);
    }

    private GameObject thisExplosionEffect; 
    void Explode ()
    {
	    float l = Mathf.Lerp(0,explosionRadius, Time.time);
	    gameObject.GetComponent<SphereCollider>().enabled = true;
	    gameObject.GetComponent<SphereCollider>().radius = l;
	    if (l == explosionRadius){
            Kill();
	
	    }
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}

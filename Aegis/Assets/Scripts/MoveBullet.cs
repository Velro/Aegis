using UnityEngine;
using System.Collections;

public class MoveBullet : MonoBehaviour, IKillable, IMoves, ICollisionDamage {
    [SerializeField]
    private float damage;
    public float CollisionDamage
    {
        get { return damage; }
        set { damage = value; }
    }
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    public bool left = false;
    public bool right = true;
    EnemyType strongAgainst = EnemyType.Organic;
    WeaponType weaponType = WeaponType.Projectile;

    void Update () {
	    if (right)
		    transform.position += transform.right * Speed * Time.deltaTime;
        //Debug.Log(speed);
	    if (left)
		    transform.position -= transform.right * Speed * Time.deltaTime;
    }

    void OnTriggerEnter (Collider other) {
        other.SendMessageUpwards("DamageProjectile", CollisionDamage);
	    if (gameObject != null)Destroy (gameObject);
        Kill();
    }

    
    public void Kill ()
    {
        Destroy(gameObject);
    }
}

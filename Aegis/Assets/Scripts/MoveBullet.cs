using UnityEngine;
using System.Collections;

public class MoveBullet : MonoBehaviour, IKillable, IMoves, ICollisionDamage {
    public float Damage
    {
        get { return damage; }
        set { }
    }
    public float damage;
    public float speed;
    public float Speed
    {
        get { return speed; }
        set { }
    }
    float collisionDamage;
    bool left = false;
    bool right = false;
    EnemyType strongAgainst = EnemyType.Organic;
    WeaponType weaponType = WeaponType.Projectile;

    void Update () {
	    if (right)
		    transform.position += transform.right * speed * Time.deltaTime;
	    if (left)
		    transform.position -= transform.right * speed * Time.deltaTime;
    }

    void OnTriggerEnter (Collider other) {
        other.SendMessageUpwards("Damage", collisionDamage);
	    if (gameObject != null)Destroy (gameObject);
        Kill();
    }

    
    public void Kill ()
    {
        Destroy(gameObject);
    }
}

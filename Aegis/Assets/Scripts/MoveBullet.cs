
using UnityEngine;
using System.Collections;

public class MoveBullet : MonoBehaviour, IKillable, ISpeed, ICollisionDamage 
{
    public Vector3 d = Vector3.zero;
    public Vector3 r = Vector3.zero;
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

    void Start ()
    {
        rigidbody.AddForce(-transform.right * 100, ForceMode.VelocityChange);
    }

    void FixedUpdate ()
    {
        //rigidbody.AddForce(-transform.right * 100, ForceMode.Force);
    }

    void Update () 
    {
        
	   // if (right)
            
		    //transform.position += transform.right * Speed * Time.deltaTime;
        //Debug.Log(speed);
	  //  if (left)
		   // transform.position -= transform.right * Speed * Time.deltaTime;
    }

    void OnTriggerEnter (Collider other) 
    {
        other.SendMessage("DamageProjectile", CollisionDamage, SendMessageOptions.DontRequireReceiver);
	    if (gameObject != null)Destroy (gameObject);
        //Kill();
    }

    void OnCollisionEnter(Collision other)
    {
        other.gameObject.SendMessage("DamageProjectile", CollisionDamage, SendMessageOptions.DontRequireReceiver);
        //if (gameObject != null) Destroy(gameObject);
        //Kill();
        if (other.gameObject.name == "Shield")
        {
            d = other.transform.position - transform.position;
            r = Vector3.Reflect(d, Vector3.right);
            rigidbody.AddForce(r * 100, ForceMode.VelocityChange);
        }
    }
    
    public void Kill ()
    {
        Destroy(gameObject);
    }
}
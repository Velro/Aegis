using UnityEngine;
using System.Collections;

public class SpaceWormMasterAI : MonoBehaviour, ISpeed, ICollisionDamage, IDamageable<float>, IKillable, IGivesExp<float>
{
    [SerializeField]
    private float expGiven = 40;
    public float ExpGiven
    {
        get { return expGiven; }
        set { expGiven = value; }
    }
    [SerializeField]
    private float speed;
    public float Speed
    {
        get { return speed; }
        set { speed = value; }
    }
    [SerializeField]
    private float collisionDamage;
    public float CollisionDamage
    {
        get { return collisionDamage; }
        set { collisionDamage = value; }
    }
    [SerializeField]
    private float health;
    public float Health
    {
        get { return health; }
        set { health = value; }
    }
    public float superEffectiveCoef = 2;
    public GameObject superEffectiveSystem;

    public Material whiteFlash;
    public Material redFlash;
    public float flashDuration = 0.1f;
    private Material[] defaultMats;
    private Renderer[] childRenderers;

    void Start ()
    {
            childRenderers = gameObject.GetComponentsInChildren<Renderer>();
            defaultMats = new Material[childRenderers.Length];
            for(int i = 0; i < childRenderers.Length; i++)
            {
                defaultMats[i] = childRenderers[i].material;
            }
    }
	
	// Update is called once per frame
	void Update () 
    {
	    if (health <= 0)
        {
            GiveExp(expGiven);
            Kill();
            if (transform.childCount == 0)
                Destroy(gameObject);
        }
	}

    public void Damage(float damageTaken)
    {
        health -= damageTaken;
        StartCoroutine(Flash(whiteFlash, flashDuration));
    }

    public void DamageProjectile(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageExplosive(float damageTaken)
    {
        health -= damageTaken * superEffectiveCoef;
        StartCoroutine(Flash(redFlash, flashDuration));
    }

    public void DamageEnergy(float damageTaken)
    {
        Damage(damageTaken);
    }

    IEnumerator Flash(Material mat, float duration)
    {
        foreach (Renderer r in childRenderers)
        {
            r.material = mat;
        }
        yield return new WaitForSeconds(duration);
        for(int i = 0; i < childRenderers.Length; i++)
        {
            childRenderers[i].material = defaultMats[i];
        }
    }


    public void SuperEffectiveSystem()
    {
        
    }

    public void Kill()
    {
        for (int i = 0; i < transform.childCount; i++)
        {
            transform.GetChild(i).SendMessage("Kill", SendMessageOptions.DontRequireReceiver);
        }
    }

    public void GiveExp(float expGiven)
    {
        GameObject.FindGameObjectWithTag("Player").SendMessage("GiveExp", expGiven);
    }
}

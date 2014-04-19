using UnityEngine;
using System.Collections;

public class QuickjetAI : MonoBehaviour, ICollisionDamage, IKillable, IDamageable<float>, IGivesExp<float> 
{
    public float portFrequency = 0;
    public float portMinRange;
    public float portMaxRange;
    public float beamDamage;
    public float delayToShoot = 0.2f;
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
    [SerializeField]
    private float expGiven;
    public float ExpGiven
    {
        get { return expGiven; }
        set { expGiven = value; }
    }
    public float superEffectiveMod = 2;
    GameObject player;
    public GameObject beam;	//gameObject to be used. should be a prefab
    public GameObject superEffectiveParticleSystem;
    public AudioClip beamSound;
    private float lastTeleported = 0;

    public Material whiteFlash;
    public Material redFlash;
    public float flashDuration = 0.1f;
    private Material defaultMat;
    public Vector3 beamSize = new Vector3(10, 4, 2);
    public GameObject nozzle;

    void Start()
    {
        player = GameObject.FindGameObjectWithTag("Player");
        defaultMat = gameObject.GetComponentInChildren<Renderer>().material;
    }

    void Update()
    {
        if (Time.time > lastTeleported + portFrequency)
        {
            Teleport();
            lastTeleported = Time.time;
//            print("tele");
        }

        if (health <= 0)
        {
            GiveExp(ExpGiven);
            Kill();
        }
    }

    public void DamageProjectile(float damageTaken)
    {
        health -= damageTaken * superEffectiveMod;
        SuperEffectiveSystem();
        StartCoroutine(Flash(redFlash, flashDuration));
    }

    public void DamageExplosive(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void DamageEnergy(float damageTaken)
    {
        Damage(damageTaken);
    }

    public void SuperEffectiveSystem()
    {
        GameObject inst = Instantiate(superEffectiveParticleSystem, transform.position, transform.rotation) as GameObject;
        Destroy(inst, 5);

    }

    public void Damage(float damageTaken)
    {
        health -= damageTaken;
        StartCoroutine(Flash(whiteFlash, flashDuration));
    }

    void OnCollisionEnter(Collision other)
    {
        other.gameObject.SendMessage("Damage", CollisionDamage, SendMessageOptions.DontRequireReceiver);
    }

    IEnumerator Flash(Material mat, float duration)
    {
        gameObject.GetComponentInChildren<Renderer>().material = mat;
        yield return new WaitForSeconds(duration);
        gameObject.GetComponentInChildren<Renderer>().material = defaultMat;
    }

    void Teleport()
    {
        //teleport
        Vector2 newPoint = Random.insideUnitCircle * portMaxRange;
        newPoint = ClampUnitCirclePoint(newPoint, portMinRange, portMaxRange);
        Vector3 newPosition = new Vector3(newPoint.x, 0, newPoint.y) + player.transform.position;
        transform.position = newPosition;
        transform.LookAt(player.transform, Vector3.up);
        //shoot
        GameObject instance;
        instance = Instantiate(beam, transform.position, Quaternion.Euler(transform.eulerAngles.x, transform.eulerAngles.y - 90, transform.eulerAngles.z)) as GameObject; //  * Quaternion.Euler(0, scrollAdjust, 0)
        instance.GetComponent<QuickjetBeam>().delayToShoot = delayToShoot;
        instance.GetComponent<QuickjetBeam>().beamSize = beamSize;
        instance.GetComponent<QuickjetBeam>().CollisionDamage = beamDamage;
        instance.GetComponent<QuickjetBeam>().nozzle = nozzle;
        audio.PlayOneShot(beamSound);
    }

    Vector2 ClampUnitCirclePoint (Vector2 p, float min, float max)
    {
        Vector2 newPoint = new Vector2();
        if (p.x < 0)
            newPoint.x = Mathf.Clamp(p.x, -max, -min);
        if (p.y < 0)
            newPoint.y = Mathf.Clamp(p.y, -max, -min);
        if (p.x > 0)
            newPoint.x = Mathf.Clamp(p.x, min, max);
        if (p.y > 0)
            newPoint.y = Mathf.Clamp(p.y, min, max);

        return newPoint;
    }

    public void GiveExp(float exp)
    {
        player.SendMessage("GiveExp", exp);
    }

    public void Kill()
    {
        Destroy(gameObject);
    }
}

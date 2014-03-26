using UnityEngine;
using System.Collections;

public class PlayerStats : MonoBehaviour, IKillable, IDamageable<float> 
{
    [SerializeField]
    private float health;
    public float Health
    {
        get { return health; }
        set { health = value; }
    }
    
    public float maxHealth;
    public float speed = 5;
    public float heat = 10;
    public float maxHeat = 100;
    public float heatCooldownRate = 1;
    public bool overheat = false;
    public float overheatTime = 1;
    float ltOverheat = 0;
    public float speedReduction = 0.5f;

    public float expWindow = 2;

    public bool invincible = false;

    public static int totalCredit = 5000; //convert to playerPrefs
    public int creditsThisLevel = 0;

    public AudioClip levelUp;

    Component[] weapons;
	
	// Update is called once per frame
	void Update () 
    {
        if (heat > 0 && heat != maxHeat) //cooldown
            heat = Mathf.MoveTowards(heat, 0, heatCooldownRate * Time.deltaTime);
        if (heat > maxHeat)             //overheated!
        {
            heat = maxHeat;
            overheat = true;
            ltOverheat = Time.time;
            speed *= speedReduction;
        }
        if (overheat && Time.time - ltOverheat >= overheatTime)
        {
            overheat = false;
            heat = 99.9f;
            speed /= speedReduction;
        }
        if (invincible)
            health = 100;
	}

    public void Damage(float damage)
    {
        Health = Health - damage;
    }
    public void GiveExp (float exp, float time){
	   // foreach (Component weapon in weapons){
		//    if (Time.time - weapon.currentLevel.lastShot < expWindow){
		//	    weapon.currentExp += exp;
		//    }
	   // }
    }
    public void Kill()
    {
        
    }



    public void DamageProjectile(float damageTaken)
    {
        Damage(damageTaken);
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
    }
}

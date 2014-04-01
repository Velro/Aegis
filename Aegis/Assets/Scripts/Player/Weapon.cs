using UnityEngine;
using System.Collections;

[System.Serializable]
public class Weapon
{
   public int level = 0;
    public string name;
    public WeaponLevel level0;
    public WeaponLevel level1;
    public WeaponLevel level2;
    public WeaponLevel level3;
    public WeaponType weaponType = WeaponType.Projectile;

    public WeaponLevel currentLevel;
    public float currentExp;

    public void Awake()
    {
        currentLevel = level0;
    }

    public void CheckForLevelUp (GameObject cam)
    {
        
        if (currentExp >= currentLevel.expToNext)
        {
            level++;
            currentExp = 0;
            cam.SendMessage("SetLevelledName", name);
            cam.SendMessage("SetLevelledLevel", level);
            cam.SendMessage("SetLevelledTime", Time.time);
        }
        if (level == 1)
            currentLevel = level1;
        if (level == 2)
            currentLevel = level2;
        if (level == 3)
            currentLevel = level3;
    }

    public void GiveExp(float exp)
    {
        currentExp += exp;
    }
}

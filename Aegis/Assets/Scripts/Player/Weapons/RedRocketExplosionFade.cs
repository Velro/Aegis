using UnityEngine;
using System.Collections;

public class RedRocketExplosionFade : MonoBehaviour 
{
    public float durationOfFade = 1;
    public float delayToFade = 1;
    float startTime = 0;
    float t = 0;

    public GameObject toFade;
	// Use this for initialization
	void Start () 
    {
        startTime = Time.time;
	}
	
	// Update is called once per frame
	void Update () 
    {
	    if (Time.time > startTime + delayToFade)
        {
            t += Time.deltaTime / durationOfFade;
            t = Mathf.Clamp01(t);
            toFade.renderer.material.SetColor("_TintColor", new Color(toFade.renderer.material.GetColor("_TintColor").r,
                                                                    toFade.renderer.material.GetColor("_TintColor").g,
                                                                    toFade.renderer.material.GetColor("_TintColor").b,
                                                                    Mathf.Lerp(1, 0, t)));
        }
        if (t <= 0)
        {
            Destroy(gameObject);
            print("hit");
        }

	}
}

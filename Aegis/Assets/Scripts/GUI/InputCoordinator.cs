using UnityEngine;
using System.Collections;

public class InputCoordinator : MonoBehaviour 
{
    public static bool usingMouseAndKeyboard = false;
    public static bool usingController = false;

	// Use this for initialization
	void Start () 
    {
        if (PlayerPrefs.GetInt("usingController") == 0)
            usingController = false;
        if (PlayerPrefs.GetInt("usingController") == 1)
            usingController = true;
        if (PlayerPrefs.GetInt("usingMouseAndKeyboard") == 0)
            usingMouseAndKeyboard = false;
        if (PlayerPrefs.GetInt("usingMouseAndKeyboard") == 1)
            usingMouseAndKeyboard = true;
	}
	
	// Update is called once per frame
	void Update () 
    {
	

	}

    public void SwitchToMouseAndKeyboard ()
    {
        PlayerPrefs.SetInt("usingMouseAndKeyboard", 1);
        PlayerPrefs.SetInt("usingController", 0);
        usingMouseAndKeyboard = true;
        usingController = false;
        PlayerPrefs.Save();
    }

    public void SwitchToController ()
    {
        PlayerPrefs.SetInt("usingMouseAndKeyboard", 0);
        PlayerPrefs.SetInt("usingController", 1);
        usingMouseAndKeyboard = false;
        usingController = true;
        PlayerPrefs.Save();
    }
}

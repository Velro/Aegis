// C# example:
using UnityEngine;
using UnityEditor;
public class MyWindow : EditorWindow
{
    bool usingController = false;
    bool usingMouseAndKeyboard = false;

    // Add menu named "My Window" to the Window menu
    [MenuItem("Window/Input Options")]
    static void Init()
    {
        // Get existing open window or if none, make a new one:
            MyWindow window = (MyWindow)EditorWindow.GetWindow(typeof(MyWindow));
    }
    
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

    void OnGUI()
    {
        GUILayout.Label("PlayerPrefs", EditorStyles.boldLabel);

        usingController = EditorGUILayout.Toggle("Using Controller", usingController);
        usingMouseAndKeyboard = EditorGUILayout.Toggle("Using Mouse and Keyboard", usingMouseAndKeyboard);
    }

    void Update ()
    {
        if (usingController == true && PlayerPrefs.GetInt("usingController") == 0)
        {
            PlayerPrefs.SetInt("usingController", 1);
            PlayerPrefs.SetInt("usingMouseAndKeyboard", 0);
            usingMouseAndKeyboard = false;
            PlayerPrefs.Save();
        }

        if (usingMouseAndKeyboard == true && PlayerPrefs.GetInt("usingMouseAndKeyboard") == 0)
        {
            PlayerPrefs.SetInt("usingMouseAndKeyboard", 1);
            PlayerPrefs.SetInt("usingController", 0);
            usingController = false;
            PlayerPrefs.Save();
        }
    }
}

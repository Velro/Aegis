using UnityEngine;
using System.Collections;

[System.Serializable]
public class JoyGUIButton 
{
    public GUIStyle up;
    public GUIStyle hover;
    public GUIStyle down;
    Texture check;
    public string text;
    public Rect buttonRect;
    bool isPressed;
    bool isFocused;
    public bool enabled;
    bool bought;

    public JoyGUIButton(Rect rect, string label)
    {
		text = label;
		buttonRect = rect;
		isPressed = false;
		isFocused = false;
		enabled = true;
	}

	public void Display()
    {
		if (bought)
        {
			check = GUI.skin.customStyles[0].normal.background;
			GUI.Label(buttonRect, check);
			GUI.Label(buttonRect, text);
		} else 
        {
			if(enabled)
            {
				//up = GUI.skin.button.normal.background as Texture;	
				//hover = GUI.skin.button.hover.background as Texture; 
				//down = GUI.skin.button.active.background as Texture;
				if (!isFocused && !isPressed)
                {
					GUI.Label(buttonRect,"", up);
					GUI.skin.label.normal.textColor = GUI.skin.button.normal.textColor;
					GUI.Label(buttonRect,text);
				} 
                else if (isFocused && !isPressed)
                {
                    GUI.Label(buttonRect, "", hover);
					GUI.skin.label.normal.textColor = GUI.skin.button.hover.textColor;
					GUI.Label(buttonRect,text);
				} 
                else if (isFocused && isPressed)
                {
                    GUI.Label(buttonRect, "", down);
					GUI.skin.label.normal.textColor = GUI.skin.button.active.textColor;
					GUI.Label(buttonRect,text);
				}
			}
		}
	}

	public void Focus(bool fo)
    {
		isFocused = fo;
	}
	
	public void Focus()
    {
		isFocused = true;
	}

	public bool Click()
    {
		if(isFocused)
        {
			isPressed = true;
			return true;
		}
		return false;
	}

	public void UnClick()
    {
		if(isPressed)
			isPressed = false;
	}
}

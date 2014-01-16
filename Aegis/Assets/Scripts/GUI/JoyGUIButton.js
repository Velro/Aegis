#pragma strict
//Largely credited to Alex Hackl on unifycommunity
var Up : Texture;
var Hover : Texture;
var Down : Texture;
var Check : Texture;
var text : String;
var buttonRect : Rect;
var isPressed : boolean;
var isFocused : boolean;
var enabled : boolean; 
var bought : boolean;

class JoyGUIButton{
	function JoyGUIButton(rect : Rect, label : String){
		text = label;
		buttonRect = rect;
		isPressed = false;
		isFocused = false;
		enabled = true;
	}

	function Display(){
		if (bought){
			Check = GUI.skin.customStyles[0].normal.background;
			GUI.DrawTexture(buttonRect, Check);
			GUI.Label(buttonRect, text);
		} else {
			if(enabled){
				Up = GUI.skin.button.normal.background as Texture;	
				Hover = GUI.skin.button.hover.background as Texture; 
				Down = GUI.skin.button.active.background as Texture;
				if (!isFocused && !isPressed){
					GUI.DrawTexture(buttonRect,Up);
					GUI.skin.label.normal.textColor = GUI.skin.button.normal.textColor;
					GUI.Label(buttonRect,text);
				} else if (isFocused && !isPressed){
					GUI.DrawTexture(buttonRect,Hover);
					GUI.skin.label.normal.textColor = GUI.skin.button.hover.textColor;
					GUI.Label(buttonRect,text);
				} else if (isFocused && isPressed){
					GUI.DrawTexture(buttonRect,Down);
					GUI.skin.label.normal.textColor = GUI.skin.button.active.textColor;
					GUI.Label(buttonRect,text);
				}
			}
		}
	}

	function Focus(fo : boolean){
		isFocused = fo;
	}
	
	function Focus(){
		isFocused = true;
	}

	function Click(){
		if(isFocused){
			isPressed = true;
			return true;
		}
		return false;
	}

	function UnClick(){
		if(isPressed){
			isPressed = false;
		}
	}
}
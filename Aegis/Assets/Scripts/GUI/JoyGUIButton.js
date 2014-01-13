#pragma strict
//Largely credited to Alex Hackl on unifycommunity
var Up : Texture2D;
var Hover : Texture2D;
var Down : Texture2D;
var text : String;
var buttonRect : Rect;
var isPressed : boolean;
var isFocused : boolean;

class JoyGUIButton(rect : Rect, label : String){
	enabled = true;
	text = label;
	buttonRect = rect;
	isPressed = false;
	isFocused = false;
};

function Display(){
	if(enabled){
		GUI.skin.button.normal.background = Up;
		GUI.skin.button.hover.background = Hover;
		GUI.skin.button.active.background = Down;

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

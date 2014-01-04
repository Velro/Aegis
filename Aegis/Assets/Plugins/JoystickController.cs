using UnityEngine;
using System.Collections;

public class JoystickController : MonoBehaviour {
	
	/// <summary>
	/// This is a joystick detect demo/project. Made by project Team Unity~ from the Entertainment Technology Center at Carnegie Mellon.
	/// The purpose for this demo/project is to understand what is the mapping for you joystick. 
	/// </summary>
	
	string currentButton;
	string currentAxis;
	float axisInput;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () 
	{
		//getAxis();
		//getButton();
		
	
	}
	
	/// <summary>
	/// Get Axis data of the joysick
	/// </summary>
	void getAxis()
	{
		if(Input.GetAxisRaw("X axis")> 0.3|| Input.GetAxisRaw("X axis") < -0.3)
		{
			currentAxis = "X axis";
			axisInput = Input.GetAxisRaw("X axis");
		}
		
		if(Input.GetAxisRaw("Y axis")> 0.3|| Input.GetAxisRaw("Y axis") < -0.3)
		{
			currentAxis = "Y axis";
			axisInput = Input.GetAxisRaw("Y axis");
		}
		
		if(Input.GetAxisRaw("3rd axis")> 0.3|| Input.GetAxisRaw("3rd axis") < -0.3)
		{
			currentAxis = "3rd axis";
			axisInput = Input.GetAxisRaw("3rd axis");
		}
		
		if(Input.GetAxisRaw("4th axis")> 0.3|| Input.GetAxisRaw("4th axis") < -0.3)
		{
			currentAxis = "4th axis";
			axisInput = Input.GetAxisRaw("4th axis");
		}
		
		if(Input.GetAxisRaw("5th axis")> 0.3|| Input.GetAxisRaw("5th axis") < -0.3)
		{
			currentAxis = "5th axis";
			axisInput = Input.GetAxisRaw("5th axis");
		}
		
		if(Input.GetAxisRaw("6th axis")> 0.3|| Input.GetAxisRaw("6th axis") < -0.3)
		{
			currentAxis = "6th axis";
			axisInput = Input.GetAxisRaw("6th axis");
		}
		
		if(Input.GetAxisRaw("7th axis")> 0.3|| Input.GetAxisRaw("7th axis") < -0.3)
		{
			currentAxis = "7th axis";
			axisInput = Input.GetAxisRaw("7th axis");
		}
		
		if(Input.GetAxisRaw("8th axis") > 0.3|| Input.GetAxisRaw("8th axis") < -0.3)
		{
			currentAxis = "8th axis";
			axisInput = Input.GetAxisRaw("8th axis");
		}
	}
	
	/// <summary>
	/// get the button data of the joystick
	/// </summary>
	void getButton()
	{
		if(Input.GetButton("joystick button 0"))
			currentButton = "joystick button 0";
		   
		if(Input.GetButton("joystick button 1"))
			currentButton = "joystick button 1";
		   
		if(Input.GetButton("joystick button 2"))
			currentButton = "joystick button 2";
		   
		if(Input.GetButton("joystick button 3"))
			currentButton = "joystick button 3";
		   
		if(Input.GetButton("joystick button 4"))
			currentButton = "joystick button 4";
		   
		if(Input.GetButton("joystick button 5"))
			currentButton = "joystick button 5";
		   
		if(Input.GetButton("joystick button 6"))
			currentButton = "joystick button 6";
		   
		if(Input.GetButton("joystick button 7"))
			currentButton = "joystick button 7";
		   
		if(Input.GetButton("joystick button 8"))
			currentButton = "joystick button 8";
		   
		if(Input.GetButton("joystick button 9"))
			currentButton = "joystick button 9";
		   
		if(Input.GetButton("joystick button 10"))
			currentButton = "joystick button 10";
		   
		if(Input.GetButton("joystick button 11"))
			currentButton = "joystick button 11";
		   
		if(Input.GetButton("joystick button 12"))
			currentButton = "joystick button 12";
		   
		if(Input.GetButton("joystick button 13"))
			currentButton = "joystick button 13";
		   
		if(Input.GetButton("joystick button 14"))
			currentButton = "joystick button 14";
		
		if(Input.GetButton("joystick button 15"))
			currentButton = "joystick button 15";
		
		if(Input.GetButton("joystick button 16"))
			currentButton = "joystick button 16";
		
		if(Input.GetButton("joystick button 17"))
			currentButton = "joystick button 17";
		
		if(Input.GetButton("joystick button 18"))
			currentButton = "joystick button 18";
		
		if(Input.GetButton("joystick button 19"))
			currentButton = "joystick button 19";	   
	}
	public string GetCurrentButton(){
		getButton();
		return currentButton;
	}
	public string GetCurrentAxis(){
		getAxis();
		return currentAxis;
	}

	/// <summary>
	/// show the data onGUI
	/// </summary>
	/*
	void OnGUI()
	{
		GUI.TextArea(new Rect(400, 100, 250, 50), "Current Button : " + currentButton);
		GUI.TextArea(new Rect(400, 200, 250, 50), "Current Axis : " + currentAxis);
		GUI.TextArea(new Rect(400, 300, 250, 50), "Axis Value : " +  axisInput);
	}
	*/
}

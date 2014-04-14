using UnityEngine;
using System.Collections;

public class UpgradesMenuGUI : MonoBehaviour 
{

    bool render = true;
    public Texture backgroundTex;
    private int toBeBought;
    private int toBeEquipped;
    private bool equipSelectionBool = false;
    private Rect supportBayRect =new Rect(20, 20, 400, 400);
    private bool confirmStarMap = false;
    public GUIStyle xStyle;
    public GUIStyle checkStyle;
    public GUIStyle buttonStyle;
    private float optionsLastHit = 0;

    private Rect popupRect;
    private Rect optionsMenuRect;

    GameObject otherCamera;
    GameObject inputCoordinatorCamera;

    enum Menu {
	    SupportBay,
	    EquipEquipables,
	    BuyEquipables,
	    ConfirmBuyEquipable,
	    BuyUpgrades,
	    Options,
	    InputOptions
    }

    Menu currentState = Menu.SupportBay;

    //Joy vars
    JoyGUIMenu supportBayMenu;
    JoyGUIMenu confirmBuyMenu;
    JoyGUIMenu optionsMenu;
    JoyGUIMenu inputOptionsMenu;

    public GUISkin mySkin;
    float delayBetweenButtons = 0.25f;
    //end Joy Vars

    Upgrades[] allUpgrades = new Upgrades[20];
    class Upgrades : System.Object{
	    public string name;
	    public string cost;
	    public string description;
	    public bool bought = false;
	    public bool selected = false;
    }

    void Start (){
	    Rect[] buyEquipablesRects = new Rect[20];
	    string[] buyEquipablesLabels = new string[20];

        Rect buttonRect = new Rect(0,0,100,50);
	    Rect r;

        /*
         * create rects for upgrades
         */
	    for (int i = 0; i < 4; i++){
		    r = new Rect(0,0,buttonRect.width, buttonRect.height);
		    r.center = new Vector2(Screen.height/10, Screen.height/4 + (i * 100));
		    buyEquipablesRects[i] = r;
	    }
	    for (int j = 4; j < 8; j++){
		    r = new Rect(0,0,buttonRect.width, buttonRect.height);
		    r.center = new Vector2((Screen.height/10) * 2, Screen.height/4 + ((j-4) * 100));
		    buyEquipablesRects[j] = r;
	    }
	    for (int k = 8; k < 12; k++){
		    Rect rk = buttonRect;
		    rk.center = new Vector2((Screen.height/10) * 4, Screen.height/4 + ((k-8) * 100));
		    buyEquipablesRects[k] = rk;
	    }
	    for (int l = 12; l < 16; l++){
		    Rect rl = buttonRect;
		    rl.center = new Vector2((Screen.height/10) * 6, Screen.height/4 + ((l-12) * 100));
		    buyEquipablesRects[l] = rl;
	    }
	    for (int m = 16; m < 20; m++){
		    Rect rm = buttonRect;
		    rm.center = new Vector2((Screen.height/10) * 8, Screen.height/4 + ((m-16) * 100));
		    buyEquipablesRects[m] = rm;
	    }
	    for (int n = 0; n < allUpgrades.Length; n++){
		    buyEquipablesLabels[n] = allUpgrades[n].name;
	    }
	    supportBayMenu = new JoyGUIMenu(4, buyEquipablesRects, buyEquipablesLabels, SupportBay, "joystick button 0", "Y axis", "X axis", mySkin);
	
	    Rect[] confirmBuyRects = new Rect[2];
	    confirmBuyRects[0] = new Rect(popupRect.center.x - (buttonRect.width*0.75f), popupRect.center.y, buttonRect.width*0.75f, buttonRect.height*0.75f);
	    confirmBuyRects[1] = new Rect(popupRect.center.x + (buttonRect.width*0.25f), popupRect.center.y, buttonRect.width*0.75f, buttonRect.height*0.75f);
	    string[] confirmBuyLabels = new string[2];
	    confirmBuyLabels[0] = "Confirm";
	    confirmBuyLabels[1] = "Back";
	    confirmBuyMenu = new JoyGUIMenu(1, confirmBuyRects, confirmBuyLabels, ConfirmUpgradePurchase, "joystick button 0", "Y axis", "X axis", mySkin);
	
	    Rect[] optionsMenuRects = new Rect[2];
	    string[] optionsMenuLabels = new string[2];
	    optionsMenuRects[0] = new Rect(0,0,buttonRect.width, buttonRect.height);
	    optionsMenuRects[1] = new Rect(0,0,buttonRect.width, buttonRect.height);
	    optionsMenuRects[0].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y+(buttonRect.height*2));
	    optionsMenuRects[1].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y+(buttonRect.height*3.5f));
	    optionsMenuLabels[0] = "Input";
	    optionsMenuLabels[1] = "Sound";
	    optionsMenu = new JoyGUIMenu(2,optionsMenuRects,optionsMenuLabels, Options,"joystick button 0", "Y axis", "X axis", mySkin);
	
	    Rect[] inputOptionsMenuRects = new Rect[1];
	    string[] inputOptionsMenuLabels = new string[1];
	    inputOptionsMenuRects[0] = new Rect(0,0,buttonRect.width,buttonRect.height);
	    inputOptionsMenuRects[0].center = new Vector2(optionsMenuRect.center.x, optionsMenuRect.y + buttonRect.height/2);
	    inputOptionsMenuLabels[0] = "Controller Setup";
	    inputOptionsMenu = new JoyGUIMenu(1, inputOptionsMenuRects, inputOptionsMenuLabels, InputOptions,"joystick button 0", "Y axis", "X axis", mySkin);
	
        popupRect = new Rect(0,0,Screen.width/4,Screen.height/4);
        popupRect.center = new Vector2(Screen.width/2, Screen.height/2);
        optionsMenuRect = new Rect(0,0,Screen.width/2,(Screen.height/4)*3);
        optionsMenuRect.center = new Vector2(Screen.width/2, Screen.height/2);

	    supportBayMenu.enabled = true;
	    confirmBuyMenu.enabled = false;
	    optionsMenu.enabled = false;
	    inputOptionsMenu.enabled = false;
    }

    void Update (){
	
	    switch (currentState){
		    case Menu.SupportBay:
			    supportBayMenu.enabled = true;
			    optionsMenu.enabled = false;
			    inputOptionsMenu.enabled = false;
			   supportBayMenu.CheckInput();
			    if (Input.GetButtonDown("Pause") && Time.time > optionsLastHit + 0.25){
					    currentState = Menu.Options;
					    optionsLastHit = Time.time;
			    }
			    break;

		    case Menu.ConfirmBuyEquipable:
			    confirmBuyMenu.enabled = true;
			    confirmBuyMenu.CheckInput();
			
			    break;

		    case Menu.Options:
			    optionsMenu.enabled = true;
                inputOptionsMenu.enabled = false;
                confirmBuyMenu.enabled = false;

                optionsMenu.CheckInput();
                supportBayMenu.UnClickAll();
                confirmBuyMenu.UnClickAll();
                inputOptionsMenu.UnClickAll();
				if (Input.GetButtonDown("joystick button 7") || Input.GetButtonDown("Pause")){
					currentState = Menu.SupportBay;
					optionsMenu.UnClickAll();
				}
			    break;
		    case Menu.InputOptions:
			    optionsMenu.enabled = false;
                inputOptionsMenu.enabled = true;
                confirmBuyMenu.enabled = false;

                optionsMenu.CheckInput();
                supportBayMenu.UnClickAll();
                confirmBuyMenu.UnClickAll();
                optionsMenu.UnClickAll();
				if (Input.GetButtonDown("joystick button 7") || Input.GetButtonDown("Pause")){
					currentState = Menu.SupportBay;
					optionsMenu.UnClickAll();
				}  optionsLastHit = Time.time;
			    break;
	    }

    }

    void OnGUI (){
	    GUI.DrawTexture(new Rect(0,0,Screen.width,Screen.height), backgroundTex, ScaleMode.StretchToFill);
	    GUI.skin = mySkin;
	
	    if (render == true){
		    Title();
		    if (confirmStarMap == true){
			    GUI.Window(1, popupRect, ConfirmStarMap, "Confirm");
		    }

		    switch (currentState){
			    case Menu.SupportBay:
				    supportBayMenu.Display();
				    break;

			    case Menu.BuyEquipables:
				    if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
				    GUILayout.Label("Equipment Shop");
//				    GUI.Box(physicalWeaponsRect,"Physical Weapons");
//				    GUI.Box(energyWeaponsRect, "Energy Weapons");
//				    GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
//				    GUI.Box(devicesRect, "Devices");
				    buyEquipablesMenu.Display();
				    break;
			    case Menu.ConfirmBuyEquipable:
//				    GUI.Box(physicalWeaponsRect,"Physical Weapons");
//				    GUI.Box(energyWeaponsRect, "Energy Weapons");
//				    GUI.Box(explosiveWeaponsRect, "Explosive Weapons");
//				    GUI.Box(devicesRect, "Devices");
				    buyEquipablesMenu.Display();
				    GUI.Box(popupRect, "Confirm", "window");
				    confirmBuyEquipableMenu.Display();
			    case Menu.BuyUpgrades:
				    BuyUpgrades();
				    if (Input.GetButtonDown("Pause"))currentState = Menu.SupportBay;
				    break;
			    case Menu.Options:
				    GUI.Box(optionsMenuRect, "Options", "window");
				    optionsMenu.Display();
				    break;
			    case Menu.InputOptions:
				    GUI.Box(optionsMenuRect, "Input Options", "window");
				    inputOptionsMenu.Display();
				    break;
		    }
		    ButtonLabels();
	    } 
	       
    }

    void Title (){
	    Rect creditsRect = new Rect(0,0,140,20);
	    creditsRect.center = new Vector2(Screen.width/2, 20);
	    GUI.Label(creditsRect, "Total Credits: "+PlayerStats.totalCredits);
    }

    void SupportBay(int buttonHit){
	    switch (buttonHit){
		    case 0:
			    currentState = Menu.EquipEquipables;
			    supportBayMenu.UnClickAll();
			    break;
		    case 1:
			    currentState = Menu.BuyEquipables;
			    supportBayMenu.UnClickAll();
			    break;
		    case 2:
			    currentState = Menu.BuyUpgrades;
			    supportBayMenu.UnClickAll();
			    break;
		    case 3:
			    confirmStarMap = true;
			    break;
	    }
    }

    void BuyEquips (int buttonHit){
	    if (buttonHit > -1 && buttonHit < 21){
		    if (allUpgrades[buttonHit].bought == false){
			    toBeBought = buttonHit;
			    currentState = Menu.ConfirmBuyEquipable;
		    }
	    }
	    //otherCamera.GetComponent(ThreeDeeIconsCamera).Go();
    }

    /*
     *  REDO
     */
    void ConfirmStarMap(int buttonHit){
	    if (GUI.Button(Rect(10,25,110,70), "Go to star map?"))
		    Application.LoadLevel("StarMap");		
	    if (GUI.Button(Rect(125,25,110,70), "Cancel"))
		    confirmStarMap = false;
    }

    void ConfirmUpgradePurchase(int currentSelection){
	    string str = "Purchase "+allUpgrades[toBeBought].name+" for "+allUpgrades[toBeBought].cost+"?";
	    var strRect : Rect = new Rect(popupRect.center.x,popupRect.center.y + buttonRect.height, buttonRect.width, buttonRect.height);
	    GUI.Label(strRect,str);
	    switch (currentSelection){
		    case 0:
			    PlayerStats.totalCredits -= allUpgrades[toBeBought].cost;
			    unlockedUpgrades.Push(allUpgrades[toBeBought]);
			    allUpgrades[toBeBought].bought = true;
			    buyEquipablesMenu.buttons[toBeBought].bought = true;
			    buyEquipablesMenu.buttons[toBeBought].enabled = false;
			    currentState = Menu.BuyEquipables;
			    break;
		    case 1:
			    currentState = Menu.BuyEquipables;
			    break;
	    }
	    if (Input.GetButtonDown(InputCoordinator.back)){
		    currentState = Menu.BuyEquipables;
		    buyEquipablesMenu.UnClickAll();
	    }
    }

    void Options (int buttonHit) {
	    switch (buttonHit){
		    case 0:
			    currentState = Menu.InputOptions;
			    optionsMenu.UnClickAll();
			    break;
	    }

    }

    void InputOptions (int buttonHit){
	    switch (buttonHit){
		    case 0:
			    inputCoordinatorCamera.GetComponent(InputCoordinator).controllerSetup = true;
			    render = false;
			    optionsMenu.UnClickAll();
			    break;
	    }

    }

    void ButtonLabels (){
	    GUI.Label(Rect(Screen.width - (Screen.width/15)*2, Screen.height - (Screen.height/15), Screen.width/15, Screen.height/15), "A - Select", "Button");
	    if (GUI.Button(Rect(Screen.width - (Screen.width/15), Screen.height - (Screen.height/15), Screen.width/15, Screen.height/15), "B - Back")){
		    currentState = Menu.SupportBay;
	    }
    }

    void Delay (){
		    supportBayMenu.isCheckingJoy = false;
		    equipEquipablesMenu.isCheckingJoy = false;
		    buyEquipablesMenu.isCheckingJoy = false;
		    confirmBuyEquipableMenu.isCheckingJoy = false;
		    optionsMenu.isCheckingJoy = false;
		    inputOptionsMenu.isCheckingJoy = false;
    }	

    void CheckInputCoordinator(){
	    inputCoordinator = gameObject.GetComponent(InputCoordinator);
    }
    }
}
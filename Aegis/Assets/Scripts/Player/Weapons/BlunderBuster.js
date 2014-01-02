#pragma strict
@script AddComponentMenu("Player/Weapons/Blunder Buster")

var sight : GameObject;
var bullet : GameObject;
private var heatCost : float = 0;
private var cooldown : float = 0;
private var damage : float = 0;
var laser : AudioClip;
var lastShot : float = 0;
var playerStats : PlayerStats;
private var input : String;

function Start () {
	
}

function Update () {

}
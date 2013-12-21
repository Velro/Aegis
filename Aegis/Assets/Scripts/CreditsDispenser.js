#pragma strict

var smallCredit : GameObject;
var mediumCredit : GameObject;
var largeCredit : GameObject;

var customAmount : float = 0;
private var small : float = 10;
private var medium : float = 20;
private var large : float = 30;

function RollToDrop (){
	if (customAmount == 0){
		var rollToDrop : float = Random.value;
		if (rollToDrop >= 0.7){
			if (rollToDrop >= 0.85){
				if (rollToDrop >= 0.95){
					Drop(large);
				}
			} else {Drop(medium);}
		} else {Drop(small);}
	} else {Drop(customAmount);}
}

function Drop (amount : int){
	var instance : GameObject;
	if (amount > 0 && amount < 20){
		instance = Instantiate (smallCredit, Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity);
		instance.GetComponent(Credit).amount = amount;
	}
	if (amount >= 20 && amount < 30){
		instance = Instantiate (mediumCredit, Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity);
		instance.GetComponent(Credit).amount = amount;
	}
	if (amount >= 30){
		instance = Instantiate (largeCredit, Vector3(transform.position.x, 0, transform.position.z), Quaternion.identity);
		instance.GetComponent(Credit).amount = amount;
	}
}
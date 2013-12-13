#pragma strict
var destination : GameObject;
var speed : float;
var trigger : GameObject;
var entered : boolean = false;

var patrol : boolean;
private var returning : boolean = false; 

private var start : Vector3;
private var end : Vector3;
private var journeyLength : float;
private var startTime : float;
private var once : boolean;	//only count one entrance into the trigger

function Start () {
	start = transform.position;
	end = destination.transform.position;
	
	journeyLength = Vector3.Distance(start,end);
}

function Update () {
	if (trigger != null){
		CheckTrigger();
		if (entered && patrol == false){
			var distanceCovered : float = (Time.time - startTime) * speed;
			var fracJourney : float = distanceCovered / journeyLength;
			transform.position = Vector3.Lerp(start, end, fracJourney);
			
			if (transform.position == end){
				Destroy (gameObject); //cleanup
			}
		} else if (entered && patrol){	
			distanceCovered = (Time.time - startTime) * speed;
			fracJourney = distanceCovered / journeyLength;
			transform.position = Vector3.Lerp(start, end, fracJourney);
			if (transform.position == end && returning == true){
				returning = false;
			} else if (transform.position == end && returning == false){
				returning = true;
				FlipBeginningEnd();
			}
		}
	} else { 		//if there is no trigger for this move, then move
		distanceCovered = (Time.time - startTime) * speed;
		fracJourney = distanceCovered / journeyLength;
		transform.position = Vector3.Lerp(start, end, fracJourney);
		
		if (transform.position == end){
			Destroy (gameObject);
		}
	}
}

function CheckTrigger(){
	entered = trigger.GetComponent(TriggeredAwaken).hit;
	if (entered && once){
		entered = true;
		startTime = Time.time;
		once = false;
	}
}

function FlipBeginningEnd(){
	if (returning){
		var interim : Vector3 = end;
		end = start;
		start = interim;
		startTime = Time.time;
	}
}
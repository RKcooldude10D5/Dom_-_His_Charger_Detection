var img="";
status="";
objects=[];
function preload(){
    img= loadImage("https://static1.hotcarsimages.com/wordpress/wp-content/uploads/2019/03/Velgen20.com_.jpg");
}
function setup(){
    canvas= createCanvas(600, 480);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;
    objectDetector.detect(img, gotResult);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(img, 0, 0, 600, 480);
    if(status != ""){
        for(i=0; i < objects.length; i++){
            document.getElementById("status").innerHTML="Status: Detected Objects";
            fill("FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+ " " + percent + "%",  objects[i].x + 10, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
    // fill("#FF0000");
    // text("Mazda RX7 New Gen", 210, 75);
    // noFill();
    // stroke("#FF0000");
    // rect(200, 60, 380, 200);
    // fill("#FF0000");
    // text("Mazda RX7 Old Gen", 20, 175);
    // noFill();
    // stroke("#FF0000");
    // rect(10, 160, 580, 280);
}
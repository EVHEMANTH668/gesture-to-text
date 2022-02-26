prediction_1 = "";
prediction_2 = "";

 Webcam.set({
     width:350,
     height:300,
     image_format:"png",
     png_quality:100
 });

camera = document.getElementById("camera");

 Webcam.attach("#camera");

 function snap(){
     Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>'
     })
 }

    console.log('ml5 version : ', ml5.version);

    classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/7phJ-FGnH/model.json',modelLoaded);
 

    function modelLoaded(){
        console.log("model loaded")
    }

    function speak(){
        var synth = window.speechSynthesis;
        speak_data = "The first prediction is" + prediction_1;
        speak_data_1 = "The second prediction is" + prediction_2;
        var utter_this = new SpeechSynthesisUtterance(speak_data + speak_data_1);
        synth.speak(utter_this);
    }

    function st(){
        img = document.getElementById("captured_image");
        classifier.classify(img, gotResult);
    }

    function gotResult(error , results){
        if(error){
            console.error(error);
        } else {
            console.log(results);
            document.getElementById("result_emotion_name").innerText = results[0].label;
            document.getElementById("result_emotion_name2").innerText = results[1].label;
            prediction_1 = results[0].label;
            prediction_2 = results[1].label;
        }

    }
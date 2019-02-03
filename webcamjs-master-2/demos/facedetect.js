function faceDetect() {

        var result = "";

        // Request parameters.
        var params = {
            "returnFaceId": "true",
            "returnFaceLandmarks": "false",
            "returnFaceAttributes": ""
        };

        // Display the image.
        var sourceImageUrl = "" + document.getElementById("inputImage").value;

        // Perform the REST API call.
        $.ajax({
            url:  "https://canadacentral.api.cognitive.microsoft.com/face/v1.0/detect?" + $.param(params),

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "356733d2505046d59fe44976393c4635");
            },

            type: "POST",

            // Request body.
            data: '{"url": ' + '"' + sourceImageUrl + '"}',
        })

        .done(function(data) {

            const dataptr = JSON.stringify(data);
            var id1 = JSON.parse(dataptr)[0].faceId.toString();
            console.log(id1);

            faceCompare(id1, id1);

        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });

        return result;
    };



function faceCompare(id1, id2) {

        var bodyAPI = '{"faceId1": "' + id1 +'", "faceId2": "30477085-7c6b-4360-bab8-65405c55cbb3"}';

        //console.log(bodyAPI);
        $.ajax({
            url:  "https://canadacentral.api.cognitive.microsoft.com/face/v1.0/verify",

            // Request headers.
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader("Content-Type","application/json");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "356733d2505046d59fe44976393c4635");
            },

            type: "POST",

            // Request body

            data: bodyAPI,
        })

        .done(function(data) {

            const dataptr = JSON.stringify(data);

            if(JSON.parse(dataptr).isIdentical == true) { 
                 window.location.replace('../../dashboard.html');
            } else {
                window.location.replace('combo.html');
            };

        })

        .fail(function(jqXHR, textStatus, errorThrown) {
            // Display error message.
            var errorString = (errorThrown === "") ?
                "Error. " : errorThrown + " (" + jqXHR.status + "): ";
            errorString += (jqXHR.responseText === "") ?
                "" : (jQuery.parseJSON(jqXHR.responseText).message) ?
                    jQuery.parseJSON(jqXHR.responseText).message :
                        jQuery.parseJSON(jqXHR.responseText).error.message;
            alert(errorString);
        });
    };
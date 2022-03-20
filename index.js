console.log("Thism is clone of postman");

// Intialize Numbers Of Parameters
let addedParamCount = 0;

// Hiding Prameter Box when custom parameter are not chosen intially
let  parameterBox = document.getElementById("parameterBox");
parameterBox.style.display = "none";

// Utilityb Function To get element from string
// no. 1

function gEFstring(string){

   let div =  document.createElement("div");
    div.innerHTML = string ;
    return div.firstElementChild;

}


// if the user chosen paran box hide the json box 
let params = document.getElementById("params");
params.addEventListener("click",()=>{
    document.getElementById("jsonBox").style.display = "none";
    document.getElementById("parameterBox").style.display = "block";
})


// if the user chosen json box hide the param box 

let json = document.getElementById("json");
json.addEventListener("click",()=>{
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("jsonBox").style.display = "block";
})

// If the clicks On The Plus Button Add Parameters
let plus = document.getElementById("plus");
plus.addEventListener("click",()=>{
    let addParams = document.getElementById("addParams");
    let str = `<div class="row g-3 my-2">
                    <legend class="col-form-label col-sm-2 pt-0">Parmeter ${addedParamCount + 2}</legend>
                    <div class="col-md-3">
                    <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter Key ${addedParamCount + 2}">
                    </div>
                    <div class="col-md-3">
                    <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter Value ${addedParamCount + 2}">
                    </div>
                    <div class="col-md-3">
                    <button class="btn btn-primary deleteParam" >- </button>
                    </div>
                </div>`;
                let paramsEle = gEFstring(str);
                addParams.appendChild(paramsEle);

                // Add a eventlistner todelete a param
                 let deleteParam = document.getElementsByClassName('deleteParam');

                    for(item of deleteParam){
                        item.addEventListener('click', (e)=>{
                            e.target.parentElement.parentElement.remove();
                        })
                    }

                addedParamCount += 1;

})

// If the clcks o the the submit butttn then
let submit = document.getElementById('submit');
submit.addEventListener('click', ()=>{
    // SHOW PLEASE wait to the user to get paitence
    document.getElementById("prism-code").innerHTML = "Please Wait......... We Are Fetching Data According To Your Request";

    // fetch all the valus that user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name ='requestType']:checked").value;
    let contentType = document.querySelector("input[name = 'contentType']:checked").value;

    // if saelect params collect all the values in an object
    if(contentType == 'PARAMS'){
        data = {};
        for(i= 0 ; i<addedParamCount+1; i++){
            if(document.getElementById("parameterKey" + (i +1)) != undefined){
                let key = document.getElementById("parameterKey" + (i +1)).value;
                let value = document.getElementById("parameterValue" + (i +1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById("jsonText").value;
    }

     // log all the values in the console for debuging
     console.log("URL is ", url);
     console.log("contentType is ", contentType );
     console.log("requestType is ", requestType);
     console.log('Data is ' , data);


    // iF THE REQUEST TYPR IS POST 
    if(requestType == 'GET'){
        fetch(url, {
            method: 'GET'
        }).then((response)=>
            response.text()
        ).then((text)=>{
            // document.getElementById("response").value = text;
            document.getElementById("prism-code").innerHTML = text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        }).then((response)=>
            response.text()
        ).then((text)=>{
            // document.getElementById("response").value = text;
            document.getElementById("prism-code").innerHTML = text;
            Prism.highlightAll();
        })
    }

})

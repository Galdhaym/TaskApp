$(document).ready(function(){

    function addEventsToImgButtons(){
        var taskElements = $(".task__elem");
        for(taskElem of taskElements){
            var imgButton = taskElem.children[1];
            imgButton.addEventListener("click", deleteTask);
        }
    }   

    function getResponse(requestType, url, data, callback){   
        $.ajax({
            type: requestType,
            url: url,
            data: data,
            contentType: "application/json"
        }).done(callback);
    }


    function deleteTask(){
        var taskRecord = this.parentElement;
        var id = taskRecord.getAttribute("id");
        $("#"+id).remove();
        var idJson = JSON.stringify({messageID: id});
        getResponse("POST", "/removeTask", idJson, function(){});
    }

    function addNewTask(){
        var message = $("#form__area").val();
        var jsonData = JSON.stringify({messageValue: message});
        getResponse("POST", "/addNewTask", jsonData, function(data){
            var data = JSON.parse(data);
            var container = $(".tasks__container")[0];
            var inputValue = $("#form__area")[0].value;
            var taskElem = document.createElement("div");
            var textElem = document.createElement("p");
            var deleteTaskIcon = document.createElement("img");
            deleteTaskIcon.setAttribute("src", "./img/close.jpg");
            deleteTaskIcon.setAttribute("class", "deleteButton");
            textElem.setAttribute("class", "text__elem");
            taskElem.setAttribute("class", "task__elem");
            taskElem.setAttribute("id", data.messageID);
            container.append(taskElem);
            taskElem.append(textElem);
            taskElem.append(deleteTaskIcon);
            deleteTaskIcon.addEventListener("click", deleteTask);
            $("#"+data.messageID).find("p")[0].innerText = inputValue;
        });
    }

    addEventsToImgButtons();
    var buttonAddNewTask = $("#add__task");
    buttonAddNewTask.click(addNewTask);
});
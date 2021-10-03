




let important = false;
let form = false;
let serverUrl = "https://fsdiapi.azurewebsites.net/";

function toggleImportant() 
{
    console.log("clicked");
    if(important === false) 
    {
        $("#iImportant").removeClass("far").addClass("fas");
        important = true;
    } 
    else 
    {
        $("#iImportant").removeClass("fas").addClass("far");
        important = false;
    }
}

function toggleForm() 
{
    if (form === false) 
    {
        $("form").slideDown(1500);
        $("#btnAdd").text("Hide Form");
        form = true;
    } 
    else 
    {
        $("#btnAdd").text("Add Task");
        $("form").slideUp(1500);
        form = false;
    }
}

function save() 
{
    console.log("saving task");
    // Get the information from the inputs
    let title = $("#txtTitle").val();
    let date = $("#selDate").val();
    let location = $("#txtLocation").val();
    let priority = $("#selPriority").val();
    let color = $("#selColor").val();
    let collaborator = $("#txtCollaborator").val();
    let description = $("#txtDescription").val();

    // Create a new Task object

    let task = new Task(title, important, date, location, priority, color, collaborator, description);
    console.log(task);

    $.ajax({
        type:"POST", 
        url:serverUrl + "api/tasks",
        data:JSON.stringify(task),
        contentType:"application/json",
        success:function(res) {
            console.log("Server says", res);
            alert("The task was registered successfully");
            let t = JSON.parse(res);
            displayTask(t);
        },
        error:function(error) {
            console.log("Error saving task", error);
        }
    });

    // Display's task in section list
    displayTask(task);

    clear();

}

function clear() {
    title = $("#txtTitle").val("");
    important = $("#iImportant").val("");
    date = $("#selDate").val("");
    location = $("#txtLocation").val("");
    priority = $("#selPriority").val("");
    collaborator = $("#txtCollaborator").val("");
    description = $("#txtDescription").val("");
 
}

function displayTask(task) {
    syntax = `
    <div class="tasks">
        <h6 style="color:${task.color}">${task.title}</h6>
        <label>${task.location}</label>
        <label>${task.collaborator}</label>
    </div>
    `;
    $(".pending-tasks").append(syntax);
}

function getTask() {
    $.ajax({
        type:"GET",
        url:serverUrl + "api/tasks",
        success:function(res) {
            let t = JSON.parse(res);
            for(let i = 0; i < t.length; i++) {
                if(t[i].name === "Julian") {
                    console.log(t[i]);
                    displayTask(t[i]);
                }
            }
            console.log("server says: " + t);

        },
        error:function(error) {
            console.log("Error getting task: ", error)
        }
    });
}

$("#btnSave").keypress(function(e) {
    if(e.which == 13) {
        alert('You pressed enter!');
    }
});


function init() 
{
    console.log("Calendar System");
    $("form").hide();
    getTask();
    // Hook Event
    $("#iImportant").click(toggleImportant);
    $("#btnAdd").click(toggleForm)
    $("#btnSave").click(save);
}
window.onload = init;

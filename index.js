const fs = require('fs');
const path = require('path');
const readline = require('readline');
const filePath = path.join(__dirname,'tasks.txt');
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout

})
function addTask(task){
    fs.appendFile(filePath,task+'\n',(err)=>{
        if(err){
            throw err;
        }
        else{
            console.log("Task added sucessfully!");
            rl.close();
        }
    });
}
// rl.question('Enter a task : ',(task)=>{
//     addTask(task);
// })

function viewTasks(){
    fs.readFile(filePath,'binary',(err,data)=>{
        if(err){
            throw err;
        }
        else{
            console.log("Tasks : ");
            console.log(data.toString());
            rl.close();
        }
    })
}

//viewTasks();

function markComplete(taskIndex){
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.log('No tasks Found');
        }
        else{
            const tasks = data.trim().split('\n');
            if(taskIndex>=0 && taskIndex<tasks.length){
                tasks[taskIndex] = '[x]' + '[' + tasks[taskIndex] + ']';
                fs.writeFile(filePath,tasks.join('\n'),(err,data)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("Task Marked as complete!");
                        rl.close();
                    }
                });
            }
            else{
                console.log('Invalid task Index');
                rl.close();
            }
        }
    });
}

//markComplete(0);

function removeTask(taskIndex){
    fs.readFile(filePath,'utf-8',(err,data)=>{
        if(err){
            console.log('No tasks Found');
        }
        else{
            const tasks = data.trim().split('\n');
            if(taskIndex >=0 && taskIndex <tasks.length){
                tasks.splice(taskIndex,1);
                fs.writeFile(filePath,tasks.join('\n'),(err,data)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("Task removed successfully");
                        rl.close();
                    }
                });
            }
            else{
                console.log("Invalid task Index");
                rl.close();
            }
        }
    });
}

removeTask(1);
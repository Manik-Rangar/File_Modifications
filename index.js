const fs = require('fs');
const readline = require('readline')

// Data Entered by the User
let  content ="";

// Raad from the console
function readInput() {
    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => interface.question("Inter text: ", answer => {
        interface.close();
        resolve(answer);
    }))
}

// Read Input from the User 
let  caller = (async ()=>{

    
    let text  = await readInput();
    if(text == '!wq'){
        
        // Save data to the file 
        fs.appendFileSync('./doc/notes.txt',content)
        console.log('Data Saved !!')
        return;
    }
    else
    {
        content=content+"\n"+text;

        // Stoping Value not arived 
        caller();
    }
    
    
});

function countTarget(lines,target)
{
    let count=0;
    // const lines = fileData.split(['\n']);
    lines.forEach(line => {

        words=line.trim().split(" ");
        words.forEach(word=>{
            if(word==target){

                count++;
                console.log("temp Count is " , count);
            }
        })
    
        
    });
    return count;


}
const searchTarget= async ()=>{

    const fileData = fs.readFileSync('./doc/notes.txt').toString().trim();
    let target = await readInput();
    // console.log(target)
    // let count=0;
    const lines = await fileData.split(['\n']);
    // await lines.forEach(line => {

    //     words=line.trim().split(" ");
    //     words.forEach(word=>{
    //         if(word==target)
    //         count++;
    //     })
    
        
    // });
    console.log("the count is :" + countTarget(lines,target));
    
    // console.log(count)

}

const start=()=>{

    const interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    interface.question("Enter 1 for Writing and 2 for Reading : ",answer=>{
        if(answer=='1')
        caller()
        else
        searchTarget();
        interface.close();
    })
}
start();
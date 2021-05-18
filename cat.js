#!/usr/bin/env node
let fs = require("fs");
//console.log(process.argv);
(function (){
    let cmd = process.argv.slice(2);
    let options = []; // options [-s , -b  -n]
    let files = [];
    let str = ``;
    for(let i=0; i<cmd.length; i++){
        if(cmd[i].startsWith('-')){
            options.push(cmd[i]);
        }else{
            files.push(cmd[i]);
        }
    }
    for(let i=0; i<files.length; i++){
        if(fs.existsSync(files[i])){
            str += fs.readFileSync(files[i]).toString();
        }else{
            console.log("invalid file");
            //return ;
        }
    }
    str = str.split("\n");
    
    console.log(str);
    if(options.includes("-s")){
        str = removeLargeSpace(str);

    }
    if(options.includes("-n") && options.includes("-b")){
        if(options.indexOf("-n")>options.indexOf("-b")){
          str =  addNonEmptyNum(str);

        }else{
          str =  addLine(str);

        }
    }else{
        if(options.includes("-b")){
            str = addNonEmptyNum(str);

        }
        if(options.includes("-n")){
          str = addLine(str);

        }
    }
    if(options.includes("-li")){
        let lines = countLines(str);
        console.log(lines);
    }
    if(options.includes("-w")){
       let words = countWords(str);
       console.log(words);
    }
    str = str.join("\n");
   // console.log(str);
    
})()

function addLine(arr){
    for(let i=1; i<= arr.length; i++){
        arr[i-1] = i + " " + arr[i-1];
    }
    return arr;
}
function addNonEmptyNum(arr){
    let numLine = 1;
    for(let i=0; i<arr.length; i++){
        if(arr[i] !== "" && arr[i] !== "\r"){
            arr[i] = numLine + " " + arr[i];
            numLine++;
        }
    }
    return arr;
}

function removeLargeSpace(arr){
    let y = [];
let flag = false;
for(let i=0; i<arr.length; i++){

    if(arr[i] === "" || arr[i] == "\r"){
        if(flag === true){
            continue;
        }else{
            flag = true;
            y.push(arr[i]);
        }
    }else{
        y.push(arr[i]);
        flag = false;
    }
}
return y;
}

function countLines(str){
    str = removeLargeSpace(str);
    return str.length
}

function countWords(str){
    let s = str.join("\n");
   s = s.split(" ");
    console.log(s)
    return s.length;
}
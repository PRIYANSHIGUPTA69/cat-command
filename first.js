let x = `hsgjh


shjshj


xh`
x = x.split("\n");
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
x = removeLargeSpace(x);
x=x.join("\n");
console.log(x)
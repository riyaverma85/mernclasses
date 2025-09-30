
//=======================================FORK LENGHT CODE==================================================================
const http=require("http");
const os=require("os");
const cluster=require("cluster");

console.log(os.cpus().length);

if(cluster.isMaster){
    console.log(os.cpus().length);
    const frkLength=os.cpus().length;
    for(var i=0; i<frkLength; i++){
        cluster.fork();
    }
    
}
else{
    http.createServer((req,res)=>{
    setTimeout(()=>{
        res.write("<h1>welcome to node js App </h1>")
        res.end()
    },2000)
}).listen(8000)
}

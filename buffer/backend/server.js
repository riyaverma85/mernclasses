
//=======================================FORK LENGTH CODE==================================================================
const http=require("http");
const os=require("os");
const cluster=require("cluster");
if(cluster.isMaster){
   
    const frkLength=os.cpus().length;
     console.log(`Master process PID:${process.pid}`);
     console.log(`Forking ${frkLength} workers......`)
    for(var i=0; i<frkLength; i++){
        cluster.fork();
    }


//
cluster.on("exit",(worker,code,signal)=>{
    console.log(`Worker ${worker.process.pid} died.Forking a new worker....`);
    cluster.fork();
});
}
else{
    http.createServer((req,res)=>{
      res.write("<h1>welcome to node js App </h1>")
      res.end(`Handled by worker process PID:${process.pid}\n`);
 
}).listen(8000)
}

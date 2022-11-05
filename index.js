const http = require("http");
const fs = require("fs");
var requests = require("requests");
const homeFile = fs.readFileSync("index.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
  let tempreature = tempVal.replace("{%tempval%}", orgVal.main.temp);
  tempreature = tempreature.replace("{%tempmin%}", orgVal.main.temp);
  tempreature = tempreature.replace("{%tempmax%}", orgVal.main.temp);
  tempreature = tempreature.replace("{%location%}", orgVal.name);
  tempreature = tempreature.replace("{%country%}", orgVal.sys.country);
  return tempreature;
}

const server = http.createServer((req,res) => {
    if(req.url = "/"){
        requests("https://api.openweathermap.org/data/2.5/weather?q=Guwahati&appid=04f89e334a4170f33e7b82a6122f38a0")
.on("data", (chunk) => {
  const objdata = JSON.parse(chunk);
  const arrData = [objdata];
  //console.log(arrData[0].main.temp);
  const realTimeData = arrData
  .map((val) => replaceVal(homeFile,val))
  .join("");
  res.write(realTimeData);
 // console.log(realTimeData);
})
.on("end",  (err) => {
  if (err) return console.log("connection closed due to errors", err);
  res.end();
});
    }
});
server.listen(8000, "127.0.0.1");
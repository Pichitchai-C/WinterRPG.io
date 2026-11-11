const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const PUB=path.join(__dirname,'docs'),SV=path.join(__dirname,'saves'),PORT=process.env.PORT||3000;
fs.mkdirSync(SV,{recursive:true});
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css'};
const send=(r,c,o)=>{r.writeHead(c,{'Content-Type':typeof o=='string'?'text/plain':'application/json'});r.end(typeof o=='string'?o:JSON.stringify(o))};
const fp=n=>path.join(SV,String(n).slice(0,40).replace(/[^\w\u0E00-\u0E7F]/g,'_')+'.json');
const hash=(p,s)=>crypto.scryptSync(String(p),s,32);
http.createServer((q,r)=>{
  if(q.url=='/api/ping')return send(r,200,{ok:1});
  if(q.method=='POST'&&q.url.startsWith('/api/')){let b='';q.on('data',d=>{b+=d;if(b.length>2e6)q.destroy()});q.on('end',()=>{
    let j;try{j=JSON.parse(b)}catch(e){return send(r,400,{e:'bad json'})}
    if(!j.u)return send(r,400,{e:'no user'});
    const f=fp(j.u),has=fs.existsSync(f),d=has?JSON.parse(fs.readFileSync(f,'utf8')):null;
    if(q.url=='/api/register'){if(has||String(j.p||'').length<4)return send(r,409,{e:'exists'});const s=crypto.randomBytes(16).toString('hex');fs.writeFileSync(f,JSON.stringify({s,h:hash(j.p,s).toString('hex'),save:null}));return send(r,200,{ok:1})}
    if(!d||!crypto.timingSafeEqual(hash(j.p||'',d.s),Buffer.from(d.h,'hex')))return send(r,401,{e:'auth'});
    if(q.url=='/api/login')return send(r,200,{save:d.save});
    if(q.url=='/api/save'){d.save=j.save;fs.writeFileSync(f,JSON.stringify(d));return send(r,200,{ok:1})}
    send(r,404,{e:'nf'})});return}
  let u=q.url.split('?')[0];if(u=='/')u='/index.html';const f=path.join(PUB,path.normalize(u));
  if(!f.startsWith(PUB)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return send(r,404,'not found');
  r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'});fs.createReadStream(f).pipe(r)
}).listen(PORT,()=>console.log('WinterRPG: http://localhost:'+PORT));

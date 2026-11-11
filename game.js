const $=i=>document.getElementById(i),cv=$('c'),x=cv.getContext('2d'),mx2=$('mm').getContext('2d'),M=Math,R=M.random,PI=M.PI;
let W,H,S,g=null,me='',K={},jx=0,jy=0,fl=[],pr=[],tm=[],hs=[],ah=0,cx=0,cy=0,sf=[],lastS='';
const WW=2800,WH=2000,TW={x:350,y:220,w:700,h:560},LAIR={x:1250,y:110},DG={x:60,y:780,w:240,h:180},CAB={x:250,y:220};
const IT={ar:['เกราะหิมะ','+40 HP',80,'🛡',0,{hp:40}],a2:['เสื้อเกราะเหล็ก','+25 HP ลดดาเมจรับ 10%',120,'🦺',0,{hp:25,def:.1}],a3:['เกราะปีศาจ','+60 HP ลดดาเมจรับ 15%',220,'👹',0,{hp:60,def:.15}],a4:['โล่น้ำแข็ง','ลดดาเมจรับ 20%',260,'🧊',0,{def:.2}],sw:['ดาบเลือด','+5 โจมตี',80,'⚔',1,{atk:5}],p2:['ขวานปีศาจ','+9 โจมตี',150,'🪓',1,{atk:9}],p3:['มีดปาเงิน','ตีเร็วขึ้น 15%',140,'🔪',1,{as:.15}],p4:['ดาบล่าปีศาจ','+14 โจมตี',260,'🗡',1,{atk:14}],ri:['แหวนมานา','+20 MP',60,'💍',2,{mp:20}],m2:['คทาน้ำแข็ง','พลังสกิล +12%',140,'🪄',2,{ap:.12}],m3:['คัมภีร์โลหิต','พลังสกิล +20%',240,'📕',2,{ap:.2}],m4:['หินวิญญาณ','ฟื้นมานา +2/วิ',130,'🔷',2,{mr:2}],bo:['รองเท้าขน','เดินเร็ว +12',70,'👢',3,{spd:12}],sc:['ผ้าพันคอแดง','ดูดเลือด +8%',100,'🧣',3,{ls:.08}],am:['เครื่องรางน้ำเงิน','ลดคูลดาวน์ 10%',120,'🔮',3,{cd:.1}],x4:['ตุ้มหูหิมะ','เดินเร็ว +8 ดูดเลือด +4%',110,'❄',3,{spd:8,ls:.04}]};
const QS=[{n:'ปราบมอนสเตอร์ 5 ตัว',k:'kill',need:5,gold:60,xp:80},{n:'ส่งพัสดุให้ตลาด',k:'dlv',gold:40,xp:40},{n:'ล่าปีศาจโลหิต (ออกตอนกลางคืน)',k:'boss',need:1,gold:200,xp:250}];
const BD=[['guild','กิลด์',400,260,'#7a4a2a','📜'],['church','โบสถ์',675,250,'#7a7a9a','⛪'],['market','ตลาด',950,260,'#2f7a4a','🛒'],['house','บ้านชาวเมือง',400,420,'#8a6a3a','🏠'],['house','บ้านชาวเมือง',950,420,'#6a5a8a','🏠'],['barracks','โรงอัศวิน',400,600,'#3a4a8a','🛡'],['inn','โรงเตี้ยม',950,600,'#8a3a3a','🛏'],['house','บ้านชาวเมือง',520,690,'#7a6a4a','🏠'],['house','บ้านชาวเมือง',830,690,'#5a7a6a','🏠'],['cave','ถ้ำปีศาจ',1226,150,'#3a2a3a','🕳']];
const SN=[['Dragger Swings','Platelets Shatter','⚔','🩸'],['Dragger Waves','Scythe Song','🌊','🌀'],['Cross Snap','Bloody Execution','❄','☠']];
const COL={r:'#ff4040',b:'#4aa3ff',y:'#ffe14a',d:'#7a0016',v:'#ff3a5a',w:'#9fdcff'};
const sm=k=>g.p.it.reduce((a,i)=>a+(IT[i][5][k]||0),0),AT=()=>12+g.p.lv*3+sm('atk'),MH=()=>100+g.p.lv*20+sm('hp'),MM=()=>50+g.p.lv*8+sm('mp'),SP=()=>70+sm('spd'),LS=()=>.25+sm('ls'),CD=()=>1-M.min(.4,sm('cd')),DR=()=>M.min(.6,sm('def')),AP=()=>sm('ap'),MR=()=>sm('mr'),AS=()=>sm('as');
const D=(a,b)=>M.hypot(a.x-b.x,a.y-b.y),inC=()=>g.cir&&D(g.p,g.cir)<g.cir.r,dark=()=>M.max(0,-M.sin(2*PI*(g.t%180)/180))*.6;
const tmo=(t,f)=>tm.push([t,f]),near=r=>{let b=null,d=r;for(const e of g.en)if(!e.dead&&D(g.p,e)<d){d=D(g.p,e);b=e}return b};
function rs(){S=M.max(2,M.round(innerHeight/170));W=(cv.width=innerWidth)/S;H=(cv.height=innerHeight)/S}addEventListener('resize',rs);rs();
for(let i=0;i<40;i++)sf.push({x:R()*500,y:R()*900,s:20+R()*30});
let sd=7;const rn=()=>(sd=(sd*16807)%2147483647)/2147483647,TR=[];for(let i=0;i<2400;i++){const a=rn()*WW,b=rn()*WH,k=bio(a,b);if(rn()<[.35,1,0,.6][k]&&!(a>TW.x-30&&a<TW.x+TW.w+30&&b>TW.y-30&&b<TW.y+TW.h+30))TR.push([a|0,b|0,k])}TR.sort((a,b)=>a[1]-b[1]);
function say(t){const e=$('ts');e.textContent=t;e.hidden=0;clearTimeout(say.h);say.h=setTimeout(()=>e.hidden=1,1800)}
function ov(h,b){hs=b||[];$('ov').innerHTML=h;$('ov').hidden=0}function cl(){$('ov').hidden=1;hs=[]}
function dlg(n,t,o){ov('<div class=bx><b>'+n+'</b><p>'+t+'</p>'+o.map((a,i)=>'<button data-i='+i+'>'+a[0]+'</button>').join('')+'</div>',o.map(a=>a[1]))}
$('ov').onclick=e=>{const i=e.target.dataset.i;if(i!=null&&hs[i])hs[i]()};
function fresh(){return{p:{x:700,y:560,hp:100,mp:50,lv:1,xp:0,gd:50,sp:0,sk:[1,1,1],cd:[0,0,0,0],acd:0,form:0,bt:0,ch:0,s1:0,s1L:1,fast:0,hb:0,n:0,a:0,pot:[3,2],it:[],q:null,dash:null},t:45,en:[],cir:null,sp:0,bk:0}}
let srv=0,pass='',gst=0;fetch('/api/ping').then(r=>{if(r.ok){srv=1;if($('nm')&&!g)login()}}).catch(()=>{});
const sha=async s=>{try{return[...new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s)))].map(b=>b.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(const c of s)h=h*33^c.charCodeAt(0);return''+(h>>>0)}};
const api=(u,b)=>fetch('/api/'+u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b),keepalive:true}).then(async r=>Object.assign(await r.json().catch(()=>({})),{st:r.status})).catch(()=>({st:0}));
function login(msg){ov('<div class=bx><h2>❄ WinterRPG</h2><p>'+(msg||'ปีศาจ เลือด ฤดูหนาว')+'</p><input id=nm placeholder="ชื่อบัญชี" maxlength=12><input id=pw type=password placeholder="รหัสผ่าน (4 ตัวขึ้นไป)"><button data-i=0>เข้าสู่ระบบ</button><button data-i=1>สมัครสมาชิกใหม่</button><button data-i=2>👤 เล่นแบบ Guest (ไม่ต้องสมัคร)</button><small>'+(srv?'บันทึกบนเซิร์ฟเวอร์ (โฟลเดอร์ saves)':'บันทึกในเบราว์เซอร์นี้')+'</small></div>',[()=>auth(0),()=>auth(1),guest])}
async function auth(reg){const n=$('nm').value.trim(),w=$('pw').value;if(!n||n[0]=='~'||w.length<4)return login('ใส่ชื่อและรหัสผ่าน (4 ตัวขึ้นไป)');aud();FS();gst=0;let s=null;
if(srv){const r=await api(reg?'register':'login',{u:n,p:w});if(r.st!=200)return login(reg?'สมัครไม่ได้: ชื่อนี้ถูกใช้แล้ว':'ชื่อหรือรหัสผ่านไม่ถูกต้อง');s=r.save}
else{const k='wr:acct:'+n,a=JSON.parse(localStorage.getItem(k)||'null');
if(reg){if(a)return login('ชื่อนี้ถูกใช้แล้ว');const salt=crypto.randomUUID?crypto.randomUUID():''+R();localStorage.setItem(k,JSON.stringify({s:salt,h:await sha(salt+w)}))}
else if(!a||a.h!=await sha(a.s+w))return login('ชื่อหรือรหัสผ่านไม่ถูกต้อง');
try{s=JSON.parse(localStorage.getItem('wr:'+n))}catch(e){}}
me=n;pass=w;g=fresh();if(s&&s.p){Object.assign(g.p,s.p,{ch:0,s1:0,dash:null,form:0,bt:0,fast:0,hb:0,hold:0,cd:[0,0,0,0]});g.t=s.t;go()}else pick()}
function pick(){ov('<div class=bx><h3>เลือกตัวละคร</h3><div class=ch><b>Winter</b> <small>ลูกครึ่งปีศาจ</small>'+SDH()+'</div><div class="ch off"><b>Hastos</b> - the knight<br>Coming soon</div><div class="ch off"><b>Eliana</b> - bloody slingshot<br>Coming soon</div><button data-i=0>เริ่มเกม</button></div>',[go])}
function go(){cl();$('hud').hidden=0;g.en=[];for(let i=0;i<40;i++)spawn();g.p.hp=M.min(g.p.hp,MH())||MH()}
function spawn(){let X,Y;do{X=40+R()*(WW-80);Y=40+R()*(WH-80)}while(X>TW.x-70&&X<TW.x+TW.w+70&&Y>TW.y-70&&Y<TW.y+TW.h+70);const dd=M.hypot(X-700,Y-500);g.en.push(Object.assign({x:X,y:Y,sl:0,stun:0,cd:0},ST[bt(X,Y,dd)]))}
function gain(v){const p=g.p;p.xp+=v;while(p.xp>=p.lv*60){p.xp-=p.lv*60;p.lv++;p.sp++;p.hp=MH();p.mp=MM();sfx('l');say('เลเวลอัพ! Lv'+p.lv+' (+1 แต้มสกิล)')}}
function kill(e){const p=g.p,q=p.q;p.gd+=e.gd;gain(e.xp);if(e.boss)g.bk=1;if(q&&!q.done){const s=QS[q.id];if((s.k=='kill'&&!e.boss)||(s.k=='boss'&&e.boss)){q.pr++;if(q.pr>=s.need){q.done=1;say('เควสสำเร็จ! กลับไปส่งที่กิลด์')}}}if(R()<.25)p.pot[R()<.5?0:1]++}
function hit(e,d,tr){const p=g.p;d=M.round(d);e.hp-=d;fl.push({x:e.x,y:e.y-10,s:d,c:tr?'#fff':'#ffd54a',t:.8});sfx('h');p.hp=M.min(MH(),p.hp+d*(LS()+(p.form||inC()?.1:0)));if(e.hp<=0&&!e.dead){e.dead=1;kill(e)}}
function aoe(X,Y,r,d,ex){g.en.forEach(e=>{if(!e.dead&&e!==ex&&M.hypot(e.x-X,e.y-Y)<r)hit(e,d)})}
function shoot(o){pr.push(Object.assign({life:1,r:5,hit:[]},o))}
function fx(o,e){const p=g.p,k=o.k;if(k=='r'||k=='d')aoe(e.x,e.y,30,o.d*.5,e);if(k=='d'||k=='y'||k=='w')e.sl=2;if(k=='b'||k=='v'){p.cd[0]=M.max(0,p.cd[0]-.5);p.cd[1]=M.max(0,p.cd[1]-.5)}}
function atk(){const p=g.p;if(p.acd>0||p.ch>0||p.dash)return;const e=near(220);if(!e)return;const d=D(p,e),A=AT(),B=p.form,C=inC(),sp=p.hb>0?(C?1.4:1.25):1;p.a=M.atan2(e.y-p.y,e.x-p.x);p.n++;const co=M.cos(p.a),si=M.sin(p.a);
if(p.s1>0&&d<130){p.s1=0;p.cd[0]=6*CD();p.x=e.x-co*14;p.y=e.y-si*14;e.stun=.75;hit(e,A*1.8*p.s1L);p.acd=.5;return}
if(d<44){const nh=B&&p.hb>0?(C?3:2):1;for(let k=0;k<nh;k++)tmo(k*.08,()=>{if(e.dead&&!(B&&C))return;if(B&&C)aoe(p.x,p.y,48,A*1.2);else hit(e,A*.7)});p.acd=B&&C?1.1:.35}
else{let k=null;if(B){if(p.n%2==0)k=['d','v'][(p.n/2|0)%2]}else if(p.n%3==0)k=['r','b','y'][(p.n/3|0)%3];shoot({x:p.x,y:p.y,vx:co*(B&&!C?150:220),vy:si*(B&&!C?150:220),d:A*1.3*(k=='d'?1.3:1),k,c:COL[k]||'#ddd',life:.9});p.acd=B?.8:.9}
p.acd/=sp*(1+AS())}
function cast(i,ang){const p=g.p;if(!g||p.ch>0||p.cd[i]>0||p.dash)return;const mc=[8,12,20][i];if(p.mp<mc)return say('มานาไม่พอ');sfx('c');const L=1+.15*(p.sk[i]-1),A=AT()*L*(1+AP()),e=near(260),B=p.form,C=inC(),cd=CD();if(ang!=null)p.a=ang;else if(e)p.a=M.atan2(e.y-p.y,e.x-p.x);const co=M.cos(p.a),si=M.sin(p.a);
if(i==0){p.mp-=mc;if(!B){p.s1=3;p.s1L=L;p.cd[0]=99;say('โจมตีปกติครั้งต่อไปจะพุ่งสตั้น')}else{p.hold=1;p.hd=0;p.fast=99;p.cd[0]=99}}
if(i==1){p.mp-=mc;p.cd[1]=(B?8:7)*cd;if(!B){if(e&&D(p,e)<80)e.stun=.8;[-9,9].forEach(o=>shoot({x:p.x-si*o,y:p.y+co*o,vx:co*200,vy:si*200,d:A*1.2,k:'w',c:COL.w,life:.8,r:9,pierce:1}))}
else if(C){p.dash={vx:co*650,vy:si*650,t:.2};tmo(.2,()=>aoe(p.x,p.y,55,A*1.5))}
else for(let k=0;k<6;k++)tmo(k*.2+.01,()=>{const X=p.x+co*35,Y=p.y+si*35;g.en.forEach(z=>{if(!z.dead&&M.hypot(z.x-X,z.y-Y)<40){hit(z,A*(k==5?1.8:.5));z.x+=co*10;z.y+=si*10}})})}
if(i==2){if(!B){p.mp-=mc;p.ch=3;p.cd[2]=99;say('กำลังชาร์จร่างโลหิต...');return}if(!e)return say('ไม่มีเป้าหมาย');p.mp-=mc;p.cd[2]=8*cd;
if(C){const f=e.boss?.2:1,r=g.cir.r;e.stun=1;tmo(1,()=>{if(e.dead)return;hit(e,e.mh*.75*f,1);if(e.dead)tmo(5,()=>aoe(e.x,e.y,r,A*3))})}
else{p.hp=M.max(1,p.hp-MH()*.35);shoot({x:p.x,y:p.y,vx:co*220,vy:si*220,d:e.mh*.16*(e.boss?.3:1),tr:1,c:'#ff1a3a',life:1,r:8})}}}
function heal(){const p=g.p;if(p.cd[3]>0)return;p.hp=M.min(MH(),p.hp+MH()*.35);p.cd[3]=45*CD();fl.push({x:p.x,y:p.y-14,s:'+HP',c:'#6f6',t:.8})}
function use(k){const p=g.p;if(p.pot[k]<1)return say('ของหมด ซื้อได้ที่ตลาด');p.pot[k]--;if(k)p.mp=M.min(MM(),p.mp+40);else p.hp=M.min(MH(),p.hp+60)}
function die(){const p=g.p;p.hp=MH();p.mp=MM();p.gd=p.gd*.8|0;p.x=700;p.y=560;p.form=0;p.ch=0;g.cir=null;g.dn=0;g.en=g.en.filter(e=>!e.el);sfx('d');say('คุณพ่ายแพ้ ถูกพากลับเมือง')}
function npc(b){return{x:b[2]+25,y:b[3]+46}}
const buy=(c,f,cat)=>{if(g.p.gd<c)return say('เงินไม่พอ');g.p.gd-=c;f();cat==null?NO.market():NO.shop(cat)};
const NP={
guild(){const p=g.p,q=p.q;if(q&&q.done){const s=QS[q.id];return dlg('พนักงานกิลด์','ทำได้ดีมาก! รางวัล '+s.gold+' ทอง และ '+s.xp+' EXP',[['รับรางวัล',()=>{p.gd+=s.gold;gain(s.xp);p.q=null;cl()}]])}
if(q)return dlg('พนักงานกิลด์','เควสปัจจุบัน: '+QS[q.id].n,[['ยกเลิกเควส',()=>{p.q=null;cl()}],['ปิด',cl]]);
dlg('พนักงานกิลด์','มีงานให้เลือกดังนี้',QS.map((s,i)=>[s.n+' ('+s.gold+'g)',()=>{p.q={id:i,pr:0,done:0};cl();say('รับเควสแล้ว')}]).concat([['ปิด',cl]]))},
market(){const p=g.p;if(p.q&&p.q.id==1&&!p.q.done){p.q.done=1;say('ส่งพัสดุแล้ว กลับไปรายงานที่กิลด์')}
dlg('พ่อค้า','ยินดีต้อนรับ! คุณมี '+p.gd+' ทอง เลือกหมวดสินค้า',CT.map((c,i)=>[c,()=>NO.shop(i)]).concat([['ปิด',cl]]))},
shop(c){const p=g.p;if(c==4)return dlg('🍞 อาหารและยา • '+p.gd+'g','ขนมปังอุ่นๆ ชามานาร้อนๆ',[['🍞 ขนมปัง ฟื้น 60 HP (15g) มี '+p.pot[0],()=>buy(15,()=>p.pot[0]++,4)],['🍵 ชามานา ฟื้น 40 MP (15g) มี '+p.pot[1],()=>buy(15,()=>p.pot[1]++,4)],['← กลับ',()=>NO.market()]]);
dlg(CT[c]+' • '+p.gd+'g • ช่อง '+p.it.length+'/6','แตะสินค้าเพื่อซื้อ ขายของเก่าได้ที่ปุ่มกระเป๋า',Object.keys(IT).filter(k=>IT[k][4]==c).map(k=>[IT[k][3]+IT[k][0]+' '+IT[k][1]+' ('+IT[k][2]+'g)'+(p.it.includes(k)?' ✓':''),()=>{if(p.it.includes(k))return say('มีแล้ว');if(p.it.length>=6)return say('ช่องไอเทมเต็ม ไปขายที่กระเป๋าก่อน');buy(IT[k][2],()=>p.it.push(k),c)}]).concat([['← กลับ',()=>NO.market()]]))},
inn(){const r=n=>()=>{if(g.p.gd<30)return say('เงินไม่พอ');g.p.gd-=30;g.p.hp=MH();g.p.mp=MM();g.t=n?135:45;cl();say(n?'พักถึงค่ำ HP/MP เต็ม':'พักถึงเช้า HP/MP เต็ม')};dlg('เจ้าของโรงเตี้ยม','เช่าห้อง 30 ทอง ฟื้น HP/MP ทันที และเลือกเวลาได้',[['พักจนเช้า',r(0)],['พักจนค่ำ',r(1)],['ปิด',cl]])},
church(){dlg('มกุฎ (ตัวละครปริศนา)','ข้าเปลี่ยนวิญญาณนักรบให้เจ้าได้... เมื่อถึงเวลา',[['Winter (กำลังใช้)',cl],['Hastos - Coming soon',cl],['Eliana - Coming soon',cl]])}};
function nearNpc(){for(const b of BD)if(D(g.p,npc(b))<32)return b}
function qtxt(){const q=g.p.q;return q?QS[q.id].n+(q.done?' ✓ กลับไปส่งที่กิลด์':' '+(q.pr||0)+'/'+(QS[q.id].need||1)):'ไม่มี (รับที่กิลด์)'}
function menu(){const p=g.p;ov('<div class=bx><b>Winter Lv'+p.lv+'</b><p>โจมตี '+AT()+' • HP '+MH()+' • MP '+MM()+' • แต้มสกิล '+p.sp+'</p>'+SN.map((n,i)=>'<div class=r><span>'+(i+1)+'. '+n[0]+' / '+n[1]+' (Lv'+p.sk[i]+'/5)</span><button data-i='+i+'>+</button></div>').join('')+'<p>ไอเทม ('+p.it.length+'/6): '+(p.it.map(k=>IT[k][3]+IT[k][0]).join(' ')||'ยังไม่มี')+'</p><p>เควส: '+qtxt()+'</p><button data-i=6>⚙ ตั้งค่า</button><button data-i=3>บันทึก</button><button data-i=4>ออกจากระบบ</button><button data-i=5>ปิด</button></div>',[0,1,2].map(i=>()=>{if(p.sp>0&&p.sk[i]<5){p.sp--;p.sk[i]++;menu()}}).concat([()=>{save();say('บันทึกแล้ว')},()=>{save();g=null;$('hud').hidden=1;login()},cl,cfgp]))}
function upd(dt){const p=g.p;g.t+=dt;g.sp-=dt;
tm=tm.filter(a=>{a[0]-=dt;if(a[0]<=0){a[1]();return 0}return 1});
for(let i=0;i<4;i++)if(!(i==0&&p.s1>0))p.cd[i]=M.max(0,p.cd[i]-dt);p.acd-=dt;
if(p.s1>0){p.s1-=dt;if(p.s1<=0)p.cd[0]=6*CD()}
if(p.fast>0){p.fast-=dt;if(p.fast<=0&&p.form)p.hb=5}if(p.hb>0)p.hb-=dt;if(p.hold){p.hd+=dt;if(p.hd>=5||!p.form)rel()}
if(p.form){p.bt-=dt;if(p.bt<=0){p.form=0;p.cd[2]=20*CD()}}
if(p.ch>0){p.ch-=dt;if(p.ch<=0){p.form=1;p.bt=30;g.cir={x:p.x,y:p.y,r:170,t:25};p.cd[2]=0;say('ร่างโลหิต! วงฤดูหนาวสีแดงชาด')}}
if(g.cir){g.cir.t-=dt;if(g.cir.t<=0)g.cir=null}
p.hp=M.min(MH(),p.hp+dt*1.2);p.mp=M.min(MM(),p.mp+dt*(3+MR()));
let X=(K[KB.right]||K.arrowright?1:0)-(K[KB.left]||K.arrowleft?1:0)+jx,Y=(K[KB.down]||K.arrowdown?1:0)-(K[KB.up]||K.arrowup?1:0)+jy;const l=M.hypot(X,Y);
if(p.dash){p.x+=p.dash.vx*dt;p.y+=p.dash.vy*dt;p.dash.t-=dt;if(p.dash.t<=0)p.dash=null}
else if(l>.1&&p.ch<=0){const s=SP()*(p.fast>0?1.4:1)*(inC()?1.15:1);p.x+=X/M.max(l,1)*s*dt;p.y+=Y/M.max(l,1)*s*dt;p.a=M.atan2(Y,X)}
p.x=M.max(8,M.min(WW-8,p.x));p.y=M.max(8,M.min(WH-8,p.y));
if(ah||K[KB.atk])atk();
const nt=dark()>.3,bs=g.en.find(e=>e.boss);if(!nt)g.bk=0;const bq=p.q&&p.q.id==2&&!p.q.done;if(nt&&!bs&&(!g.bk||bq))g.en.push({t:'boss',boss:1,x:LAIR.x,y:LAIR.y+20,hp:900,mh:900,sp:48,d:25,xp:250,gd:200,sl:0,stun:0,cd:0});if(!nt&&bs&&!bq)g.en=g.en.filter(e=>!e.boss);
g.en=g.en.filter(e=>!e.dead);if(g.sp<=0){g.sp=3;if(g.en.filter(e=>!e.boss&&!e.el).length<44)spawn()}
for(const e of g.en){e.cd-=dt;e.sl-=dt;out(e);if(e.stun>0){e.stun-=dt;continue}const T=g.vl&&D(e,g.vl)<D(e,p)?g.vl:p,d=D(T,e);if(d<(e.boss?400:240)&&d>10){const s=e.sp*(e.sl>0?.5:1)*dt;e.x+=(T.x-e.x)/d*s;e.y+=(T.y-e.y)/d*s}
if(d<12&&e.cd<=0){e.cd=1;const m=e.d*(nt?1.3:1);if(T===p){p.hp-=m*(1-DR());if(p.hp<=0)die()}else T.hp-=m}}
const q=p.q;if(q&&q.id==3&&!q.done&&!g.vl)g.vl={x:p.x-10,y:p.y,hp:60};if(!(q&&q.id==3))g.vl=null;
if(g.vl){const v=g.vl,d=D(v,p);if(d>24){v.x+=(p.x-v.x)/d*48*dt;v.y+=(p.y-v.y)/d*48*dt}if(!q.done&&D(v,CAB)<30){q.done=1;say('ส่งชาวบ้านถึงที่หมายแล้ว กลับไปรายงานที่กิลด์')}if(v.hp<=0&&!q.done){p.q=null;g.vl=null;say('ชาวบ้านเสียชีวิต เควสล้มเหลว')}}
if(g.dn&&!g.en.some(e=>e.el)){g.dn=0;const ks=Object.keys(IT).filter(k=>!p.it.includes(k));if(ks.length&&p.it.length<6){const k=ks[R()*ks.length|0];p.it.push(k);say('ล้างถ้ำสำเร็จ! ได้ '+IT[k][0])}else{p.gd+=150;say('ล้างถ้ำสำเร็จ! ได้ 150 ทอง')}tmo(3,()=>{p.x=1251;p.y=205})}
pr=pr.filter(o=>{o.x+=o.vx*dt;o.y+=o.vy*dt;o.life-=dt;for(const e of g.en){if(e.dead||o.hit.includes(e))continue;if(D(o,e)<o.r+7){o.hit.push(e);hit(e,o.d,o.tr);fx(o,e);if(!o.pierce){o.life=0;break}}}return o.life>0});
fl=fl.filter(f=>{f.y-=12*dt;return(f.t-=dt)>0});
sf.forEach(s=>{s.y+=s.s*dt;s.x-=6*dt;if(s.y>H)s.y=0;if(s.x<0)s.x=W})}
const rc=(c,a,b,w,h)=>{x.fillStyle=c;const X=M.floor((a-cx)*S),Y=M.floor((b-cy)*S);x.fillRect(X,Y,M.ceil((a-cx+w)*S)-X,M.ceil((b-cy+h)*S)-Y)};
const MAN=["....HHHHHH....","....HHHHHH....","....YYYYYY....","..HHHHHHHHHH..","...KSSSSSSK...","...SSESSESS...","....SSSSSS....","...CCCYYCCC...","..CCCCYYCCCC..",".SCCCCYYCCCCS.",".SCCCCYYCCCCS.","..CCCCYYCCCC..","..CCCCYYCCCC..","..YYYYYYYYYY..","...CCCCCCCC...","....BB..BB....","....BB..BB...."],
IMP=["K........K","RR......RR",".RRRRRRRR.","RRYRRRRYRR","RRRRRRRRRR",".RRKKKKRR.",".RRRRRRRR.","..RRRRRR..","..RR..RR..","..KK..KK.."],
WLF=["............PP..","..PPPPPPPPPPPPP.",".PPPPPPPPPPPPYPP","PPPPPPPPPPPPPPPP",".PPPPPPPPPPPPPP.","..PP..PP..PP.PP.","..KK..KK..KK.KK."],
TRE=["....W....","...GWG...","..GGWGG..","...GGG...","..GGGGG..",".GGGGGGG.","..GGGGG..",".GGGGGGG.","GGGGGGGGG","....T....","....T...."],
BP={Y:'#f5c542',S:'#f2c9a0',K:'#2b1b14',E:'#222',B:'#1a1a2a'},TP={W:'#fff',G:'#1f4d3a',T:'#5a3a22'};
const SC=new WeakMap();
function hx(c){if(c.length==4)c='#'+c[1]+c[1]+c[2]+c[2]+c[3]+c[3];const n=parseInt(c.slice(1,7),16);return[n>>16,n>>8&255,n&255]}
function bake(m,p){const h=m.length,w=m[0].length,E=[],G=(j,i)=>j<0||i<0||j>=h||i>=w?'':p[m[j][i]]||'';
for(let j=0;j<2*h;j++)E[j]=[];
for(let j=0;j<h;j++)for(let i=0;i<w;i++){const P=G(j,i),A=G(j-1,i),B=G(j,i+1),C=G(j,i-1),D=G(j+1,i);let a=P,b=P,c=P,d=P;if(C==A&&C!=D&&A!=B)a=A;if(A==B&&A!=C&&B!=D)b=B;if(D==C&&D!=B&&C!=A)c=C;if(B==D&&B!=A&&D!=C)d=D;E[2*j][2*i]=a;E[2*j][2*i+1]=b;E[2*j+1][2*i]=c;E[2*j+1][2*i+1]=d}
const e=(j,i)=>j<0||i<0||j>=2*h||i>=2*w?'':E[j][i],o=document.createElement('canvas');o.width=2*w+2;o.height=2*h+2;const q=o.getContext('2d');
for(let j=-1;j<=2*h;j++)for(let i=-1;i<=2*w;i++){const c=e(j,i);if(c){let f=1.1-.28*j/(2*h);if(!e(j-1,i)||!e(j,i-1))f+=.14;if(!e(j+1,i)||!e(j,i+1))f-=.14;q.fillStyle='rgb('+hx(c).map(v=>M.min(255,M.max(0,v*f|0))).join()+')'}else if(e(j-1,i)||e(j+1,i)||e(j,i-1)||e(j,i+1))q.fillStyle='rgba(8,12,24,.8)';else continue;q.fillRect(i+1,j+1,1,1)}
return o}
function spr(m,p,X,Y,k){let o=SC.get(m);if(!o)SC.set(m,o={});const key=JSON.stringify(p),c=o[key]||(o[key]=bake(m,p)),pk=k*S/2;x.imageSmoothingEnabled=false;x.drawImage(c,M.floor((X-m[0].length*k/2-k/2-cx)*S),M.floor((Y-m.length*k-k/2-cy)*S),M.round(c.width*pk),M.round(c.height*pk))}
const man=(X,Y,C,H,K)=>{shd(MAN,X,Y+6,.6);spr(MAN,Object.assign({C,H},BP,K?{K}:null),X,Y+6,.6)};
function bld(b){const X=b[2],Y=b[3],c=b[4];bsh(X,Y);rc('#d6c7a8',X,Y+8,50,28);rc('#b8a888',X,Y+30,50,6);rc(c,X-3,Y+1,56,9);rc(c,X+4,Y-5,42,7);rc('#fff',X-3,Y+1,56,1.5);rc('#5a3a22',X+20,Y+22,10,14);rc('#8fd0ff',X+5,Y+15,9,8);rc('#8fd0ff',X+36,Y+15,9,8);rc('#fff',X+4,Y+13,11,1.5);rc('#fff',X+35,Y+13,11,1.5);x.font='bold '+6*S+'px sans-serif';x.lineWidth=2;x.strokeStyle='#000';x.fillStyle='#fff';const t=b[5]+b[1],tx=(X-cx-2)*S,ty=(Y-cy-8)*S;x.strokeText(t,tx,ty);x.fillText(t,tx,ty)}
function draw(){const p=g.p;cx=M.max(0,M.min(WW-W,p.x-W/2));cy=M.max(0,M.min(WH-H,p.y-H/2));
{const ph=(g.t%180)/180,dp=M.min(1,ph*2),el=M.max(.15,M.sin(PI*dp));if(ph<.5){SH.sk=(dp-.5)*3;SH.ln=M.min(1,.4/el);SH.al=.16+.2*el}else{SH.sk=.4;SH.ln=.3;SH.al=.14}}
for(let i=cx/16|0;i<(cx+W)/16;i++)for(let j=cy/16|0;j<(cy+H)/16;j++){const k=bio(i*16+8,j*16+8),h=(i*7+j*13)%11;rc(BC[k],i*16,j*16,16,16);if(h==0)rc(PC[k],i*16,j*16,16,16);if(k==2&&h%4==1)rc('rgba(255,255,255,.55)',i*16+3,j*16+6,9,1);if(k==3&&h==5)rc('rgba(138,42,58,.4)',i*16+4,j*16+4,3,3);if(k==1&&h==4)rc('rgba(42,90,74,.3)',i*16+5,j*16+5,2,2)}
rc('#c7b99a',690,0,20,WH);rc('#c7b99a',0,490,WW,20);rc('#a9b4c2',TW.x,TW.y,TW.w,TW.h);rc('#c3ccd8',540,370,320,260);rc('#6fa7d6',680,480,40,40);rc('#e9f1f8',690,490,20,20);
LP.forEach(a=>{rc('#444',a[0],a[1],1.5,8);rc('#ffd54a',a[0]-1,a[1]-2,3.5,3)});
[TW.y,TW.y+TW.h].forEach(y=>{rc('#6f7f92',TW.x,y,TW.w/2-20,3);rc('#6f7f92',TW.x+TW.w/2+20,y,TW.w/2-20,3)});[TW.x,TW.x+TW.w].forEach(X=>{rc('#6f7f92',X,TW.y,3,TW.h/2-20);rc('#6f7f92',X,TW.y+TW.h/2+20,3,TW.h/2-20)});
rc('#2a2a3a',DG.x,DG.y,DG.w,DG.h);[[0,0,DG.w,3],[0,DG.h-3,DG.w,3],[0,0,3,DG.h],[DG.w-3,0,3,DG.h]].forEach(a=>rc('#777',DG.x+a[0],DG.y+a[1],a[2],a[3]));
rc('#7a4a2a',CAB.x-14,CAB.y-8,28,18);rc('#fff',CAB.x-16,CAB.y-13,32,6);rc('#3a2a1a',CAB.x-3,CAB.y+1,6,9);
BD.forEach(b=>{bld(b);man(b[2]+25,b[3]+46,b[4],'#555')});
TR.forEach(t=>{if(t[0]<cx-20||t[0]>cx+W+20||t[1]<cy-30||t[1]>cy+H+30)return;shd(TRE,t[0],t[1]+5,.9);spr(TRE,TPS[t[2]]||TP,t[0],t[1]+5,.9)});
if(g.cir){const c=g.cir;x.fillStyle='rgba(192,40,60,.2)';x.strokeStyle='#c0283c';x.lineWidth=S;x.beginPath();x.arc((c.x-cx)*S,(c.y-cy)*S,c.r*S,0,2*PI);x.fill();x.stroke()}
g.en.forEach(e=>{if(M.abs(e.x-p.x)>W||M.abs(e.y-p.y)>H)return;const b=e.boss;shd(b?IMP:e.t=='wolf'?WLF:IMP,e.x,b?e.y+12:e.y+5,b?1.5:e.t=='wolf'?.7:ET[e.t].k);
if(b)spr(IMP,{R:'#5a0010',K:'#111',Y:'#ffd54a'},e.x,e.y+12,1.5);else if(e.t=='wolf')spr(WLF,{P:e.el?'#7a2038':'#5b3a6e',Y:e.el?'#ff4040':'#ffd54a',K:'#222'},e.x,e.y+5,.7);else{const z=ET[e.t];spr(IMP,z.p,e.x,e.y+5,z.k)}
const w=b?22:12,by=e.y-(b?8:9);if(e.stun>0)rc('#ff0',e.x-3,by-3,6,2);rc('#300',e.x-w/2,by,w,2);rc('#e33',e.x-w/2,by,w*e.hp/e.mh,2)});
if(g.vl){const v=g.vl;man(v.x,v.y,'#c9a227','#6b4a2a');rc('#300',v.x-6,v.y-10,12,2);rc('#6f6',v.x-6,v.y-10,12*M.max(0,v.hp)/60,2)}
pr.forEach(o=>rc(o.c||'#fff',o.x-o.r/2,o.y-o.r/2,o.r,o.r));
if(AIM&&AIM.on){x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=S;x.setLineDash([S*3,S*2]);x.beginPath();x.moveTo((p.x-cx)*S,(p.y-cy)*S);x.lineTo((p.x+M.cos(AIM.a)*90-cx)*S,(p.y+M.sin(AIM.a)*90-cy)*S);x.stroke();x.setLineDash([])}if(p.ch>0)rc('#c0283c88',p.x-14,p.y-14,28,28);
man(p.x,p.y,p.form?'#7a1020':'#2a5db0',p.form?'#7a1020':'#2a5db0',p.form?'#ff3a5a':0);
x.font='bold '+7*S+'px sans-serif';fl.forEach(f=>{x.fillStyle=f.c;x.fillText(f.s,(f.x-cx-6)*S,(f.y-cy)*S)});
lit();x.fillStyle='#fff';sf.forEach(s=>x.fillRect((s.x%W)*S|0,s.y*S|0,S>>1,S>>1))}
QS.push({n:'คุ้มกันชาวบ้านไปกระท่อมป่า',k:'esc',gold:120,xp:120});
NP.barracks=()=>{const p=g.p;dlg('อัศวินเฝ้าโรง','นี่คือโรงอัศวิน ท่านฮาสทอสออกลาดตระเวนอยู่ จะกลับมาร่วมทีมเร็วๆ นี้ (Coming soon)',[['ฝึกกับหุ่นไม้ 40g (+40 EXP)',()=>{if(p.gd<40)return say('เงินไม่พอ');p.gd-=40;gain(40);cl()}],['ปิด',cl]])};
NP.cave=()=>dlg('ผู้เฝ้าถ้ำ','ถ้ำปีศาจเต็มไปด้วยหมาป่าโลหิต ผู้ที่ล้างถ้ำได้จะได้ไอเทม',[['เข้าดันเจี้ยน',()=>{cl();enter()}],['ปิด',cl]]);
function enter(){const p=g.p;p.x=DG.x+DG.w/2;p.y=DG.y+DG.h-30;g.dn=1;for(let i=0;i<5;i++)g.en.push({t:'wolf',el:1,x:DG.x+30+i*45,y:DG.y+40+(i%2)*30,hp:160,mh:160,sp:60,d:16,xp:60,gd:35,sl:0,stun:0,cd:0});say('เข้าสู่ถ้ำปีศาจ!')}
function FS(t){try{if(!document.fullscreenElement)document.documentElement.requestFullscreen().then(()=>screen.orientation.lock('landscape')).catch(()=>{});else if(t)document.exitFullscreen()}catch(e){}}$('fs').onclick=()=>FS(1);

function rel(){const p=g&&g.p;if(!p||!p.hold)return;p.hold=0;p.fast=0;if(p.hd>=2){p.hb=5;say('ตีเร็วขึ้น 5 วินาที')}p.cd[0]=10*CD()}
const NO=Object.assign({},NP),TK={guild:['พนักงานกิลด์','ฤดูหนาวนี้ปีศาจออกมาเยอะ กิลด์ขาดมือนักล่า','เมื่อก่อนวงฤดูหนาวสีแดงชาดเป็นแค่ตำนาน จนมีลูกครึ่งปีศาจผมสั้นโผล่มา','เควสทุกอย่างจ่ายตรง ทองกับ EXP ไม่หายไปไหน'],market:['พ่อค้า','ขนมปังอุ่นๆ ชามานาร้อนๆ! หิมะตกหนักของขายดี','ผ้าพันคอแดงนั่นน่ะ ใส่แล้วเลือดไหลกลับเข้าตัวว่ากันอย่างนั้น','ไปส่งพัสดุก็อย่าลืมแวะมาหาข้านะ'],inn:['เจ้าของโรงเตี้ยม','คืนนี้ลมแรง ได้ยินเสียงร้องจากถ้ำทางเหนือ','ห้องอุ่นๆ ราคา 30 ทอง นอนแล้วเลือดลมกลับมาเต็ม','บอสโลหิตออกมาแต่ตอนกลางคืนเท่านั้นนะ'],church:['มกุฎ','ศาสนจักรเก็บวิญญาณนักรบไว้หลายดวง...','ฮาสทอสกับเอเลียนาจะตื่นขึ้นเมื่อถึงเวลา','เจ้าเองก็มีเลือดปีศาจอยู่ ข้ามองออก'],barracks:['อัศวินเฝ้าโรง','อัศวินทุกคนผ่านหุ่นไม้พวกนี้มาแล้วทั้งนั้น','ท่านฮาสทอสชอบลาดตระเวนตอนหิมะตก','ถ้าเจ้าฝึกหนักพอ ข้าอาจแนะนำเจ้าให้ท่านรู้จัก'],cave:['ผู้เฝ้าถ้ำ','ข้าเฝ้าถ้ำนี้มาสิบปี ยังไม่เคยเห็นใครล้างได้หมด','หมาป่าในนั้นแข็งกว่าที่ข้างนอกมาก','ใครล้างถ้ำได้ จะได้ของดีกลับไปเสมอ']};
function talk(k,t,i){dlg(t[0],t[1+i],[['ทำธุระ',NO[k]],['คุยต่อ',()=>talk(k,t,(i+1)%(t.length-1))],['ลาก่อน',cl]])}
Object.keys(TK).forEach(k=>{NP[k]=()=>{const t=TK[k],c=g.tk=g.tk||{};c[k]=k in c?(c[k]+1)%(t.length-1):0;talk(k,t,c[k])}});
const ST=[{t:'imp',hp:40,mh:40,sp:40,d:7,xp:15,gd:8},{t:'wolf',hp:90,mh:90,sp:55,d:12,xp:32,gd:18},{t:'ghoul',hp:170,mh:170,sp:45,d:18,xp:60,gd:30},{t:'wraith',hp:280,mh:280,sp:52,d:26,xp:100,gd:50}],ET={imp:{p:{R:'#b3202f',K:'#600',Y:'#ffd54a'},k:.7},ghoul:{p:{R:'#4a7a4a',K:'#1a2a1a',Y:'#ff6040'},k:.9},wraith:{p:{R:'#7ab8e8',K:'#203a5a',Y:'#fff'},k:1.1}};
function out(e){const m=14,L=TW.x-m,Rr=TW.x+TW.w+m,T=TW.y-m,B=TW.y+TW.h+m;if(e.x>L&&e.x<Rr&&e.y>T&&e.y<B){const a=[e.x-L,Rr-e.x,e.y-T,B-e.y],i=a.indexOf(M.min(...a));if(i==0)e.x=L;else if(i==1)e.x=Rr;else if(i==2)e.y=T;else e.y=B}}
function bag(){const p=g.p,h=[],MC=[8,12,20],CC=[[6,10],[7,8],[20,8]],pc=v=>v*100|0;
for(let i=0;i<6;i++)h[i]=()=>{const k=p.it[i];if(!k)return;const v=IT[k][2]/2|0;p.gd+=v;p.it.splice(i,1);say('ขาย '+IT[k][0]+' ได้ '+v+' ทอง');bag()};
h[6]=()=>{use(0);bag()};h[7]=()=>{use(1);bag()};h[8]=cl;
ov('<div class=bx><b>🎒 กระเป๋า ('+p.it.length+'/6) • '+p.gd+' ทอง</b>'+(p.it.map((k,i)=>'<div class=r><span>'+IT[k][3]+IT[k][0]+' <small>'+IT[k][1]+'</small></span><button data-i='+i+' style="width:auto">ขาย '+(IT[k][2]/2|0)+'g</button></div>').join('')||'<p>ยังไม่มีไอเทม ซื้อได้ที่ตลาด</p>')
+'<div class=r><span>🍞 ขนมปัง x'+p.pot[0]+'</span><button data-i=6>ใช้</button></div><div class=r><span>🍵 ชามานา x'+p.pot[1]+'</span><button data-i=7>ใช้</button></div>'
+'<p><b>สเตตัส</b><br>โจมตี '+AT()+' (+'+pc(AT()/(12+p.lv*3)-1)+'% จากไอเทม)<br>HP '+M.round(p.hp)+'/'+MH()+' • MP '+M.round(p.mp)+'/'+MM()+'<br>ดูดเลือด '+pc(LS())+'% (+10% ร่างโลหิต/ในวง)<br>ลดคูลดาวน์ '+pc(1-CD())+'%<br>ความเร็วเดิน '+pc(SP()/70)+'%<br>ลดดาเมจรับ '+pc(DR())+'% • พลังสกิล +'+pc(AP())+'% • ตีเร็ว +'+pc(AS())+'% • ฟื้นมานา +'+MR()+'/วิ</p><p><b>สกิล</b></p>'
+SN.map((n,i)=>'<div class=r><span>'+n[2]+n[0]+' / '+n[3]+n[1]+'<br><small>Lv'+p.sk[i]+'/5 • ดาเมจ +'+15*(p.sk[i]-1)+'% • มานา '+MC[i]+' • คูลดาวน์ '+(CC[i][0]*CD()).toFixed(1)+'/'+(CC[i][1]*CD()).toFixed(1)+' วิ</small><br><small>ร่างปกติ: '+SD[i][0]+'<br>ร่างโลหิต: '+SD[i][1]+'</small></span></div>').join('')+'<button data-i=8>ปิด</button></div>',h)}
const SH={sk:0,ln:.4,al:.2},BC=['#e9f1f8','#dde9e6','#cde4f3','#f1dfe3'],PC=['#d8e5f0','#c9ddd8','#b9d6ec','#e6c8ce'],BN=['ทุ่งหิมะ','ป่าสนหนา','ทะเลสาบน้ำแข็ง','ป่าหิมะโลหิต'],TPS=[TP,{W:'#fff',G:'#143a2e',T:'#4a3220'},TP,{W:'#e8c0c8',G:'#5a1a2a',T:'#2a1a1a'}],lm=document.createElement('canvas'),lx=lm.getContext('2d');
function bio(a,b){if(M.hypot(a-700,b-500)<780)return 0;const u=(a+M.sin(b/80)*45)/380|0,v=(b+M.sin(a/80)*45)/380|0;return[0,1,2,3,1,0,2][((u*7+v*13+u*v*5)%7+7)%7]}
const bt=(a,b,d)=>{const t=d<750?0:d<1150?1:d<1650?2:3,k=bio(a,b);return k==2?M.min(3,t+1):k==3?M.max(2,t):t};
function shd(m,X,Y,k){const h=m.length,w=m[0].length,f=v=>M.floor(v*S);x.fillStyle='rgba(10,20,40,'+SH.al+')';for(let j=0;j<h;j++){const r=h-j,ya=Y-r*k*SH.ln-cy,y0=f(ya),y1=f(ya+k*SH.ln);for(let i=0;i<w;i++)if(m[j][i]!='.'){const xa=X+(i-w/2)*k+r*k*SH.sk-cx;x.fillRect(f(xa),y0,f(xa+k)-f(xa),y1-y0)}}}
function bsh(X,Y){const h=38,f=(a,b)=>[(a-cx)*S,(b-cy)*S],a=f(X,Y+36),b=f(X+50,Y+36),c=f(X+50+h*SH.sk,Y+36-h*SH.ln),d=f(X+h*SH.sk,Y+36-h*SH.ln);x.fillStyle='rgba(10,20,40,'+SH.al+')';x.beginPath();x.moveTo(a[0],a[1]);x.lineTo(b[0],b[1]);x.lineTo(c[0],c[1]);x.lineTo(d[0],d[1]);x.fill()}
function lit(){const p=g.p,d=dark(),ph=(g.t%180)/180,dp=M.min(1,ph*2),tn=ph<.5?.14*(1-M.sin(PI*dp)):0,cw=cv.width,ch=cv.height;
if(tn>.01){x.fillStyle='rgba(255,150,70,'+tn+')';x.fillRect(0,0,cw,ch)}
if(d>.02){const w=cw>>1,h=ch>>1;if(lm.width!=w||lm.height!=h){lm.width=w;lm.height=h}
const Ls=[[p.x,p.y,p.form?90:75,.9,p.form?'255,60,70':'255,200,120']];
BD.forEach(b=>Ls.push([b[2]+9,b[3]+19,22,.8,'255,200,110'],[b[2]+40,b[3]+19,22,.8,'255,200,110']));
LP.forEach(a=>Ls.push([a[0],a[1],48,.9,'255,210,120']));
pr.forEach(o=>Ls.push([o.x,o.y,22,.8,o.c=='#ddd'||o.k=='w'||o.k=='b'?'160,210,255':'255,60,70']));
g.en.forEach(e=>{if(e.boss)Ls.push([e.x,e.y,50,.7,'255,60,60'])});
if(g.cir)Ls.push([g.cir.x,g.cir.y,g.cir.r,.5,'255,40,60']);
lx.globalCompositeOperation='source-over';lx.clearRect(0,0,w,h);lx.fillStyle='rgba(6,10,40,'+M.min(.85,d*1.4)+')';lx.fillRect(0,0,w,h);lx.globalCompositeOperation='destination-out';
Ls.forEach(L=>{const sx=(L[0]-cx)*S/2,sy=(L[1]-cy)*S/2,r=L[2]*S/2;if(sx<-r||sy<-r||sx>w+r||sy>h+r)return;const g2=lx.createRadialGradient(sx,sy,0,sx,sy,r);g2.addColorStop(0,'rgba(0,0,0,'+L[3]+')');g2.addColorStop(1,'rgba(0,0,0,0)');lx.fillStyle=g2;lx.fillRect(sx-r,sy-r,r*2,r*2)});
x.imageSmoothingEnabled=true;x.drawImage(lm,0,0,cw,ch);x.globalCompositeOperation='lighter';
Ls.forEach(L=>{const sx=(L[0]-cx)*S,sy=(L[1]-cy)*S,r=L[2]*S;if(sx<-r||sy<-r||sx>cw+r||sy>ch+r)return;const g2=x.createRadialGradient(sx,sy,0,sx,sy,r);g2.addColorStop(0,'rgba('+L[4]+','+.3*d/.6+')');g2.addColorStop(1,'rgba('+L[4]+',0)');x.fillStyle=g2;x.fillRect(sx-r,sy-r,r*2,r*2)});x.globalCompositeOperation='source-over'}
const v=x.createRadialGradient(cw/2,ch/2,ch*.45,cw/2,ch/2,cw*.65);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(5,10,30,.35)');x.fillStyle=v;x.fillRect(0,0,cw,ch)}
const LP=[[580,400],[820,400],[580,600],[820,600],[640,300],[760,300],[640,700],[760,700],[480,500],[920,500]];
const ACT=[['up','เดินขึ้น'],['down','เดินลง'],['left','เดินซ้าย'],['right','เดินขวา'],['atk','โจมตี'],['s1','สกิล 1'],['s2','สกิล 2'],['s3','สกิล 3'],['heal','ฮีล'],['q0','ขนมปัง'],['q1','ชามานา'],['use','คุย/โต้ตอบ'],['menu','เมนู'],['bag','กระเป๋า']];
const KB={up:'w',down:'s',left:'a',right:'d',atk:' ',s1:'1',s2:'2',s3:'3',heal:'h',q0:'q',q1:'e',use:'f',menu:'m',bag:'b'},CF={m:.5,s:.7,on:1,bs:1,js:1};let capK=null,AC=null,mg,sg,nxt=0,bar=0,lsT=0,AIM=null;
try{const c=JSON.parse(localStorage.getItem('wr:cfg'));if(c){Object.assign(KB,c.kb);Object.assign(CF,c.cf)}}catch(e){}
const savecfg=()=>{try{localStorage.setItem('wr:cfg',JSON.stringify({kb:KB,cf:CF}))}catch(e){}};
function save(){if(!g)return;const d={p:g.p,t:g.t};try{localStorage.setItem('wr:'+me,JSON.stringify(d))}catch(e){}if(srv&&!gst)api('save',{u:me,p:pass,save:d})}
addEventListener('pagehide',save);document.addEventListener('visibilitychange',()=>document.hidden&&save());
addEventListener('pointerdown',()=>{aud();AC&&AC.resume()});
const vols=()=>{if(AC){mg.gain.value=CF.on?CF.m*.25:0;sg.gain.value=CF.s*.5}};
function aud(){if(AC)return;try{AC=new(window.AudioContext||window.webkitAudioContext)();mg=AC.createGain();sg=AC.createGain();mg.connect(AC.destination);sg.connect(AC.destination);vols();nxt=AC.currentTime+.1;setInterval(mus,200)}catch(e){}}
function tone(f,t,d,ty,v,dest){const o=AC.createOscillator(),a=AC.createGain();o.type=ty;o.frequency.value=f;a.gain.setValueAtTime(0,t);a.gain.linearRampToValueAtTime(v,t+.02);a.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(a);a.connect(dest);o.start(t);o.stop(t+d+.05)}
const NT=[57,60,64,60,55,59,62,59,53,57,60,57,52,56,59,64],mf=n=>440*2**((n-69)/12);
function mus(){if(!AC||!CF.on||!g)return;while(nxt<AC.currentTime+.6){const i=bar%16,sp=dark()>.3?.7:1;tone(mf(NT[i]),nxt,.5,'triangle',.5,mg);if(i%4==0){tone(mf(NT[i]-24),nxt,1.8,'sine',.6,mg);tone(mf(NT[i]-12),nxt,1.8,'sine',.25,mg)}nxt+=.42/sp;bar++}}
function sfx(k){if(!AC||AC.state!='running'||AC.currentTime-lsT<.05)return;lsT=AC.currentTime;const t=AC.currentTime,f={h:[220,.08,'square'],c:[520,.15,'sawtooth'],l:[880,.4,'triangle'],d:[110,.6,'sawtooth']}[k];tone(f[0],t,f[1],f[2],.5,sg);if(k=='l')tone(1320,t+.12,.4,'triangle',.4,sg)}
function cfgp(){const h=[()=>{CF.on=!CF.on;savecfg();vols();cfgp()}];ACT.forEach((a,i)=>h[i+1]=()=>{capK=i;cfgp()});h[20]=sv2;h[21]=menu;
ov('<div class=bx><b>⚙ ตั้งค่า</b><div class=r><span>🎵 เพลง</span><input id=vm type=range min=0 max=1 step=.05 value='+CF.m+' style="width:110px;margin:0"><button data-i=0 style="width:60px">'+(CF.on?'เปิด':'ปิด')+'</button></div><div class=r><span>🔊 เอฟเฟกต์</span><input id=vs type=range min=0 max=1 step=.05 value='+CF.s+' style="width:110px;margin:0"></div><div class=r><span>📱 ขนาดปุ่มสกิล</span><input id=vb type=range min=.6 max=1.6 step=.05 value='+CF.bs+' style="width:110px;margin:0"></div><div class=r><span>🕹 ขนาดจอยสติ๊ก</span><input id=vj type=range min=.6 max=1.6 step=.05 value='+CF.js+' style="width:110px;margin:0"></div><p>ปุ่มลัด (คลิกเพื่อเปลี่ยน แล้วกดปุ่มใหม่)</p>'+ACT.map((a,i)=>'<div class=r><span>'+a[1]+'</span><button data-i='+(i+1)+' style="width:90px">'+(capK==i?'กดปุ่ม...':KB[a[0]]==' '?'Space':KB[a[0]].toUpperCase())+'</button></div>').join('')+'<button data-i=20>ส่งออก/นำเข้าเซฟ</button><button data-i=21>กลับ</button></div>',h);
$('vm').oninput=e=>{CF.m=+e.target.value;savecfg();vols()};$('vs').oninput=e=>{CF.s=+e.target.value;savecfg();vols()};$('vb').oninput=e=>{CF.bs=+e.target.value;savecfg();ui()};$('vj').oninput=e=>{CF.js=+e.target.value;savecfg();ui()}}
function sv2(){ov('<div class=bx><b>ส่งออก/นำเข้าเซฟ</b><p>กด "แสดงเซฟ" แล้วคัดลอกไว้สำรอง หรือวางเซฟเดิมแล้วกดนำเข้า</p><textarea id=ex style="width:100%;height:110px;background:#0b1220;color:#e8eefc"></textarea><button data-i=0>แสดงเซฟปัจจุบัน</button><button data-i=1>นำเข้า</button><button data-i=2>กลับ</button></div>',[()=>{$('ex').value=JSON.stringify({p:g.p,t:g.t})},()=>{try{const d=JSON.parse($('ex').value);if(!d.p)throw 0;g.p=Object.assign(fresh().p,d.p,{ch:0,s1:0,dash:null,form:0,hold:0,cd:[0,0,0,0]});g.t=d.t||g.t;save();say('นำเข้าแล้ว')}catch(e){say('ข้อมูลไม่ถูกต้อง')}},cfgp])}
const BMAP=document.createElement('canvas');BMAP.width=140;BMAP.height=70;{const q=BMAP.getContext('2d'),C=['#dfeaf5','#4f8a6e','#7cc4f0','#c45a6a'];for(let i=0;i<140;i++)for(let j=0;j<70;j++){q.fillStyle=C[bio(i*20+10,j*28.57+14)];q.fillRect(i,j,1,1)}q.fillStyle='#c9a96a';q.fillRect(TW.x/20,TW.y/28.57,TW.w/20,TW.h/28.57);q.fillStyle='#222';q.fillRect(1250/20-1,150/28.57-1,3,3);q.fillRect(DG.x/20,DG.y/28.57,DG.w/20,DG.h/28.57);q.fillStyle='#fff';q.fillRect(CAB.x/20-1,CAB.y/28.57-1,2,2)}
function bigmap(){if(!g)return;ov('<div class=bx style="max-width:620px"><b>แผนที่</b><canvas id=bm width=560 height=280 style="width:100%;image-rendering:pixelated"></canvas><p><span style="color:#dfeaf5">■</span> ทุ่งหิมะ <span style="color:#4f8a6e">■</span> ป่าสน <span style="color:#7cc4f0">■</span> ทะเลสาบน้ำแข็ง <span style="color:#c45a6a">■</span> ป่าโลหิต <span style="color:#c9a96a">■</span> เมือง ⬛ ถ้ำ/ดันเจี้ยน ⬜ กระท่อม</p><button data-i=0>ปิด</button></div>',[cl]);const q=$('bm').getContext('2d'),k=560/WW;q.imageSmoothingEnabled=false;q.drawImage(BMAP,0,0,560,280);q.fillStyle='#c0283c';g.en.forEach(e=>{if(e.boss)q.fillRect(e.x*k-3,e.y*k-3,6,6)});q.fillStyle='#fff';q.strokeStyle='#000';q.beginPath();q.arc(g.p.x*k,g.p.y*k,5,0,7);q.fill();q.stroke()}
$('mm').onclick=bigmap;$('bagb').onclick=bag;
NP.house=()=>{const L=['ฤดูหนาวปีนี้หนาวกว่าทุกปี','ได้ยินว่าถ้ำทางเหนือมีของดีซ่อนอยู่','ข้าไม่กล้าออกนอกเมืองตอนกลางคืนหรอก','อัศวินออกลาดตระเวนไปแล้ว'];dlg('ชาวเมือง',L[R()*L.length|0],[['ลาก่อน',cl]])};
const CT=['🛡 เกราะ','⚔ ของกายภาพ','✨ ของเวท','💍 ไอเทมเสริม','🍞 อาหารและยา'];
const SD=[['อัปเกรดการโจมตีปกติครั้งถัดไปภายใน 3 วิ ถ้ามีเป้าหมายในระยะ จะพุ่งเข้าฟัน สตั้น 0.75 วิ ดาเมจ 180% คูลดาวน์เริ่มนับหลังโจมตีหรือหมดเวลา','กดค้างเพื่อวิ่งเร็วสูงสุด 5 วิ (คูลดาวน์เริ่มนับตอนปล่อย) ถ้ากดค้างถึง 2 วิขึ้นไป พอปล่อยจะตีระยะใกล้ไวขึ้น 5 วิ ในวงฤดูหนาว +40% นับ 3 hit ต่อการตี นอกวง +25% นับ 2 hit'],
['ถ้าศัตรูอยู่ใกล้จะฟันยกให้ลอย 0.8 วิ แล้วปล่อยคลื่นดาบ 2 ลูกวิ่งขนานกันเป็นเส้นตรง ทะลุศัตรูและชะลอความเร็ว ลากปุ่มเพื่อเลือกทิศได้','ในวงฤดูหนาว พุ่งไปข้างหน้าเป็นเส้นตรงแล้วควงเคียวเป็น AoE รอบตัว นอกวงจะฟันเคียวไปข้างหน้า 6 ครั้งพร้อมผลักศัตรู ครั้งสุดท้ายแรงที่สุด'],
['ชาร์จ 3 วิ (ขยับไม่ได้) แล้วเปลี่ยนเป็นร่างโลหิต 30 วิ พร้อมสร้างวงฤดูหนาวสีแดงชาดรัศมีกว้าง 25 วิ ในวงจะดูดเลือด ดาเมจ และความเร็วเพิ่มขึ้น คูลดาวน์ 20 วิ เริ่มนับเมื่อหมดร่าง','ในวง: ขังเป้าหมาย 1 วิ แล้วสร้างความเสียหายจริง 75% ของ HP สูงสุด (บอสโดนแค่ 20%) ถ้าตายจะระเบิด AoE ขนาดเท่าวงหลัง 5 วิ นอกวง: ยิงกระสุนเลือดใหญ่ เสีย HP ตัวเอง 35% แลกกับความเสียหายจริง 16% ของ HP สูงสุดเป้าหมาย']],
PS='ดูดเลือด 25% ทุกการโจมตี (+10% ในร่างโลหิตหรือในวง) • โจมตีใกล้ตีไวดาเมจต่ำ โจมตีไกลปามีดแรงกว่า ครั้งที่ 3 เคลือบมนต์วนสี แดง=ระเบิดรอบเป้าหมาย 50% น้ำเงิน=ลดคูลดาวน์สกิล 1-2 ลง 0.5 วิ เหลือง=ชะลอศัตรู • ร่างโลหิตยิงกระสุนเลือด ทุกนัดที่ 2 เคลือบ แดงเข้ม=ดาเมจ+ชะลอ+ระเบิด แดงสด=ลดคูลดาวน์ 0.5 วิ';
const SDH=()=>'<p>Passive: '+PS+'</p>'+SD.map((d,i)=>'<p><b>'+(i+1)+'. '+SN[i][0]+' / '+SN[i][1]+'</b><br><small>ร่างปกติ: '+d[0]+'<br>ร่างโลหิต: '+d[1]+'</small></p>').join('');
function ui(){const s=document.documentElement.style;s.setProperty('--bs',CF.bs);s.setProperty('--js',CF.js)}ui();
function guest(){aud();FS();gst=1;me='~guest';pass='';let s=null;try{s=JSON.parse(localStorage.getItem('wr:~guest'))}catch(e){}g=fresh();if(s&&s.p){Object.assign(g.p,s.p,{ch:0,s1:0,dash:null,form:0,bt:0,fast:0,hb:0,hold:0,cd:[0,0,0,0]});g.t=s.t;go()}else pick();say('Guest: เซฟอยู่เฉพาะเครื่องนี้')}
function aimBind(id,i){const b=$(id),xc=$('xc'),over=e=>{const r=xc.getBoundingClientRect();return e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom};
b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);const r=b.getBoundingClientRect();AIM={i,cx:r.left+r.width/2,cy:r.top+r.height/2,a:0,on:0}};
b.onpointermove=e=>{if(!AIM||AIM.i!=i)return;const dx=e.clientX-AIM.cx,dy=e.clientY-AIM.cy;if(M.hypot(dx,dy)>28){AIM.on=1;AIM.a=M.atan2(dy,dx);xc.hidden=0;xc.classList.toggle('hot',over(e))}};
b.onpointerup=e=>{if(!AIM||AIM.i!=i)return;const a=AIM,c=a.on&&over(e);AIM=null;xc.hidden=1;xc.classList.remove('hot');if(c){say('ยกเลิกสกิล');return}if(g)cast(i,a.on?a.a:undefined)};
b.onpointercancel=()=>{AIM=null;xc.hidden=1}}
function hud(){const p=g.p;$('lv').textContent=p.lv;$('gd').textContent=p.gd;$('tm').textContent=(dark()>.3?'🌙 กลางคืน':'☀ กลางวัน')+' • '+BN[bio(p.x,p.y)];$('hp').style.width=100*p.hp/MH()+'%';$('mp').style.width=100*p.mp/MM()+'%';$('xp').style.width=100*p.xp/(p.lv*60)+'%';
[0,1,2].forEach(i=>{const b=$('b'+i),f=p.form?1:0;b.textContent=SN[i][2+f];b.title=SN[i][f];const c=p.cd[i];if(c>0&&!(i==0&&p.s1>0))b.dataset.c=c>=99?'':M.ceil(c);else delete b.dataset.c});
if(p.cd[3]>0)$('bh').dataset.c=M.ceil(p.cd[3]);else delete $('bh').dataset.c;
const s=p.pot+'|'+p.it+'|'+(p.q?p.q.id+':'+p.q.pr+p.q.done:'');if(s!=lastS){lastS=s;$('q0').textContent='🍞'+p.pot[0];$('q1').textContent='🍵'+p.pot[1];let h='';for(let i=0;i<6;i++)h+='<i>'+(p.it[i]?IT[p.it[i]][3]:'')+'</i>';$('slots').innerHTML=h;$('qt').textContent='เควส: '+qtxt()}
$('bi').hidden=!nearNpc();
const m=mx2,k=120/WW;m.clearRect(0,0,120,60);m.drawImage(BMAP,0,0,120,60);m.fillStyle='#c0283c';g.en.forEach(e=>m.fillRect(e.x*k-1,e.y*k-1,e.boss?4:2,e.boss?4:2));m.fillStyle='#4aa3ff';m.fillRect(p.x*k-2,p.y*k-2,4,4)}
let last=0;function loop(t){requestAnimationFrame(loop);const dt=M.min(.05,(t-last)/1000||0);last=t;if(!g||$('hud').hidden)return;if($('ov').hidden)upd(dt);draw();hud()}
const B_=(id,f)=>{$(id).onpointerdown=e=>{e.preventDefault();f()}};
B_('b0',()=>cast(0));$('b0').onpointerup=$('b0').onpointerleave=$('b0').onpointercancel=()=>rel();aimBind('b1',1);aimBind('b2',2);B_('bh',heal);B_('q0',()=>use(0));B_('q1',()=>use(1));B_('menu',menu);B_('bi',()=>{const b=nearNpc();if(b)NP[b[0]]()});
$('bA').onpointerdown=e=>{e.preventDefault();ah=1};$('bA').onpointerup=$('bA').onpointerleave=()=>ah=0;
const J=$('joy'),kn=$('knob');let jid=null;function mv(e){const q=J.getBoundingClientRect(),sc=q.width/130,dx=e.clientX-q.left-q.width/2,dy=e.clientY-q.top-q.height/2,l=M.min(M.hypot(dx,dy),45*sc),a=M.atan2(dy,dx);jx=M.cos(a)*l/(45*sc);jy=M.sin(a)*l/(45*sc);kn.style.transform='translate('+M.cos(a)*l/sc+'px,'+M.sin(a)*l/sc+'px)'}
J.onpointerdown=e=>{jid=e.pointerId;J.setPointerCapture(jid);mv(e)};J.onpointermove=e=>{if(e.pointerId==jid)mv(e)};J.onpointerup=J.onpointercancel=()=>{jid=null;jx=jy=0;kn.style.transform=''};
addEventListener('keydown',e=>{if(e.target.tagName=='INPUT'||e.target.tagName=='TEXTAREA')return;const k=e.key.toLowerCase();if(capK!=null){e.preventDefault();KB[ACT[capK][0]]=k;capK=null;savecfg();cfgp();return}K[k]=1;if(!g||!$('ov').hidden)return;const a=Object.keys(KB).find(n=>KB[n]==k);({s1:()=>cast(0),s2:()=>cast(1),s3:()=>cast(2),heal,q0:()=>use(0),q1:()=>use(1),menu,bag,use:()=>{const b=nearNpc();if(b)NP[b[0]]()}})[a]?.()});
addEventListener('keyup',e=>{K[e.key.toLowerCase()]=0;if(e.key.toLowerCase()==KB.s1&&g)rel()});
setInterval(()=>{if(g)save()},10000);login();requestAnimationFrame(loop);
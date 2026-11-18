import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {JSDOM} from 'jsdom';
import {deriveProgress} from '../src/progress.js';
const dist=new URL('../../dist/',import.meta.url);
const [html,wizard,jobsScript]=await Promise.all(['index.html','wizard.js','jobs.js'].map(x=>readFile(new URL(x,dist),'utf8')));
const first={id:'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',prompt:'Busca oportunidades de apartamento en Facebook Marketplace',status:'completada',created:'2026-11-16T12:00:00Z',progress:[],report:'Informe guardado'};
async function waitFor(fn){for(let i=0;i<100;i++){if(fn())return;await new Promise(r=>setTimeout(r,10))}throw Error('No apareció el estado esperado')}
function setup(url,records,settings={theme:null}){
 const dom=new JSDOM(html,{url,runScripts:'outside-only'}),w=dom.window;
 w.HTMLElement.prototype.scrollIntoView=function(){};
 for(const id of ['stepBack','stepNext','startTask','browserClose']){const b=w.document.createElement('button');b.id=id;w.document.getElementById('slot-'+id).append(b)}
 w.RadarReport={render:(root,text)=>root.textContent=text,highlights:()=>[]};w.RadarProgress={derive:deriveProgress};
 w.fetch=async (path,options={})=>{let data,status=200;if(path==='/api/preferences'){if(options.method==='PUT')settings.theme=JSON.parse(options.body).theme;const snapshot=settings.theme;if(!options.method&&settings.delay)await settings.delay;data={theme:snapshot}}else if(path==='/api/status')data=settings.status||{authenticated:true,configured:true,secureControl:true};else if(path==='/api/facebook/status')data={available:true,savedSession:true};else if(path==='/api/jobs'){if(options.method==='POST'){settings.createdPrompt=JSON.parse(options.body).prompt;const job={...first,id:'cccccccc-cccc-cccc-cccc-cccccccccccc',prompt:settings.createdPrompt,status:'en cola'};records.unshift(job);data={id:job.id}}else data={jobs:records}}else if(path.endsWith('/cancel')){settings.cancelRequested=true;data={ok:true}}else if(path.startsWith('/api/jobs/')){const id=path.split('/').pop();data=records.find(x=>x.id===id);if(settings.jobDelays?.[id])await settings.jobDelays[id];if(!data){data={error:'No se encontró'};status=404}}else throw Error('Ruta inesperada '+path);return {ok:status===200,status,json:async()=>data}};
 w.eval(wizard);w.eval(jobsScript);return dom;
}
test('un enlace a una búsqueda abre su informe guardado',async()=>{
 const dom=setup('http://radar.test/?job='+first.id,[first]);
 try{await waitFor(()=>!dom.window.document.querySelector('#jobContent').hidden);assert.equal(dom.window.document.querySelector('#jobReport').textContent,'Informe guardado')}finally{dom.window.close()}
});
test('al abrir historial se consultan las búsquedas nuevas sin recargar',async()=>{
 const records=[first],dom=setup('http://radar.test/',records);
 try{await waitFor(()=>dom.window.document.querySelectorAll('.job-row').length===1);records.unshift({...first,id:'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'});dom.window.dispatchEvent(new dom.window.CustomEvent('radar:navigate',{detail:'history'}));await waitFor(()=>dom.window.document.querySelectorAll('.job-row').length===2)}finally{dom.window.close()}
});

test('el tema se restaura y se guarda para próximos accesos',async()=>{
 const settings={theme:'dark'},dom=setup('http://radar.test/',[first],settings);
 try{await waitFor(()=>dom.window.document.documentElement.dataset.theme==='dark');dom.window.document.querySelector('#themeToggle').click();await waitFor(()=>settings.theme==='light');assert.equal(dom.window.document.documentElement.dataset.theme,'light')}finally{dom.window.close()}
 const reopened=setup('http://radar.test/',[first],settings);try{await waitFor(()=>reopened.window.document.documentElement.dataset.theme==='light')}finally{reopened.window.close()}
});

test('una respuesta tardía del servidor no deshace el tema elegido',async()=>{
 let release;const settings={theme:'light',delay:new Promise(r=>release=r)},dom=setup('http://radar.test/',[first],settings);
 try{await waitFor(()=>!dom.window.document.querySelector('#agentApp').hidden);dom.window.document.querySelector('#themeToggle').click();await waitFor(()=>settings.theme==='dark');release();await new Promise(r=>setTimeout(r,30));assert.equal(dom.window.document.documentElement.dataset.theme,'dark')}finally{release();dom.window.close()}
});

test('volver a investigar usa la tarea original y abre la nueva búsqueda',async()=>{
 const settings={theme:'light'},records=[first],dom=setup('http://radar.test/?job='+first.id,records,settings);
 try{await waitFor(()=>!dom.window.document.querySelector('#rerunJob').hidden);dom.window.document.querySelector('#rerunJob').click();await waitFor(()=>settings.createdPrompt);assert.equal(settings.createdPrompt,first.prompt);await waitFor(()=>dom.window.location.search.includes('cccccccc'))}finally{dom.window.close()}
});

test('al cambiar de búsqueda no muestra ni ejecuta el informe anterior y descarta respuestas tardías',async()=>{
 let release;const second={...first,id:'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',prompt:'Busca oportunidades de otra búsqueda en Facebook Marketplace',report:'Segundo informe'};const settings={theme:'light',jobDelays:{[second.id]:new Promise(r=>release=r)}},dom=setup('http://radar.test/?job='+first.id,[first,second],settings),d=dom.window.document;
 try{await waitFor(()=>d.querySelector('#jobReport').textContent==='Informe guardado');d.querySelectorAll('.job-button')[1].click();assert.equal(d.querySelector('#jobReport').textContent,'');assert.equal(d.querySelector('#rerunJob').hidden,true);d.querySelectorAll('.job-button')[0].click();await waitFor(()=>d.querySelector('#jobReport').textContent==='Informe guardado');release();await new Promise(r=>setTimeout(r,30));assert.equal(d.querySelector('#jobReport').textContent,'Informe guardado');assert.match(dom.window.location.search,/aaaaaaaa/)}finally{release();dom.window.close()}
});

test('muestra el progreso real y lo actualiza sin recargar',async()=>{
 const record={...first,status:'ejecutando',report:null,progress:[{at:'2026-11-16T12:00:10Z',text:'Buscando en Marketplace: mac mini'},{at:'2026-11-16T12:01:00Z',text:'Marketplace: 49 anuncios encontrados en 5 pasadas.'}]},dom=setup('http://radar.test/?job='+first.id,[record]);const d=dom.window.document;
 try{await waitFor(()=>!d.querySelector('#liveProgress').hidden);assert.equal(d.querySelector('#livePhase').textContent,'Recorriendo Marketplace');assert.equal(d.querySelector('#liveFound').textContent,'49');assert.match(d.querySelector('#livePasses').textContent,/5/);record.progress.push({at:'2026-11-16T12:02:00Z',text:'Marketplace: 73 anuncios encontrados en 10 pasadas.'});dom.window.dispatchEvent(new dom.window.Event('focus'));await waitFor(()=>d.querySelector('#liveFound').textContent==='73');record.status='completada';record.report='Terminado';dom.window.dispatchEvent(new dom.window.Event('focus'));await waitFor(()=>d.querySelector('#liveProgress').hidden);assert.equal(d.querySelector('#jobReport').textContent,'Terminado')}finally{dom.window.close()}
});
test('al detener muestra la solicitud pendiente hasta que el servidor cambie el estado',async()=>{
 const settings={theme:'light'},record={...first,status:'ejecutando',report:null,progress:[]},dom=setup('http://radar.test/?job='+first.id,[record],settings),d=dom.window.document;
 try{await waitFor(()=>!d.querySelector('#cancelJob').hidden);d.querySelector('#cancelJob').click();await waitFor(()=>settings.cancelRequested);await waitFor(()=>d.querySelector('#cancelJob').disabled);assert.match(d.querySelector('#cancelJob').textContent,/Deteniendo/);assert.equal(d.querySelector('#jobStatus').textContent,'ejecutando')}finally{dom.window.close()}
});


test('el acceso privado usa únicamente la dirección configurada',async()=>{
 const settings={status:{authenticated:false,configured:true,secureControl:false,secureUrl:'https://radar.example.test/privado'}};const dom=setup('http://radar.test/',[],settings);
 try{await waitFor(()=>dom.window.document.querySelector('#secureLink'));assert.equal(dom.window.document.querySelector('#secureLink').href,'https://radar.example.test/privado')}finally{dom.window.close()}
 const noAddress=setup('http://radar.test/',[],{status:{authenticated:false,configured:true,secureControl:false}});
 try{await waitFor(()=>noAddress.window.document.querySelector('#authTitle').textContent==='Abre la conexión segura');assert.equal(noAddress.window.document.querySelector('#secureLink'),null)}finally{noAddress.window.close()}
});

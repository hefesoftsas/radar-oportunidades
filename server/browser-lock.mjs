let remoteUsers=0, agentUsers=0;
let agentQueue=Promise.resolve();
export function withAgent(fn){
  const task=agentQueue.then(async()=>{beginAgent();try{return await fn()}finally{endAgent()}});
  agentQueue=task.catch(()=>{});
  return task;
}
export function beginRemote(){if(agentUsers)return false;remoteUsers++;return true;}
export function endRemote(){remoteUsers=Math.max(0,remoteUsers-1);}
export function beginAgent(){if(remoteUsers||agentUsers)throw Error('Cierra la ventana del navegador de Facebook antes de iniciar la investigación.');agentUsers++;}
export function endAgent(){agentUsers=Math.max(0,agentUsers-1);}
export function browserState(){return {remoteUsers,agentBusy:agentUsers>0};}

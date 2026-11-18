import net from 'node:net';
import {spawn} from 'node:child_process';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
const socketPath=join(tmpdir(),`radar-ssh-${process.getuid()}.sock`);
// Terminate the SSH stream when the NAS closes its TCP connection. Netcat kept
// stdin open after server EOF, causing browsers to reuse dead HTTP connections.
const target=Number(process.env.RADAR_NAS_PORT||8097);
if(!Number.isInteger(target)||target<1||target>65535)throw Error('Puerto remoto inválido');
const remoteProxy=`const net=require("net");const s=net.connect(${target},"127.0.0.1");process.stdin.pipe(s);s.pipe(process.stdout,{end:false});s.on("end",()=>process.stdout.end(()=>process.exit(0)));s.on("error",()=>process.exit(1));process.stdin.on("error",()=>s.destroy());process.stdout.on("error",()=>process.exit(0));`;
const port=Number(process.env.RADAR_TUNNEL_PORT||18097);
const server=net.createServer(socket=>{
  const child=spawn('ssh',['-T','-o','BatchMode=yes','-o','ControlMaster=auto','-o','ControlPersist=600','-o',`ControlPath=${socketPath}`,process.env.RADAR_NAS_SSH||'nas',`node -e '${remoteProxy}'`],{stdio:['pipe','pipe','ignore']});
  socket.pipe(child.stdin);child.stdout.pipe(socket);
  const close=()=>{if(!socket.destroyed)socket.destroy();if(!child.killed)child.kill();};
  socket.on('error',close);socket.on('close',close);child.on('error',close);child.on('close',close);child.stdin.on('error',close);
});
server.on('error',err=>{console.error('No se pudo abrir la conexión local:',err.message);process.exitCode=1});
server.listen(port,'127.0.0.1',()=>console.log(`Conexión segura de Radar lista en 127.0.0.1:${port}`));

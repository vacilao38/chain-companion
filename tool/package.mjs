import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'..');
const identity=JSON.parse(fs.readFileSync(path.join(root,'identity.json'),'utf8'));
const version=JSON.parse(fs.readFileSync(path.join(root,'package.json'),'utf8')).version;
const hash=crypto.createHash('sha256').update(Buffer.from(identity.key,'base64')).digest('hex').slice(0,32);
if([...hash].map(x=>String.fromCharCode(97+parseInt(x,16))).join('')!==identity.id)throw Error('Identidade divergente.');
const manifest={manifest_version:3,name:'Chain Companion',version,description:'Guarde links no Chain por uma janela rápida, sem enviar sua biblioteca à internet.',
  key:identity.key,minimum_chrome_version:'120',permissions:['activeTab','nativeMessaging','contextMenus'],
  host_permissions:['https://vacilao38.github.io/clustter-cores-downloads/*'],
  action:{default_title:'Guardar no Chain',default_popup:'popup.html'},
  background:{service_worker:'background.js',type:'module'}};
fs.writeFileSync(path.join(root,'extension/manifest.json'),JSON.stringify(manifest,null,2)+'\n');
const out=path.join(root,'dist',version);fs.mkdirSync(out,{recursive:true});
fs.copyFileSync(path.join(root,'README.md'),path.join(root,'extension/LEIA-ME.md'));
fs.copyFileSync(path.join(root,'LICENSE'),path.join(root,'extension/LICENSE.txt'));
const zip=path.join(out,`Chain-Companion-${version}-Chrome-Edge.zip`);
const result=spawnSync('tar.exe',['-a','-c','-f',zip,...fs.readdirSync(path.join(root,'extension'))],{cwd:path.join(root,'extension'),encoding:'utf8'});
if(result.status!==0)throw Error(result.stderr||'Não foi possível criar o ZIP.');
const bytes=fs.readFileSync(zip),sha256=crypto.createHash('sha256').update(bytes).digest('hex');
const report={app:'chain-extension',version,file:path.basename(zip),bytes:bytes.length,sha256,extensionId:identity.id};
fs.writeFileSync(path.join(out,'package.json'),JSON.stringify(report,null,2)+'\n');
fs.writeFileSync(path.join(out,'SHA256SUMS.txt'),`${sha256}  ${path.basename(zip)}\n`);
console.log(JSON.stringify(report));

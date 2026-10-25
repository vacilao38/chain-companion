import {draftFromTab, updateFromFeed} from './payload.js';
const status = document.querySelector('#status'), send = document.querySelector('#send');
const manifest = chrome.runtime.getManifest();
document.querySelector('#version').textContent = manifest.version;
try {
  const [tab] = await chrome.tabs.query({active:true, currentWindow:true});
  const draft = draftFromTab(tab);
  document.querySelector('#url').value = draft.url;
  document.querySelector('#title').value = draft.title;
} catch (error) { status.textContent = error.message; }
document.querySelector('#capture').addEventListener('submit', async event => {
  event.preventDefault(); send.disabled = true;
  try {
    const draft = draftFromTab({url:document.querySelector('#url').value,title:document.querySelector('#title').value});
    const response = await chrome.runtime.sendNativeMessage('com.clustter.chain',draft);
    if (!response?.ok) throw Error(response?.message || 'O Chain não respondeu.');
    status.textContent = response.message;
  } catch (_) { status.textContent = 'Não foi possível abrir o Chain. Instale a versão 1.2.0 ou superior pelo instalador Windows, feche e reabra o navegador e tente novamente. Seu link não foi salvo.'; }
  finally { send.disabled = false; }
});
try {
  const response = await fetch('https://vacilao38.github.io/clustter-cores-downloads/updates.json',{cache:'no-store',redirect:'error',signal:AbortSignal.timeout(8000)});
  if (response.ok && Number(response.headers.get('content-length') || 0) <= 262144) {
    const reader = response.body.getReader(); let text = '', size = 0; const decoder = new TextDecoder();
    while (true) { const {done,value} = await reader.read(); if (done) break; size += value.length; if (size > 262144) { await reader.cancel(); throw Error('Feed grande.'); } text += decoder.decode(value,{stream:true}); }
    text += decoder.decode(); const release = updateFromFeed(JSON.parse(text),manifest.version);
    if (release) { const link = document.querySelector('#update'); link.href = release.page; link.hidden = false; }
  }
} catch (_) { /* Offline metadata does not block local capture. */ }

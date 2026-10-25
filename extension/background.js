import {draftFromTab} from './payload.js';
chrome.runtime.onInstalled.addListener(()=>{
  chrome.contextMenus.removeAll(()=>chrome.contextMenus.create({id:'chain-capture',title:'Guardar no Chain',contexts:['page','link']}));
});
chrome.contextMenus.onClicked.addListener(async (info,tab)=>{
  if(info.menuItemId!=='chain-capture')return;
  try {
    const link = info.linkUrl;
    const draft = draftFromTab({url:link || tab?.url,title:link ? link : tab?.title});
    const response = await chrome.runtime.sendNativeMessage('com.clustter.chain',draft);
    await chrome.action.setBadgeText({text:response?.ok?'':'!'});
    await chrome.action.setTitle({title:response?.ok?'Guardar no Chain':'Atualize o Chain. Clique aqui para tentar novamente.'});
  } catch (_) { await chrome.action.setBadgeText({text:'!'}); await chrome.action.setTitle({title:'Instale/atualize o Chain para Windows. Clique aqui para tentar novamente.'}); }
});

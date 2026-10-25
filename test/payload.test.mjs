import {test} from 'node:test';
import assert from 'node:assert/strict';
import {draftFromTab,newer,updateFromFeed} from '../extension/payload.js';
test('only explicit web links; bounded title; no scripts, files or embedded credentials',()=>{
  assert.deepEqual(draftFromTab({url:'https://example.com/?v=1',title:'Uma música'}),{schema:1,url:'https://example.com/?v=1',title:'Uma música'});
  for(const url of ['chrome://settings','javascript:alert(1)','file:///C:/file','https://user:pass@example.com/'])assert.throws(()=>draftFromTab({url}));
  assert.equal(draftFromTab({url:'https://example.com',title:'a'.repeat(200)}).title.length,180);
});
test('Update compares numeric versions and allows only its own official page',()=>{
  assert.equal(newer('1.10.0','1.2.0'),true);assert.equal(newer('1.0.0','1.0.0'),false);
  const feed={protocol:'clustter.update',schema:1,apps:{'chain-extension':{browser:{version:'1.1.0',page:'https://vacilao38.github.io/clustter-cores-downloads/#chain-extension'}}}};
  assert.ok(updateFromFeed(feed,'1.0.0'));feed.apps['chain-extension'].browser.page='https://example.com';assert.equal(updateFromFeed(feed,'1.0.0'),null);
});

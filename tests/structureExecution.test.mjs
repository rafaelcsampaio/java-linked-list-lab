import assert from 'node:assert/strict';
import {execute, initialState, emptyState, treeValues, insertNode, modules} from '../src/components/structures/structureExecution.js';
let count=0;
const run=(kind,state,op,value)=>{
 const before=JSON.stringify(state);const result=execute(kind,state,op,value);
 assert.equal(JSON.stringify(state),before,'input must remain immutable');
 for(const frame of result.frames){assert.ok(frame.line>=0,`${kind}/${op}: unmapped line ${frame.explanation}`);assert.ok(frame.line<result.code.length);}
 count++;return result.frames.at(-1);
};
for(const kind of Object.keys(modules)) for(const op of Object.keys(modules[kind].operations)) {run(kind,initialState(kind),op,9);run(kind,emptyState(kind),op,9);}
let stack=emptyState('stack');
for(let i=0;i<6;i++) stack=run('stack',stack,'push',i).state;
assert.equal(run('stack',stack,'push',100).error,true);
assert.deepEqual(run('stack',stack,'traverse').visited,[5,4,3,2,1,0]);
for(let i=5;i>=0;i--){const f=run('stack',stack,'pop');assert.equal(f.variables.retorno,i);stack=f.state;}
assert.equal(stack.topo,-1);assert.equal(run('stack',stack,'pop').error,true);
let queue=emptyState('queue'),expected=[];
for(let round=0;round<10;round++) {
 for(let i=0;i<6;i++){let v=round*10+i;queue=run('queue',queue,'push',v).state;expected.push(v);}
 assert.equal(run('queue',queue,'push',999).error,true);
 assert.deepEqual(run('queue',queue,'traverse').visited,expected);
 assert.equal(run('queue',queue,'peek').variables.retorno,expected[0]);assert.equal(run('queue',queue,'rear').variables.retorno,expected.at(-1));
 for(let i=0;i<6;i++){const f=run('queue',queue,'pop');assert.equal(f.variables.retorno,expected.shift());queue=f.state;}
 assert.equal(queue.inicio,queue.fim);assert.equal(run('queue',queue,'pop').error,true);
}
const tree=initialState('tree');
assert.deepEqual(run('tree',tree,'pre').visited,[8,4,2,6,12,10,14]);
assert.deepEqual(run('tree',tree,'in').visited,[2,4,6,8,10,12,14]);
assert.deepEqual(run('tree',tree,'post').visited,[2,6,4,10,14,12,8]);
for(const v of [2,4,8,99]) assert.deepEqual(treeValues(run('tree',tree,'pop',v).state.root),[2,4,6,8,10,12,14].filter(x=>x!==v));
for(const values of [[8],[8,4],[8,12],[8,4,12,10,11,14],[8,4,2,6,12,10,14]]) {
 let state={root:values.reduce(insertNode,null)};
 for(const v of values){state=run('tree',state,'pop',v).state;assert.ok(!treeValues(state.root).includes(v));}
 assert.equal(state.root,null);
}
assert.deepEqual(treeValues(run('tree',tree,'push',8).state.root),treeValues(tree.root));
console.log(`${count} executions verified: immutable snapshots, valid code lines, overflow/underflow, circular wrap, BST removal and traversal orders.`);

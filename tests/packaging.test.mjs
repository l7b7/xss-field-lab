import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,mkdirSync,existsSync,rmSync,readdirSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {tmpdir} from 'node:os';
import {spawnSync} from 'node:child_process';
import {exercises} from '../dist/curriculum.js';
const root=resolve(new URL('..',import.meta.url).pathname);
function temporary(fn){const dir=mkdtempSync(join(tmpdir(),'xss-lab-package-'));try{return fn(dir);}finally{rmSync(dir,{recursive:true,force:true});}}
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(join(dir,d.name)):[join(dir,d.name)]);}
test('coach curriculum covers every stable exercise ID and ships referenced files',()=>{
 const base=join(root,'.agents/skills/xss-field-coach');
 const map=readFileSync(join(base,'references/curriculum.md'),'utf8');
 for(const ex of exercises)assert.ok(map.includes(`**${ex.id} — ${ex.title}**`),ex.id);
 const skill=readFileSync(join(base,'SKILL.md'),'utf8');assert.match(skill,/^---\nname: xss-field-coach\ndescription: /);
 for(const ref of ['curriculum.md','context-review.md','evidence-template.md']){assert.ok(skill.includes('references/'+ref));assert.ok(existsSync(join(base,'references',ref)));}
 const meta=readFileSync(join(base,'agents/openai.yaml'),'utf8');assert.ok(meta.includes('$xss-field-coach'));
});
test('skill installer supports paths with spaces without overwriting an existing skill',()=>temporary(dir=>{
 const target=join(dir,'my skills');let result=spawnSync('bash',[join(root,'scripts/install-skill.sh'),'--skills-dir',target],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);assert.ok(existsSync(join(target,'xss-field-coach/SKILL.md')));
 const sentinel=join(target,'xss-field-coach/keep.txt');writeFileSync(sentinel,'unchanged');
 result=spawnSync('bash',[join(root,'scripts/install-skill.sh'),'--skills-dir',target],{encoding:'utf8'});assert.equal(result.status,1);assert.equal(readFileSync(sentinel,'utf8'),'unchanged');
 result=spawnSync('bash',[join(root,'scripts/install-skill.sh'),'--skills-dir','relative/path'],{encoding:'utf8'});assert.equal(result.status,2);
}));
test('GitHub export preserves exact interface files and excludes host identity and history',()=>temporary(dir=>{
 const output=join(dir,'export');const result=spawnSync('python3',[join(root,'scripts/export-github.py'),output],{encoding:'utf8'});assert.equal(result.status,0,result.stderr);
 assert.equal(existsSync(join(output,'.git')),false);assert.equal(existsSync(join(output,'.openai')),false);
 for(const file of ['index.html','style.css','app.js','engine.js','curriculum.js'])assert.equal(readFileSync(join(output,'dist',file),'utf8'),readFileSync(join(root,'dist',file),'utf8'));
 for(const file of walk(output)){const content=readFileSync(file,'utf8');assert.doesNotMatch(content,/art_v2_[a-zA-Z0-9_]{20,}|appgprj_[a-f0-9]{20,}/);}
 assert.ok(existsSync(join(output,'.agents/skills/xss-field-coach/SKILL.md')));
}));
test('export refuses to overwrite a destination or recursively copy into the checkout',()=>temporary(dir=>{
 const existing=join(dir,'existing');mkdirSync(existing);writeFileSync(join(existing,'keep.txt'),'keep');
 const result=spawnSync('python3',[join(root,'scripts/export-github.py'),existing],{encoding:'utf8'});assert.equal(result.status,2);assert.equal(readFileSync(join(existing,'keep.txt'),'utf8'),'keep');
 const recursive=spawnSync('python3',[join(root,'scripts/export-github.py'),join(root,'nested-export')],{encoding:'utf8'});assert.equal(recursive.status,2);assert.equal(existsSync(join(root,'nested-export')),false);
}));

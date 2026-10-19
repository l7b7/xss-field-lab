import {exercises, marker} from './curriculum.js';
export const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const isMarker = value => /^<mark\s+data-proof\s*=\s*(["'])MRTD\1\s*>MRTD<\/mark>$/i.test(value.trim());
export function evaluate(ex, input, phase='run', saved='') {
  const raw = typeof input === 'string' ? input.slice(0,4000) : input;
  let pass=false, rendered='', transformed=typeof raw==='string'?raw:JSON.stringify(raw), status='Try again', proof=false;
  let detail='Follow the context and use a hint if you need a starting point.';
  switch(ex.kind){
    case 'reflection':
      pass=raw.trim()===ex.answer; rendered='Results for: '+raw; transformed=escapeHTML(raw);
      detail=pass?'Marker found. Reflection is confirmed; execution is not.':'Use the unique text marker MRTD_01.'; break;
    case 'html':
      pass=isMarker(raw); proof=pass; rendered=pass?'MRTD':raw;
      detail=pass?'An inert mark element crosses the modeled HTML boundary.':'The model accepts one harmless mark element. Other markup remains plain text.'; break;
    case 'attribute':
      pass=/^"\s+data-proof\s*=\s*"MRTD$/.test(raw.trim()); proof=pass; rendered=pass?'data-proof="MRTD" added':raw;
      transformed='<input value="'+raw+'">';
      detail=pass?'The modeled value boundary became a separate inert attribute.':'Close the double-quoted value, then add only the proof attribute.'; break;
    case 'stored':
      if(phase!=='visit')return {pass:false,status:'Saved locally',detail:'Write step complete. Now click Visit as reader to inspect the saved value.',rendered:'Comment saved. Waiting for the reader visit.',transformed:raw,proof:false,trace:['WRITE: comment copied to browser-local storage','READ: pending simulated reader visit']};
      transformed=saved; pass=isMarker(saved); proof=pass; rendered=pass?'MRTD':saved||'No comment saved yet.';
      detail=pass?'The saved marker reached the separate reader view.':'Save the harmless mark element first, then visit again.'; break;
    case 'dom':{
      try { transformed=decodeURIComponent(raw.startsWith('#')?raw.slice(1):raw); }
      catch {return {pass:false,status:'Decode error',detail:'Malformed percent encoding. The model stops before the sink.',rendered:'Decode error: invalid percent sequence',transformed:raw,proof:false,trace:['SOURCE: simulated fragment','DECODE: failed; sink not reached']};}
      pass=raw.startsWith('#') && /%3c/i.test(raw) && isMarker(transformed);proof=pass;rendered=pass?'MRTD':transformed;
      detail=pass?'One decoding step restored the harmless HTML marker.':'Use a # fragment containing a percent-encoded mark element. This flow decodes once.';break;}
    case 'encode':
      pass=raw.trim()===ex.answer;rendered=pass?(ex.id==='encode-text'?'<MRTD & "ok">':'" data-proof="MRTD'):raw;
      detail=pass?'The canonical encoding preserves the text boundary.':'Check each delimiter against the context and the requested canonical entity form.';break;
    case 'filter':
      transformed=raw.replace(/<mark\b[^>]*>[\s\S]*?<\/mark>/g,'');
      pass=isMarker(transformed);proof=pass;rendered=pass?'MRTD':transformed||'(marker removed by the toy filter)';
      detail=pass?'The toy filter and case-insensitive HTML model disagree.':'The lowercase-only toy filter removes lowercase mark elements. Try the harmless uppercase equivalent.';break;
    case 'choice':
      pass=raw===ex.answer;rendered=ex.choices.find(c=>c[0]===raw)?.[1]||'Select a prediction to inspect the decision.';
      detail=pass?'Your prediction matches the modeled data flow.':'Revisit the exact source, parser context and policy. Reveal a hint for guidance.';break;
    case 'trace':case 'capstone':
      pass=ex.fields.every(f=>raw?.[f.key]===ex.answer[f.key]);rendered=ex.fields.map(f=>f.label+': '+(raw?.[f.key]||'—')).join('\n');
      detail=pass?'All parts of the evidence trail match.':'Check each selection. Distinguish the data source, the transform and the interpreting sink.';break;
  }
  status=pass?'Exercise complete':'Keep investigating';
  return {pass,status,detail,rendered,transformed,proof,trace:[`SOURCE: ${ex.source}`,`TRANSFORM: ${ex.transform}`,`VALUE: ${typeof transformed==='string'?transformed:JSON.stringify(transformed)}`,`SINK: ${ex.sink}`,`RESULT: ${pass?'objective met':'objective not met'}`]};
}
export function frameDocument(result){
  // Only fixed markup is rendered. All learner input is escaped, never parsed or evaluated.
  const attributeProof=result.proof && result.rendered==='data-proof="MRTD" added';
  const output=attributeProof?'<input value="" data-proof="MRTD" readonly aria-label="Modeled empty value with inert data-proof attribute"><p class="detail">data-proof="MRTD" is a separate inert attribute in the model.</p>':result.proof?'<mark>MRTD</mark><p class="detail">'+escapeHTML(result.rendered==='MRTD'?'Harmless HTML marker recognized by the model.':result.rendered)+'</p>':'<pre>'+escapeHTML(result.rendered)+'</pre>';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'none'; connect-src 'none'; img-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'"><style>body{margin:0;padding:26px;font:14px/1.7 system-ui,sans-serif;color:#2c403c;background:#fff}small{font:10px ui-monospace,monospace;letter-spacing:1.3px;color:#80908b}pre{font:13px/1.8 ui-monospace,monospace;white-space:pre-wrap;overflow-wrap:anywhere;margin-top:20px}mark{display:inline-block;margin-top:22px;background:#dcf9bd;color:#25452b;padding:4px 13px;border-radius:5px;font:600 18px system-ui}p{font-size:12px;color:#70817b}hr{border:0;border-top:1px solid #ecf0ed;margin-top:22px}</style></head><body><small>ISOLATED OUTPUT · MODEL</small>${output}<hr><p>No learner scripts execute in this frame.</p></body></html>`;
}
export function freshRecord(){return {input:'',selections:{},saved:'',hints:0,attempts:0,complete:false,note:'',result:null};}
export function cleanRecord(value){
  const r=freshRecord();if(!value||typeof value!=='object')return r;
  for(const key of ['input','saved','note'])r[key]=typeof value[key]==='string'?value[key].slice(0,key==='note'?2000:4000):'';
  for(const f of ['hints','attempts'])r[f]=Number.isFinite(value[f])?Math.max(0,Math.min(10000,Math.floor(value[f]))):0;
  r.complete=value.complete===true;
  if(value.selections&&typeof value.selections==='object')for(const [k,v]of Object.entries(value.selections))if(typeof v==='string')r.selections[k]=v.slice(0,200);
  return r;
}
export function initialState(){return {version:1,current:exercises[0].id,records:{}};}
export function restoreState(text){
  try{const v=JSON.parse(text);if(v?.version!==1)return initialState();const s=initialState();if(exercises.some(e=>e.id===v.current))s.current=v.current;for(const ex of exercises)if(v.records?.[ex.id])s.records[ex.id]=cleanRecord(v.records[ex.id]);return s;}catch{return initialState();}
}
export function resetExercise(state,id){state.records[id]=freshRecord();return state;}
export {marker};

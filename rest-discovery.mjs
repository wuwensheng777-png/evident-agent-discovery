// Node.js >=22.13. Public reads only. No credentials, files or service execution.
const origin='https://evidentagents.com';
const headers=process.env.EVIDENT_TEST==='1'?{'X-Evident-Test':'1'}:{};
async function get(path){const r=await fetch(origin+path,{headers,signal:AbortSignal.timeout(20000)});if(!r.ok)throw Error('Evident HTTP '+r.status);return r.json();}
const result=await get('/api/v3/services?'+new URLSearchParams({q:process.argv[2]??'web research',limit:'5'}));
console.log(JSON.stringify(result,null,2));
const id=result.services?.[0]?.id;
if(id){console.log('Candidate, not a recommendation:',JSON.stringify(await get('/api/v3/services/'+encodeURIComponent(id)),null,2));console.log('Setup only:',JSON.stringify(await get('/api/v3/services/'+encodeURIComponent(id)+'/handoff'),null,2));}
else console.log('No candidates. Broaden the task or filters; do not infer poor quality.');

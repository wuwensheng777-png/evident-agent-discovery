// Node.js >=22.13. Public reads only. Install dependencies from package.json.
import {Client} from '@modelcontextprotocol/sdk/client/index.js';
import {StreamableHTTPClientTransport} from '@modelcontextprotocol/sdk/client/streamableHttp.js';
const client=new Client({name:'evident-discovery-example',version:'0.13.0'});
async function call(name,args){const result=await client.callTool({name,arguments:args});if(result.isError)throw Error('Tool rejected: '+name);return result.structuredContent;}
try{
 await client.connect(new StreamableHTTPClientTransport(new URL('https://evidentagents.com/mcp'),{requestInit:{headers:process.env.EVIDENT_TEST==='1'?{'X-Evident-Test':'1'}:{}}}));
 const found=await call('discover_services',{q:process.argv[2]??'web research',limit:5});
 console.log(JSON.stringify(found,null,2));
 const id=found.services?.[0]?.id;
 if(id){console.log(JSON.stringify(await call('get_service',{service_id:id}),null,2));console.log(JSON.stringify(await call('prepare_service_handoff',{service_id:id}),null,2));}
 else console.log('No candidates; broaden the task or filters.');
}finally{await client.close();}

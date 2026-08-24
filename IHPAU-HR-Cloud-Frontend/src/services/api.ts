const DEFAULT_BASE='http://localhost:8000/api/v1';
const BASE=(import.meta.env.VITE_API_BASE_URL||DEFAULT_BASE).replace(/\/$/,'');
const TIMEOUT_MS=15000;
function csrfToken(){const match=document.cookie.match(/(?:^|; )csrftoken=([^;]+)/);return match?decodeURIComponent(match[1]):undefined;}
function safeError(status:number){if(status===401)return new Error('AUTH_REQUIRED');if(status===403)return new Error('FORBIDDEN');if(status===404)return new Error('NOT_FOUND');if(status===409)return new Error('CONFLICT');if(status===422)return new Error('VALIDATION_ERROR');if(status>=500)return new Error('SERVER_ERROR');return new Error('REQUEST_FAILED');}
export async function api<T>(path:string,options:RequestInit={}):Promise<T>{
 const controller=new AbortController();const timer=window.setTimeout(()=>controller.abort(),TIMEOUT_MS);
 try{const method=(options.method||'GET').toUpperCase();const headers=new Headers(options.headers);if(options.body && !headers.has('Content-Type'))headers.set('Content-Type','application/json');if(method!=='GET'&&method!=='HEAD'&&method!=='OPTIONS'){const token=csrfToken();if(token)headers.set('X-CSRFToken',token);}const res=await fetch(`${BASE}${path.startsWith('/')?path:`/${path}`}`,{...options,headers,credentials:'include',signal:controller.signal,referrerPolicy:'same-origin'});if(!res.ok)throw safeError(res.status);if(res.status===204)return undefined as T;return await res.json() as T;}catch(error){if(error instanceof DOMException&&error.name==='AbortError')throw new Error('TIMEOUT');throw error;}finally{window.clearTimeout(timer);}}
export const apiStatus=()=>api('/health/');
export {BASE as API_BASE_URL};

const factor = require('./a.out.js');
import iconv from 'iconv-lite';
import { promises as fs} from 'fs';
async function getFS(): Promise<typeof FS>{
  // return fs as any;
  const module = await factor()
  
  return module.FS;
}
export function dirname(path: string) {
	const match = /(\/|\\)[^/\\]*$/.exec(path);
	if (!match) return '.';

	const dir = path.slice(0, -match[0].length);

	// If `dir` is the empty string, we're at root.
	return dir ? dir : '/';
}

export function extname(path: string) {
	const match = /\.[^.]+$/.exec(basename(path)!);
	if (!match) return '';
	return match[0];
}
function basename(path: string) {
	return path.split(/(\/|\\)/).pop();
}

function encode(str:string){
  return iconv.encode(str, 'utf8');
}
function decode(buffer: any){
  return iconv.decode(buffer, 'utf8');
}

async function exists(filepath:string){
  const fs = await getFS();
  try { 
    await fs.stat(filepath)
    return true;
  }catch(err){
    return false;
  }
}
function convert(str:string){
  const list = str.replace(/\/$/,'') .split('/');
  let solong = undefined;
  const result = [];
  while (list.length > 0) {
    let item = list.shift();
    solong = solong === undefined ? item : solong + '/' + item
    result.push(solong!)
  }
  return result.filter(Boolean)
}
async function ensureDir(path:string){
  const fs = await getFS();
  const path_list = convert(path);
  for(const item of path_list){
    const exit = await exists(item);
    console.log('exit:', exit)
    if(!exit){
      const reuslt =await fs.mkdir(item);
      const stat = await fs.stat(item);
      console.log('stat:',stat);
      console.log('result:',item, reuslt)
    }
  }
}
async function ensureFile(filepath:string){
  const fs = await getFS();
  await ensureDir(dirname(filepath));
}
async function main(){
  const fs = await getFS();
  const mypath = 'a/b/c/test.txt'
  await ensureFile(mypath)
  
  await fs.writeFile(mypath,'hello world');
  const content = await fs.readFile(mypath);
  const result = decode(content);
  console.log('result:',result)
}
main()
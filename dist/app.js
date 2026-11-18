const names=['Registro de Marcas','Gestão Estratégica de Portfólio de Marcas','Pesquisa de Viabilidade e Anterioridade','Registro de Patentes','Registro de Desenho Industrial','Direitos Autorais','Registro de Software','Proteção Internacional de Ativos Intelectuais','Monitoramento e Defesa de Direitos','Oposição, Recursos e Processos Administrativos','Contratos de Propriedade Intelectual','Contencioso em Propriedade Intelectual'];
const list=document.getElementById('service-list');
names.forEach((name,index)=>{
  const detail=document.createElement('details');detail.name='servicos';
  const summary=document.createElement('summary');
  const num=document.createElement('span');num.className='s-num';num.textContent=String(index+1).padStart(2,'0');
  summary.append(num,document.createTextNode(name));detail.append(summary);
  // Organiza cada resposta em duas partes: apresentação e listas
  const [lead,desc,...rest]=window.legacyServices[index];
  const content=document.createElement('div');content.className='service-content';
  const intro=document.createElement('div');intro.className='svc-intro';
  const pLead=document.createElement('p');pLead.className='svc-lead';pLead.textContent=lead;
  const pDesc=document.createElement('p');pDesc.textContent=desc;
  intro.append(pLead,pDesc);
  const lists=document.createElement('div');lists.className='svc-lists';
  for(let i=0;i<rest.length;i+=2){
    const h=document.createElement('h4');h.textContent=rest[i].replace(/:$/,'');
    const ul=document.createElement('ul');
    rest[i+1].forEach(item=>{const li=document.createElement('li');li.textContent=item;ul.append(li)});
    lists.append(h,ul);
  }
  content.append(intro,lists);
  detail.append(content);list.append(detail);
});

// Envia o formulário como mensagem no WhatsApp da Legacy
// Assuntos do contato: um botão para cada serviço, pode marcar mais de um
const topicList=document.getElementById('topic-list');
const topicError=document.getElementById('topic-error');
names.forEach((name,index)=>{
  const label=document.createElement('label');label.className='topic';
  const box=document.createElement('input');box.type='checkbox';box.name='assunto';box.value=name;
  box.addEventListener('change',()=>{topicError.hidden=true});
  const span=document.createElement('span');span.textContent=name;
  label.append(box,span);topicList.append(label);
});

// Envia o formulário como mensagem no WhatsApp da Legacy
document.getElementById('contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const v=new FormData(event.currentTarget);
  const topics=v.getAll('assunto');
  if(!topics.length){topicError.hidden=false;topicList.querySelector('input').focus();return}
  const text=`Olá! Vim pelo site da Legacy.\n\nNome: ${v.get('nome')}\nTelefone: ${v.get('telefone')}\nEmail: ${v.get('email')}\nAssunto: ${topics.join(', ')}\n\n${v.get('mensagem')}`;
  const url=`https://wa.me/5583987172983?text=${encodeURIComponent(text)}`;
  if(!window.open(url,'_blank','noopener'))window.location.href=url;
});

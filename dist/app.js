const names=['Registro de Marcas','Gestão Estratégica de Portfólio de Marcas','Pesquisa de Viabilidade e Anterioridade','Registro de Patentes','Registro de Desenho Industrial','Direitos Autorais','Registro de Software','Proteção Internacional de Ativos Intelectuais','Monitoramento e Defesa de Direitos','Oposição, Recursos e Processos Administrativos','Contratos de Propriedade Intelectual','Contencioso em Propriedade Intelectual'];
const list=document.getElementById('service-list');
names.forEach((name,index)=>{
  const detail=document.createElement('details');detail.name='servicos';
  const summary=document.createElement('summary');
  const num=document.createElement('span');num.className='s-num';num.textContent=String(index+1).padStart(2,'0');
  summary.append(num,document.createTextNode(name));detail.append(summary);
  const content=document.createElement('div');content.className='service-content';
  window.legacyServices[index].forEach(item=>{
    if(Array.isArray(item)){const ul=document.createElement('ul');item.forEach(t=>{const li=document.createElement('li');li.textContent=t;ul.append(li)});content.append(ul)}
    else{const p=document.createElement('p');p.textContent=item;content.append(p)}
  });
  detail.append(content);list.append(detail);
});

// Envia o formulário como mensagem no WhatsApp da Legacy
document.getElementById('contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const v=new FormData(event.currentTarget);
  const text=`Olá! Vim pelo site da Legacy.\n\nNome: ${v.get('nome')}\nTelefone: ${v.get('telefone')}\nEmail: ${v.get('email')}\n\n${v.get('mensagem')}`;
  const url=`https://wa.me/5583987172983?text=${encodeURIComponent(text)}`;
  if(!window.open(url,'_blank','noopener'))window.location.href=url;
});

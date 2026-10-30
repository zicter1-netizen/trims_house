const barbers=[
	{id:1,name:'Mateo Rios',specialty:'Fade · Diseño',description:'Cortes modernos con precisión y acabado limpio.',services:['Fade clásico','Fade con diseño','Corte VIP todo incluido'],image:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=700&h=900&q=85'},
	{id:2,name:'Diego Santos',specialty:'Clásico · Barba',description:'Especialista en cortes tradicionales y rituales de barba.',services:['Corte clásico','Arreglo de barba','Corte con masaje'],image:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&h=900&q=85'},
	{id:3,name:'Alex Cruz',specialty:'Color · Textura',description:'Texturas naturales y color para estilos con personalidad.',services:['Texturizado','Coloración','Depilación de nariz'],image:'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=700&h=900&q=85'}
];

const products=[
  {category:'cuidado',name:'Pomada Matte',desc:'Fijacion flexible, acabado natural.',price:34000,image:'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80'},
  {category:'cuidado',name:'Aceite de Barba',desc:'Suavidad y brillo sin grasa.',price:28000,image:'https://images.unsplash.com/photo-1619451334792-150fd785ee74?auto=format&fit=crop&w=700&q=85'},
  {category:'cuidado',name:'Shampoo Carbon',desc:'Limpieza profunda para uso diario.',price:39000,image:'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=700&q=80'},
  {category:'cuidado',name:'Sea Salt Spray',desc:'Volumen y textura de playa.',price:31000,image:'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=700&q=80'},
  {category:'camisetas',name:'Camiseta Trims House',desc:'Algodon premium, corte regular y estilo urbano.',price:59000,image:'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80'},
  {category:'camisetas',name:'Camiseta Oversize',desc:'Silhouette relajada, ideal para looks casuales.',price:62000,image:'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80'},
  {category:'camisetas',name:'Camiseta Negra Premium',desc:'Negro basico con excelente caida y comodidad.',price:65000,image:'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=700&q=80'},
  {category:'camisetas',name:'Camiseta Minimalista',desc:'Diseño limpio para combinar con cualquier outfit.',price:54000,image:'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=700&q=80'},
  {category:'gorras',name:'Gorra Signature',desc:'Ajuste cómodo, visera curvada y acabado premium.',price:64000,image:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=700&q=80'},
  {category:'gorras',name:'Gorra Curva Classic',desc:'Estilo retro con tela resistente y gran comodo.',price:68000,image:'https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=700&q=80'},
  {category:'gorras',name:'Gorra Roadie',desc:'Diseño funcional para usar en todo momento.',price:72000,image:'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&w=700&q=80'},
  {category:'gorras',name:'Gorra Sport',desc:'Ideal para salidas, gym o uso diario.',price:61000,image:'https://images.unsplash.com/photo-1534215754734-18e55d13e346?auto=format&fit=crop&w=700&q=80'},
  {category:'accesorios',name:'Travel Kit',desc:'Set de bolsillo para cuidado y estilo diario.',price:75000,image:'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=700&q=80'},
  {category:'accesorios',name:'Bandana House',desc:'Proteccion y estilo para cada dia en la calle.',price:24000,image:'https://images.unsplash.com/photo-1519070813808-1d7a33907487?auto=format&fit=crop&w=700&q=80'},
  {category:'accesorios',name:'Llavero Trims',desc:'Detalle premium para llevar tus llaves con personalidad.',price:26000,image:'https://images.unsplash.com/photo-1722487631997-cf1e0f92c2c4?auto=format&fit=crop&w=700&q=80'},
  {category:'accesorios',name:'Mochila Compacta',desc:'Espacio y estilo para tu dia a dia.',price:89000,image:'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80'}
];

let currentUser=window.INITIAL_USER||JSON.parse(localStorage.getItem('trimsUser')||'null');
let registerMode=false;
let cart=JSON.parse(localStorage.getItem('trimsCart')||'[]');

const FALLBACK_LOCALHOST='http://localhost/trims_house/trims_house';
const API_URL=window.location.protocol==='file:'
  ? `${FALLBACK_LOCALHOST}/backend/api.php`
  : new URL('backend/api.php',window.location.href).toString();

const $=s=>document.querySelector(s);
const formatCurrency=value=>new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(value);
const escapeHtml=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const toast=msg=>{const t=$('#toast');
t.textContent=msg;
t.classList.add('show');
setTimeout(()=>t.classList.remove('show'),2600)};

const viewPanels={
  inicio: document.getElementById('inicioView'),
  barberos: document.getElementById('barberosView'),
  ropa: document.getElementById('ropaView'),
  cuidado: document.getElementById('cuidadoView'),
  reservar: document.getElementById('reservarView')
};

const navLinks=[...document.querySelectorAll('.main-nav a')];

function renderBarbersView(){
  const barberGrid=$('#barberGrid');
  if(!barberGrid) return;
  barberGrid.innerHTML=barbers.map(b=>`<article class="barber-card"><img src="${b.image}" alt="${b.name}, ${b.specialty}"><div class="barber-info"><div><h3>${b.name}</h3><p class="barber-specialty">${b.specialty}</p><p class="barber-description">${b.description}</p><strong>Servicios</strong><ul>${b.services.map(service=>`<li>${service}</li>`).join('')}</ul></div><span>↗</span></div></article>`).join('');
}

function renderShopView(){
  const productGroups={
    cuidado:products.filter(product=>product.category==='cuidado'),
    ropa:products.filter(product=>product.category!=='cuidado')
  };

  Object.entries(productGroups).forEach(([view, categoryProducts])=>{
    const grid=$(`#${view}Grid`);
    if(!grid) return;
    grid.innerHTML=categoryProducts.map((p)=>{
      const realIndex=products.indexOf(p);
      return `<article class="product-card" data-product-index="${realIndex}"><img src="${p.image}" alt="${p.name}"><div class="product-info"><h3>${p.name}</h3><p>${p.desc}</p><div class="product-bottom"><span class="price">${formatCurrency(p.price)}</span><button class="add-cart" data-product-index="${realIndex}" aria-label="Agregar ${p.name}">+</button></div></div></article>`;
    }).join('');
  });
}

function renderBookingView(){
  const bookingBarber=$('#bookingBarber');
  if(!bookingBarber) return;
  bookingBarber.innerHTML='<option value="" disabled selected>Selecciona un barbero</option>'+barbers.map(b=>`<option value="${b.id}">${b.name} · ${b.specialty}</option>`).join('');
  const bookingDate=$('#bookingDate');
  if(bookingDate){
    const today=new Date();
    const year=today.getFullYear();
    const month=String(today.getMonth()+1).padStart(2,'0');
    const day=String(today.getDate()).padStart(2,'0');
    bookingDate.min=`${year}-${month}-${day}`;
  }
  setupCustomBookingSelects();
  updateBookingSummary();
}

function setupCustomBookingSelects(){
  document.querySelectorAll('#bookingForm .booking-select-control select').forEach(select=>{
    const control=select.closest('.booking-select-control');
    if(!control||control.querySelector('.custom-select-trigger'))return;
    const trigger=document.createElement('button');
    trigger.type='button';
    trigger.className='custom-select-trigger';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-expanded','false');
    const menu=document.createElement('div');
    menu.className='custom-select-menu';
    menu.setAttribute('role','listbox');
    const firstOption=select.options[0];
    const placeholder=firstOption&&firstOption.disabled?firstOption.textContent:'Selecciona una opcion';
    const updateTrigger=()=>{
      const option=select.options[select.selectedIndex];
      trigger.innerHTML=`<span>${escapeHtml(option?option.textContent:placeholder)}</span><i aria-hidden="true"></i>`;
      trigger.classList.toggle('is-placeholder',!select.value);
    };
    [...select.children].forEach(child=>{
      if(child.tagName==='OPTGROUP'){
        const group=document.createElement('div');
        group.className='custom-select-group';
        group.textContent=child.label;
        menu.appendChild(group);
        [...child.children].forEach(option=>appendCustomOption(option,menu,select,updateTrigger));
      }else if(child.tagName==='OPTION'&&!child.disabled){
        appendCustomOption(child,menu,select,updateTrigger);
      }
    });
    const toggle=()=>{
      const isOpen=control.classList.toggle('is-open');
      trigger.setAttribute('aria-expanded',String(isOpen));
    };
    trigger.addEventListener('click',toggle);
    menu.addEventListener('click',event=>{
      const option=event.target.closest('[data-value]');
      if(!option)return;
      select.value=option.dataset.value;
      menu.querySelectorAll('.custom-select-option').forEach(entry=>entry.classList.toggle('is-selected',entry===option));
      updateTrigger();
      select.dispatchEvent(new Event('change',{bubbles:true}));
      control.classList.remove('is-open');
      trigger.setAttribute('aria-expanded','false');
    });
    select.classList.add('native-booking-select');
    control.append(trigger,menu);
    updateTrigger();
  });
}

function appendCustomOption(option,menu,select,updateTrigger){
  const item=document.createElement('button');
  item.type='button';
  item.className='custom-select-option';
  item.dataset.value=option.value;
  item.setAttribute('role','option');
  item.textContent=option.textContent;
  item.addEventListener('click',()=>{
    menu.querySelectorAll('.custom-select-option').forEach(entry=>entry.classList.remove('is-selected'));
    item.classList.add('is-selected');
    updateTrigger();
  });
  menu.appendChild(item);
}

function updateBookingSummary(){
  const summary=$('#bookingSummary');
  const form=$('#bookingForm');
  if(!summary||!form)return;
  const data=new FormData(form);
  const barber=barbers.find(b=>String(b.id)===String(data.get('barber_id')));
  const service=data.get('service');
  const date=data.get('date');
  const time=data.get('time');
  if(!barber||!service||!date||!time){
    summary.textContent='Selecciona tus opciones para ver el resumen de tu reserva.';
    return;
  }
  const formattedDate=new Intl.DateTimeFormat('es-CO',{day:'numeric',month:'long',year:'numeric'}).format(new Date(`${date}T12:00:00`));
  const note=data.get('note');
  summary.innerHTML=`<strong>Tu reserva</strong><br>${escapeHtml(service)} · ${formattedDate} a las ${time}<br>Con ${escapeHtml(barber.name)} · ${escapeHtml(data.get('finish')||'Acabado natural')}${note?`<br>Nota: ${escapeHtml(note)}`:''}`;
}

function initHomeView(){
  const heroSlides=[...document.querySelectorAll('.hero-slide')];
  const heroPrev=document.querySelector('.hero-carousel-prev');
  const heroNext=document.querySelector('.hero-carousel-next');
  let heroIndex=0;
  let heroInterval=null;

  function showHeroSlide(index){
    if(!heroSlides.length)return;
    heroIndex=(index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex)=>{
      slide.classList.toggle('is-active', slideIndex === heroIndex);
      slide.classList.toggle('active', slideIndex === heroIndex);
    });
  }

  function startHeroCarousel(){
    if(!heroSlides.length)return;
    clearInterval(heroInterval);
    heroInterval=setInterval(()=>showHeroSlide(heroIndex + 1), 4200);
  }

  if(heroPrev && heroNext){
    heroPrev.onclick=()=>{
      showHeroSlide(heroIndex - 1);
      startHeroCarousel();
    };
    heroNext.onclick=()=>{
      showHeroSlide(heroIndex + 1);
      startHeroCarousel();
    };
  }

  startHeroCarousel();
}

function normalizeViewName(viewName){
  const normalized = String(viewName || '').replace('#', '').trim();
  return viewPanels[normalized] ? normalized : 'inicio';
}

function setActiveView(viewName){
  const safeView = normalizeViewName(viewName);
  Object.entries(viewPanels).forEach(([name,panel])=>{
    if(!panel) return;
    panel.classList.toggle('active', name === safeView);
  });

  navLinks.forEach(link=>{
    const target = normalizeViewName(link.getAttribute('href'));
    link.classList.toggle('active', target === safeView);
  });

  const hash = safeView === 'inicio' ? '#inicio' : `#${safeView}`;
  if (window.location.hash !== hash) {
    try {
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', hash);
      } else {
        window.location.hash = hash;
      }
    } catch (error) {
      window.location.hash = hash;
    }
  }
}

function navigateToView(viewName){
  const safeView = normalizeViewName(viewName);
  if (!viewPanels[safeView]) return;
  const hash = safeView === 'inicio' ? '#inicio' : `#${safeView}`;
  try {
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  } catch (error) {
    window.location.hash = hash;
  }
  setActiveView(safeView);
}

function render(){
  renderBarbersView();
  renderShopView();
  renderBookingView();
  $('#cartCount').textContent=cart.length;
  renderAccount();
  initHomeView();
  const initialView = window.location.hash ? window.location.hash.replace('#','') : 'inicio';
  setActiveView(initialView);
}

function renderAccount(){
  const account=$('#account');
  if(!account){ return; }
  if(!currentUser){
    account.classList.add('hidden');
    $('#adminPanel').classList.add('hidden');
    $('#userMenu').innerHTML='';
    $('#authBtn').textContent='Iniciar sesion';
    return;
  }
  $('#authBtn').textContent=currentUser.name.split(' ')[0];
  const roleLabel=currentUser.role==='administrador'?'Panel de administrador':currentUser.role==='barbero'?'Panel de barbero':'Cuenta de cliente';
  $('#userMenu').innerHTML=`<strong>${escapeHtml(currentUser.name)}</strong><br><small>${roleLabel}</small><br><button id="logoutBtn">Cerrar sesion</button>`;
  account.classList.remove('hidden');
  const isAdmin=currentUser.role==='administrador';
  $('#accountTitle').textContent=isAdmin?'Centro de administración.':currentUser.role==='barbero'?'Agenda del equipo.':'Mis citas.';
  $('#accountSubtitle').textContent=isAdmin?'Resumen del negocio, citas y cuentas registradas.':currentUser.role==='barbero'?'Administra las citas que tienes pendientes.':'Consulta tus proximas visitas a Trims House.';
  $('#adminPanel').classList.toggle('hidden',!isAdmin);
  $('#appointmentList').classList.toggle('hidden',isAdmin);
  if(isAdmin){
    loadAdminDashboard();
    return;
  }
  const appointments=JSON.parse(localStorage.getItem('trimsAppointments')||'[]').filter(a=>currentUser.role==='barbero'?true:a.email===currentUser.email);
  $('#appointmentList').innerHTML=appointments.length?appointments.map(a=>`<div class="appointment"><div><strong>${a.service}</strong><small>${a.date} · ${a.time} · ${a.barber}${currentUser.role==='barbero'?` · ${a.email}`:''}</small></div><span class="status">Confirmada</span></div>`).join(''):'<p class="section-description">Aun no tienes citas pendientes. Reserva tu siguiente visita arriba.</p>';
}

async function loadAdminDashboard(){
  const result=await post({action:'admin_dashboard'});
  if(!result.ok){
    $('#adminMessage').textContent=result.message||'No se pudo cargar el panel de administración.';
    return;
  }
  $('#adminMessage').textContent='';
  $('#adminUserCount').textContent=result.stats.users;
  $('#adminAppointmentCount').textContent=result.stats.appointments;
  $('#adminPendingCount').textContent=result.stats.pending;
  $('#adminBookingsLabel').textContent=`${result.appointments.length} registros`;
  $('#adminUsersLabel').textContent=`${result.users.length} cuentas`;
  $('#adminAppointments').innerHTML=result.appointments.length?result.appointments.map(appointment=>`<tr>
    <td>${escapeHtml(appointment.customer)}<small>${escapeHtml(appointment.email)}</small></td>
    <td>${escapeHtml(appointment.service)}</td>
    <td>${escapeHtml(appointment.barber||'Sin asignar')}</td>
    <td>${escapeHtml(appointment.appointment_date)} · ${escapeHtml(String(appointment.appointment_time).slice(0,5))}</td>
    <td>${escapeHtml(appointment.finish||'Acabado natural')}</td>
    <td>${escapeHtml(appointment.note||'Sin indicaciones')}</td>
    <td><select aria-label="Estado de la cita ${appointment.id}" data-status-for="${appointment.id}">
      <option value="pendiente" ${appointment.status==='pendiente'?'selected':''}>Pendiente</option>
      <option value="confirmada" ${appointment.status==='confirmada'?'selected':''}>Confirmada</option>
      <option value="cancelada" ${appointment.status==='cancelada'?'selected':''}>Cancelada</option>
    </select></td>
    <td><button class="admin-save-btn" type="button" data-appointment-id="${appointment.id}">Guardar</button></td>
  </tr>`).join(''):'<tr><td colspan="8" class="admin-empty">Todavía no hay citas registradas.</td></tr>';
  $('#adminUsers').innerHTML=result.users.length?result.users.map(user=>`<tr>
    <td>${escapeHtml(user.name)}</td><td>${escapeHtml(user.email)}</td>
    <td>${escapeHtml(user.role)}</td><td>${escapeHtml(String(user.created_at).slice(0,10))}</td>
  </tr>`).join(''):'<tr><td colspan="4" class="admin-empty">Todavía no hay usuarios.</td></tr>';
}

function openProduct(index){
  const product=products[index];
  $('#productModalImage').src=product.image;
  $('#productModalImage').alt=product.name;
  $('#productModalTitle').textContent=product.name;
  $('#productModalDescription').textContent=product.desc;
  $('#productModalPrice').textContent=formatCurrency(product.price);
  $('#productModalAdd').dataset.product=index;
  $('#productModal').classList.remove('hidden');
}

function renderCart(){
  const grouped=cart.reduce((items,product)=>{const item=items.find(entry=>entry.name===product.name);
if(item)item.quantity++;
else items.push({product,quantity:1});
return items},[]);
  $('#cartItems').innerHTML=grouped.length?grouped.map((item,index)=>`<div class="cart-item"><img src="${item.product.image}" alt="${item.product.name}"><div><strong>${item.product.name}</strong><small>${formatCurrency(item.product.price)} · Cantidad: ${item.quantity}</small><button class="cart-remove" data-cart-index="${index}">Eliminar</button></div></div>`).join(''):'<p class="section-description">Tu carrito esta vacio.</p>';
  $('#cartTotal').textContent=formatCurrency(cart.reduce((total,product)=>total+product.price,0));
  $('#cartModal').classList.remove('hidden');
}

function openAuth(){
  registerMode=false;
  updateAuthModal();
  $('#authModal').classList.remove('hidden');
}

function updateAuthModal(){
  $('#authTitle').textContent=registerMode?'Crea tu cuenta.':'Inicia sesion.';
  $('#authSubmit').innerHTML=registerMode?'Registrarme <span>↗</span>':'Entrar a mi cuenta <span>↗</span>';
  $('#nameField').classList.toggle('hidden',!registerMode);
  $('#switchAuth').innerHTML=registerMode?'¿Ya tienes cuenta? <b>Inicia sesion</b>':'¿Nuevo por aqui? <b>Crea tu cuenta</b>';
  $('#authMessage').textContent='';
}

async function post(data){
  try{
    const r=await fetch(API_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
    return await r.json();
  }catch(e){
    return {ok:false,message:'No se pudo conectar con el servidor. Inicia Apache y MySQL en XAMPP.'};
  }
}

navLinks.forEach(link=>{
  link.addEventListener('click',event=>{
    const href = link.getAttribute('href') || '';
    const target = normalizeViewName(href);
    if(!viewPanels[target]) return;
    event.preventDefault();
    navigateToView(target);
  });
});

window.addEventListener('hashchange',()=>{
  const nextView = normalizeViewName(window.location.hash || '#inicio');
  setActiveView(nextView);
});

$('#authBtn').addEventListener('click',()=>currentUser?$('#userMenu').classList.toggle('hidden'):openAuth());
$('#cartBtn').addEventListener('click',renderCart);
document.addEventListener('click',e=>{
  const addBtn=e.target.closest('.add-cart');
  if(addBtn){
    const productIndex=Number(addBtn.dataset.productIndex);
    if(!Number.isNaN(productIndex) && products[productIndex]){
      cart.push(products[productIndex]);
      localStorage.setItem('trimsCart',JSON.stringify(cart));
      $('#cartCount').textContent=cart.length;
      toast(`${products[productIndex].name} agregado al carrito`);
    }
    return;
  }

  const card=e.target.closest('.product-card');
  if(card){
    const productIndex=Number(card.dataset.productIndex);
    if(!Number.isNaN(productIndex) && products[productIndex]) openProduct(productIndex);
  }
});
$('#productModalAdd').addEventListener('click',()=>{cart.push(products[$('#productModalAdd').dataset.product]);
localStorage.setItem('trimsCart',JSON.stringify(cart));
$('#cartCount').textContent=cart.length;
$('#productModal').classList.add('hidden');
toast('Producto agregado a tu carrito')});
$('#cartItems').addEventListener('click',e=>{const button=e.target.closest('[data-cart-index]');
if(!button)return;
const grouped=cart.reduce((items,product)=>{const item=items.find(entry=>entry.name===product.name);
if(item)item.quantity++;
else items.push({product,quantity:1});
return items},[]);
const productName=grouped[button.dataset.cartIndex].product.name;
cart.splice(cart.findIndex(product=>product.name===productName),1);
localStorage.setItem('trimsCart',JSON.stringify(cart));
$('#cartCount').textContent=cart.length;
renderCart()});
$('#checkoutBtn').addEventListener('click',()=>{if(!cart.length){toast('Tu carrito esta vacio');
return}toast('Compra recibida. Te contactaremos para confirmar el pago.');
cart=[];
localStorage.setItem('trimsCart','[]');
$('#cartCount').textContent='0';
renderCart()});
$('#switchAuth').addEventListener('click',()=>{registerMode=!registerMode;
updateAuthModal()});
document.querySelectorAll('[data-close]').forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.close).classList.add('hidden')));
$('#authModal').addEventListener('click',e=>{if(e.target.id==='authModal')e.currentTarget.classList.add('hidden')});

$('#refreshAdminBtn').addEventListener('click',loadAdminDashboard);
$('#adminAppointments').addEventListener('click',async e=>{
  const button=e.target.closest('[data-appointment-id]');
  if(!button)return;
  const status=$(`[data-status-for="${button.dataset.appointmentId}"]`).value;
  const result=await post({action:'admin_update_appointment',appointment_id:button.dataset.appointmentId,status});
  if(!result.ok){
    $('#adminMessage').textContent=result.message||'No se pudo actualizar la cita.';
    return;
  }
  toast('Estado de cita actualizado');
  loadAdminDashboard();
});

$('#authForm').addEventListener('submit',async e=>{e.preventDefault();
const data=Object.fromEntries(new FormData(e.target));
data.action=registerMode?'register':'login';
const result=await post(data);
if(!result.ok){$('#authMessage').textContent=result.message;
return}currentUser=result.user;
localStorage.setItem('trimsUser',JSON.stringify(currentUser));
$('#authModal').classList.add('hidden');
$('#userMenu').innerHTML=`<strong>${currentUser.name}</strong><br><small>${currentUser.role==='barbero'?'Panel de barbero':'Cuenta de cliente'}</small><br><button id="logoutBtn">Cerrar sesion</button>`;
renderAccount();
toast(registerMode?'Cuenta creada correctamente':'Bienvenido de vuelta');
if(registerMode||currentUser.role==='administrador')document.querySelector('#account').scrollIntoView({behavior:'smooth'})});

$('#bookingForm').addEventListener('submit',async e=>{e.preventDefault();
if(!currentUser){openAuth();
toast('Inicia sesion para reservar tu cita');
return}const data=Object.fromEntries(new FormData(e.target));
data.action='book';
data.email=currentUser.email;
data.barber=barbers.find(b=>b.id==data.barber_id).name;
const result=await post(data);
if(result.ok){const all=JSON.parse(localStorage.getItem('trimsAppointments')||'[]');
all.push(data);
localStorage.setItem('trimsAppointments',JSON.stringify(all));
e.target.reset();
renderAccount();
toast('Cita confirmada, te esperamos en casa');
updateBookingSummary();
$('#account').scrollIntoView({behavior:'smooth'})}else toast(result.message||'No se pudo reservar')});

['bookingBarber','bookingService','bookingDate','bookingTime','bookingFinish'].forEach(id=>{
  const field=$(`#${id}`);
  if(field)field.addEventListener('change',updateBookingSummary);
});
const bookingNote=$('#bookingNote');
if(bookingNote)bookingNote.addEventListener('input',updateBookingSummary);
document.addEventListener('click',event=>{
  document.querySelectorAll('.booking-select-control.is-open').forEach(control=>{
    if(!control.contains(event.target)){
      control.classList.remove('is-open');
      const trigger=control.querySelector('.custom-select-trigger');
      if(trigger)trigger.setAttribute('aria-expanded','false');
    }
  });
});

document.addEventListener('click',async e=>{if(e.target.id==='logoutBtn'){await post({action:'logout'});
currentUser=null;
localStorage.removeItem('trimsUser');
$('#userMenu').classList.add('hidden');
renderAccount();
toast('Sesion cerrada')}});

render();

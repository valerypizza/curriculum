const formularioo = document.querySelector('.formularioo');
formularioo.addEventListener('submit',()=>{
  Swal.fire('¡Mensaje Enviado exitosamente!')
  .then(()=>{
    window.location.href='/';
  });  
});



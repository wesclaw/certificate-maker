const textarea1 = document.querySelector('.textarea1')

textarea1.addEventListener('click', e=>{
  if(textarea1){
    textarea1.style.border = '3px dashed black'
    textarea1.style.resize = 'both'
  }
})

document.body.addEventListener('click', e => {
  if (e.target !== textarea1) {
      textarea1.style.border = 'none';
      textarea1.style.resize = 'none'
  }
});

const textarea2 = document.querySelector('.textarea2')

textarea2.addEventListener('click', e=>{
  if(textarea2){
    textarea2.style.border = '3px dashed black'
    textarea2.style.resize = 'both'
  }
})

document.body.addEventListener('click', e => {
  if (e.target !== textarea2) {
      textarea2.style.border = 'none';
      textarea2.style.resize = 'none'
  }
});









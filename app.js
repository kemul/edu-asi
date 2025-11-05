const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_SCRIPT_URL";
const questionsData = [
  'Saya merasa bahwa bayi saya mendapatkan cukup ASI',
  'Saya tetap dapat menyusui bayi saya walaupun banyak hal yang saya lakukan',
  'Saya memberikan ASI kepada bayi saya tanpa tambahan susu formula',
  'Saya memastikan bahwa bayi saya tidak mendapatkan makanan apapun selain ASI',
  'Saya mampu mengelola keadaan saat menyusui untuk kenyamanan saya',
  'Saya akan tetap menyusui bayi saya bahkan saat bayi saya menangis',
  'Saya tetap nyaman dalam menyusui saat ada anggota keluarga atau orang lain disekitar saya',
  'Saya puas dengan pengalaman menyusui saya',
  'Saya memberikan ASI kepada bayi saya dengan satu payudara sampai habis lalu beralih ke payudara sebelahnya',
  'Saya terus menyusui bayi saya untuk memberikan makanan',
  'Saya mampu memenuhi keinginan menyusui bayi saya',
  'Saya mengetahui tanda ketika bayi saya selesai menyusu'
];
window.addEventListener('DOMContentLoaded',()=>{
  const qContainer=document.getElementById('questions');
  if(!qContainer)return;
  questionsData.forEach((q,i)=>{
    const div=document.createElement('div');
    div.className='q-item';
    div.innerHTML=`<p><strong>${i+1}.</strong> ${q}</p>
    <div class='options'>
      ${['STY','TY','KY','Y','SY'].map(v=>`<label><input type='radio' name='q${i}' value='${v}' required> ${v}</label>`).join('')}
    </div>`;
    qContainer.appendChild(div);
  });
  document.getElementById('quiz-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const type=e.target.dataset.type;
    const nama=document.getElementById('nama').value;
    const nohp=document.getElementById('nohp').value;
    const answers={};
    questionsData.forEach((_,i)=>answers[`q${i+1}`]=document.querySelector(`input[name='q${i}']:checked`)?.value||null);
    await fetch(GOOGLE_SCRIPT_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,nama,nohp,answers})});
    alert(`Terima kasih, ${nama}! Jawaban ${type==='pretest'?'Pre-Test':'Post-Test'} Anda telah dikirim.`);
    window.location.href='index.html';
  });
});

const copyicon=document.querySelector('#copy-icon')

copyicon.addEventListener('click',async ()=>
{
    console.log('clicked');
    // var text = "Example text to appear on clipboard";
    var text=document.querySelector('.src-code').innerText;
navigator.clipboard.writeText(text).then(function() {
  console.log('Async: Copying to clipboard was successful!');
}, function(err) {
  console.error('Async: Could not copy text: ', err);
});
})
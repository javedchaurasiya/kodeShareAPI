const uname=`${Date.now()}-${(Math.random() * 1E16)}`
var qname=''
var src_code=''
var language=''
var repo1;

const uploadurl="http://localhost:3000/api/upload"
const commiturl="http://localhost:3000/push"

const gn_btn=document.querySelector('.main1')
const commit=document.querySelector('.push')



commit.addEventListener('click',async ()=>
{
  var user=document.querySelector('input[name="user"]').value
  // console.log(user);
  var repo=document.querySelector('input[name="repo"]').value
  var token=document.querySelector('input[name="token"]').value
  var message=document.querySelector('input[name="message"]').value
  // console.log('clicked');

  const formdata={
    qname:qname[0],
    src_code:src_code[0],
    language:language[0],
    username:user,
    repo:repo,
    token:token,
    message:message
}

// console.log(formdata);

fetch(commiturl,{
  method:"POST",
  headers:{
      "content-Type":"application/json"
  },
  body: JSON.stringify(formdata),
})
.then((res)=>res.json())
.then(response => {
  if(response.success)alert("Code Commited to Github Successfully");
  else alert("Something went wrong(Missing Data or github info incorrect)")
})

})

function main()
{
  chrome.tabs.query({active: true}, function(tabs) {
    var tab = tabs[0];
    chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector(".ace_content").innerText'
    }, (results)=>
    {
        src_code=results
    });
    chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector(".inline-wrap").innerText'
    }, (results)=>
    {
      qname=results
    });
    chrome.tabs.executeScript(tab.id, {
      code: 'document.querySelector("#result_language").innerText'
    }, (results)=>
    {
      language=results
      // console.log(uname);
      // console.log(qname[0]);
      // console.log(src_code[0]);
      // console.log(language[0]);
    });
  })
}


gn_btn.addEventListener('click',async()=>
{
  const formdata={
    uname:uname,
    qname:qname[0],
    src_code:src_code[0],
    language:language[0]
}
console.log(formdata);

fetch(uploadurl,{
    method:"POST",
    headers:{
        "content-Type":"application/json"
    },
    body: JSON.stringify(formdata),
})
.then((res)=>res.json())
.then(response => {
    const download=response.download
    const editor=response.editor
    console.log(download);
    console.log(editor);

    document.querySelector('.main').innerHTML="<button class='download'><a href='"+ download+"'>Download</a></button>"+"<button class='share'><a href='"+ editor+"'>Share Code</a></button>"
})

})

main()


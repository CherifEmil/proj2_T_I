var getKeyPair = () => {
  var keyPair, pem = localStorage.getItem("pem");
  if (pem) {
    privateKey = forge.pki.privateKeyFromPem(pem);
    publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
    keyPair = {privateKey, publicKey};
  } else {
    keyPair = forge.pki.rsa.generateKeyPair({bits: 1024});
    localStorage.setItem("pem",forge.pki.privateKeyToPem(keyPair.privateKey));
  };
  return keyPair;
};
var keyPair = getKeyPair();
console.log("Ma clef publique est:", forge.pki.publicKeyToPem(keyPair.publicKey));

var postpeers=() =>{ 
  try {
  var id_client = document.getElementById("id_client").value,
      public_key = forge.pki.publicKeyToPem(keyPair.publicKey);
   Data ={
    id_client:document.getElementById("id_client").value,
    public_key:forge.pki.publicKeyToPem(keyPair.publicKey)
  }
  fetch( "/postpeers", { method: "POST", body:JSON.stringify(Data)} )
  .then( _ => console.log(`Message envoyé: ${Data}`) )
  .catch( err => console.error(err) );
} catch (err) { console.error(err); };}

postpeers(); 

document.getElementById("send").addEventListener('click', event => {
  try {
    var msg = document.getElementById("msg").value,
     p_key= forge.pki.publicKeyFromPem((localStorage.getItem(document.getElementById("destinataire").value))),
        encryptedMsg = forge.util.encode64( p_key.encrypt( forge.util.encodeUtf8(msg)));

    fetch( "/addLetter", { method: "POST", body:  encryptedMsg } )
    .then( _ => console.log(`Message envoyé: ${encryptedMsg}`) )
    .catch( err => console.error(err) );
  } catch (err) { console.error(err); };
});

var reload = () => 
  fetch("/getLetters")
  .catch(err => console.error(err) )
  .then(resp => resp.json())
  .then(msgs => {
    var list = document.querySelector("div.messages");
    list.innerHTML = "";
    msgs.forEach( encryptedMsg => {
      try {
        var decryptedMsg = forge.util.decodeUtf8(keyPair.privateKey.decrypt(forge.util.decode64(encryptedMsg))),
            li = document.createElement("div");
        li.innerText = decryptedMsg;
        list.appendChild(li);
      } catch {};
    });
  });
  var reloadpeers = () => 
  fetch("/peers")
  .catch(err => console.error(err) )
  .then(resp => resp.json())
  .then(msgs => {
    var list = document.querySelector("div.peers");
    list.innerHTML = "";
    msgs.forEach( Data => {
      try {
           var li = document.createElement("div");
        li.innerText = JSON.parse(Data).id_client;
        list.appendChild(li);
        localStorage.setItem(String(JSON.parse(Data).id_client),JSON.parse(Data).public_key);
      } catch {};
    });
  });
document.getElementById("reload").addEventListener('click', reload);
document.getElementById("userload").addEventListener('click', reloadpeers);
document.getElementById("userload").addEventListener('click', postpeers);
function SendMessageServerless(title, body){
    var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "key=AAAABoH0kAI:APA91bFSYMdWvPteDQeRAk5WUSgN1me-wvDhgliPP6J9y7BrGHVtQnEJKz6wyiQwPkCPt6xmcQfjALBsV7MLvayYZgV6x42OKOcTC1ig8UZA3An5IL7oekYCKVRVFsci66BrChBRj_0z");
  
    var raw = JSON.stringify({
        "data": {},
        "program": 1646330880,
        "notification": {
        "body": body,
        "title": title
    },
        "registration_ids": ["d2OK93MCTFeo9mN-qFPOaC:APA91bE0w0QPhivg9XLOpCtJ1Sf77G3athBTeuDuCpmnB40axRyx1H312yKzpOISgXL4nziH-o8Q3sOE6jVBcSJH4spdKhZo0DgO4QDsA3eXtl_D0MEhuAKlvyjsIxwx1m803tegS_4j"]
    });
  
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };
  
   fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  };
  
  export {SendMessageServerless};
exports.routing=function (DV,s_DV,router_name,router_port) {
   for(item in s_DV){
   	 if(item==router_name){
   	 	console.log("same as me");
   	 	DV[s_DV[item].sID]={
   	 		"sID":router_name,
            "dID":s_DV[item].sID,
            "dP":s_DV[item].sP,
            "nH":1,
            "dis":parseInt(s_DV[item].dis),
            "nR":s_DV[item].sID,
            "sP":router_port

   	 	}
   	  }
   	  if(item!=router_name&&!isEmpty(DV[item])){    //if it's not the router's dv 
                  
          	if(parseInt(DV[item].dis)>parseInt(DV[s_DV[item].sID].dis)+parseInt(s_DV[item].dis)){
          	       console.log('change your cost');     //if distance larger than 
          		DV[item].dis=parseInt(DV[s_DV[item].sID].dis)+parseInt(s_DV[item].dis);
          		DV[item].nH=DV[s_DV[item].sID].nH+s_DV[item].nH;
          		DV[item].nR=s_DV[item].sID;
          	}
          
         
   	  }
   	  if(item!=router_name&&isEmpty(DV[item])&&!isEmpty(DV[s_DV[item].sID])){ 
   	  console.log('I do not have you'); //if router doesn't have this dv
   	  	  DV[item]={
   	  	  	"sID":router_name,
            "dID":item,
            "dP":s_DV[item].dP,
            "nH":parseInt(s_DV[item].nH)+parseInt(DV[s_DV[item].sID].nH),
            "dis":parseInt(s_DV[item].dis)+parseInt(DV[s_DV[item].sID].dis),
            "nR":s_DV[item].sID,
            "sP":router_port
   	  	  }
   	  }
   }	
   return DV;
};
exports.isEmpty=function(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}
function isEmpty(obj) {
	for (var prop in obj) {
		if (obj.hasOwnProperty(prop))
			return false;
	}

	return true;
}
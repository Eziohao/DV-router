function routing(s_DV) {
	if (!isEmpty(DV)) {
		for (var item in s_DV) {
			for (var i in DV) {
				if (item != i && item != router_name && isEmpty(DV[item])&&!isEmpty(DV[s_DV[item.sID]])) {
					console.log('get it');
					DV[item] = {
						"sID": router_name,
						"dID": s_DV[item].dID,
						"dP": s_DV[item].dP,
						"nH": parseInt(s_DV[item].nH)+parseInt(DV[s_DV[item].sID].nH),
						"dis": parseInt(s_DV[item].dis)+parseInt(DV[s_DV[item].sID].nH) ,
						"nR": s_DV[item].sID,
						"sP":router_port
					};
				} else if (item != i && item != router_name && !isEmpty(DV[item])) {
					console.log('have it');
					if (DV[item].nR != s_DV[item].sID&&!isEmpty(DV[s_DV[item].sID])) {
						if (parseInt(DV[item].dis) >= parseInt(s_DV[item].dis) + parseInt(DV[s_DV[item].sID].dis)) {
							console.log('change cost');
							DV[item].dis = parseInt(s_DV[item].sID) + parseInt(DV[s_DV[item].sID].dis);
							DV[item].nH = DV[s_DV[item].sID].nH + s_DV[item].nH;
							DV[item].nR = s_DV[item].sID;
						}
					}
				}
				else if(item==router_name&&isEmpty(DV[s_DV[item].sID])){
					console.log('catch it');
					DV[s_DV[item].sID]={
    				    "sID": router_name,
						"dID": s_DV[item].sID,
						"dP": s_DV[item].sP,
						"nH": s_DV[item].nH,
						"dis": parseInt(s_DV[item].dis),
						"nR": s_DV[item].sID,
						"sP":router_port
    			}
				}
			}
		}
	}
    else{
    	for(item in s_DV){
    		if(item==router_name){
    			DV[s_DV[item].sID]={
    				    "sID": router_name,
						"dID": s_DV[item].sID,
						"dP": s_DV[item].sP,
						"nH": s_DV[item].nH,
						"dis": parseInt(s_DV[item].dis),
						"nR": s_DV[item].sID,
						"sP":router_port
    			}
    		}
    		else if(item!=router_name&&!isEmpty(DV[s_DV[item].sID])){
               DV[item]={
               	        "sID": router_name,
						"dID": item,
						"dP": s_DV[item].sP,
						"nH": parseInt(s_DV[item].nH)+parseInt(DV[s_DV[item].sID].nH),
						"dis": parseInt(s_DV[item].dis)+parseInt(DV[s_DV[item].sID].dis),
						"nR": s_DV[item].sID,
						"sP":router_port
               }
    		}
    	}
    }

};

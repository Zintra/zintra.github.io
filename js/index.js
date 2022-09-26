//------------- Absorption coefficients -------------
// https://www.acousticalsurfaces.com/acoustic_IOI/101_13.htm

var alfaBrick = [0.03, 0.03, 0.03, 0.04, 0.05, 0.07];
var alfaConcrete = [0.1, 0.05, 0.06, 0.07, 0.09, 0.08];
var alfaPlaster = [0.013, 0.015, 0.02, 0.03, 0.04, 0.05];
var alfaWood = [0.28, 0.22, 0.17, 0.09, 0.1, 0.11];
var alfaCarpet = [0.02,	0.06,	0.14,	0.37,	0.6, 0.65];
var alfaZintraQuarterInchSheetsDirect	= [0.00, 0.01, 0.06, 0.23, 0.52, 0.74];
var alfaZintraQuarterInchSheetsZClips = [0.05, 0.05, 0.13, 0.44, 0.81, 1.05];
var alfaZintraQuarterInchSheetsOneInchStandoff = [0.03, 0.02, 0.19, 0.46, 0.87, 0.96];
var alfaZintraQuarterInchSheetsTwoInchStandoff = [0.00, 0.10, 0.33, 0.73, 0.97, 0.80];
var alfaZintraQuarterInchSheetsSixInchStandoff = [0.18, 0.48, 0.83, 0.81, 0.88, 0.89];
var alfaZintraHalfInchSheetsDirect = [0.01, 0.05, 0.25, 0.61, 0.85, 0.95];
var alfaZintraHalfInchSheetsZClips = [0.08, 0.13, 0.27, 0.72, 1.00, 1.06];
var alfaZintraHalfInchSheetsOneInchStandoff = [0.04, 0.06, 0.38, 0.84, 1.00, 1.00];
var alfaZintraHalfInchSheetsTwoInchStandoff = [0.16, 0.46, 0.80, 1.04, 1.00, 0.92];
var alfaZintraHalfInchSheetsSixInchStandoff = [0.46, 0.68, 0.96, 0.92, 0.94, 0.91];
var alfaZintraOneInchSheetsDirect =	[0.04, 0.28, 0.78, 0.96, 1.01, 0.97];
var alfaZintraOneInchSheetsZClips = [0.06, 0.28, 0.63, 1.02, 1.12, 1.08];
var alfaZintraOneInchSheetsOneInchStandoff= [0.07, 0.37, 0.91, 1.00, 1.00, 1.00];
var alfaZintraOneInchSheetsTwoInchStandoff = [0.36, 0.77, 0.98, 1.00, 0.96, 0.99];
var alfaZintraOneInchSheetsSixInchStandoff = [0.55, 0.69, 0.99, 0.86, 1.00, 1.00];
var alfaZintraTwoInchSheetsDirect = [0.18, 0.85, 1.15, 1.25, 1.18, 1.14];
var alfaZintraTwoInchSheetsZClips = [0.20, 0.87, 1.19, 1.31, 1.19, 1.14];
var alfaZintraEMBOSSDirect = [0.03, 0.03, 0.14, 0.40, 0.75, 0.88];
var alfaZintraEMBOSSOneInchStandoff = [0.00, 0.12, 0.33, 0.69, 0.97, 0.92];
var alfaZintraEMBOSSTwoInchStandoff= [0.07, 0.31, 0.55, 0.84, 0.99, 0.82];
var alfaZintraEMBOSSSixInchStandoff = [0.27, 0.66, 0.85, 0.81, 0.92, 0.93];
var alfaZintraSticksThinDirect = [0.04, 0.25, 0.81, 1.17, 1.07, 1.14];
var alfaZintraSticksThinSixInchStandoff = [0.13, 0.31, 0.59, 1.05, 1.34, 1.48];
var alfaZintraBladesSquareSmall = [0.15, 0.51, 0.65, 0.71, 0.92, 1.12];
var alfaZintraBladesSquareLarge = [0.29, 0.69, 0.78, 1.08, 1.27, 1.40];
var alfaZintraBafflesSmall = [0.06, 0.21, 0.39, 0.67, 0.99, 1.44];
var alfaZintraBafflesLarge = [0.02, 0.52, 0.72, 1.17, 1.59, 1.95];
var alfaZintraBoxTilesHex = [0.22, 0.81, 1.08, 1.30, 1.19, 1.18];


var width = 1;
var height = 1;
var length = 1;


//------------- Functions -------------------

$(function() {
   $("#calculate").click(function() {
      getDimensions();
      var volume = calcVolume(width, height, length);
      
      var $material1 = parseInt($("#material-1").val());
      var $material2 = parseInt($("#material-2").val());
      var $material3 = parseInt($("#material-3").val());
      var $material4 = parseInt($("#material-4").val());
      var $material5 = parseInt($("#material-5").val());
      var $material6 = parseInt($("#material-6").val());
      
      var alfas1 = getCoefficients($material1);
      var alfas2 = getCoefficients($material2);
      var alfas3 = getCoefficients($material3);
      var alfas4 = getCoefficients($material4);
      var alfas5 = getCoefficients($material5);
      var alfas6 = getCoefficients($material6);
      
      var surfaces = calcAreas(width, height, length);
      var sabins = calcSA(alfas1, alfas2, alfas3, alfas4, alfas5, alfas6, surfaces);
      var RT = calcRT(volume, sabins);
      drawGraph(RT);
      
   });
     
});


function getDimensions() {
   width = $("#room-width").val();
   height = $("#room-height").val();
   length = $("#room-length").val();   
}

function getCoefficients(material) {
   switch(material) {
      case 1:
         return alfaBrick;
         break;
      case 2:
         return alfaConcrete;
         break;
      case 3:
         return alfaPlaster;
         break;
      case 4:
         return alfaWood;
         break;
      case 5:
         return alfaCarpet;
         break;
      case 6:
         return alfaZintraQuarterInchSheetsDirect;
         break;
      case 7:
         return alfaZintraQuarterInchSheetsZClips;
         break;
      case 8:
         return alfaZintraQuarterInchSheetsOneInchStandoff;
         break;
      case 9:
         return alfaZintraQuarterInchSheetsTwoInchStandoff;
         break;
      case 10:
         return alfaZintraQuarterInchSheetsSixInchStandoff;
         break;     
      case 11:
         return alfaZintraHalfInchSheetsDirect;
         break;  
      case 12:
         return alfaZintraHalfInchSheetsZClips;
         break;  
      case 13:
         return alfaZintraHalfInchSheetsOneInchStandoff;
         break;  
      case 14:
         return alfaZintraHalfInchSheetsTwoInchStandoff;
         break;           
      case 15:
         return alfaZintraHalfInchSheetsSixInchStandoff;
         break;   
      case 16:
         return alfaZintraOneInchSheetsDirect;
         break;   
      case 17:
         return alfaZintraOneInchSheetsZClips;
         break;           
      case 18:
         return alfaZintraOneInchSheetsOneInchStandoff;
         break;      
      case 19:
         return alfaZintraOneInchSheetsTwoInchStandoff;
         break;           
      case 20:
         return alfaZintraOneInchSheetsSixInchStandoff;
         break;           
      case 21:
         return alfaZintraTwoInchSheetsDirect;
         break;    
      case 22:
         return alfaZintraTwoInchSheetsZClips;
         break;           
      case 23:
         return alfaZintraEMBOSSDirect;
         break;           
      case 24:
         return alfaZintraEMBOSSOneInchStandoff;
         break;  
      case 25:
         return alfaZintraEMBOSSTwoInchStandoff;
         break;           
      case 26:
         return alfaZintraEMBOSSSixInchStandoff;
         break;           
      case 27:
         return alfaZintraSticksThinDirect;
         break;  
      case 28:
         return alfaZintraSticksThinSixInchStandoff;
         break;           
      case 29:
         return alfaZintraBladesSquareSmall;
         break;           
      case 30:
         return alfaZintraBladesSquareLarge;
         break;      
      case 31:
         return alfaZintraBafflesSmall;
         break;           
      case 32:
         return alfaZintraBafflesLarge;
         break;         
      case 33:
         return ZintraBoxTilesHex;
         break;               
      default:
         break;
   }
}


function calcVolume(w, h, l) {
   return w*h*l;
}

function calcAreas(w, h, l) {
   var areas = []; // Pared frontal, pared lateral, techo
   areas.push(w*h);
   areas.push(l*h);
   areas.push(w*l);
   return areas;
}

function calcSA(al1, al2, al3, al4, al5, al6, surf) { 
   var SA = [];
   for (var i = 0; i < 6; i++) {
      SA[i] = al1[i]*surf[0] + al2[i]*surf[1] + al3[i]*surf[0] + al4[i]*surf[1] + al5[i]*surf[2] * al6[i]*surf[2];
         
   }
   return SA;
}

function calcRT(volume, sabins) {
   var RT = [];
   for (var i = 0; i < 6; i++) {
      RT[i] = (0.161*volume) / sabins[i];
   }
   
   return RT;
}

function drawGraph(RT) {
   var dataArray = RT;
   var textRT = d3.selectAll(".text-rt");
   
   var x = d3.scaleLinear()
      .domain([0, d3.max(dataArray)])
      .range([0, 150]);
   
   d3.selectAll(".graph-rect")
      .data(dataArray)
      .attr("height", function(d) { 
         //console.log(d);
         return x(d); })
      .attr("y", function(d) { return 170 - x(d); });
   
   
   textRT.data(dataArray)
      .text(function(data) {
         return Math.round(data * 100) / 100})
      .style("opacity", 1)
      .attr("y", function(data) { return 163 - x(data); });
      
      

   
  
   
}

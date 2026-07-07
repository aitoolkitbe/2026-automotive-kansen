import React, { useState, useMemo } from "react";
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip,
  ReferenceLine, ReferenceArea, ResponsiveContainer, LineChart, Line, Legend
} from "recharts";

const DATA = {"months":["2025-01","2025-02","2025-03","2025-04","2025-05","2025-06","2025-07","2025-08","2025-09","2025-10","2025-11","2025-12","2026-01","2026-02","2026-03","2026-04","2026-05","2026-06"],"market":{"h1_25":234616,"h1_26":230681},"brands":[{"b":"BMW","g":"DE","s":[5998,4311,4620,3779,3486,3999,2973,2966,2607,3360,3847,2763,3133,3311,6215,3792,3741,4521],"t18":69422,"h25":26193,"h26":24713,"ya":-1480,"yp":-5.7,"sh":10.71},{"b":"VOLKSWAGEN","g":"VOL","s":[3632,3886,3705,3550,3530,3990,3295,2359,3211,2874,2284,2455,3170,3732,3661,3087,2659,3136],"t18":58216,"h25":22293,"h26":19445,"ya":-2848,"yp":-12.8,"sh":8.43},{"b":"MERCEDES","g":"DE","s":[3687,2484,2881,2748,2405,2784,2696,2211,2519,2508,1917,1650,3079,2592,2520,2567,2040,2740],"t18":46028,"h25":16989,"h26":15538,"ya":-1451,"yp":-8.5,"sh":6.74},{"b":"AUDI","g":"DE","s":[2440,2441,2556,2586,2705,3398,2525,2055,1805,1974,1731,1878,2215,1983,2715,3298,2404,2458],"t18":43167,"h25":16126,"h26":15073,"ya":-1053,"yp":-6.5,"sh":6.53},{"b":"RENAULT","g":"VOL","s":[2223,3710,2312,1970,1774,2493,1784,1469,1990,2019,1782,1766,1908,2748,2491,2213,1685,2954],"t18":39291,"h25":14482,"h26":13999,"ya":-483,"yp":-3.3,"sh":6.07},{"b":"PEUGEOT","g":"VOL","s":[1853,2154,2286,2646,2625,2670,1617,1184,1707,2218,1614,1263,2363,2396,2527,2552,2505,3041],"t18":39221,"h25":14234,"h26":15384,"ya":1150,"yp":8.1,"sh":6.67},{"b":"DACIA","g":"VOL","s":[2523,2228,2477,2798,2533,2950,2334,1308,1465,2286,1759,1012,1318,2429,2263,1894,1734,2171],"t18":37482,"h25":15509,"h26":11809,"ya":-3700,"yp":-23.9,"sh":5.12},{"b":"SKODA","g":"VOL","s":[1273,1532,1708,1689,1299,1415,1259,1209,1786,1679,1168,1265,1870,1558,1939,1701,1551,1980],"t18":27881,"h25":8916,"h26":10599,"ya":1683,"yp":18.9,"sh":4.59},{"b":"TOYOTA","g":"VOL","s":[2240,2115,2044,1814,1601,1761,1292,1181,1316,1534,1083,848,1611,1632,1842,1454,1198,1263],"t18":27829,"h25":11575,"h26":9000,"ya":-2575,"yp":-22.2,"sh":3.9},{"b":"VOLVO","g":"VOL","s":[1488,1521,1549,1519,1354,1746,1094,782,1423,1698,1163,1057,1389,959,1284,1558,1205,1695],"t18":24484,"h25":9177,"h26":8090,"ya":-1087,"yp":-11.8,"sh":3.51},{"b":"KIA","g":"VOL","s":[1760,1719,1524,1317,1176,1521,1256,1175,1064,1010,966,903,1397,1377,1322,1378,1200,1844],"t18":23909,"h25":9017,"h26":8518,"ya":-499,"yp":-5.5,"sh":3.69},{"b":"HYUNDAI","g":"VOL","s":[1340,1281,1329,928,902,1094,1170,778,1189,1296,959,2062,700,1070,1106,1194,941,1851],"t18":21190,"h25":6874,"h26":6862,"ya":-12,"yp":-0.2,"sh":2.97},{"b":"FORD","g":"VOL","s":[1336,1304,1273,1147,1083,1254,982,789,1091,1022,808,744,900,1019,1455,1094,813,1158],"t18":19272,"h25":7397,"h26":6439,"ya":-958,"yp":-13.0,"sh":2.79},{"b":"CITROEN","g":"VOL","s":[1181,1030,1205,980,1073,1814,1005,679,869,1010,604,721,1046,1206,1110,1082,1083,1144],"t18":18842,"h25":7283,"h26":6671,"ya":-612,"yp":-8.4,"sh":2.89},{"b":"TESLA","g":"EV","s":[1008,1053,958,570,669,1195,460,485,1027,426,998,1084,693,1202,1806,834,1168,1377],"t18":17013,"h25":5453,"h26":7080,"ya":1627,"yp":29.8,"sh":3.07},{"b":"OPEL","g":"VOL","s":[727,1015,1064,1024,684,880,802,722,944,874,663,524,1010,1396,1310,1129,883,925],"t18":16576,"h25":5394,"h26":6653,"ya":1259,"yp":23.3,"sh":2.88},{"b":"MINI","g":"DE","s":[455,540,951,598,658,795,478,622,759,570,472,660,526,543,925,926,730,838],"t18":12046,"h25":3997,"h26":4488,"ya":491,"yp":12.3,"sh":1.95},{"b":"MG","g":"CN","s":[276,390,433,349,320,342,300,232,575,825,643,1288,307,592,864,857,996,2106],"t18":11695,"h25":2110,"h26":5722,"ya":3612,"yp":171.2,"sh":2.48},{"b":"NISSAN","g":"VOL","s":[974,999,842,929,560,617,478,390,588,585,415,490,456,691,608,359,249,810],"t18":11040,"h25":4921,"h26":3173,"ya":-1748,"yp":-35.5,"sh":1.38},{"b":"BYD","g":"CN","s":[247,223,340,295,289,422,388,446,442,457,431,381,476,489,630,576,507,936],"t18":7975,"h25":1816,"h26":3614,"ya":1798,"yp":99.0,"sh":1.57},{"b":"SUZUKI","g":"VOL","s":[453,419,392,451,268,307,270,305,340,410,287,576,338,440,341,237,369,457],"t18":6660,"h25":2290,"h26":2182,"ya":-108,"yp":-4.7,"sh":0.95},{"b":"FIAT","g":"VOL","s":[202,342,375,328,282,401,220,291,271,361,219,243,340,445,539,420,516,646],"t18":6441,"h25":1930,"h26":2906,"ya":976,"yp":50.6,"sh":1.26},{"b":"LAND ROVER","g":"OTH","s":[380,407,399,506,347,407,471,430,236,264,246,779,109,170,274,324,178,335],"t18":6262,"h25":2446,"h26":1390,"ya":-1056,"yp":-43.2,"sh":0.6},{"b":"MAZDA","g":"VOL","s":[254,313,332,293,226,356,278,217,193,405,286,310,314,407,434,302,259,733],"t18":5912,"h25":1774,"h26":2449,"ya":675,"yp":38.0,"sh":1.06},{"b":"CUPRA","g":"VOL","s":[361,354,364,582,320,237,250,201,201,222,206,165,253,221,392,387,239,352],"t18":5307,"h25":2218,"h26":1844,"ya":-374,"yp":-16.9,"sh":0.8},{"b":"PORSCHE","g":"DE","s":[371,255,284,321,383,456,349,243,249,265,175,199,246,186,226,175,170,281],"t18":4834,"h25":2070,"h26":1284,"ya":-786,"yp":-38.0,"sh":0.56},{"b":"SEAT","g":"VOL","s":[330,623,352,383,230,236,226,196,171,208,130,147,251,213,183,237,192,280],"t18":4588,"h25":2154,"h26":1356,"ya":-798,"yp":-37.0,"sh":0.59},{"b":"POLESTAR","g":"EV","s":[300,248,268,205,234,248,190,291,245,337,146,189,212,201,224,156,170,201],"t18":4065,"h25":1503,"h26":1164,"ya":-339,"yp":-22.6,"sh":0.5},{"b":"JEEP","g":"VOL","s":[132,206,279,239,225,308,129,115,158,128,109,157,154,168,379,322,342,262],"t18":3812,"h25":1389,"h26":1627,"ya":238,"yp":17.1,"sh":0.71},{"b":"HONDA","g":"VOL","s":[144,231,206,126,130,121,148,145,131,181,116,125,120,233,289,194,148,299],"t18":3087,"h25":958,"h26":1283,"ya":325,"yp":33.9,"sh":0.56},{"b":"LEAPMOTOR","g":"CN","s":[52,43,43,77,58,110,67,28,93,92,137,189,127,200,251,159,418,580],"t18":2724,"h25":383,"h26":1735,"ya":1352,"yp":353.0,"sh":0.75},{"b":"ALFA ROMEO","g":"VOL","s":[174,171,150,184,116,130,85,84,99,157,68,94,107,71,194,107,107,221],"t18":2319,"h25":925,"h26":807,"ya":-118,"yp":-12.8,"sh":0.35},{"b":"XPENG","g":"CN","s":[86,68,119,131,113,115,110,78,83,87,82,113,135,163,224,230,173,199],"t18":2309,"h25":632,"h26":1124,"ya":492,"yp":77.8,"sh":0.49},{"b":"LEXUS","g":"VOL","s":[150,131,117,148,154,149,85,123,113,85,57,63,106,112,68,91,71,82],"t18":1905,"h25":849,"h26":530,"ya":-319,"yp":-37.6,"sh":0.23},{"b":"KG MOBILITY","g":"CN","s":[78,74,40,68,40,128,111,49,78,59,67,101,90,129,119,163,141,343],"t18":1878,"h25":428,"h26":985,"ya":557,"yp":130.1,"sh":0.43},{"b":"JAECOO","g":"CN","s":[0,0,25,34,70,61,82,57,75,80,72,52,78,162,177,150,189,250],"t18":1614,"h25":190,"h26":1006,"ya":816,"yp":429.5,"sh":0.44},{"b":"DS","g":"VOL","s":[90,71,73,118,65,141,52,35,57,87,65,56,89,126,72,44,68,119],"t18":1428,"h25":558,"h26":518,"ya":-40,"yp":-7.2,"sh":0.22},{"b":"OMODA","g":"CN","s":[4,2,40,44,34,39,32,31,72,33,48,83,82,175,194,167,167,133],"t18":1380,"h25":163,"h26":918,"ya":755,"yp":463.2,"sh":0.4},{"b":"SMART","g":"DE","s":[72,41,21,36,36,65,33,14,37,57,46,35,21,25,55,83,66,87],"t18":830,"h25":271,"h26":337,"ya":66,"yp":24.4,"sh":0.15},{"b":"ALPINE","g":"OTH","s":[18,20,49,45,63,59,43,19,28,37,25,25,47,35,47,54,51,107],"t18":772,"h25":254,"h26":341,"ya":87,"yp":34.3,"sh":0.15},{"b":"LYNK & CO","g":"CN","s":[14,3,1,50,21,48,26,8,16,21,6,159,27,20,19,12,22,73],"t18":546,"h25":137,"h26":173,"ya":36,"yp":26.3,"sh":0.07},{"b":"ZEEKR","g":"CN","s":[0,0,0,0,0,0,3,0,3,8,14,30,28,72,137,71,59,117],"t18":542,"h25":0,"h26":484,"ya":484,"yp":null,"sh":0.21},{"b":"LANCIA","g":"VOL","s":[20,14,14,12,19,27,22,15,18,27,39,14,22,14,24,15,28,40],"t18":384,"h25":106,"h26":143,"ya":37,"yp":34.9,"sh":0.06},{"b":"FERRARI","g":"OTH","s":[19,11,25,24,16,17,9,10,15,12,17,27,9,15,23,21,25,17],"t18":312,"h25":112,"h26":110,"ya":-2,"yp":-1.8,"sh":0.05},{"b":"SUBARU","g":"VOL","s":[15,10,17,16,12,31,4,3,14,5,11,15,13,21,33,10,30,46],"t18":306,"h25":101,"h26":153,"ya":52,"yp":51.5,"sh":0.07},{"b":"MITSUBISHI","g":"VOL","s":[0,0,0,1,3,2,3,0,3,1,1,3,4,23,106,28,37,79],"t18":294,"h25":6,"h26":277,"ya":271,"yp":4516.7,"sh":0.12},{"b":"LOTUS","g":"OTH","s":[22,24,15,10,11,14,7,7,10,8,13,13,10,10,8,9,10,11],"t18":212,"h25":96,"h26":58,"ya":-38,"yp":-39.6,"sh":0.03},{"b":"MASERATI","g":"OTH","s":[13,13,4,11,5,22,11,9,4,6,11,12,25,14,9,8,7,16],"t18":200,"h25":68,"h26":79,"ya":11,"yp":16.2,"sh":0.03},{"b":"BAIC","g":"CN","s":[13,7,10,4,9,15,18,13,22,11,8,2,1,2,6,11,8,12],"t18":172,"h25":58,"h26":40,"ya":-18,"yp":-31.0,"sh":0.02},{"b":"BENTLEY","g":"OTH","s":[14,6,8,13,18,14,6,4,7,6,6,3,14,9,8,8,2,9],"t18":155,"h25":73,"h26":50,"ya":-23,"yp":-31.5,"sh":0.02},{"b":"LAMBORGHINI","g":"OTH","s":[9,8,10,14,7,6,8,8,6,9,3,7,13,11,9,8,8,7],"t18":151,"h25":54,"h26":56,"ya":2,"yp":3.7,"sh":0.02},{"b":"FORTHING","g":"CN","s":[6,9,17,9,13,8,11,6,12,8,8,7,1,2,6,10,6,9],"t18":148,"h25":62,"h26":34,"ya":-28,"yp":-45.2,"sh":0.01},{"b":"TRIPOD","g":"OTH","s":[10,13,12,14,7,15,10,7,9,2,8,5,2,5,0,2,4,9],"t18":134,"h25":71,"h26":22,"ya":-49,"yp":-69.0,"sh":0.01},{"b":"ASTON MARTIN","g":"OTH","s":[16,7,8,9,8,11,3,4,3,2,4,7,6,9,9,6,9,11],"t18":132,"h25":59,"h26":50,"ya":-9,"yp":-15.3,"sh":0.02},{"b":"ALLIED VEHICLES LTD","g":"OTH","s":[5,4,6,9,7,10,2,7,3,6,5,7,5,6,12,5,8,9],"t18":116,"h25":41,"h26":45,"ya":4,"yp":9.8,"sh":0.02},{"b":"LIVAN","g":"CN","s":[0,9,10,3,3,11,9,2,10,6,4,13,0,1,5,3,7,8],"t18":104,"h25":36,"h26":24,"ya":-12,"yp":-33.3,"sh":0.01},{"b":"MAXUS","g":"CN","s":[55,17,7,3,0,2,6,2,2,1,0,6,0,0,0,0,0,0],"t18":101,"h25":84,"h26":0,"ya":-84,"yp":-100.0,"sh":0.0},{"b":"DFSK","g":"CN","s":[3,9,5,6,9,7,6,5,4,2,4,11,1,2,3,3,0,4],"t18":84,"h25":39,"h26":13,"ya":-26,"yp":-66.7,"sh":0.01},{"b":"NIO","g":"CN","s":[1,0,0,0,0,0,0,0,25,3,3,13,2,9,7,4,5,6],"t18":78,"h25":1,"h26":33,"ya":32,"yp":3200.0,"sh":0.01},{"b":"DONGFENG","g":"CN","s":[10,3,3,2,4,1,1,1,1,6,0,1,2,3,13,2,9,4],"t18":66,"h25":23,"h26":33,"ya":10,"yp":43.5,"sh":0.01},{"b":"JAGUAR","g":"OTH","s":[13,11,7,6,9,7,5,0,1,0,1,0,0,0,0,0,0,1],"t18":61,"h25":53,"h26":1,"ya":-52,"yp":-98.1,"sh":0.0},{"b":"DR","g":"CN","s":[0,0,0,0,0,15,5,2,6,0,0,0,2,7,6,3,4,0],"t18":50,"h25":15,"h26":22,"ya":7,"yp":46.7,"sh":0.01},{"b":"ROLLS-ROYCE","g":"OTH","s":[2,1,2,4,5,4,0,1,4,1,3,1,4,3,1,3,0,1],"t18":40,"h25":18,"h26":12,"ya":-6,"yp":-33.3,"sh":0.01},{"b":"CATERHAM","g":"OTH","s":[1,3,5,3,1,2,2,2,2,2,0,1,0,1,2,1,1,7],"t18":36,"h25":15,"h26":12,"ya":-3,"yp":-20.0,"sh":0.01},{"b":"AMF","g":"OTH","s":[2,5,2,0,1,1,2,2,0,1,2,1,3,0,1,3,0,3],"t18":29,"h25":11,"h26":10,"ya":-1,"yp":-9.1,"sh":0.0},{"b":"B-STYLE&FLEX-I-TRANS","g":"CN","s":[6,2,0,0,2,0,1,0,5,5,2,1,1,0,3,0,0,0],"t18":28,"h25":10,"h26":4,"ya":-6,"yp":-60.0,"sh":0.0},{"b":"ALPINA","g":"DE","s":[1,2,0,1,3,1,1,2,0,4,1,1,4,2,0,0,0,1],"t18":24,"h25":8,"h26":7,"ya":-1,"yp":-12.5,"sh":0.0},{"b":"SPORTEQUIPE","g":"OTH","s":[0,0,0,0,0,1,2,2,1,4,2,0,2,3,2,2,2,1],"t18":24,"h25":1,"h26":12,"ya":11,"yp":1100.0,"sh":0.01},{"b":"SSANGYONG","g":"OTH","s":[6,3,4,1,1,3,4,0,0,0,0,0,0,0,0,0,0,0],"t18":22,"h25":18,"h26":0,"ya":-18,"yp":-100.0,"sh":0.0},{"b":"UNKNOWN","g":"OTH","s":[0,0,0,22,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":22,"h25":22,"h26":0,"ya":-22,"yp":-100.0,"sh":0.0},{"b":"SWM","g":"CN","s":[2,3,0,3,5,3,0,1,0,0,0,0,1,0,1,0,0,1],"t18":20,"h25":16,"h26":3,"ya":-13,"yp":-81.2,"sh":0.0},{"b":"MCLAREN","g":"OTH","s":[1,2,1,0,4,0,0,1,0,2,0,0,0,0,1,1,1,0],"t18":14,"h25":8,"h26":3,"ya":-5,"yp":-62.5,"sh":0.0},{"b":"FAW","g":"OTH","s":[3,3,2,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0],"t18":13,"h25":13,"h26":0,"ya":-13,"yp":-100.0,"sh":0.0},{"b":"HONGQI","g":"CN","s":[0,0,0,2,4,1,1,0,1,0,0,0,0,0,0,0,0,4],"t18":13,"h25":7,"h26":4,"ya":-3,"yp":-42.9,"sh":0.0},{"b":"MAN","g":"OTH","s":[0,1,2,0,1,0,1,0,0,2,0,0,1,0,0,0,0,5],"t18":13,"h25":4,"h26":6,"ya":2,"yp":50.0,"sh":0.0},{"b":"MORGAN","g":"OTH","s":[0,1,0,3,0,3,0,0,1,0,0,0,0,0,1,0,0,3],"t18":12,"h25":7,"h26":4,"ya":-3,"yp":-42.9,"sh":0.0},{"b":"EVO","g":"OTH","s":[0,0,0,0,0,0,0,0,1,1,1,0,4,1,0,1,0,2],"t18":11,"h25":0,"h26":8,"ya":8,"yp":null,"sh":0.0},{"b":"LUCID","g":"CN","s":[0,0,1,1,0,3,0,0,0,0,0,0,0,1,0,0,2,2],"t18":10,"h25":5,"h26":5,"ya":0,"yp":0.0,"sh":0.0},{"b":"INEOS","g":"OTH","s":[0,0,0,0,2,2,0,1,0,1,0,0,1,1,0,0,0,1],"t18":9,"h25":4,"h26":3,"ya":-1,"yp":-25.0,"sh":0.0},{"b":"GEELY","g":"CN","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8],"t18":8,"h25":0,"h26":8,"ya":8,"yp":null,"sh":0.0},{"b":"VOYAH","g":"CN","s":[0,2,0,0,0,0,1,0,0,1,0,0,0,0,2,1,1,0],"t18":8,"h25":2,"h26":4,"ya":2,"yp":100.0,"sh":0.0},{"b":"API","g":"OTH","s":[0,0,0,1,3,1,0,0,1,0,0,0,0,0,1,0,0,0],"t18":7,"h25":5,"h26":1,"ya":-4,"yp":-80.0,"sh":0.0},{"b":"CHEVROLET","g":"OTH","s":[0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,3,2],"t18":7,"h25":0,"h26":5,"ya":5,"yp":null,"sh":0.0},{"b":"TIGER","g":"CN","s":[0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,2,0,1],"t18":6,"h25":0,"h26":4,"ya":4,"yp":null,"sh":0.0},{"b":"SKYWORTH","g":"CN","s":[0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,1,2],"t18":5,"h25":0,"h26":4,"ya":4,"yp":null,"sh":0.0},{"b":"SECMA","g":"OTH","s":[0,0,1,0,1,0,1,0,0,0,0,1,0,0,0,0,0,0],"t18":4,"h25":2,"h26":0,"ya":-2,"yp":-100.0,"sh":0.0},{"b":"TREMONIA","g":"OTH","s":[0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0],"t18":3,"h25":0,"h26":0,"ya":0,"yp":null,"sh":0.0},{"b":"FISKER","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0],"t18":2,"h25":0,"h26":1,"ya":1,"yp":null,"sh":0.0},{"b":"RIMAC","g":"OTH","s":[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],"t18":2,"h25":1,"h26":1,"ya":0,"yp":0.0,"sh":0.0},{"b":"BUGATTI","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],"t18":1,"h25":0,"h26":1,"ya":1,"yp":null,"sh":0.0},{"b":"DONKERVOORT","g":"OTH","s":[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":1,"h25":1,"h26":0,"ya":-1,"yp":-100.0,"sh":0.0},{"b":"GENESIS","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0],"t18":1,"h25":0,"h26":1,"ya":1,"yp":null,"sh":0.0},{"b":"KOENIGSEGG","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],"t18":1,"h25":0,"h26":1,"ya":1,"yp":null,"sh":0.0},{"b":"MOKE","g":"OTH","s":[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":1,"h25":1,"h26":0,"ya":-1,"yp":-100.0,"sh":0.0},{"b":"RUF","g":"OTH","s":[0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":1,"h25":1,"h26":0,"ya":-1,"yp":-100.0,"sh":0.0},{"b":"SERES","g":"CN","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],"t18":1,"h25":0,"h26":1,"ya":1,"yp":null,"sh":0.0},{"b":"AIWAYS","g":"CN","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":0,"h25":0,"h26":0,"ya":0,"yp":null,"sh":0.0},{"b":"JAC","g":"CN","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":0,"h25":0,"h26":0,"ya":0,"yp":null,"sh":0.0},{"b":"KTM","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":0,"h25":0,"h26":0,"ya":0,"yp":null,"sh":0.0},{"b":"ORA","g":"OTH","s":[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"t18":0,"h25":0,"h26":0,"ya":0,"yp":null,"sh":0.0}]};

// ===== De Content Studio · design tokens (light, acid-lime signature) =====
const T = {
  ink:"#FFFFFF",              // page + tooltip background
  panel:"#FBFBF8",           // near-white card
  panel2:"#F3F3EE",
  hair:"#E7E6DD",            // hairline
  text:"#0D0802",            // logo ink (near-black)
  muted:"#6E6E64",
  faint:"#A6A69B",
  accent:"#D6FD16",          // DCS lime — BACKGROUND / MARKER ONLY, never text
  accentSoft:"rgba(214,253,22,0.20)",
  onAccent:"#0D0802",        // ink text on lime
  pos:"#0E7A4F",             // groei (deep green, distinct from lime)
  neg:"#D2402E",             // krimp
  amber:"#B07D18",           // secundaire trigger
};
const GROUP = {
  CN:{c:"#C55A11", label:"Chinese uitdager"},
  DE:{c:"#2E4A7A", label:"Duitse premium"},
  EV:{c:"#0E8C8C", label:"EV-puur (westers)"},
  VOL:{c:"#6E7787", label:"Gevestigd volume"},
  OTH:{c:"#8A8A80", label:"Overig"},
};
const RADIUS=16;
const CARD={background:T.panel,border:`1px solid ${T.hair}`,borderRadius:RADIUS,
  boxShadow:"0 1px 2px rgba(13,8,2,.04)"};

const MONTHS_NL=["jan","feb","mrt","apr","mei","jun","jul","aug","sep","okt","nov","dec"];
const mlabel=(m)=>{const[y,mo]=m.split("-");return `${MONTHS_NL[+mo-1]} '${y.slice(2)}`;};
const fmt=(n)=> (n==null?"–":n.toLocaleString("nl-BE"));
const pct=(n)=> (n==null?"n.v.t.":`${n>0?"+":""}${n.toFixed(0)}%`);

// highlighter marker — the DCS signature (lower-half lime swipe behind text)
function Mark({children,style}){
  return <span style={{background:`linear-gradient(180deg,transparent 58%,${T.accent} 58%)`,
    padding:"0 .06em",boxDecorationBreak:"clone",WebkitBoxDecorationBreak:"clone",...style}}>{children}</span>;
}

const GLOBAL_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
*{box-sizing:border-box}
::-webkit-scrollbar{width:9px;height:9px}
::-webkit-scrollbar-thumb{background:#DBDAD0;border-radius:5px}
::-webkit-scrollbar-thumb:hover{background:#C7C6BB}
::selection{background:${T.accent};color:${T.text}}
input[type=range]{cursor:pointer;accent-color:${T.text}}
button{font-family:inherit}
*:focus-visible{outline:2px solid ${T.text};outline-offset:2px;border-radius:5px}
.card{transition:box-shadow .2s ease, border-color .2s ease, transform .2s ease}
.cardi{cursor:pointer}
.cardi:hover{box-shadow:0 8px 26px rgba(13,8,2,.09);border-color:#CFCEC3;transform:translateY(-1px)}
.rowh{transition:background .14s ease}
.rowh:hover{background:${T.accentSoft}}
.pill{transition:all .14s ease}
.pill:hover{border-color:${T.text}}
.tabbtn{transition:color .14s ease}
.brandtog{transition:all .12s ease}
.brandtog:hover{border-color:${T.text}}
@media (max-width:680px){
  .wrap{padding:20px 16px !important}
  .mhead{font-size:40px !important}
  .dgrid{grid-template-columns:1fr !important}
  .kpi{flex:1 1 100% !important}
}
`;


// ===================== QUALITATIVE INSIGHTS (bron: Ads & Data Automotive input) =====================
const INSIGHTS = {
  FORD:{imp:"Ford",news:"Ford Pro mikt op zelfstandigen: elektrische bestelwagen Transit City (eind 2026)."},
  CITROEN:{imp:"Stellantis",news:"Betaalbare Berlingo Van FIRST en de ë-C5 Aircross."},
  DS:{imp:"Stellantis",news:"DS N°4 (nu ook elektrisch) en nieuwe SUV DS N°7."},
  OPEL:{imp:"Stellantis",news:"Corsa GSE, facelift Astra, goedkopere bestelwagen Combo START."},
  FIAT:{imp:"Stellantis",news:"Grizzly & Grizzly Fastback (H2 2026); goedkopere Doblò EasyPRO."},
  PEUGEOT:{imp:"Stellantis",news:"Elektrische E-208 GTi te bestellen; goedkopere Partner ACTIVE."},
  LEAPMOTOR:{imp:"Stellantis",news:"Chinees merk via Stellantis-dealers. EV-golf: B05, B03X, fleet-SUV B10. Betaalbaar, ook range extender."},
  JEEP:{imp:"Stellantis",news:"Nieuwe Compass (compacte SUV, ook elektrisch)."},
  LANCIA:{imp:"Stellantis",news:"Nieuwe Gamma (compacte SUV, hybride/EV); goedkopere benzine-Ypsilon."},
  "ALFA ROMEO":{imp:"Stellantis",news:"Voorlopig weinig nieuws."},
  HYUNDAI:{imp:"Astara",news:"EV-offensief: IONIQ 3, sportieve IONIQ 6 N, grote IONIQ 9, waterstof NEXO."},
  SUZUKI:{imp:"Astara",news:"Eerste EV e VITARA; plug-in SUV Across (eind 2026)."},
  "KG MOBILITY":{imp:"Astara",news:"Ex-SsangYong: Actyon Hybrid, elektrische pick-up Musso EV."},
  MAXUS:{imp:"Astara",news:"Vooral elektrische bestelwagens; geen lanceringen nu."},
  MG:{imp:"eigen invoer (vanaf 1/7)",news:"Verlaat Astara — constructeur neemt zelf over. EV-stadswagen MG4 Urban, EV-SUV MGS6.",flag:"Neemt eigen import over → doorgaans marketingversnelling."},
  KIA:{imp:"Kia",news:"Betaalbare EV-SUV EV2, EV4/K4, EV5. Betreedt bedrijfsvoertuigen met EV-bestelwagen PV5."},
  RENAULT:{imp:"Renault",news:"Nieuwe Twingo E-Tech (scherp geprijsd voor particulier); sterkere batterij Megane E-Tech."},
  DACIA:{imp:"Renault",news:"Sterk bij particulieren en in Wallonië, 7e plaats (net na Renault). Nieuwe EV-stadswagen op Twingo-basis komt."},
  NISSAN:{imp:"Nissan",news:"Nieuwe Micra en Leaf; Juke en EV-stadswagen (Twingo-basis) in 2027."},
  VOLKSWAGEN:{imp:"D'Ieteren",news:"Cruciaal: elektrische ID. Polo vanaf september, later GTI + ID. Cross. ID.3 wordt ID.3 Neo; vernieuwde ID.4 begin 2027."},
  AUDI:{imp:"D'Ieteren",news:"A2 e-tron als EV-instapper dit jaar; nieuwe Q7 en A6 allroad; facelift A3."},
  SEAT:{imp:"D'Ieteren",news:"Facelift Ibiza en Arona."},
  CUPRA:{imp:"D'Ieteren",news:"Elektrische stadswagen Raval."},
  SKODA:{imp:"D'Ieteren",news:"EV-instapper Epiq; elektrische 7-zit SUV Peaq."},
  VOLVO:{imp:"Volvo",news:"Belangrijke EX60 (EV-SUV) dit jaar; update EX30; berline ES90 gelanceerd. 2027: 100 jaar Volvo."},
  BMW:{imp:"BMW",news:"Marktleider. Cruciale EV i3 dit jaar (sedan, later break); elektrische M3; instap-iX3; nieuwe X5 begin 2027."},
  MINI:{imp:"BMW",news:"Modieuze Paul Smith-editions van diverse modellen."},
  POLESTAR:{imp:"Polestar",news:"Polestar 5 (EV-GT) gelanceerd; breakversie Polestar 4; nieuwe Polestar 2 in 2027. Dealernet breidt uit."},
  MERCEDES:{imp:"Mercedes-Benz",news:"Nieuwe CLA (+ Shooting Brake), GLB, elektrische GLC; luxe EV-minivan VLE dit jaar; facelift S-Klasse; nieuwe GLA begin 2027."},
  TOYOTA:{imp:"Inchcape",news:"Veel nieuw: RAV4, bZ4X Touring, Hilux, C-HR+, elektrische Urban Cruiser."},
  LEXUS:{imp:"Inchcape",news:"Elektrische luxesedan ES; 6-zit EV-SUV TZ in 2027."},
  BYD:{imp:"eigen invoer (binnenkort)",news:"Verlaat Inchcape, start zelf. ATTO 3 Evo; luxemerk DENZA vanaf de zomer, naast BYD als mainstream.",flag:"Neemt eigen import over → doorgaans marketingversnelling."},
  MAZDA:{imp:"Mazda",news:"EV voor fleet: berline 6e en SUV CX-6e."},
  XPENG:{imp:"Hedin Automotive",news:"Chinese EV via Hedin; verkoop loopt goed."},
  NIO:{imp:"Hedin Automotive",news:"Ingevoerd via Hedin Automotive."},
  HONGQI:{imp:"Hedin Automotive",news:"Ingevoerd via Hedin Automotive."},
  INEOS:{imp:"Hedin Automotive",news:"Ingevoerd via Hedin Automotive."},
};
const impOf =(b)=> INSIGHTS[b]?.imp || null;

const MARKET_CTX = [
  {k:"Fleet vs particulier",v:"57% / 43%",s:"bedrijven dalend, particulieren stijgend"},
  {k:"EV-aandeel markt H1-26",v:"36,1%",s:"benzine blijft grootst, diesel zakt weg"},
  {k:"Particuliere EV",v:">10%",s:"voor het eerst boven 10% van EV-verkoop"},
  {k:"Mobiliteitsbudget",v:"vanaf 2027",s:"verplicht ≥50 wn — risico fleet, gunstig kleine EV"},
  {k:"EV-aftrekbaarheid",v:"100% in 2026",s:"daalt nadien; brandstofmotor niet meer aftrekbaar"},
];


// ===================== UI atoms =====================
function Chip({active,onClick,children,color}){
  return (
    <button className="pill" onClick={onClick} style={{
      font:"600 12px 'IBM Plex Mono',monospace", letterSpacing:".01em",
      padding:"7px 12px", borderRadius:999, cursor:"pointer",
      border:`1px solid ${active?(color||T.text):T.hair}`,
      background: active?(color||T.accent):"transparent",
      color: active?T.onAccent:T.muted,
    }}>{children}</button>
  );
}
function Tab({active,onClick,n,children}){
  return (
    <button className="tabbtn" onClick={onClick} style={{
      display:"flex", alignItems:"baseline", gap:9, cursor:"pointer",
      background:"transparent", border:"none", padding:"2px 0 16px",
    }}>
      <span style={{font:"700 11px 'IBM Plex Mono',monospace", color:active?T.text:T.faint}}>{n}</span>
      <span style={{font:`600 15px 'Space Grotesk',sans-serif`, color:active?T.text:T.muted}}>
        {active? <Mark>{children}</Mark> : children}
      </span>
    </button>
  );
}
function Panel({children,style,className}){
  return <div className={`card ${className||""}`} style={{...CARD,...style}}>{children}</div>;
}

// ===================== TOOLTIPS =====================
const TIP={background:T.ink,border:`1px solid ${T.hair}`,borderRadius:12,
  padding:"11px 13px",boxShadow:"0 12px 34px rgba(13,8,2,.14)",
  font:"12px 'IBM Plex Mono',monospace",color:T.text};
function MatrixTip({active,payload}){
  if(!active||!payload||!payload.length) return null;
  const d=payload[0].payload;
  return (
    <div style={TIP}>
      <div style={{font:`700 14px 'Space Grotesk'`,marginBottom:7,color:T.text}}>
        <span style={{display:"inline-block",width:8,height:8,borderRadius:2,
          background:GROUP[d.g].c,marginRight:7}}/>{d.b}</div>
      <Row k="Volume H1-2026" v={fmt(d.h26)}/>
      <Row k="YoY H1 (vs '25)" v={pct(d.yp)} c={d.yp>=0?T.pos:T.neg}/>
      <Row k="Absoluut verschil" v={`${d.ya>0?"+":""}${fmt(d.ya)}`} c={d.ya>=0?T.pos:T.neg}/>
      <Row k="Marktaandeel H1-26" v={`${d.sh.toFixed(1)}%`}/>
      <div style={{marginTop:6,paddingTop:6,borderTop:`1px solid ${T.hair}`,
        color:T.muted,fontSize:11}}>{GROUP[d.g].label}{impOf(d.b)?` · ${impOf(d.b)}`:""}</div>
    </div>
  );
}
function Row({k,v,c}){
  return (<div style={{display:"flex",justifyContent:"space-between",gap:22,lineHeight:1.75}}>
    <span style={{color:T.muted}}>{k}</span><span style={{color:c||T.text,fontWeight:600}}>{v}</span></div>);
}
function LineTip({active,payload,label}){
  if(!active||!payload||!payload.length) return null;
  const rows=[...payload].sort((a,b)=>b.value-a.value);
  return (
    <div style={TIP}>
      <div style={{color:T.muted,marginBottom:6}}>{label}</div>
      {rows.map(r=>(
        <div key={r.name} style={{display:"flex",justifyContent:"space-between",gap:18,lineHeight:1.65}}>
          <span style={{color:r.color,fontWeight:600}}>{r.name}</span>
          <span style={{fontWeight:600}}>{fmt(r.value)}</span>
        </div>))}
    </div>
  );
}


// ===================== TAB 1: KANSENMATRIX =====================
function Matrix(){
  const [groups,setGroups]=useState({CN:true,DE:true,EV:true,VOL:true,OTH:false});
  const [minVol,setMinVol]=useState(300);
  const clampX=(v)=> Math.max(-60,Math.min(200,v));
  const pts=useMemo(()=>DATA.brands
    .filter(d=>d.yp!=null && d.h26>=minVol && groups[d.g])
    .map(d=>({...d, xPlot:clampX(d.yp)})),[groups,minVol]);
  const grouped=useMemo(()=>{
    const g={}; pts.forEach(p=>{(g[p.g]=g[p.g]||[]).push(p);}); return g;
  },[pts]);
  return (
    <div>
      <p style={{font:"14px/1.6 Inter,sans-serif",color:T.muted,maxWidth:680,margin:"0 0 18px"}}>
        Elke bel is een merk. <b style={{color:T.text}}>Rechts</b> = groeit tegenover H1&nbsp;2025,
        <b style={{color:T.text}}> links</b> = krimpt. <b style={{color:T.text}}>Hoger</b> = meer volume.
        De zoete zone voor sales zit <b style={{color:T.amber}}>rechtsboven</b>: groot én groeiend.
        Belgrootte = volume H1&nbsp;2026. De <b style={{color:T.neg}}>rode zone linksboven</b> — groot maar krimpend — is je verdedigingslijst.
      </p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",marginBottom:14}}>
        {Object.entries(GROUP).map(([k,v])=>(
          <Chip key={k} active={groups[k]} color={v.c}
            onClick={()=>setGroups(s=>({...s,[k]:!s[k]}))}>{v.label}</Chip>))}
        <div style={{flex:1}}/>
        <label style={{font:"12px 'IBM Plex Mono'",color:T.muted,display:"flex",gap:9,alignItems:"center"}}>
          min. volume {minVol}
          <input type="range" min="0" max="3000" step="100" value={minVol}
            onChange={e=>setMinVol(+e.target.value)} style={{accentColor:T.accent,width:120}}/>
        </label>
      </div>
      <div className="card" style={{height:470,...CARD,padding:"14px 16px 6px"}}>
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{top:8,right:22,bottom:26,left:6}}>
            <CartesianGrid stroke={T.hair} strokeDasharray="2 4"/>
            <ReferenceArea x1={-60} x2={0} y1={2500} y2={26000} fill={T.neg} fillOpacity={0.07}
              label={{value:"VERDEDIGINGSZONE",fill:T.neg,fontSize:10,fontFamily:"IBM Plex Mono",position:"insideTopLeft",opacity:0.75}}/>
            <XAxis type="number" dataKey="xPlot" domain={[-60,200]} ticks={[-50,0,50,100,150,200]}
              tickFormatter={v=>`${v>0?"+":""}${v}%`}
              tick={{fill:T.faint,fontSize:11,fontFamily:"IBM Plex Mono"}} stroke={T.hair}
              label={{value:"MOMENTUM  ·  YoY H1 groei",position:"bottom",offset:6,fill:T.muted,fontSize:11,fontFamily:"IBM Plex Mono",letterSpacing:"0.08em"}}/>
            <YAxis type="number" dataKey="h26" scale="log" domain={["auto","auto"]} allowDataOverflow
              tickFormatter={v=>v>=1000?`${v/1000}k`:v}
              tick={{fill:T.faint,fontSize:11,fontFamily:"IBM Plex Mono"}} stroke={T.hair}
              label={{value:"VOLUME H1-26",angle:-90,position:"insideLeft",offset:16,fill:T.muted,fontSize:11,fontFamily:"IBM Plex Mono",letterSpacing:"0.08em"}}/>
            <ZAxis type="number" dataKey="h26" range={[40,900]}/>
            <ReferenceLine x={0} stroke={T.muted} strokeWidth={1.4}/>
            <ReferenceLine x={-1.7} stroke={T.faint} strokeDasharray="5 5"
              label={{value:"markt −1,7%",fill:T.faint,fontSize:10,position:"insideTopLeft",fontFamily:"IBM Plex Mono"}}/>
            <Tooltip content={<MatrixTip/>} cursor={{stroke:T.hair}}/>
            {Object.entries(grouped).map(([g,arr])=>(
              <Scatter key={g} data={arr} fill={GROUP[g].c} fillOpacity={0.7}
                stroke={GROUP[g].c} strokeOpacity={0.9}/>
            ))}
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <p style={{font:"11px 'IBM Plex Mono'",color:T.faint,marginTop:9}}>
        Y-as is logaritmisch (anders verdwijnen de kleine merken). Groei &gt;+200% is afgekapt op de rand — echte waarde in de tooltip.
      </p>
    </div>
  );
}


// ===================== TAB 2: RANGLIJST =====================
function Ranglijst(){
  const METRICS={
    ya:{label:"Absolute groei (H1 YoY)", get:d=>d.ya, fmt:d=>`${d.ya>0?"+":""}${fmt(d.ya)}`},
    yp:{label:"Procentuele groei (H1 YoY)", get:d=>d.yp, fmt:d=>pct(d.yp), floor:400},
    t18:{label:"Volume 18 mnd", get:d=>d.t18, fmt:d=>fmt(d.t18), signed:false},
  };
  const [mk,setMk]=useState("ya");
  const [q,setQ]=useState("");
  const M=METRICS[mk];
  const rows=useMemo(()=>{
    let a=DATA.brands.filter(d=>M.get(d)!=null);
    if(M.floor) a=a.filter(d=>d.h26>=M.floor);
    if(q) a=a.filter(d=>d.b.toLowerCase().includes(q.toLowerCase()));
    a=[...a].sort((x,y)=>M.get(y)-M.get(x));
    return a;
  },[mk,q]);
  const signed = mk!=="t18";
  const maxAbs=Math.max(...rows.map(r=>Math.abs(M.get(r))),1);
  const top=rows.slice(0,26);
  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center",marginBottom:16}}>
        {Object.entries(METRICS).map(([k,v])=>(
          <Chip key={k} active={mk===k} onClick={()=>setMk(k)}>{v.label}</Chip>))}
        <div style={{flex:1}}/>
        <input placeholder="zoek merk…" value={q} onChange={e=>setQ(e.target.value)}
          style={{font:"12px 'IBM Plex Mono'",background:T.panel,border:`1px solid ${T.hair}`,
          color:T.text,borderRadius:8,padding:"7px 11px",outline:"none",width:150}}/>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:3}}>
        {top.map((d,i)=>{
          const val=M.get(d); const w=Math.abs(val)/maxAbs*100;
          const positive= signed? val>=0 : true;
          const col= !signed? GROUP[d.g].c : (positive?T.pos:T.neg);
          return (
            <div key={d.b} className="rowh" style={{display:"grid",gridTemplateColumns:"26px 130px 1fr 96px",
              alignItems:"center",gap:12,padding:"6px 8px",borderRadius:8}}>
              <span style={{font:"11px 'IBM Plex Mono'",color:T.faint,textAlign:"right"}}>{i+1}</span>
              <span style={{font:`600 13px 'Space Grotesk'`,color:T.text,whiteSpace:"nowrap",
                overflow:"hidden",textOverflow:"ellipsis"}}>
                <span style={{display:"inline-block",width:7,height:7,borderRadius:2,background:GROUP[d.g].c,marginRight:7}}/>
                {d.b}</span>
              <div style={{height:16,position:"relative",background:"rgba(0,0,0,.05)",borderRadius:3}}>
                <div style={{position:"absolute",top:0,bottom:0,left:0,width:`${w}%`,
                  background:col,opacity:.85,borderRadius:3,transition:"width .3s"}}/>
              </div>
              <span style={{font:"600 13px 'IBM Plex Mono'",color:col,textAlign:"right"}}>{M.fmt(d)}</span>
            </div>
          );
        })}
      </div>
      {mk==="yp" && <p style={{font:"11px 'IBM Plex Mono'",color:T.faint,marginTop:12}}>
        Enkel merken met ≥400 stuks in H1-2026, zodat een sprong van 3→30 stuks de lijst niet vertekent.
      </p>}
    </div>
  );
}


// ===================== TAB 3: VERKENNER =====================
const PALETTE=["#C55A11","#2E4A7A","#1E7F5C","#C0392B","#7A4FB0","#0E8C8C","#8A7A12","#B0447F"];
const PRESETS={
  "Chinese opmars":["MG","BYD","LEAPMOTOR","JAECOO","OMODA","XPENG"],
  "Duitse premium":["BMW","MERCEDES","AUDI","PORSCHE"],
  "Grootste dalers":["DACIA","VOLKSWAGEN","TOYOTA","NISSAN"],
  "EV & Tesla":["TESLA","POLESTAR","BYD","LEAPMOTOR"],
};
function Verkenner(){
  const all=useMemo(()=>[...DATA.brands].sort((a,b)=>b.t18-a.t18),[]);
  const [sel,setSel]=useState(PRESETS["Chinese opmars"]);
  const [q,setQ]=useState("");
  const toggle=(b)=>setSel(s=>s.includes(b)?s.filter(x=>x!==b):(s.length>=8?s:[...s,b]));
  const chartData=useMemo(()=>DATA.months.map((m,i)=>{
    const row={m:mlabel(m)};
    sel.forEach(b=>{const d=DATA.brands.find(x=>x.b===b); if(d) row[b]=d.s[i];});
    return row;
  }),[sel]);
  const colorOf=(b)=>PALETTE[sel.indexOf(b)%PALETTE.length];
  const list=all.filter(d=>!q||d.b.toLowerCase().includes(q.toLowerCase()));
  return (
    <div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:14,alignItems:"center"}}>
        <span style={{font:"11px 'IBM Plex Mono'",color:T.faint,letterSpacing:".08em"}}>PRESETS</span>
        {Object.keys(PRESETS).map(k=>(
          <Chip key={k} active={false} onClick={()=>setSel(PRESETS[k])}>{k}</Chip>))}
      </div>
      <div className="card" style={{height:400,...CARD,padding:"16px 16px 4px",marginBottom:16}}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{top:6,right:16,bottom:4,left:0}}>
            <CartesianGrid stroke={T.hair} strokeDasharray="2 4" vertical={false}/>
            <XAxis dataKey="m" tick={{fill:T.faint,fontSize:10,fontFamily:"IBM Plex Mono"}}
              stroke={T.hair} interval={1}/>
            <YAxis tick={{fill:T.faint,fontSize:11,fontFamily:"IBM Plex Mono"}} stroke={T.hair}
              tickFormatter={v=>v>=1000?`${(v/1000).toFixed(0)}k`:v}/>
            <Tooltip content={<LineTip/>}/>
            {sel.map(b=>(
              <Line key={b} type="monotone" dataKey={b} stroke={colorOf(b)} strokeWidth={2.2}
                dot={false} activeDot={{r:4}}/>
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:10,flexWrap:"wrap"}}>
        <span style={{font:"12px 'Space Grotesk'",color:T.muted}}>Merken kiezen (max 8):</span>
        <input placeholder="zoek…" value={q} onChange={e=>setQ(e.target.value)}
          style={{font:"12px 'IBM Plex Mono'",background:T.panel,border:`1px solid ${T.hair}`,
          color:T.text,borderRadius:8,padding:"6px 10px",outline:"none",width:130}}/>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,maxHeight:132,overflowY:"auto",
        padding:"2px",border:`1px solid ${T.hair}`,borderRadius:10,background:"#FAFAF7"}}>
        {list.map(d=>{
          const on=sel.includes(d.b);
          return (
            <button key={d.b} className="brandtog" onClick={()=>toggle(d.b)} style={{
              font:"11px 'IBM Plex Mono'",padding:"5px 9px",borderRadius:7,cursor:"pointer",
              border:`1px solid ${on?colorOf(d.b):T.hair}`,
              background:on?colorOf(d.b):"transparent", color:on?T.onAccent:T.muted,fontWeight:on?700:400}}>
              {d.b}
            </button>);
        })}
      </div>
    </div>
  );
}


// ===================== TAB 4: VERDEDIGERS =====================
function Verdedigers(){
  const [floor,setFloor]=useState(1500);
  const scored=useMemo(()=>{
    const s=DATA.brands
      .filter(d=>d.yp!=null && d.yp<0 && d.h26>=floor)
      .map(d=>({...d, raw:d.h26*(-d.yp)}));
    const max=Math.max(...s.map(x=>x.raw),1);
    return s.map(x=>({...x, idx:Math.round(x.raw/max*100)}))
            .sort((a,b)=>b.idx-a.idx);
  },[floor]);
  const top=scored[0];
  return (
    <div>
      <div style={{display:"flex",gap:20,flexWrap:"wrap",marginBottom:20}}>
        <p style={{font:"14px/1.65 Inter,sans-serif",color:T.muted,flex:"1 1 440px",maxWidth:640,margin:0}}>
          Een merk dat volume verliest maar groot blijft, heeft twee dingen tegelijk: een probleem én een budget.
          Binet &amp; Field: wie aandeel wil terugwinnen, moet zijn share of voice bóven zijn share of market tillen —
          en dat kost mediageld. Deze merken staan dus onder druk om in zichtbaarheid te investeren.
          Voor sales zijn dit de warmste gesprekken: <b style={{color:T.text}}>het motief is er, het budget ook</b>.
        </p>
        <div style={{flex:"0 0 auto",background:T.panel,border:`1px solid ${T.hair}`,borderRadius:12,
          padding:"14px 18px",minWidth:170}}>
          <div style={{font:"11px 'IBM Plex Mono'",color:T.faint,letterSpacing:".06em",marginBottom:7}}>TOP-PRIORITEIT</div>
          <div style={{font:`700 22px 'Space Grotesk'`,color:T.neg}}>{top?top.b:"–"}</div>
          <div style={{font:"11px 'IBM Plex Mono'",color:T.muted,marginTop:6}}>
            {top?`${fmt(top.h26)} stuks · ${pct(top.yp)} YoY`:""}</div>
        </div>
      </div>

      <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12,flexWrap:"wrap"}}>
        <span style={{font:`600 15px 'Space Grotesk'`,color:T.text}}>Verdedigingsindex</span>
        <span style={{font:"12px 'IBM Plex Mono'",color:T.faint}}>= schaal (budget) × krimp (motief), 0–100</span>
        <div style={{flex:1}}/>
        <label style={{font:"12px 'IBM Plex Mono'",color:T.muted,display:"flex",gap:9,alignItems:"center"}}>
          min. volume {fmt(floor)}
          <input type="range" min="300" max="8000" step="100" value={floor}
            onChange={e=>setFloor(+e.target.value)} style={{accentColor:T.neg,width:130}}/>
        </label>
      </div>

      {/* column header */}
      <div style={{display:"grid",gridTemplateColumns:"26px 130px 1fr 84px 70px",gap:12,
        padding:"0 0 8px",borderBottom:`1px solid ${T.hair}`,
        font:"10px 'IBM Plex Mono'",color:T.faint,letterSpacing:".05em"}}>
        <span style={{textAlign:"right"}}>#</span><span>MERK</span>
        <span>VERDEDIGINGSINDEX</span>
        <span style={{textAlign:"right"}}>VOLUME</span><span style={{textAlign:"right"}}>YoY</span>
      </div>

      <div style={{display:"flex",flexDirection:"column",marginTop:4}}>
        {scored.slice(0,20).map((d,i)=>(
          <div key={d.b} className="rowh" style={{display:"grid",gridTemplateColumns:"26px 130px 1fr 84px 70px",
            gap:12,alignItems:"center",padding:"7px 8px",borderRadius:8}}>
            <span style={{font:"11px 'IBM Plex Mono'",color:T.faint,textAlign:"right"}}>{i+1}</span>
            <span style={{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
              <span style={{font:`600 13px 'Space Grotesk'`,color:T.text}}>
                <span style={{display:"inline-block",width:7,height:7,borderRadius:2,
                  background:GROUP[d.g].c,marginRight:7}}/>{d.b}</span>
              {impOf(d.b) && <span style={{display:"block",font:"9px 'IBM Plex Mono'",color:T.faint,
                marginLeft:14,marginTop:1}}>{impOf(d.b)}</span>}
            </span>
            <div style={{display:"flex",alignItems:"center",gap:9}}>
              <div style={{flex:1,height:16,background:"rgba(0,0,0,.05)",borderRadius:3,position:"relative"}}>
                <div style={{position:"absolute",inset:"0 auto 0 0",width:`${d.idx}%`,
                  background:`linear-gradient(90deg,${T.neg}22,${T.neg})`,borderRadius:3}}/>
              </div>
              <span style={{font:"600 12px 'IBM Plex Mono'",color:T.neg,width:26,textAlign:"right"}}>{d.idx}</span>
            </div>
            <span style={{font:"13px 'IBM Plex Mono'",color:T.text,textAlign:"right"}}>{fmt(d.h26)}</span>
            <span style={{font:"600 12px 'IBM Plex Mono'",color:T.neg,textAlign:"right"}}>{pct(d.yp)}</span>
          </div>
        ))}
      </div>
      <p style={{font:"11px/1.6 'IBM Plex Mono'",color:T.faint,marginTop:14,maxWidth:660}}>
        De schuif zet de ondergrens voor "groot". Kleinere merken die krimpen (bv. Land Rover, Porsche) verschijnen
        pas als je de drempel verlaagt — ze hébben minder verdedigingsbudget. Index is relatief: 100 = het merk onder de meeste druk.
      </p>
    </div>
  );
}


// ===================== TAB 5: MERKDOSSIERS =====================
function Spark({series}){
  const w=180,h=40,pad=3;
  const max=Math.max(...series),min=Math.min(...series);
  const rng=(max-min)||1;
  const pts=series.map((v,i)=>{
    const x=pad+i*(w-2*pad)/(series.length-1);
    const y=h-pad-((v-min)/rng)*(h-2*pad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  const up=series[series.length-1]>=series[0];
  const col=up?T.pos:T.neg;
  return (
    <svg width={w} height={h} style={{display:"block"}}>
      <polyline points={pts} fill="none" stroke={col} strokeWidth="2"
        strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}
function Stat({k,v,c}){
  return (<div style={{minWidth:96}}>
    <div style={{font:"10px 'IBM Plex Mono'",color:T.faint,letterSpacing:".05em",marginBottom:4}}>{k}</div>
    <div style={{font:`700 17px 'Space Grotesk'`,color:c||T.text}}>{v}</div>
  </div>);
}
function Merkdossiers(){
  const withInsight=useMemo(()=>DATA.brands
    .filter(d=>INSIGHTS[d.b]).sort((a,b)=>b.t18-a.t18),[]);
  const [sel,setSel]=useState("VOLKSWAGEN");
  const d=DATA.brands.find(x=>x.b===sel);
  const ins=INSIGHTS[sel]||{};
  return (
    <div>
      {/* market context strip */}
      <div style={{font:"11px 'IBM Plex Mono'",color:T.text,letterSpacing:".14em",marginBottom:10}}>
        MARKTCONTEXT H1-2026</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:10,marginBottom:24}}>
        {MARKET_CTX.map(c=>(
          <div key={c.k} className="card" style={{flex:"1 1 165px",minWidth:150,...CARD,padding:"13px 15px"}}>
            <div style={{font:"10px 'IBM Plex Mono'",color:T.faint,marginBottom:6,letterSpacing:".04em"}}>{c.k}</div>
            <div style={{font:`700 18px 'Space Grotesk'`,color:T.text,lineHeight:1}}>{c.v}</div>
            <div style={{font:"10px/1.4 'IBM Plex Mono'",color:T.muted,marginTop:6}}>{c.s}</div>
          </div>
        ))}
      </div>

      <div className="dgrid" style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:22,alignItems:"start"}}>
        {/* brand list */}
        <div style={{maxHeight:430,overflowY:"auto",border:`1px solid ${T.hair}`,borderRadius:10,
          background:"#FAFAF7",padding:5,display:"flex",flexDirection:"column",gap:2}}>
          {withInsight.map(b=>{
            const on=b.b===sel;
            return (
              <button key={b.b} className="brandtog" onClick={()=>setSel(b.b)} style={{
                display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,
                textAlign:"left",cursor:"pointer",border:"none",borderRadius:7,
                padding:"7px 10px",background:on?T.panel2:"transparent"}}>
                <span style={{font:`600 12px 'Space Grotesk'`,color:on?T.text:T.muted,
                  display:"flex",alignItems:"center",gap:7}}>
                  <span style={{width:6,height:6,borderRadius:2,background:GROUP[b.g].c}}/>{b.b}</span>
                <span style={{font:"10px 'IBM Plex Mono'",color:b.yp>=0?T.pos:T.neg}}>{pct(b.yp)}</span>
              </button>);
          })}
        </div>

        {/* dossier card */}
        <div className="card" style={{...CARD,padding:"22px 24px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
            <div>
              <h3 style={{font:`700 26px 'Space Grotesk'`,margin:"0 0 8px",color:T.text}}>{sel}</h3>
              <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                <span style={{font:"10px 'IBM Plex Mono'",color:T.onAccent,background:GROUP[d.g].c,
                  padding:"3px 8px",borderRadius:5}}>{GROUP[d.g].label}</span>
                {ins.imp && <span style={{font:"10px 'IBM Plex Mono'",color:T.muted,
                  border:`1px solid ${T.hair}`,padding:"3px 8px",borderRadius:5}}>importeur · {ins.imp}</span>}
              </div>
            </div>
            <Spark series={d.s}/>
          </div>

          <div style={{display:"flex",gap:26,flexWrap:"wrap",margin:"18px 0 16px",
            paddingTop:16,borderTop:`1px solid ${T.hair}`}}>
            <Stat k="VOLUME H1-26" v={fmt(d.h26)}/>
            <Stat k="YoY H1" v={pct(d.yp)} c={d.yp>=0?T.pos:T.neg}/>
            <Stat k="MARKTAANDEEL" v={`${d.sh.toFixed(1)}%`}/>
            <Stat k="18-MND TOTAAL" v={fmt(d.t18)}/>
          </div>

          {ins.flag && (
            <div style={{background:"rgba(228,169,74,.1)",border:`1px solid ${T.amber}55`,
              borderRadius:9,padding:"9px 12px",marginBottom:14,
              font:"12px 'IBM Plex Mono'",color:T.amber}}>⚑ {ins.flag}</div>
          )}

          <div style={{font:"11px 'IBM Plex Mono'",color:T.faint,letterSpacing:".08em",marginBottom:7}}>
            NIEUWS &amp; LANCERINGEN 2026</div>
          <p style={{font:"14px/1.65 Inter,sans-serif",color:T.text,margin:0}}>{ins.news}</p>
        </div>
      </div>
      <p style={{font:"11px/1.6 'IBM Plex Mono'",color:T.faint,marginTop:16,maxWidth:680}}>
        Duiding uit de Ads &amp; Data Automotive-briefing. Enkel merken met kwalitatieve input verschijnen in de lijst.
        Combineer met de matrix: een verdediger mét een grote EV-lancering (bv. Volkswagen ID. Polo) heeft dubbel motief om te investeren.
      </p>
    </div>
  );
}


// ===================== KPI + APP SHELL =====================
function Kpi({label,value,sub,color,hero}){
  return (
    <div className="card kpi" style={{flex:"1 1 160px",minWidth:150,...CARD,padding:"15px 17px",
      position:"relative",overflow:"hidden"}}>
      {hero && <div style={{position:"absolute",top:0,left:0,width:4,height:"100%",background:T.accent}}/>}
      <div style={{font:"11px 'IBM Plex Mono'",color:T.faint,letterSpacing:".05em",marginBottom:9}}>{label}</div>
      <div style={{font:`700 25px 'Space Grotesk'`,color:color||T.text,lineHeight:1,letterSpacing:"-.01em"}}>{value}</div>
      <div style={{font:"11px 'IBM Plex Mono'",color:T.muted,marginTop:7}}>{sub}</div>
    </div>
  );
}

export default function App(){
  const [tab,setTab]=useState(0);
  const mk=DATA.market;
  const mktYoY=(mk.h26-mk.h25)/mk.h25*100;
  const riser=[...DATA.brands].filter(d=>d.h26>=300).sort((a,b)=>b.ya-a.ya)[0];
  const faller=[...DATA.brands].filter(d=>d.h25>=300).sort((a,b)=>a.ya-b.ya)[0];
  const TABS=["Kansenmatrix","Momentum-ranglijst","Merk-verkenner","Verdedigers","Merkdossiers"];
  return (
    <div style={{background:T.ink,minHeight:"100vh",fontFamily:"Inter,sans-serif",color:T.text,
      WebkitFontSmoothing:"antialiased"}}>
      <style>{GLOBAL_CSS}</style>
      <div className="wrap" style={{maxWidth:1120,margin:"0 auto",padding:"clamp(22px,4vw,48px)"}}>

        {/* masthead */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",
          flexWrap:"wrap",gap:20,marginBottom:8}}>
          <div style={{maxWidth:560}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:18}}>
              <span style={{font:"800 13px 'Space Grotesk'",letterSpacing:"-.01em",color:T.text,
                background:T.accent,padding:"3px 7px",borderRadius:5}}>DCS</span>
              <span style={{font:"11px 'IBM Plex Mono'",color:T.muted,letterSpacing:".2em"}}>
                MARKTINTELLIGENTIE</span>
            </div>
            <h1 className="mhead" style={{font:`700 clamp(40px,6.5vw,66px) 'Space Grotesk'`,margin:0,
              lineHeight:0.95,letterSpacing:"-0.025em",color:T.text}}>
              Kansen<Mark>radar</Mark></h1>
            <p style={{font:"16px/1.55 Inter,sans-serif",color:T.muted,margin:"16px 0 0",maxWidth:460}}>
              Waar beweegt de Belgische automarkt — en waar liggen de commerciële openingen voor sales.
            </p>
          </div>
          <div style={{font:"11px/1.9 'IBM Plex Mono'",color:T.faint,textAlign:"right"}}>
            <div style={{color:T.text,fontWeight:600,marginBottom:2}}>FEBIAC-inschrijvingen</div>
            jan 2025 → jun 2026<br/>18 maanden · per merk
          </div>
        </div>
        <div style={{height:1,background:T.hair,margin:"26px 0 22px"}}/>

        {/* KPIs */}
        <div style={{display:"flex",flexWrap:"wrap",gap:12,marginBottom:28}}>
          <Kpi hero label="MARKT H1-2026" value={fmt(mk.h26)} color={T.text}
            sub={`${mktYoY>0?"+":""}${mktYoY.toFixed(1)}% vs H1-2025`}/>
          <Kpi label="GROOTSTE STIJGER" value={riser.b} color={T.pos}
            sub={`+${fmt(riser.ya)} · ${pct(riser.yp)} YoY H1`}/>
          <Kpi label="GROOTSTE DALER" value={faller.b} color={T.neg}
            sub={`${fmt(faller.ya)} · ${pct(faller.yp)} YoY H1`}/>
          <Kpi label="MERKEN GEVOLGD" value={DATA.brands.length} color={T.text}
            sub="incl. nieuwkomers"/>
        </div>

        {/* tabs */}
        <div style={{display:"flex",gap:"clamp(16px,3vw,30px)",borderBottom:`1px solid ${T.hair}`,
          marginBottom:26,flexWrap:"wrap"}}>
          {TABS.map((label,i)=>(
            <Tab key={i} n={`0${i+1}`} active={tab===i} onClick={()=>setTab(i)}>{label}</Tab>
          ))}
        </div>

        {tab===0 && <Matrix/>}
        {tab===1 && <Ranglijst/>}
        {tab===2 && <Verkenner/>}
        {tab===3 && <Verdedigers/>}
        {tab===4 && <Merkdossiers/>}

        {/* footer */}
        <div style={{marginTop:38,paddingTop:18,borderTop:`1px solid ${T.hair}`,
          display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
          <span style={{font:"11px 'IBM Plex Mono'",color:T.faint,maxWidth:640,lineHeight:1.65}}>
            Bron: FEBIAC — inschrijvingen nieuwe personenwagens per merk. <b style={{color:T.muted}}>Let op:</b> dit
            is merkniveau, geen modelniveau. "H1" = januari–juni, dus H1-2025 vs H1-2026 is een zuivere gelijke-periodevergelijking.
          </span>
          <span style={{font:"11px 'IBM Plex Mono'",color:T.faint}}>18 mnd · gevalideerd op maandtotalen</span>
        </div>
      </div>
    </div>
  );
}

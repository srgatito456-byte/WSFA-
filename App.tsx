import { useState } from "react";

// Estos componentes se asumen existentes en tu proyecto
import { MultimediaSection } from "./Multimedia";
import { NoticiasSection } from "./Noticias";
import { Honduras2026Section } from "./Honduras2026";

// ESTRUCTURA: [Nombre, Confed, Puntos, ISO, Marcador, Rival_ISO]
const rawTeams: [string, string, number, string | null, string, string | null][] = [
  ["ESPAÑA", "UEFA", 2245, "es", "3 - 0", "us"],
  ["IRAK", "AFC", 2040, "iq", "1 - 1", "cr"],
  ["MARRUECOS", "CAF", 1990, "ma", "1 - 1", "se"],
  ["EGIPTO", "CAF", 1975, "eg", "0 - 1", "ve"],
  ["JAPÓN", "AFC", 1950, "jp", "2 - 0", "co"],
  ["MÉXICO", "CONCACAF", 1920, "mx", "4 - 1", "jm"],
  ["SENEGAL", "CAF", 1910, "sn", "2 - 0", "tr"],
  ["EE. UU.", "CONCACAF", 1890, "us", "0 - 3", "es"],
  ["ARGENTINA", "CONMEBOL", 1860, "ar", "1 - 0", "pt"],
  ["COREA DEL SUR", "AFC", 1855, "kr", "1 - 0", "yo"],
  ["CANADÁ", "CONCACAF", 1840, "ca", "1 - 1", "ve"],
  ["CHILE", "CONMEBOL", 1830, "cl", "1 - 1", "ve"],
  ["COSTA DE MARFIL", "CAF", 1810, "ci", "2 - 0", "uy"],
  ["AUSTRALIA", "AFC", 1805, "au", "1 - 1", "mx"],
  ["NIGERIA", "CAF", 1795, "ng", "4 - 2", "pl"],
  ["URUGUAY", "CONMEBOL", 1790, "uy", "0 - 7", "ps"],
  ["HOLANDA", "UEFA", 1785, "nl", "0 - 6", "jm"],
  ["PANAMÁ", "CONCACAF", 1780, "pa", "2 - 0", "jm"],
  ["FRANCIA", "UEFA", 1775, "fr", "0 - 1", "kr"],
  ["INGLATERRA", "UEFA", 1770, "gb-eng", "0 - 1", "es"],
  ["ITALIA", "UEFA", 1765, "it", "1 - 4", "rs"],
  ["BÉLGICA", "UEFA", 1760, "be", "0 - 2", "za"],
  ["CROACIA", "UEFA", 1758, "hr", "13 - 0", "bj"],
  ["SERBIA", "UEFA", 1755, "rs", "12 - 0", "ni"],
  ["PORTUGAL", "UEFA", 1745, "pt", "0 - 1", "ar"],
  ["ARGELIA", "CAF", 1745, "dz", "0 - 9", "at"],
  ["UCRANIA", "UEFA", 1740, "ua", "1 - 4", "sy"],
  ["COLOMBIA", "CONMEBOL", 1725, "co", "0 - 15", "ws"],
  ["DINAMARCA", "UEFA", 1720, "dk", "13 - 0", "mn"],
  ["MALI", "CAF", 1690, "ml", "4 - 2", "mg"],
  ["REP. CHECA", "UEFA", 1685, "cz", "1 - 3", "gw"],
  ["RUMANIA", "UEFA", 1678, "ro", "7 - 0", "na"],
  ["BRASIL", "CONMEBOL", 1675, "br", "7 - 0", "ee"],
  ["SUIZA", "UEFA", 1665, "ch", "1 - 0", "pt"],
  ["TÚNEZ", "CAF", 1640, "tn", "1 - 0", "bh"],
  ["ESLOVAQUIA", "UEFA", 1630, "sk", "0 - 9", "np"],
  ["TURQUÍA", "UEFA", 1625, "tr", "0 - 5", "mz"],
  ["BURKINA FASO", "CAF", 1618, "bf", "4 - 0", "kp"],
  ["KAZAJISTÁN", "UEFA", 1590, "kz", "3 - 0", "qa"],
  ["CATAR", "AFC", 1580, "qa", "0 - 3", "kz"],
  ["BIAFRA", "CAF", 1578, null, "6 - 0", "pk"],
  ["IRÁN", "AFC", 1565, "ir", "0 - 2", "bf"],
  ["YORUBA", "CAF", 1555, null, "0 - 1", "kr"],
  ["PERÚ", "CONMEBOL", 1552, "pe", "5 - 0", "vc"],
  ["ARABIA SAUDITA", "AFC", 1548, "sa", "6 - 0", "as"],
  ["CAMERÚN", "CAF", 1535, "cm", "20 - 1", "pr"],
  ["MONTENEGRO", "UEFA", 1532, "me", "11 - 0", "so"],
  ["COREA DEL NORTE", "AFC", 1492, "kp", "0 - 4", "bf"],
  ["EAU", "AFC", 1482, "ae", "2 - 2", "fo"],
  ["KABYLIA", "CAF", 1468, null, "4 - 0", "by"],
  ["TAIWÁN", "AFC", 1450, "tw", "2 - 1", "vu"],
  ["ALEMANIA", "UEFA", 1450, "de", "4 - 0", "mr"],
  ["BARÉIN", "AFC", 1410, "bh", "0 - 1", "tn"],
  ["ABJASIA", "UEFA", 1390, null, "7 - 3", "ag"],
  ["TÍBET", "AFC", 1380, null, "2 - 1", "al"],
  ["MALTA", "UEFA", 1350, "mt", "3 - 0", "kn"],
  ["BUTÁN", "AFC", 1320, "bt", "3 - 1", "tl"],
  ["BARBADOS", "CONCACAF", 1310, "bb", "0 - 1", "kg"],
  ["PUERTO RICO", "CONCACAF", 1305, "pr", "1 - 20", "cm"],
  ["NUEVA ZELANDA", "OFC", 1235, "nz", "1 - 4", "ba"],
  ["MARTINICA", "CONCACAF", 1210, "mq", "3 - 0", "vi"],
  ["MAURICIO", "CAF", 1210, "mu", "2 - 1", "ky"],
  ["PARAGUAY", "CONMEBOL", 1190, "py", "5 - 0", "li"],
  ["ECUADOR", "CONMEBOL", 1185, "ec", "1 - 1", "il"],
  ["INDONESIA", "AFC", 1180, "id", "1 - 2", "mg"],
  ["LIECHTENSTEIN", "UEFA", 1150, "li", "0 - 5", "py"],
  ["ZAMBIA", "CAF", 1130, "zm", "0 - 3", "at"],
  ["CONGO", "CAF", 1095, "cg", "4 - 0", "hk"],
  ["G. ECUATORIAL", "CAF", 1080, "gq", "1 - 3", "sl"],
  ["NICARAGUA", "CONCACAF", 1050, "ni", "0 - 12", "rs"],
  ["ISLANDIA", "UEFA", 1040, "is", "2 - 3", "ly"],
  ["G. BISSAU", "CAF", 1010, "gw", "3 - 1", "cz"],
  ["KURDISTÁN", "AFC", 1010, null, "8 - 0", "gd"],
  ["SUDÁFRICA", "CAF", 980, "za", "2 - 0", "be"],
  ["SUECIA", "UEFA", 970, "se", "1 - 1", "ma"],
  ["PALESTINA", "AFC", 965, "ps", "7 - 0", "uy"],
  ["SURINAM", "CONCACAF", 960, "sr", "8 - 0", "nu"],
  ["GROENLANDIA", "CONCACAF", 955, "gl", "13 - 0", "gp"],
  ["MONTSERRAT", "CONCACAF", 940, "ms", "5 - 0", "ls"],
  ["VIETNAM", "AFC", 925, "vn", "0 - 0", null],
  ["BOLIVIA", "CONMEBOL", 920, "bo", "0 - 0", null],
  ["UZBEKISTÁN", "AFC", 910, "uz", "0 - 0", null],
  ["ZANZÍBAR", "CAF", 850, null, "0 - 0", null],
  ["PALAOS", "OFC", 880, "pw", "0 - 0", null],
  ["HAWÁI", "OFC", 840, "us-hi", "0 - 0", null],
  ["LUXEMBURGO", "UEFA", 835, "lu", "1 - 6", "ss"],
  ["TAMIL EELAM", "AFC", 820, null, "0 - 0", null],
  ["CHIPRE", "UEFA", 815, "cy", "0 - 0", null],
  ["CATALUÑA", "UEFA", 810, "es-ct", "0 - 0", null],
  ["MACEDONIA DEL NORTE", "UEFA", 805, "mk", "0 - 0", null],
  ["VENEZUELA", "CONMEBOL", 795, "ve", "1 - 1", "ca"],
  ["SAN MARINO", "UEFA", 775, "sm", "0 - 0", null],
  ["GUADALUPE", "CONCACAF", 765, "gp", "0 - 13", "gl"],
  ["PADANIA", "UEFA", 760, null, "0 - 0", null],
  ["SOMALILANDIA", "CAF", 730, null, "0 - 0", null],
  ["FIJI", "OFC", 695, "fj", "0 - 0", null],
  ["GIBRALTAR", "UEFA", 680, "gi", "0 - 0", null],
  ["COREANOS EN JAPÓN", "AFC", 680, null, "0 - 0", null],
  ["ANGUILA", "CONCACAF", 650, "ai", "0 - 0", null],
  ["ESTONIA", "UEFA", 640, "ee", "0 - 7", "br"],
  ["TAHITÍ", "OFC", 640, "pf", "0 - 0", null],
  ["GUAM", "AFC", 625, "gu", "0 - 0", null],
  ["DOMINICA", "CONCACAF", 610, "dm", "0 - 0", null],
  ["ANDORRA", "UEFA", 580, "ad", "0 - 0", null],
  ["LAPONIA", "UEFA", 565, null, "0 - 0", null],
  ["SAMOA AMERICANA", "OFC", 560, "as", "0 - 6", "sa"],
  ["MADAGASCAR", "CAF", 550, "mg", "2 - 1", "id"],
  ["SRI LANKA", "AFC", 540, "lk", "0 - 0", null],
  ["GRANADA", "CONCACAF", 530, "gd", "0 - 8", "ku"],
  ["ISLAS COOK", "OFC", 510, "ck", "0 - 0", null],
  ["CERDEÑA", "UEFA", 505, "it-88", "0 - 0", null],
  ["MALAUI", "CAF", 480, "mw", "0 - 0", null],
  ["ARMENIA OCCIDENTAL", "UEFA", 475, null, "0 - 0", null],
  ["ISLAS TURCAS Y CAICOS", "CONCACAF", 460, "tc", "0 - 0", null],
  ["SAHARA OCCIDENTAL", "CAF", 445, "eh", "0 - 0", null],
  ["NUEVA CALEDONIA", "OFC", 435, "nc", "0 - 0", null],
  ["VANUATU", "OFC", 430, "vu", "1 - 2", "tw"],
  ["NEPAL", "AFC", 415, "np", "9 - 0", "sk"],
  ["CORNUALLES", "UEFA", 390, "gb-con", "0 - 0", null],
  ["ISLAS CAIMÁN", "CONCACAF", 375, "ky", "1 - 2", "mu"],
  ["ISLAS RYUKYU", "AFC", 355, null, "0 - 0", null],
  ["SUDÁN DEL SUR", "CAF", 350, "ss", "6 - 1", "lu"],
  ["SAN VICENTE Y G.", "CONCACAF", 345, "vc", "0 - 5", "pe"],
  ["RAIETIA", "OFC", 320, null, "0 - 0", null],
  ["CASCADIA", "CONCACAF", 295, null, "0 - 0", null],
  ["ESUATINI", "CAF", 270, "sz", "0 - 0", null],
  ["BERMUDAS", "CONCACAF", 260, "bm", "0 - 0", null],
  ["KIRIBATI", "OFC", 250, "ki", "0 - 0", null],
  ["PAPÚA OCCIDENTAL", "AFC", 240, null, "0 - 0", null],
  ["ISLAS VIR. BRITÁNICAS", "CONCACAF", 240, "vg", "0 - 0", null],
  ["DARFUR", "CAF", 225, null, "0 - 0", null],
  ["TONGA", "OFC", 210, "to", "0 - 0", null],
  ["SINT MAARTEN", "CONCACAF", 195, "sx", "0 - 0", null],
  ["MICRONESIA", "OFC", 190, "fm", "0 - 0", null],
  ["CHAGOS", "OFC", 180, null, "0 - 0", null],
  ["MATABELELANDIA", "CAF", 180, null, "0 - 0", null],
  ["BRUNEI", "AFC", 170, "bn", "0 - 0", null],
  ["MÓNACO", "UEFA", 135, "mc", "0 - 0", null],
  ["SAN CRISTÓBAL Y NIEVES", "CONCACAF", 130, "kn", "0 - 3", "mt"],
  ["TUVALU", "OFC", 115, "tv", "0 - 0", null],
  ["PAPÚA NUEVA GUINEA", "OFC", 110, "pg", "0 - 0", null],
  ["ISLAS MARSHALL", "OFC", 110, "mh", "0 - 0", null],
  ["OCCITANIA", "UEFA", 110, null, "0 - 0", null],
  ["ELLAN VANNIN", "UEFA", 90, "im", "0 - 0", null],
  ["BARAWA", "CAF", 80, null, "0 - 0", null],
  ["SAMOA", "OFC", 75, "ws", "15 - 0", "co"],
  ["SABA", "CONCACAF", 70, "bq-sa", "0 - 0", null],
  ["ISLAS VÍRGENES USA", "CONCACAF", 65, "vi", "0 - 3", "mq"],
  ["ESCOCIA", "UEFA", 60, "gb-sct", "0 - 0", null],
  ["VATICANO", "UEFA", 31, "va", "0 - 0", null],
  ["CAMERIA", "UEFA", 31, null, "0 - 0", null],
  ["TRANSNISTRIA", "UEFA", 26, null, "0 - 0", null],
  ["PANJAB", "AFC", 23, null, "0 - 0", null],
  ["NORUEGA", "UEFA", 20, "no", "0 - 0", null],
  ["PUEBLO ARAMEO", "UEFA", 19, null, "0 - 0", null],
  ["YORKSHIRE", "UEFA", 18, "gb-yor", "0 - 0", null],
  ["ARTSAJ", "UEFA", 16, null, "0 - 0", null],
  ["MARIYA", "OFC", 15, null, "0 - 0", null],
  ["ERITREA", "CAF", 15, "er", "0 - 0", null],
  ["JERSEY", "UEFA", 14, "je", "0 - 0", null],
  ["PUEBLO GITANO", "CONMEBOL", 10, null, "0 - 0", null],
  ["NIUE", "OFC", 1, "nu", "0 - 8", "sr"],
  ["BIELORRUSIA", "UEFA", 1, "by", "0 - 4", "ka"],
  ["ISLAS FEROE", "UEFA", 0, "fo", "2 - 2", "ae"],
  ["BENÍN", "CAF", 0, "bj", "0 - 13", "hr"],
  ["NAMIBIA", "CAF", 0, "na", "0 - 7", "ro"],
  ["PAKISTÁN", "AFC", 0, "pk", "0 - 6", "ba"],
  ["SOMALIA", "CAF", 0, "so", "0 - 11", "me"],
  ["AFGANISTÁN", "AFC", 0, "af", "0 - 0", null],
  ["AIMARA", "CONMEBOL", 0, null, "0 - 0", null],
  ["ALBANIA", "UEFA", 0, "al", "1 - 2", "ti"],
  ["ALTA HUNGRÍA", "UEFA", 0, null, "0 - 0", null],
  ["AMBAZONIA", "CAF", 0, null, "0 - 0", null],
  ["ANGOLA", "CAF", 0, "ao", "0 - 0", null],
  ["ANTIGUA Y BARBUDA", "CONCACAF", 0, "ag", "3 - 7", "ab"],
  ["ARMENIA", "UEFA", 0, "am", "0 - 0", null],
  ["ARUBA", "CONCACAF", 0, "aw", "0 - 0", null],
  ["AUSTRIA", "UEFA", 0, "at", "9 - 0", "dz"],
  ["AZERBAIYÁN", "UEFA", 0, "az", "0 - 0", null],
  ["BAHAMAS", "CONCACAF", 0, "bs", "0 - 0", null],
  ["BANGLADESH", "AFC", 0, "bd", "0 - 0", null],
  ["BAROTSELANDIA", "CAF", 0, null, "0 - 0", null],
  ["BELICE", "CONCACAF", 0, "bz", "0 - 0", null],
  ["BOSNIA", "UEFA", 0, "ba", "4 - 1", "nz"],
  ["BOTSUANA", "CAF", 0, "bw", "0 - 0", null],
  ["BULGARIA", "UEFA", 0, "bg", "0 - 0", null],
  ["BURUNDI", "CAF", 0, "bi", "0 - 0", null],
  ["CABO VERDE", "CAF", 0, "cv", "0 - 0", null],
  ["CACHEMIRA", "AFC", 0, null, "0 - 0", null],
  ["CAMBOYA", "AFC", 0, "kh", "0 - 0", null],
  ["CANTÓN DEL TESINO", "UEFA", 0, null, "0 - 0", null],
  ["CHAD", "CAF", 0, "td", "0 - 0", null],
  ["CHINA", "AFC", 0, "cn", "0 - 0", null],
  ["CHIPRE DEL NORTE", "UEFA", 0, null, "0 - 0", null],
  ["COMORAS", "CAF", 0, "km", "0 - 0", null],
  ["COMUNIDAD ARMENIA-ARGENTINA", "CONMEBOL", 0, null, "0 - 0", null],
  ["COSTA RICA", "CONCACAF", 0, "cr", "1 - 1", "iq"],
  ["CRIMEA", "UEFA", 0, null, "0 - 0", null],
  ["CUBA", "CONCACAF", 0, "cu", "0 - 0", null],
  ["CURAZAO", "CONCACAF", 0, "cw", "0 - 0", null],
  ["DELVIDEK", "UEFA", 0, null, "0 - 0", null],
  ["DONETSK", "UEFA", 0, null, "0 - 0", null],
  ["DOS SICILIAS", "UEFA", 0, null, "0 - 0", null],
  ["EL SALVADOR", "CONCACAF", 0, "sv", "0 - 0", null],
  ["ESCANIA", "UEFA", 0, null, "0 - 0", null],
  ["ESLOVENIA", "UEFA", 0, "si", "6 - 0", "li"],
  ["ETIOPÍA", "CAF", 0, "et", "0 - 0", null],
  ["FILIPINAS", "AFC", 0, "ph", "0 - 0", null],
  ["FINLANDIA", "UEFA", 0, "fi", "0 - 0", null],
  ["FRANCONIA", "UEFA", 0, null, "0 - 0", null],
  ["GABÓN", "CAF", 0, "ga", "0 - 0", null],
  ["GALES", "UEFA", 0, "gb-wls", "0 - 0", null],
  ["GAMBIA", "CAF", 0, "gm", "0 - 0", null],
  ["GEORGIA", "UEFA", 0, "ge", "0 - 0", null],
  ["GHANA", "CAF", 0, "gh", "0 - 0", null],
  ["GRECIA", "UEFA", 0, "gr", "0 - 0", null],
  ["GUATEMALA", "CONCACAF", 0, "gt", "0 - 0", null],
  ["GUERNSEY", "UEFA", 0, "gg", "0 - 0", null],
  ["GUINEA", "CAF", 0, "gn", "0 - 0", null],
  ["GUINEA-BISSAU", "CAF", 0, "gw", "0 - 0", null],
  ["GUYANA", "CONCACAF", 0, "gy", "0 - 0", null],
  ["HAITÍ", "CONCACAF", 0, "ht", "0 - 0", null],
  ["HONDURAS", "CONCACAF", 0, "hn", "0 - 0", null],
  ["HONG KONG", "AFC", 0, "hk", "0 - 4", "cg"],
  ["HUNGRÍA", "UEFA", 0, "hu", "0 - 0", null],
  ["INDIA", "AFC", 0, "in", "0 - 0", null],
  ["IRLANDA", "UEFA", 0, "ie", "0 - 0", null],
  ["IRLANDA DEL NORTE", "UEFA", 0, "gb-nir", "0 - 0", null],
  ["ISLA DE ELBA", "UEFA", 0, null, "0 - 0", null],
  ["ISLA DE WIGHT", "UEFA", 0, "gb-iow", "0 - 0", null],
  ["ISLAS DE ÅLAND", "UEFA", 0, "ax", "0 - 0", null],
  ["ISLAS MALVINAS", "CONMEBOL", 0, "fk", "0 - 0", null],
  ["ISLAS SALOMÓN", "OFC", 0, "sb", "0 - 0", null],
  ["ISRAEL", "UEFA", 0, "il", "1 - 1", "ec"],
  ["JAMAICA", "CONCACAF", 0, "jm", "6 - 0", "nl"],
  ["JORDANIA", "AFC", 0, "jo", "0 - 0", null],
  ["KAREN", "AFC", 0, null, "0 - 0", null],
  ["KATANGA", "CAF", 0, null, "0 - 0", null],
  ["KENIA", "CAF", 0, "ke", "0 - 0", null],
  ["KIRGUISTÁN", "AFC", 0, "kg", "1 - 0", "bb"],
  ["KOSOVO", "UEFA", 0, "xk", "0 - 0", null],
  ["KUSKATAN", "CONCACAF", 0, null, "0 - 0", null],
  ["KUWAIT", "AFC", 0, "kw", "0 - 0", null],
  ["LAOS", "AFC", 0, "la", "0 - 0", null],
  ["LAZISTAN", "UEFA", 0, null, "0 - 0", null],
  ["LESOTO", "CAF", 0, "ls", "0 - 5", "ms"],
  ["LETONIA", "UEFA", 0, "lv", "0 - 0", null],
  ["LEZGISTAN", "UEFA", 0, null, "0 - 0", null],
  ["LÍBANO", "AFC", 0, "lb", "0 - 0", null],
  ["LIBERIA", "CAF", 0, "lr", "0 - 0", null],
  ["LIBIA", "CAF", 0, "ly", "3 - 2", "is"],
  ["LITUANIA", "UEFA", 0, "lt", "0 - 0", null],
  ["LUGANSK", "UEFA", 0, null, "0 - 0", null],
  ["MACAO", "AFC", 0, "mo", "0 - 0", null],
  ["MALASIA", "AFC", 0, "my", "0 - 0", null],
  ["MALDIVAS", "AFC", 0, "mv", "0 - 0", null],
  ["MAULE SUR", "CONMEBOL", 0, null, "0 - 0", null],
  ["MAURITANIA", "CAF", 0, "mr", "0 - 4", "de"],
  ["MOLDAVIA", "UEFA", 0, "md", "0 - 0", null],
  ["MONGOLIA", "AFC", 0, "mn", "0 - 13", "dk"],
  ["MOZAMBIQUE", "CAF", 0, "mz", "5 - 0", "tr"],
  ["MYANMAR", "AFC", 0, "mm", "0 - 0", null],
  ["NÍGER", "CAF", 0, "ne", "0 - 0", null],
  ["OMÁN", "AFC", 0, "om", "0 - 0", null],
  ["PAÍS SÍCULO", "UEFA", 0, null, "0 - 0", null],
  ["PARROQUIAS DE JERSEY", "UEFA", 0, null, "0 - 0", null],
  ["POLONIA", "UEFA", 0, "pl", "2 - 4", "ng"],
  ["PUEBLO GUNA", "CONCACAF", 0, null, "0 - 0", null],
  ["PUEBLO HMONG", "AFC", 0, null, "0 - 0", null],
  ["PUEBLO MAPUCHE", "CONMEBOL", 0, null, "0 - 0", null],
  ["PUEBLO ROHINYA", "AFC", 0, null, "0 - 0", null],
  ["QUEBEC", "CONCACAF", 0, null, "0 - 0", null],
  ["QUISQUEYA", "CONCACAF", 0, null, "0 - 0", null],
  ["RAPA NUI", "OFC", 0, null, "0 - 0", null],
  ["RCA", "CAF", 0, "cf", "0 - 0", null],
  ["RD CONGO", "CAF", 0, "cd", "0 - 0", null],
  ["RECIA", "UEFA", 0, null, "0 - 0", null],
  ["REPÚBLICA DOMINICANA", "CONCACAF", 0, "do", "0 - 0", null],
  ["RUANDA", "CAF", 0, "rw", "0 - 0", null],
  ["RUSIA", "UEFA", 0, "ru", "0 - 0", null],
  ["RUTENIA SUBCARPÁTICA", "UEFA", 0, null, "0 - 0", null],
  ["SANTA LUCÍA", "CONCACAF", 0, "lc", "0 - 0", null],
  ["SANTO TOMÉ Y PRÍNCIPE", "CAF", 0, "st", "0 - 0", null],
  ["SEALAND", "UEFA", 0, null, "0 - 0", null],
  ["SEYCHELLES", "CAF", 0, "sc", "0 - 0", null],
  ["SICILIA", "UEFA", 0, null, "0 - 0", null],
  ["SIERRA LEONA", "CAF", 0, "sl", "3 - 1", "gq"],
  ["SINGAPUR", "AFC", 0, "sg", "0 - 0", null],
  ["SIRIA", "AFC", 0, "sy", "4 - 1", "ua"],
  ["SUDÁN", "CAF", 0, "sd", "0 - 0", null],
  ["TAYIKISTÁN", "AFC", 0, "tj", "0 - 0", null],
  ["TAILANDIA", "AFC", 0, "th", "0 - 0", null],
  ["TANZANIA", "CAF", 0, "tz", "0 - 0", null],
  ["TIMOR ORIENTAL", "AFC", 0, "tl", "1 - 3", "bt"],
  ["TOGO", "CAF", 0, "tg", "0 - 0", null],
  ["TRINIDAD Y TOBAGO", "CONCACAF", 0, "tt", "0 - 0", null],
  ["TURKMENISTÁN", "AFC", 0, "tm", "0 - 0", null],
  ["TURQUESTÁN ORIENTAL", "AFC", 0, null, "0 - 0", null],
  ["UGANDA", "CAF", 0, "ug", "0 - 0", null],
  ["WALLIS Y FUTUNA", "OFC", 0, "wf", "0 - 0", null],
  ["YEMEN", "AFC", 0, "ye", "0 - 0", null],
  ["YIBUTI", "CAF", 0, "dj", "0 - 0", null],
  ["YORUBABALANDIA", "CAF", 0, null, "0 - 0", null],
  ["OSETIA DEL SUR", "UEFA", 0, null, "0 - 0", null],
  ["CONDADO DE NIZA", "UEFA", 0, null, "0 - 0", null],
  ["ZIMBABUE", "CAF", 0, "zw", "0 - 0", null],
  ["TIGRAY", "CAF", 0, null, "0 - 0", null],
  ["GUAYANA FRANCESA", "CONCACAF", 0, "gf", "0 - 0", null],
  ["REUNIÓN", "CAF", 0, "re", "0 - 0", null],
  ["BONAIRE", "CONCACAF", 0, "bq", "0 - 0", null],
  ["ISLAS CHAGOS", "CAF", 0, "io", "0 - 0", null],
  ["SAN BARTOLOMÉ", "CONCACAF", 0, "bl", "0 - 0", null],
  ["COMMONWEALTH", "UEFA", 0, "un", "0 - 0", null],
  ["B.R.I.C.S", "CONMEBOL", 0, null, "0 - 0", null],
  ["UNITED NATIONS", "UEFA", 0, "un", "0 - 0", null],
  ["N.A.T.O", "UEFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 317", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 318", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 319", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 320", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 321", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 322", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 323", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 324", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 325", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 326", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 327", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 328", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 329", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 330", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 331", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 332", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 333", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 334", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 335", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 336", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 337", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 338", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 339", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 340", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 341", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 342", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 343", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 344", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 345", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 346", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 347", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 348", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 349", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 350", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 351", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 352", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 353", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 354", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 355", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 356", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 357", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 358", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 359", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 360", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 361", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 362", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 363", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 364", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 365", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 366", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 367", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 368", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 369", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 370", "FIFA", 0, null, "0 - 0", null],
  ["SELECCIÓN 371", "FIFA", 0, null, "0 - 0", null],
];

// Re-mapeo y ordenamiento por puntos
const rankingData = [...rawTeams]
  .sort((a, b) => b[2] - a[2])
  .map(([name, confederation, points, iso, score, oppIso], i) => ({
    pos: i + 1,
    name,
    confederation,
    points,
    iso,
    oppIso: oppIso,
    score: score === "0 - 0" ? "Sin actividad" : score
  }));

const ITEMS_PER_PAGE = 25; 
const CONF_COLORS: Record<string, string> = {
  UEFA: "#3b82f6", AFC: "#ef4444", CAF: "#22c55e",
  CONMEBOL: "#f59e0b", CONCACAF: "#a855f7", OFC: "#06b6d4",
};

function FlagImg({ iso, name, size = 20 }: { iso: string | null; name: string; size?: number }) {
  if (!iso) return (
    <div style={{ 
      width: size, 
      height: size * 0.7, 
      backgroundColor: "#222", 
      borderRadius: "2px", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      fontSize: "8px",
      border: "1px solid #333"
    }}>🏴</div>
  );
  return (
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      alt={name}
      style={{ width: size, height: "auto", borderRadius: "2px", border: "1px solid rgba(255,255,255,0.1)" }}
      onError={(e) => (e.currentTarget.src = "https://flagcdn.com/w40/un.png")}
    />
  );
}

export function WSFARanking() {
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("Ranking");
  const [page, setPage] = useState(1);

  const filtered = rankingData.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));
  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  return (
    <div style={{ backgroundColor: "#0a0a0a", color: "#e5e5e5", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <nav style={{ backgroundColor: "#0d0d0d", borderBottom: "1px solid #1f1f1f", padding: "1rem", position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "#d4af37", color: "#000", padding: "5px 10px", borderRadius: "5px", fontWeight: "bold" }}>WSFA</div>
            <span style={{ fontWeight: "bold", letterSpacing: "2px", color: "#d4af37" }}>WORLD HUB</span>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            {["Ranking", "Multimedia", "Honduras 2026", "Noticias"].map(nav => (
              <button key={nav} onClick={() => {setActiveNav(nav); setPage(1);}} style={{ background: "none", border: "none", color: activeNav === nav ? "#d4af37" : "#888", cursor: "pointer", fontWeight: "bold", textTransform: "uppercase", fontSize: "12px" }}>{nav}</button>
            ))}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "40px 20px" }}>
        {activeNav === "Ranking" && (
          <>
            <h1 style={{ textAlign: "center", color: "#d4af37", fontSize: "3rem", marginBottom: "10px" }}>RANKING MUNDIAL</h1>
            <p style={{ textAlign: "center", color: "#666", marginBottom: "40px" }}>Temporada Oficial WSFA 2026 | {rankingData.length} Selecciones</p>

            <input 
              type="text" placeholder="Buscar selección por nombre..." value={search} 
              onChange={(e) => {setSearch(e.target.value); setPage(1);}}
              style={{ width: "100%", padding: "15px", borderRadius: "10px", border: "1px solid #333", backgroundColor: "#111", color: "#fff", marginBottom: "20px" }}
            />

            <div style={{ backgroundColor: "#111", borderRadius: "15px", overflow: "hidden", border: "1px solid #222" }}>
              <div style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 200px", padding: "15px", borderBottom: "2px solid #222", fontWeight: "bold", fontSize: "12px", color: "#444" }}>
                <span>POS</span><span>SELECCIÓN</span><span>CONFED.</span><span>PUNTOS</span><span style={{ textAlign: "center" }}>ÚLT. RESULTADO</span>
              </div>
              {paginated.map(team => (
                <div key={team.name} style={{ display: "grid", gridTemplateColumns: "60px 1fr 120px 100px 200px", padding: "15px", alignItems: "center", borderBottom: "1px solid #1a1a1a" }}>
                  <span style={{ fontWeight: "bold", color: team.pos <= 10 ? "#d4af37" : "#555" }}>#{team.pos}</span>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FlagImg iso={team.iso} name={team.name} />
                    <span style={{ fontWeight: "bold" }}>{team.name}</span>
                  </div>
                  <span style={{ fontSize: "10px", color: CONF_COLORS[team.confederation] || "#888" }}>{team.confederation}</span>
                  <span style={{ fontWeight: "bold" }}>{team.points}</span>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "8px" }}>
                    <FlagImg iso={team.iso} name={team.name} size={15} />
                    <span style={{ 
                      color: team.score === "Sin actividad" ? "#444" : "#d4af37", 
                      background: "rgba(0,0,0,0.4)", 
                      padding: "2px 6px", 
                      borderRadius: "3px", 
                      fontSize: "10px",
                      border: "1px solid rgba(212,175,55,0.1)",
                      minWidth: "40px",
                      textAlign: "center"
                    }}>
                      {team.score === "Sin actividad" ? "—" : team.score}
                    </span>
                    {team.oppIso && <FlagImg iso={team.oppIso} name="Rival" size={15} />}
                  </div>
                </div>
              ))}
              {paginated.length === 0 && (
                <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>No se encontraron selecciones con ese nombre.</div>
              )}
            </div>

            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "20px", alignItems: "center" }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: "10px 20px", borderRadius: "5px", border: "1px solid #333", background: "#111", color: page === 1 ? "#333" : "#fff", cursor: "pointer" }}>Anterior</button>
              <span style={{ padding: "10px", color: "#d4af37", fontSize: "14px" }}>Página {page} de {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ padding: "10px 20px", borderRadius: "5px", border: "1px solid #333", background: "#111", color: page === totalPages ? "#333" : "#fff", cursor: "pointer" }}>Siguiente</button>
            </div>
          </>
        )}

        {activeNav === "Multimedia" && <MultimediaSection />}
        {activeNav === "Noticias" && <NoticiasSection />}
        {activeNav === "Honduras 2026" && <Honduras2026Section />}
      </div>
    </div>
  );
}

/* ==========================================================================
   BASE DE CONOCIMIENTO (Contenido de INFORMACION.TXT integrado)
   ========================================================================== */

const INFO_TXT_CONTENT = `

//////////////////////////////////////////////////////////////////////////////

ELITE WTS: 10.158.122.45
OPEN ETP WTS: 10.158.122.141
OPEN EDATEL WTS: 10.158.122.146

FENIX ORACLE//ATC-netwts04-12/
10.100.65.26
10.158.122.144
10.158.122.145

PARA EDATEL: \\netvm-p0890nfs1\\CLIENTES\\

//////////////////////////////////////////////////////////////////////////////

AMARRE DE IP FIJA HFC *
CONSULTAR SIEMPRE QUE LA IP SEA DEL MISMO CMTS QUE DONDE ENGANCHA EL EQUIPO 
1. BORRAR RESERVA DE IP FIJA 
2. FORZAR IP FIJA 
3. ACTIVAR IP FIJA 
4. FORZAR IP FIJA 
5. BLOQUEAR IP QUE ESTA TOMANDO 
6. RESERVAR IP FIJA 
7. REINICIAR EL MODEM 
8. DESBLOQUEAR IP QUE ESTABA TOMANDO CUANDO RECUPERE GESTIÓN

___________________________________________________

SUMULACION SW: 
sys           
int (Vilanif)__
ip add
ip address 181....  255...
q
q
save

ELIMINAR SIMULACION. 
undo ip address 181.204.44.179 255.255.255.248 
q
q
save

___________________________________________________

PARA ACTIVAR OTRO PUERTO EN EL SW
display current-configuration al puerto del que se toma la info

sys
interface G0/0/x
(Se pega la info) 
q
q
save

PARA ELIMINAR INFORMACION DE PUERTO EN EL SW
sys
interface G0/0/x
undo description
q
q
save

___________________________________________________
Soporte técnico
Línea 018000 513 287 o #513 desde líneas Tigo
___________________________________________________
Soporte Hogares
018000422222

_____________________________________________________
NOC EDATEL
6045155760
6045155780
3007800620
___________________________________________________
Comercial 3356

___________________________________________________
Usuario: admin 
clave: w1B2c3D4$5-6_78t%

___________________________________________________
cisco meraki
https://account.meraki.com/login/dashboard_login?password_login=true
usuario andres.gallego@comware.com.co
clave: S0p0rt3_B2B_N1&g##**2
___________________________________________________
Admin
CPE#6mAC 

___________________________________________________
DNS PRIMARIO Y SECUNDARIO: 
190.248.0.5 - Bogotá 
200.13.249.101 - Medellin 
181.70.124.110 – Barranquilla

___________________________________________________
Mkrotik 
8080
8081
8089

___________________________________________________
Buen día,
Su colaboración confirmando falla masiva en la ya que se encuentra varios puertos caídos.
Siebel: 
INC : 
OLT:
ARPON:  
NAP: 

___________________________________________________
SEGMENTO: 
Ciudad: 
Naturaleza: SIN INTERNET
Servicio: BA
ID: 
Tecnología e Infraestructura: 
ID LLAMADA:

___________________________________________________
Matricular ONT:
Ingreso a OLT desde secure
USUARIO@UNE

Comandos
Enable
Display ont autofind all 
Identificar ONT 

___________________________________________________
1. Ingreso Oracle

OLT:
ARPON:  
NAP: 
___________________________________________________
EMPRESA SIN REGISTRO EN HELIX

Empresa: 
NIT:
Segmento: 
Contacto: 
Teléfono: 
Correo: 
__________________________________________________
APROVISIONAR DECO: 

Enviar a: 
Emir Palacio Londono <Jonathan.Palacio@tigo.com.co>
Nelson Andres Gonzalez Henao <Nelson.Gonzalez@tigo.com.co>
William Dario Viana Martinez <William.Viana@tigo.com.co> 

En copia: 
grupocoordinadoresn1b2b@comware.com.co
grupo_liderestecnicos_B2B@comware.com.co

___________________________________________________
INFORMACION DE MASCARA SUBRED

/32 255.255.255.255 0.0.0.0 1 1
/31 255.255.255.254 0.0.0.1 2 2
/30 255.255.255.252 0.0.0.3 4 2
/29 255.255.255.248 0.0.0.7 8 6
/28 255.255.255.240 0.0.0.15 16 14
/27 255.255.255.224 0.0.0.31 32 30
/26 255.255.255.192 0.0.0.63 64 62
/25 255.255.255.128 0.0.0.127 128 126
/24 255.255.255.0 0.0.0.255 256 254

_____________________________________________________
COMANDOS PARA VERIFICAR GIGAS DE CENTRAL EN APERTURA- Gigas desde la central. 

NE.
dis in des | in AAMxx    -  interfaces
dis tra in gi 0/0/0 - modulos
dis in gi 0/0/0 - Potencias
dis ll nei in gi 0/0/0 - vecinos

Expansion
dis in des | in AAM    -  interfaces
dis trans in gi 0/0/0 verb - potencias 
dis ll nei in gi 0/0/0 - vecinos

*Cisco
show inter sta - interfaces
show lldp neig      ---  Vecinos
show fiber-ports optical-trans    ---- Potencias

*nokia 7750
show port des | match AAM
show port 0/0/0 - estado
show port 0/0/0 ethernet lldp remote-info detail      - vecinos
show port 0/0/0 optical

_____________________________________________________

PROXY UNE
https://pac-uw2.iws-hybrid.trendmicro.com/7a797eb7-0f00-4e0e-abc2-4bee9cfed9cc/ProxyTigo.pac
http://wpad.epmtelco.com.co/pac_files/wpad.pac
http://proxyune 8080


10.*;172.*;192.*;200.13.249.44;10.159.35.247;*.colombiamovil.corp;*.edatel.com.co;*.epmtelco.com.co;*.etp.com.co;*.etp.corp;*.teune.com.co;*.tigoune.com;*netact.tigo.co;digiturno.tigoune.com.co;seguimientopedido.tigo.com.co;crm.tigo.com.co;crmportal.tigo.com.co;descrmportal.tigo.com.co;intcrmportal.tigo.com.co;mobilecrm.une.com.co;portalcrm.tigo.com.co;epos.tigo.com.co;app.millicom.com;autodiscover.une.com.co;autogestion.tigoune.com.co;busservices.tigo.com.co;cloud.une.com.co;consolacloud.une.com.co;consultaintegral.tigo.com.co;consultasdinamicas.TigoUne.com.co;contact.tigo.com.co;corporativo.une.com.co;cpm.une.net.co;csr.tigo.com.co;dms.tigo.com.co;epm.millicom.com;esb.tigo.com.co;evoluciona.TigoUne.com.co;fenix.une.com.co;gestdoc.tigo.com.co;gestionclientese2e;gestioncomercial.une.com.co;gestionpqr.tigo.com.co;iaas.une.com.co;insights.millicom.com;intranet.tigo.com.co;Intranet.tigoune.com.co;iqtigo.iq-online.net.co;pagos.tigo.com.co;pbook.tigo.com.co;portal.millicom.com;portaliq.tigo.com.co;portallegacy.tigo.com.co;portalti.tigo.com.co;rdsgateway.une.com.co;rdswebunete.une.com.co;reporisp.une.net.co;revocacion.une.com.co;sap.une.com.co;smnet.une.net.co;smpro.une.net.co;soa.TigoUne.com.co;solmov.une.com.co;solmovreporte.une.com.co;solmovws.une.com.co;staff.tigo.com.co;stateservice.une.com.co;tigogestion.tigo.com.co;tigoonline.tigo.com.co;tigouneendirecto*;une-piptvadmin02.une.net.co;une-tiptv01.une.net.co;unevm-pgrhv01.une.net.co;viafirma.tigo.com.co;wac.tigo.com.co;wikisp.une.net.co;wl.TigoUne.com.co;wlservices.tigo.com.co;css.tigo.com.co;b2b-cw-avaya.comware.com.co;transfer.tigo.com.co;*hfm.millicom.com

`;
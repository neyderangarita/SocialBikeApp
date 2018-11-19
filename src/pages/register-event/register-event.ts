import { Event } from './../../shared/models/event';
import { Api2Provider } from './../../providers/api2/api2';
import { AuthProvider } from './../../providers/auth/auth';
import {Component} from '@angular/core';
import {ToolsService} from "../../providers/tools";
import {IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

declare var google;

@IonicPage({
  name: 'page-register-event',
  segment: 'register-event'
})

@Component({
  selector: 'page-register-event',
  templateUrl: 'register-event.html',
})

export class RegisterEventPage {

  public onRegisterForm: FormGroup;
  public titulo: String;
  event = {} as Event;
  map: any;

  constructor(
    private _fb: FormBuilder,
    public nav: NavController, 
    public navParams: NavParams,
    public tools: ToolsService,
    public menu: MenuController,
    public auth: AuthProvider,
    public api: Api2Provider,
    public http: HttpClient,
    private geolocation: Geolocation,
    ) {
      this.menu.swipeEnable(true);
      this.menu.enable(true);
      this.titulo = 'Registrar evento'
  }

  ngOnInit() {
    this.onRegisterForm = this._fb.group({
      name: ['', Validators.compose([
        Validators.required
      ])],
      sitio_encuentro: ['', Validators.compose([
        Validators.required
      ])],
      dateEvent: ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewDidLoad() {
    this.getPosition();
  }

  getPosition():any{

    this.geolocation.getCurrentPosition()
    .then(response => {
      this.loadMap(response);
    })
    .catch(error =>{
      console.log(error);
    })

  }

  loadMap(position: Geoposition){
    //let latitude = position.coords.latitude;
    //let longitude = position.coords.longitude;
    //console.log(latitude, longitude);
    // create a new map by passing HTMLElement

    let mapEle: HTMLElement = document.getElementById('map');

    // create LatLng object
    let latitude = 4.62;
    let longitude = -74.13;
    //console.log(latitude, longitude);
    
    let myLatLng = {lat: latitude, lng: longitude};

    // create map
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });
    
    var encodedPath= 'ace[btmcMSN@JIUUIWM[EGDWEJGD?KK?Cz@PTALCHIDQLOLEFFEDIB@CLBBg@gBp@OCKBECU@Bh@EZWx@UfCElAELAdBEHCNMREzCKj@ANEH?TCZ@ZERCb@Ap@IjABJEx@@j@C`@If@GNEdAGn@EB?\\KFQ?OESBGCKB]AEB@XA\\DP@dAEh@Bf@Kb@?JHDBJAJCJg@Gi@MaAEy@Ia@G{Ga@eBGyDWqEMyCQoFUkEYsDM{He@eCIiDS_EKcCSo@KoBSeC_@{@OgEaA}Bq@uAe@sGqCcCmA_GmDiAw@sBcB{@w@cCoBq@q@gB}Ao@q@{AsA}BcCeCuCiDkDcGwIyBiCuE_EsAwAoAeA{CcCgAaAqAeAiCyBa@YoC_CsB}AaEmDgBgBuDsCeByAk@s@_DwBi@e@e@m@o@]mAaA}@_AkA{@[[uAiA{B_Bs@s@a@[u@w@UYSQOUwC_CaA}@g@W{@k@e@c@w@m@o@s@s@g@}AcAqA_ACE@ERCE@B@C@?JI[[u@AEBMD@HCBDb@EP?[HADBFR^QNGAWWO?WGYYsA_AkAoAwAkA_B{A{A_BqAgASWuBwBa@e@MIi@k@iAcAuA{ABAmA}@m@s@[YoCsCmAeAaAs@Y]}BsB[QgBq@w@S_@MoBcAkAy@aAi@YWgAm@}@s@{@g@QOq@a@]O{@m@w@]}@g@_Ay@OKsAs@}@a@g@k@[UY]aA{@SMq@u@[QgBqAWKc@[{Au@yA}@w@k@gB_AaAs@u@[_BiAg@UcAo@k@WqAw@eBoAg@[eAw@WIUO[MUSeAk@_DkBs@g@[Qe@_@iAq@g@YmAi@iCaB_Ag@]MI?w@_@eAa@{@e@WGiD{A{Ai@y@g@s@g@c@g@k@w@Wm@o@iBOW]WCGBEAIKi@Y_@M[KHQb@c@n@cAz@i@|@Ib@@\\FRDFp@l@FTCd@Qf@_@z@Qr@ORSj@Ml@Wh@QVSh@qAxBMl@ADMFSr@Q^Mh@INWdAo@nAYp@Wb@KZi@z@w@vAc@t@cAvAi@|@]f@DMCBGNo@|@[p@i@r@{BbCeFvGYb@i@~@gA`Bg@~@Yr@}@tC[r@u@hCc@dAI\\[v@o@bCw@rBi@bAo@dBe@|A[n@GXgBxDUr@sArBSd@QTUROXk@l@]j@a@Zo@t@a@TKEU`@IXwAbBm@n@a@d@gFlEoAjAqE~E}BhB{CdBkCbBYN{AfAsHpE{Ax@_An@_@^gAh@}@Vm@b@IN_BnA_BfAaAl@CCG@}A|@{@l@MPgAr@ONa@XoAn@IJ[Ry@^aD|BUFWd@_A~@OHy@t@uA|@QPk@^u@t@wAlAiBlAq@n@e@l@o@d@_@Rw@AsAFSBYLY\\KRIV]p@K\\Qb@Y`@uChC}@l@q@r@_@X}@|@k@f@cC|CgDnCs@v@c@\\{@x@sA`AeBrAk@^aAv@_@VcA^c@b@y@p@m@n@eA|@STaAt@}@z@]Va@d@iEdDe@h@e@\\YXuEdDwAhAw@r@iA|@cA~@oAbAe@b@uAbA_@`@k@h@e@Re@^UHOHo@p@kA`Aa@b@o@`@w@n@m@\\qAnAWLD?@BEACBm@n@o@h@EHQHmAjA]TYLKNs@d@MPe@VWXm@f@QRo@^g@f@a@VwBhB}@j@i@f@]VuAhA_DrCmBvAu@p@a@VuCfCg@j@_@f@iC`DcCtD_BtBqCpEmG|IgAhBgA`BkBfCsB~Cg@|@u@bAc@x@}@rAs@z@Wd@[\\oDlFcC~CkBrCqB`CcCtDcChDWd@e@l@_@p@gDnEQb@g@z@s@x@e@v@kCvDw@lA}AtBg@|@gBdCy@`A_BdCu@pASVg@h@m@bAuAlBe@x@kAtAkBjDWVcA|AoAxA_A|AeAtAq@dAu@|@W`@iCbEy@`Ai@|@gAvAsAbCwAhBgCnDo@rAw@bAiAjBs@z@_AxAeBxBqC`EyDbFc@t@sArB[p@QT]XoA`B_@j@Wl@_A~Ag@j@mF~HwCnEmCtD[j@gB~BaDfFcAnAaCrDoD|EsE|GiAxAk@`AuArBi@r@a@p@aAlAoBxCaAnAyAhCeFlHq@x@iC`E}HbLgGbJ{AfCgAnAeAfAqBdBwBzA_Bx@e@P}Bn@q@T{A`@iARaAX}@NeB^mBp@{@P}@Z{Bd@wAd@oAN[FyCt@WHoBh@aA^g@VYRi@d@[\\sAdBY`@_A~AeBhCyFjJg@r@qAxByDvFoAzBwDdGs@nAgC|DqDbG_AbAWt@q@`AcA`BoAlBeAhBsAnB_D|Ew@vAyA~BwExHi@x@}@lAgGfKsDrFmChEcAvAq@hAc@|@m@|@iBlC_@r@iAdBgGbKyB~Cy@tA]f@u@xAiDpFeBzCkA~A_CnDm@hA}AxBeDvFaAtAaAdBiCxDqCtEu@fAs@`AeAfB}@pAaBpCcBbCkAxBmArBi@p@iB~CwAvBoA`BkBdDiBtCm@nAsDxF]b@e@~@{@nAgAnBy@hAu@tAq@`A}ApCi@r@{BxDY`@c@f@sBdD]r@iA`B_D`F]b@cAbBu@`AWh@s@dAcAnB{@hAm@lAcApAo@jAg@n@s@hAk@hACJg@x@k@|@a@d@m@~@gAnB_@b@OJOPQd@o@z@uA~Bc@p@GPq@hAGP[\\s@dAU^Q`@_@`@w@xASTSb@]b@Yh@UV[n@e@p@Yj@STuArB[d@Wh@MN]x@MRGZCNBVC\\A~@FLNt@ALBPA`@Fn@FPDXFLPlANd@FlABRFR@`AET?XSd@m@t@q@VUVKBYPOPQL{@`@KP]XIDa@H]Z]NQTG?WRK@k@`@QFe@`@c@h@IVSlABl@Jx@?^Jf@?TP|@L|@DJATD\\Jh@B|@CZUp@SXCNIJODEHWReAh@_@F[@k@GM@_@MAEIC]AOGc@E[M[CWIaAIQEQAm@QIAW@YCIG_@GM?YDs@Ck@FM?QDm@Bq@CeBLI?OEa@Cw@@OCYDm@@a@I_@Ba@EoAPiAGo@DgACS@m@Ao@HOAq@Hi@Co@Da@?m@OUCm@@g@EY?QCkCIg@Ic@CYEY?ECg@?{@F_@J]D_@LIDSRYPMVQNs@`AYb@i@f@Yb@WN?De@v@c@d@Yd@OPS\\YRKLE@S^c@b@FCTYBA@ILC?KBGDCDMD@@EB@DCECDFBP@l@FNIHN[AE@ELWAODKVc@N_@FIN]R[Z[^Yl@u@hAeAr@}@j@m@v@g@j@Ql@K|DXfELpBLrELtBNxAFtB?rBGfEQbG_@rBGt@@t@Bt@HfDh@lBf@jANX@fBSpBe@jAq@JMFOFiAUiBUs@SoAc@oE@]FYPw@l@iAf@e@lCwBrHiFRQZk@Rq@Fs@Cq@QaBi@oDQcB[{BCY@k@LaAb@mAb@y@`BgCh@q@p@aAlDyF|@{AfFeIlAwBnAiBJIXGp@FF?R@DCHB?RDDvA?|@W@@a@AQIk@?m@JHCCAUHILJCJIPE^A@DXHHDCJG?OSUPWDMCDEBSM?ICFE?EED?GVAZBr@GH@AFUHMC]@E@EDSKADOCCBE\\SBIFCCC@K\\Ib@E@y@[IG?IZHRIFDNRUILNARCDE?BBCEWGKGEMD@\\?FA?EEAHDEACBE??DIPoBtBVUFKz@y@j@y@CIBGj@c@ZMJUOJEDCJLMDAFHEIQ\\DBV?RBE?AKDK?WHG@DIGEK?OG[OMIQCG@SPa@T[R_@L]d@u@N_@v@cAh@cAZ_@^[r@kAfCoCnCsE`BsDn@qAlAqB|AeC|@cBfBgCLYTW^o@~BoDxAeCbAuAJY|CwEVm@j@{@rCuE`@g@n@iApAgBf@m@JU@M^{@|AyBx@aBd@s@j@cAd@m@jBuCv@gApBeDjG}HnAaCrA{CfAyBrAoBhCgEz@qAjAsBnAkBj@gAb@k@tBgDPUx@sAZ_@hAiBd@o@hBcDfCcEJYdD{EpEuH|A}Bn@gAvB_Dx@{A|@uAl@iAj@{@RUr@eAv@wAp@eA\\q@|BeDj@s@bAiAp@k@lAmADMRa@Ni@\\q@Ts@h@iAPe@hAwBvCqEh@cAx@uA~@uAhB}CtAqBb@y@fE_HvFuIb@w@V]h@_@`@iA|GsKx@yAvAsAV_@Da@FMb@q@p@qAXa@zCeFZc@xBoDb@o@|CeFfBoCrDuGhAeBl@i@b@WzCoAx@SdCu@|Be@rAc@pBu@hEkAjEcApFcA`D{@|Bw@tBeA|B_Bd@e@l@g@pCaDpAiBr@uA`@o@d@e@x@gAz@cB\\a@nAgBZk@rAsBnCqDlEuGvDaFjBkCFQnA{BhAeB^c@p@gAnAeBZo@|@eAp@kAv@aA|@mAx@sAvAkBd@e@v@aAzB}Bl@aA~BaFfByC~@qAx@qAz@eAN_@T]bBeClA}Ad@o@t@uAnA{AvBaDlA}AfAgATMZ[Zm@h@m@b@y@rA}CXg@dAuAZi@r@_A|@qA~@mArEaHtBqCh@}@pBsCdDeFlD_FdDoD|@gAvAiClAcCbAgB`AwAh@s@hC{D~AwB\\o@|@oAv@sArAqBh@eAfByBnAmBTWJIn@cAbFiHNWx@gAjBqCzAsBNYl@w@j@eATWlAmBTWxAwBNYRUl@}@jB{CZe@v@{@~A}Bf@y@pAcBRa@n@s@z@oA|@mAfBsC|@mAXe@pCaER]rD}FzCkEh@k@fA_BtB}CXg@dCiDhBoCx@eA~BkDp@{@x@mAxCgD`B_BjC_C`Ao@rEoC|@e@bAs@`G}GZSjFgEt@i@lBkBvBaBhB{Ad@_@LErAkAd@[zE}Dt@g@xBoBfBsAz@m@~@e@hFiDp@k@lB}Bf@c@pAwA|EkEnBwA`BwAtAgAf@]xHqG\\SzDyCfA_AfAy@fFwEfCiBtCiC^YZQj@e@v@a@j@g@d@SDK?BGFCAFKJHD?WYGABJRFHHDJ@c@FIfA_Ah@]`@c@^Wb@e@VODCN@FANKr@o@f@k@^k@j@m@d@[LQTQfAo@vAoAn@]p@u@pBuAb@_@LUVQrCoBxA}@fAy@nAw@H?LE~@u@ZMjCeBbBaA|@u@PGnAgAz@a@p@c@JMz@a@x@k@NCd@YDEb@QrA{@bCcBhAq@|@u@r@]^Wx@e@b@QLA@BVKDGx@s@r@e@X[z@q@NSXMZW\\_@n@i@rAyARQPIv@kAhAkAtA}Ap@g@hDmD@LRSZe@TSxAmB`@K^[BKE?@E~@_ANU@EJUXSTa@^{@bBeDBOPe@bAaCfAqDFi@DOVm@j@aAAGJ_@@Sb@sAN[DMn@qAPi@`AsB`AiCf@_Cp@wArBiDn@u@fBaBZc@DQLQTe@FGR[h@cAjA}ANKr@w@JSJK@G^g@|@yAhAwAPYhA_BPa@^uAVm@Re@t@qA`@iAt@kAjAeD`@u@HGp@iB^o@@GHCBERo@FIHAVBCAJLDVDB?EOGMEOIE?MEMOISKK?CY[UQo@YD@NRd@?DEVaAPODQCUa@_@g@q@?QDg@bA}Ap@e@Vy@JG@MDCD?FMDA?EXEZ`AZd@L^DXJ`@Df@^t@RZTVZj@X`@l@p@PLPJb@LZL`@ZjAj@pAd@p@Zz@ZfAf@`@Lx@`@l@TRJd@^bBv@bBfAhAf@dAp@TNf@Zf@f@lDpBdB|@nBrAxBfAv@Xd@Z`@b@\\Tz@d@l@b@jAl@~@n@nAp@`@Z|DfCNPPJhB~@x@j@~AnABCL?DJTNFJfAbAp@d@z@t@x@f@fBnAl@Zr@f@h@`@dDpB`At@nAr@jBnAtB|A~@f@jFjBl@\\p@j@ZRfBxApBhBxD|Dl@d@t@~@\\Vx@x@x@z@t@`A\\\\lA`AhAhAfBrBpCrCn@j@z@z@V^PP`@VbCxB^f@N@ROCSf@cDK[Bc@BEBA@NFF`@FBBIDE?FBNPVYT_@BA@GVCTVFBFADGLKrAe@ZQ`@]nFyCTE@LABLN?JFJZIz@g@HCl@]Z]`Ai@r@k@PGx@_@PA~@]PM`@Mf@WjA{@hBgABILO`BeAd@Wx@[d@YfCoAxBqAv@_@POd@Ut@s@ZSnAo@t@[n@a@tAq@f@]jD_BZSDBVEf@SvAaA|@g@tAcA`Ai@d@]pAi@\\CrA_A~@u@x@e@hA{@dB}@f@]t@YfBeAZKt@c@j@WjCcBdAg@VG|Ak@fB}@ZWb@c@t@e@`CiAf@[h@e@dAm@dCmAdAi@zAeApAu@tAs@x@m@^On@e@`CsAbCcAx@q@VQr@UdAg@vAk@j@_@tBcAdC_BxA}Ap@aATm@T]Vy@t@yAj@aBJa@L[Ba@E@@IZq@Lg@f@mAJa@Vq@B_@b@_BTgADMNgAd@_CVgAXs@fAoBvAyAFENEXShAg@|@e@f@MPI`BqAZMn@m@NGj@_@^Ix@o@f@WHG^g@VS^Mf@_@t@[XQj@UnAs@f@Ud@Mz@g@VIp@i@RGXU`@O`@]n@[JKHEXURGdGcGM@LGPApA_@h@EdAy@`B{@vB{A\\OVWTO@GPOr@YlAm@XYlCwAlA{@bAk@RQj@u@nAi@bDgBxAgAb@QHOf@Yj@c@zCeBLOTO^[XQ\\a@RIFOVSl@Wz@UFIh@K~@a@j@Mt@q@hAq@TSVOd@c@b@M`B{@RQ?EEADAaAUUMmBi@o@My@MGCSUq@]QAUBMIKAYJ]AKBULc@MQ?]He@EIHa@D}@Q]Be@G_@OEE[MGIo@WmAUu@YaAMg@C}Dy@WCM@_@H]I]Sa@Kk@Ss@_@a@[_@Ec@?EAACKCAE]AY^IRALA\\@\\IN';
    var decodedPath = google.maps.geometry.encoding.decodePath(encodedPath);

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      let marker = new google.maps.Marker({
        position: myLatLng,
        map: this.map,
        title: 'Hello World!'
      });
      mapEle.classList.add('show-map');
    });


    var flightPath = new google.maps.Polyline({
      path: decodedPath,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });

    flightPath.setMap(this.map);


  }

  ngOnDestroy() {
  }

  register(event: Event) {
    let userId = localStorage.getItem('userId');
    let parameter = {
      nombre: event.nombre,
      fecha: event.fecha,
      user_id: userId,
      sitio_encuentro: event.sitio_encuentro
    };
    this.api.callPetition('events/', 'POST', parameter)
    .then(data => {
      this.nav.setRoot('page-programacion');
      this.tools.notify("Se ha registrado el evento: " + parameter.nombre + " correctamente.");
    });
  }



  
  

}
